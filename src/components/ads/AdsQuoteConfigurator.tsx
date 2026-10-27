"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Calendar,
  Printer,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Upload,
  Info,
} from "lucide-react";

export function AdsQuoteConfigurator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "calendar";

  const [activeTab, setActiveTab] = useState<"calendar" | "print" | "digital">(
    initialTab === "print" ? "print" : initialTab === "digital" ? "digital" : "calendar"
  );

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Common Contact Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [timeline, setTimeline] = useState("Standard (10-14 days)");
  const [budgetRange, setBudgetRange] = useState("₹50,000 - ₹1,50,000");
  const [description, setDescription] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(true);

  // Calendar Specs
  const [calendarType, setCalendarType] = useState("Executive Desk Calendar (Tent Stand)");
  const [calendarYear, setCalendarYear] = useState("2026");
  const [calendarLanguage, setCalendarLanguage] = useState("English + Indian Banking & Regional Holidays");
  const [calendarDimensions, setCalendarDimensions] = useState("8.5 x 6.0 inches (Horizontal Landscape)");
  const [leavesCount, setLeavesCount] = useState("12 Leaves + 1 Cover (26 Pages Double-sided)");
  const [monthLayout, setMonthLayout] = useState("Single Month Per Leaf with Thematic Image");
  const [paperGsm, setPaperGsm] = useState("250 GSM Premium Art Card with Matte Coating");
  const [binding, setBinding] = useState("Double Wire-O Spiral (Black/White Metal)");
  const [standMaterial, setStandMaterial] = useState("2mm Rigid Greyboard Stand with Velvet-Touch Outer");
  const [calendarFinish, setCalendarFinish] = useState("Gold Foil Stamping on Stand Base + Spot UV on Cover");
  const [calendarQuantity, setCalendarQuantity] = useState("500");
  const [calendarPackaging, setCalendarPackaging] = useState("Individual Shrink Wrap + Custom Printed Envelopes");
  const [specialDatesNotes, setSpecialDatesNotes] = useState("");

  // Print Specs
  const [productType, setProductType] = useState("Brochures / Catalogues");
  const [printQuantity, setPrintQuantity] = useState("1000");
  const [finishedDimensions, setFinishedDimensions] = useState("A4 (210 x 297 mm)");
  const [orientation, setOrientation] = useState("Portrait");
  const [paperSubstrate, setPaperSubstrate] = useState("170 GSM Premium Gloss Art Paper");
  const [printPageCount, setPrintPageCount] = useState("4 Pages (Bi-fold)");
  const [printingSides, setPrintingSides] = useState("Double Sided Full Colour (4+4 CMYK)");
  const [foldingBinding, setFoldingBinding] = useState("Center Creased / Half-fold");
  const [printFinish, setPrintFinish] = useState("Matte Lamination + Spot UV on Logo");
  const [designAssistance, setDesignAssistance] = useState("We have print-ready artwork (300 DPI CMYK)");
  const [deliveryPincode, setDeliveryPincode] = useState("");

  // Digital Specs
  const [digitalService, setDigitalService] = useState("Paid Advertising (Google & Meta)");
  const [campaignObjectives, setCampaignObjectives] = useState("Lead Generation & Immediate Consultations");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "print" || tab === "digital" || tab === "calendar") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !phone) {
      setErrorMsg("Please fill in your name, email, and phone number.");
      return;
    }

    if (!privacyConsent) {
      setErrorMsg("Please acknowledge the privacy notice to proceed.");
      return;
    }

    setLoading(true);

    try {
      let serviceType = "";
      let source = "";
      let printSpecs: any = null;
      let calendarSpecs: any = null;

      if (activeTab === "calendar") {
        serviceType = "Calendar Design and Printing";
        source = "Calendar Configurator";
        calendarSpecs = {
          calendarType,
          year: calendarYear,
          language: calendarLanguage,
          dimensions: calendarDimensions,
          leavesCount,
          monthLayout,
          paperGsm,
          binding,
          standMaterial,
          finish: calendarFinish,
          quantity: parseInt(calendarQuantity, 10) || 500,
          packaging: calendarPackaging,
          specialDatesNotes,
        };
      } else if (activeTab === "print") {
        serviceType = "Print Media";
        source = "Print Configurator";
        printSpecs = {
          productType,
          quantity: parseInt(printQuantity, 10) || 1000,
          finishedDimensions,
          orientation,
          paperSubstrate,
          pageCount: printPageCount,
          printingSides,
          foldingBinding,
          finish: printFinish,
          designAssistance,
          deliveryPincode,
        };
      } else {
        serviceType = digitalService;
        source = "Digital Quote Form";
      }

      const res = await fetch("/api/ads/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          companyName,
          serviceType,
          budgetRange,
          timeline,
          description:
            description ||
            (activeTab === "calendar"
              ? `Requirement for ${calendarQuantity} units of ${calendarType}. Special dates: ${specialDatesNotes || "Standard"}`
              : activeTab === "print"
              ? `Requirement for ${printQuantity} units of ${productType} (${finishedDimensions}, ${paperSubstrate}).`
              : `Campaign requirement for ${digitalService}. Objective: ${campaignObjectives}.`),
          source,
          printSpecs,
          calendarSpecs,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request.");
      }

      // Redirect to confirmation page with reference
      router.push(`/ads/confirmation?ref=${encodeURIComponent(data.refNumber)}`);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      {/* Tab Selectors */}
      <div className="grid grid-cols-3 bg-slate-100/80 p-2 border-b border-slate-200 text-xs sm:text-sm font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("calendar")}
          className={`py-3 px-2 sm:px-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${
            activeTab === "calendar"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="truncate">2026 Calendars</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("print")}
          className={`py-3 px-2 sm:px-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${
            activeTab === "print"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Printer className="w-4 h-4" />
          <span className="truncate">Print Media</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("digital")}
          className={`py-3 px-2 sm:px-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${
            activeTab === "digital"
              ? "bg-white text-purple-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="truncate">Digital &amp; Creative</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {errorMsg}
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* CONDITIONAL SPECIFICATIONS SECTION                                  */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === "calendar" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span>2026 Corporate Calendar Specifications</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Select dimensions, materials, and binding. We provide full digital proof approval prior to production.
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold">
                Batch 2026 Priority
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Calendar Style</label>
                <select
                  value={calendarType}
                  onChange={(e) => setCalendarType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-800"
                >
                  <option>Executive Desk Calendar (Tent Stand)</option>
                  <option>Premium Multi-Sheet Wall Calendar (Wire-O Hanger)</option>
                  <option>Poster Wall Calendar (Single Sheet Tin-Mounted)</option>
                  <option>Custom Corporate Executive Hardbound Planner</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Dimensions &amp; Orientation</label>
                <select
                  value={calendarDimensions}
                  onChange={(e) => setCalendarDimensions(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-800"
                >
                  <option>8.5 x 6.0 inches (Horizontal Landscape)</option>
                  <option>9.0 x 6.5 inches (Executive Wide Desk)</option>
                  <option>6.0 x 8.5 inches (Vertical Portrait Desk)</option>
                  <option>12.0 x 18.0 inches (Large Wall Calendar)</option>
                  <option>17.0 x 22.0 inches (Grand Wall Poster)</option>
                  <option>Custom Dimensions (Specify in notes)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Leaves / Sheets Count</label>
                <select
                  value={leavesCount}
                  onChange={(e) => setLeavesCount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-800"
                >
                  <option>12 Leaves + 1 Cover (26 Pages Double-sided)</option>
                  <option>6 Leaves + 1 Cover (14 Pages - 2 Months per leaf)</option>
                  <option>13 Leaves Single-Sided</option>
                  <option>Single Large Sheet (Poster)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Paper Weight &amp; Finish</label>
                <select
                  value={paperGsm}
                  onChange={(e) => setPaperGsm(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-800"
                >
                  <option>250 GSM Premium Art Card with Matte Coating</option>
                  <option>300 GSM Heavyweight Art Card (Velvet Feel)</option>
                  <option>220 GSM Imported Natural Textured Ivory Board</option>
                  <option>170 GSM Gloss Art Paper (Wall Multi-Sheet)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Desk Stand Material / Rigidity</label>
                <select
                  value={standMaterial}
                  onChange={(e) => setStandMaterial(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-800"
                >
                  <option>2mm Rigid Greyboard Stand with Velvet-Touch Outer</option>
                  <option>350 GSM Folding Card Stand (Lightweight)</option>
                  <option>Wooden Base Triangular Stand (Ultra-Luxury)</option>
                  <option>Wall Metal Tin Clip &amp; Wire Hanger</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Special Enhancements / Foiling</label>
                <select
                  value={calendarFinish}
                  onChange={(e) => setCalendarFinish(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-800"
                >
                  <option>Gold Foil Stamping on Stand Base + Spot UV on Cover</option>
                  <option>Silver Foil Hot Stamping on Logo</option>
                  <option>Spot UV on Brand Elements Only</option>
                  <option>Full Matte Lamination without Foiling</option>
                  <option>Embossed Raised Logo on Cover</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Production Quantity</label>
                <select
                  value={calendarQuantity}
                  onChange={(e) => setCalendarQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold text-orange-600"
                >
                  <option value="100">100 units (Executive Sample Batch)</option>
                  <option value="250">250 units</option>
                  <option value="500">500 units (Most Popular Tier)</option>
                  <option value="1000">1,000 units (Corporate Bulk Tier)</option>
                  <option value="2500">2,500 units</option>
                  <option value="5000">5,000+ units (Factory Tier)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Packaging Method</label>
                <select
                  value={calendarPackaging}
                  onChange={(e) => setCalendarPackaging(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-800"
                >
                  <option>Individual Shrink Wrap + Custom Printed Envelopes</option>
                  <option>Individual Clear Poly-Sleeve Only</option>
                  <option>Hardcover Gift Presentation Box with Ribbon</option>
                  <option>Bulk Corrugated Master Carton Packing</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Language &amp; Holidays</label>
                <select
                  value={calendarLanguage}
                  onChange={(e) => setCalendarLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-800"
                >
                  <option>English + Indian Banking &amp; Regional Holidays</option>
                  <option>English Corporate Days Only (Custom Dates)</option>
                  <option>Bilingual (English + Kannada/Telugu/Hindi/Tamil)</option>
                  <option>Global International Holidays</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs">
                Custom Dates, Company Milestones or Instructions
              </label>
              <input
                type="text"
                placeholder="e.g. Highlight Founder Anniversary on 14th Oct, Annual Sales Meet in Feb, add customer support hotline on each page"
                value={specialDatesNotes}
                onChange={(e) => setSpecialDatesNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* CONDITIONAL PRINT MEDIA SPECIFICATIONS                              */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === "print" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Printer className="w-5 h-5 text-blue-700" />
                  <span>Commercial Print Media Specifications</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Select product type, dimensions, GSM, and finishing. Full pre-flight technical proofing included.
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">
                Offset &amp; Digital Works
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Product Type</label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option>Brochures / Catalogues</option>
                  <option>Corporate Visiting Cards</option>
                  <option>Promotional Flyers / Leaflets</option>
                  <option>Posters / Wall Art</option>
                  <option>Roll-up Standees / Vinyl Banners</option>
                  <option>Corporate Letterheads &amp; Envelopes</option>
                  <option>Product Packaging &amp; Sleeves</option>
                  <option>Custom Print Project</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Quantity</label>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={printQuantity}
                  onChange={(e) => setPrintQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-blue-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Flat &amp; Finished Size</label>
                <select
                  value={finishedDimensions}
                  onChange={(e) => setFinishedDimensions(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option>A4 (210 x 297 mm)</option>
                  <option>A5 (148 x 210 mm)</option>
                  <option>A3 (297 x 420 mm)</option>
                  <option>Visiting Card (89 x 54 mm)</option>
                  <option>Tri-fold Leaflet (Open A4 - Folded 99x210mm)</option>
                  <option>Custom Dimensions (Specify in notes)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Paper Stock / Substrate</label>
                <select
                  value={paperSubstrate}
                  onChange={(e) => setPaperSubstrate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option>170 GSM Premium Gloss Art Paper</option>
                  <option>250 GSM Premium Matte Art Card</option>
                  <option>300 GSM Heavyweight Art Card</option>
                  <option>350 GSM Velvet-touch Board</option>
                  <option>130 GSM Lightweight Flyer Paper</option>
                  <option>100 GSM Alabaster Bond (Stationery)</option>
                  <option>Recycled Kraft Eco-Board</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Printing Sides &amp; Colours</label>
                <select
                  value={printingSides}
                  onChange={(e) => setPrintingSides(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option>Double Sided Full Colour (4+4 CMYK)</option>
                  <option>Single Sided Full Colour (4+0 CMYK)</option>
                  <option>Full Colour + Spot Metallic Gold/Silver</option>
                  <option>Monochrome Black &amp; White</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Lamination &amp; Finishing</label>
                <select
                  value={printFinish}
                  onChange={(e) => setPrintFinish(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option>Matte Lamination + Spot UV on Logo</option>
                  <option>Velvet Soft-Touch Lamination</option>
                  <option>Gloss Thermal Lamination</option>
                  <option>Gold Foil Hot Stamping</option>
                  <option>Aqueous Varnish Only</option>
                  <option>Die-Cut Custom Contour</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Folding / Binding</label>
                <select
                  value={foldingBinding}
                  onChange={(e) => setFoldingBinding(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option>Center Creased / Half-fold</option>
                  <option>Tri-fold (Roll Fold / Z-Fold)</option>
                  <option>Saddle-Stitch Wire Staple (Books/Catalogues)</option>
                  <option>Perfect Bound (Spine Glue)</option>
                  <option>Wire-O Spiral Binding</option>
                  <option>None (Flat Cut Sheets)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Artwork Readiness</label>
                <select
                  value={designAssistance}
                  onChange={(e) => setDesignAssistance(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
                >
                  <option>We have print-ready artwork (300 DPI CMYK)</option>
                  <option>Need Vaivas Ads creative team to design from scratch</option>
                  <option>Artwork ready but need pre-flight resizing/corrections</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Delivery Pincode</label>
                <input
                  type="text"
                  placeholder="e.g. 560001 (Bengaluru)"
                  value={deliveryPincode}
                  onChange={(e) => setDeliveryPincode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* CONDITIONAL DIGITAL ADVERTISING & CREATIVE SPECS                   */}
        {/* ------------------------------------------------------------------- */}
        {activeTab === "digital" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-700" />
                  <span>Digital Marketing &amp; Creative Consultation</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Paid advertising, brand identity, Next.js web experiences, and video production.
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold">
                Strategic Agency
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Primary Service Focus</label>
                <select
                  value={digitalService}
                  onChange={(e) => setDigitalService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-slate-800"
                >
                  <option>Paid Advertising (Google &amp; Meta)</option>
                  <option>Google Ads &amp; Performance Max</option>
                  <option>Social Media Marketing &amp; Content Management</option>
                  <option>Creative Designing &amp; Visual Assets</option>
                  <option>Full Brand Identity System</option>
                  <option>Lead Generation Funnels &amp; Landing Pages</option>
                  <option>Website Design &amp; Development (Next.js)</option>
                  <option>SEO &amp; Organic Content Marketing</option>
                  <option>Video &amp; Motion Content Creation</option>
                  <option>Influencer Marketing &amp; Creator Collaborations</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Core Campaign Objective</label>
                <select
                  value={campaignObjectives}
                  onChange={(e) => setCampaignObjectives(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-slate-800"
                >
                  <option>Lead Generation &amp; Immediate Consultations</option>
                  <option>Direct eCommerce Sales &amp; ROAS Scale</option>
                  <option>Brand Identity &amp; Corporate Rebranding</option>
                  <option>Modern Enterprise Website Redesign</option>
                  <option>Organic Search Dominance &amp; Authority</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* COMMON CONTACT & CLIENT INFORMATION                                 */}
        {/* ------------------------------------------------------------------- */}
        <div className="space-y-6 pt-4 border-t border-slate-200">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Contact &amp; Delivery Details
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Siddharth Verma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Business Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="siddharth@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98450 11223"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Company / Organization</label>
              <input
                type="text"
                placeholder="Titanium Holdings Ltd"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Estimated Budget Range</label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
              >
                <option>Under ₹50,000</option>
                <option>₹50,000 - ₹1,50,000</option>
                <option>₹1,50,000 - ₹3,00,000</option>
                <option>₹3,00,000 - ₹10,00,000</option>
                <option>Enterprise Scale (₹10,00,000+)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Delivery / Launch Date</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
              >
                <option>Urgent (Within 5-7 business days)</option>
                <option>Standard (10-14 days)</option>
                <option>Calendar Batch Delivery (Before Dec 15)</option>
                <option>Flexible / Planning Phase</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 text-xs">
              Project Description / Specific Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your brand goals, target audience, specific quantity variations, or packaging needs..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs"
            ></textarea>
          </div>

          {/* Privacy & Anti-spam Consent */}
          <div className="flex items-start gap-2.5 pt-2">
            <input
              type="checkbox"
              id="privacyConsent"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <label htmlFor="privacyConsent" className="text-xs text-slate-600">
              I agree to allow Vaivas Ads to contact me with an itemized proposal, quotation and technical proofs in accordance with the{" "}
              <a href="/privacy" className="text-blue-700 hover:underline">
                Privacy Policy
              </a>
              . We never spam.
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg hover:shadow-orange-600/25 active:scale-98"
          >
            {loading ? (
              <span>Generating Enquiry Reference...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Submit Requirements &amp; Get Itemized Quote</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
          <div className="text-xs text-slate-400 mt-2">
            Instant reference generated • Quotation issued within 4 business hours
          </div>
        </div>
      </form>
    </div>
  );
}
