import React from "react";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import { AdminAdsOrdersManager } from "@/components/admin/AdminAdsOrdersManager";

export const revalidate = 0;

export const metadata = {
  title: "Orders & Production Management | Vaivas Ads Admin",
};

export default async function AdminAdsOrdersPage() {
  const orders = await prisma.adsOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      quotation: true,
      shipments: true,
      billingRecords: true,
    },
  });

  const serializedOrders = orders.map((o) => ({
    ...o,
    requestedDeliveryDate: o.requestedDeliveryDate
      ? o.requestedDeliveryDate.toISOString()
      : null,
    confirmedDeliveryDate: o.confirmedDeliveryDate
      ? o.confirmedDeliveryDate.toISOString()
      : null,
    artworkApprovedAt: o.artworkApprovedAt
      ? o.artworkApprovedAt.toISOString()
      : null,
    createdAt: o.createdAt.toISOString(),
    items: (o.items as any[]) || [],
    specifications: o.specifications || {},
    jobSheetDetails: o.jobSheetDetails || {},
    artworkProofs: (o.artworkProofs as any[]) || [],
    qualityCheckNotes: o.qualityCheckNotes || {},
    shipments: o.shipments || [],
    billingRecords: o.billingRecords || [],
  }));

  return (
    <div className="space-y-8">
      <AdsAdminHeader />
      <AdminAdsOrdersManager initialOrders={serializedOrders as any} />
    </div>
  );
}
