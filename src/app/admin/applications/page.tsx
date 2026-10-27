import React from "react";
import { prisma } from "@/lib/prisma";
import AdminApplicationsManager from "@/components/admin/AdminApplicationsManager";

export const revalidate = 0;

async function getApplications() {
  try {
    return await prisma.jobApplication.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        job: { select: { title: true, department: true } },
      },
    });
  } catch (err) {
    console.error("Failed to load applications:", err);
    return [];
  }
}

export default async function AdminApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Job Applications Desk</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review incoming candidate submissions, access authorized resume downloads, and update review
          stages.
        </p>
      </div>

      <AdminApplicationsManager initialApplications={applications} />
    </div>
  );
}
