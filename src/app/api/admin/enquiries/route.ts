import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, logActivity } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status, notes } = await req.json();
    const updated = await prisma.contactEnquiry.update({
      where: { id },
      data: { status, notes },
    });
    await logActivity("UPDATE_ENQUIRY", "ENQUIRIES", `Enquiry from ${updated.fullName} marked as ${updated.status}`, session.id, session.name);
    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
