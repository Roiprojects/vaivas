"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, Briefcase, Megaphone, Users, Sparkles } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setBusinessDropdownOpen(false);
  }, [pathname]);

  const isJobs = pathname.startsWith("/jobs");
  const isAds = pathname.startsWith("/ads");
  const isBusinessActive = isJobs || isAds || pathname.startsWith("/hr-recruitment");

  let currentLogo = "/images/logos/vaivas-ventures-logo.png";
  let logoAlt = "Vaivas Ventures — Your success, our mission";
  let logoLink = "/";
  if (isJobs) {
    currentLogo = "/images/logos/vaivas-jobs-logo.png";
    logoAlt = "Vaivas Jobs — Connecting Opportunities";
    logoLink = "/jobs";
  } else if (isAds) {
    currentLogo = "/images/logos/vaivas-ads-logo.png";
    logoAlt = "Vaivas Ads — Big ideas. Real impact.";
    logoLink = "/ads";
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 theme-header border-b border-white/10 ${
        isScrolled
          ? "py-2 sm:py-2.5 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)]"
          : "py-2.5 sm:py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Dynamic Switching for Jobs and Ads */}
          <Link href={logoLink} className="flex items-center group shrink-0">
            <img
              src={currentLogo}
              alt={logoAlt}
              className="h-11 sm:h-12 md:h-14 w-auto max-w-[230px] sm:max-w-[270px] object-contain transition-transform group-hover:scale-[1.03] filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all ${
                pathname === "/"
                  ? "theme-badge font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all ${
                pathname === "/about"
                  ? "theme-badge font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              About Us
            </Link>

            {/* Our Businesses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBusinessDropdownOpen(true)}
              onMouseLeave={() => setBusinessDropdownOpen(false)}
            >
              <button
                type="button"
                className={`px-3.5 py-2 text-sm font-medium rounded-full inline-flex items-center gap-1.5 transition-all ${
                  isBusinessActive
                    ? "theme-badge font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
                aria-expanded={businessDropdownOpen}
              >
                <span>Our Businesses</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    businessDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {businessDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-slate-950/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] border border-white/15 p-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    href="/jobs"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-100 group-hover:text-sky-400">
                        Vaivas Jobs
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Career opportunities &amp; talent search
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/ads"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 group-hover:bg-rose-500 group-hover:text-slate-950 transition-colors">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-100 group-hover:text-rose-400">
                        Vaivas Ads
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Creative advertising, branding &amp; print
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/hr-recruitment"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-100 group-hover:text-emerald-400">
                        HR Recruitment
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Executive hiring &amp; enterprise staffing
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/gallery"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all ${
                pathname === "/gallery"
                  ? "theme-badge font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/blogs"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all ${
                pathname.startsWith("/blogs")
                  ? "theme-badge font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Blogs
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all ${
                pathname === "/contact"
                  ? "theme-badge font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="shimmer-btn theme-cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Let&apos;s Connect</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile App Bar Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/contact"
              className="theme-cta-btn px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm active:scale-95 transition-transform"
            >
              Connect
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-200 hover:bg-white/10 transition-colors border border-white/15 active:scale-90"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile App Sheet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] max-h-[85vh] overflow-y-auto bg-slate-950/98 backdrop-blur-2xl border-b border-white/15 px-4 pt-4 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top-3 duration-200 z-50">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 px-1">
              Select Vertical
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/jobs"
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                  isJobs
                    ? "bg-sky-500/20 border-sky-400 text-sky-300 shadow-sm"
                    : "bg-slate-900 border-white/10 text-slate-300 hover:bg-white/5"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">Vaivas Jobs</span>
                <span className="text-[10px] text-slate-400">Careers</span>
              </Link>

              <Link
                href="/ads"
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                  isAds
                    ? "bg-rose-500/20 border-rose-400 text-rose-300 shadow-sm"
                    : "bg-slate-900 border-white/10 text-slate-300 hover:bg-white/5"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Megaphone className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">Vaivas Ads</span>
                <span className="text-[10px] text-slate-400">Marketing</span>
              </Link>

              <Link
                href="/hr-recruitment"
                className="p-3 rounded-2xl border border-white/10 bg-slate-900 text-slate-300 hover:bg-white/5 flex flex-col items-center text-center gap-1.5 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">HR Talent</span>
                <span className="text-[10px] text-slate-400">Staffing</span>
              </Link>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-white/10 p-2 space-y-1">
            <Link
              href="/"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              <span>Corporate Home</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              <span>About Vaivas</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/gallery"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              <span>Life &amp; Work Gallery</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/blogs"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              <span>Insights &amp; Blogs</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/testimonials"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              <span>Client Reviews</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/contact"
              className="w-full text-center py-3 rounded-full text-sm font-bold theme-cta-btn shadow-md active:scale-95 transition-transform"
            >
              Get in Touch Directly
            </Link>
            <Link
              href="/admin"
              className="w-full text-center py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Staff Portal Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
