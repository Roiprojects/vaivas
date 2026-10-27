"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers, CheckCircle2, XCircle, Star, Edit3, ArrowRight, ExternalLink } from "lucide-react";

interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  summary: string;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
}

export function AdminAdsServicesManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);

  const togglePublished = async (s: Service) => {
    try {
      const res = await fetch("/api/admin/ads/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: s.id, isPublished: !s.isPublished }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setServices((prev) =>
        prev.map((item) => (item.id === s.id ? data.service : item))
      );
    } catch (e: any) {
      alert(e.message);
    }
  };

  const toggleFeatured = async (s: Service) => {
    try {
      const res = await fetch("/api/admin/ads/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: s.id, isFeatured: !s.isFeatured }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setServices((prev) =>
        prev.map((item) => (item.id === s.id ? data.service : item))
      );
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingService) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/ads/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingService.id,
          name: editingService.name,
          summary: editingService.summary,
          order: editingService.order,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setServices((prev) =>
        prev.map((item) => (item.id === editingService.id ? data.service : item))
      );
      setEditingService(null);
      alert("Service updated successfully!");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Active Service Offerings ({services.length})
            </h3>
            <p className="text-xs text-slate-500">
              Control publication status and featured placement on public pages.
            </p>
          </div>
          <Link
            href="/ads/services"
            target="_blank"
            className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>Preview Public Services</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Service Name &amp; Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Summary</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Published</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-mono font-bold text-slate-400">
                    #{s.order}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div>{s.name}</div>
                    <div className="font-mono text-[10px] text-blue-700">/ads/services/{s.slug}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[10px]">
                      {s.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    {s.summary}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(s)}
                      className={`p-1 rounded-lg ${
                        s.isFeatured ? "text-amber-500 bg-amber-50" : "text-slate-300"
                      }`}
                    >
                      <Star className={`w-4 h-4 ${s.isFeatured ? "fill-amber-400" : ""}`} />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => togglePublished(s)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.isPublished
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {s.isPublished ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setEditingService(s)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
                    >
                      Edit
                    </button>
                    <Link
                      href={`/ads/services/${s.slug}`}
                      target="_blank"
                      className="px-2.5 py-1 rounded-lg text-blue-700 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl text-xs">
            <h3 className="text-base font-bold text-slate-900">Edit Service Details</h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Service Name</label>
              <input
                type="text"
                value={editingService.name}
                onChange={(e) =>
                  setEditingService({ ...editingService, name: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Display Order</label>
              <input
                type="number"
                value={editingService.order}
                onChange={(e) =>
                  setEditingService({
                    ...editingService,
                    order: parseInt(e.target.value, 10) || 0,
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Summary Description</label>
              <textarea
                rows={3}
                value={editingService.summary}
                onChange={(e) =>
                  setEditingService({ ...editingService, summary: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              ></textarea>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
