"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, ExternalLink, Trash2, Edit2, CheckCircle2, AlertCircle, X, Loader2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  openings: number;
  salaryRange?: string | null;
  status: string;
  createdAt: string | Date;
  _count?: { applications: number };
}

export default function AdminJobsManager({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // New Job Form State
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("Human Resources");
  const [location, setLocation] = useState("Bengaluru, Karnataka");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [experienceLevel, setExperienceLevel] = useState("3-6 years");
  const [openings, setOpenings] = useState("1");
  const [salaryRange, setSalaryRange] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [benefits, setBenefits] = useState("");
  const [status, setStatus] = useState("PUBLISHED");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          department,
          location,
          employmentType,
          experienceLevel,
          openings: parseInt(openings, 10),
          salaryRange,
          description,
          requirements,
          responsibilities,
          benefits,
          status,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create job");

      setJobs([data.job, ...jobs]);
      setModalOpen(false);
      // Reset form
      setTitle("");
      setDescription("");
      setRequirements("");
    } catch (err: any) {
      alert(err.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setJobs(jobs.map((j) => (j.id === id ? { ...j, status: newStatus } : j)));
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDelete = async (id: string, jobTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${jobTitle}"? This will delete associated applications.`))
      return;

    try {
      const res = await fetch(`/api/admin/jobs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs(jobs.filter((j) => j.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <span className="text-xs text-slate-500">
          Total <strong>{jobs.length}</strong> Job Listings
        </span>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-6">Job Title</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Openings</th>
                <th className="py-3.5 px-4">Applications</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{job.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{job.employmentType}</div>
                  </td>
                  <td className="py-4 px-4 font-medium text-slate-700">{job.department}</td>
                  <td className="py-4 px-4 text-slate-600">{job.location}</td>
                  <td className="py-4 px-4 font-mono font-medium">{job.openings}</td>
                  <td className="py-4 px-4">
                    <Link
                      href={`/admin/applications?jobId=${job.id}`}
                      className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold hover:underline"
                    >
                      {job._count?.applications || 0} applied
                    </Link>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                        job.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : job.status === "CLOSED"
                          ? "bg-rose-50 text-rose-800 border-rose-200"
                          : "bg-slate-100 text-slate-700 border-slate-300"
                      }`}
                    >
                      <option value="PUBLISHED">PUBLISHED</option>
                      <option value="DRAFT">DRAFT</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Link
                      href={`/jobs/${job.slug || job.id}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 inline-block"
                      title="View Public Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(job.id, job.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 inline-block"
                      title="Delete Job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Job Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Post a New Job Opportunity</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Job Designation / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Talent Acquisition Specialist"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Work Type</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Openings</label>
                  <input
                    type="number"
                    min="1"
                    value={openings}
                    onChange={(e) => setOpenings(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Salary Range</label>
                <input
                  type="text"
                  placeholder="e.g. ₹12,00,000 - ₹18,00,000 P.A."
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Job Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed description of the role and scope..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Requirements</label>
                <textarea
                  rows={2}
                  placeholder="Eligibility, education, key skills required..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save & Publish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
