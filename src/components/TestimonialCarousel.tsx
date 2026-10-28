"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface TestimonialItem {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  testimonialType?: string;
  content: string;
  rating?: number;
}

export default function TestimonialCarousel({ items }: { items: TestimonialItem[] }) {
  const defaultItems: TestimonialItem[] = [
    {
      id: "1",
      clientName: "Sanjay Singhania",
      designation: "Managing Director",
      company: "Everwell Wellness",
      testimonialType: "Client",
      content:
        "A professional and reliable team. Vaivas Ventures truly understands people's needs and delivers with care and commitment.",
      rating: 5,
    },
    {
      id: "2",
      clientName: "Meenakshi Sundaram",
      designation: "Head of Talent Acquisition",
      company: "Apex Global Logistics",
      testimonialType: "Employer",
      content:
        "The HR Recruitment team at Vaivas closed three critical leadership positions for us within 20 days. Their candidate screening and transparency are unmatched.",
      rating: 5,
    },
    {
      id: "3",
      clientName: "Vikram Malhotra",
      designation: "Product Lead",
      company: "TechSpire",
      testimonialType: "Candidate",
      content:
        "Vaivas Jobs connected me to a career-defining role. The recruitment team guided me through each interview stage with incredible support.",
      rating: 5,
    },
  ];

  const testimonials = items && items.length > 0 ? items : defaultItems;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative rounded-3xl theme-surface border border-white/15 p-8 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          <Quote className="w-6 h-6 rotate-180" />
        </div>

        {/* Carousel Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quote Content */}
      <blockquote className="min-h-[100px] text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
        &ldquo;{current.content}&rdquo;
      </blockquote>

      {/* Author and Rating */}
      <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-white">{current.clientName}</div>
          <div className="text-xs text-slate-400">
            {current.designation}, <span className="font-medium text-slate-300">{current.company}</span>
          </div>
        </div>

        {/* Rating Stars & Dots */}
        <div className="flex items-center gap-4">
          <div className="flex text-amber-400">
            {[...Array(current.rating || 5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <div className="flex items-center gap-1.5 pl-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" : "w-2 bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
