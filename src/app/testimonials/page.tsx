import React from "react";
import PublicLayout from "@/components/PublicLayout";
import { prisma } from "@/lib/prisma";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Testimonials & Reviews | Vaivas Ventures",
  description: "Read genuine feedback from our enterprise clients, job candidates, and partners.",
};

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.error("Failed to load testimonials:", err);
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <PublicLayout>
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-14 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3">
            Client & Partner Trust
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            What People Say
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Stories of partnership, career breakthroughs, and brand growth across India.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover-card-elevate flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                      {t.testimonialType || "Client"}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-900">{t.clientName}</div>
                  <div className="text-xs text-slate-500">
                    {t.designation}, <span className="font-semibold text-slate-700">{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
