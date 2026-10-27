import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, logActivity } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");
  const status = searchParams.get("status");

  const whereClause: any = {};
  if (jobId) whereClause.jobId = jobId;
  if (status && status !== "ALL") whereClause.status = status;

  const applications = await prisma.jobApplication.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      job: { select: { title: true, department: true } },
      candidate: { select: { id: true, totalExperience: true, keySkills: true } },
    },
  });

  return NextResponse.json({ applications });
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status, notes } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const application = await prisma.jobApplication.update({
      where: { id },
      data: {
        status: status || undefined,
        notes: notes !== undefined ? notes : undefined,
      },
    });

    await logActivity(
      "UPDATE_APPLICATION",
      "APPLICATIONS",
      `Application for ${application.fullName} marked as ${application.status}`,
      session.id,
      session.name
    );

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update" }, { status: 500 });
  }
}
