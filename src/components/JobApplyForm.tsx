"use client";

import React, { useState } from "react";
import { Upload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function JobApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }

    if (!resumeFile) {
      setError("Please upload your resume (PDF or DOCX).");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("experience", experience);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resumeFile);

      const res = await fetch("/api/jobs/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setAppId(data.applicationId);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-slate-900">Application Received!</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Thank you for applying for <strong>{jobTitle}</strong>. Our talent team has received
            your profile and resume.
          </p>
        </div>
        {appId && (
          <div className="text-[11px] text-slate-400 font-mono bg-slate-50 py-1.5 px-3 rounded-xl inline-block">
            Ref: {appId.slice(0, 13)}...
          </div>
        )}
        <div className="pt-2">
          <button
            onClick={() => {
              setSubmitted(false);
              setFullName("");
              setEmail("");
              setPhone("");
              setResumeFile(null);
            }}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Submit another application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {error && (
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
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
          placeholder="e.g. Priya Sharma"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="priya@example.com"
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
            placeholder="+91 98451 23456"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Relevant Experience
        </label>
        <input
          type="text"
          placeholder="e.g. 5 years in HR operations"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Attach Resume (PDF/DOCX, max 10MB) <span className="text-rose-500">*</span>
        </label>
        <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20">
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
                <span className="text-blue-600 font-bold">{resumeFile.name}</span>
              ) : (
                "Click or drag resume file to upload"
              )}
            </span>
            <span className="text-[10px] text-slate-400">PDF, DOC, DOCX up to 10MB</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Brief Note / Cover Letter (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Tell us a little about your career goals and interest in this role..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
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
            <span>Submitting Application...</span>
          </>
        ) : (
          <span>Submit Application</span>
        )}
      </button>
    </form>
  );
}
