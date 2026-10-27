"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiryCategory, setEnquiryCategory] = useState("General");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          enquiryCategory,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit enquiry.");

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
        <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for getting in touch with Vaivas Ventures. Our team will review your inquiry and
          respond promptly.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setSubmitted(false);
              setFullName("");
              setEmail("");
              setPhone("");
              setMessage("");
            }}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Send another message
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

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Suresh Kumar"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="suresh@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
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
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          What is this regarding? <span className="text-rose-500">*</span>
        </label>
        <select
          value={enquiryCategory}
          onChange={(e) => setEnquiryCategory(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
        >
          <option value="General">General Enquiry / Corporate Information</option>
          <option value="Jobs / Careers">Vaivas Jobs / Candidate Assistance</option>
          <option value="Advertising">Vaivas Ads / Campaign & Print Solutions</option>
          <option value="HR Recruitment">HR Recruitment / Corporate Staffing</option>
          <option value="Partnership">Strategic Partnership / Vendor Collaboration</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={4}
          required
          placeholder="How can we assist you today? Please share any relevant context..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all resize-none"
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
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
