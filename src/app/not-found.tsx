import React from "react";
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md space-y-6">
          <div className="text-7xl font-extrabold text-blue-600 font-mono tracking-tighter">
            404
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Page Not Found</h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              The page you are looking for doesn&apos;t exist or may have been moved. Let&apos;s get
              you back on track.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-700 hover:text-blue-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Browse Openings</span>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
