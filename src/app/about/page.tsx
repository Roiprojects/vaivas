import React from "react";
import Image from "next/image";
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import { CheckCircle2, ArrowRight, Shield, Heart, Zap, Award, Compass } from "lucide-react";

export const metadata = {
  title: "About Us | Vaivas Ventures",
  description: "Learn about Vaivas Ventures, our story, core values, leadership, and our three core pillars.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "People First",
      description: "We believe individual empowerment and authentic relationships form the foundation of lasting success.",
    },
    {
      icon: Shield,
      title: "Integrity & Transparency",
      description: "Honest communication and ethical standards govern every hiring decision, campaign metric, and client engagement.",
    },
    {
      icon: Zap,
      title: "Creative Innovation",
      description: "From advertising narratives to recruitment technology, we challenge conventional thinking to drive real outcomes.",
    },
    {
      icon: Award,
      title: "Excellence in Execution",
      description: "We are committed to delivering measurable quality, meticulous attention to detail, and timely execution.",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-14 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold tracking-wide uppercase">
              About Vaivas Ventures
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Empowering people. <br />
              <span className="text-blue-600">Elevating businesses across India.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Vaivas Ventures is a multi-disciplinary enterprise bringing together modern career
              enablement, creative brand advertising, and enterprise talent acquisition under one
              forward-thinking vision.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Organization */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 border border-slate-100">
                <Image
                  src="/images/hero-team.jpg"
                  alt="Vaivas Ventures team meeting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-600">
                <span className="w-6 h-0.5 bg-orange-600"></span>
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Built to solve real problems for talent and enterprises
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Founded with the belief that career growth and business visibility should not be
                siloed, Vaivas Ventures bridges the gap between aspiring professionals seeking
                meaningful careers and ambitious brands needing standout market presence.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Today, our three pillars — <strong>Vaivas Jobs</strong>, <strong>Vaivas Ads</strong>, and{" "}
                <strong>HR Recruitment</strong> — operate synergistically, delivering end-to-end
                value from candidate placement to comprehensive brand campaigns.
              </p>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md transition-all"
                >
                  <span>Connect With Our Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-spacing bg-pale-blue border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-orange-600 mb-2">
              <span className="w-6 h-0.5 bg-orange-600"></span>
              <span>Our Principles</span>
              <span className="w-6 h-0.5 bg-orange-600"></span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Values that anchor our commitments
            </h2>
            <p className="mt-2 text-base text-slate-600">
              The fundamental standards behind our culture and every client interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover-card-elevate space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
