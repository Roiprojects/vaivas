"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone, Sparkles } from "lucide-react";

export function AdsNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/ads" },
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
      {/* Top Network Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>A Venture of <strong>Vaivas Ventures</strong></span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <Link href="/" className="hidden sm:inline text-orange-400 hover:text-orange-300 hover:underline">
              Switch to Vaivas Ventures Corporate Portal →
            </Link>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="tel:+918041234568" className="hover:text-white flex items-center gap-1">
              <Phone className="w-3 h-3 text-orange-400" />
              <span>+91 80 4123 4568</span>
            </a>
            <Link href="/admin/ads" className="text-slate-400 hover:text-white hover:underline">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Ads Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/ads" className="flex items-center gap-3 group">
              <div className="relative h-12 w-44 sm:w-52 transition-transform group-hover:scale-102">
                <Image
                  src="/images/logos/vaivas-ads-tight.png"
                  alt="Vaivas Ads - By vaivas ventures"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
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

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/ads/quote"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm transition-all shadow-sm hover:shadow-md hover:shadow-orange-600/20 active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
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
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
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
            <div className="pt-3 border-t border-slate-100">
              <Link
                href="/ads/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-center"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get a Quote / Consultation</span>
              </Link>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full block text-center text-xs text-slate-500 hover:text-slate-800 py-2"
              >
                ← Return to Vaivas Ventures
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
