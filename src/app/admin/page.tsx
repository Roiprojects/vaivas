import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Briefcase,
  FileText,
  Users,
  Megaphone,
  Calendar,
  UserCheck,
  BookOpen,
  Inbox,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 0; // Fresh metrics

async function getDashboardStats() {
  try {
    const [
      publishedJobs,
      totalApplications,
      pendingApplications,
      activeCampaigns,
      openHiringReqs,
      totalCandidates,
      upcomingInterviews,
      confirmedJoinings,
      publishedBlogs,
      contactEnquiries,
      recentApplications,
      recentRequirements,
    ] = await Promise.all([
      prisma.jobListing.count({ where: { status: "PUBLISHED" } }),
      prisma.jobApplication.count(),
      prisma.jobApplication.count({ where: { status: "NEW" } }),
      prisma.adCampaign.count({ where: { isPublished: true } }),
      prisma.employerRequirement.count({ where: { status: { in: ["NEW", "ACTIVE", "IN_REVIEW"] } } }),
      prisma.candidateProfile.count(),
      prisma.interview.count({ where: { result: "PENDING" } }),
      prisma.candidateMatch.count({ where: { status: "JOINED" } }),
      prisma.blogPost.count({ where: { isPublished: true } }),
      prisma.contactEnquiry.count({ where: { status: "NEW" } }),
      prisma.jobApplication.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { job: { select: { title: true } } },
      }),
      prisma.employerRequirement.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      publishedJobs,
      totalApplications,
      pendingApplications,
      activeCampaigns,
      openHiringReqs,
      totalCandidates,
      upcomingInterviews,
      confirmedJoinings,
      publishedBlogs,
      contactEnquiries,
      recentApplications,
      recentRequirements,
    };
  } catch (err) {
    console.error("Dashboard metrics error:", err);
    return {
      publishedJobs: 0,
      totalApplications: 0,
      pendingApplications: 0,
      activeCampaigns: 0,
      openHiringReqs: 0,
      totalCandidates: 0,
      upcomingInterviews: 0,
      confirmedJoinings: 0,
      publishedBlogs: 0,
      contactEnquiries: 0,
      recentApplications: [],
      recentRequirements: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      label: "Published Jobs",
      value: stats.publishedJobs,
      subtext: `${stats.pendingApplications} new applications pending`,
      icon: Briefcase,
      color: "blue",
      href: "/admin/jobs",
    },
    {
      label: "Total Applications",
      value: stats.totalApplications,
      subtext: "Across all active vacancies",
      icon: FileText,
      color: "indigo",
      href: "/admin/applications",
    },
    {
      label: "Open Hiring Reqs",
      value: stats.openHiringReqs,
      subtext: "Active corporate employer roles",
      icon: Users,
      color: "emerald",
      href: "/admin/hr-recruitment",
    },
    {
      label: "Upcoming Interviews",
      value: stats.upcomingInterviews,
      subtext: `${stats.confirmedJoinings} confirmed joinings`,
      icon: Calendar,
      color: "purple",
      href: "/admin/hr-recruitment",
    },
    {
      label: "Ad Campaigns",
      value: stats.activeCampaigns,
      subtext: "Published agency showcases",
      icon: Megaphone,
      color: "orange",
      href: "/admin/ads",
    },
    {
      label: "New Contact Leads",
      value: stats.contactEnquiries,
      subtext: "Pending response & follow-up",
      icon: Inbox,
      color: "amber",
      href: "/admin/enquiries",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Operations Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time platform metrics and incoming candidate/employer pipelines.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/jobs/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post New Job</span>
          </Link>
          <Link
            href="/admin/hr-recruitment"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-xs"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Match Candidates</span>
          </Link>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 transition-colors shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Publish Blog</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover-card-elevate flex items-start justify-between group"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">{card.label}</span>
                <div className="text-3xl font-extrabold text-slate-900 font-mono">
                  {card.value}
                </div>
                <div className="text-[11px] text-slate-400">{card.subtext}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two Pipeline Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Job Applications */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Latest Job Applications</span>
            </h2>
            <Link
              href="/admin/applications"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View All ({stats.totalApplications})
            </Link>
          </div>

          {stats.recentApplications.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No applications received yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-slate-900">{app.fullName}</div>
                    <div className="text-xs text-slate-500">
                      Applied for <strong className="text-slate-700">{app.job.title}</strong>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        app.status === "NEW"
                          ? "bg-amber-100 text-amber-800"
                          : app.status === "SHORTLISTED"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {app.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {new Date(app.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Employer Requirements */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Active Employer Hiring Inquiries</span>
            </h2>
            <Link
              href="/admin/hr-recruitment"
              className="text-xs font-semibold text-emerald-600 hover:underline"
            >
              Recruitment Desk →
            </Link>
          </div>

          {stats.recentRequirements.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No hiring requests yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentRequirements.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-slate-900">{req.companyName}</div>
                    <div className="text-xs text-slate-500">
                      Role: <strong className="text-slate-700">{req.jobRole}</strong> ({req.openings} opening{req.openings > 1 ? "s" : ""})
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        req.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-800"
                          : req.status === "NEW"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {req.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">
                      {req.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
