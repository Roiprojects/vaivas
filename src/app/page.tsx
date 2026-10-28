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
  ShieldCheck,
  Zap,
} from "lucide-react";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Hero3DCanvas from "@/components/canvas/Hero3DCanvas";
import TiltCard from "@/components/3d/TiltCard";
import ScrollReveal from "@/components/3d/ScrollReveal";

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
      {/* 1. HERO SECTION WITH THREE.JS 3D CANVAS & DYNAMIC SCROLL ANIMATIONS */}
      <section className="relative overflow-hidden theme-canvas theme-hero-glow pt-10 pb-20 lg:pt-20 lg:pb-32 border-b border-white/10 cyber-grid">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Focused High-Impact Cyber Narrative */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <ScrollReveal direction="down" delay={0.1}>
                <div className="theme-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span>{cms?.hero?.badge || "Next-Gen Growth Ecosystem"}</span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08] text-white">
                  Connecting talent. <br />
                  <span className="theme-title-gradient">Building brands.</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                  {cms?.hero?.description ||
                    "Accelerating ambitious careers, visionary advertising campaigns, and enterprise HR recruitment through deep strategic execution."}
                </p>
              </ScrollReveal>

              {/* CTAs */}
              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="#our-businesses"
                    className="shimmer-btn theme-cta-btn inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm sm:text-base font-bold shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Explore Businesses</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm sm:text-base font-bold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-white/15 transition-all shadow-lg hover:border-cyan-400/40"
                  >
                    <PhoneCall className="w-4 h-4 text-cyan-400" />
                    <span>Let&apos;s Connect</span>
                  </Link>
                </div>
              </ScrollReveal>

              {/* Quick Trust Chips with Glowing Accents */}
              <ScrollReveal direction="up" delay={0.5}>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-5 border-t border-white/10 text-xs text-slate-300 font-medium">
                  <span className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <CheckCircle2 className="w-4 h-4 theme-primary-text" /> 10,000+ Careers Guided
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <CheckCircle2 className="w-4 h-4 theme-accent-text" /> 500+ Brand Campaigns
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <CheckCircle2 className="w-4 h-4 theme-primary-text" /> 250+ Enterprise Clients
                  </span>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Three.js Interactive 3D WebGL Canvas & Floating Glass Cards */}
            <div className="lg:col-span-6 relative mt-4 lg:mt-0 flex items-center justify-center">
              <div className="relative w-full max-w-lg lg:max-w-none aspect-square sm:aspect-4/3 flex items-center justify-center">
                {/* 3D WebGL Three.js Scene */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <Hero3DCanvas variant="hero" />
                </div>

                {/* Floating 3D Perspective Glass Badge (Top Right) */}
                <div className="absolute top-2 right-2 sm:top-6 sm:right-6 glass-panel-dark rounded-2xl p-3.5 shadow-2xl border border-white/15 hidden sm:flex items-center gap-3 animate-in fade-in duration-700 z-20 hover:border-cyan-400/50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Active Hiring</div>
                    <div className="text-[11px] text-slate-400">50+ Open Roles Across India</div>
                  </div>
                </div>

                {/* Floating 3D Perspective Glass Badge (Bottom Left) */}
                <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 glass-panel-dark rounded-2xl p-3.5 shadow-2xl border border-white/15 hidden sm:flex items-center gap-3 animate-in fade-in duration-1000 z-20 hover:border-rose-400/50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Creative Studio</div>
                    <div className="text-[11px] text-slate-400">2026 Print &amp; Digital Campaigns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (High-Trust Cyber Bento Metric Counters) */}
      <section className="py-12 theme-surface-subtle border-y border-white/10 relative z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="theme-surface rounded-3xl p-6 border text-center space-y-1.5 hover:border-cyan-400/40 transition-colors">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black theme-title-gradient font-mono">10,000+</div>
                <div className="text-sm font-bold text-slate-200">Careers Guided</div>
                <div className="text-xs text-slate-400">Direct candidate placements</div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="theme-surface rounded-3xl p-6 border text-center space-y-1.5 hover:border-cyan-400/40 transition-colors">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black theme-title-gradient font-mono">500+</div>
                <div className="text-sm font-bold text-slate-200">Brand Campaigns</div>
                <div className="text-xs text-slate-400">Digital &amp; Commercial Print</div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="theme-surface rounded-3xl p-6 border text-center space-y-1.5 hover:border-cyan-400/40 transition-colors">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black theme-title-gradient font-mono">250+</div>
                <div className="text-sm font-bold text-slate-200">Corporate Clients</div>
                <div className="text-xs text-slate-400">Pan-India enterprise scale</div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="theme-surface rounded-3xl p-6 border text-center space-y-1.5 hover:border-cyan-400/40 transition-colors">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black theme-title-gradient font-mono">99.4%</div>
                <div className="text-sm font-bold text-slate-200">Client Satisfaction</div>
                <div className="text-xs text-slate-400">Verified SLA delivery</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. THREE BUSINESS PILLARS (Interactive 3D Perspective Tilt Cards) */}
      <section id="our-businesses" className="section-spacing theme-canvas relative z-10 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
            <ScrollReveal direction="down">
              <div className="theme-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Verticals</span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Three pillars. <span className="theme-title-gradient">Infinite potential.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <p className="text-base text-slate-400">
                Specialized execution arms driving end-to-end talent, media, and corporate expansion.
              </p>
            </ScrollReveal>
          </div>

          {/* 3 Interactive 3D Perspective Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PILLAR 1: VAIVAS JOBS */}
            <TiltCard glowColor="rgba(56, 189, 248, 0.25)">
              <div className="theme-surface group rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between h-full hover:border-sky-400/50 transition-all">
                <div className="p-7 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold text-white tracking-tight">
                        Vaivas Jobs
                      </span>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      Careers
                    </span>
                  </div>

                  {/* 4K Image Visual */}
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-16/10 min-h-[200px] border border-white/10 shadow-lg">
                    <Image
                      src="/images/pillar-jobs.jpg"
                      alt="Vaivas Jobs career candidates"
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      Jobs for today. Growth for tomorrow.
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-2">
                      Direct connect with top hiring companies across technology, operations, and modern services.
                    </p>
                  </div>

                  {/* Value Checklist */}
                  <div className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>Verified corporate job openings</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>Direct recruiter interview scheduling</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>Zero candidate charges · 100% free</span>
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Link
                    href="/jobs"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold theme-primary-btn active:scale-95"
                  >
                    <span>Explore Open Jobs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>

            {/* PILLAR 2: VAIVAS ADS */}
            <TiltCard glowColor="rgba(244, 63, 94, 0.25)">
              <div className="theme-surface group rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between h-full hover:border-rose-400/50 transition-all">
                <div className="p-7 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold text-white tracking-tight">
                        Vaivas Ads
                      </span>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      Studio &amp; Print
                    </span>
                  </div>

                  {/* 4K Image Visual */}
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-16/10 min-h-[200px] border border-white/10 shadow-lg">
                    <Image
                      src="/images/pillar-ads.jpg"
                      alt="Vaivas Ads creative marketing agency"
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      Big ideas. Real commercial impact.
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-2">
                      High-impact digital marketing, corporate branding, and commercial table calendar production.
                    </p>
                  </div>

                  {/* Value Checklist */}
                  <div className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Digital advertising &amp; social marketing</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Brand identity &amp; creative direction</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Commercial offset print &amp; calendars</span>
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Link
                    href="/ads"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold theme-cta-btn active:scale-95"
                  >
                    <span>Explore Creative Studio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>

            {/* PILLAR 3: HR RECRUITMENT */}
            <TiltCard glowColor="rgba(16, 185, 129, 0.25)">
              <div className="theme-surface group rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between h-full hover:border-emerald-400/50 transition-all">
                <div className="p-7 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold text-white tracking-tight">
                        HR Recruitment
                      </span>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Enterprise
                    </span>
                  </div>

                  {/* 4K Image Visual */}
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-16/10 min-h-[200px] border border-white/10 shadow-lg">
                    <Image
                      src="/images/pillar-hr.jpg"
                      alt="HR recruitment interviews and executive placement"
                      fill
                      quality={95}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      People who fit. Teams that win.
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-2">
                      Strategic headhunting, corporate staffing, and executive talent placement for modern companies.
                    </p>
                  </div>

                  {/* Value Checklist */}
                  <div className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Executive search &amp; leadership hiring</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>High-volume tech &amp; operations staffing</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Rapid 72-hour candidate shortlisting</span>
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Link
                    href="/hr-recruitment"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold theme-primary-btn active:scale-95"
                  >
                    <span>Staffing Solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 4. CURATED WORK & CULTURE VISUAL SHOWCASE (4K Images, Framer Motion Reveals) */}
      <section className="section-spacing theme-surface-subtle border-y border-white/10 relative z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <ScrollReveal direction="down">
                <div className="theme-badge inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full border mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Visual Portfolio</span>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                  Work, creativity &amp; <span className="theme-title-gradient">life at Vaivas</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <p className="mt-2 text-base text-slate-400 max-w-xl">
                  Real projects, verified campaigns, and the collaborative momentum behind our delivery.
                </p>
              </ScrollReveal>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 6-Card 4K Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border border-white/10 hover:border-cyan-400/40 transition-all">
                <Image
                  src="/images/ads/project-1.jpg"
                  alt="Brand Identity & Creative Design"
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Branding &amp; Packaging</span>
                  <span className="text-base font-bold">Premium Brand Identity &amp; Creative</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border border-white/10 hover:border-cyan-400/40 transition-all">
                <Image
                  src="/images/ads/print-calendar-showcase.jpg"
                  alt="Commercial Print & Calendar Production"
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">Print Production</span>
                  <span className="text-base font-bold">Offset Commercial Calendars &amp; Collaterals</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border border-white/10 hover:border-cyan-400/40 transition-all">
                <Image
                  src="/images/gallery-2.jpg"
                  alt="Collaborative Workplace Culture"
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Culture</span>
                  <span className="text-base font-bold">Collaborative Energy &amp; Career Growth</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border border-white/10 hover:border-cyan-400/40 transition-all">
                <Image
                  src="/images/ads/project-2.jpg"
                  alt="Performance Marketing Campaigns"
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Outdoor &amp; Digital</span>
                  <span className="text-base font-bold">Multi-Channel 3D Outdoor Campaigns</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border border-white/10 hover:border-cyan-400/40 transition-all">
                <Image
                  src="/images/gallery-1.jpg"
                  alt="Executive Strategy & Client Reviews"
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">Strategy</span>
                  <span className="text-base font-bold">Enterprise Consulting &amp; Advisory</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <div className="theme-surface group relative rounded-3xl overflow-hidden aspect-16/10 min-h-[220px] border border-white/10 hover:border-cyan-400/40 transition-all">
                <Image
                  src="/images/gallery-3.jpg"
                  alt="Innovation & Milestones"
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Headquarters</span>
                  <span className="text-base font-bold">Bengaluru Innovation Campus</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. PURPOSE: MISSION & VISION (Cyber Glass Cards) */}
      <section className="section-spacing theme-canvas relative z-10 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <ScrollReveal direction="down">
                <div className="theme-badge inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full border shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Guiding North Star</span>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                  Your success, <br />
                  <span className="theme-title-gradient">our mission.</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <p className="text-base text-slate-300 leading-relaxed font-light">
                  We believe in the power of talent, the transformative momentum of brave ideas, and lasting corporate partnerships.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.3}>
                <div className="pt-2">
                  <Link
                    href="/mission-vision"
                    className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Explore our core principles</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mission Card */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="theme-surface p-7 sm:p-8 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden hover:border-sky-400/40 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Our Mission</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    To create meaningful career avenues, craft impactful brand marketing, and deliver reliable staffing that helps businesses grow.
                  </p>
                  <div className="w-10 h-1 bg-sky-400 rounded-full mt-2"></div>
                </div>
              </ScrollReveal>

              {/* Vision Card */}
              <ScrollReveal direction="left" delay={0.3}>
                <div className="theme-surface p-7 sm:p-8 rounded-3xl border border-white/10 space-y-4 relative overflow-hidden hover:border-rose-400/40 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Our Vision</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    To be India&apos;s most trusted multi-disciplinary growth partner across employment, creative brand building, and talent operations.
                  </p>
                  <div className="w-10 h-1 bg-rose-400 rounded-full mt-2"></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6. APPROVED CLIENT REVIEWS & TESTIMONIALS */}
      <section className="section-spacing theme-surface-subtle border-t border-white/10 relative z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <ScrollReveal direction="down">
                <div className="theme-badge inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full border shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Client Feedback</span>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Trusted by leaders &amp; <span className="theme-title-gradient">job seekers</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <p className="text-base text-slate-400 leading-relaxed">
                  Real feedback from candidates placed and corporate partners we have helped grow.
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.3}>
                <div className="pt-2">
                  <Link
                    href="/testimonials"
                    className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Read all testimonials</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7">
              <TestimonialCarousel items={testimonials} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER CTA - High-Luxury Obsidian Portal */}
      <section className="section-spacing theme-canvas border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="theme-surface relative rounded-[2.5rem] border border-white/15 p-10 sm:p-16 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            {/* Ambient Lighting Orbs */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-60 bg-sky-500/20" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-60 bg-rose-500/20" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div className="space-y-4 max-w-2xl">
                <div className="theme-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Journey</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                  Ready to elevate <span className="theme-title-gradient">your future?</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                  Whether you&apos;re seeking your next career leap, planning a high-ROI advertising campaign, or hiring executive talent.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="shimmer-btn theme-cta-btn inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base font-bold shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
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
