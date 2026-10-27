import React from "react";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import { AdminAdsBillingManager } from "@/components/admin/AdminAdsBillingManager";

export const revalidate = 0;

export const metadata = {
  title: "Billing & Settlement Records | Vaivas Ads Admin",
};

export default async function AdminAdsBillingPage() {
  const [billingRecords, orders] = await Promise.all([
    prisma.adsBillingRecord.findMany({
      orderBy: { paymentDate: "desc" },
      include: {
        order: {
          select: {
            orderNumber: true,
            customerName: true,
            companyName: true,
            totalAmount: true,
            balanceAmount: true,
            paymentStatus: true,
            status: true,
            remainingQty: true,
          },
        },
      },
    }),
    prisma.adsOrder.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        companyName: true,
        totalAmount: true,
        advancePaid: true,
        balanceAmount: true,
        paymentStatus: true,
        status: true,
        remainingQty: true,
      },
    }),
  ]);

  const serializedRecords = billingRecords.map((r) => ({
    ...r,
    paymentDate: r.paymentDate.toISOString(),
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <AdsAdminHeader />
      <AdminAdsBillingManager
        initialRecords={serializedRecords as any}
        orders={orders as any}
      />
    </div>
  );
}
