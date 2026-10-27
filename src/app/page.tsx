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
  ChevronRight,
  Sparkles,
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
      take: 3,
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
  const { cms, latestBlogs, testimonials, galleryItems } = await getHomeData();

  return (
    <PublicLayout>
      {/* 1. HERO SECTION (Split Hero matching preview) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white bg-mesh-glow pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{cms?.hero?.badge || "People, Opportunity & Growth"}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Connecting talent. <br />
                <span className="text-gradient-primary">Building brands.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-xl">
                {cms?.hero?.description ||
                  "People, opportunity and creative growth. Together at Vaivas Ventures."}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="#our-businesses"
                  className="shimmer-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 shadow-[0_4px_16px_rgba(234,88,12,0.32)] hover:shadow-[0_6px_22px_rgba(234,88,12,0.42)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Explore Our Businesses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-base font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200/90 transition-all shadow-xs hover:border-slate-300"
                >
                  <span>Get in Touch</span>
                </Link>
              </div>

              {/* 3 KPI Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">People</div>
                    <div className="text-[11px] text-slate-500">Empowered</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Brands</div>
                    <div className="text-[11px] text-slate-500">Elevated</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Opportunities</div>
                    <div className="text-[11px] text-slate-500">Created</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image (with organic curved frame matching preview) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-500/20 via-orange-400/20 to-emerald-400/20 rounded-[2.5rem] blur-xs"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-slate-100 aspect-16/10">
                  <Image
                    src="/images/hero-team.jpg"
                    alt="Vaivas Ventures executive team collaborating"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE PILLARS SECTION (Strict Sequence: Jobs -> Ads -> HR Recruitment) */}
      <section id="our-businesses" className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-600 mb-2">
              <span className="w-6 h-0.5 bg-orange-600"></span>
              <span>Our Businesses</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Three pillars. A bigger tomorrow.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              From meaningful career opportunities to powerful brand stories and people solutions,
              Vaivas Ventures brings together three dynamic businesses to create lasting impact.
            </p>
          </div>

          {/* Pillar Cards List */}
          <div className="space-y-6">
            {/* 01. VAIVAS JOBS */}
            <div className="group relative rounded-3xl bg-blue-50/40 border border-blue-100/80 p-6 sm:p-8 hover-card-elevate overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Number & Text */}
                <div className="lg:col-span-6 flex items-start gap-5">
                  <span className="text-4xl sm:text-5xl font-extrabold text-blue-400/60 font-mono tracking-tighter">
                    01
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-32">
                        <Image
                          src="/images/logos/vaivas-jobs-logo.png"
                          alt="Vaivas Jobs"
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      Real opportunities for real people. We connect job seekers with the right
                      opportunities across industries, helping them build brighter careers.
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/jobs"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:gap-2.5 transition-all"
                      >
                        <span>Explore Vaivas Jobs</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card Graphic Photo */}
                <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-16/7 sm:aspect-16/6 shadow-sm border border-white">
                  <Image
                    src="/images/pillar-jobs.jpg"
                    alt="Vaivas Jobs candidates and workplaces"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Right Value Proposition */}
                <div className="lg:col-span-2 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-blue-200/60 pt-4 lg:pt-0 lg:pl-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">
                    Jobs for today.
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Growth for tomorrow.
                  </div>
                </div>
              </div>
            </div>

            {/* 02. VAIVAS ADS */}
            <div className="group relative rounded-3xl bg-orange-50/40 border border-orange-100/80 p-6 sm:p-8 hover-card-elevate overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Number & Text */}
                <div className="lg:col-span-6 flex items-start gap-5">
                  <span className="text-4xl sm:text-5xl font-extrabold text-orange-400/60 font-mono tracking-tighter">
                    02
                  </span>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-32">
                        <Image
                          src="/images/logos/vaivas-ads-logo.png"
                          alt="Vaivas Ads"
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      Creative ideas. Real results. We craft compelling advertising solutions that
                      help brands connect, engage and grow in a digital-first world.
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/ads"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 group-hover:gap-2.5 transition-all"
                      >
                        <span>Explore Vaivas Ads</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card Graphic Photo */}
                <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-16/7 sm:aspect-16/6 shadow-sm border border-white">
                  <Image
                    src="/images/pillar-ads.jpg"
                    alt="Vaivas Ads creative digital studio"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Right Value Proposition */}
                <div className="lg:col-span-2 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-orange-200/60 pt-4 lg:pt-0 lg:pl-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">
                    Creative stories
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    for bolder brands.
                  </div>
                </div>
              </div>
            </div>

            {/* 03. HR RECRUITMENT (Directly below Vaivas Ads, with green theme accents) */}
            <div className="group relative rounded-3xl bg-emerald-50/40 border border-emerald-100/80 p-6 sm:p-8 hover-card-elevate overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Number & Text */}
                <div className="lg:col-span-6 flex items-start gap-5">
                  <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400/60 font-mono tracking-tighter">
                    03
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">
                      HR Recruitment
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      People who fit. Teams that win. We help businesses find, hire and nurture the
                      right talent to build stronger, future-ready organisations.
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/hr-recruitment"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 group-hover:gap-2.5 transition-all"
                      >
                        <span>Explore HR Recruitment</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Card Graphic Photo */}
                <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-16/7 sm:aspect-16/6 shadow-sm border border-white">
                  <Image
                    src="/images/pillar-hr.jpg"
                    alt="HR recruitment interviews and executive placement"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Right Value Proposition */}
                <div className="lg:col-span-2 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-emerald-200/60 pt-4 lg:pt-0 lg:pl-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">
                    The right talent
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    for a brighter tomorrow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PURPOSE: MISSION & VISION */}
      <section className="section-spacing bg-pale-blue border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-600">
                <span className="w-6 h-0.5 bg-orange-600"></span>
                <span>Our Purpose</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Your success, <br />
                <span className="text-blue-600">our mission.</span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                At Vaivas Ventures, we believe in the power of people, the potential of ideas, and
                the progress that comes from working together. Our mission and vision guide
                everything we do across jobs, advertising and HR recruitment.
              </p>
              <div className="pt-2">
                <Link
                  href="/mission-vision"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Learn more about our core values</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Cards: Mission & Vision */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mission Card */}
              <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To create opportunities, build meaningful connections, and deliver solutions that
                  help individuals, brands and businesses grow with confidence.
                </p>
                <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
              </div>

              {/* Vision Card */}
              <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To be a trusted and innovative growth partner, known for empowering people,
                  elevating brands and shaping stronger organisations for a better tomorrow.
                </p>
                <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CULTURE: LIFE AT VAIVAS */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-600 mb-2">
                <span className="w-6 h-0.5 bg-orange-600"></span>
                <span>Our Culture</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Life at Vaivas
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-xl">
                A look into our people, our work, and the moments that make Vaivas Ventures a great
                place to be.
              </p>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap"
            >
              <span>View Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Gallery Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(galleryItems.length > 0
              ? galleryItems
              : [
                  { id: "1", title: "Strategic Planning", imageUrl: "/images/gallery-1.jpg" },
                  { id: "2", title: "Team Collaboration", imageUrl: "/images/gallery-2.jpg" },
                  { id: "3", title: "Ideas & Innovation", imageUrl: "/images/gallery-3.jpg" },
                ]
            ).map((item, idx) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden aspect-16/10 shadow-sm border border-slate-100 hover-card-elevate bg-slate-100"
              >
                <Image
                  src={item.imageUrl || `/images/gallery-${idx + 1}.jpg`}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BLOGS: INSIGHTS & UPDATES */}
      <section className="section-spacing bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-600 mb-2">
                <span className="w-6 h-0.5 bg-orange-600"></span>
                <span>Our Blogs</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Insights & updates
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-xl">
                Thoughts, ideas and perspectives on careers, branding, people and the changing world
                of work.
              </p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap"
            >
              <span>View All Blogs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2 Featured Blog Cards matching preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(latestBlogs.length > 0
              ? latestBlogs
              : [
                  {
                    id: "1",
                    slug: "how-to-prepare-for-your-next-career-opportunity",
                    category: "CAREERS",
                    title: "How to Prepare for Your Next Career Opportunity",
                    excerpt:
                      "Practical tips to help you build skills, confidence and stand out in today's competitive job market.",
                    coverImage: "/images/blog-1.jpg",
                  },
                  {
                    id: "2",
                    slug: "the-power-of-a-strong-brand-in-a-digital-world",
                    category: "BRANDING",
                    title: "The Power of a Strong Brand in a Digital World",
                    excerpt:
                      "Discover how creative storytelling can help businesses connect, engage and grow in meaningful ways.",
                    coverImage: "/images/blog-2.jpg",
                  },
                ]
            ).map((blog, idx) => (
              <div
                key={blog.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover-card-elevate flex flex-col sm:flex-row gap-5"
              >
                <div className="relative w-full sm:w-44 h-36 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                  <Image
                    src={blog.coverImage || `/images/blog-${idx + 1}.jpg`}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                      {blog.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mt-1 hover:text-blue-600 transition-colors">
                      <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mt-1.5">
                      {blog.excerpt}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. APPROVED TESTIMONIALS CAROUSEL */}
      <section className="section-spacing bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Header info */}
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-600">
                <span className="w-6 h-0.5 bg-orange-600"></span>
                <span>Client Feedback</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                What people say
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                We are grateful for the trust and support we receive from individuals and businesses
                across our journey.
              </p>
              <div className="pt-2">
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Read all client stories</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Interactive Carousel */}
            <div className="lg:col-span-7">
              <TestimonialCarousel items={testimonials} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER CTA BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20">
        {/* Subtle decorative curved background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Let&apos;s build what&apos;s next.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Whether you&apos;re looking for your next opportunity, want to elevate your brand, or
                need the right talent for your team — we&apos;re here to help.
              </p>
            </div>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl shadow-orange-500/30 transition-all transform active:scale-95 whitespace-nowrap"
              >
                <span>Let&apos;s Connect</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
