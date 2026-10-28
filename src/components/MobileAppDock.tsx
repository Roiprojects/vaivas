"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Users, PhoneCall, Sparkles } from "lucide-react";

export default function MobileAppDock() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isJobs = pathname.startsWith("/jobs");
  const isAds = pathname.startsWith("/ads");
  const isHR = pathname.startsWith("/hr-recruitment");
  const isContact = pathname === "/contact";

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: isHome,
      badge: null,
      activeBg: "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(56,189,248,0.4)]",
    },
    {
      label: "Jobs",
      href: "/jobs",
      icon: Briefcase,
      isActive: isJobs,
      badge: "Hiring",
      activeBg: "bg-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(14,165,233,0.5)]",
    },
    {
      label: "Ads",
      href: "/ads",
      icon: Sparkles,
      isActive: isAds,
      badge: "Studio",
      activeBg: "bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold shadow-[0_0_15px_rgba(244,63,94,0.5)]",
    },
    {
      label: "Talent",
      href: "/hr-recruitment",
      icon: Users,
      isActive: isHR,
      badge: null,
      activeBg: "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)]",
    },
    {
      label: "Contact",
      href: "/contact",
      icon: PhoneCall,
      isActive: isContact,
      badge: null,
      activeBg: "bg-white text-slate-950 font-bold shadow-md",
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-3 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
      <nav
        aria-label="Mobile app dock"
        className="pointer-events-auto w-full max-w-md bg-slate-950/90 backdrop-blur-2xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.8)] rounded-full px-2 py-1.5 flex items-center justify-between transition-all"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 active:scale-90 ${
                item.isActive
                  ? item.activeBg
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.badge && !item.isActive && (
                <span className="absolute -top-1.5 right-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-cyan-500 text-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                  {item.badge}
                </span>
              )}
              <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.3]" : "stroke-[1.8]"}`} />
              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 ${
                  item.isActive ? "font-bold" : "text-slate-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
