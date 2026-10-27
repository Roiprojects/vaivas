import React from "react";
import Link from "next/link";
import Image from "next/image";
import PublicLayout from "@/components/PublicLayout";
import { prisma } from "@/lib/prisma";
import {
  ArrowRight,
  Briefcase,
  TrendingUp,
  Users,
  Target,
  Eye,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Calendar,
  Layers,
  Award,
} from "lucide-react";
import TestimonialCarousel from "@/components/TestimonialCarousel";

// Fetch data from PostgreSQL
async function getHomeData() {
  try {
    const pageContent = await prisma.pageContent.findUnique({
      where: { id: "home" },
    });
    const latestBlogs = await prisma.blogPost.findMany({
      where: { isPublished: true },
      take: 2,
      orderBy: { publishedAt: "desc" },
    });
    const testimonials = await prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: { order: "asc" },
      take: 5,
    });
    const galleryItems = await prisma.galleryItem.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
      take: 6,
    });

    return {
      cms: (pageContent?.publishedData as any) || null,
      latestBlogs,
      testimonials,
      galleryItems,
    };
  } catch (err) {
    console.error("Database read fallback on Home:", err);
    return {
      cms: null,
      latestBlogs: [],
      testimonials: [],
      galleryItems: [],
    };
  }
}

