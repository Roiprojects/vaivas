import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, enquiryCategory, message } = body;

    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Please fill in your name, email, phone, and message." },
        { status: 400 }
      );
    }

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        enquiryCategory: enquiryCategory || "General",
        message: message.trim(),
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting Vaivas Ventures! Your enquiry has been routed to our team.",
      enquiryId: enquiry.id,
    });
  } catch (error: any) {
    console.error("Contact Enquiry Error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    );
  }
}
