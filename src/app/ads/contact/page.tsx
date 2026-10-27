"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export default function AdsContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [serviceType, setServiceType] = useState("General Enquiry");
  const [budgetRange, setBudgetRange] = useState("₹50,000 - ₹1,50,000");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/ads/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          companyName,
          serviceType,
          budgetRange,
          description: message,
          source: "Contact Form",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");

      setSubmittedRef(data.refNumber);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16 space-y-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <Phone className="w-3.5 h-3.5 text-blue-700" />
            <span>Direct Client Desk</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Connect With Vaivas Ads
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Have a question about an upcoming advertising burst, need print sample swatches, or wish to schedule an in-person boardroom consultation? We are here to assist.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-xs">
                <h3 className="text-xl font-bold text-slate-900">Direct Office Channels</h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-sm">Main Office &amp; Creative Studio</strong>
                      <span className="text-slate-600 leading-relaxed block mt-0.5">
                        Vaivas Towers, 3rd Floor, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560103
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-sm">Client Hotline</strong>
                      <a href="tel:+918041234568" className="text-slate-700 hover:text-blue-700 block font-medium">
                        +91 80 4123 4568
                      </a>
                      <a
                        href="https://wa.me/919876543211"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:underline block font-semibold mt-0.5"
                      >
                        WhatsApp Direct: +91 98765 43211
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-sm">Official Inquiries</strong>
                      <a href="mailto:ads@vaivasventures.com" className="text-slate-700 hover:text-blue-700 block font-medium">
                        ads@vaivasventures.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-sm">Operating Hours</strong>
                      <span className="text-slate-600 block">
                        Monday - Saturday: 9:30 AM - 6:30 PM IST
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Print Sample Desk */}
              <div className="p-6 rounded-3xl bg-blue-900 text-white space-y-3 shadow-md">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Physical Paper &amp; Finish Swatches
                </div>
                <h4 className="text-lg font-bold">Request a Corporate Print Kit</h4>
                <p className="text-xs text-blue-100 leading-relaxed">
                  We courier material kits containing 170 GSM, 250 GSM, 300 GSM cards, gold foil samples, and Wire-O calendar stand samples directly to your procurement office.
                </p>
                <Link
                  href="/ads/quote?tab=calendar"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300"
                >
                  <span>Specify sample kit in quote form →</span>
                </Link>
              </div>
            </div>

            {/* Inbound Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs">
                {submittedRef ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Enquiry Received</h3>
                    <p className="text-sm text-slate-600">
                      Your reference is <strong className="text-blue-700">{submittedRef}</strong>. Our account director will call or email you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmittedRef(null)}
                      className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1 pb-2 border-b border-slate-100">
                      <h3 className="text-xl font-bold text-slate-900">Send an Enquiry</h3>
                      <p className="text-xs text-slate-500">
                        Fill in your project outline below. All submissions are stored securely.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Siddharth Verma"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Business Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="siddharth@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98450 11223"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          placeholder="Titanium Holdings Ltd"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Service Required</label>
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-medium"
                        >
                          <option>General Enquiry</option>
                          <option>Calendar Design and Printing (2026 Batch)</option>
                          <option>Print Media (Brochures, Cards, Catalogues)</option>
                          <option>Paid Advertising (Google &amp; Meta)</option>
                          <option>Brand Identity &amp; Creative Design</option>
                          <option>Website Design &amp; Development</option>
                          <option>Video &amp; Motion Content</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Estimated Budget</label>
                        <select
                          value={budgetRange}
                          onChange={(e) => setBudgetRange(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs font-medium"
                        >
                          <option>Under ₹50,000</option>
                          <option>₹50,000 - ₹1,50,000</option>
                          <option>₹1,50,000 - ₹3,00,000</option>
                          <option>₹3,00,000 - ₹10,00,000</option>
                          <option>₹10,00,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1 text-xs">
                        How can we assist you? <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please describe your requirements, desired quantity, or campaign timelines..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md active:scale-98"
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <AdsFooter />
    </div>
  );
}
