import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import { ChevronLeft, ArrowRight, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const cs = await prisma.adsCaseStudy.findUnique({ where: { slug } });
  if (!cs) return { title: "Case Study Not Found | Vaivas Ads" };
  return {
    title: `${cs.title} | Case Studies | Vaivas Ads`,
    description: cs.objective,
  };
}

export default async function AdsCaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = await prisma.adsCaseStudy.findUnique({
    where: { slug },
  });

  if (!cs || !cs.isPublished) {
    notFound();
  }

  const metrics = (cs.resultsMetrics as Record<string, string>) || {};

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16 space-y-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <Link
            href="/ads/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Case Studies</span>
          </Link>

          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {cs.industry}
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-600 text-xs font-medium">
                Client: <strong>{cs.clientName}</strong>
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-500 text-xs">{cs.duration}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {cs.title}
            </h1>
          </div>

          {/* Cover Media */}
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900">
            <Image
              src={cs.coverImage}
              alt={cs.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Verified Metrics Banner */}
          <div className="p-6 rounded-3xl bg-blue-900 text-white shadow-lg space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Verified Campaign Performance
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
              {Object.entries(metrics).map(([k, v]) => (
                <div key={k}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{v}</div>
                  <div className="text-xs text-blue-200 capitalize mt-1">
                    {k.replace(/([A-Z])/g, " $1")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Storytelling */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-8 shadow-xs">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">1. The Business Challenge</h2>
              <p className="text-sm text-slate-700 leading-relaxed">{cs.challenge}</p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">2. Campaign Objectives</h2>
              <p className="text-sm text-slate-700 leading-relaxed">{cs.objective}</p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">3. Strategy &amp; Planning</h2>
              <p className="text-sm text-slate-700 leading-relaxed">{cs.strategy}</p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">4. Creative Concepts &amp; Execution</h2>
              <p className="text-sm text-slate-700 leading-relaxed">{cs.execution}</p>
            </div>

            {/* Channels Used */}
            <div className="space-y-3 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Channels &amp; Touchpoints Deployed
              </h3>
              <div className="flex flex-wrap gap-2">
                {cs.channels.map((ch, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4 shadow-xl">
            <h3 className="text-2xl font-bold">Ready to engineer similar results?</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Our directors will conduct an initial strategic audit of your current channels or print collateral.
            </p>
            <Link
              href="/ads/quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md"
            >
              <span>Schedule a Free Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <AdsFooter />
    </div>
  );
}
