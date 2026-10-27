"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  Sparkles,
  ArrowRight,
  X,
  FileText,
  AlertCircle,
  Copy,
  ExternalLink,
} from "lucide-react";

interface Quotation {
  id: string;
  quotationNumber: string;
  revisionNumber: number;
  leadId: string | null;
  leadRefNumber: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName: string | null;
  billingAddress: string | null;
  issueDate: string;
  validityDate: string;
  items: any[];
  subtotal: number;
  designSetupCost: number;
  finishingCost: number;
  deliveryCharges: number;
  discountAmount: number;
  taxPercent: number;
  taxAmount: number;
  totalAmount: number;
  advanceRequiredPercent: number;
  advanceAmount: number;
  commercialTerms: any;
  specificationsSnapshot: any;
  status: string;
  acceptanceEvidence: string | null;
  isConvertedToOrder: boolean;
  order: any | null;
  createdAt: string;
}

export function AdminAdsQuotationsManager({
  initialQuotations,
}: {
  initialQuotations: Quotation[];
}) {
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations);
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [acceptanceEvidenceInput, setAcceptanceEvidenceInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // Create Form State
  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [compName, setCompName] = useState("");
  const [billingAddr, setBillingAddr] = useState("");
  const [validityDays, setValidityDays] = useState("15");
  const [items, setItems] = useState([
    {
      description: "2026 Executive Desk Calendars (8.5x6 inches, 250 GSM Art Card, 2mm Hardboard Stand, Wire-O)",
      quantity: 500,
      unitRate: 125,
    },
  ]);
  const [designSetup, setDesignSetup] = useState(3500);
  const [finishing, setFinishing] = useState(0);
  const [delivery, setDelivery] = useState(1500);
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(18);
  const [advPercent, setAdvPercent] = useState(50);

  const addItemRow = () => {
    setItems((prev) => [...prev, { description: "", quantity: 1, unitRate: 0 }]);
  };

  const removeItemRow = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateItemRow = (idx: number, field: string, val: any) => {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: val } : item))
    );
  };

  // Real-time calculated totals
  const subtotal = items.reduce(
    (sum, it) => sum + (parseFloat(String(it.quantity)) || 0) * (parseFloat(String(it.unitRate)) || 0),
    0
  );
  const taxable = Math.max(0, subtotal + designSetup + finishing + delivery - discount);
  const taxAmount = (taxable * taxRate) / 100;
  const totalAmount = taxable + taxAmount;
  const advanceAmount = (totalAmount * advPercent) / 100;

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/ads/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: custName,
          customerEmail: custEmail,
          customerPhone: custPhone,
          companyName: compName,
          billingAddress: billingAddr,
          validityDays: parseInt(validityDays, 10) || 15,
          items,
          designSetupCost: designSetup,
          finishingCost: finishing,
          deliveryCharges: delivery,
          discountAmount: discount,
          taxPercent: taxRate,
          advanceRequiredPercent: advPercent,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create quotation");

      setQuotations((prev) => [data.quotation, ...prev]);
      setShowCreateModal(false);
      alert(`Quotation ${data.quotation.quotationNumber} generated successfully!`);
    } catch (err: any) {
      alert(err.message || "Failed to generate quotation.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRecordAcceptance = async () => {
    if (!selectedQuote) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/ads/quotations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quotationId: selectedQuote.id,
          status: "ACCEPTED",
          acceptanceEvidence:
            acceptanceEvidenceInput ||
            `Accepted via purchase order by ${selectedQuote.customerName} on ${new Date().toLocaleDateString()}.`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to accept quotation");

      setQuotations((prev) =>
        prev.map((q) => (q.id === selectedQuote.id ? data.quotation : q))
      );
      setSelectedQuote(data.quotation);
      setShowAcceptModal(false);
      alert("Quotation accepted! You can now convert it to a production order.");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConvertToOrder = async (quote: Quotation) => {
    if (!confirm(`Convert Quotation ${quote.quotationNumber} into a live Production Order?`)) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/ads/quotations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "CONVERT_TO_ORDER",
          quotationId: quote.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to convert to order");

      alert(`Success! Production Order ${data.order.orderNumber} created.`);
      window.location.href = "/admin/ads/orders";
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReviseQuote = async (quote: Quotation) => {
    if (!confirm(`Create Revision R${quote.revisionNumber + 1} for ${quote.quotationNumber}?`)) {
      return;
    }

    try {
      const res = await fetch("/api/admin/ads/quotations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REVISE",
          quotationId: quote.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Revision failed");
      setQuotations((prev) =>
        prev.map((q) => (q.id === quote.id ? data.quotation : q))
      );
      alert(`Revision created: ${quote.quotationNumber} is now at R${data.quotation.revisionNumber}`);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const filteredQuotes = quotations.filter((q) => {
    const matchesStatus = filterStatus === "ALL" || q.status === filterStatus;
    const matchesSearch =
      q.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.companyName && q.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by quote #, client, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New Quotation</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Quotation #</th>
                <th className="py-3.5 px-4">Customer &amp; Company</th>
                <th className="py-3.5 px-4">Valid Until</th>
                <th className="py-3.5 px-4">Total Amount (Incl. GST)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Order Link</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No quotations generated yet.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-blue-700">{q.quotationNumber}</div>
                      <div className="text-[10px] text-slate-400">Revision R{q.revisionNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{q.customerName}</div>
                      <div className="text-[11px] text-slate-500">
                        {q.companyName || "Individual Client"} • {q.customerPhone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {new Date(q.validityDate).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 text-sm">
                        ₹{q.totalAmount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Adv 50%: ₹{q.advanceAmount.toLocaleString("en-IN")}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          q.status === "ACCEPTED"
                            ? "bg-emerald-100 text-emerald-800"
                            : q.status === "SENT"
                            ? "bg-blue-100 text-blue-800"
                            : q.status === "UNDER_REVISION"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {q.isConvertedToOrder ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[11px] flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Converted</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Not converted</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedQuote(q);
                          setShowPrintModal(true);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
                      >
                        PDF View
                      </button>

                      {q.status !== "ACCEPTED" && !q.isConvertedToOrder && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedQuote(q);
                            setShowAcceptModal(true);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition-colors"
                        >
                          Record Acceptance
                        </button>
                      )}

                      {q.status === "ACCEPTED" && !q.isConvertedToOrder && (
                        <button
                          type="button"
                          onClick={() => handleConvertToOrder(q)}
                          className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors shadow-2xs"
                        >
                          Convert to Order →
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleReviseQuote(q)}
                        className="px-2 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 text-xs"
                      >
                        Revise
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: CREATE NEW QUOTATION */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Generate Commercial Quotation
                </h3>
                <p className="text-xs text-slate-500">
                  Itemized pricing with automatic precision calculations and 18% GST.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuotation} className="space-y-6 text-xs">
              {/* Customer Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Customer Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Siddharth Verma"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Customer Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="siddharth@company.com"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98450 11223"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="Titanium Holdings Ltd"
                    value={compName}
                    onChange={(e) => setCompName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Validity (Days)</label>
                  <input
                    type="number"
                    value={validityDays}
                    onChange={(e) => setValidityDays(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Billing Address</label>
                  <input
                    type="text"
                    placeholder="UB City, Bengaluru 560001"
                    value={billingAddr}
                    onChange={(e) => setBillingAddr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">Itemized Deliverables</h4>
                  <button
                    type="button"
                    onClick={addItemRow}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-12 gap-3 items-center"
                    >
                      <div className="col-span-6">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                          Description
                        </label>
                        <input
                          type="text"
                          required
                          value={item.description}
                          onChange={(e) => updateItemRow(idx, "description", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                          Qty
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItemRow(idx, "quantity", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">
                          Unit Rate (₹)
                        </label>
                        <input
                          type="number"
                          required
                          step="0.01"
                          value={item.unitRate}
                          onChange={(e) => updateItemRow(idx, "unitRate", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                        />
                      </div>
                      <div className="col-span-1 text-right">
                        <div className="text-[10px] font-bold text-slate-400">Total</div>
                        <div className="font-bold text-slate-900 mt-1">
                          ₹{((item.quantity || 0) * (item.unitRate || 0)).toLocaleString("en-IN")}
                        </div>
                      </div>
                      <div className="col-span-1 text-right">
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItemRow(idx)}
                            className="p-1 text-rose-500 hover:text-rose-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Adjustments & Taxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Design &amp; Setup (₹)</label>
                  <input
                    type="number"
                    value={designSetup}
                    onChange={(e) => setDesignSetup(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Finishing &amp; Foiling (₹)</label>
                  <input
                    type="number"
                    value={finishing}
                    onChange={(e) => setFinishing(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Charges (₹)</label>
                  <input
                    type="number"
                    value={delivery}
                    onChange={(e) => setDelivery(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount (₹)</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              {/* Real-time Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-slate-400 text-xs">
                    Subtotal: ₹{subtotal.toLocaleString("en-IN")} + 18% GST (₹{taxAmount.toLocaleString("en-IN")})
                  </div>
                  <div className="text-2xl font-extrabold text-orange-400">
                    Grand Total: ₹{totalAmount.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-300">
                    Advance 50% Required: <strong>₹{advanceAmount.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold shadow-sm"
                >
                  {submitting ? "Generating..." : "Save & Generate Quotation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE BRANDED PDF VIEW */}
      {showPrintModal && selectedQuote && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl p-8 space-y-6 text-slate-800">
            {/* Header with Print CTA */}
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <div className="text-xs font-semibold text-slate-500">
                Official Quotation Document Preview
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-6">
              <div>
                <div className="text-2xl font-black text-slate-950">VAIVAS ADS</div>
                <div className="text-xs text-slate-500 italic">By vaivas ventures</div>
                <div className="text-[11px] text-slate-600 mt-2 max-w-xs leading-relaxed">
                  Vaivas Towers, 3rd Floor, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560103<br />
                  GSTIN: 29AABCV1234F1Z5 • Phone: +91 80 4123 4568
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-xl font-bold font-mono text-blue-700">
                  {selectedQuote.quotationNumber}
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  Revision R{selectedQuote.revisionNumber}
                </div>
                <div className="text-xs text-slate-500">
                  Date: {new Date(selectedQuote.issueDate).toLocaleDateString("en-IN")}
                </div>
                <div className="text-xs text-slate-500">
                  Valid Until: {new Date(selectedQuote.validityDate).toLocaleDateString("en-IN")}
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Quotation Prepared For</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{selectedQuote.customerName}</div>
                <div className="text-slate-600">{selectedQuote.companyName || "Client"}</div>
                <div className="text-slate-600">{selectedQuote.customerEmail} • {selectedQuote.customerPhone}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Billing Address</div>
                <div className="text-slate-700 mt-0.5">{selectedQuote.billingAddress || "Direct Corporate Billing"}</div>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Description &amp; Specifications</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Unit Rate (₹)</th>
                    <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedQuote.items.map((item: any, i: number) => (
                    <tr key={i}>
                      <td className="py-2.5 px-3 font-medium text-slate-400">{i + 1}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{item.description}</td>
                      <td className="py-2.5 px-3 text-center font-semibold">{item.quantity}</td>
                      <td className="py-2.5 px-3 text-right">₹{item.unitRate?.toLocaleString("en-IN")}</td>
                      <td className="py-2.5 px-3 text-right font-bold">₹{item.amount?.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculation Summary */}
            <div className="flex justify-end text-xs">
              <div className="w-64 space-y-1.5 border-t border-slate-200 pt-2">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>₹{selectedQuote.subtotal?.toLocaleString("en-IN")}</span>
                </div>
                {selectedQuote.designSetupCost > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Design &amp; Setup:</span>
                    <span>₹{selectedQuote.designSetupCost?.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {selectedQuote.deliveryCharges > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Charges:</span>
                    <span>₹{selectedQuote.deliveryCharges?.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {selectedQuote.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount:</span>
                    <span>-₹{selectedQuote.discountAmount?.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>18% GST:</span>
                  <span>₹{selectedQuote.taxAmount?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-300">
                  <span>Total Amount:</span>
                  <span>₹{selectedQuote.totalAmount?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-bold text-orange-600 pt-1">
                  <span>Advance (50%):</span>
                  <span>₹{selectedQuote.advanceAmount?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Commercial Terms */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1.5 leading-relaxed">
              <div className="font-bold text-slate-900 text-xs">Commercial Terms &amp; Conditions</div>
              <div>• Lead Time: 10-12 business days following final digital artwork proof sign-off.</div>
              <div>• Payment Terms: 50% advance upon formal acceptance; balance 50% prior to dispatch.</div>
              <div>• Quality Assurance: Machine proofing against approved signed PDF proof.</div>
            </div>

            {/* Signatures */}
            <div className="pt-8 grid grid-cols-2 text-xs text-slate-500">
              <div>
                <div className="h-10 border-b border-slate-300 w-48"></div>
                <div className="mt-1">Authorized Signatory, Vaivas Ads</div>
              </div>
              <div className="text-right">
                <div className="h-10 border-b border-slate-300 w-48 ml-auto"></div>
                <div className="mt-1">Customer Acceptance / PO Stamp</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: RECORD CUSTOMER ACCEPTANCE */}
      {showAcceptModal && selectedQuote && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">
              Record Customer Acceptance
            </h3>
            <p className="text-xs text-slate-500">
              Record customer confirmation evidence (signed PO, email confirmation, or advance reference) for {selectedQuote.quotationNumber}.
            </p>

            <div>
              <label className="block font-bold text-slate-700 text-xs mb-1">
                Acceptance Notes / PO Reference
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Approved by Siddharth Verma via Purchase Order PO-9841 on 26-Oct-2026."
                value={acceptanceEvidenceInput}
                onChange={(e) => setAcceptanceEvidenceInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAcceptModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRecordAcceptance}
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                {submitting ? "Recording..." : "Confirm Acceptance"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
