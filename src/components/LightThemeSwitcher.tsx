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
    id: "cyber-obsidian",
    name: "Cyber Obsidian",
    tagline: "Electric Azure & Deep Void",
    primaryColor: "#38bdf8",
    accentColor: "#f43f5e",
    bgPreview: "from-sky-500 to-rose-500",
  },
  {
    id: "hyperion-gold",
    name: "Hyperion Gold",
    tagline: "Solar Amber & Titanium Black",
    primaryColor: "#fbbf24",
    accentColor: "#f97316",
    bgPreview: "from-amber-400 to-orange-500",
  },
  {
    id: "nebula-purple",
    name: "Nebula Violet",
    tagline: "Ultraviolet Space & Neon Pulse",
    primaryColor: "#c084fc",
    accentColor: "#f43f5e",
    bgPreview: "from-purple-500 to-pink-500",
  },
  {
    id: "aurora-matrix",
    name: "Aurora Matrix",
    tagline: "Bioluminescent Mint & Cyan",
    primaryColor: "#34d399",
    accentColor: "#38bdf8",
    bgPreview: "from-emerald-400 to-cyan-500",
  },
];

export default function LightThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<string>("cyber-obsidian");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vaivas-cyber-theme") || "cyber-obsidian";
    setActiveTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const handleSelectTheme = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("vaivas-cyber-theme", themeId);
  };

  const currentOption = THEME_OPTIONS.find((t) => t.id === activeTheme) || THEME_OPTIONS[0];

  return (
    <>
      {/* Floating Theme Selector Button */}
      <div className="fixed top-20 right-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Change 3D Cyber Theme"
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-white/30 transition-all active:scale-95 text-xs font-bold text-slate-100"
        >
          <div className="flex items-center -space-x-1">
            <span
              className="w-3.5 h-3.5 rounded-full border border-slate-900 shadow-sm"
              style={{ backgroundColor: currentOption.primaryColor }}
            />
            <span
              className="w-3.5 h-3.5 rounded-full border border-slate-900 shadow-sm"
              style={{ backgroundColor: currentOption.accentColor }}
            />
          </div>
          <span className="hidden sm:inline font-semibold">{currentOption.name}</span>
          <span className="sm:hidden font-semibold">Theme</span>
          <Palette className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-45 transition-transform" />
        </button>

        {/* Dropdown Modal */}
        {isOpen && (
          <div className="absolute right-0 top-12 w-72 sm:w-80 bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-100 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>3D Cyber Themes</span>
              </div>
              <span className="text-[10px] font-medium text-slate-400">Live 3D WebGL</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Select an ambient lighting palette to re-color the 3D scene and interfaces in real time:
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
                        ? "bg-white/10 border-cyan-400/60 shadow-[0_0_15px_-2px_rgba(56,189,248,0.3)]"
                        : "bg-slate-900/60 border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center -space-x-1.5 shrink-0">
                        <span
                          className="w-5 h-5 rounded-full border-2 border-slate-900 shadow-sm"
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                        <span
                          className="w-5 h-5 rounded-full border-2 border-slate-900 shadow-sm"
                          style={{ backgroundColor: theme.accentColor }}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-100 leading-tight">
                          {theme.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-normal">
                          {theme.tagline}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Dynamic 3D Shaders Active</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white font-bold"
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
