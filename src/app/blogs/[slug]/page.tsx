import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import { prisma } from "@/lib/prisma";
import { Clock, Calendar, ArrowLeft, User, Share2 } from "lucide-react";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const blog = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!blog) {
    notFound();
  }

  // Related articles
  const related = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      NOT: { id: blog.id },
    },
    take: 2,
    orderBy: { publishedAt: "desc" },
  });

  return (
    <PublicLayout>
      <article className="min-h-screen bg-white py-10 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back link */}
          <div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all insights</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase">
              {blog.category}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pt-2 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-2 font-medium text-slate-700">
                <User className="w-4 h-4 text-slate-400" />
                <span>{blog.authorName}</span>
                {blog.authorRole && <span className="text-slate-400">({blog.authorRole})</span>}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{blog.readTimeMinutes} min read</span>
              </div>
              <span>•</span>
              <div>
                {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-16/9 rounded-3xl overflow-hidden shadow-md bg-slate-100 border border-slate-100">
            <Image
              src={blog.coverImage || "/images/blog-1.jpg"}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 pt-4 text-base sm:text-lg">
            <p className="font-medium text-lg sm:text-xl text-slate-800 leading-relaxed">
              {blog.excerpt}
            </p>
            <div className="whitespace-pre-line pt-2 text-slate-600 leading-loose">
              {blog.content}
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="pt-12 border-t border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blogs/${rel.slug}`}
                    className="p-5 rounded-2xl bg-pale-blue border border-slate-200/80 hover:border-blue-400 transition-all group"
                  >
                    <span className="text-[11px] font-bold text-orange-600 uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 mt-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{rel.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </PublicLayout>
  );
}
