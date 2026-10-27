import React from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ImageIcon } from "lucide-react";

export const revalidate = 0;

async function getGallery() {
  try {
    return await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
  } catch (e) {
    return [];
  }
}

export default async function AdminGalleryPage() {
  const items = await getGallery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Life at Vaivas Gallery</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage workplace, event, and celebration photographs displayed across the public portal.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs space-y-3 p-4"
          >
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-100">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                {item.category}
              </span>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              {item.caption && <p className="text-xs text-slate-500">{item.caption}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
