import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import { Sparkles, Plus, ExternalLink } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Portfolio Management | Vaivas Ads Admin",
};

export default async function AdminAdsPortfolioPage() {
  const projects = await prisma.adsProject.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-8">
      <AdsAdminHeader />

      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Creative Portfolio &amp; Campaigns ({projects.length})
            </h3>
            <p className="text-xs text-slate-500">
              Manage showcase projects, client deliverables, and homepage featured placement.
            </p>
          </div>
          <Link
            href="/ads/portfolio"
            target="_blank"
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Preview</th>
                <th className="py-3 px-4">Project Title &amp; Client</th>
                <th className="py-3 px-4">Category &amp; Industry</th>
                <th className="py-3 px-4">Deliverables</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{p.title}</div>
                    <div className="text-[11px] text-blue-700">Client: {p.clientName}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">{p.category}</div>
                    <div className="text-[10px] text-slate-400">{p.industry}</div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {p.deliverables.slice(0, 2).map((d, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600">
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.isFeatured ? "bg-amber-100 text-amber-800" : "text-slate-400"}`}>
                      {p.isFeatured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Published
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/ads/portfolio/${p.slug}`}
                      target="_blank"
                      className="px-2.5 py-1 rounded-lg text-blue-700 hover:underline font-semibold"
                    >
                      View Live →
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
