"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ArrowLeft, Phone, Sparkles } from "lucide-react";

export function AdsNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Ads Home", href: "/ads" },
    { label: "About", href: "/ads/about" },
    { label: "Services", href: "/ads/services" },
    { label: "Our Work", href: "/ads/portfolio" },
    { label: "Case Studies", href: "/ads/case-studies" },
    { label: "Insights", href: "/ads/insights" },
    { label: "Contact", href: "/ads/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/ads") return pathname === "/ads";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* 1. TOP NETWORK BAR */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400 hidden xs:inline">A Strategic Vertical of <strong className="text-white">Vaivas Ventures</strong></span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-bold transition-colors hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Vaivas Ventures Main Site</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="tel:+918041234568" className="hover:text-white hidden md:flex items-center gap-1 text-slate-400">
              <Phone className="w-3 h-3 text-orange-400" />
              <span>+91 80 4123 4568</span>
            </a>
            <Link href="/admin/ads" className="text-slate-400 hover:text-white hover:underline">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN ADS HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo + Quick Breadcrumb */}
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/ads" className="flex items-center group">
                <img
                  src="/images/logos/vaivas-ads-logo.png"
                  alt="Vaivas Ads - Big ideas. Real impact."
                  className="h-10 sm:h-12 md:h-14 w-auto max-w-[190px] sm:max-w-[240px] object-contain transition-transform group-hover:scale-[1.02]"
                />
              </Link>
              <Link
                href="/"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-all shadow-2xs group"
                title="Return to Vaivas Ventures main corporate portal"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-orange-600 group-hover:-translate-x-0.5 transition-transform" />
                <span>Vaivas Home</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {/* Distinct Back to Main Site button in navbar */}
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs xl:text-sm font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100/70 border border-orange-200/80 transition-colors mr-1"
                title="Return to Vaivas Ventures corporate portal"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Vaivas Main Site</span>
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-blue-700 bg-blue-50/80 font-semibold"
                      : "text-slate-700 hover:text-blue-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                href="/ads/quote"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all shadow-sm hover:shadow-md hover:shadow-orange-600/20 active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold active:scale-95 transition-transform shadow-xs"
                title="Back to Vaivas Ventures Main Site"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
                <span>Home</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150">
            {/* Prominent Back to Vaivas Ventures Card */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                  <ArrowLeft className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold">Return to Vaivas Ventures</div>
                  <div className="text-[10px] text-slate-300">Corporate Home, Jobs & HR Recruitment</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <div className="space-y-1 pt-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                    isActive(link.href)
                      ? "text-blue-700 bg-blue-50 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <Link
                href="/ads/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-center"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get a Quote / Consultation</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 3. FLOATING QUICK-RETURN BUTTON (Always Available As You Scroll) */}
      <div className="fixed bottom-6 left-6 z-40">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/95 hover:bg-slate-900 text-white font-bold text-xs shadow-2xl backdrop-blur-md border border-white/15 hover:border-orange-500/50 hover:shadow-orange-500/20 active:scale-95 transition-all group"
          title="Return to Vaivas Ventures Main Site"
        >
          <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:-translate-x-0.5 transition-transform">
            <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-slate-400 font-normal leading-tight">Back to</span>
            <span className="font-bold text-white leading-tight">Vaivas Ventures Home</span>
          </div>
        </Link>
      </div>
    </>
  );
}
