import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = await prisma.adsService.findUnique({
    where: { slug },
  });

  if (!service) return { title: "Service Not Found | Vaivas Ads" };

  return {
    title: `${service.name} | Services | Vaivas Ads`,
    description: service.summary,
  };
}

export default async function AdsServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const service = await prisma.adsService.findUnique({
    where: { slug },
  });

  if (!service || !service.isPublished) {
    notFound();
  }

  const relatedServices = await prisma.adsService.findMany({
    where: {
      category: service.category,
      id: { not: service.id },
      isPublished: true,
    },
    take: 3,
  });

  const IconComponent = iconMap[service.icon] || Sparkles;
  const processSteps = (service.process as Array<{ stepNumber: number; title: string; description: string }>) || [];
  const faqs = (service.faqs as Array<{ question: string; answer: string }>) || [];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16 space-y-16">
        {/* Service Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {service.category}
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-500 text-xs font-medium">
                Service Order #{service.order}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
                  {service.name}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 min-w-[280px]">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Ready to proceed?
                </div>
                <p className="text-xs text-slate-500">
                  Receive an itemized quote with confirmed lead time.
                </p>
                <Link
                  href={
                    service.category === "Print Media & Calendars"
                      ? service.slug.includes("calendar")
                        ? "/ads/quote?tab=calendar"
                        : "/ads/quote?tab=print"
                      : `/ads/quote?service=${encodeURIComponent(service.name)}`
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-all shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{service.ctaText}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits & Inclusions */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Key Benefits */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-700" />
                <span>Strategic Advantages &amp; Benefits</span>
              </h2>
              <ul className="space-y-3 pt-2">
                {service.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inclusions */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-600" />
                <span>Scope &amp; Deliverables Included</span>
              </h2>
              <ul className="space-y-3 pt-2">
                {service.inclusions.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Strategy and Process */}
        {processSteps.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                Execution Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                How We Execute {service.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                    0{step.stepNumber}
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Questions Answered
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Frequently Asked Questions about {service.name}
              </h2>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 p-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              Related Services in {service.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rs) => (
                <Link
                  key={rs.id}
                  href={`/ads/services/${rs.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {rs.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{rs.summary}</p>
                  <div className="mt-3 text-xs font-semibold text-orange-600 flex items-center gap-1">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <AdsFooter />
    </div>
  );
}
