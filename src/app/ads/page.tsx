import React from "react";
import Image from "next/image";
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
  TrendingUp,
  Award,
  Layers,
  FileCheck,
  Truck,
  ShieldCheck,
  Star,
  Quote,
} from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Vaivas Ads | Big ideas. Real impact. | Advertising, Branding & Print",
  description:
    "Advertising, branding and print. Built around your business. Digital performance marketing, creative agency, commercial offset printing and custom 2026 corporate calendars.",
};

async function getHomePageData() {
  try {
    const [services, projects, caseStudies, testimonials, blogs, setting] =
      await Promise.all([
        prisma.adsService.findMany({
          where: { isPublished: true },
          orderBy: { order: "asc" },
        }),
        prisma.adsProject.findMany({
          where: { isPublished: true },
          orderBy: { order: "asc" },
          take: 6,
        }),
        prisma.adsCaseStudy.findMany({
          where: { isPublished: true, isApproved: true },
          orderBy: { order: "asc" },
          take: 2,
        }),
        prisma.adsClientTestimonial.findMany({
          where: { isApproved: true, isFeatured: true },
          orderBy: { order: "asc" },
          take: 4,
        }),
        prisma.adsBlogArticle.findMany({
          where: { isPublished: true },
          orderBy: { publishedAt: "desc" },
          take: 3,
        }),
        prisma.adsSetting.findUnique({
          where: { id: "global" },
        }),
      ]);

    return { services, projects, caseStudies, testimonials, blogs, setting };
  } catch (error) {
    console.error("Error fetching Ads homepage data:", error);
    return {
      services: [],
      projects: [],
      caseStudies: [],
      testimonials: [],
      blogs: [],
      setting: null,
    };
  }
}

