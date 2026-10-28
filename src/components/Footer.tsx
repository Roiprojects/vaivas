import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook, ShieldCheck, Sparkles, Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950/95 text-slate-300 pt-16 pb-12 border-t border-white/10 relative z-10 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center group">
              <div className="inline-flex items-center px-3.5 py-2 bg-white/5 border border-white/10 rounded-2xl shadow-sm transition-all group-hover:border-cyan-400/40 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                <img
                  src="/images/logos/vaivas-ventures-logo.png"
                  alt="Vaivas Ventures — Your success, our mission"
                  className="h-9 sm:h-10 w-auto max-w-[220px] object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting talent. Building brands. We empower individuals with career growth, elevate
              businesses through creative advertising, and shape stronger teams with enterprise HR
              solutions.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Ecosystem Online · 3D WebGL Active</span>
            </div>

            <div className="flex items-center space-x-3 text-slate-400 pt-1">
              <a
                href="https://linkedin.com/company/vaivas-ventures"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/vaivasventures"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-white/10 hover:border-pink-400 hover:text-pink-400 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@vaivasventures"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-white/10 hover:border-red-400 hover:text-red-400 flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/vaivasventures"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 border border-white/10 hover:border-blue-400 hover:text-blue-400 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Navigation</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/mission-vision" className="hover:text-cyan-400 transition-colors">
                  Mission &amp; Vision
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-cyan-400 transition-colors">
                  Life at Vaivas
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-cyan-400 transition-colors">
                  Insights &amp; Blogs
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-cyan-400 transition-colors">
                  Client Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Businesses */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              <span>Ecosystem</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/jobs" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  Vaivas Jobs
                </Link>
              </li>
              <li>
                <Link href="/ads" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  Vaivas Ads
                </Link>
              </li>
              <li>
                <Link href="/hr-recruitment" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
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
              Headquarters
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  Vaivas Towers, 4th Floor, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560103
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
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
            © {new Date().getFullYear()} Vaivas Ventures. Engineered for the future.
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
