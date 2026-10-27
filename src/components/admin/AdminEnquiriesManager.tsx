"use client";

import React, { useState } from "react";
import { Mail, Phone, Clock, Filter, CheckCircle2 } from "lucide-react";

interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  enquiryCategory: string;
  message: string;
  status: string;
  createdAt: string | Date;
}

export default function AdminEnquiriesManager({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries(enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = enquiries.filter(
    (e) => categoryFilter === "ALL" || e.enquiryCategory === categoryFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-700">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium"
          >
            <option value="ALL">All Categories ({enquiries.length})</option>
            <option value="General">General</option>
            <option value="Jobs / Careers">Jobs / Careers</option>
            <option value="Advertising">Advertising</option>
            <option value="HR Recruitment">HR Recruitment</option>
            <option value="Partnership">Partnership</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-6">Sender</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Message</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No enquiries match the filter.
                  </td>
                </tr>
              ) : (
                filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 text-sm">
                      {enq.fullName}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                        {enq.enquiryCategory}
                      </span>
                    </td>
                    <td className="py-4 px-4 space-y-0.5">
                      <div className="text-slate-600">{enq.email}</div>
                      <div className="text-[11px] text-slate-400">{enq.phone}</div>
                    </td>
                    <td className="py-4 px-4 max-w-sm">
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">{enq.message}</p>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                          enq.status === "RESOLVED"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : enq.status === "IN_PROGRESS"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-[11px] text-slate-400">
                      {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
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
