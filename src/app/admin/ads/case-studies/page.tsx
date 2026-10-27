import React from "react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import { Award, ExternalLink } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Case Studies Management | Vaivas Ads Admin",
};

export default async function AdminAdsCaseStudiesPage() {
  const caseStudies = await prisma.adsCaseStudy.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-8">
      <AdsAdminHeader />

      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Approved Case Studies ({caseStudies.length})
            </h3>
            <p className="text-xs text-slate-500">
              Only evidence-backed performance figures and approved client metrics are shown.
            </p>
          </div>
          <Link
            href="/ads/case-studies"
            target="_blank"
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>Live Case Studies</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Title &amp; Client</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Service Category</th>
                <th className="py-3 px-4">Verified Metrics Snapshot</th>
                <th className="py-3 px-4 text-center">Client Approval</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {caseStudies.map((cs) => {
                const metrics = (cs.resultsMetrics as Record<string, string>) || {};
                return (
                  <tr key={cs.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{cs.title}</div>
                      <div className="text-[11px] text-blue-700 font-medium">Client: {cs.clientName}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{cs.industry}</td>
                    <td className="py-3 px-4 text-slate-600">{cs.serviceCategory}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(metrics).slice(0, 2).map(([k, v]) => (
                          <span key={k} className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold text-[10px]">
                            {v}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Approved
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/ads/case-studies/${cs.slug}`}
                        target="_blank"
                        className="px-2.5 py-1 rounded-lg text-blue-700 hover:underline font-semibold"
                      >
                        View Live →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
