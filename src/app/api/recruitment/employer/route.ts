import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactPerson,
      email,
      phone,
      jobRole,
      location,
      openings,
      experience,
      skills,
      employmentType,
      hiringTimeline,
      budgetRange,
    } = body;

    if (!companyName || !contactPerson || !email || !phone || !jobRole || !experience || !skills) {
      return NextResponse.json(
        { error: "Please fill in all mandatory company and role requirement fields." },
        { status: 400 }
      );
    }

    const requirement = await prisma.employerRequirement.create({
      data: {
        companyName: companyName.trim(),
        contactPerson: contactPerson.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        jobRole: jobRole.trim(),
        location: location || "India",
        openings: parseInt(openings, 10) || 1,
        experience: experience.trim(),
        skills: skills.trim(),
        employmentType: employmentType || "Full-time",
        hiringTimeline: hiringTimeline || "Immediate",
        budgetRange: budgetRange || null,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Hiring requirement submitted successfully! Our lead recruiter will contact you.",
      requirementId: requirement.id,
    });
  } catch (error: any) {
    console.error("Employer requirement submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit hiring requirement. Please try again." },
      { status: 500 }
    );
  }
}
