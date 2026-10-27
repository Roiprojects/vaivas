import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import { BookOpen, ExternalLink, Plus } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Blog & Editorial Articles | Vaivas Ads Admin",
};

export default async function AdminAdsBlogsPage() {
  const articles = await prisma.adsBlogArticle.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <AdsAdminHeader />

      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Published Marketing Articles ({articles.length})
            </h3>
            <p className="text-xs text-slate-500">
              Editorial intelligence on digital advertising and print procurement.
            </p>
          </div>
          <Link
            href="/ads/insights"
            target="_blank"
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>Live Articles</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Title &amp; URL Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div>{a.title}</div>
                    <div className="font-mono text-[10px] text-blue-700">/ads/insights/{a.slug}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-[10px] text-slate-700">
                      {a.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{a.authorName}</td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(a.publishedAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Published
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/ads/insights/${a.slug}`}
                      target="_blank"
                      className="px-2.5 py-1 rounded-lg text-blue-700 hover:underline font-semibold"
                    >
                      Read Live →
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
