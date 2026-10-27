import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, companyName, serviceType, budgetRange, campaignGoals, timeline } =
      body;

    if (!fullName || !email || !phone || !serviceType || !campaignGoals) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Phone, Service, Campaign Goals)." },
        { status: 400 }
      );
    }

    const enquiry = await prisma.adEnquiry.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        companyName: companyName ? companyName.trim() : null,
        serviceType,
        budgetRange: budgetRange || null,
        campaignGoals: campaignGoals.trim(),
        timeline: timeline || null,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your advertising enquiry has been submitted. Our creative team will contact you shortly.",
      enquiryId: enquiry.id,
    });
  } catch (error: any) {
    console.error("Ad Enquiry API Error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    );
  }
}
