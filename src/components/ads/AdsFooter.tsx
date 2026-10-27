import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Sparkles, ArrowRight } from "lucide-react";

export function AdsFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Top Banner / Consultation CTA */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Strategic Consultation</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to grow your brand and scale production?
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              From creative branding and digital campaigns to commercial offset print and 2026 executive calendars.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/ads/quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-medium text-sm transition-all shadow-lg hover:shadow-orange-500/20 text-center"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ads/portfolio"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all border border-slate-700 text-center"
            >
              <span>Explore Our Work</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/ads" className="inline-flex items-center group">
              <div className="inline-flex items-center px-3.5 py-2 bg-white rounded-2xl shadow-sm transition-transform group-hover:scale-[1.02]">
                <img
                  src="/images/logos/vaivas-ads-logo.png"
                  alt="Vaivas Ads"
                  className="h-9 sm:h-10 w-auto max-w-[220px] object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Advertising, branding, and print production built around your business. A core strategic division of{" "}
              <Link href="/" className="text-blue-400 hover:underline">
                Vaivas Ventures
              </Link>
              .
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Vaivas Towers, 3rd Floor, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560103</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="tel:+918041234568" className="hover:text-white transition-colors">
                  +91 80 4123 4568
                </a>
                <span className="text-slate-600">|</span>
                <a
                  href="https://wa.me/919876543211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  WhatsApp Us
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:ads@vaivasventures.com" className="hover:text-white transition-colors">
                  ads@vaivasventures.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ads/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/ads/portfolio" className="hover:text-white transition-colors">
                  Our Work & Portfolio
                </Link>
              </li>
              <li>
                <Link href="/ads/case-studies" className="hover:text-white transition-colors">
                  Verified Case Studies
                </Link>
              </li>
              <li>
                <Link href="/ads/clients" className="hover:text-white transition-colors">
                  Clients & Testimonials
                </Link>
              </li>
              <li>
                <Link href="/ads/insights" className="hover:text-white transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/ads/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Digital Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Digital & Creative</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ads/services/paid-advertising" className="hover:text-white transition-colors">
                  Paid Advertising
                </Link>
              </li>
              <li>
                <Link href="/ads/services/google-ads" className="hover:text-white transition-colors">
                  Google Search & PMax
                </Link>
              </li>
              <li>
                <Link href="/ads/services/social-media-marketing" className="hover:text-white transition-colors">
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link href="/ads/services/creative-designing" className="hover:text-white transition-colors">
                  Creative Designing
                </Link>
              </li>
              <li>
                <Link href="/ads/services/branding" className="hover:text-white transition-colors">
                  Brand Identity Systems
                </Link>
              </li>
              <li>
                <Link href="/ads/services/website-design-development" className="hover:text-white transition-colors">
                  Website Design & Dev
                </Link>
              </li>
            </ul>
          </div>

          {/* Print & Calendar Division */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Print & Calendars</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ads/services/print-media" className="hover:text-white transition-colors">
                  Commercial Print Media
                </Link>
              </li>
              <li>
                <Link href="/ads/services/calendar-design-printing" className="hover:text-white transition-colors">
                  2026 Corporate Calendars
                </Link>
              </li>
              <li>
                <Link href="/ads/quote?tab=calendar" className="text-orange-400 hover:text-orange-300 font-medium">
                  Calendar Configurator →
                </Link>
              </li>
              <li>
                <Link href="/ads/quote?tab=print" className="text-blue-400 hover:text-blue-300 font-medium">
                  Print Media Configurator →
                </Link>
              </li>
              <li>
                <Link href="/admin/ads" className="text-slate-500 hover:text-slate-300">
                  Staff Operations Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Vaivas Ads (A division of Vaivas Ventures). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Vaivas Ventures Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
