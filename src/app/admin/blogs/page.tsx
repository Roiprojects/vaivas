import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BookOpen, ExternalLink, Clock, PlusCircle } from "lucide-react";

export const revalidate = 0;

async function getBlogs() {
  try {
    return await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    return [];
  }
}

export default async function AdminBlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog & Editorial CMS</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish articles, career advice guides, and branding perspectives.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-6">Article Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Read Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Live Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60">
                  <td className="py-4 px-6 font-bold text-slate-900 text-sm">
                    {b.title}
                  </td>
                  <td className="py-4 px-4 font-semibold text-orange-600">{b.category}</td>
                  <td className="py-4 px-4 text-slate-600">{b.authorName}</td>
                  <td className="py-4 px-4 text-slate-500">{b.readTimeMinutes} min</td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800">
                      PUBLISHED
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/blogs/${b.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 inline-block"
                      title="View Article"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
