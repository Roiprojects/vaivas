"use client";

import React, { useState, useEffect } from "react";
import { Palette, Check, Sparkles } from "lucide-react";

export interface ThemeOption {
  id: string;
  name: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  bgPreview: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "sapphire",
    name: "Sapphire & Coral",
    tagline: "Silicon Valley Tech Luxury",
    primaryColor: "#1d4ed8",
    accentColor: "#ea580c",
    bgPreview: "from-blue-600 to-orange-500",
  },
  {
    id: "navy-gold",
    name: "Executive Navy & Gold",
    tagline: "Mayfair Corporate Prestige",
    primaryColor: "#0f172a",
    accentColor: "#d97706",
    bgPreview: "from-slate-900 to-amber-500",
  },
  {
    id: "emerald-indigo",
    name: "Emerald Mint & Indigo",
    tagline: "Future Ventures & Innovation",
    primaryColor: "#4338ca",
    accentColor: "#059669",
    bgPreview: "from-indigo-600 to-emerald-500",
  },
  {
    id: "amethyst-sunset",
    name: "Amethyst & Sunset",
    tagline: "Creative Agency Distinction",
    primaryColor: "#6d28d9",
    accentColor: "#f97316",
    bgPreview: "from-purple-600 to-orange-500",
  },
];

export default function LightThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<string>("sapphire");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vaivas-light-theme") || "sapphire";
    setActiveTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const handleSelectTheme = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("vaivas-light-theme", themeId);
  };

  const currentOption = THEME_OPTIONS.find((t) => t.id === activeTheme) || THEME_OPTIONS[0];

  return (
    <>
      {/* Floating Theme Selector Button (Desktop & Mobile) */}
      <div className="fixed top-20 right-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Change light theme color combination"
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_25px_-5px_rgba(0,0,0,0.12)] hover:shadow-lg transition-all active:scale-95 text-xs font-bold text-slate-800"
        >
          <div className="flex items-center -space-x-1">
            <span
              className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
              style={{ backgroundColor: currentOption.primaryColor }}
            />
            <span
              className="w-3.5 h-3.5 rounded-full border border-white shadow-2xs"
              style={{ backgroundColor: currentOption.accentColor }}
            />
          </div>
          <span className="hidden sm:inline font-semibold">{currentOption.name}</span>
          <span className="sm:hidden font-semibold">Theme</span>
          <Palette className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-45 transition-transform" />
        </button>

        {/* Dropdown Card */}
        {isOpen && (
          <div className="absolute right-0 top-12 w-72 sm:w-80 bg-white/98 backdrop-blur-2xl rounded-3xl border border-slate-200 shadow-2xl p-4 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Light Theme Colorways</span>
              </div>
              <span className="text-[10px] font-medium text-slate-400">Live Preview</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Tap any combination below to preview the entire website in that color scheme:
            </p>

            <div className="space-y-2">
              {THEME_OPTIONS.map((theme) => {
                const isSelected = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      handleSelectTheme(theme.id);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "bg-slate-50/90 border-slate-400 shadow-xs"
                        : "bg-white border-slate-200/80 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Dual Swatch */}
                      <div className="flex items-center -space-x-1.5 shrink-0">
                        <span
                          className="w-5 h-5 rounded-full border-2 border-white shadow-xs"
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                        <span
                          className="w-5 h-5 rounded-full border-2 border-white shadow-xs"
                          style={{ backgroundColor: theme.accentColor }}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-tight">
                          {theme.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal">
                          {theme.tagline}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>All 4 options are Light Themes</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-600 hover:text-slate-900 font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
