import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession, logActivity } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [requirements, candidates, matches] = await Promise.all([
    prisma.employerRequirement.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        matches: {
          include: {
            candidate: true,
            interviews: { orderBy: { scheduledAt: "desc" } },
          },
        },
      },
    }),
    prisma.candidateProfile.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.candidateMatch.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        candidate: true,
        employerRequirement: true,
        interviews: { orderBy: { scheduledAt: "desc" } },
      },
    }),
  ]);

  return NextResponse.json({ requirements, candidates, matches });
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { action } = body;

    // Action 1: Create a Match between Candidate and Requirement
    if (action === "CREATE_MATCH") {
      const { employerRequirementId, candidateId, recruiterNotes } = body;
      const match = await prisma.candidateMatch.create({
        data: {
          employerRequirementId,
          candidateId,
          recruiterNotes: recruiterNotes || "Candidate shortlisted by recruiter",
          status: "SCREENING",
        },
        include: { candidate: true, employerRequirement: true },
      });

      await logActivity(
        "MATCH_CANDIDATE",
        "RECRUITMENT",
        `Matched ${match.candidate.fullName} to ${match.employerRequirement.companyName} (${match.employerRequirement.jobRole})`,
        session.id,
        session.name
      );

      return NextResponse.json({ success: true, match });
    }

    // Action 2: Schedule Interview
    if (action === "SCHEDULE_INTERVIEW") {
      const {
        candidateMatchId,
        scheduledAt,
        mode,
        round,
        interviewerName,
        interviewerEmail,
        meetingLink,
      } = body;

      const interview = await prisma.interview.create({
        data: {
          candidateMatchId,
          scheduledAt: new Date(scheduledAt),
          mode: mode || "Virtual / Google Meet",
          round: round || "Round 1",
          interviewerName,
          interviewerEmail,
          meetingLink,
          result: "PENDING",
        },
      });

      // Update match status to INTERVIEW_SCHEDULED
      await prisma.candidateMatch.update({
        where: { id: candidateMatchId },
        data: { status: "INTERVIEW_SCHEDULED" },
      });

      await logActivity(
        "SCHEDULE_INTERVIEW",
        "RECRUITMENT",
        `Scheduled interview for match ${candidateMatchId} on ${scheduledAt}`,
        session.id,
        session.name
      );

      return NextResponse.json({ success: true, interview });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Recruitment API POST error:", error);
    return NextResponse.json({ error: error.message || "Failed operation" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { type, id, ...updates } = body;

    if (type === "REQUIREMENT") {
      const reqUpdated = await prisma.employerRequirement.update({
        where: { id },
        data: updates,
      });
      await logActivity(
        "UPDATE_REQUIREMENT",
        "RECRUITMENT",
        `Updated requirement ${reqUpdated.companyName} - ${reqUpdated.jobRole} (Status: ${reqUpdated.status})`,
        session.id,
        session.name
      );
      return NextResponse.json({ success: true, requirement: reqUpdated });
    }

    if (type === "MATCH") {
      const matchUpdated = await prisma.candidateMatch.update({
        where: { id },
        data: updates,
        include: { candidate: true, employerRequirement: true },
      });
      await logActivity(
        "UPDATE_MATCH_STATUS",
        "RECRUITMENT",
        `Updated match for ${matchUpdated.candidate.fullName} to ${matchUpdated.status}`,
        session.id,
        session.name
      );
      return NextResponse.json({ success: true, match: matchUpdated });
    }

    if (type === "INTERVIEW") {
      const interviewUpdated = await prisma.interview.update({
        where: { id },
        data: updates,
      });
      return NextResponse.json({ success: true, interview: interviewUpdated });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed update" }, { status: 500 });
  }
}
