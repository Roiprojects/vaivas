import React from "react";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import { AdminAdsDispatchManager } from "@/components/admin/AdminAdsDispatchManager";

export const revalidate = 0;

export const metadata = {
  title: "Dispatch & Delivery Management | Vaivas Ads Admin",
};

export default async function AdminAdsDispatchPage() {
  const [shipments, eligibleOrders] = await Promise.all([
    prisma.adsShipment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        order: {
          select: {
            orderNumber: true,
            customerName: true,
            companyName: true,
            totalOrderedQty: true,
            remainingQty: true,
            deliveryAddress: true,
          },
        },
      },
    }),
    prisma.adsOrder.findMany({
      where: {
        status: {
          notIn: ["CLOSED", "CANCELLED"],
        },
        remainingQty: { gt: 0 },
      },
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        companyName: true,
        totalOrderedQty: true,
        remainingQty: true,
        deliveryAddress: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const serializedShipments = shipments.map((s) => ({
    ...s,
    dispatchDate: s.dispatchDate.toISOString(),
    deliveryConfirmedAt: s.deliveryConfirmedAt ? s.deliveryConfirmedAt.toISOString() : null,
    createdAt: s.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <AdsAdminHeader />
      <AdminAdsDispatchManager
        initialShipments={serializedShipments as any}
        eligibleOrders={eligibleOrders}
      />
    </div>
  );
}
