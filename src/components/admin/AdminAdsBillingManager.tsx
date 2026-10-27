"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  X,
  Lock,
} from "lucide-react";

interface BillingRecord {
  id: string;
  orderId: string;
  invoiceNumber: string;
  amount: number;
  type: string;
  paymentDate: string;
  paymentMethod: string;
  transactionReference: string | null;
  receiptNotes: string | null;
  createdAt: string;
  order: {
    orderNumber: string;
    customerName: string;
    companyName: string | null;
    totalAmount: number;
    balanceAmount: number;
    paymentStatus: string;
    status: string;
    remainingQty: number;
  };
}

interface OrderSummary {
  id: string;
  orderNumber: string;
  customerName: string;
  companyName: string | null;
  totalAmount: number;
  advancePaid: number;
  balanceAmount: number;
  paymentStatus: string;
  status: string;
  remainingQty?: number;
}

export function AdminAdsBillingManager({
  initialRecords,
  orders,
}: {
  initialRecords: BillingRecord[];
  orders: OrderSummary[];
}) {
  const [records, setRecords] = useState<BillingRecord[]>(initialRecords);
  const [ordersList, setOrdersList] = useState<OrderSummary[]>(orders);
  const [showPayModal, setShowPayModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Pay form
  const [selectedOrderId, setSelectedOrderId] = useState(orders.length > 0 ? orders[0].id : "");
  const [amount, setAmount] = useState("");
  const [payType, setPayType] = useState("MILESTONE");
  const [payMethod, setPayMethod] = useState("Bank Transfer / NEFT / RTGS");
  const [transactionRef, setTransactionRef] = useState("");
  const [notes, setNotes] = useState("");
  const [closeOrder, setCloseOrder] = useState(false);

  const selectedOrder = ordersList.find((o) => o.id === selectedOrderId);

  // Financial aggregates
  const totalBilled = ordersList.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalCollected = ordersList.reduce((acc, o) => acc + o.advancePaid, 0);
  const totalBalance = ordersList.reduce((acc, o) => acc + o.balanceAmount, 0);
  const settledCount = ordersList.filter((o) => o.paymentStatus === "FULLY_PAID").length;

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/ads/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: selectedOrderId,
          amount: parseFloat(amount),
          type: payType,
          paymentMethod: payMethod,
          transactionReference: transactionRef,
          receiptNotes: notes,
          closeOrder,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment recording failed");

      setRecords((prev) => [data.record, ...prev]);
      setOrdersList((prev) =>
        prev.map((o) => (o.id === selectedOrderId ? data.order : o))
      );
      setShowPayModal(false);
      alert(`Payment ${data.record.invoiceNumber} recorded successfully!`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRecords = records.filter((r) => {
    return (
      r.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.order?.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.order?.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.transactionReference && r.transactionReference.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Billed
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ₹{totalBilled.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">All active &amp; completed contracts</div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Payments Collected
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
            ₹{totalCollected.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">Realized in bank records</div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Outstanding Settlement
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-600">
            ₹{totalBalance.toLocaleString("en-IN")}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">Awaiting delivery / milestone</div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Fully Settled Orders
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">{settledCount}</div>
          <div className="text-[11px] text-slate-500 font-medium">Zero remaining balance</div>
        </div>
      </div>

      {/* Top Action Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by invoice #, order, reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowPayModal(true)}
          className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Record Customer Payment</span>
        </button>
      </div>

      {/* Payment Receipts Ledger */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Customer Payments Ledger</span>
          </h3>
          <span className="text-xs text-slate-400">{records.length} total receipts logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Invoice # &amp; Date</th>
                <th className="py-3 px-4">Order Link &amp; Customer</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Transaction Ref</th>
                <th className="py-3 px-4 text-right">Amount Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No payment receipts logged yet.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono">
                      <div className="font-bold text-blue-700">{r.invoiceNumber}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(r.paymentDate).toLocaleDateString("en-IN")}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{r.order?.orderNumber}</div>
                      <div className="text-[11px] text-slate-500">{r.order?.customerName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-[10px] text-slate-700">
                        {r.type.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{r.paymentMethod}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                      {r.transactionReference || "—"}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-sm text-emerald-700">
                      ₹{r.amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orders Outstanding Balances Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <span>Live Order Settlement Balances</span>
          </h3>
          <span className="text-xs text-slate-400">{ordersList.length} total orders</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Order Value</th>
                <th className="py-3 px-4">Collected</th>
                <th className="py-3 px-4">Balance Remaining</th>
                <th className="py-3 px-4">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ordersList.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {o.customerName} {o.companyName && `(${o.companyName})`}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    ₹{o.totalAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">
                    ₹{o.advancePaid.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4 font-extrabold text-orange-600">
                    ₹{o.balanceAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        o.paymentStatus === "FULLY_PAID"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {o.paymentStatus.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: RECORD PAYMENT */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Record Customer Payment</h3>
                <p className="text-slate-500">Credit advance, milestone, or final settlement.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Order</label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                >
                  {ordersList.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.orderNumber} — {o.customerName} [Bal: ₹{o.balanceAmount.toLocaleString("en-IN")}]
                    </option>
                  ))}
                </select>
              </div>

              {selectedOrder && (
                <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-200 text-slate-700 space-y-1">
                  <div>
                    Order Total: <strong>₹{selectedOrder.totalAmount.toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    Current Outstanding Balance: <strong className="text-orange-700">₹{selectedOrder.balanceAmount.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Amount Received (₹) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 50000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-extrabold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Stage</label>
                  <select
                    value={payType}
                    onChange={(e) => setPayType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option value="ADVANCE">ADVANCE (Order Release)</option>
                    <option value="MILESTONE">MILESTONE (In-Production)</option>
                    <option value="FINAL_SETTLEMENT">FINAL SETTLEMENT (Pre-Dispatch / Complete)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  >
                    <option>Bank Transfer / NEFT / RTGS</option>
                    <option>UPI / QR Instant</option>
                    <option>Cheque / Demand Draft</option>
                    <option>Cash / Receipt</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Transaction Ref / UTR #</label>
                  <input
                    type="text"
                    placeholder="UTR-98412347"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Receipt Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Received via HDFC corporate account"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              {/* Close Order Checkbox */}
              <div className="pt-2 border-t border-slate-100 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="closeOrderCheck"
                  checked={closeOrder}
                  onChange={(e) => setCloseOrder(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="closeOrderCheck" className="text-slate-600 leading-tight">
                  Close Order upon this payment (permitted only if delivery has fully taken place and balance reaches ₹0).
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  {submitting ? "Processing..." : "Record Payment Receipt"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
