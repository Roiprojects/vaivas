import React from "react";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import { AdminAdsQuotationsManager } from "@/components/admin/AdminAdsQuotationsManager";

export const revalidate = 0;

export const metadata = {
  title: "Quotations & Commercial Terms | Vaivas Ads Admin",
};

export default async function AdminAdsQuotationsPage() {
  const quotations = await prisma.adsQuotation.findMany({
    orderBy: { createdAt: "desc" },
    include: { order: true, lead: true },
  });

  const serializedQuotes = quotations.map((q) => ({
    ...q,
    issueDate: q.issueDate.toISOString(),
    validityDate: q.validityDate.toISOString(),
    createdAt: q.createdAt.toISOString(),
    items: (q.items as any[]) || [],
    commercialTerms: q.commercialTerms || {},
    specificationsSnapshot: q.specificationsSnapshot || {},
  }));

  return (
    <div className="space-y-8">
      <AdsAdminHeader />
      <AdminAdsQuotationsManager initialQuotations={serializedQuotes as any} />
    </div>
  );
}
