import React from "react";
import PublicLayout from "@/components/PublicLayout";
import { Mail, Phone, MapPin, Clock, MessageSquare, Building2 } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us | Vaivas Ventures",
  description: "Get in touch with Vaivas Ventures across careers, advertising, and HR recruitment.",
};

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="bg-gradient-to-b from-blue-50/50 via-white to-white py-14 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-3">
            Contact Vaivas Ventures
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Let&apos;s Start a Conversation
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether you have an enquiry regarding career opportunities, advertising services, or
            enterprise recruitment, our dedicated teams are ready to help.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-pale-blue p-8 rounded-3xl border border-slate-200/80 space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Corporate Headquarters</h3>

                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">Bengaluru Office</div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        Vaivas Towers, 4th Floor, Outer Ring Road, Marathahalli, Bengaluru, Karnataka
                        560103
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Phone Support</div>
                      <a href="tel:+918041234567" className="text-xs text-blue-600 hover:underline">
                        +91 80 4123 4567 / +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Email Inquiries</div>
                      <a
                        href="mailto:info@vaivasventures.com"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        info@vaivasventures.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-purple-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">Business Hours</div>
                      <span className="text-xs text-slate-500">
                        Monday – Friday: 9:30 AM – 6:30 PM IST
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dedicated Business Routing Note */}
              <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-100/80 space-y-2">
                <h4 className="text-sm font-bold text-slate-900">Direct Department Inquiries</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Looking specifically for campaign planning? Visit our{" "}
                  <a href="/ads" className="font-bold text-orange-600 hover:underline">
                    Vaivas Ads
                  </a>{" "}
                  section. Hiring for your organization? Explore{" "}
                  <a href="/hr-recruitment" className="font-bold text-emerald-600 hover:underline">
                    HR Recruitment
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
