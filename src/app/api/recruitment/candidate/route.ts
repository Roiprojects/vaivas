import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { savePrivateResume } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const preferredRole = formData.get("preferredRole") as string;
    const experience = formData.get("experience") as string;
    const skills = formData.get("skills") as string;
    const preferredLocation = (formData.get("preferredLocation") as string) || "Pan-India";
    const availability = (formData.get("availability") as string) || "Immediate";
    const resumeFile = formData.get("resume") as File | null;

    if (!fullName || !email || !phone || !preferredRole) {
      return NextResponse.json(
        { error: "Please provide your Name, Email, Phone, and Preferred Role." },
        { status: 400 }
      );
    }

    if (!resumeFile || resumeFile.size === 0) {
      return NextResponse.json(
        { error: "Please attach your resume (PDF/DOCX)." },
        { status: 400 }
      );
    }

    if (resumeFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Resume file size exceeds 10MB limit." },
        { status: 400 }
      );
    }

    // Save resume securely in private storage
    const saved = await savePrivateResume(resumeFile);

    // Upsert Candidate Profile
    const candidate = await prisma.candidateProfile.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        preferredRole: preferredRole.trim(),
        totalExperience: experience || undefined,
        keySkills: skills || undefined,
        preferredLocation,
        availability,
        resumeUrl: saved.storedName,
        resumeOriginalName: saved.originalName,
      },
      create: {
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        preferredRole: preferredRole.trim(),
        totalExperience: experience,
        keySkills: skills,
        preferredLocation,
        availability,
        resumeUrl: saved.storedName,
        resumeOriginalName: saved.originalName,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Resume submitted successfully! You are now part of our active talent pool.",
      candidateId: candidate.id,
    });
  } catch (error: any) {
    console.error("Candidate resume drop error:", error);
    return NextResponse.json(
      { error: "Failed to upload resume. Please try again." },
      { status: 500 }
    );
  }
}
