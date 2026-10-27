import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminJobsManager from "@/components/admin/AdminJobsManager";

export const revalidate = 0;

async function getJobs() {
  try {
    return await prisma.jobListing.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { applications: true } },
      },
    });
  } catch (err) {
    console.error("Failed to load admin jobs:", err);
    return [];
  }
}

export default async function AdminJobsPage() {
  const jobs = await getJobs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vaivas Jobs Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, publish, close, or archive job postings. Closed or expired jobs automatically
            block applications.
          </p>
        </div>
      </div>

      <AdminJobsManager initialJobs={jobs} />
    </div>
  );
}