export default async function VaivasAdsHomePage() {
  const { services, projects, caseStudies, testimonials, blogs } =
    await getHomePageData();

  // Group services into the 4 clusters defined in the specification
  const serviceClusters = [
    {
      clusterName: "Digital Advertising",
      badge: "Performance & Media",
      description:
        "High-intent search, social performance funnels, and algorithmic media buying engineered for measurable ROAS.",
      items: services.filter((s) => s.category === "Digital Advertising"),
      icon: Megaphone,
      accentColor: "from-blue-600/10 to-blue-600/5 text-blue-700",
    },
    {
      clusterName: "Branding & Creative",
      badge: "Identity & Visuals",
      description:
        "Timeless corporate identities, distinctive packaging systems, and conversion-focused visual communication.",
      items: services.filter((s) => s.category === "Branding & Creative"),
      icon: Palette,
      accentColor: "from-purple-600/10 to-purple-600/5 text-purple-700",
    },
    {
      clusterName: "Web & Content",
      badge: "Digital Storefronts",
      description:
        "High-speed Next.js web applications, organic search dominance, and cinema-grade short-form video content.",
      items: services.filter((s) => s.category === "Web & Content"),
      icon: TrendingUp,
      accentColor: "from-emerald-600/10 to-emerald-600/5 text-emerald-700",
    },
    {
      clusterName: "Print Media & Calendars",
      badge: "Commercial Manufacturing",
      description:
        "Precision commercial offset printing and bespoke 2026 corporate desk and wall calendar programs with nationwide delivery.",
      items: services.filter((s) => s.category === "Print Media & Calendars"),
      icon: Printer,
      accentColor: "from-orange-600/10 to-orange-600/5 text-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <AdsNavbar />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Matching Preview Composition)             */}
        {/* ========================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-slate-50 border-b border-slate-200/80 pt-10 pb-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headline and CTAs */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold tracking-wide border border-blue-200/60 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>By Vaivas Ventures • Full-Service Agency &amp; Print Works</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
                  Big ideas. <br />
                  <span className="text-blue-700">Real impact.</span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Advertising, branding and print. Built around your business.
                  We unite creative distinction with commercial print manufacturing to scale ambitious brands.
                </p>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/ads/quote"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold text-base transition-all shadow-md hover:shadow-lg hover:shadow-orange-600/25 active:scale-98"
                  >
                    <span>Get a Free Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/ads/portfolio"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-semibold text-base transition-all border border-slate-300 shadow-2xs"
                  >
                    <span>Explore Our Work</span>
                  </Link>
                </div>

                {/* Proof Highlights */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200/80 max-w-md mx-auto lg:mx-0 text-left">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">12+</div>
                    <div className="text-xs text-slate-500 font-medium">Service Disciplines</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">100%</div>
                    <div className="text-xs text-slate-500 font-medium">CMYK Proof Checked</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">365-Day</div>
                    <div className="text-xs text-slate-500 font-medium">Brand Visibility</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Art-Directed Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Subtle Background Glow */}
                  <div className="absolute -inset-3 bg-gradient-to-tr from-blue-400/20 to-orange-400/20 rounded-3xl blur-2xl -z-10"></div>
                  
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src="/images/ads/ads-hero.jpg"
                        alt="Vaivas Ads branding, digital media and print showcase"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Floating Metric Badge */}
                  <div className="absolute -bottom-6 -left-6 sm:bottom-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 max-w-xs">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">2026 Corporate Calendars</div>
                      <div className="text-[11px] text-slate-500">Executive desk &amp; wall suites open</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. COMPANY INTRODUCTION                                   */}
        {/* ========================================================= */}
        <section className="py-16 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                About Vaivas Ads
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Creative thinking. Strategic advertising. Meaningful growth.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                We believe brand impact requires two forces working in complete harmony: persuasive creative strategy that captures audience attention, and precise physical execution that cements lasting brand recall.
              </p>
              <div className="pt-2">
                <Link
                  href="/ads/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                >
                  <span>Learn more about our methodology and leadership team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. SERVICE HIGHLIGHTS (Grouped by 4 Core Clusters)        */}
        {/* ========================================================= */}
        <section className="py-20 bg-slate-50/80 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Comprehensive Capabilities
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Our Service Disciplines
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                  Explore our four specialized practices covering full-funnel digital growth, visual brand identity, digital development, and commercial print manufacturing.
                </p>
              </div>
              <Link
                href="/ads/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                <span>View all 12 services in detail</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 4 Cluster Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviceClusters.map((cluster, idx) => {
                const IconComponent = cluster.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-7 space-y-6 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cluster.accentColor} flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                          {cluster.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {cluster.clusterName}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {cluster.description}
                      </p>

                      {/* Included Offerings */}
                      <div className="pt-2 border-t border-slate-100 space-y-2.5">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Key Offerings
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cluster.items.map((srv) => (
                            <Link
                              key={srv.id}
                              href={`/ads/services/${srv.slug}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-xs font-medium text-slate-700 hover:text-blue-700 transition-colors"
                            >
                              <span>{srv.name}</span>
                              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-700" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        {cluster.items.length} confirmed service offerings
                      </span>
                      <Link
                        href="/ads/quote"
                        className="text-orange-600 hover:text-orange-700 font-bold hover:underline"
                      >
                        Request Consultation →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. FEATURED PORTFOLIO PROJECTS                            */}
        {/* ========================================================= */}
        <section id="portfolio" className="py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Featured Work
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Selected Campaigns &amp; Creatives
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                  A curated selection of our digital campaigns, branding initiatives, and commercial print suites.
                </p>
              </div>
              <Link
                href="/ads/portfolio"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                <span>Browse entire portfolio gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="group bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                    <Image
                      src={proj.coverImage}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 border border-slate-200">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-blue-700">
                        Client: {proj.clientName}
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {proj.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-medium text-slate-500">
                      <span>{proj.industry}</span>
                      <Link
                        href={`/ads/portfolio/${proj.slug}`}
                        className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. PRINT & CALENDAR SHOWCASE: FIRST IDEA TO FINAL DELIVERY*/}
        {/* ========================================================= */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
                  <Printer className="w-3.5 h-3.5" />
                  <span>Commercial Offset &amp; Calendar Works</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  From first idea <br />
                  <span className="text-orange-400">to final delivery.</span>
                </h2>

                <p className="text-base text-slate-300 leading-relaxed max-w-lg">
                  Every print job—from 10,000 corporate brochures to executive 2026 desk calendars—passes through a rigorous 5-stage quality governance pipeline. No surprises, no color shifts, no delayed deliveries.
                </p>

                {/* 5-Step Pipeline Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
                      <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">1</span>
                      <span>Enquiry &amp; Specs</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Select GSM, finishes, binding, and dimensions with instant itemized quotes.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
                      <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">2</span>
                      <span>Quotation &amp; Terms</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Transparent commercial terms, payment milestones, and confirmed lead times.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
                      <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">3</span>
                      <span>Artwork &amp; Proofing</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      300 DPI CMYK pre-flight check, dates validation, and customer sign-off.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
                      <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center">4</span>
                      <span>Precision Production</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Heidelberg offset printing, spot UV, foiling, die-cutting &amp; Wire-O binding.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/ads/quote?tab=calendar"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-orange-500/25"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Configure 2026 Calendars</span>
                  </Link>
                  <Link
                    href="/ads/quote?tab=print"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Get Print Media Quote</span>
                  </Link>
                </div>
              </div>

              {/* Right Side Visual */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700/60 bg-slate-800">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/images/ads/print-calendar-showcase.jpg"
                      alt="Bespoke Executive Desk Calendars and Print Manufacturing"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. VERIFIED CASE STUDY RESULTS                            */}
        {/* ========================================================= */}
        <section className="py-20 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Data-Driven Proof
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Documented Case Studies &amp; Outcomes
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                We believe in verified performance metrics over inflated claims. Explore how we solved critical challenges for leading enterprises.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((cs) => {
                const metrics = (cs.resultsMetrics as Record<string, string>) || {};
                return (
                  <div
                    key={cs.id}
                    className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-md transition-all space-y-6 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-100">
                          {cs.industry}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {cs.duration}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {cs.title}
                      </h3>

                      <div className="space-y-2 text-xs text-slate-600">
                        <p>
                          <strong className="text-slate-900">The Challenge:</strong> {cs.challenge}
                        </p>
                        <p>
                          <strong className="text-slate-900">Our Strategy:</strong> {cs.strategy}
                        </p>
                      </div>

                      {/* Verified Metrics Banner */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 gap-4">
                        {Object.entries(metrics).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-lg font-extrabold text-blue-700">{value}</div>
                            <div className="text-[11px] text-slate-500 capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Verified by {cs.clientName}
                      </span>
                      <Link
                        href={`/ads/case-studies/${cs.slug}`}
                        className="text-orange-600 hover:text-orange-700 font-bold hover:underline"
                      >
                        Read Full Case Study →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. WHY CHOOSE VAIVAS ADS & OUR METHODOLOGY                 */}
        {/* ========================================================= */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                The Vaivas Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Why Ambitious Brands Partner With Us
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Unlike fragmented freelancers or print brokers, we integrate strategic thinking, creative firepower, and direct factory-grade printing under one unified roof.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  01
                </div>
                <h4 className="text-lg font-bold text-slate-900">Strategic Alignment</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We don&apos;t run campaigns for vanity likes. Every creative asset and media rupee is mapped directly to qualified sales and business revenue.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                  02
                </div>
                <h4 className="text-lg font-bold text-slate-900">Creative Distinction</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zero generic stock-photo grids. Our art directors craft bespoke typography, custom illustrations, and candid imagery that make your brand unmistakable.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                  03
                </div>
                <h4 className="text-lg font-bold text-slate-900">Print Precision</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rigorous pre-flight checks, 300 DPI resolution, exact Pantone color matching, and heavy-duty substrates that feel luxurious in the hand.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-700 font-bold">
                  04
                </div>
                <h4 className="text-lg font-bold text-slate-900">Transparent Governance</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear itemized quotations, signed digital proofs, staged payment milestones, and real-time shipment dispatch tracking with zero hidden surcharges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. CLIENT TESTIMONIALS & TRUST                            */}
        {/* ========================================================= */}
        <section className="py-20 bg-slate-50/80 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Endorsements
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Client Trust &amp; Approved Reviews
              </h2>
              <p className="text-sm text-slate-600">
                Genuine feedback from business leaders and corporate marketing teams across India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 italic leading-relaxed">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                      {t.clientName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{t.clientName}</div>
                      <div className="text-[11px] text-slate-500">
                        {t.designation}, {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. LATEST BLOG ARTICLES / INSIGHTS                        */}
        {/* ========================================================= */}
        <section className="py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Insights &amp; Resources
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  Latest from the Creative Studio
                </h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl">
                  Strategic insights, technical printing guides, and performance advertising breakdowns.
                </p>
              </div>
              <Link
                href="/ads/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                <span>Read all articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="group bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                    <Image
                      src={b.coverImage}
                      alt={b.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 border border-slate-200">
                      {b.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-[11px] font-semibold text-slate-400">
                        {new Date(b.publishedAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        • {b.readTimeMinutes} min read
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                        {b.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {b.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-500">{b.authorName}</span>
                      <Link
                        href={`/ads/insights/${b.slug}`}
                        className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AdsFooter />
    </div>
  );
}
