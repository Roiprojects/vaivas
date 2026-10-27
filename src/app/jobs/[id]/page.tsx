import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import { prisma } from "@/lib/prisma";
import {
  MapPin,
  Clock,
  Briefcase,
  Calendar,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Share2,
} from "lucide-react";
import JobApplyForm from "@/components/JobApplyForm";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;

  // Search by slug or uuid
  const job = await prisma.jobListing.findFirst({
    where: {
      OR: [{ slug: id }, { id: id }],
    },
  });

  if (!job) {
    notFound();
  }

  const isExpired = job.expiryDate ? new Date(job.expiryDate) < new Date() : false;
  const isClosed = job.status !== "PUBLISHED" || isExpired;

  return (
    <PublicLayout>
      <div className="bg-pale-blue min-h-screen py-10 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back button */}
          <div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all jobs</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Job Description */}
            <div className="lg:col-span-7 space-y-8 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
              <div className="space-y-4 pb-6 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                    {job.department}
                  </span>
                  {isClosed ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Applications Closed</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Actively Hiring ({job.openings} opening{job.openings > 1 ? "s" : ""})</span>
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {job.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{job.employmentType}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>{job.experienceLevel}</span>
                  </div>
                </div>

                {job.salaryRange && (
                  <div className="text-sm font-semibold text-emerald-700 bg-emerald-50/60 px-3.5 py-1.5 rounded-xl inline-block">
                    Compensation: {job.salaryRange}
                  </div>
                )}
              </div>

              {/* Description Body */}
              <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
                <div>
                  <h2 className="text-base font-bold text-slate-900 mb-2">Role Overview</h2>
                  <p className="whitespace-pre-line text-slate-600">{job.description}</p>
                </div>

                {job.requirements && (
                  <div>
                    <h2 className="text-base font-bold text-slate-900 mb-2">
                      Key Eligibility & Requirements
                    </h2>
                    <p className="whitespace-pre-line text-slate-600">{job.requirements}</p>
                  </div>
                )}

                {job.responsibilities && (
                  <div>
                    <h2 className="text-base font-bold text-slate-900 mb-2">Responsibilities</h2>
                    <p className="whitespace-pre-line text-slate-600">{job.responsibilities}</p>
                  </div>
                )}

                {job.benefits && (
                  <div>
                    <h2 className="text-base font-bold text-slate-900 mb-2">Benefits & Perks</h2>
                    <p className="whitespace-pre-line text-slate-600">{job.benefits}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Apply for this Position</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Submit your details and resume. Our recruitment team reviews every profile.
                  </p>
                </div>

                {isClosed ? (
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2 text-center">
                    <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                    <div className="text-sm font-bold text-amber-900">
                      Applications Are Closed
                    </div>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      This job listing is no longer accepting new submissions. Please check other
                      open positions.
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/jobs"
                        className="inline-block text-xs font-bold text-blue-600 hover:underline"
                      >
                        Explore Other Openings →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <JobApplyForm jobId={job.id} jobTitle={job.title} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
