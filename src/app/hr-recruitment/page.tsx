import React from "react";
import Image from "next/image";
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import {
  Users,
  Briefcase,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search,
  UserCheck,
  FileCheck,
  HelpCircle,
} from "lucide-react";
import EmployerRequirementForm from "@/components/EmployerRequirementForm";
import CandidateDropResumeForm from "@/components/CandidateDropResumeForm";

export const metadata = {
  title: "HR Recruitment | Executive Search & Enterprise Staffing Solutions",
  description:
    "We help businesses find, hire and nurture top talent while connecting skilled professionals with industry-leading organizations across India.",
};

export default function HrRecruitmentPage() {
  const serviceCategories = [
    {
      title: "Executive Search & Leadership",
      description: "Discreet and thorough identification of CXO, VP, and strategic leadership talent.",
    },
    {
      title: "Specialized Technical & IT Hiring",
      description: "Engineers, architects, data scientists, and product specialists with verified capabilities.",
    },
    {
      title: "Volume & Commercial Staffing",
      description: "Rapid scaling for sales, customer success, marketing, and corporate operational roles.",
    },
    {
      title: "Contract & Project-Based Placement",
      description: "Flexible, compliant interim talent for mission-critical sprints and seasonal spikes.",
    },
  ];

  const industries = [
    "Information Technology & SaaS",
    "Banking, Financial Services & Insurance (BFSI)",
    "Healthcare & Pharmaceuticals",
    "E-Commerce, Retail & FMCG",
    "Supply Chain & Logistics",
    "Engineering & Manufacturing",
  ];

  const processSteps = [
    {
      step: "01",
      title: "Requirement Discovery",
      text: "We deep-dive into your team culture, required skills, timelines, and organizational goals.",
    },
    {
      step: "02",
      title: "Sourcing & AI Matching",
      text: "We leverage our unified candidate network, proprietary databases, and proactive headhunting.",
    },
    {
      step: "03",
      title: "Rigorous Screening",
      text: "Technical vetting, domain evaluation, communication assessment, and compensation alignment.",
    },
    {
      step: "04",
      title: "Interview Coordination",
      text: "Seamless scheduling, calendar alignment, and transparent feedback loops for both sides.",
    },
    {
      step: "05",
      title: "Offer & Joining Follow-up",
      text: "Offer management, resignation guidance, counter-offer mitigation, and post-joining check-ins.",
    },
  ];

  const faqs = [
    {
      q: "What is your typical turnaround time for shortlisted candidates?",
      a: "For most corporate and technical positions, we provide the first curated shortlist of screened candidates within 48 to 72 hours of receiving the finalized requirement.",
    },
    {
      q: "How are candidate resumes and corporate requirement details protected?",
      a: "All candidate resumes and employer hiring specifications are encrypted and accessible only to authorized recruitment officers. We never broadcast resumes publicly or share data without consent.",
    },
    {
      q: "Is there a replacement guarantee for placed candidates?",
      a: "Yes. Our standard engagement contracts include an industry-standard 90-day replacement warranty for permanent executive hires.",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50/50 via-white to-white py-14 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enterprise Recruitment & Executive Search</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                People who fit. <br />
                <span className="text-emerald-600">Teams that win.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                We help ambitious enterprises build high-performing, future-ready organizations.
                Whether you need specialized leadership talent or want to join an inspiring team,
                Vaivas HR Recruitment delivers.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#for-employers"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md shadow-emerald-600/25 transition-all"
                >
                  <span>Submit Hiring Requirements</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#for-candidates"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-700 hover:text-emerald-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-xs"
                >
                  <span>Submit Your Resume</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-xl border border-slate-100 bg-slate-100">
                <Image
                  src="/images/pillar-hr.jpg"
                  alt="Corporate recruitment interview and executive search"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Models */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-emerald-600 mb-2">
              <span className="w-6 h-0.5 bg-emerald-600"></span>
              <span>Our Recruitment Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Flexible staffing models designed around your hiring scale
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover-card-elevate space-y-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-12 bg-pale-blue border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xs font-bold tracking-wider uppercase text-emerald-600">
              Industry Domains We Specialize In
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="bg-white px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-800 border border-slate-200 shadow-2xs hover:border-emerald-500 transition-colors"
              >
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Hiring Roadmap */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-emerald-600 mb-2">
              <span className="w-6 h-0.5 bg-emerald-600"></span>
              <span>Proven Process</span>
              <span className="w-6 h-0.5 bg-emerald-600"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How our recruitment partnership works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover-card-elevate space-y-3 relative"
              >
                <span className="text-3xl font-extrabold text-emerald-600/40 font-mono">
                  {p.step}
                </span>
                <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWO FORMS SECTION: EMPLOYER & CANDIDATE */}
      <section className="section-spacing bg-pale-blue border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 1. FOR EMPLOYERS */}
          <div id="for-employers" className="scroll-mt-24 space-y-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                <Building2 className="w-3.5 h-3.5" />
                <span>For Employers & Hiring Managers</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Submit Your Hiring Requirements
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Tell us about your open roles, required experience, and desired hiring timelines.
                Our recruitment leads will get in touch immediately.
              </p>
            </div>

            <EmployerRequirementForm />
          </div>

          {/* 2. FOR CANDIDATES */}
          <div id="for-candidates" className="scroll-mt-24 space-y-6 pt-10 border-t border-slate-200">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase">
                <UserCheck className="w-3.5 h-3.5" />
                <span>For Job Seekers & Professionals</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Submit Your Resume to Our Talent Pool
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Even if you don&apos;t see an exact matching vacancy today, upload your resume.
                We proactively match profiles against emerging corporate requirements.
              </p>
            </div>

            <CandidateDropResumeForm />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-spacing bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-500">
              Clear answers on how we handle candidates, employer contracts, and data privacy.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h3 className="text-base font-bold text-slate-900 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-slate-600 pl-7 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
