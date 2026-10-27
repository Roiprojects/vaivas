import React from "react";
import { prisma } from "@/lib/prisma";
import { AdsAdminHeader } from "@/components/admin/AdsAdminHeader";
import { AdminAdsSettingsEditor } from "@/components/admin/AdminAdsSettingsEditor";

export const revalidate = 0;

export const metadata = {
  title: "Website & Operating Settings | Vaivas Ads Admin",
};

export default async function AdminAdsSettingsPage() {
  const setting = await prisma.adsSetting.findUnique({
    where: { id: "global" },
  });

  const initialSetting = {
    companyName: setting?.companyName || "Vaivas Ads",
    tagline: setting?.tagline || "Big ideas. Real impact.",
    phone: setting?.phone || "+91 80 4123 4568",
    email: setting?.email || "ads@vaivasventures.com",
    whatsappNumber: setting?.whatsappNumber || "+91 98765 43211",
    address:
      setting?.address ||
      "Vaivas Towers, 3rd Floor, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560103",
    workingHours: setting?.workingHours || "Monday - Saturday: 9:30 AM - 6:30 PM IST",
    consultationPricing:
      setting?.consultationPricing || "Complimentary initial strategic consultation",
  };

  return (
    <div className="space-y-8">
      <AdsAdminHeader />
      <AdminAdsSettingsEditor initialSetting={initialSetting} />
    </div>
  );
}
