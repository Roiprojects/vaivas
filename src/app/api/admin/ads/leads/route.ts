import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { companyName: { contains: search, mode: "insensitive" } },
        { refNumber: { contains: search, mode: "insensitive" } },
      ];
    }

    const leads = await prisma.adsLead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, assignedStaff, internalNotes, nextFollowUpDate } = body;

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    const updated = await prisma.adsLead.update({
      where: { id },
      data: {
        status: status || undefined,
        assignedStaff: assignedStaff !== undefined ? assignedStaff : undefined,
        internalNotes: internalNotes !== undefined ? internalNotes : undefined,
        nextFollowUpDate: nextFollowUpDate ? new Date(nextFollowUpDate) : undefined,
      },
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    console.error("Error updating lead:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
