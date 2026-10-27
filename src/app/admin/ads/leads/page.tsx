import React from "react";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import { AdminAdsLeadsManager } from "@/components/admin/AdminAdsLeadsManager";

export const revalidate = 0;

export const metadata = {
  title: "Leads & Enquiries Management | Vaivas Ads Admin",
};

export default async function AdminAdsLeadsPage() {
  const leads = await prisma.adsLead.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serializedLeads = leads.map((l) => ({
    ...l,
    createdAt: l.createdAt.toISOString(),
    nextFollowUpDate: l.nextFollowUpDate ? l.nextFollowUpDate.toISOString() : null,
  }));

  return (
    <div className="space-y-8">
      <AdsAdminHeader />
      <AdminAdsLeadsManager initialLeads={serializedLeads as any} />
    </div>
  );
}
