import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import { Sparkles, Star, ArrowRight, ShieldCheck, Quote } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Clients & Testimonials | Vaivas Ads",
  description:
    "Approved reviews and endorsements from corporate leaders who trust Vaivas Ads for advertising campaigns and commercial print manufacturing.",
};

async function getTestimonialsData() {
  try {
    return await prisma.adsClientTestimonial.findMany({
      where: { isApproved: true },
      orderBy: { order: "asc" },
    });
  } catch (e) {
    return [];
  }
}

export default async function AdsClientsPage() {
  const testimonials = await getTestimonialsData();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16 space-y-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Verified Client Endorsements</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Clients &amp; Testimonials
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Genuine feedback from marketing directors, CXOs, and procurement leaders across India who rely on our creative and print production standards.
          </p>
        </section>

        {/* Testimonials Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-slate-200" />
                  </div>

                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-base">
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.clientName}</div>
                    <div className="text-xs text-slate-500 font-medium">
                      {t.designation}, <span className="text-slate-800">{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consultation Callout */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
            <h3 className="text-2xl font-bold">Partner with Vaivas Ads</h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Join leading organizations that trust us for precision brand growth and flawless print manufacturing.
            </p>
            <Link
              href="/ads/quote"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <AdsFooter />
    </div>
  );
}
