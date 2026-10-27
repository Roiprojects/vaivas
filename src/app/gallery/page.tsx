import React from "react";
import PublicLayout from "@/components/PublicLayout";
import { prisma } from "@/lib/prisma";
import GalleryViewer from "@/components/GalleryViewer";

export const metadata = {
  title: "Life at Vaivas | Photo & Culture Gallery",
  description: "A look into our people, workspaces, events, and collaborative culture at Vaivas Ventures.",
};

async function getGalleryItems() {
  try {
    return await prisma.galleryItem.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.error("Failed to load gallery:", err);
    return [];
  }
}

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <PublicLayout>
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-14 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3">
            Life at Vaivas
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Culture in Frames
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Moments that capture the energy, camaraderie, and dedication of our teams across all
            three businesses.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryViewer items={items} />
        </div>
      </section>
    </PublicLayout>
  );
}
