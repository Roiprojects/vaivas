import React from "react";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import { AdminAdsServicesManager } from "@/components/admin/AdminAdsServicesManager";

export const revalidate = 0;

export const metadata = {
  title: "Services Management | Vaivas Ads Admin",
};

export default async function AdminAdsServicesPage() {
  const services = await prisma.adsService.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-8">
      <AdsAdminHeader />
      <AdminAdsServicesManager initialServices={services as any} />
    </div>
  );
}
