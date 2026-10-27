import React, { Suspense } from "react";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import { AdsQuoteConfigurator } from "@/components/ads/AdsQuoteConfigurator";
import { Sparkles, ShieldCheck, Clock, Award } from "lucide-react";

export const metadata = {
  title: "Get a Quote & Free Consultation | Vaivas Ads",
  description:
    "Configure bespoke 2026 corporate desk calendars, commercial offset print media, or digital performance advertising. Receive an itemized quotation.",
};

export default function AdsQuotePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Strategic Consultation &amp; Itemized Estimates</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              Request a Custom Quote &amp; Specification
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Select your product discipline below. Whether manufacturing 5,000 corporate executive calendars or scaling Google &amp; Meta ad funnels, we provide transparent, itemized proposals.
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-xs">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-600 shrink-0" />
              <div>
                <strong className="text-slate-900 block font-bold">4-Hour Response</strong>
                <span className="text-slate-500">Estimates issued rapidly</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <div>
                <strong className="text-slate-900 block font-bold">Signed Proofing</strong>
                <span className="text-slate-500">Zero error pre-flight checks</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
              <Award className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong className="text-slate-900 block font-bold">Direct Factory Pricing</strong>
                <span className="text-slate-500">No print middleman fees</span>
              </div>
            </div>
          </div>

          {/* Configurator Card with Suspense */}
          <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading quote configurator...</div>}>
            <AdsQuoteConfigurator />
          </Suspense>
        </div>
      </main>

      <AdsFooter />
    </div>
  );
}
