import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { savePrivateResume } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jobId = formData.get("jobId") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const experience = formData.get("experience") as string;
    const coverLetter = (formData.get("coverLetter") as string) || "";
    const resumeFile = formData.get("resume") as File | null;

    if (!jobId || !fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Phone, Job)." },
        { status: 400 }
      );
    }

    // Verify Job exists and is active (not closed or expired)
    const job = await prisma.jobListing.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "Job opportunity not found." }, { status: 404 });
    }

    if (job.status !== "PUBLISHED") {
      return NextResponse.json(
        { error: "This job listing is currently closed to new applications." },
        { status: 400 }
      );
    }

    if (job.expiryDate && new Date(job.expiryDate) < new Date()) {
      return NextResponse.json(
        { error: "This job listing has expired and cannot accept further applications." },
        { status: 400 }
      );
    }

    // Save resume if uploaded
    let storedResumeName = "no_resume_provided.pdf";
    let originalResumeName = "Resume.pdf";

    if (resumeFile && resumeFile.size > 0) {
      // Validate file size (max 10MB)
      if (resumeFile.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "Resume file size exceeds 10MB limit." }, { status: 400 });
      }

      const saved = await savePrivateResume(resumeFile);
      storedResumeName = saved.storedName;
      originalResumeName = saved.originalName;
    }

    // Upsert Candidate Profile (avoid duplicates by matching on email)
    const candidate = await prisma.candidateProfile.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {
        fullName,
        phone,
        totalExperience: experience || undefined,
        resumeUrl: storedResumeName,
        resumeOriginalName: originalResumeName,
      },
      create: {
        fullName,
        email: email.toLowerCase().trim(),
        phone,
        totalExperience: experience,
        resumeUrl: storedResumeName,
        resumeOriginalName: originalResumeName,
      },
    });

    // Create Job Application
    const application = await prisma.jobApplication.create({
      data: {
        jobId: job.id,
        candidateId: candidate.id,
        fullName,
        email: email.toLowerCase().trim(),
        phone,
        experience,
        coverLetter,
        resumeUrl: storedResumeName,
        resumeOriginalName: originalResumeName,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully!",
      applicationId: application.id,
    });
  } catch (error: any) {
    console.error("Job Application Error:", error);
    return NextResponse.json(
      { error: "Failed to process application. Please try again later." },
      { status: 500 }
    );
  }
}
