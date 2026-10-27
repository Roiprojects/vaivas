"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Save, Globe, Eye, CheckCircle2, Loader2, Sparkles, ExternalLink } from "lucide-react";

export default function AdminHomeCmsEditor({ initialContent }: { initialContent: any }) {
  const [data, setData] = useState<any>(initialContent?.draftData || initialContent?.publishedData || {});
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const hero = data.hero || {};
  const stats = hero.stats || [
    { label: "People Empowered", value: "10,000+" },
    { label: "Brands Elevated", value: "250+" },
    { label: "Opportunities Created", value: "1,500+" },
  ];

  const handleSaveDraft = async () => {
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId: "home", draftData: data, action: "DRAFT" }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error);
      setFeedback({ type: "success", message: "Draft saved successfully. Not yet public." });
    } catch (e: any) {
      setFeedback({ type: "error", message: e.message || "Failed to save draft." });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId: "home", draftData: data, action: "PUBLISH" }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error);
      setFeedback({ type: "success", message: "Homepage published live to public visitors!" });
    } catch (e: any) {
      setFeedback({ type: "error", message: e.message || "Failed to publish." });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Content Management System
          </span>
          <div className="text-sm font-semibold text-slate-800 mt-0.5">
            Draft → Preview → Publish Workflow
          </div>
          {initialContent?.lastPublishedAt && (
            <div className="text-[11px] text-slate-400 mt-1">
              Last published:{" "}
              {new Date(initialContent.lastPublishedAt).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Live Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <button
            onClick={handleSaveDraft}
            disabled={saving || publishing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Draft</span>
          </button>

          <button
            onClick={handlePublish}
            disabled={saving || publishing}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
          >
            {publishing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Globe className="w-3.5 h-3.5" />
            )}
            <span>Publish to Live Site</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-medium flex items-center gap-2 ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Editor Form Cards */}
      <div className="space-y-6">
        {/* Hero Section Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Hero Banner Content</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Upper Eyebrow Badge
              </label>
              <input
                type="text"
                value={hero.badge || ""}
                onChange={(e) =>
                  setData({ ...data, hero: { ...hero, badge: e.target.value } })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={hero.heading || "Connecting talent. Building brands."}
                onChange={(e) =>
                  setData({ ...data, hero: { ...hero, heading: e.target.value } })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Supporting Subtitle
              </label>
              <textarea
                rows={2}
                value={hero.description || ""}
                onChange={(e) =>
                  setData({ ...data, hero: { ...hero, description: e.target.value } })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={hero.primaryCtaText || "Explore Our Businesses"}
                  onChange={(e) =>
                    setData({ ...data, hero: { ...hero, primaryCtaText: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  value={hero.secondaryCtaText || "Get in Touch"}
                  onChange={(e) =>
                    setData({ ...data, hero: { ...hero, secondaryCtaText: e.target.value } })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Impact KPIs */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Impact Statistics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[idx].label = e.target.value;
                      setData({ ...data, hero: { ...hero, stats: updated } });
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">
                    Counter Value
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[idx].value = e.target.value;
                      setData({ ...data, hero: { ...hero, stats: updated } });
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-blue-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
