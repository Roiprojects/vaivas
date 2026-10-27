import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import {
  Inbox,
  FileSpreadsheet,
  PackageCheck,
  Truck,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  Printer,
  ChevronRight,
} from "lucide-react";

export const revalidate = 0;

async function getDashboardData() {
  try {
    const [
      leadsCount,
      newLeadsCount,
      quotationsCount,
      acceptedQuotationsCount,
      ordersCount,
      inProductionOrdersCount,
      shipmentsCount,
      recentLeads,
      recentOrders,
      ordersBilling,
    ] = await Promise.all([
      prisma.adsLead.count(),
      prisma.adsLead.count({ where: { status: "NEW" } }),
      prisma.adsQuotation.count(),
      prisma.adsQuotation.count({ where: { status: "ACCEPTED" } }),
      prisma.adsOrder.count(),
      prisma.adsOrder.count({
        where: {
          status: {
            in: ["READY_FOR_PRODUCTION", "IN_PRODUCTION", "QUALITY_CHECK"],
          },
        },
      }),
      prisma.adsShipment.count(),
      prisma.adsLead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.adsOrder.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.adsOrder.findMany({
        select: { totalAmount: true, advancePaid: true, balanceAmount: true },
      }),
    ]);

    const totalBilled = ordersBilling.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const totalCollected = ordersBilling.reduce((acc, curr) => acc + curr.advancePaid, 0);
    const totalOutstanding = ordersBilling.reduce((acc, curr) => acc + curr.balanceAmount, 0);

    return {
      leadsCount,
      newLeadsCount,
      quotationsCount,
      acceptedQuotationsCount,
      ordersCount,
      inProductionOrdersCount,
      shipmentsCount,
      recentLeads,
      recentOrders,
      totalBilled,
      totalCollected,
      totalOutstanding,
    };
  } catch (error) {
    console.error("Error loading Ads dashboard data:", error);
    return {
      leadsCount: 0,
      newLeadsCount: 0,
      quotationsCount: 0,
      acceptedQuotationsCount: 0,
      ordersCount: 0,
      inProductionOrdersCount: 0,
      shipmentsCount: 0,
      recentLeads: [],
      recentOrders: [],
      totalBilled: 0,
      totalCollected: 0,
      totalOutstanding: 0,
    };
  }
}

export default async function AdsDashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <AdsAdminHeader />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Leads */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Inbound Leads
            </span>
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">{data.leadsCount}</div>
            <div className="text-xs text-orange-600 font-semibold mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span>{data.newLeadsCount} awaiting first response</span>
            </div>
          </div>
          <Link
            href="/admin/ads/leads"
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 pt-2 border-t border-slate-100"
          >
            <span>Manage All Enquiries</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quotations */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Quotations Active
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">{data.quotationsCount}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">
              {data.acceptedQuotationsCount} accepted &amp; order-ready
            </div>
          </div>
          <Link
            href="/admin/ads/quotations"
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 pt-2 border-t border-slate-100"
          >
            <span>View Quotations &amp; Terms</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Production Jobs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Print / Production Jobs
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <PackageCheck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">{data.ordersCount}</div>
            <div className="text-xs text-purple-700 font-semibold mt-1">
              {data.inProductionOrdersCount} on press or in QC
            </div>
          </div>
          <Link
            href="/admin/ads/orders"
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 pt-2 border-t border-slate-100"
          >
            <span>Production Floor Status</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Outstanding Billing */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Order Volume
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">
              ₹{data.totalBilled.toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              ₹{data.totalOutstanding.toLocaleString("en-IN")} pending settlement
            </div>
          </div>
          <Link
            href="/admin/ads/billing"
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 pt-2 border-t border-slate-100"
          >
            <span>Billing &amp; Invoices</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick Operational Actions Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg font-bold">Fast Operational Actions</h3>
          <p className="text-xs text-slate-300">
            Rapidly create an itemized quote, review incoming calendar requests, or release an approved job to production.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/ads/quotations?action=new"
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Create New Quotation</span>
          </Link>
          <Link
            href="/admin/ads/leads?filter=NEW"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-1.5"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Triage New Leads</span>
          </Link>
        </div>
      </div>

      {/* Operational Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inbound Leads */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Inbox className="w-4 h-4 text-orange-600" />
                <span>Recent Inbound Leads</span>
              </h3>
              <p className="text-xs text-slate-500">
                Latest customer submissions with print &amp; calendar specs.
              </p>
            </div>
            <Link
              href="/admin/ads/leads"
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              View All ({data.leadsCount})
            </Link>
          </div>

          {data.recentLeads.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No inbound leads recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {data.recentLeads.map((lead) => (
                <div key={lead.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-blue-700">
                        {lead.refNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {lead.serviceType}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {lead.fullName} {lead.companyName && `(${lead.companyName})`}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {lead.email} • {lead.phone}
                    </div>
                  </div>

                  <div className="text-right space-y-1.5 shrink-0">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        lead.status === "NEW"
                          ? "bg-orange-100 text-orange-800"
                          : lead.status === "QUALIFIED"
                          ? "bg-blue-100 text-blue-800"
                          : lead.status === "PROPOSAL_SENT"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {lead.status}
                    </span>
                    <div className="text-[10px] text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Production Orders */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-blue-700" />
                <span>Production Orders</span>
              </h3>
              <p className="text-xs text-slate-500">Orders in manufacturing &amp; QC.</p>
            </div>
            <Link
              href="/admin/ads/orders"
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              View Orders ({data.ordersCount})
            </Link>
          </div>

          {data.recentOrders.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No orders converted yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {data.recentOrders.map((ord) => (
                <div key={ord.id} className="py-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-900">{ord.orderNumber}</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                      {ord.status.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-700">
                    {ord.customerName} {ord.companyName && `• ${ord.companyName}`}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Ordered: {ord.totalOrderedQty} units</span>
                    <span className="font-bold text-slate-800">
                      ₹{ord.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
