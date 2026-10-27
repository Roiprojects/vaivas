import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import { ChevronLeft, Clock, ArrowRight, Sparkles } from "lucide-react";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await prisma.adsBlogArticle.findUnique({ where: { slug } });
  if (!article) return { title: "Article Not Found | Vaivas Ads" };
  return {
    title: `${article.title} | Vaivas Ads Insights`,
    description: article.excerpt,
  };
}

export default async function AdsArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await prisma.adsBlogArticle.findUnique({
    where: { slug },
  });

  if (!article || !article.isPublished) {
    notFound();
  }

  const relatedArticles = await prisma.adsBlogArticle.findMany({
    where: {
      id: { not: article.id },
      isPublished: true,
    },
    take: 2,
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16 space-y-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Link
            href="/ads/insights"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </Link>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
                {article.category}
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-500 text-xs">
                {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-500 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readTimeMinutes} min read
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed italic border-l-4 border-orange-500 pl-4">
              {article.excerpt}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Body */}
          <article className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6 text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
            {article.content}
          </article>

          {/* Author Box */}
          <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Published By
              </div>
              <div className="text-base font-bold text-slate-900">{article.authorName}</div>
              <div className="text-xs text-orange-600 font-semibold">{article.authorRole}</div>
            </div>
            <Link
              href="/ads/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-sm"
            >
              <span>Consult Author</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-bold text-slate-900">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((ra) => (
                  <Link
                    key={ra.id}
                    href={`/ads/insights/${ra.slug}`}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all space-y-2 group block"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                      {ra.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {ra.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{ra.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <AdsFooter />
    </div>
  );
}
