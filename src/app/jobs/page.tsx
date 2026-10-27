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
      {/* 1. VISUAL HERO BANNER - High-Contrast, Image-Rich, Concise */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-12 sm:py-16 lg:py-20">
        {/* Subtle mesh background grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content - Punchy & Minimal */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide uppercase shadow-sm">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span>Pan-India Career Ecosystem</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                Jobs for today. <br />
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                  Growth for tomorrow.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-light max-w-xl mx-auto lg:mx-0">
                Explore hand-picked professional roles with top enterprises and startups. Direct recruiter scheduling with transparent outcomes.
              </p>

              {/* Fast Trust Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Free for Candidates</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Verified Employers</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Direct HR Scheduling</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image Showcase with Floating Glass Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden aspect-4/3 border-2 border-white/20 shadow-2xl">
                  <Image
                    src="/images/pillar-jobs.jpg"
                    alt="Professionals in modern careers"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Bottom Image Overlay Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-semibold text-white/90">Curated Corporate Openings</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white font-bold text-[10px]">
                      Live Hiring
                    </span>
                  </div>
                </div>

                {/* Floating Metric Pill */}
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 glass-panel-dark text-white rounded-2xl p-3 shadow-xl flex items-center gap-2.5 border border-white/15">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Active Positions</div>
                    <div className="text-[11px] text-blue-300">Bengaluru &amp; Pan-India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCHABLE JOB LISTINGS */}
      <section className="section-spacing bg-slate-50/70 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <JobsSearchList initialJobs={jobs} />
        </div>
      </section>
    </PublicLayout>
  );
}
