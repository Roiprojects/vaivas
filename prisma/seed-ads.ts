import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Vaivas Ads initial records...");

  // 1. Ads Settings
  await prisma.adsSetting.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      companyName: "Vaivas Ads",
      tagline: "Big ideas. Real impact.",
      parentCompany: "Vaivas Ventures",
      phone: "+91 80 4123 4568",
      email: "ads@vaivasventures.com",
      whatsappNumber: "+91 98765 43211",
      address: "Vaivas Towers, 3rd Floor, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560103",
      workingHours: "Monday - Saturday: 9:30 AM - 6:30 PM IST",
      consultationPricing: "Complimentary initial strategic consultation",
      seoMetadata: {
        metaTitle: "Vaivas Ads | Advertising, Branding & Print Production",
        metaDescription:
          "Full-service advertising agency, branding studio and high-precision print & calendar manufacturing by Vaivas Ventures.",
      },
      printOptions: {
        substrates: ["130 GSM Art Paper", "170 GSM Art Paper", "250 GSM Art Card", "300 GSM Art Card", "350 GSM Premium Board", "Recycled Kraft Board", "Vinyl Banner Substrate", "Sunboard 3mm/5mm"],
        finishes: ["Matte Lamination", "Gloss Lamination", "Soft-Touch Velvet Lamination", "Spot UV", "Gold Foil Stamping", "Embossing", "Die-Cut Custom Shape"],
        bindings: ["Saddle Stitch (Wire Staple)", "Perfect Binding (Book spine)", "Hardcover Section Sewn", "Wire-O Spiral Double Loop", "Tin Mounting (Calendars)"]
      },
      calendarOptions: {
        types: ["Executive Desk Calendar (Tent / Triangular Stand)", "Premium Wall Calendar (12-Sheet Wire-O)", "Poster Wall Calendar (Single Sheet Tin-Mounted)", "Custom Corporate Executive Planner"],
        monthLayouts: ["Single Month Per Sheet (12 Leaves + Cover)", "Two Months Per Sheet (6 Leaves)", "Single Page Annual Overview"],
        languages: ["English", "English + Regional Holidays (Kannada/Telugu/Tamil/Hindi)", "Multi-Lingual Grid"]
      }
    },
  });

  // 2. The 12 Official Proposed Services
  const services = [
    {
      name: "Paid Advertising",
      slug: "paid-advertising",
      category: "Digital Advertising",
      summary: "High-yield multichannel performance advertising designed for rapid, measurable customer acquisition and ROAS.",
      description: "Our paid advertising strategies blend high-intent audience targeting with continuous algorithmic optimization. We manage paid acquisition across Meta, LinkedIn, programmatic display, and native networks to scale your brand profitably.",
      icon: "Megaphone",
      benefits: ["Hyper-targeted custom audience segmentation", "Real-time cost-per-acquisition (CPA) optimization", "Multi-touch attribution modeling", "Transparent weekly ROAS reporting"],
      inclusions: ["Audience research & competitor audit", "Ad copy & dynamic creative generation", "Pixel & conversion API integration", "A/B testing of angles & hooks", "Bid management & budget pacing"],
      process: [
        { stepNumber: 1, title: "Funnel Analysis", description: "Audit conversion touchpoints, past performance, and customer lifetime value." },
        { stepNumber: 2, title: "Creative Sprints", description: "Produce persuasive image, carousel, and video variations with clear value propositions." },
        { stepNumber: 3, title: "Launch & Scale", description: "Deploy disciplined budget pacing, scale winning ad sets, and eliminate non-performers." }
      ],
      faqs: [
        { question: "What ad budget do I need to start?", answer: "We recommend a minimum media spend of ₹35,000/month to allow statistically significant testing and machine-learning optimization." },
        { question: "Do you provide ad creative designing?", answer: "Yes, our in-house creative designers and copywriters craft all static, motion, and video assets as part of the service." }
      ],
      order: 1,
      isFeatured: true
    },
    {
      name: "Google Ads",
      slug: "google-ads",
      category: "Digital Advertising",
      summary: "Capture high-intent commercial searches across Google Search, Performance Max, Display, and YouTube.",
      description: "Place your business in front of customers at the exact moment they search for your solutions. We specialize in precision negative-keyword structures, high Quality Score landing pages, and smart bidding models.",
      icon: "Search",
      benefits: ["Highest commercial intent traffic", "Quality score optimization for lower cost-per-click", "Strict negative keyword governance to avoid wasted spend", "Google Merchant Center integration for eCommerce"],
      inclusions: ["Keyword intent mapping & search query mining", "Responsive Search Ads (RSA) copywriting", "Performance Max asset groups setup", "Conversion tracking with Enhanced Conversions", "Remarketing tag setup"],
      process: [
        { stepNumber: 1, title: "Keyword Forensics", description: "Isolate transaction-ready search terms with positive buyer intent." },
        { stepNumber: 2, title: "Campaign Architecture", description: "Organize tightly grouped ad groups with dedicated message matching." },
        { stepNumber: 3, title: "Bid & Query Pruning", description: "Continuously add negatives and optimize target CPA/ROAS bids." }
      ],
      faqs: [
        { question: "How quickly can we see results from Google Ads?", answer: "Search ads begin driving clicks within 24-48 hours of launch. Meaningful conversion calibration typically stabilizes in weeks 2 to 4." }
      ],
      order: 2,
      isFeatured: true
    },
    {
      name: "Social Media Marketing",
      slug: "social-media-marketing",
      category: "Digital Advertising",
      summary: "Build an active community, establish brand authority, and turn social followers into brand advocates.",
      description: "From aesthetic Instagram grids and viral reels to thought-leadership LinkedIn executives, we manage end-to-end social media growth, editorial calendars, and community engagement.",
      icon: "Share2",
      benefits: ["Consistent, aesthetic brand presence", "Engaging reel & carousel formats", "Active comment & direct message triage", "Monthly analytics & follower demographics"],
      inclusions: ["Monthly content calendar & theme planning", "Graphic design & short-form video editing", "Captions with research-backed hashtags", "Story sequencing & interactive polls", "Competitor benchmark reports"],
      process: [
        { stepNumber: 1, title: "Brand Voice Alignment", description: "Establish visual guidelines, typography, tone of voice, and content pillars." },
        { stepNumber: 2, title: "Content Batching", description: "Design, write, and schedule posts 14 days in advance for client review." },
        { stepNumber: 3, title: "Engagement & Community", description: "Foster conversations, respond to inbound messages, and monitor brand sentiment." }
      ],
      faqs: [
        { question: "Do you manage both B2B and B2C channels?", answer: "Yes, we tailor B2B campaigns primarily for LinkedIn and YouTube, and B2C campaigns for Instagram, Meta, and Pinterest." }
      ],
      order: 3,
      isFeatured: false
    },
    {
      name: "Creative Designing",
      slug: "creative-designing",
      category: "Branding & Creative",
      summary: "World-class graphic design, advertising creatives, visual packaging, and promotional collateral.",
      description: "Creative design that arrests attention in a crowded feed. We produce digital display banners, social carousels, outdoor hoardings, retail POS displays, and print collateral crafted by seasoned art directors.",
      icon: "Palette",
      benefits: ["Distinctive, non-generic agency aesthetic", "Pixel-perfect multi-format adaptations", "Print-ready CMYK and digital RGB outputs", "Fast turnaround for seasonal bursts"],
      inclusions: ["Digital ad banners (all standard IAB sizes)", "Social media creatives & story templates", "Infographics & presentation pitch decks", "Print posters, roll-up standees & banners", "Packaging & label graphics"],
      process: [
        { stepNumber: 1, title: "Creative Brief", description: "Define target demographic, emotional hook, key messaging, and specs." },
        { stepNumber: 2, title: "Concept Exploration", description: "Present 2-3 visual directions for feedback and alignment." },
        { stepNumber: 3, title: "Master Production", description: "Finalize approved art and export across all required digital and print dimensions." }
      ],
      faqs: [
        { question: "Will we receive raw source files?", answer: "Yes, all approved final assets are packaged with open vector/Figma/PSD files upon completion." }
      ],
      order: 4,
      isFeatured: false
    },
    {
      name: "Branding",
      slug: "branding",
      category: "Branding & Creative",
      summary: "End-to-end brand identity creation, typography, color palettes, and comprehensive brand style guides.",
      description: "A brand is more than a logo; it is the gut feeling your company evokes. We build complete identity systems that position you as an undisputed market leader and remain timeless across decades.",
      icon: "Award",
      benefits: ["Unified brand recognition across all channels", "Exhaustive Brand Bible with usage rules", "Custom iconography & typography pairings", "Stationery & corporate communication templates"],
      inclusions: ["Logo mark & wordmark design with variations", "Color hierarchy & accessible palette tokens", "Corporate stationery (visiting cards, letterheads, envelopes)", "Brand story, tone of voice & positioning guidelines", "Merchandise & outdoor mockups"],
      process: [
        { stepNumber: 1, title: "Discovery & Archetype", description: "Uncover core values, competitive white space, and brand personality." },
        { stepNumber: 2, title: "Identity Crafting", description: "Design logo concepts with contextual mockups across print, digital, and environment." },
        { stepNumber: 3, title: "Brand Guidelines Manual", description: "Deliver a 40+ page master brand guideline book ensuring flawless execution." }
      ],
      faqs: [
        { question: "How many logo iterations are included?", answer: "We provide 3 distinctly crafted conceptual directions, followed by up to 3 rounds of refinement on your chosen direction." }
      ],
      order: 5,
      isFeatured: true
    },
    {
      name: "Lead Generation",
      slug: "lead-generation",
      category: "Digital Advertising",
      summary: "B2B and B2C qualified lead pipelines built with high-converting landing pages and automated nurturing.",
      description: "Stop wasting money on unqualified clicks. Our lead generation engine synchronizes paid traffic, bespoke landing pages, multi-step qualification quizzes, and CRM integration to deliver sales-ready leads.",
      icon: "Target",
      benefits: ["High form completion and conversion rates", "Pre-qualified lead criteria to filter out tire-kickers", "Instant CRM and WhatsApp lead routing", "Automated email confirmation workflows"],
      inclusions: ["High-speed, conversion-focused landing page design", "Interactive quote/assessment calculators", "CRM integration (HubSpot, Salesforce, Zoho)", "Lead scoring and validation protocols", "Real-time webhook notifications"],
      process: [
        { stepNumber: 1, title: "Offer Engineering", description: "Formulate an irresistible hook, lead magnet, or audit proposition." },
        { stepNumber: 2, title: "Frictionless Funnel", description: "Build mobile-optimized landing pages with clear social proof and fast loading." },
        { stepNumber: 3, title: "Lead Delivery", description: "Route qualified prospect details straight to your sales team within seconds." }
      ],
      faqs: [
        { question: "Can you filter leads by city or annual turnover?", answer: "Yes, our dynamic forms include customizable qualifying questions to ensure your sales team only calls high-value prospects." }
      ],
      order: 6,
      isFeatured: false
    },
    {
      name: "Website Design & Development",
      slug: "website-design-development",
      category: "Web & Content",
      summary: "High-performance, modern business websites, enterprise web apps, and conversion-engineered landing pages.",
      description: "We engineer lightning-fast digital storefronts and corporate websites using Next.js, modern CSS, and headless architectures. Every website is built for superior SEO ranking, responsive mobile UX, and effortless admin management.",
      icon: "Code",
      benefits: ["Sub-second page load times on mobile", "Modern editorial agency visual aesthetic", "Built-in CMS for effortless content updates", "Accessibility (WCAG) and schema.org markup"],
      inclusions: ["Custom UI/UX prototypes in Figma", "Full-stack Next.js / React engineering", "Secure admin portals and user management", "SEO metadata and sitemap automation", "SSL, hosting setup, and continuous backup"],
      process: [
        { stepNumber: 1, title: "Information Architecture", description: "Map user journeys, page hierarchies, and content wireframes." },
        { stepNumber: 2, title: "Interactive UI Design", description: "Craft responsive, micro-animated screen designs with design tokens." },
        { stepNumber: 3, title: "Code & Deployment", description: "Develop clean semantic code, run performance audits, and launch on modern cloud." }
      ],
      faqs: [
        { question: "Can our team update blogs and services without a developer?", answer: "Yes, we provide an intuitive administrative CMS so your staff can create, draft, preview, and publish pages easily." }
      ],
      order: 7,
      isFeatured: true
    },
    {
      name: "SEO & Content Marketing",
      slug: "seo-content-marketing",
      category: "Web & Content",
      summary: "Sustainable organic search ranking through in-depth keyword architecture, technical SEO, and thought leadership articles.",
      description: "Rank for the search terms your highest-value customers use. We combine deep technical SEO audits, page speed optimization, authoritative editorial content, and high-quality backlink strategies to grow your organic traffic month after month.",
      icon: "TrendingUp",
      benefits: ["Long-term recurring organic traffic with zero ad spend", "Targeting high-intent long-tail commercial queries", "Core Web Vitals compliance", "Detailed monthly keyword rank tracking"],
      inclusions: ["Comprehensive technical site health audit", "Competitor keyword gap analysis", "Editorial long-form blog article writing", "On-page optimization (headings, meta, internal links)", "Local Google Business Profile optimization"],
      process: [
        { stepNumber: 1, title: "Technical Remediation", description: "Fix indexation issues, crawl bottlenecks, and page performance." },
        { stepNumber: 2, title: "Content Clusters", description: "Publish pillar pages and supporting cluster articles answering buyer questions." },
        { stepNumber: 3, title: "Authority Growth", description: "Earn relevant industry citations, track ranking gains, and update content." }
      ],
      faqs: [
        { question: "How long before we see first-page rankings?", answer: "Substantial SEO gains typically emerge within 3 to 6 months depending on existing domain authority and keyword competition." }
      ],
      order: 8,
      isFeatured: false
    },
    {
      name: "Video & Content Creation",
      slug: "video-content-creation",
      category: "Web & Content",
      summary: "High-impact brand films, corporate showreels, product explainers, and short-form vertical videos for social ads.",
      description: "Video converts 80% more effectively than static copy. Our creative studio scripts, shoots, animates, and edits cinematic video content that explains complex value propositions and drives emotional brand affinity.",
      icon: "Video",
      benefits: ["Professional 4K cinematography & drone coverage", "Dynamic motion graphics & 2D/3D kinetic typography", "Format variations optimized for 9:16 reels and 16:9 screens", "Sound design and licensed music scoring"],
      inclusions: ["Concept ideation & storyboard scripting", "On-location shoot coordination and crew", "Professional voiceover narration & subtitles", "Post-production color grading & sound mixing", "Cutdowns for YouTube, Instagram, and LinkedIn"],
      process: [
        { stepNumber: 1, title: "Script & Storyboard", description: "Write narrative beats, dialogue, and visual cues." },
        { stepNumber: 2, title: "Production & Shoot", description: "Execute professional lighting, multi-cam capture, and audio recording." },
        { stepNumber: 3, title: "Edit & Polish", description: "Assemble cuts, sync sound design, add motion graphics, and deliver master exports." }
      ],
      faqs: [
        { question: "Can you film at our client offices or factories?", answer: "Yes, our film crews travel across India for on-site corporate shoots, factory walkthroughs, and leadership interviews." }
      ],
      order: 9,
      isFeatured: false
    },
    {
      name: "Influencer Marketing",
      slug: "influencer-marketing",
      category: "Digital Advertising",
      summary: "Strategic creator collaborations that build genuine brand trust and tap into loyal, engaged follower bases.",
      description: "Skip fake follower counts. We partner your brand with thoroughly vetted micro and macro creators who possess real credibility in your specific industry, managing contract negotiation, creative briefs, and campaign compliance.",
      icon: "Users",
      benefits: ["Authentic third-party product endorsements", "Direct access to niche regional and demographic communities", "High-volume user generated content (UGC) for paid ads", "Transparent reach, engagement, and conversion tracking"],
      inclusions: ["Creator discovery & audience authenticity audit", "Rate negotiation, contracting & usage rights", "Campaign creative guidelines and brief alignment", "Content review before live posting", "Post-campaign performance recap"],
      process: [
        { stepNumber: 1, title: "Creator Shortlisting", description: "Filter creators by audience overlap, engagement rate, and brand fit." },
        { stepNumber: 2, title: "Briefing & Gifting", description: "Dispatch products and brief creators on key USPs and mandatory disclosures." },
        { stepNumber: 3, title: "Amplification", description: "Whitelabel top-performing creator posts into paid social ads for maximum reach." }
      ],
      faqs: [
        { question: "Do you secure usage rights for the videos?", answer: "Yes, all creator contracts include explicit commercial usage rights allowing you to reuse the assets across your website and ads." }
      ],
      order: 10,
      isFeatured: false
    },
    {
      name: "Print Media",
      slug: "print-media",
      category: "Print Media & Calendars",
      summary: "Commercial offset and digital printing for visiting cards, brochures, flyers, catalogues, posters, and retail displays.",
      description: "High-precision commercial print manufacturing built for corporate excellence. We handle every step: technical artwork proofing, substrate selection, precision color calibration, premium finishes (spot UV, gold foiling, velvet lamination), and safe delivery.",
      icon: "Printer",
      benefits: ["Flawless color reproduction with rigorous CMYK proofing", "Huge range of premium paper stocks (130 GSM to 350 GSM+)", "Custom luxury finishes: Spot UV, Emboss, Foil, Die-cut", "Doorstep delivery with protective packaging across India"],
      inclusions: ["Visiting cards (Single/Double side, Velvet, Textured)", "Corporate brochures & multi-page company profiles", "Promotional flyers, leaflets & product inserts", "Saddle-stitch and perfect-bound product catalogues", "Roll-up standees, vinyl banners & exhibition backdrops"],
      process: [
        { stepNumber: 1, title: "Spec Capture & Quote", description: "Select dimensions, paper GSM, finish, and quantity to receive an itemized quote." },
        { stepNumber: 2, title: "Pre-Flight Artwork Check", description: "Inspect resolution (300 DPI), bleed margins, and color profiles with digital proof approval." },
        { stepNumber: 3, title: "Production & Dispatch", description: "Execute offset printing, quality check for cuts and finish, pack securely, and dispatch." }
      ],
      faqs: [
        { question: "What is your typical production turnaround?", answer: "Standard print jobs ship in 3-5 business days after artwork proof approval. Rush production is available for urgent events." },
        { question: "What file format is required for print artwork?", answer: "We accept print-ready vector PDFs, AI, or PSD files with 3mm bleed, CMYK color space, and all fonts outlined." }
      ],
      order: 11,
      isFeatured: true
    },
    {
      name: "Calendar Design and Printing",
      slug: "calendar-design-printing",
      category: "Print Media & Calendars",
      summary: "Bespoke corporate wall calendars, executive desk calendars, and planner gifts engineered for 365-day brand presence.",
      description: "Keep your brand on your clients' desks every single day of the year. Our specialized calendar division manages calendar layout design, custom regional holiday grids, photography curation, heavy-duty stands, Wire-O binding, and individual shrink-wrap packaging.",
      icon: "Calendar",
      benefits: ["Unmatched 365-day brand visibility in client offices", "Executive rigid cardboard desk stands with matte/gloss finish", "12-month thematic storytelling with custom imagery", "Custom company dates, product highlights, and regional holidays"],
      inclusions: ["Executive Triangular Desk Calendars (6 or 12 leaves)", "Premium Multi-Sheet Wall Calendars with Wire-O hanger", "Single-Sheet Poster Calendars with metal tin mounting", "Individual protective shrink-wrapping and envelope packaging", "Complete layout, date alignment, and proof approval"],
      process: [
        { stepNumber: 1, title: "Configuration", description: "Choose calendar style, leaf count, dimensions, paper GSM, and stand rigidity." },
        { stepNumber: 2, title: "Date & Artwork Sign-off", description: "Provide logos, photos, and special dates. Rigorous proof check for dates, weekdays, and holidays." },
        { stepNumber: 3, title: "Batch Manufacturing & Delivery", description: "Print, Wire-O bind, inspect page sequence, individual pack, and bulk dispatch to corporate offices." }
      ],
      faqs: [
        { question: "Can we include our own company events and founder anniversaries?", answer: "Absolutely. We customize the date grid to highlight your specific company milestones, holidays, and regional festivals." },
        { question: "What is the minimum order quantity for corporate calendars?", answer: "We accommodate orders starting from 100 units up to 50,000+ units with bulk tier pricing." }
      ],
      order: 12,
      isFeatured: true
    },
  ];

  for (const s of services) {
    await prisma.adsService.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`Seeded ${services.length} Vaivas Ads services.`);

  // 3. Featured Portfolio Projects
  const projects = [
    {
      title: "MedLife Multispeciality Hospital Branding & Patient Drive",
      slug: "medlife-hospital-campaign",
      clientName: "MedLife Healthcare",
      category: "Digital Ads",
      industry: "Healthcare",
      summary: "Comprehensive multi-touch patient acquisition drive and corporate identity refresh across Bengaluru.",
      description: "Executed high-intent Google Search campaigns for critical specialties, combined with localized Meta video stories featuring senior doctors. Created complete hospital OPD signage and patient intake brochures.",
      deliverables: ["Brand Identity Refresh", "Google Search Ads & Meta Funnels", "OPD Patient Information Folders", "Doctor Spotlight Reel Series"],
      coverImage: "/images/ads/project-1.jpg",
      galleryImages: ["/images/ads/project-1.jpg", "/images/ads/project-2.jpg"],
      isFeatured: true,
      order: 1
    },
    {
      title: "Aura Luxe Executive 2026 Desk Calendar Suite",
      slug: "aura-luxe-calendar-suite",
      clientName: "Aura Luxury Living",
      category: "Calendars",
      industry: "Real Estate & Architecture",
      summary: "300 GSM Art Card triangular desk calendars with gold foil accents and velvet matte lamination.",
      description: "Produced 2,500 executive desk calendars for premier HNI clients. Included custom architectural renders for each month, soft-touch velvet stand backing, and gold wire-o binding packaged in branded pull-string boxes.",
      deliverables: ["12-Sheet Thematic Layout", "Gold Foil Hot Stamping", "Rigid Triangular Board Stand", "Custom Corporate Holiday Matrix"],
      coverImage: "/images/ads/print-calendar-showcase.jpg",
      galleryImages: ["/images/ads/print-calendar-showcase.jpg", "/images/ads/project-3.jpg"],
      isFeatured: true,
      order: 2
    },
    {
      title: "Apex Cloud Enterprise B2B SaaS Growth Funnel",
      slug: "apex-cloud-growth-funnel",
      clientName: "Apex Software Systems",
      category: "Digital Ads",
      industry: "B2B Technology",
      summary: "Targeted LinkedIn in-feed thought leadership and Google Search funnel generating 1,400+ qualified software demos.",
      description: "Positioned Apex Cloud as the premier ERP software for mid-market manufacturing. Built dedicated interactive ROI calculator landing pages that doubled the conversion rate.",
      deliverables: ["Next.js Interactive Landing Page", "LinkedIn Carousel Creatives", "Whitepaper Design", "HubSpot Lead Scoring Sync"],
      coverImage: "/images/ads/project-2.jpg",
      galleryImages: ["/images/ads/project-2.jpg", "/images/ads/project-1.jpg"],
      isFeatured: true,
      order: 3
    },
    {
      title: "Kaveri Organics FMCG Packaging & Retail POS Kit",
      slug: "kaveri-organics-packaging",
      clientName: "Kaveri Farm Produce",
      category: "Print Creatives",
      industry: "FMCG & Food",
      summary: "Biodegradable paper pouch packaging design, retail standees, and 10,000 product catalogue brochures.",
      description: "End-to-end packaging revamp showcasing authentic farm origins. Coordinated precision offset printing with food-grade varnish and vibrant CMYK color separation.",
      deliverables: ["Product Packaging & Die-lines", "Retail Shelf Display Standees", "Tri-fold 170 GSM Brochures", "Digital Storefront Graphics"],
      coverImage: "/images/ads/project-3.jpg",
      galleryImages: ["/images/ads/project-3.jpg", "/images/ads/ads-hero.jpg"],
      isFeatured: true,
      order: 4
    }
  ];

  for (const p of projects) {
    await prisma.adsProject.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`Seeded ${projects.length} Vaivas Ads projects.`);

  // 4. Case Studies with verified metrics
  const caseStudies = [
    {
      title: "How MedLife Scaled Specialist Consultations by 310% in 90 Days",
      slug: "medlife-specialist-consultations-case-study",
      clientName: "MedLife Healthcare Group",
      industry: "Healthcare",
      serviceCategory: "Digital Advertising & Creative",
      challenge: "MedLife launched a new super-specialty wing in Bengaluru but struggled to drive patient footfall against established regional legacy hospitals. Cost per consultation on generic ads exceeded ₹1,800 with high no-show rates.",
      objective: "Establish trusted authority for 5 senior specialty heads and achieve a sub-₹600 cost per booked patient consultation within 90 days.",
      strategy: "We retired generic hospital promotional banners and pivoted to authentic doctor video explainers addressing common health misconceptions. Paired this with localized Google Search ads targeting high-intent diagnosis keywords and built an instant WhatsApp appointment booking widget.",
      execution: "Deployed 18 geo-targeted video reels across a 15km catchment radius, configured Google Call-Only campaigns for urgent inquiries, and revamped OPD registration brochures for unified visual trust.",
      channels: ["Google Search Ads", "Meta Video Reels", "WhatsApp Business API", "Print OPD Collateral"],
      duration: "90 Days (Q3 2025)",
      resultsMetrics: {
        qualifiedLeads: "2,840+ verified bookings",
        costPerLeadReduction: "64% reduction (down to ₹540)",
        revenueGrowth: "+310% specialty revenue",
        roas: "5.8x ROAS"
      },
      coverImage: "/images/ads/project-1.jpg",
      mediaImages: ["/images/ads/project-1.jpg", "/images/ads/project-2.jpg"],
      isPublished: true,
      isApproved: true,
      order: 1
    },
    {
      title: "Apex Cloud: 1,420 Enterprise Demo Requests at 4.2x ROAS",
      slug: "apex-cloud-enterprise-saas-case-study",
      clientName: "Apex Software Systems",
      industry: "B2B Technology",
      serviceCategory: "Lead Generation & Web Engineering",
      challenge: "Apex Cloud's enterprise ERP product was technologically superior but suffered from an outdated, slow corporate website and a high bounce rate on paid LinkedIn campaigns.",
      objective: "Reposition the digital brand, rebuild the web application on Next.js for sub-second loading, and scale inbound demo volume for the direct sales team.",
      strategy: "Created an interactive 'ERP Cost Savings Calculator' on a dedicated Next.js landing page. Ran targeted LinkedIn Thought-Leader ads promoting an ungated manufacturing benchmark report.",
      execution: "Designed and engineered the full landing page in 3 weeks, hooked up direct webhook routing to their HubSpot CRM, and launched automated email nurture sequences for disqualified leads.",
      channels: ["LinkedIn Sponsored Content", "Google Search Intent", "Next.js Web Experience", "HubSpot CRM Automation"],
      duration: "6 Months",
      resultsMetrics: {
        qualifiedLeads: "1,420 MQLs generated",
        pageSpeedScore: "99/100 Google Lighthouse",
        conversionRateLift: "+185% form completion",
        roas: "4.2x Pipeline Value Multiple"
      },
      coverImage: "/images/ads/project-2.jpg",
      mediaImages: ["/images/ads/project-2.jpg"],
      isPublished: true,
      isApproved: true,
      order: 2
    }
  ];

  for (const cs of caseStudies) {
    await prisma.adsCaseStudy.upsert({
      where: { slug: cs.slug },
      update: cs,
      create: cs,
    });
  }
  console.log(`Seeded ${caseStudies.length} Vaivas Ads case studies.`);

  // 5. Client Testimonials
  const testimonials = [
    {
      clientName: "Dr. Arvind Ramesh",
      designation: "Managing Director",
      company: "MedLife Healthcare",
      content: "Vaivas Ads transformed our patient discovery. Their understanding of ethical medical advertising and immediate technical execution exceeded all expectations.",
      rating: 5,
      isFeatured: true,
      isApproved: true,
      order: 1
    },
    {
      clientName: "Kavita Singhania",
      designation: "VP Marketing",
      company: "Apex Cloud Software",
      content: "The combination of top-tier creative design with serious engineering speed in Next.js made Vaivas Ads our sole growth partner. Highly recommended for B2B brands.",
      rating: 5,
      isFeatured: true,
      isApproved: true,
      order: 2
    },
    {
      clientName: "Rajeshwar Rao",
      designation: "Head of Operations",
      company: "Aura Luxury Living",
      content: "Our 2026 executive desk calendars were delivered with flawless print registration and exquisite velvet stands. Our clients keep calling to compliment the quality.",
      rating: 5,
      isFeatured: true,
      isApproved: true,
      order: 3
    }
  ];

  for (const t of testimonials) {
    await prisma.adsClientTestimonial.create({ data: t });
  }
  console.log(`Seeded ${testimonials.length} Vaivas Ads testimonials.`);

  // 6. Blog Articles
  const blogs = [
    {
      title: "Why Corporate Calendars Still Deliver the Highest Physical B2B Brand ROI",
      slug: "corporate-calendars-b2b-brand-roi",
      excerpt: "In a world of fleeting 3-second digital ads, an executive desk calendar holds guaranteed daily real estate on your key client's desk for 365 consecutive days.",
      content: `In an era dominated by hyper-speed digital impressions, the average professional encounters over 4,000 digital ads daily—and remembers almost none of them. 

Yet, there is one medium that consistently outperforms every programmatic display campaign in client retention: the well-crafted corporate desk calendar.

### The Power of Daily Desktop Real Estate
When a decision-maker places your branded desk calendar on their workstation, your company logo, typography, and aesthetic become an ambient constant in their working day.

1. **Zero Ad-Blockers**: Physical media cannot be scrolled past or muted.
2. **Daily Functional Utility**: Even with digital calendars, professionals rely on physical desktop grids for rapid date cross-checks during calls.
3. **Subconscious Brand Trust**: Premium substrates like 300 GSM textured boards and gold foil stamping subtly signal corporate stability and financial strength.

### Key Considerations for 2026 Calendar Design
- **Substrate Rigidity**: Avoid flimsy stands that tip over. Use minimum 2mm greyboard laminated with soft-touch velvet coating.
- **Thoughtful Custom Dates**: Mark your sector's trade shows, tax deadlines, and regional cultural celebrations alongside standard public holidays.
- **Thematic Visual Continuity**: Use each monthly leaf to tell a story—highlighting sustainability milestones, product breakthroughs, or client philosophies.`,
      category: "Print Media",
      coverImage: "/images/ads/blog-1.jpg",
      authorName: "Vaivas Ads Editorial",
      authorRole: "Print Production Specialist",
      tags: ["Print Media", "Calendars", "B2B Marketing", "Corporate Gifting"],
      readTimeMinutes: 5,
      isPublished: true
    },
    {
      title: "The Death of Fluff: Designing Conversion-First Ad Creatives in 2026",
      slug: "designing-conversion-first-ad-creatives",
      excerpt: "Generic stock photos and vague slogans are burning ad spend. Here is the visual architecture behind ads that actually stop thumbs and drive purchases.",
      content: `The advertising algorithms of Meta and Google have become vastly smarter at audience targeting. The variable that now determines whether your campaign wins or fails is not targeting—it is creative distinction.

### The 3-Second Visual Hook Rule
Your ad creative has less than 800 milliseconds to arrest attention. 

- **High Contrast Typography**: Strong deep navy headlines on crisp white or pastel-tinted cards yield 38% higher readability on mobile screens.
- **Authentic People, Authentic Context**: Stock photos with fake smiles are instantly filtered out by consumer brains. Use genuine behind-the-scenes photography and candid operational shots.
- **Direct Benefit Stacking**: Never make the prospect guess what you do. State the concrete outcome in the first four words of the visual banner.`,
      category: "Digital Advertising",
      coverImage: "/images/ads/blog-2.jpg",
      authorName: "Vikram Shenoy",
      authorRole: "Creative Director",
      tags: ["Digital Ads", "Creative Design", "ROAS", "Performance Marketing"],
      readTimeMinutes: 4,
      isPublished: true
    },
    {
      title: "Offset vs Digital Printing: How to Choose the Right Method for Your Run",
      slug: "offset-vs-digital-printing-guide",
      excerpt: "A practical guide for corporate procurement managers balancing turnaround speed, substrate finishes, and unit costs.",
      content: `Selecting between commercial sheet-fed offset printing and high-end digital presses can make a difference of tens of thousands of rupees in your marketing budget.

### When to Choose Digital Printing
- **Short Runs (Under 500 units)**: Digital printing requires no plate setup costs, making runs of 50 to 500 brochures or reports highly cost-efficient.
- **Variable Data & Personalization**: If each visiting card or certificate requires a unique name or barcode, digital is essential.
- **Emergency 24-48 Hour Turnaround**: No plate drying or wash-up time required.

### When to Choose Offset Printing
- **High Volumes (1,000+ units)**: Once aluminum CTP plates are generated, unit costs decrease exponentially.
- **Critical Brand Color Matching**: When your brand demands exact Pantone spot color reproduction (such as corporate navy or metallic gold).
- **Heavy Specialty Boards & Textured Substrates**: Offset handles heavy 350+ GSM cardboards, embossed linen, and intricate die-cuts with unmatched mechanical precision.`,
      category: "Print Media",
      coverImage: "/images/ads/blog-3.jpg",
      authorName: "Mahesh Deshpande",
      authorRole: "Technical Print Director",
      tags: ["Print Production", "Technical Guide", "Procurement", "Quality Assurance"],
      readTimeMinutes: 6,
      isPublished: true
    }
  ];

  for (const b of blogs) {
    await prisma.adsBlogArticle.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }
  console.log(`Seeded ${blogs.length} Vaivas Ads blog articles.`);

  // 7. Seed Operational Inbound Leads
  const lead1 = await prisma.adsLead.upsert({
    where: { refNumber: "ENQ-ADS-2026-1001" },
    update: {},
    create: {
      refNumber: "ENQ-ADS-2026-1001",
      fullName: "Siddharth Verma",
      email: "siddharth@titaniumholdings.in",
      phone: "+91 98450 11223",
      companyName: "Titanium Holdings Ltd",
      serviceType: "Calendar Design and Printing",
      budgetRange: "₹1,50,000 - ₹3,00,000",
      timeline: "Delivery by 15th December 2026",
      description: "Need 1,500 executive desk calendars for our corporate banking clients and leadership team. Must include our corporate milestones, custom gold foil logo on rigid stand, and individual shrink wrap.",
      source: "Calendar Configurator",
      status: "PROPOSAL_SENT",
      assignedStaff: "Priya Nair (Senior Account Director)",
      internalNotes: "Verified company GST details. Client requested mock samples of 250 GSM vs 300 GSM. Quotation QT-2026-0001 prepared and accepted.",
      nextFollowUpDate: new Date(Date.now() + 86400000 * 2),
      calendarSpecs: {
        calendarType: "Executive Desk Calendar (Tent Stand)",
        year: 2026,
        dimensions: "8.5 x 6.0 inches (Horizontal)",
        orientation: "Landscape",
        leavesCount: 12,
        paperGsm: "250 GSM Art Card with Matte Lamination",
        monthLayout: "Single Month Per Leaf (12 Leaves + 1 Master Cover)",
        binding: "Double Wire-O Binding (Black Metal)",
        standMaterial: "2mm Hardboard Stand with Soft-Touch Velvet Outer",
        finish: "Gold Foil Stamping on Cover & Stand base",
        quantity: 1500,
        packaging: "Individual Shrink Wrap + Custom Envelope",
        language: "English with Indian Corporate & Banking Holidays"
      },
      artworkFiles: ["/images/ads/print-calendar-showcase.jpg"]
    }
  });

  const lead2 = await prisma.adsLead.upsert({
    where: { refNumber: "ENQ-ADS-2026-1002" },
    update: {},
    create: {
      refNumber: "ENQ-ADS-2026-1002",
      fullName: "Meera Krishnan",
      email: "meera.k@nexussolutions.co",
      phone: "+91 99887 66554",
      companyName: "Nexus Enterprise Solutions",
      serviceType: "Print Media",
      budgetRange: "₹50,000 - ₹1,00,000",
      timeline: "Immediate (Event on next Friday)",
      description: "Require 10,000 units of A4 tri-fold product brochures on 170 GSM Gloss paper for upcoming tech summit in Bengaluru.",
      source: "Print Configurator",
      status: "QUALIFIED",
      assignedStaff: "Rahul Mehta (Production Manager)",
      internalNotes: "Artwork files verified for 300 DPI CMYK. Quotation under review.",
      printSpecs: {
        productType: "Brochures / Catalogues",
        quantity: 10000,
        flatSize: "A4 (210 x 297 mm)",
        orientation: "Landscape Tri-fold (6 panels)",
        paperSubstrate: "170 GSM Premium Gloss Art Paper",
        printingSide: "Double Sided Full Colour (4+4 CMYK)",
        finishing: "All-over Aqueous Gloss Varnish + Precision Creasing",
        folding: "Roll Fold / Tri-fold into 99 x 210 mm",
        deliveryPincode: "560066 (Whitefield, Bengaluru)"
      }
    }
  });

  console.log("Seeded Ads leads: ENQ-ADS-2026-1001, ENQ-ADS-2026-1002");

  // 8. Seed Quotation linked to Lead 1
  const quotation1 = await prisma.adsQuotation.upsert({
    where: { quotationNumber: "QT-2026-0001" },
    update: {},
    create: {
      quotationNumber: "QT-2026-0001",
      revisionNumber: 1,
      leadId: lead1.id,
      leadRefNumber: lead1.refNumber,
      customerName: "Siddharth Verma",
      customerEmail: "siddharth@titaniumholdings.in",
      customerPhone: "+91 98450 11223",
      companyName: "Titanium Holdings Ltd",
      billingAddress: "Tower B, 7th Floor, UB City, Vittal Mallya Road, Bengaluru 560001",
      issueDate: new Date(),
      validityDate: new Date(Date.now() + 86400000 * 15),
      specificationsSnapshot: {
        item: "2026 Executive Desk Calendars",
        quantity: 1500,
        size: "8.5 x 6.0 inches",
        sheets: "13 leaves (Cover + 12 Months)",
        paper: "250 GSM Premium Art Card with Matte Lamination",
        stand: "2mm Hardboard with Soft-Touch Velvet Wrapping",
        binding: "Black Wire-O Spiral"
      },
      items: [
        {
          description: "Manufacturing of 2026 Executive Desk Calendars (8.5x6 inches, 13 leaves on 250 GSM Art Card with Matte Lamination, 2mm Hardboard Stand, Wire-O Binding)",
          quantity: 1500,
          unitRate: 110.0,
          amount: 165000.0
        },
        {
          description: "Custom Gold Foil Hot Stamping on calendar stand and outer cover plate",
          quantity: 1500,
          unitRate: 8.0,
          amount: 12000.0
        },
        {
          description: "Individual Protective Shrink-Wrap & Custom Presentation Envelopes",
          quantity: 1500,
          unitRate: 5.0,
          amount: 7500.0
        }
      ],
      subtotal: 184500.0,
      designSetupCost: 5000.0,
      finishingCost: 0.0,
      deliveryCharges: 2500.0,
      discountAmount: 4000.0,
      taxPercent: 18.0,
      taxAmount: 33840.0,
      totalAmount: 221840.0,
      advanceRequiredPercent: 50.0,
      advanceAmount: 110920.0,
      commercialTerms: {
        leadTime: "10-12 business days following final digital artwork proof sign-off",
        deliveryBasis: "Doorstep delivery to Titanium Holdings Bangalore HQ included",
        paymentMilestones: "50% advance upon order placement, 50% prior to dispatch",
        exclusions: "Unloading at recipient upper floors without lift access",
        cancellationTerms: "Orders cannot be cancelled once plates are imaged and stock is cut"
      },
      status: "ACCEPTED",
      acceptanceEvidence: "Approved via signed purchase order PO-THL-2026-941 by Siddharth Verma on 26-Oct-2026.",
      isConvertedToOrder: true
    }
  });

  // 9. Seed Order linked to Quotation 1
  const existingOrder = await prisma.adsOrder.findUnique({
    where: { quotationId: quotation1.id }
  });

  if (!existingOrder) {
    const order1 = await prisma.adsOrder.create({
      data: {
        orderNumber: "ORD-2026-0001",
        quotationId: quotation1.id,
        quotationNumber: quotation1.quotationNumber,
        customerName: quotation1.customerName,
        customerEmail: quotation1.customerEmail,
        customerPhone: quotation1.customerPhone,
        companyName: quotation1.companyName,
        billingAddress: quotation1.billingAddress,
        deliveryAddress: "Tower B, Central Receiving Bay, UB City, Vittal Mallya Road, Bengaluru 560001",
        items: quotation1.items as any,
        specifications: quotation1.specificationsSnapshot as any,
        totalAmount: quotation1.totalAmount,
        advancePaid: 110920.0,
        balanceAmount: 110920.0,
        paymentStatus: "PARTIALLY_PAID",
        requestedDeliveryDate: new Date(Date.now() + 86400000 * 20),
        confirmedDeliveryDate: new Date(Date.now() + 86400000 * 18),
        assignedStaff: "Rahul Mehta (Production Manager)",
        productionVendor: "Vaivas Central Print Facility (Unit 2, Peenya)",
        jobSheetDetails: {
          jobSheetNo: "JS-CAL-2026-881",
          plateSize: "28 x 40 inches (4-up imposition)",
          inkProfile: "ISO Coated v2 CMYK",
          pressMachine: "Heidelberg Speedmaster SM 74 4-Colour Offset"
        },
        status: "IN_PRODUCTION",
        isArtworkApproved: true,
        artworkApprovedBy: "Siddharth Verma (Client)",
        artworkApprovedAt: new Date(Date.now() - 86400000 * 2),
        artworkProofs: [
          {
            url: "/images/ads/print-calendar-showcase.jpg",
            version: "v2-Final-Approved",
            uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            notes: "Client signed off on all holiday dates and Kannada Rajyotsava date badge."
          }
        ],
        qualityCheckPassed: false,
        totalOrderedQty: 1500,
        totalDispatchedQty: 0,
        remainingQty: 1500
      }
    });

    // Seed Advance Billing Record
    await prisma.adsBillingRecord.create({
      data: {
        orderId: order1.id,
        invoiceNumber: "INV-ADV-2026-041",
        amount: 110920.0,
        type: "ADVANCE",
        paymentDate: new Date(Date.now() - 86400000 * 2),
        paymentMethod: "Bank Transfer / NEFT / RTGS",
        transactionReference: "HDFC982347890123",
        receiptNotes: "50% Advance received as per agreed quotation terms."
      }
    });

    console.log("Seeded Ads Order: ORD-2026-0001 with Advance Billing Record.");
  }

  console.log("Vaivas Ads database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding Vaivas Ads data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
