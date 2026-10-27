import React from "react";
import PublicLayout from "@/components/PublicLayout";

export const metadata = {
  title: "Privacy Policy | Vaivas Ventures",
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026</p>

        <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-600 leading-relaxed space-y-4">
          <p>
            Vaivas Ventures and its operating divisions (Vaivas Jobs, Vaivas Ads, and HR
            Recruitment) are dedicated to maintaining the confidentiality and integrity of personal
            and business information submitted to us.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">1. Collection of Information</h2>
          <p>
            We collect personal details such as names, phone numbers, email addresses, career
            histories, and resume documents strictly when submitted voluntarily through our
            application forms, hiring requirement forms, and contact inquiries.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">2. Use of Information</h2>
          <p>
            Candidate information and resumes are stored securely and accessed exclusively by our
            internal recruiters to evaluate suitability for open corporate positions. We never sell,
            broadcast, or share candidate resumes with unauthorized third parties.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">3. Data Security & Storage</h2>
          <p>
            All uploaded resumes and internal notes are kept in private, server-side storage
            protected by role-based authentication. Public access to resume files is strictly
            prohibited.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
