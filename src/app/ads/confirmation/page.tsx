import React from "react";
import Link from "next/link";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const revalidate = 0;

export default async function AdsConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const resolved = await searchParams;
  const ref = resolved.ref || "ENQ-ADS-2026-CONFIRMED";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Enquiry Successfully Logged
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Thank you. Your request is registered.
            </h1>
            <p className="text-sm text-slate-600">
              Your project specifications have been assigned to our senior commercial quote specialist.
            </p>
          </div>

          {/* Reference Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 inline-block text-left w-full max-w-md mx-auto space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Enquiry Reference Number
            </div>
            <div className="text-xl font-mono font-bold text-blue-700 tracking-wide select-all">
              {ref}
            </div>
            <div className="text-xs text-slate-500">
              Please cite this reference in any phone or WhatsApp inquiries.
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left text-xs text-slate-600 space-y-3 pt-4 border-t border-slate-100">
            <div className="font-bold text-slate-900">What Happens Next:</div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">1</span>
              <span>Technical Feasibility &amp; Pricing Review (Pre-flight checks for paper GSM, finishes, and schedule).</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">2</span>
              <span>Formal Itemized Quotation delivery via email with breakdown of GST, delivery, and payment milestones.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">3</span>
              <span>Digital proof sign-off prior to releasing plates or launching campaigns.</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/ads"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-all shadow-sm"
            >
              <span>Return to Ads Homepage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/ads/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-medium text-xs transition-all"
            >
              <span>Browse Portfolio</span>
            </Link>
          </div>
        </div>
      </main>

      <AdsFooter />
    </div>
  );
}
