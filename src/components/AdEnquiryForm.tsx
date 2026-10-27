"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export default function AdEnquiryForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [serviceType, setServiceType] = useState("Digital Advertising");
  const [budgetRange, setBudgetRange] = useState("₹50,000 - ₹1,50,000");
  const [campaignGoals, setCampaignGoals] = useState("");
  const [timeline, setTimeline] = useState("Within 2-4 weeks");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/ads/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          companyName,
          serviceType,
          budgetRange,
          campaignGoals,
          timeline,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center space-y-4 shadow-sm animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Enquiry Received!</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Vaivas Ads. Our creative strategists are reviewing your
          campaign goals and will connect with a proposal within 24 hours.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setSubmitted(false);
              setFullName("");
              setEmail("");
              setPhone("");
              setCampaignGoals("");
            }}
            className="text-xs font-semibold text-orange-600 hover:underline"
          >
            Submit another campaign brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Ramesh Patel"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Company / Brand Name
          </label>
          <input
            type="text"
            placeholder="e.g. Acme Retail Ltd"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="ramesh@acme.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Service Required <span className="text-rose-500">*</span>
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
          >
            <option value="Digital Advertising">Digital Advertising (Google/Meta)</option>
            <option value="Branding & Identity">Branding & Visual Identity</option>
            <option value="Print Media & Production">Print Media (Brochures/Flyers)</option>
            <option value="Calendar Design & Printing">Calendar Design & Production</option>
            <option value="Web & Landing Page">Web Design & Conversion</option>
            <option value="Video & Content Creation">Video & Social Content</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Estimated Budget
          </label>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
          >
            <option value="Under ₹50,000">Under ₹50,000</option>
            <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000</option>
            <option value="₹1,50,000 - ₹5,00,000">₹1,50,000 - ₹5,00,000</option>
            <option value="₹5,00,000+">₹5,00,000+</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Timeline
          </label>
          <select
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
          >
            <option value="Immediate / Urgent">Immediate / Urgent</option>
            <option value="Within 2-4 weeks">Within 2-4 weeks</option>
            <option value="Next quarter">Next quarter</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Campaign Goals & Requirement Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={3}
          required
          placeholder="Describe your product, target audience, deliverables (e.g. 5,000 desk calendars, or Google Ads leads)..."
          value={campaignGoals}
          onChange={(e) => setCampaignGoals(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Brief...</span>
          </>
        ) : (
          <>
            <span>Submit Campaign Brief</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
