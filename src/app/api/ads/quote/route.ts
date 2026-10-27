import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      companyName,
      serviceType,
      budgetRange,
      timeline,
      description,
      source = "Quote Form",
      printSpecs,
      calendarSpecs,
      artworkFiles = [],
    } = body;

    if (!fullName || !email || !phone || !serviceType) {
      return NextResponse.json(
        { error: "Full name, email, phone number, and service selection are required." },
        { status: 400 }
      );
    }

    // Generate unique reference e.g. ENQ-ADS-2026-XXXX
    const count = await prisma.adsLead.count();
    const currentYear = new Date().getFullYear();
    const refNumber = `ENQ-ADS-${currentYear}-${String(count + 1001).padStart(4, "0")}`;

    const lead = await prisma.adsLead.create({
      data: {
        refNumber,
        fullName,
        email,
        phone,
        companyName: companyName || null,
        serviceType,
        budgetRange: budgetRange || null,
        timeline: timeline || null,
        description: description || "No additional description provided.",
        source,
        status: "NEW",
        printSpecs: printSpecs || null,
        calendarSpecs: calendarSpecs || null,
        artworkFiles: Array.isArray(artworkFiles) ? artworkFiles : [],
      },
    });

    // Also record an activity log in system
    try {
      await prisma.activityLog.create({
        data: {
          action: "NEW_ADS_ENQUIRY",
          module: "VAIVAS_ADS",
          details: `Inbound enquiry ${refNumber} received from ${fullName} (${companyName || "Individual"}) for ${serviceType}.`,
          userName: "Public Visitor",
        },
      });
    } catch (e) {
      // Non-blocking log
    }

    return NextResponse.json({
      success: true,
      refNumber: lead.refNumber,
      leadId: lead.id,
      message: "Enquiry submitted successfully. A quote specialist will connect within 4 business hours.",
    });
  } catch (error: any) {
    console.error("Error creating Ads lead:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please verify details and try again." },
      { status: 500 }
    );
  }
}
