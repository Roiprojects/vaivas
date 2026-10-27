"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FileSpreadsheet,
  PackageCheck,
  Truck,
  CreditCard,
  Layers,
  Sparkles,
  Award,
  BookOpen,
  Settings,
  ArrowLeft,
} from "lucide-react";

export function AdsAdminHeader() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/admin/ads", icon: LayoutDashboard },
    { label: "Leads & Enquiries", href: "/admin/ads/leads", icon: Inbox },
    { label: "Quotations", href: "/admin/ads/quotations", icon: FileSpreadsheet },
    { label: "Orders & Production", href: "/admin/ads/orders", icon: PackageCheck },
    { label: "Dispatch & Delivery", href: "/admin/ads/dispatch", icon: Truck },
    { label: "Billing & Settlement", href: "/admin/ads/billing", icon: CreditCard },
    { label: "Services CMS", href: "/admin/ads/services", icon: Layers },
    { label: "Portfolio", href: "/admin/ads/portfolio", icon: Sparkles },
    { label: "Case Studies", href: "/admin/ads/case-studies", icon: Award },
    { label: "Blogs", href: "/admin/ads/blogs", icon: BookOpen },
    { label: "Settings", href: "/admin/ads/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/admin/ads") return pathname === "/admin/ads";
    return pathname.startsWith(href);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse"></span>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              Vaivas Ads Operational Suite
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-950 mt-1">
            Advertising, Quotations &amp; Print Works Operations
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <Link
            href="/ads"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-700 hover:border-blue-300 shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <span>Live Ads Website</span>
            <span className="text-slate-400">↗</span>
          </Link>
          <Link
            href="/admin/home"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ventures Main Admin</span>
          </Link>
        </div>
      </div>

      {/* Submodule Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
        {links.map((link) => {
          const IconComp = link.icon;
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all ${
                active
                  ? "bg-orange-600 text-white shadow-xs font-bold"
                  : "bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
