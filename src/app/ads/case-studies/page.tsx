import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Case Studies & Verified Results | Vaivas Ads",
  description:
    "Explore how Vaivas Ads solved critical growth and production challenges for leading enterprises with verified performance metrics.",
};

async function getCaseStudies() {
  try {
    return await prisma.adsCaseStudy.findMany({
      where: { isPublished: true, isApproved: true },
      orderBy: { order: "asc" },
    });
  } catch (e) {
    return [];
  }
}

export default async function AdsCaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16 space-y-12">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Documented &amp; Approved Outcomes</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Case Studies &amp; Campaign Results
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Real challenges. Measured solutions. Transparent performance figures supported by available records.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((cs) => {
              const metrics = (cs.resultsMetrics as Record<string, string>) || {};
              return (
                <div
                  key={cs.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={cs.coverImage}
                      alt={cs.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 border border-slate-200">
                      {cs.industry}
                    </div>
                  </div>

                  <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="text-xs font-semibold text-blue-700">
                        Client: {cs.clientName} • {cs.duration}
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                        {cs.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        <strong className="text-slate-800">Challenge:</strong> {cs.challenge}
                      </p>

                      {/* Verified Metrics Banner */}
                      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 grid grid-cols-2 gap-4">
                        {Object.entries(metrics).map(([key, val]) => (
                          <div key={key}>
                            <div className="text-base sm:text-lg font-extrabold text-blue-800">{val}</div>
                            <div className="text-[10px] text-slate-500 capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500">{cs.serviceCategory}</span>
                      <Link
                        href={`/ads/case-studies/${cs.slug}`}
                        className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1"
                      >
                        <span>Full Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <AdsFooter />
    </div>
  );
}
