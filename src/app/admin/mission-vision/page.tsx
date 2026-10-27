import React from "react";
import Link from "next/link";
import { Eye, Target, Sparkles } from "lucide-react";

export const revalidate = 0;

export default async function AdminMissionVisionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mission & Vision Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Update long-term corporate goals, organizational principles, and company mission.
          </p>
        </div>
        <Link
          href="/mission-vision"
          target="_blank"
          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Live Page</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Current Mission Statement</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            &ldquo;To create opportunities, build meaningful connections, and deliver solutions that
            help individuals, brands and businesses grow with confidence.&rdquo;
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Current Vision Statement</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            &ldquo;To be a trusted and innovative growth partner, known for empowering people,
            elevating brands and shaping stronger organisations for a better tomorrow.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
