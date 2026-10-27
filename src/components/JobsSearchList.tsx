"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin, Briefcase, Clock, Calendar, ArrowRight, Filter } from "lucide-react";

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
  description: string;
  postedAt: string | Date;
  status: string;
  expiryDate?: string | Date | null;
}

export default function JobsSearchList({ initialJobs }: { initialJobs: Job[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");

  const departments = useMemo(() => {
    const set = new Set<string>();
    initialJobs.forEach((j) => set.add(j.department));
    return ["ALL", ...Array.from(set)];
  }, [initialJobs]);

  const employmentTypes = useMemo(() => {
    const set = new Set<string>();
    initialJobs.forEach((j) => set.add(j.employmentType));
    return ["ALL", ...Array.from(set)];
  }, [initialJobs]);

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept === "ALL" || job.department === selectedDept;
      const matchesType = selectedType === "ALL" || job.employmentType === selectedType;

      return matchesSearch && matchesDept && matchesType;
    });
  }, [initialJobs, searchTerm, selectedDept, selectedType]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Keyword Search */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by job title, skill or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          {/* Department Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            >
              <option value="ALL">All Departments</option>
              {departments
                .filter((d) => d !== "ALL")
                .map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
            </select>
          </div>

          {/* Employment Type Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            >
              <option value="ALL">All Work Types</option>
              {employmentTypes
                .filter((t) => t !== "ALL")
                .map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800">{filteredJobs.length}</strong> active opportunities
          </span>
          {(searchTerm || selectedDept !== "ALL" || selectedType !== "ALL") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDept("ALL");
                setSelectedType("ALL");
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No matching jobs found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or clear your department/location filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover-card-elevate flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                    {job.department}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {new Date(job.postedAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-blue-600 transition-colors">
                  <Link href={`/jobs/${job.slug || job.id}`}>{job.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{job.employmentType} • {job.experienceLevel}</span>
                  </div>
                  {job.salaryRange && (
                    <div className="text-xs font-semibold text-emerald-700 pt-1">
                      {job.salaryRange}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {job.openings} opening{job.openings > 1 ? "s" : ""}
                </span>
                <Link
                  href={`/jobs/${job.slug || job.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>View & Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
