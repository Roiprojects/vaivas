"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, Briefcase, Megaphone, Users } from "lucide-react";

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
      className={`sticky top-0 z-40 transition-all duration-300 theme-header border-b ${
        isScrolled
          ? "py-2 sm:py-2.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]"
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
              className="h-11 sm:h-12 md:h-14 w-auto max-w-[230px] sm:max-w-[270px] object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                pathname === "/"
                  ? "theme-badge font-bold"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/60"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                pathname === "/about"
                  ? "theme-badge font-bold"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/60"
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
                className={`px-3.5 py-2 text-sm font-medium rounded-full inline-flex items-center gap-1.5 transition-colors ${
                  isBusinessActive
                    ? "theme-badge font-bold"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/60"
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
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    href="/jobs"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/60 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                        Vaivas Jobs
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Career opportunities & talent search
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/ads"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50/60 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-orange-600">
                        Vaivas Ads
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Creative advertising, branding & print
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/hr-recruitment"
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50/60 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600">
                        HR Recruitment
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Executive hiring & enterprise staffing
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/gallery"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                pathname === "/gallery"
                  ? "theme-badge font-bold"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/60"
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/blogs"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                pathname.startsWith("/blogs")
                  ? "theme-badge font-bold"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/60"
              }`}
            >
              Blogs
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                pathname === "/contact"
                  ? "theme-badge font-bold"
                  : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/60"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="shimmer-btn theme-cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
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
              className="p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200/80 active:scale-90"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile App Sheet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-2xl border-b border-slate-200/90 px-4 pt-4 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top-3 duration-200 z-50">
          {/* Quick Business Switcher (App-style cards) */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 px-1">
              Select Vertical
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/jobs"
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                  isJobs
                    ? "bg-blue-50 border-blue-300 text-blue-700 shadow-xs"
                    : "bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-blue-50/50"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">Vaivas Jobs</span>
                <span className="text-[10px] text-slate-500">Careers</span>
              </Link>

              <Link
                href="/ads"
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                  isAds
                    ? "bg-orange-50 border-orange-300 text-orange-700 shadow-xs"
                    : "bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-orange-50/50"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Megaphone className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">Vaivas Ads</span>
                <span className="text-[10px] text-slate-500">Marketing</span>
              </Link>

              <Link
                href="/hr-recruitment"
                className="p-3 rounded-2xl border border-slate-200/70 bg-slate-50 text-slate-700 hover:bg-emerald-50/50 flex flex-col items-center text-center gap-1.5 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">HR Talent</span>
                <span className="text-[10px] text-slate-500">Staffing</span>
              </Link>
            </div>
          </div>

          {/* Quick Links Menu */}
          <div className="bg-slate-50/80 rounded-2xl border border-slate-200/60 p-2 space-y-1">
            <Link
              href="/"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-white transition-colors"
            >
              <span>Corporate Home</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-white transition-colors"
            >
              <span>About Vaivas</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/gallery"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-white transition-colors"
            >
              <span>Life & Work Gallery</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/blogs"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-white transition-colors"
            >
              <span>Insights & Blogs</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/testimonials"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-white transition-colors"
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
              className="w-full text-center py-2 text-xs text-slate-500 hover:text-slate-800"
            >
              Staff Portal Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
