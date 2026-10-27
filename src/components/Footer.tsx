import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-slate-800/80">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-52 bg-white/90 rounded-xl p-1.5 backdrop-blur-xs">
                <Image
                  src="/images/logos/vaivas-ventures-logo.png"
                  alt="Vaivas Ventures — Your success, our mission"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting talent. Building brands. We empower individuals with career growth, elevate
              businesses through creative advertising, and shape stronger teams with enterprise HR
              solutions.
            </p>
            <div className="flex items-center space-x-3 text-slate-400 pt-1">
              <a
                href="https://linkedin.com/company/vaivas-ventures"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/vaivasventures"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@vaivasventures"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/vaivasventures"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/mission-vision" className="hover:text-white transition-colors">
                  Mission & Vision
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Life at Vaivas
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors">
                  Insights & Blogs
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors">
                  Client Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Businesses */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Our Businesses
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/jobs" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Vaivas Jobs
                </Link>
              </li>
              <li>
                <Link href="/ads" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  Vaivas Ads
                </Link>
              </li>
              <li>
                <Link href="/hr-recruitment" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  HR Recruitment
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://vaivasads.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
                >
                  <span>Visit Vaivas Ads Portal ↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Get in Touch
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  Vaivas Towers, 4th Floor, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560103
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+918041234567" className="hover:text-white transition-colors text-xs">
                  +91 80 4123 4567
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@vaivasventures.com" className="hover:text-white transition-colors text-xs">
                  info@vaivasventures.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Vaivas Ventures. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
