import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CheckCircle2, Globe, Eye } from "lucide-react";

export const revalidate = 0;

export default async function AdminAboutPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">About Us Page CMS</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage company background, organizational history, core values, and executive leadership.
          </p>
        </div>
        <Link
          href="/about"
          target="_blank"
          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Live Page</span>
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Company Overview Content</h3>
        <p className="text-xs text-slate-500">
          The About Us page content reflects the corporate history and principles of Vaivas
          Ventures.
        </p>

        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-700">Primary Headline</div>
            <div className="text-sm text-slate-900 font-semibold">
              Empowering people. Elevating businesses across India.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-700">Corporate Pillars</div>
            <div className="text-xs text-slate-600">
              01. Vaivas Jobs (Career enablement) • 02. Vaivas Ads (Advertising &amp; print studio) • 03.
              HR Recruitment (Enterprise talent search).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
