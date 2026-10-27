import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdsNavbar } from "@/components/ads/AdsNavbar";
import { AdsFooter } from "@/components/ads/AdsFooter";
import { Sparkles, ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await prisma.adsProject.findUnique({ where: { slug } });
  if (!project) return { title: "Project Not Found | Vaivas Ads" };
  return {
    title: `${project.title} | Portfolio | Vaivas Ads`,
    description: project.summary,
  };
}

export default async function AdsProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await prisma.adsProject.findUnique({
    where: { slug },
  });

  if (!project || !project.isPublished) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AdsNavbar />

      <main className="flex-1 py-12 lg:py-16 space-y-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back link */}
          <Link
            href="/ads/portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Portfolio Gallery</span>
          </Link>

          {/* Project Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {project.category}
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-600 text-xs font-medium">
                Client: <strong>{project.clientName}</strong>
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-500 text-xs">{project.industry}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Main Hero Media */}
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Project Details & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Project Overview</h2>
              <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                <p>{project.description}</p>
              </div>

              {/* Gallery Images */}
              {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="space-y-4 pt-6">
                  <h3 className="text-lg font-bold text-slate-900">Additional Project Plates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100"
                      >
                        <Image
                          src={img}
                          alt={`${project.title} image ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Deliverables */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 h-fit">
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Key Deliverables
                </h3>
                <ul className="space-y-2">
                  {project.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-xs font-bold text-slate-900">
                  Interested in a similar project?
                </div>
                <p className="text-xs text-slate-500">
                  We formulate custom proposals and send physical material samples.
                </p>
                <Link
                  href="/ads/quote"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-all shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request a Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AdsFooter />
    </div>
  );
}
