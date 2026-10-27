"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Package,
  X,
  FileText,
  MapPin,
} from "lucide-react";

interface Shipment {
  id: string;
  orderId: string;
  shipmentNumber: string;
  dispatchedQty: number;
  packagingDetails: string;
  dispatchDate: string;
  deliveryMethod: string;
  courierPartner: string | null;
  trackingReference: string | null;
  shippingCharges: number;
  deliveryStatus: string;
  proofOfDelivery: string | null;
  deliveryConfirmedAt: string | null;
  createdAt: string;
  order: {
    orderNumber: string;
    customerName: string;
    companyName: string | null;
    totalOrderedQty: number;
    remainingQty: number;
    deliveryAddress: string;
  };
}

interface OrderOption {
  id: string;
  orderNumber: string;
  customerName: string;
  companyName: string | null;
  totalOrderedQty: number;
  remainingQty: number;
  deliveryAddress: string;
}

export function AdminAdsDispatchManager({
  initialShipments,
  eligibleOrders,
}: {
  initialShipments: Shipment[];
  eligibleOrders: OrderOption[];
}) {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [proofText, setProofText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Create Shipment Form
  const [selectedOrderId, setSelectedOrderId] = useState(
    eligibleOrders.length > 0 ? eligibleOrders[0].id : ""
  );
  const [dispatchedQty, setDispatchedQty] = useState("");
  const [packagingDetails, setPackagingDetails] = useState("Corrugated Master Cartons with Corner Protectors");
  const [deliveryMethod, setDeliveryMethod] = useState("Courier");
  const [courierPartner, setCourierPartner] = useState("Blue Dart Express");
  const [trackingReference, setTrackingReference] = useState("");
  const [shippingCharges, setShippingCharges] = useState(0);

  const selectedOrderObj = eligibleOrders.find((o) => o.id === selectedOrderId);

  const handleCreateShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/ads/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrderId,
          dispatchedQty: parseInt(dispatchedQty, 10),
          packagingDetails,
          deliveryMethod,
          courierPartner,
          trackingReference,
          shippingCharges,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create shipment");

      setShipments((prev) => [data.shipment, ...prev]);
      setShowCreateModal(false);
      alert(`Shipment ${data.shipment.shipmentNumber} created successfully!`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelivery = async () => {
    if (!selectedShipment) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/ads/dispatch", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shipmentId: selectedShipment.id,
          action: "CONFIRM_DELIVERY",
          proofOfDelivery: proofText,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Confirmation failed");

      setShipments((prev) =>
        prev.map((s) => (s.id === selectedShipment.id ? data.shipment : s))
      );
      setShowConfirmModal(false);
      alert("Delivery confirmed!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredShipments = shipments.filter((s) => {
    return (
      s.shipmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.order?.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.order?.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.trackingReference && s.trackingReference.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by shipment #, order, tracking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Dispatch New Shipment</span>
        </button>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Shipment # &amp; Date</th>
                <th className="py-3.5 px-4">Order Link &amp; Customer</th>
                <th className="py-3.5 px-4">Dispatched Qty</th>
                <th className="py-3.5 px-4">Carrier &amp; Tracking</th>
                <th className="py-3.5 px-4">Delivery Status</th>
                <th className="py-3.5 px-4">Proof of Delivery</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No shipments dispatched yet.
                  </td>
                </tr>
              ) : (
                filteredShipments.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-blue-700">{s.shipmentNumber}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(s.dispatchDate).toLocaleDateString("en-IN")}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{s.order?.orderNumber}</div>
                      <div className="text-[11px] text-slate-500">{s.order?.customerName}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-slate-900 text-sm">
                        {s.dispatchedQty} units
                      </span>
                      <div className="text-[10px] text-slate-400">{s.packagingDetails}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">
                        {s.courierPartner || s.deliveryMethod}
                      </div>
                      <div className="font-mono text-[10px] text-blue-700">
                        {s.trackingReference || "No tracking ID"}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          s.deliveryStatus === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {s.deliveryStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                      {s.proofOfDelivery || <span className="text-slate-400 italic">In transit</span>}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {s.deliveryStatus !== "DELIVERED" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedShipment(s);
                            setShowConfirmModal(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs"
                        >
                          Confirm Delivery
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold text-xs flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Delivered</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: CREATE SHIPMENT */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-6 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Dispatch Order Shipment</h3>
                <p className="text-slate-500">Record package handover to carrier.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShipment} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Order</label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                >
                  {eligibleOrders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.orderNumber} — {o.customerName} ({o.companyName || "Client"}) [Rem: {o.remainingQty} units]
                    </option>
                  ))}
                </select>
              </div>

              {selectedOrderObj && (
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <div className="font-bold text-blue-900">Order Remaining Balance</div>
                  <div className="text-slate-700">
                    Remaining to dispatch: <strong>{selectedOrderObj.remainingQty}</strong> of {selectedOrderObj.totalOrderedQty} units.
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    Delivery Address: {selectedOrderObj.deliveryAddress}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Units in This Shipment <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={selectedOrderObj?.remainingQty || 100000}
                    placeholder="e.g. 500"
                    value={dispatchedQty}
                    onChange={(e) => setDispatchedQty(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Method</label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option>Courier</option>
                    <option>Dedicated Logistics Vehicle</option>
                    <option>Customer Pickup / Hand Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Courier Partner</label>
                  <input
                    type="text"
                    placeholder="Blue Dart / DTDC / VRL"
                    value={courierPartner}
                    onChange={(e) => setCourierPartner(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tracking / AWB #</label>
                  <input
                    type="text"
                    placeholder="AWB-98741234"
                    value={trackingReference}
                    onChange={(e) => setTrackingReference(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Packaging Details</label>
                <input
                  type="text"
                  value={packagingDetails}
                  onChange={(e) => setPackagingDetails(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold"
                >
                  {submitting ? "Dispatching..." : "Confirm & Save Shipment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CONFIRM DELIVERY */}
      {showConfirmModal && selectedShipment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-slate-900">Record Proof of Delivery</h3>
            <p className="text-slate-500">
              Confirm recipient acceptance for shipment {selectedShipment.shipmentNumber}.
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Proof of Delivery Notes / Signee</label>
              <textarea
                rows={3}
                placeholder="e.g. Received in good condition by Security Office / signed by Siddharth Verma on 26-Oct."
                value={proofText}
                onChange={(e) => setProofText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelivery}
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
              >
                {submitting ? "Confirming..." : "Mark Delivered"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
