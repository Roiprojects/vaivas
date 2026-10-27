"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Megaphone, Users, PhoneCall, Sparkles } from "lucide-react";

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
      activeColor: "text-blue-600",
      activeBg: "bg-blue-50 text-blue-600",
    },
    {
      label: "Jobs",
      href: "/jobs",
      icon: Briefcase,
      isActive: isJobs,
      badge: "Hiring",
      activeColor: "text-blue-600",
      activeBg: "bg-blue-500 text-white shadow-md shadow-blue-500/30",
    },
    {
      label: "Ads",
      href: "/ads",
      icon: Sparkles,
      isActive: isAds,
      badge: "Studio",
      activeColor: "text-orange-600",
      activeBg: "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30",
    },
    {
      label: "Talent",
      href: "/hr-recruitment",
      icon: Users,
      isActive: isHR,
      badge: null,
      activeColor: "text-emerald-600",
      activeBg: "bg-emerald-500 text-white shadow-md shadow-emerald-500/30",
    },
    {
      label: "Contact",
      href: "/contact",
      icon: PhoneCall,
      isActive: isContact,
      badge: null,
      activeColor: "text-slate-900",
      activeBg: "bg-slate-900 text-white shadow-md",
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-3 inset-x-0 z-50 flex justify-center px-3 pointer-events-none">
      <nav
        aria-label="Mobile app dock"
        className="pointer-events-auto w-full max-w-md bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_35px_-8px_rgba(15,23,42,0.18)] rounded-full px-2 py-1.5 flex items-center justify-between transition-all"
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
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              {item.badge && !item.isActive && (
                <span className="absolute -top-1.5 right-1 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-orange-500 text-white animate-pulse">
                  {item.badge}
                </span>
              )}
              <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.3]" : "stroke-[1.8]"}`} />
              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 ${
                  item.isActive ? "font-bold" : "text-slate-600"
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
