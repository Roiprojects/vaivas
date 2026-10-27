import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Layers,
  Users,
  Target,
  ShieldCheck,
  Building,
} from "lucide-react";

export const metadata = {
  title: "About Us | Creative Thinking. Strategic Advertising. | Vaivas Ads",
  description:
    "Learn about Vaivas Ads, our mission, vision, values, print manufacturing heritage, and creative leadership under Vaivas Ventures.",
};

export default function AdsAboutPage() {
  const values = [
    {
      title: "Creativity with Intent",
      description:
        "We reject mindless decoration. Every color choice, headline hook, and layout grid is chosen to solve a concrete business problem and guide buyer action.",
      icon: Sparkles,
    },
    {
      title: "Radical Transparency",
      description:
        "No hidden markups, unverified campaign figures, or surprise production surcharges. Itemized quotations and real-time ROAS dashboards.",
      icon: ShieldCheck,
    },
    {
      title: "Obsessive Quality Craft",
      description:
        "Whether proofing a digital ad on retina displays or calibrating offset ink density on 300 GSM art card, perfection in execution is non-negotiable.",
      icon: Award,
    },
    {
      title: "Total Accountability",
      description:
        "We operate as an extension of your leadership team. When we commit to a calendar batch delivery date or CPA ceiling, we hit it.",
      icon: Target,
    },
  ];

  const team = [
    {
      name: "Vikram Shenoy",
      role: "Creative Director & Brand Strategist",
      bio: "14+ years steering high-impact campaigns across consumer tech, luxury real estate, and healthcare across South India.",
    },
    {
      name: "Mahesh Deshpande",
      role: "Head of Commercial Print & Manufacturing",
      bio: "Veteran master printer with 20+ years of deep expertise in sheet-fed offset, packaging die-lines, and executive calendar binding.",
    },
    {
      name: "Priya Nair",
      role: "Lead Performance Marketing & Data",
      bio: "Specializes in algorithmic Google Search Intent, Meta conversion API integration, and multi-touch lead attribution funnels.",
    },
    {
      name: "Ananya Kulkarni",
      role: "Head of Client Solutions & Brand Success",
      bio: "Ensures seamless governance between customer brief intake, digital pre-flight approvals, and corporate delivery logistics.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 space-y-20 py-12 lg:py-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                <Building className="w-3.5 h-3.5" />
                <span>The Story of Vaivas Ads</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Creative Thinking. <br />
                <span className="text-blue-700">Strategic Advertising.</span> <br />
                Meaningful Growth.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Vaivas Ads was founded as a cornerstone division of <strong>Vaivas Ventures</strong> to solve a persistent industry divide: traditional ad agencies couldn&apos;t manage heavy print manufacturing, while commercial printers had no strategic digital marketing acumen.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/ads/quote"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-md"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/ads/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-all border border-slate-300"
                >
                  <span>Our Services</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 aspect-[4/3]">
                <Image
                  src="/images/ads/ads-hero.jpg"
                  alt="Vaivas Ads Agency and Print Workspace"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="bg-white py-16 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-8 rounded-3xl bg-blue-50/60 border border-blue-100 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Our Purpose
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Our Mission</h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  To elevate Indian enterprises by delivering conversion-engineered advertising campaigns, unmistakable brand identities, and peerless commercial print and calendar production that creates tangible commercial value.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-orange-50/60 border border-orange-100 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  Our Horizon
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Our Vision</h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  To be recognized as India&apos;s most reliable end-to-end creative and print manufacturing partner, celebrated for intellectual rigor, technical transparency, and relentless delivery integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Our Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Values That Drive Every Deliverable
            </h2>
            <p className="text-sm text-slate-600">
              The ethical and operational anchors that guide how we treat our clients, our craft, and our deadlines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-blue-700">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leadership Team Profiles */}
        <section className="bg-white py-16 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Craft Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                The Experts Behind Your Campaigns
              </h2>
              <p className="text-sm text-slate-600">
                Seasoned creative directors, technical offset print masters, and performance marketing specialists.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-3xl border border-slate-200/80 p-6 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xl">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{member.name}</h4>
                      <div className="text-xs font-semibold text-orange-600">{member.role}</div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-400 font-medium">
                    Vaivas Ads Leadership
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Let&apos;s build something extraordinary together.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Whether you need strategic guidance for an upcoming brand launch or are scheduling a 2026 calendar manufacturing run, our directors are ready to assist.
            </p>
            <div className="pt-2">
              <Link
                href="/ads/quote"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all shadow-lg hover:shadow-orange-500/30"
              >
                <span>Request a Free Strategic Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <AdsFooter />
    </div>
  );
}
