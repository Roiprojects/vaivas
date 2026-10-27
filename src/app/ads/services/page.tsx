import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Printer,
  Megaphone,
  Palette,
  Search,
  Share2,
  Award,
  Target,
  Code,
  TrendingUp,
  Video,
  Users,
} from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Services & Disciplines | Vaivas Ads",
  description:
    "Explore our full suite of 12 advertising, branding, web engineering, and commercial print production services.",
};

const iconMap: Record<string, any> = {
  Megaphone,
  Search,
  Share2,
  Palette,
  Award,
  Target,
  Code,
  TrendingUp,
  Video,
  Users,
  Printer,
  Calendar,
  Sparkles,
};

async function getServices() {
  try {
    return await prisma.adsService.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
  } catch (e) {
    return [];
  }
}

export default async function AdsServicesPage() {
  const services = await getServices();

  const categories = [
    "Digital Advertising",
    "Branding & Creative",
    "Web & Content",
    "Print Media & Calendars",
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16 space-y-16">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>End-to-End Creative &amp; Production Offerings</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Our Advertising &amp; Manufacturing Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            12 specialized disciplines engineered to take your business from initial strategic brand identity all the way to 365-day physical calendar presence and national print delivery.
          </p>
        </section>

        {/* Categories Breakdown */}
        {categories.map((cat, cIdx) => {
          const categoryServices = services.filter((s) => s.category === cat);
          if (categoryServices.length === 0) return null;

          return (
            <section key={cIdx} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                    Category {String(cIdx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {cat}
                  </h2>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {categoryServices.length} dedicated offerings
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service) => {
                  const IconComponent = iconMap[service.icon] || Sparkles;
                  return (
                    <div
                      key={service.id}
                      className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group"
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                          <IconComponent className="w-6 h-6" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                            {service.summary}
                          </p>
                        </div>

                        {/* Benefits list */}
                        {service.benefits && service.benefits.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-slate-100">
                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Key Highlights
                            </div>
                            <ul className="space-y-1.5 text-xs text-slate-600">
                              {service.benefits.slice(0, 3).map((b, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                        <Link
                          href={`/ads/services/${service.slug}`}
                          className="text-blue-700 hover:text-blue-800 flex items-center gap-1"
                        >
                          <span>Explore Scope &amp; FAQs</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/ads/quote?service=${encodeURIComponent(service.name)}`}
                          className="text-orange-600 hover:text-orange-700 hover:underline"
                        >
                          Quote →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Global FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Service Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 p-6 space-y-4">
            <div className="space-y-1.5 pt-2">
              <h4 className="text-sm font-bold text-slate-900">
                Can we combine digital advertising with print collaterals?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes, our most successful client engagements involve synchronized omni-channel campaigns where digital ad leads receive physical brochures or executive 2026 desk calendars during in-person pitches.
              </p>
            </div>

            <div className="space-y-1.5 pt-4">
              <h4 className="text-sm font-bold text-slate-900">
                How do you ensure print colors match our brand guidelines?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We calibrate our Heidelberg offset presses to ISO 12647-2 standards and provide signed digital contract proofs (or wet proof sheets on request) prior to bulk imaging.
              </p>
            </div>

            <div className="space-y-1.5 pt-4">
              <h4 className="text-sm font-bold text-slate-900">
                What are your commercial payment terms?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                For manufacturing and calendar suites, standard terms are 50% advance upon digital artwork proof sign-off, with the 50% balance payable prior to dispatch following internal quality clearance.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to request an itemized proposal?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Our strategy and print specialists are ready to review your requirements and provide verified quotes within 4 business hours.
            </p>
            <Link
              href="/ads/quote"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all shadow-md"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <AdsFooter />
    </div>
  );
}
