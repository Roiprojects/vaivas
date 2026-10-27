"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string | null;
}

export default function GalleryViewer({ items }: { items: GalleryItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = ["ALL", "Office Life", "Team Celebrations", "CSR", "Client Visits"];

  const filtered = items.filter(
    (item) => selectedCategory === "ALL" || item.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat === "ALL" ? "All Photos" : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative rounded-3xl overflow-hidden aspect-4/3 bg-slate-100 border border-slate-200/80 shadow-xs hover-card-elevate cursor-pointer"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                {item.category}
              </span>
              <h4 className="text-base font-bold leading-snug">{item.title}</h4>
              {item.caption && <p className="text-xs text-slate-300 mt-1">{item.caption}</p>}
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-800"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-16/10 w-full bg-black">
              <Image
                src={activeImage.imageUrl}
                alt={activeImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 bg-white space-y-1">
              <span className="text-xs font-bold text-orange-600 uppercase">
                {activeImage.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900">{activeImage.title}</h3>
              {activeImage.caption && (
                <p className="text-sm text-slate-600 mt-1">{activeImage.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
