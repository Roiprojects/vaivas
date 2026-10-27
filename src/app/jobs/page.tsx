import React from "react";
import Link from "next/link";
import Image from "next/image";
import PublicLayout from "@/components/PublicLayout";
import { prisma } from "@/lib/prisma";
import { MapPin, Clock, Briefcase, Calendar, Search, ArrowRight, CheckCircle2 } from "lucide-react";
import JobsSearchList from "@/components/JobsSearchList";

export const metadata = {
  title: "Vaivas Jobs | Career Opportunities Across India",
  description:
    "Explore career opportunities with top employers and within the Vaivas Ventures ecosystem.",
};

async function getJobs() {
  try {
    return await prisma.jobListing.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { postedAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to load jobs:", err);
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-blue-50/60 via-white to-white py-14 lg:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="relative h-9 w-36">
                <Image
                  src="/images/logos/vaivas-jobs-logo.png"
                  alt="Vaivas Jobs"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Jobs for today. <br />
                <span className="text-blue-600">Growth for tomorrow.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Browse hand-picked professional career opportunities. Connect with progressive
                enterprises and take the next leap in your professional journey.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm max-w-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Direct Openings</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All roles listed here are actively managed by Vaivas Ventures and our accredited
                client partners with transparent feedback cycles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Searchable Listing Component */}
      <section className="section-spacing bg-pale-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <JobsSearchList initialJobs={jobs} />
        </div>
      </section>
    </PublicLayout>
  );
}
