import React from "react";
import PublicLayout from "@/components/PublicLayout";
import { Target, Eye, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Mission & Vision | Vaivas Ventures",
  description: "Discover our mission, vision, and organizational principles guiding Vaivas Ventures.",
};

export default function MissionVisionPage() {
  return (
    <PublicLayout>
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-14 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold tracking-wide uppercase">
              Our Purpose
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Driven by purpose. <br />
              <span className="text-blue-600">Guided by vision.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              At Vaivas Ventures, we believe in the power of people, the potential of ideas, and the
              progress that comes from purposeful collaboration.
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50/40 rounded-3xl p-8 sm:p-10 border border-blue-100/80 shadow-xs space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
              <p className="text-base text-slate-600 leading-relaxed">
                To create opportunities, build meaningful connections, and deliver solutions that
                help individuals, brands and businesses grow with confidence.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pt-2 border-t border-blue-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Democratize career access through Vaivas Jobs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Provide measurable creative advertising via Vaivas Ads</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Build agile teams through specialized HR recruitment</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50/40 rounded-3xl p-8 sm:p-10 border border-orange-100/80 shadow-xs space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
              <p className="text-base text-slate-600 leading-relaxed">
                To be a trusted and innovative growth partner, known for empowering people,
                elevating brands and shaping stronger organisations for a better tomorrow.
              </p>
              <ul className="space-y-2 text-sm text-slate-600 pt-2 border-t border-orange-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  <span>Pan-India recognized corporate ecosystem</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  <span>Setting benchmarks in ethical talent partnerships</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  <span>Empowering 100,000+ professionals and 1,000+ brands</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
