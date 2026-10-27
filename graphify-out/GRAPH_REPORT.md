# Graph Report - vaivas  (2026-10-27)

## Corpus Check
- 122 files · ~753,891 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .example 1, .prisma 1)

## Summary
- 473 nodes · 1065 edges · 37 communities (31 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bb74f597`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- next
- [id]/route.ts
- package.json
- compilerOptions
- applications/page.tsx
- devDependencies
- dependencies
- AdsAdminHeader
- users/page.tsx
- enquiries/page.tsx
- prisma.ts
- seed.ts
- next
- README.md
- admin/blogs/page.tsx
- app/layout.tsx
- postcss.config.mjs
- billing/page.tsx
- dispatch/page.tsx
- leads/page.tsx
- orders/page.tsx
- quotations/page.tsx
- admin/ads/services/page.tsx
- ads/settings/page.tsx
- scripts
- eslint.config.mjs
- admin/gallery/page.tsx
- admin/page.tsx
- admin/settings/page.tsx
- admin/testimonials/page.tsx
- admin/jobs/page.tsx
- tailwindcss
- admin/about/page.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 85 edges
2. `next` - 79 edges
3. `lucide-react` - 69 edges
4. `prisma` - 64 edges
5. `getAdminSession()` - 36 edges
6. `PublicLayout()` - 31 edges
7. `AdsFooter()` - 29 edges
8. `AdsNavbar()` - 29 edges
9. `AdsAdminHeader()` - 23 edges
10. `logActivity()` - 20 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `PublicLayout()`  [EXTRACTED]
  src/app/about/page.tsx → src/components/PublicLayout.tsx
- `AdminAdsBillingPage()` --calls--> `AdsAdminHeader()`  [EXTRACTED]
  src/app/admin/ads/billing/page.tsx → src/components/admin/AdsAdminHeader.tsx
- `AdminAdsBlogsPage()` --calls--> `AdsAdminHeader()`  [EXTRACTED]
  src/app/admin/ads/blogs/page.tsx → src/components/admin/AdsAdminHeader.tsx
- `AdminAdsCaseStudiesPage()` --calls--> `AdsAdminHeader()`  [EXTRACTED]
  src/app/admin/ads/case-studies/page.tsx → src/components/admin/AdsAdminHeader.tsx
- `AdminAdsDispatchPage()` --calls--> `AdsAdminHeader()`  [EXTRACTED]
  src/app/admin/ads/dispatch/page.tsx → src/components/admin/AdsAdminHeader.tsx

## Import Cycles
- None detected.

## Communities (37 total, 6 thin omitted)

### Community 0 - "react"
Cohesion: 0.06
Nodes (47): lucide-react, react, AboutPage(), metadata, revalidate, BlogsPage(), getBlogs(), metadata (+39 more)

### Community 1 - "next"
Cohesion: 0.09
Nodes (40): AdminActivityLogsPage(), dynamic, metadata, AdminLayout(), metadata, GET(), GET(), PATCH() (+32 more)

### Community 2 - "[id]/route.ts"
Cohesion: 0.24
Nodes (7): GET(), ResumeDownloadProps, POST(), POST(), getPrivateResumePath(), savePrivateResume(), STORAGE_DIR

### Community 3 - "package.json"
Cohesion: 0.12
Nodes (16): name, pnpm, onlyBuiltDependencies, private, version, jsonwebtoken, postcss, prisma (+8 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "applications/page.tsx"
Cohesion: 0.14
Nodes (14): AdminApplicationsPage(), getApplications(), revalidate, AdminHomePage(), getHomeContent(), revalidate, AdminRecruitmentPage(), getRecruitmentData() (+6 more)

### Community 6 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, eslint, eslint-config-next, postcss, prisma, tailwindcss, @types/bcryptjs, @types/jsonwebtoken (+4 more)

### Community 7 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, bcryptjs, jsonwebtoken, lucide-react, next, @prisma/client, react, react-dom (+1 more)

### Community 8 - "AdsAdminHeader"
Cohesion: 0.17
Nodes (13): AdminAdsBlogsPage(), metadata, revalidate, AdminAdsCaseStudiesPage(), metadata, revalidate, AdsDashboardPage(), getDashboardData() (+5 more)

### Community 9 - "users/page.tsx"
Cohesion: 0.32
Nodes (6): AdminUsersPage(), dynamic, metadata, AdminUser, AdminUsersManager(), AdminUsersManagerProps

### Community 11 - "enquiries/page.tsx"
Cohesion: 0.43
Nodes (5): AdminEnquiriesPage(), getEnquiries(), revalidate, AdminEnquiriesManager(), Enquiry

### Community 12 - "prisma.ts"
Cohesion: 0.10
Nodes (3): nextConfig, next, globalForPrisma

### Community 13 - "seed.ts"
Cohesion: 0.25
Nodes (4): prisma, prisma, bcryptjs, @prisma/client

### Community 14 - "next"
Cohesion: 0.06
Nodes (48): AdsAboutPage(), metadata, AdsCaseStudiesPage(), getCaseStudies(), metadata, revalidate, AdsCaseStudyDetailPage(), PageProps (+40 more)

### Community 15 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 16 - "admin/blogs/page.tsx"
Cohesion: 0.67
Nodes (3): AdminBlogsPage(), getBlogs(), revalidate

### Community 17 - "app/layout.tsx"
Cohesion: 0.47
Nodes (3): metadata, RootLayout(), MobileAppDock()

### Community 19 - "billing/page.tsx"
Cohesion: 0.32
Nodes (6): AdminAdsBillingPage(), metadata, revalidate, AdminAdsBillingManager(), BillingRecord, OrderSummary

### Community 20 - "dispatch/page.tsx"
Cohesion: 0.32
Nodes (6): AdminAdsDispatchPage(), metadata, revalidate, AdminAdsDispatchManager(), OrderOption, Shipment

### Community 21 - "leads/page.tsx"
Cohesion: 0.38
Nodes (5): AdminAdsLeadsPage(), metadata, revalidate, AdminAdsLeadsManager(), Lead

### Community 22 - "orders/page.tsx"
Cohesion: 0.38
Nodes (5): AdminAdsOrdersPage(), metadata, revalidate, AdminAdsOrdersManager(), Order

### Community 23 - "quotations/page.tsx"
Cohesion: 0.38
Nodes (5): AdminAdsQuotationsPage(), metadata, revalidate, AdminAdsQuotationsManager(), Quotation

### Community 24 - "admin/ads/services/page.tsx"
Cohesion: 0.38
Nodes (5): AdminAdsServicesPage(), metadata, revalidate, AdminAdsServicesManager(), Service

### Community 25 - "ads/settings/page.tsx"
Cohesion: 0.38
Nodes (5): AdminAdsSettingsPage(), metadata, revalidate, AdminAdsSettingsEditor(), SettingProps

### Community 27 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, postinstall, start

### Community 28 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 29 - "admin/gallery/page.tsx"
Cohesion: 0.67
Nodes (3): AdminGalleryPage(), getGallery(), revalidate

### Community 30 - "admin/page.tsx"
Cohesion: 0.67
Nodes (3): AdminDashboardPage(), getDashboardStats(), revalidate

### Community 31 - "admin/settings/page.tsx"
Cohesion: 0.67
Nodes (3): AdminSettingsPage(), getSettings(), revalidate

### Community 32 - "admin/testimonials/page.tsx"
Cohesion: 0.67
Nodes (3): AdminTestimonialsPage(), getTestimonials(), revalidate

### Community 34 - "admin/jobs/page.tsx"
Cohesion: 0.43
Nodes (5): AdminJobsPage(), getJobs(), revalidate, AdminJobsManager(), Job

## Knowledge Gaps
- **10 isolated node(s):** `react-dom`, `zod`, `@types/bcryptjs`, `@types/jsonwebtoken`, `@types/node` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 196 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `next`, `package.json`, `applications/page.tsx`, `AdsAdminHeader`, `users/page.tsx`, `enquiries/page.tsx`, `next`, `admin/blogs/page.tsx`, `app/layout.tsx`, `billing/page.tsx`, `dispatch/page.tsx`, `leads/page.tsx`, `orders/page.tsx`, `quotations/page.tsx`, `admin/ads/services/page.tsx`, `ads/settings/page.tsx`, `admin/gallery/page.tsx`, `admin/page.tsx`, `admin/settings/page.tsx`, `admin/testimonials/page.tsx`, `admin/jobs/page.tsx`, `admin/about/page.tsx`?**
  _High betweenness centrality (0.237) - this node is a cross-community bridge._
- **What connects `react-dom`, `zod`, `@types/bcryptjs` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.05878332194121668 - nodes in this community are weakly interconnected._
- **Why does `next` connect `prisma.ts` to `react`, `next`, `[id]/route.ts`, `package.json`, `applications/page.tsx`, `AdsAdminHeader`, `users/page.tsx`, `quotations/route.ts`, `next`, `admin/blogs/page.tsx`, `app/layout.tsx`, `billing/page.tsx`, `dispatch/page.tsx`, `leads/page.tsx`, `orders/page.tsx`, `quotations/page.tsx`, `admin/ads/services/page.tsx`, `admin/gallery/page.tsx`, `admin/page.tsx`, `dispatch/route.ts`, `admin/jobs/page.tsx`, `admin/about/page.tsx`, `leads/route.ts`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.09014675052410902 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `react` to `next`, `package.json`, `applications/page.tsx`, `AdsAdminHeader`, `users/page.tsx`, `enquiries/page.tsx`, `next`, `admin/blogs/page.tsx`, `app/layout.tsx`, `billing/page.tsx`, `dispatch/page.tsx`, `leads/page.tsx`, `orders/page.tsx`, `quotations/page.tsx`, `admin/ads/services/page.tsx`, `ads/settings/page.tsx`, `admin/gallery/page.tsx`, `admin/page.tsx`, `admin/settings/page.tsx`, `admin/testimonials/page.tsx`, `admin/jobs/page.tsx`, `admin/about/page.tsx`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._