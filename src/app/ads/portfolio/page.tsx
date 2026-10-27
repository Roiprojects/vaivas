import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import { Sparkles, ArrowRight, Eye, Layers } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Our Work & Portfolio | Vaivas Ads",
  description:
    "Explore our creative portfolio spanning digital advertising campaigns, brand identity systems, and commercial print suites.",
};

async function getPortfolioData() {
  try {
    return await prisma.adsProject.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
  } catch (e) {
    return [];
  }
}

export default async function AdsPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "All" } = await searchParams;
  const allProjects = await getPortfolioData();

  const categories = [
    "All",
    "Digital Ads",
    "Branding",
    "Calendars",
    "Print Creatives",
  ];

  const filteredProjects =
    category === "All"
      ? allProjects
      : allProjects.filter((p) => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16 space-y-12">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Creative Showcase</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Our Work &amp; Portfolio
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            From high-conversion digital funnels to tactile 300 GSM executive desk calendars and commercial print suites.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/ads/portfolio" : `/ads/portfolio?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  category.toLowerCase() === cat.toLowerCase()
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500">
              No projects found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 border border-slate-200">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-blue-700">
                        Client: {project.clientName}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {project.summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {project.deliverables.slice(0, 3).map((d, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 text-xs">
                        <span className="text-slate-400 font-medium">{project.industry}</span>
                        <Link
                          href={`/ads/portfolio/${project.slug}`}
                          className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1"
                        >
                          <span>Explore Project</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">
              Have a similar brand or printing project in mind?
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Our directors will review your exact deliverables and provide custom samples and quotes.
            </p>
            <Link
              href="/ads/quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-sm"
            >
              <span>Discuss Your Requirement</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <AdsFooter />
    </div>
  );
}
