"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Search,
  Filter,
  Download,
  Calendar,
  Printer,
  Sparkles,
  Phone,
  Mail,
  User,
  Clock,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Building,
} from "lucide-react";

interface Lead {
  id: string;
  refNumber: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string | null;
  serviceType: string;
  budgetRange: string | null;
  timeline: string | null;
  description: string;
  source: string;
  status: string;
  assignedStaff: string | null;
  internalNotes: string | null;
  nextFollowUpDate: string | null;
  printSpecs: any;
  calendarSpecs: any;
  artworkFiles: string[];
  createdAt: string;
}

export function AdminAdsLeadsManager({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [saving, setSaving] = useState(false);

  // Drawer Form State
  const [editStatus, setEditStatus] = useState("");
  const [editStaff, setEditStaff] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editFollowUp, setEditFollowUp] = useState("");

  const openDrawer = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditStaff(lead.assignedStaff || "");
    setEditNotes(lead.internalNotes || "");
    setEditFollowUp(
      lead.nextFollowUpDate
        ? new Date(lead.nextFollowUpDate).toISOString().split("T")[0]
        : ""
    );
  };

  const closeDrawer = () => {
    setSelectedLead(null);
  };

  const handleSaveChanges = async () => {
    if (!selectedLead) return;
    setSaving(true);

    try {
      const res = await fetch("/api/admin/ads/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedLead.id,
          status: editStatus,
          assignedStaff: editStaff,
          internalNotes: editNotes,
          nextFollowUpDate: editFollowUp || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      // Update state
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? data.lead : l))
      );
      setSelectedLead(data.lead);
      alert("Lead updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to save lead updates.");
    } finally {
      setSaving(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      "Reference Number",
      "Full Name",
      "Email",
      "Phone",
      "Company",
      "Service",
      "Status",
      "Budget",
      "Source",
      "Assigned Staff",
      "Created At",
    ];

    const rows = leads.map((l) => [
      l.refNumber,
      `"${l.fullName}"`,
      l.email,
      l.phone,
      `"${l.companyName || ""}"`,
      `"${l.serviceType}"`,
      l.status,
      `"${l.budgetRange || ""}"`,
      l.source,
      `"${l.assignedStaff || ""}"`,
      new Date(l.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vaivas_ads_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.companyName && l.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      l.refNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses = [
    "ALL",
    "NEW",
    "CONTACTED",
    "QUALIFIED",
    "PROPOSAL_SENT",
    "NEGOTIATION",
    "WON",
    "LOST",
    "CLOSED",
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter & Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, company, ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
          {statuses.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? "bg-slate-900 text-white font-bold"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Reference &amp; Contact</th>
                <th className="py-3.5 px-4">Company</th>
                <th className="py-3.5 px-4">Service &amp; Source</th>
                <th className="py-3.5 px-4">Timeline / Budget</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assigned To</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-blue-700">{l.refNumber}</div>
                      <div className="font-semibold text-slate-900 mt-0.5">{l.fullName}</div>
                      <div className="text-[11px] text-slate-500">
                        {l.email} • {l.phone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {l.companyName || "—"}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{l.serviceType}</div>
                      <div className="text-[10px] text-slate-400">{l.source}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{l.budgetRange || "Flexible"}</div>
                      <div className="text-[10px] text-slate-400">{l.timeline || "Standard"}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          l.status === "NEW"
                            ? "bg-orange-100 text-orange-800"
                            : l.status === "QUALIFIED"
                            ? "bg-blue-100 text-blue-800"
                            : l.status === "PROPOSAL_SENT"
                            ? "bg-purple-100 text-purple-800"
                            : l.status === "WON"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {l.assignedStaff || <span className="text-slate-400 italic">Unassigned</span>}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => openDrawer(l)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
                      >
                        Review Specs
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL INSPECTION DRAWER */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl flex flex-col justify-between">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="font-mono text-xs font-bold text-blue-700">
                  {selectedLead.refNumber}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedLead.fullName} {selectedLead.companyName && `(${selectedLead.companyName})`}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6 flex-1 text-xs">
              {/* Contact Information */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Client Coordinates
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div><strong>Email:</strong> {selectedLead.email}</div>
                  <div><strong>Phone:</strong> {selectedLead.phone}</div>
                  <div><strong>Company:</strong> {selectedLead.companyName || "N/A"}</div>
                  <div><strong>Source:</strong> {selectedLead.source}</div>
                </div>
              </div>

              {/* Requirement Description */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Requirement Description
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 whitespace-pre-line leading-relaxed">
                  {selectedLead.description}
                </div>
              </div>

              {/* Structured Calendar Specifications */}
              {selectedLead.calendarSpecs && (
                <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span>Submitted 2026 Calendar Specifications</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 text-slate-700 text-xs">
                    <div><strong>Type:</strong> {selectedLead.calendarSpecs.calendarType}</div>
                    <div><strong>Batch Year:</strong> {selectedLead.calendarSpecs.year}</div>
                    <div><strong>Dimensions:</strong> {selectedLead.calendarSpecs.dimensions}</div>
                    <div><strong>Quantity:</strong> {selectedLead.calendarSpecs.quantity} units</div>
                    <div><strong>Leaves / Sheets:</strong> {selectedLead.calendarSpecs.leavesCount}</div>
                    <div><strong>Paper / Substrate:</strong> {selectedLead.calendarSpecs.paperGsm}</div>
                    <div><strong>Stand Material:</strong> {selectedLead.calendarSpecs.standMaterial}</div>
                    <div><strong>Finishing / Foil:</strong> {selectedLead.calendarSpecs.finish}</div>
                    <div><strong>Binding:</strong> {selectedLead.calendarSpecs.binding}</div>
                    <div><strong>Packaging:</strong> {selectedLead.calendarSpecs.packaging}</div>
                    <div><strong>Language &amp; Holidays:</strong> {selectedLead.calendarSpecs.language}</div>
                    {selectedLead.calendarSpecs.specialDatesNotes && (
                      <div className="col-span-2 text-slate-900 bg-white p-2 rounded-lg border border-orange-200">
                        <strong>Custom Dates:</strong> {selectedLead.calendarSpecs.specialDatesNotes}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Structured Print Specifications */}
              {selectedLead.printSpecs && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                    <Printer className="w-4 h-4 text-blue-700" />
                    <span>Submitted Commercial Print Specifications</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 text-slate-700 text-xs">
                    <div><strong>Product:</strong> {selectedLead.printSpecs.productType}</div>
                    <div><strong>Quantity:</strong> {selectedLead.printSpecs.quantity} units</div>
                    <div><strong>Dimensions:</strong> {selectedLead.printSpecs.finishedDimensions}</div>
                    <div><strong>Orientation:</strong> {selectedLead.printSpecs.orientation}</div>
                    <div><strong>Paper Stock:</strong> {selectedLead.printSpecs.paperSubstrate}</div>
                    <div><strong>Page Count:</strong> {selectedLead.printSpecs.pageCount}</div>
                    <div><strong>Printing Sides:</strong> {selectedLead.printSpecs.printingSides}</div>
                    <div><strong>Finish:</strong> {selectedLead.printSpecs.finish}</div>
                    <div><strong>Folding / Binding:</strong> {selectedLead.printSpecs.foldingBinding}</div>
                    <div><strong>Delivery Pincode:</strong> {selectedLead.printSpecs.deliveryPincode || "Not specified"}</div>
                  </div>
                </div>
              )}

              {/* Operational Governance Updates */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                  Lead Governance &amp; Assignment
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Update Status</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-slate-900"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="QUALIFIED">QUALIFIED</option>
                      <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                      <option value="NEGOTIATION">NEGOTIATION</option>
                      <option value="WON">WON</option>
                      <option value="LOST">LOST</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Assigned Staff</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Mehta (Production Mgr)"
                      value={editStaff}
                      onChange={(e) => setEditStaff(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Next Follow-Up Date</label>
                    <input
                      type="date"
                      value={editFollowUp}
                      onChange={(e) => setEditFollowUp(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Internal Staff Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Add operational notes, pricing assumptions, or meeting recaps..."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 sticky bottom-0">
              <button
                type="button"
                onClick={handleSaveChanges}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <Link
                href={`/admin/ads/quotations?action=new&leadId=${selectedLead.id}`}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Create Quotation from Lead →</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
