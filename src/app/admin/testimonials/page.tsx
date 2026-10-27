import React from "react";
import { prisma } from "@/lib/prisma";
import { Star, MessageSquareQuote } from "lucide-react";

export const revalidate = 0;

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  } catch (e) {
    return [];
  }
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Client & Feedback Testimonials</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Approve, feature, and organize customer reviews appearing on the homepage and review page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                  {t.testimonialType}
                </span>
                <div className="flex text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                &ldquo;{t.content}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-900">{t.clientName}</div>
              <div className="text-[11px] text-slate-500">
                {t.designation}, {t.company}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
