"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send, Building2 } from "lucide-react";

export default function EmployerRequirementForm() {
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [location, setLocation] = useState("");
  const [openings, setOpenings] = useState("1");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [hiringTimeline, setHiringTimeline] = useState("Within 30 Days");
  const [budgetRange, setBudgetRange] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/recruitment/employer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          contactPerson,
          email,
          phone,
          jobRole,
          location,
          openings: parseInt(openings, 10),
          experience,
          skills,
          employmentType,
          hiringTimeline,
          budgetRange,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit requirement");

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
        <h3 className="text-xl font-bold text-slate-900">Requirement Registered!</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you for trusting Vaivas HR Recruitment. A senior recruitment specialist will review
          your position specifications and reach out with matched candidate profiles.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setSubmitted(false);
              setJobRole("");
              setSkills("");
            }}
            className="text-xs font-semibold text-emerald-600 hover:underline"
          >
            Submit another hiring opening
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
            Company Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Zenith Tech Solutions"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Contact Person <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Anand Murthy (HR Director)"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Work Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="anand@zenithtech.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Official Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="+91 99123 45678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Role / Designation Needed <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Lead React Architect"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Job Location
          </label>
          <input
            type="text"
            placeholder="e.g. Bengaluru / Hybrid"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Number of Openings
          </label>
          <input
            type="number"
            min="1"
            value={openings}
            onChange={(e) => setOpenings(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Experience Level <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 5-8 years"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Employment Type
          </label>
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          >
            <option value="Full-time">Full-time Permanent</option>
            <option value="Contract Staffing">Contract Staffing</option>
            <option value="Executive Search">Executive Search / CXO</option>
            <option value="Remote / Hybrid">Remote / Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Hiring Timeline
          </label>
          <select
            value={hiringTimeline}
            onChange={(e) => setHiringTimeline(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          >
            <option value="Immediate / 15 Days">Immediate / Within 15 Days</option>
            <option value="Within 30 Days">Within 30 Days</option>
            <option value="1-2 Months">1-2 Months</option>
            <option value="Future Pipeline">Future Talent Pipeline</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Required Technical & Domain Skills <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={2}
            required
            placeholder="e.g. React 19, TypeScript, Next.js, Node.js, Cloud architectures"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Target Budget / CTC Range (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. ₹18,00,000 - ₹25,00,000 P.A."
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Hiring Requirement...</span>
          </>
        ) : (
          <>
            <span>Submit Hiring Requirement</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
