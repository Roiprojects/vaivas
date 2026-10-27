import React from "react";
import { prisma } from "@/lib/prisma";
import AdminRecruitmentManager from "@/components/admin/AdminRecruitmentManager";

export const revalidate = 0;

async function getRecruitmentData() {
  try {
    const [requirements, candidates, matches] = await Promise.all([
      prisma.employerRequirement.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          matches: {
            include: { candidate: true },
          },
        },
      }),
      prisma.candidateProfile.findMany({
        orderBy: { createdAt: "desc" },
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

    return { requirements, candidates, matches };
  } catch (err) {
    console.error("Failed to load recruitment data:", err);
    return { requirements: [], candidates: [], matches: [] };
  }
}

export default async function AdminRecruitmentPage() {
  const { requirements, candidates, matches } = await getRecruitmentData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">HR Recruitment Operations</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage corporate employer requirements, candidate pools, role matches, and multi-round
          interviews with full audit status tracking.
        </p>
      </div>

      <AdminRecruitmentManager
        requirements={requirements}
        candidates={candidates}
        matches={matches}
      />
    </div>
  );
}
