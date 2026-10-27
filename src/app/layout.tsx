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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased selection:bg-blue-600 selection:text-white">
        <div className="flex-1 pb-20 lg:pb-0">{children}</div>
        <MobileAppDock />
      </body>
    </html>
  );
}
