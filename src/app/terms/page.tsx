import React from "react";
import PublicLayout from "@/components/PublicLayout";

export const metadata = {
  title: "Terms & Conditions | Vaivas Ventures",
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026</p>

        <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-600 leading-relaxed space-y-4">
          <p>
            By accessing or using the website of Vaivas Ventures, you acknowledge and agree to comply
            with these Terms and Conditions.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">1. Use of Services</h2>
          <p>
            The services, job listings, and content provided on this website are for legitimate
            career exploration, advertising collaboration, and recruitment inquiries. Misuse,
            unauthorized data scraping, or false submissions are strictly forbidden.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">2. Intellectual Property</h2>
          <p>
            All trademarks, logos, brand names, visual mockups, and content are the intellectual
            property of Vaivas Ventures and its respective operating divisions.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
