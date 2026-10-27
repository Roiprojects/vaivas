"use client";

import React, { useState } from "react";
import { Download, FileText, CheckCircle2, Clock, Mail, Phone, Filter } from "lucide-react";

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  experience?: string | null;
  coverLetter?: string | null;
  resumeUrl: string;
  resumeOriginalName: string;
  status: string;
  notes?: string | null;
  createdAt: string | Date;
  job: {
    title: string;
    department: string;
  };
}

export default function AdminApplicationsManager({
  initialApplications,
}: {
  initialApplications: Application[];
}) {
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setApplications(
          applications.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
        );
      }
    } catch (e) {
      console.error("Status error:", e);
    }
  };

  const filtered = applications.filter(
    (app) => filterStatus === "ALL" || app.status === filterStatus
  );

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-700">Filter Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium"
          >
            <option value="ALL">All Applications ({applications.length})</option>
            <option value="NEW">New</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="HIRED">Hired</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <span className="text-xs text-slate-500">
          Showing <strong>{filtered.length}</strong> candidates
        </span>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-6">Candidate</th>
                <th className="py-3.5 px-4">Applied Role</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Resume Document</th>
                <th className="py-3.5 px-4">Review Status</th>
                <th className="py-3.5 px-6">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No applications match the selected status.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 text-sm">{app.fullName}</div>
                      {app.coverLetter && (
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 italic">
                          &ldquo;{app.coverLetter}&rdquo;
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 font-medium text-slate-800">
                      <div>{app.job.title}</div>
                      <div className="text-[10px] text-slate-400">{app.job.department}</div>
                    </td>

                    <td className="py-4 px-4 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <a href={`mailto:${app.email}`} className="hover:underline">
                          {app.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{app.phone}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-600">
                      {app.experience || "Not specified"}
                    </td>

                    <td className="py-4 px-4">
                      {app.resumeUrl ? (
                        <a
                          href={`/api/admin/resumes/${app.resumeUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors"
                          title="Authorized download"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[120px]">
                            {app.resumeOriginalName || "Download Resume"}
                          </span>
                        </a>
                      ) : (
                        <span className="text-slate-400">No file</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                          app.status === "SHORTLISTED"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : app.status === "HIRED"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : app.status === "REJECTED"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="REVIEWING">REVIEWING</option>
                        <option value="SHORTLISTED">SHORTLISTED</option>
                        <option value="INTERVIEWING">INTERVIEWING</option>
                        <option value="HIRED">HIRED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>

                    <td className="py-4 px-6 text-slate-500 text-[11px]">
                      {new Date(app.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
