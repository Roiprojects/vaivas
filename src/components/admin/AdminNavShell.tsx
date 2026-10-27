"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Info,
  Briefcase,
  FileText,
  Megaphone,
  Users,
  Target,
  Image as ImageIcon,
  BookOpen,
  MessageSquareQuote,
  Inbox,
  Settings,
  ShieldCheck,
  History,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { AdminSessionUser } from "@/lib/auth";

interface AdminNavShellProps {
  session: AdminSessionUser | null;
  children: React.ReactNode;
}

export default function AdminNavShell({ session, children }: AdminNavShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render clean container
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-slate-950 flex flex-col justify-center">{children}</div>;
  }

  // If not logged in and trying to access admin, show redirection
  if (!session) {
    if (typeof window !== "undefined") {
      router.push("/admin/login");
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-medium text-slate-600">Checking credentials...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Home Page", href: "/admin/home", icon: Home },
    { label: "About Us", href: "/admin/about", icon: Info },
    { label: "Vaivas Jobs", href: "/admin/jobs", icon: Briefcase },
    { label: "Job Applications", href: "/admin/applications", icon: FileText },
    { label: "Vaivas Ads", href: "/admin/ads", icon: Megaphone },
    { label: "HR Recruitment", href: "/admin/hr-recruitment", icon: Users },
    { label: "Mission & Vision", href: "/admin/mission-vision", icon: Target },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Contact Enquiries", href: "/admin/enquiries", icon: Inbox },
    { label: "Website Settings", href: "/admin/settings", icon: Settings },
    { label: "Admin Users", href: "/admin/users", icon: ShieldCheck },
    { label: "Activity Logs", href: "/admin/activity-logs", icon: History },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Topbar */}
      <div className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-28 bg-white/90 rounded p-1">
            <Image
              src="/images/logos/vaivas-ventures-logo.png"
              alt="Vaivas"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xs font-bold text-orange-400">ADMIN</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col justify-between z-40 transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="relative h-8 w-36 bg-white/90 rounded-lg p-1">
                <Image
                  src="/images/logos/vaivas-ventures-logo.png"
                  alt="Vaivas Ventures"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Navigation Links (Scrollable) */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Footer */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="truncate">
                <div className="font-bold text-white truncate">{session.name}</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">{session.email}</div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/60 text-blue-300">
                {session.role}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-xs"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
