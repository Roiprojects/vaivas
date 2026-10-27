import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, logActivity } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const jobs = await prisma.jobListing.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });
  return NextResponse.json({ jobs });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const slug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
        "-" +
        Date.now().toString().slice(-4);

    const job = await prisma.jobListing.create({
      data: {
        title: data.title,
        slug,
        department: data.department || "General",
        location: data.location || "Bengaluru",
        employmentType: data.employmentType || "Full-time",
        experienceLevel: data.experienceLevel || "2-5 years",
        openings: parseInt(data.openings, 10) || 1,
        salaryRange: data.salaryRange || null,
        description: data.description,
        requirements: data.requirements || "",
        responsibilities: data.responsibilities || "",
        benefits: data.benefits || "",
        status: data.status || "PUBLISHED",
      },
    });

    await logActivity("CREATE_JOB", "JOBS", `Created job "${job.title}"`, session.id, session.name);

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    console.error("Job creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to create job" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, ...updates } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const job = await prisma.jobListing.update({
      where: { id },
      data: updates,
    });

    await logActivity(
      "UPDATE_JOB",
      "JOBS",
      `Updated job "${job.title}" (Status: ${job.status})`,
      session.id,
      session.name
    );

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update job" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const job = await prisma.jobListing.delete({
      where: { id },
    });

    await logActivity("DELETE_JOB", "JOBS", `Deleted job "${job.title}"`, session.id, session.name);

    return NextResponse.json({ success: true, message: "Job deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete job" }, { status: 500 });
  }
}
