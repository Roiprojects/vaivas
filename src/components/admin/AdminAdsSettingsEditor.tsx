"use client";

import React, { useState } from "react";
import { Settings, Save, CheckCircle2 } from "lucide-react";

interface SettingProps {
  initialSetting: {
    companyName: string;
    tagline: string;
    phone: string;
    email: string;
    whatsappNumber: string;
    address: string;
    workingHours: string;
    consultationPricing: string;
  };
}

export function AdminAdsSettingsEditor({ initialSetting }: SettingProps) {
  const [formData, setFormData] = useState(initialSetting);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/admin/ads/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save settings");
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Company Coordinates &amp; Operating Settings
          </h3>
          <p className="text-xs text-slate-500">
            These parameters appear on the live Ads website, footer, and generated quotation headers.
          </p>
        </div>
        {savedSuccess && (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Settings Saved</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">WhatsApp Direct Number</label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Operating Hours</label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Registered Studio Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-300"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Consultation Policy</label>
          <input
            type="text"
            value={formData.consultationPricing}
            onChange={(e) => setFormData({ ...formData, consultationPricing: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-300"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
