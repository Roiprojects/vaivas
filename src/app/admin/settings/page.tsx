import React from "react";
import { prisma } from "@/lib/prisma";
import { Settings, Globe, Mail, Phone, MapPin } from "lucide-react";

export const revalidate = 0;

async function getSettings() {
  try {
    return await prisma.websiteSetting.findUnique({ where: { id: "global" } });
  } catch (e) {
    return null;
  }
}

export default async function AdminSettingsPage() {
  const setting = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Website Global Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure corporate contact coordinates, metadata, and external sub-division portal URLs.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Platform Title</label>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900">
              {setting?.siteTitle || "Vaivas Ventures"}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Corporate Tagline</label>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 italic">
              {setting?.tagline || "Your success, our mission"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Official Inquiries Email</label>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800">
              {setting?.companyEmail || "info@vaivasventures.com"}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Official Telephone</label>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800">
              {setting?.companyPhone || "+91 80 4123 4567"}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Headquarters Address</label>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800">
            {setting?.address}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">Configured Vaivas Ads Portal Link</label>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono text-orange-600">
            {setting?.externalAdsUrl || "https://vaivasads.com"}
          </div>
          <p className="text-[11px] text-slate-400">
            Configurable external URL linking the Vaivas Ads business section to the separate agency website.
          </p>
        </div>
      </div>
    </div>
  );
}
