import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://vaivasventures.com"),
  title: "Vaivas Ventures | Connecting Talent. Building Brands.",
  description:
    "Vaivas Ventures bridges meaningful career opportunities, creative brand advertising, and enterprise HR recruitment across India.",
  keywords: [
    "Vaivas Ventures",
    "Vaivas Jobs",
    "Vaivas Ads",
    "HR Recruitment",
    "Careers India",
    "Advertising Agency Bengaluru",
    "Staffing Solutions",
  ],
  authors: [{ name: "Vaivas Ventures" }],
  icons: {
    icon: "/images/logos/vaivas-ventures-logo.png",
  },
  openGraph: {
    title: "Vaivas Ventures | Connecting Talent. Building Brands.",
    description: "Your success, our mission — careers, creative advertising & corporate HR.",
    url: "https://vaivasventures.com",
    siteName: "Vaivas Ventures",
    images: [
      {
        url: "/images/logos/vaivas-ventures-logo.png",
        width: 1200,
        height: 630,
        alt: "Vaivas Ventures",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

import MobileAppDock from "@/components/MobileAppDock";
import LightThemeSwitcher from "@/components/LightThemeSwitcher";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Scroll3DScene from "@/components/canvas/Scroll3DScene";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-theme="cyber-obsidian">
      <body className="min-h-full flex flex-col antialiased selection:bg-cyan-500 selection:text-slate-950 bg-[#040714] text-slate-100 relative">
        <ScrollProgressBar />
        <Scroll3DScene />
        <LightThemeSwitcher />
        <div className="flex-1 pb-20 lg:pb-0 relative z-10">{children}</div>
        <MobileAppDock />
      </body>
    </html>
  );
}
