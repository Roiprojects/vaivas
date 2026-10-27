import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import { Sparkles, ArrowRight, Clock, BookOpen } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Blog & Insights | Vaivas Ads",
  description:
    "Strategic marketing articles, commercial printing guides, and performance advertising insights from the Vaivas Ads creative team.",
};

async function getArticles() {
  try {
    return await prisma.adsBlogArticle.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch (e) {
    return [];
  }
}

export default async function AdsInsightsPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16 space-y-12">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-orange-600" />
            <span>Editorial Intelligence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Blog &amp; Strategic Insights
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Practical knowledge on scaling digital acquisition, brand positioning, and mastering physical print procurement.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <div
                key={art.id}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={art.coverImage}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 border border-slate-200">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                      <span>
                        {new Date(art.publishedAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">{art.authorName}</span>
                    <Link
                      href={`/ads/insights/${art.slug}`}
                      className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <AdsFooter />
    </div>
  );
}
