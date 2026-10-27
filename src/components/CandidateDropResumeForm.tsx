"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Upload, Send } from "lucide-react";

export default function CandidateDropResumeForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredRole, setPreferredRole] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("Bengaluru");
  const [availability, setAvailability] = useState("Immediate");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!resumeFile) {
      setError("Please attach your resume file (PDF or DOCX).");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("preferredRole", preferredRole);
      formData.append("experience", experience);
      formData.append("skills", skills);
      formData.append("preferredLocation", preferredLocation);
      formData.append("availability", availability);
      formData.append("resume", resumeFile);

      const res = await fetch("/api/recruitment/candidate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit resume");

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
        <h3 className="text-xl font-bold text-slate-900">Profile Added to Talent Network!</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your profile and resume have been securely added to our recruitment database. When matching
          client requirements arise, our consultants will reach out directly.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setSubmitted(false);
              setFullName("");
              setEmail("");
              setPhone("");
              setPreferredRole("");
              setResumeFile(null);
            }}
            className="text-xs font-semibold text-emerald-600 hover:underline"
          >
            Submit another profile
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
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Vikram Malhotra"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="vikram@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98451 23456"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Target Job Title / Domain <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Senior Product Manager"
            value={preferredRole}
            onChange={(e) => setPreferredRole(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Total Work Experience
          </label>
          <input
            type="text"
            placeholder="e.g. 6 years"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Location
          </label>
          <input
            type="text"
            placeholder="e.g. Bengaluru / Hyderabad / Remote"
            value={preferredLocation}
            onChange={(e) => setPreferredLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Availability / Notice Period
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          >
            <option value="Immediate">Immediate Joiner</option>
            <option value="15 Days">Within 15 Days</option>
            <option value="30 Days">30 Days</option>
            <option value="60-90 Days">60 - 90 Days</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Key Skills & Certifications
        </label>
        <input
          type="text"
          placeholder="e.g. Product Strategy, Agile, Scrum, SQL, Figma, User Research"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Upload Resume (PDF/DOCX, max 10MB) <span className="text-rose-500">*</span>
        </label>
        <div className="relative border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-emerald-50/20">
          <input
            type="file"
            required
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setResumeFile(e.target.files[0]);
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="flex flex-col items-center gap-1.5 pointer-events-none">
            <Upload className="w-5 h-5 text-slate-400" />
            <span className="text-xs font-medium text-slate-700">
              {resumeFile ? (
                <span className="text-emerald-700 font-bold">{resumeFile.name}</span>
              ) : (
                "Click or drag resume file to upload"
              )}
            </span>
            <span className="text-[10px] text-slate-400">PDF, DOC, DOCX up to 10MB</span>
          </div>
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
            <span>Uploading Profile...</span>
          </>
        ) : (
          <>
            <span>Submit Resume to Talent Pool</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
