import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Admin User
  const passwordHash = await bcrypt.hash("Admin@Vaivas2026", 10);
  const adminUser = await prisma.adminUser.upsert({
    where: { email: "admin@vaivasventures.com" },
    update: {},
    create: {
      name: "Super Administrator",
      email: "admin@vaivasventures.com",
      passwordHash,
      role: "SUPERADMIN",
      isActive: true,
    },
  });
  console.log("Admin user created:", adminUser.email);

  // 2. Website Settings
  await prisma.websiteSetting.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      siteTitle: "Vaivas Ventures",
      tagline: "Your success, our mission",
      companyEmail: "info@vaivasventures.com",
      companyPhone: "+91 80 4123 4567",
      address: "Vaivas Towers, 4th Floor, Outer Ring Road, Marathahalli, Bengaluru, Karnataka 560103",
      externalAdsUrl: "https://vaivasads.com",
      socialLinks: {
        linkedin: "https://linkedin.com/company/vaivas-ventures",
        instagram: "https://instagram.com/vaivasventures",
        youtube: "https://youtube.com/@vaivasventures",
        facebook: "https://facebook.com/vaivasventures",
      },
      seoMetadata: {
        metaTitle: "Vaivas Ventures | Connecting Talent. Building Brands.",
        metaDescription: "Vaivas Ventures connects career opportunities, creative advertising, and enterprise HR recruitment across India.",
      },
    },
  });

  // 3. Page Content: Home Page CMS
  const homeData = {
    hero: {
      badge: "People, Opportunity & Growth",
      heading: "Connecting talent. Building brands.",
      description: "People, opportunity and creative growth. Together at Vaivas Ventures.",
      primaryCtaText: "Explore Our Businesses",
      primaryCtaLink: "#our-businesses",
      secondaryCtaText: "Get in Touch",
      secondaryCtaLink: "/contact",
      heroImage: "/images/hero-team.jpg",
      stats: [
        { label: "People Empowered", value: "10,000+", icon: "users" },
        { label: "Brands Elevated", value: "250+", icon: "trending-up" },
        { label: "Opportunities Created", value: "1,500+", icon: "briefcase" },
      ],
    },
    pillars: {
      title: "Three pillars. A bigger tomorrow.",
      subtitle: "From meaningful career opportunities to powerful brand stories and people solutions, Vaivas Ventures brings together three dynamic businesses to create lasting impact.",
      items: [
        {
          id: "01",
          name: "Vaivas Jobs",
          tagline: "Jobs for today. Growth for tomorrow.",
          description: "Real opportunities for real people. We connect job seekers with the right opportunities across industries, helping them build brighter careers.",
          ctaText: "Explore Vaivas Jobs",
          ctaLink: "/jobs",
          logo: "/images/logos/vaivas-jobs-logo.png",
          colorTheme: "blue",
        },
        {
          id: "02",
          name: "Vaivas Ads",
          tagline: "Creative stories for bolder brands.",
          description: "Creative ideas. Real results. We craft compelling advertising solutions that help brands connect, engage and grow in a digital-first world.",
          ctaText: "Explore Vaivas Ads",
          ctaLink: "/ads",
          logo: "/images/logos/vaivas-ads-logo.png",
          colorTheme: "orange",
        },
        {
          id: "03",
          name: "HR Recruitment",
          tagline: "The right talent for a brighter tomorrow.",
          description: "People who fit. Teams that win. We help businesses find, hire and nurture the right talent to build stronger, future-ready organisations.",
          ctaText: "Explore HR Recruitment",
          ctaLink: "/hr-recruitment",
          colorTheme: "green",
        },
      ],
    },
    purpose: {
      tag: "OUR PURPOSE",
      heading: "Your success, our mission.",
      description: "At Vaivas Ventures, we believe in the power of people, the potential of ideas, and the progress that comes from working together. Our mission and vision guide everything we do across jobs, advertising and HR recruitment.",
      mission: {
        title: "Our Mission",
        text: "To create opportunities, build meaningful connections, and deliver solutions that help individuals, brands and businesses grow with confidence.",
      },
      vision: {
        title: "Our Vision",
        text: "To be a trusted and innovative growth partner, known for empowering people, elevating brands and shaping stronger organisations for a better tomorrow.",
      },
    },
    culture: {
      tag: "OUR CULTURE",
      title: "Life at Vaivas",
      description: "A look into our people, our work, and the moments that make Vaivas Ventures a great place to be.",
    },
    blogsSection: {
      tag: "OUR BLOGS",
      title: "Insights & updates",
      description: "Thoughts, ideas and perspectives on careers, branding, people and the changing world of work.",
    },
    testimonialsSection: {
      tag: "CLIENT FEEDBACK",
      title: "What people say",
      description: "We are grateful for the trust and support we receive from individuals and businesses across our journey.",
    },
    ctaBanner: {
      heading: "Let's build what's next.",
      subtext: "Whether you're looking for your next opportunity, want to elevate your brand, or need the right talent for your team — we're here to help.",
      ctaText: "Let's Connect",
      ctaLink: "/contact",
    },
  };

  await prisma.pageContent.upsert({
    where: { id: "home" },
    update: { publishedData: homeData, draftData: homeData },
    create: {
      id: "home",
      draftData: homeData,
      publishedData: homeData,
      isPublished: true,
    },
  });

  // 4. Job Listings
  const job1 = await prisma.jobListing.upsert({
    where: { slug: "senior-hr-business-partner" },
    update: {},
    create: {
      title: "Senior HR Business Partner",
      slug: "senior-hr-business-partner",
      department: "Human Resources",
      location: "Bengaluru, Karnataka",
      employmentType: "Full-time",
      experienceLevel: "5-8 years",
      openings: 2,
      salaryRange: "₹12,00,000 - ₹18,00,000 P.A.",
      description: "We are looking for an experienced Senior HR Business Partner to align business objectives with employees and management in designated business units.",
      requirements: "Proven work experience as an HR Business Partner or HR Manager. Excellent people management skills. Strong analytical and problem-solving skills. Bachelor's or Master's in Human Resources.",
      responsibilities: "Consult with line management providing daily HR guidance. Analyze trends and metrics. Resolve complex employee relations issues. Work closely with management and employees to improve work relationships, build morale, and increase productivity and retention.",
      benefits: "Comprehensive health insurance, flexible working hours, annual bonus, performance incentives, professional development budget.",
      status: "PUBLISHED",
    },
  });

  const job2 = await prisma.jobListing.upsert({
    where: { slug: "lead-advertising-strategist" },
    update: {},
    create: {
      title: "Lead Advertising Strategist",
      slug: "lead-advertising-strategist",
      department: "Vaivas Ads",
      location: "Bengaluru / Hybrid",
      employmentType: "Full-time",
      experienceLevel: "4-7 years",
      openings: 1,
      salaryRange: "₹14,00,000 - ₹20,00,000 P.A.",
      description: "Join Vaivas Ads to architect high-conversion digital advertising campaigns and lead creative brand storytelling for diverse clients.",
      requirements: "Experience running high-budget Google and Meta ad campaigns. Deep knowledge of performance marketing, CAC, LTV and ROAS tracking. Strong creative brief writing skills.",
      responsibilities: "Develop overarching media strategies for national and regional brands. Lead the creative and media buying teams. Present quarterly reviews to client leadership.",
      benefits: "Health coverage, annual retreat, performance bonuses, modern equipment allowance.",
      status: "PUBLISHED",
    },
  });

  const job3 = await prisma.jobListing.upsert({
    where: { slug: "talent-acquisition-specialist" },
    update: {},
    create: {
      title: "Talent Acquisition Specialist",
      slug: "talent-acquisition-specialist",
      department: "HR Recruitment",
      location: "Hyderabad, Telangana",
      employmentType: "Full-time",
      experienceLevel: "2-5 years",
      openings: 3,
      salaryRange: "₹6,00,000 - ₹10,00,000 P.A.",
      description: "Seeking enthusiastic recruiters to connect top-tier tech and business professionals with leading enterprises across India.",
      requirements: "Hands-on experience in full-cycle recruitment for IT / Non-IT sectors. Familiarity with job portals and LinkedIn Recruiter. Excellent communication.",
      responsibilities: "Source candidates through online channels. Screen resumes and conduct preliminary interviews. Coordinate interview rounds with client hiring managers.",
      benefits: "Competitive uncapped incentives, medical insurance, career growth roadmap.",
      status: "PUBLISHED",
    },
  });

  // 5. Candidate Profiles & Applications
  const candidate1 = await prisma.candidateProfile.upsert({
    where: { email: "priya.sharma@example.com" },
    update: {},
    create: {
      fullName: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98451 23456",
      currentRole: "HR Manager",
      preferredRole: "Senior HR Business Partner",
      totalExperience: "6 years",
      keySkills: "Talent Management, Strategic HR, Employee Engagement, POSH Compliance",
      currentCompany: "TechnoWorld Solutions",
      expectedSalary: "₹15,00,000 P.A.",
      preferredLocation: "Bengaluru",
      availability: "30 days",
      resumeUrl: "resume_priya_sharma.pdf",
      resumeOriginalName: "Priya_Sharma_Resume.pdf",
      notes: "Strong candidate with top MNC background.",
    },
  });

  await prisma.jobApplication.create({
    data: {
      jobId: job1.id,
      candidateId: candidate1.id,
      fullName: candidate1.fullName,
      email: candidate1.email,
      phone: candidate1.phone,
      experience: "6 years in HR leadership",
      coverLetter: "I have 6 years of experience partnering with engineering and business leaders across Bengaluru.",
      resumeUrl: candidate1.resumeUrl!,
      resumeOriginalName: candidate1.resumeOriginalName!,
      status: "SHORTLISTED",
    },
  });

  // 6. Employer Requirement & Candidate Match (HR Operations)
  const req1 = await prisma.employerRequirement.create({
    data: {
      companyName: "Zenith Retail India Pvt Ltd",
      contactPerson: "Rajesh Varma",
      email: "rajesh.varma@zenithretail.in",
      phone: "+91 99123 45678",
      jobRole: "Regional HR Manager",
      location: "Bengaluru",
      openings: 1,
      experience: "5-8 years",
      skills: "Retail HR, Talent Acquisition, Labor Compliance",
      employmentType: "Full-time",
      hiringTimeline: "Immediate to 30 days",
      budgetRange: "₹14,00,000 - ₹18,00,000 P.A.",
      status: "ACTIVE",
      assignedRecruiterId: adminUser.id,
      assignedRecruiterName: adminUser.name,
      notes: "Urgent requirement for their south region expansion.",
    },
  });

  const match1 = await prisma.candidateMatch.create({
    data: {
      employerRequirementId: req1.id,
      candidateId: candidate1.id,
      status: "INTERVIEW_SCHEDULED",
      currentSalary: "₹12,00,000 P.A.",
      offeredSalary: "₹16,00,000 P.A.",
      recruiterNotes: "Candidate cleared screening; scheduled for 1st round with Zenith Retail HR Director.",
    },
  });

  await prisma.interview.create({
    data: {
      candidateMatchId: match1.id,
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      mode: "Virtual / Google Meet",
      round: "Technical & Leadership Round",
      interviewerName: "Anand Murthy (HR Director)",
      interviewerEmail: "anand.m@zenithretail.in",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      feedback: "Preliminary profile review looks very solid.",
      result: "PENDING",
      nextAction: "Complete round 1 interview evaluation",
    },
  });

  // 7. Ad Campaigns for Vaivas Ads
  await prisma.adCampaign.createMany({
    data: [
      {
        title: "Everwell Wellness — Brand Identity & Packaging",
        clientName: "Everwell Organics",
        category: "Branding",
        summary: "Comprehensive visual branding, premium stationery and sustainable packaging design.",
        deliverables: "Logo system, eco-friendly box packaging, store branding",
        coverImage: "/images/ads-work-1.jpg",
        images: ["/images/ads-work-1.jpg"],
        resultsMetrics: "+180% retail shelf recall, 45,000 units sold in quarter 1",
        isFeatured: true,
        isPublished: true,
        order: 1,
      },
      {
        title: "Clean Energy India — Pan-India Digital Awareness",
        clientName: "Clean Energy Solutions",
        category: "Digital Ads",
        summary: "Multi-channel digital marketing drive across Google Search, YouTube and LinkedIn.",
        deliverables: "High-CTR search campaigns, motion graphic videos, targeted landing pages",
        coverImage: "/images/ads-work-2.jpg",
        images: ["/images/ads-work-2.jpg"],
        resultsMetrics: "2.4M reach, 14,200 leads generated at 32% lower CPL",
        isFeatured: true,
        isPublished: true,
        order: 2,
      },
      {
        title: "Corporate Calendar & Executive Stationery Suite 2026",
        clientName: "MetroCorp Financial",
        category: "Print Media",
        summary: "Custom desktop and wall calendars, gold-foiled diaries and executive stationery sets.",
        deliverables: "Wall calendars, desk stands, customized diaries, premium packaging",
        coverImage: "/images/ads-work-3.jpg",
        images: ["/images/ads-work-3.jpg"],
        resultsMetrics: "5,000 corporate sets produced and delivered nationwide on schedule",
        isFeatured: true,
        isPublished: true,
        order: 3,
      },
    ],
  });

  // 8. Blogs matching the preview
  await prisma.blogPost.createMany({
    data: [
      {
        title: "How to Prepare for Your Next Career Opportunity",
        slug: "how-to-prepare-for-your-next-career-opportunity",
        category: "CAREERS",
        excerpt: "Practical tips to help you build skills, confidence and stand out in today's competitive job market.",
        content: `In an evolving job landscape, standing out requires more than just submitting a generic resume. Employers seek professionals who showcase adaptability, continuous learning, and clear impact.

### 1. Tailor Your Value Proposition
Align your achievements with the specific challenges of your target industry. Quantify your contributions with tangible outcomes.

### 2. Sharpen In-Demand Capabilities
Continuous upskilling in modern digital tools, collaborative frameworks, and industry trends ensures you stay ahead.

### 3. Build Authentic Professional Connections
Networking is about adding mutual value. Engage in meaningful industry discussions and demonstrate domain curiosity.`,
        authorName: "Ananya Deshmukh",
        authorRole: "Senior Career Consultant",
        coverImage: "/images/blog-1.jpg",
        tags: ["Careers", "Job Search", "Interview Tips"],
        readTimeMinutes: 4,
        isPublished: true,
      },
      {
        title: "The Power of a Strong Brand in a Digital World",
        slug: "the-power-of-a-strong-brand-in-a-digital-world",
        category: "BRANDING",
        excerpt: "Discover how creative storytelling can help businesses connect, engage and grow in meaningful ways.",
        content: `Today's consumers interact with hundreds of touchpoints daily. A memorable brand identity cuts through the clutter by establishing emotional resonance and credibility.

### Clarity Over Complexity
The most enduring brands deliver a simple, authentic message that addresses core human needs.

### Visual and Verbal Consistency
From digital ad creatives to print stationery, maintaining brand harmony builds trust and lasting brand equity.`,
        authorName: "Rohan Kapoor",
        authorRole: "Creative Director",
        coverImage: "/images/blog-2.jpg",
        tags: ["Branding", "Marketing Strategy", "Design"],
        readTimeMinutes: 5,
        isPublished: true,
      },
      {
        title: "Modern Recruitment Strategies for High-Growth Enterprises",
        slug: "modern-recruitment-strategies-for-high-growth-enterprises",
        category: "HR & TALENT",
        excerpt: "Why cultural alignment, candidate experience, and proactive talent pipelining are transforming corporate hiring.",
        content: `High-performing organizations don't wait for job openings to search for talent. They cultivate ongoing relationships with exceptional professionals and streamline their hiring workflows for speed and empathy.`,
        authorName: "Vaivas HR Editorial",
        authorRole: "Talent Advisory",
        coverImage: "/images/blog-3.jpg",
        tags: ["Recruitment", "HR Strategy", "Talent Acquisition"],
        readTimeMinutes: 4,
        isPublished: true,
      },
    ],
  });

  // 9. Gallery Items
  await prisma.galleryItem.createMany({
    data: [
      {
        title: "Strategic Planning Workshop 2026",
        category: "Office Life",
        imageUrl: "/images/gallery-1.jpg",
        caption: "Our cross-functional teams collaborating on the annual strategic roadmap.",
        order: 1,
        isPublished: true,
      },
      {
        title: "Annual Team Meet & Excellence Awards",
        category: "Team Celebrations",
        imageUrl: "/images/gallery-2.jpg",
        caption: "Celebrating outstanding achievements and dedicated contributions across all three pillars.",
        order: 2,
        isPublished: true,
      },
      {
        title: "Creative Studio Jam Session",
        category: "Office Life",
        imageUrl: "/images/gallery-3.jpg",
        caption: "Vaivas Ads designers and copywriters brainstorming the next big campaign.",
        order: 3,
        isPublished: true,
      },
    ],
  });

  // 10. Testimonials matching the preview
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: "Sanjay Singhania",
        designation: "Managing Director",
        company: "Everwell Wellness",
        testimonialType: "Client",
        content: "A professional and reliable team. Vaivas Ventures truly understands people's needs and delivers with care and commitment.",
        rating: 5,
        isFeatured: true,
        isApproved: true,
        order: 1,
      },
      {
        clientName: "Meenakshi Sundaram",
        designation: "Head of Talent Acquisition",
        company: "Apex Global Logistics",
        testimonialType: "Employer",
        content: "The HR Recruitment team at Vaivas closed three critical leadership positions for us within 20 days. Their candidate screening and transparency are unmatched.",
        rating: 5,
        isFeatured: true,
        isApproved: true,
        order: 2,
      },
      {
        clientName: "Vikram Malhotra",
        designation: "Product Lead",
        company: "TechSpire",
        testimonialType: "Candidate",
        content: "Vaivas Jobs connected me to a career-defining role. The recruitment team guided me through each interview stage with incredible support.",
        rating: 5,
        isFeatured: true,
        isApproved: true,
        order: 3,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
