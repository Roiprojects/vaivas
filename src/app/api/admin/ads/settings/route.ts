import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const setting = await prisma.adsSetting.findUnique({
      where: { id: "global" },
    });
    return NextResponse.json({ success: true, setting });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName,
      tagline,
      phone,
      email,
      whatsappNumber,
      address,
      workingHours,
      consultationPricing,
    } = body;

    const updated = await prisma.adsSetting.upsert({
      where: { id: "global" },
      update: {
        companyName,
        tagline,
        phone,
        email,
        whatsappNumber,
        address,
        workingHours,
        consultationPricing,
      },
      create: {
        id: "global",
        companyName: companyName || "Vaivas Ads",
        tagline: tagline || "Big ideas. Real impact.",
        phone: phone || "+91 80 4123 4568",
        email: email || "ads@vaivasventures.com",
        whatsappNumber: whatsappNumber || "+91 98765 43211",
        address: address || "Vaivas Towers, Outer Ring Road, Bengaluru",
        workingHours: workingHours || "Monday - Saturday: 9:30 AM - 6:30 PM IST",
        consultationPricing: consultationPricing || "Complimentary initial consultation",
      },
    });

    return NextResponse.json({ success: true, setting: updated });
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
