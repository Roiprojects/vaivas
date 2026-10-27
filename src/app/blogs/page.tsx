import React from "react";
import Image from "next/image";
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import { prisma } from "@/lib/prisma";
import { Calendar, Clock, User, ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Insights & Updates | Vaivas Ventures Blog",
  description:
    "Thoughts, perspectives, and expert commentary on careers, branding, and modern enterprise recruitment.",
};

async function getBlogs() {
  try {
    return await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to load blogs:", err);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <PublicLayout>
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-14 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3">
            Our Blogs & Perspectives
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Insights & Updates
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Exploring trends, actionable guides, and industry analyses on careers, branding, and
            workplace transformation.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover-card-elevate flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/10 bg-slate-100">
                    <Image
                      src={blog.coverImage || "/images/blog-1.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-orange-600 shadow-xs">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readTimeMinutes} min read</span>
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors">
                      <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-medium">By {blog.authorName}</div>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
