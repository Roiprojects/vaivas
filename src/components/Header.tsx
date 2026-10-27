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

  const isBusinessActive =
    pathname.startsWith("/jobs") || pathname.startsWith("/ads") || pathname.startsWith("/hr-recruitment");

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] border-b border-slate-200/80 py-3"
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Authentic Tagline */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-12 w-48 sm:h-14 sm:w-56 transition-transform group-hover:scale-[1.02]">
              <Image
                src="/images/logos/vaivas-ventures-logo.png"
                alt="Vaivas Ventures — Your success, our mission"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                pathname === "/"
                  ? "text-blue-600 bg-blue-50/80 font-semibold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                pathname === "/about"
                  ? "text-blue-600 bg-blue-50/80 font-semibold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
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
                    ? "text-blue-600 bg-blue-50/80 font-semibold"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
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
                  ? "text-blue-600 bg-blue-50/80 font-semibold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/blogs"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                pathname.startsWith("/blogs")
                  ? "text-blue-600 bg-blue-50/80 font-semibold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              Blogs
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-colors ${
                pathname === "/contact"
                  ? "text-blue-600 bg-blue-50/80 font-semibold"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="shimmer-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 shadow-[0_4px_14px_rgba(234,88,12,0.3)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Let&apos;s Connect</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200 z-50">
          <Link
            href="/"
            className="block py-2.5 text-base font-medium text-slate-800 hover:text-blue-600 border-b border-slate-100"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block py-2.5 text-base font-medium text-slate-800 hover:text-blue-600 border-b border-slate-100"
          >
            About Us
          </Link>

          <div className="py-2 border-b border-slate-100">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Our Businesses
            </div>
            <div className="pl-2 space-y-2">
              <Link
                href="/jobs"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Vaivas Jobs</span>
              </Link>
              <Link
                href="/ads"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-orange-600"
              >
                <Megaphone className="w-4 h-4 text-orange-600" />
                <span>Vaivas Ads</span>
              </Link>
              <Link
                href="/hr-recruitment"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-emerald-600"
              >
                <Users className="w-4 h-4 text-emerald-600" />
                <span>HR Recruitment</span>
              </Link>
            </div>
          </div>

          <Link
            href="/gallery"
            className="block py-2.5 text-base font-medium text-slate-800 hover:text-blue-600 border-b border-slate-100"
          >
            Gallery
          </Link>
          <Link
            href="/blogs"
            className="block py-2.5 text-base font-medium text-slate-800 hover:text-blue-600 border-b border-slate-100"
          >
            Blogs
          </Link>
          <Link
            href="/testimonials"
            className="block py-2.5 text-base font-medium text-slate-800 hover:text-blue-600 border-b border-slate-100"
          >
            Testimonials
          </Link>
          <Link
            href="/contact"
            className="block py-2.5 text-base font-medium text-slate-800 hover:text-blue-600 border-b border-slate-100"
          >
            Contact Us
          </Link>

          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/contact"
              className="w-full text-center py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md"
            >
              Let&apos;s Connect
            </Link>
            <Link
              href="/admin"
              className="w-full text-center py-2 text-xs text-slate-500 hover:text-slate-800"
            >
              Staff Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