export default async function HomePage() {
  const { cms, latestBlogs, testimonials } = await getHomeData();

  return (
    <PublicLayout>
      {/* 1. HERO SECTION - Clean, High-Impact, Visual-First */}
      <section className="relative overflow-hidden theme-canvas theme-hero-glow pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Focused, Punchy Message */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="theme-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{cms?.hero?.badge || "Ecosystem for Growth"}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                Connecting talent. <br />
                <span className="theme-title-gradient">Building brands.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                {cms?.hero?.description ||
                  "Empowering ambitious careers, impactful brand marketing, and executive staffing across India."}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="#our-businesses"
                  className="shimmer-btn theme-cta-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Businesses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200/90 transition-all shadow-xs"
                >
                  <PhoneCall className="w-4 h-4 text-slate-500" />
                  <span>Let&apos;s Connect</span>
                </Link>
              </div>

              {/* Quick Trust Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-200/60 text-xs text-slate-600 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 theme-primary-text" /> 10,000+ Careers Guided
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 theme-accent-text" /> 500+ Brand Campaigns
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 theme-primary-text" /> 250+ Enterprise Clients
                </span>
              </div>
            </div>

            {/* Right Column: Visual Showcase with Floating Glass Cards */}
            <div className="lg:col-span-6 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Decorative Ambient Aura */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/15 via-blue-400/15 to-emerald-400/15 rounded-[2.5rem] blur-xl"></div>
                
                {/* Hero Team Visual (4K High Resolution) */}
                <div className="relative w-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-100 aspect-16/11 min-h-[300px] sm:min-h-[380px] lg:min-h-[440px]">
                  <Image
                    src="/images/hero-team.jpg"
                    alt="Vaivas Ventures team and culture"
                    fill
                    priority
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Floating Glass Metric Chip (Top Right) */}
                <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 glass-panel rounded-2xl p-3 sm:p-3.5 shadow-xl hidden sm:flex items-center gap-3 animate-in fade-in duration-500 z-20">
                  <div className="w-10 h-10 rounded-xl theme-primary-bg text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Active Hiring</div>
                    <div className="text-[11px] text-slate-500">50+ Open Roles Across India</div>
                  </div>
                </div>

                {/* Floating Glass Metric Chip (Bottom Left) */}
                <div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 glass-panel rounded-2xl p-3 sm:p-3.5 shadow-xl hidden sm:flex items-center gap-3 animate-in fade-in duration-700 z-20">
                  <div className="w-10 h-10 rounded-xl theme-accent-bg text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Creative &amp; Print</div>
                    <div className="text-[11px] text-slate-500">2026 Calendar &amp; Ad Studio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (High-Trust Bento Metric Counters) */}
      <section className="py-10 theme-surface-subtle border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="theme-surface rounded-3xl p-5 sm:p-6 border text-center space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black theme-title-gradient font-mono">10,000+</div>
              <div className="text-xs font-bold text-slate-800">Careers Guided</div>
              <div className="text-[11px] text-slate-500">Direct placements</div>
            </div>
            <div className="theme-surface rounded-3xl p-5 sm:p-6 border text-center space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black theme-title-gradient font-mono">500+</div>
              <div className="text-xs font-bold text-slate-800">Brand Campaigns</div>
              <div className="text-[11px] text-slate-500">Digital &amp; Print</div>
            </div>
            <div className="theme-surface rounded-3xl p-5 sm:p-6 border text-center space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black theme-title-gradient font-mono">250+</div>
              <div className="text-xs font-bold text-slate-800">Corporate Clients</div>
              <div className="text-[11px] text-slate-500">Pan-India scale</div>
            </div>
            <div className="theme-surface rounded-3xl p-5 sm:p-6 border text-center space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black theme-title-gradient font-mono">99.4%</div>
              <div className="text-xs font-bold text-slate-800">Client Satisfaction</div>
              <div className="text-[11px] text-slate-500">Verified delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE BUSINESS PILLARS (Visual-First, High Premium Cards) */}
      <section id="our-businesses" className="section-spacing theme-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
            <div className="theme-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Verticals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Three pillars. <span className="theme-title-gradient">Limitless possibilities.</span>
            </h2>
            <p className="text-base text-slate-600">
              Each dedicated to excellence, united by one vision of growth.
            </p>
          </div>

          {/* 3 Distinct Luxury Pillar Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PILLAR 1: VAIVAS JOBS */}
            <div className="theme-surface group rounded-3xl border overflow-hidden flex flex-col justify-between">
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl theme-badge flex items-center justify-center font-bold">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="text-base font-extrabold tracking-tight">
                      Vaivas Jobs
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full theme-badge">
                    Careers
                  </span>
                </div>

                {/* Large 4K Visual Photo */}
                <div className="relative w-full rounded-2xl overflow-hidden aspect-16/10 min-h-[190px] shadow-sm border border-black/5">
                  <Image
                    src="/images/pillar-jobs.jpg"
                    alt="Vaivas Jobs career candidates"
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    Jobs for today. Growth for tomorrow.
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    Direct connect with top hiring companies across technology, operations, and services.
                  </p>
                </div>

                {/* 3 Value Pills */}
                <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 theme-primary-text shrink-0" />
                    <span>Verified corporate job openings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 theme-primary-text shrink-0" />
                    <span>Direct recruiter interview scheduling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 theme-primary-text shrink-0" />
                    <span>Zero candidate charges / 100% free</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/jobs"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold theme-primary-btn active:scale-95"
                >
                  <span>Explore Open Jobs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* PILLAR 2: VAIVAS ADS */}
            <div className="theme-surface group rounded-3xl border overflow-hidden flex flex-col justify-between">
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl theme-badge flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-base font-extrabold tracking-tight">
                      Vaivas Ads
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full theme-badge">
                    Studio &amp; Print
                  </span>
                </div>

                {/* Large 4K Visual Photo */}
                <div className="relative w-full rounded-2xl overflow-hidden aspect-16/10 min-h-[190px] shadow-sm border border-black/5">
                  <Image
                    src="/images/pillar-ads.jpg"
                    alt="Vaivas Ads creative marketing agency"
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    Big ideas. Real commercial impact.
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    Performance digital campaigns, high-end branding, and corporate print solutions.
                  </p>
                </div>

                {/* 3 Value Pills */}
                <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 theme-accent-text shrink-0" />
                    <span>Digital advertising &amp; social media</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 theme-accent-text shrink-0" />
                    <span>Brand identity &amp; creative direction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 theme-accent-text shrink-0" />
                    <span>Commercial offset print &amp; calendars</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/ads"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold theme-cta-btn active:scale-95"
                >
                  <span>Explore Creative Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* PILLAR 3: HR RECRUITMENT */}
            <div className="theme-surface group rounded-3xl border overflow-hidden flex flex-col justify-between">
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl theme-badge flex items-center justify-center font-bold">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-base font-extrabold tracking-tight">
                      HR Recruitment
                    </span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full theme-badge">
                    Enterprise
                  </span>
                </div>

                {/* Large 4K Visual Photo */}
                <div className="relative w-full rounded-2xl overflow-hidden aspect-16/10 min-h-[190px] shadow-sm border border-black/5">
                  <Image
                    src="/images/pillar-hr.jpg"
                    alt="HR recruitment interviews and executive placement"
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    People who fit. Teams that win.
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    Strategic headhunting, corporate staffing, and executive search for modern enterprises.
                  </p>
                </div>

                {/* 3 Value Pills */}
                <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 theme-primary-text shrink-0" />
                    <span>Executive search &amp; leadership hiring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 theme-primary-text shrink-0" />
                    <span>High-volume tech &amp; operations staffing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 theme-primary-text shrink-0" />
                    <span>Fast 72-hour candidate shortlisting</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/hr-recruitment"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold theme-primary-btn active:scale-95"
                >
                  <span>Staffing Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED WORK & CULTURE VISUAL SHOWCASE (4K Images, Bento Grid) */}
      <section className="section-spacing theme-surface-subtle border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="theme-badge inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full border mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Visual Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Work, creativity &amp; <span className="theme-title-gradient">life at Vaivas</span>
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-xl">
                Real moments, genuine campaigns, and the collaborative spirit driving our results.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-bold theme-primary-text hover:underline whitespace-nowrap"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 6-Card 4K High-Definition Image Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Image 1 - 4K Luxury Stationery */}
            <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border">
              <Image
                src="/images/ads/project-1.jpg"
                alt="Brand Identity & Creative Design"
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-400">Branding &amp; Packaging</span>
                <span className="text-base font-bold">Premium Brand Identity &amp; Creative</span>
              </div>
            </div>

            {/* Image 2 - 4K 2026 Bespoke Calendar */}
            <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border">
              <Image
                src="/images/ads/print-calendar-showcase.jpg"
                alt="Commercial Print & Calendar Production"
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold text-blue-400">Print Production</span>
                <span className="text-base font-bold">Offset Commercial Calendars &amp; Collaterals</span>
              </div>
            </div>

            {/* Image 3 - 4K Career Success */}
            <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border">
              <Image
                src="/images/gallery-2.jpg"
                alt="Collaborative Workplace Culture"
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Culture</span>
                <span className="text-base font-bold">Collaborative Energy &amp; Career Growth</span>
              </div>
            </div>

            {/* Image 4 - 4K 3D Digital Billboard */}
            <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border">
              <Image
                src="/images/ads/project-2.jpg"
                alt="Performance Marketing Campaigns"
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-400">Outdoor &amp; Digital</span>
                <span className="text-base font-bold">Multi-Channel 3D Outdoor Campaigns</span>
              </div>
            </div>

            {/* Image 5 - 4K Executive Boardroom */}
            <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border">
              <Image
                src="/images/gallery-1.jpg"
                alt="Executive Strategy & Client Reviews"
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold text-blue-400">Strategy</span>
                <span className="text-base font-bold">Enterprise Consulting &amp; Advisory</span>
              </div>
            </div>

            {/* Image 6 - 4K Bengaluru Venture Studio Headquarters */}
            <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border">
              <Image
                src="/images/gallery-3.jpg"
                alt="Innovation & Milestones"
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Headquarters</span>
                <span className="text-base font-bold">Bengaluru Innovation Campus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PURPOSE: MISSION & VISION (Concise, Super-Premium Cards) */}
      <section className="section-spacing theme-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="theme-badge inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full border shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Guiding North Star</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Your success, <br />
                <span className="theme-title-gradient">our mission.</span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-light">
                We believe in the power of people, the potential of creative ideas, and the measurable progress of long-term partnership.
              </p>
              <div className="pt-2">
                <Link
                  href="/mission-vision"
                  className="inline-flex items-center gap-2 text-sm font-bold theme-primary-text hover:underline"
                >
                  <span>Explore our core principles</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mission Card */}
              <div className="theme-surface p-7 sm:p-8 rounded-3xl border space-y-3.5 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl theme-badge flex items-center justify-center font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To create meaningful career avenues, craft impactful brand marketing, and deliver reliable staffing that helps businesses grow.
                </p>
                <div className="w-10 h-1 theme-primary-bg rounded-full mt-2"></div>
              </div>

              {/* Vision Card */}
              <div className="theme-surface p-7 sm:p-8 rounded-3xl border space-y-3.5 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl theme-badge flex items-center justify-center font-bold">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To be India&apos;s most trusted multi-disciplinary growth partner across employment, creative brand building, and talent operations.
                </p>
                <div className="w-10 h-1 theme-accent-bg rounded-full mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. APPROVED CLIENT REVIEWS & TESTIMONIALS */}
      <section className="section-spacing theme-surface-subtle border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <div className="theme-badge inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full border shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Client Feedback</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Trusted by leaders &amp; <span className="theme-title-gradient">job seekers</span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Real feedback from candidates placed and corporate partners we have helped grow.
              </p>
              <div className="pt-2">
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-1.5 text-sm font-bold theme-primary-text hover:underline"
                >
                  <span>Read all testimonials</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <TestimonialCarousel items={testimonials} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER CTA - High-Luxury Light Theme Bento Ribbon */}
      <section className="section-spacing theme-canvas border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="theme-surface relative rounded-[2.5rem] border p-10 sm:p-16 overflow-hidden shadow-2xl">
            {/* Ambient Lighting Orbs */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-80" style={{ backgroundColor: "var(--theme-glow-orb-2)" }}></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-80" style={{ backgroundColor: "var(--theme-glow-orb-1)" }}></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="space-y-4 max-w-2xl">
                <div className="theme-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Journey</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                  Ready to elevate <span className="theme-title-gradient">your future?</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                  Whether you&apos;re seeking your next career leap, planning a high-ROI advertising campaign, or hiring executive talent.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="shimmer-btn theme-cta-btn inline-flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
