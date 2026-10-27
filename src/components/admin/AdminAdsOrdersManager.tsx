"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PackageCheck,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  AlertTriangle,
  Truck,
  CreditCard,
  X,
  FileText,
  UserCheck,
  Calendar,
} from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  quotationId: string;
  quotationNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  companyName: string | null;
  billingAddress: string | null;
  deliveryAddress: string;
  items: any[];
  specifications: any;
  totalAmount: number;
  advancePaid: number;
  balanceAmount: number;
  paymentStatus: string;
  requestedDeliveryDate: string | null;
  confirmedDeliveryDate: string | null;
  assignedStaff: string | null;
  productionVendor: string | null;
  jobSheetDetails: any;
  status: string;
  statusReason: string | null;
  artworkProofs: any[];
  isArtworkApproved: boolean;
  artworkApprovedBy: string | null;
  artworkApprovedAt: string | null;
  qualityCheckPassed: boolean;
  qualityCheckNotes: any;
  totalOrderedQty: number;
  totalDispatchedQty: number;
  remainingQty: number;
  shipments: any[];
  billingRecords: any[];
  createdAt: string;
}

export function AdminAdsOrdersManager({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [showQcModal, setShowQcModal] = useState(false);
  const [targetStatus, setTargetStatus] = useState("");
  const [statusReason, setStatusReason] = useState("");
  const [proofApprover, setProofApprover] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/ads/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          status: targetStatus,
          statusReason,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Status update failed");

      setOrders((prev) =>
        prev.map((o) => (o.id === selectedOrder.id ? data.order : o))
      );
      setSelectedOrder(data.order);
      setShowStatusModal(false);
      setStatusReason("");
      alert(`Order ${data.order.orderNumber} updated to ${targetStatus}`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleApproveArtwork = async () => {
    if (!selectedOrder) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/ads/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          action: "APPROVE_ARTWORK",
          approvedBy: proofApprover || selectedOrder.customerName,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Approval failed");

      setOrders((prev) =>
        prev.map((o) => (o.id === selectedOrder.id ? data.order : o))
      );
      setSelectedOrder(data.order);
      setShowProofModal(false);
      alert("Artwork proof approved! Job marked READY_FOR_PRODUCTION.");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignOffQC = async () => {
    if (!selectedOrder) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/ads/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          action: "SIGN_OFF_QC",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "QC sign-off failed");

      setOrders((prev) =>
        prev.map((o) => (o.id === selectedOrder.id ? data.order : o))
      );
      setSelectedOrder(data.order);
      setShowQcModal(false);
      alert("Quality Check passed! Order is now READY_FOR_DISPATCH.");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    return (
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.companyName && o.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const statuses = [
    "CONFIRMED",
    "AWAITING_ARTWORK",
    "AWAITING_APPROVAL",
    "READY_FOR_PRODUCTION",
    "IN_PRODUCTION",
    "QUALITY_CHECK",
    "READY_FOR_DISPATCH",
    "PARTIALLY_DISPATCHED",
    "DISPATCHED",
    "DELIVERED",
    "CLOSED",
    "ON_HOLD",
    "CANCELLED",
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order #, client, quote..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Active Production Run: {orders.length} orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Order # &amp; Quote</th>
                <th className="py-3.5 px-4">Customer &amp; Company</th>
                <th className="py-3.5 px-4">Production Status</th>
                <th className="py-3.5 px-4">Artwork Sign-off</th>
                <th className="py-3.5 px-4">Advance Paid</th>
                <th className="py-3.5 px-4">Qty (Ord / Rem)</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No production orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-slate-900">{o.orderNumber}</div>
                      <div className="text-[10px] text-blue-700">Quote: {o.quotationNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{o.customerName}</div>
                      <div className="text-[11px] text-slate-500">
                        {o.companyName || "Individual"}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          o.status === "IN_PRODUCTION"
                            ? "bg-purple-100 text-purple-800"
                            : o.status === "QUALITY_CHECK"
                            ? "bg-amber-100 text-amber-800"
                            : o.status === "READY_FOR_DISPATCH"
                            ? "bg-blue-100 text-blue-800"
                            : o.status === "DISPATCHED" || o.status === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800"
                            : o.status === "ON_HOLD" || o.status === "CANCELLED"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {o.status.replace(/_/g, " ")}
                      </span>
                      {o.statusReason && (
                        <div className="text-[10px] text-rose-600 mt-0.5 truncate max-w-[120px]">
                          {o.statusReason}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {o.isArtworkApproved ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-[10px] flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Approved</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold text-[10px] flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3" />
                          <span>Pending Proof</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">
                        ₹{o.advancePaid.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Balance: ₹{o.balanceAmount.toLocaleString("en-IN")}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900">{o.totalOrderedQty}</span>
                      <span className="text-slate-400"> / </span>
                      <span className="text-orange-600 font-bold">{o.remainingQty}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(o)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
                      >
                        Manage
                      </button>

                      <Link
                        href={`/admin/ads/dispatch?orderId=${o.id}`}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors inline-block"
                      >
                        Dispatch →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER MANAGEMENT DRAWER */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="font-mono text-xs font-bold text-blue-700">
                    {selectedOrder.orderNumber}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    Production Job Sheet: {selectedOrder.customerName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status & Gates Check Overview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Current Status:</span>
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-bold text-[11px]">
                    {selectedOrder.status.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Artwork Gate</div>
                    <div className="mt-1 font-semibold flex items-center gap-1.5">
                      {selectedOrder.isArtworkApproved ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Approved by {selectedOrder.artworkApprovedBy}</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>Awaiting Proof Approval</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Advance Gate</div>
                    <div className="mt-1 font-semibold flex items-center gap-1.5">
                      {selectedOrder.advancePaid > 0 ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>₹{selectedOrder.advancePaid.toLocaleString("en-IN")} Recorded</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                          <span>Advance Unpaid</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Production Controls */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Production Controls &amp; Sign-offs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setShowProofModal(true)}
                    className="p-3.5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-left space-y-1 transition-colors"
                  >
                    <div className="font-bold text-xs">Artwork Proof</div>
                    <div className="text-[10px] text-purple-700">Record client sign-off</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowQcModal(true)}
                    className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-left space-y-1 transition-colors"
                  >
                    <div className="font-bold text-xs">Quality Check</div>
                    <div className="text-[10px] text-emerald-700">Sign off print inspection</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetStatus(selectedOrder.status);
                      setShowStatusModal(true);
                    }}
                    className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-left space-y-1 transition-colors"
                  >
                    <div className="font-bold text-xs">Update Status</div>
                    <div className="text-[10px] text-slate-500">Advance or hold job</div>
                  </button>
                </div>
              </div>

              {/* Job Sheet Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900">Job Sheet Specifications</div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div><strong>Ordered Qty:</strong> {selectedOrder.totalOrderedQty} units</div>
                  <div><strong>Dispatched:</strong> {selectedOrder.totalDispatchedQty} units</div>
                  <div><strong>Remaining:</strong> {selectedOrder.remainingQty} units</div>
                  <div><strong>Delivery Target:</strong> {selectedOrder.confirmedDeliveryDate ? new Date(selectedOrder.confirmedDeliveryDate).toLocaleDateString() : "Pending"}</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <Link
                href={`/admin/ads/dispatch?orderId=${selectedOrder.id}`}
                className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Create Shipment / Dispatch →</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: UPDATE PRODUCTION STATUS */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-slate-900">Update Production Status</h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Status</label>
              <select
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>
                    {st.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            {(targetStatus === "ON_HOLD" || targetStatus === "CANCELLED") && (
              <div>
                <label className="block font-bold text-rose-700 mb-1">
                  Mandatory Reason for {targetStatus} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Document reason (e.g. client requested date change, artwork delay, paper stock shortage)..."
                  value={statusReason}
                  onChange={(e) => setStatusReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-rose-300 text-xs"
                ></textarea>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateStatus}
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold"
              >
                {submitting ? "Updating..." : "Save Status"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: APPROVE ARTWORK PROOF */}
      {showProofModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-slate-900">Record Artwork Proof Approval</h3>
            <p className="text-slate-500">
              Sign off on client proof approval. This will release the job to READY_FOR_PRODUCTION.
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Approver Name / Client Signee</label>
              <input
                type="text"
                placeholder={selectedOrder.customerName}
                value={proofApprover}
                onChange={(e) => setProofApprover(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowProofModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApproveArtwork}
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold"
              >
                {submitting ? "Approving..." : "Sign Off & Release"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SIGN OFF QUALITY CHECK */}
      {showQcModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-slate-900">Quality Check Inspection</h3>
            <p className="text-slate-500">
              Confirm technical parameters before releasing order for dispatch.
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-emerald-900">
              <div className="flex items-center gap-2">✓ Finished dimensions within ±0.5mm</div>
              <div className="flex items-center gap-2">✓ Paper stock GSM &amp; rigidity confirmed</div>
              <div className="flex items-center gap-2">✓ CMYK density matched approved digital proof</div>
              <div className="flex items-center gap-2">✓ Lamination &amp; foil registration clean</div>
              <div className="flex items-center gap-2">✓ Calendar page sequence &amp; dates checked</div>
              <div className="flex items-center gap-2">✓ 100% quantity count verified ({selectedOrder.totalOrderedQty} units)</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowQcModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSignOffQC}
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
              >
                {submitting ? "Recording..." : "Pass QC & Release for Dispatch"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
