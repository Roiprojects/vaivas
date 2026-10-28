# Graph Report - vaivas  (2026-10-28)

## Corpus Check
- 129 files · ~1,042,967 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .example 1, .prisma 1)

## Summary
- 502 nodes · 1120 edges · 29 communities (26 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b0b24386`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- prisma.ts
- [id]/route.ts
- package.json
- compilerOptions
- applications/page.tsx
- devDependencies
- dependencies
- AdsAdminHeader
- billing/page.tsx
- leads/page.tsx
- enquiries/page.tsx
- orders/page.tsx
- seed.ts
- next
- README.md
- admin/blogs/page.tsx
- admin/jobs/page.tsx
- postcss.config.mjs
- quotations/page.tsx
- dispatch/page.tsx
- admin/ads/services/page.tsx
- remove_logo_backgrounds.py
- ads/settings/page.tsx
- AdminNavShell.tsx
- scripts
- eslint.config.mjs
- app/page.tsx
- tailwindcss

## God Nodes (most connected - your core abstractions)
1. `react` - 91 edges
2. `next` - 79 edges
3. `lucide-react` - 70 edges
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

## Communities (29 total, 3 thin omitted)

### Community 0 - "react"
Cohesion: 0.06
Nodes (46): lucide-react, react, AboutPage(), metadata, revalidate, revalidate, BlogsPage(), getBlogs() (+38 more)

### Community 1 - "prisma.ts"
Cohesion: 0.05
Nodes (40): AdminActivityLogsPage(), dynamic, metadata, AdminUsersPage(), dynamic, metadata, GET(), GET() (+32 more)

### Community 2 - "[id]/route.ts"
Cohesion: 0.24
Nodes (7): GET(), ResumeDownloadProps, POST(), POST(), getPrivateResumePath(), savePrivateResume(), STORAGE_DIR

### Community 3 - "package.json"
Cohesion: 0.11
Nodes (17): name, pnpm, onlyBuiltDependencies, private, version, jsonwebtoken, postcss, prisma (+9 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "applications/page.tsx"
Cohesion: 0.43
Nodes (5): AdminApplicationsPage(), getApplications(), revalidate, AdminApplicationsManager(), Application

### Community 6 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, eslint, eslint-config-next, postcss, prisma, tailwindcss, @types/bcryptjs, @types/jsonwebtoken (+4 more)

### Community 7 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, bcryptjs, framer-motion, jsonwebtoken, lucide-react, next, @prisma/client, react (+4 more)

### Community 8 - "AdsAdminHeader"
Cohesion: 0.17
Nodes (13): AdminAdsBlogsPage(), metadata, revalidate, AdminAdsCaseStudiesPage(), metadata, revalidate, AdsDashboardPage(), getDashboardData() (+5 more)

### Community 9 - "billing/page.tsx"
Cohesion: 0.32
Nodes (6): AdminAdsBillingPage(), metadata, revalidate, AdminAdsBillingManager(), BillingRecord, OrderSummary

### Community 10 - "leads/page.tsx"
Cohesion: 0.38
Nodes (5): AdminAdsLeadsPage(), metadata, revalidate, AdminAdsLeadsManager(), Lead

### Community 11 - "enquiries/page.tsx"
Cohesion: 0.10
Nodes (17): AdminEnquiriesPage(), getEnquiries(), revalidate, AdminGalleryPage(), getGallery(), revalidate, AdminDashboardPage(), getDashboardStats() (+9 more)

### Community 12 - "orders/page.tsx"
Cohesion: 0.38
Nodes (5): AdminAdsOrdersPage(), metadata, revalidate, AdminAdsOrdersManager(), Order

### Community 13 - "seed.ts"
Cohesion: 0.25
Nodes (4): prisma, prisma, bcryptjs, @prisma/client

### Community 14 - "next"
Cohesion: 0.06
Nodes (50): nextConfig, next, AdsAboutPage(), metadata, AdsCaseStudiesPage(), getCaseStudies(), metadata, revalidate (+42 more)

### Community 15 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 16 - "admin/blogs/page.tsx"
Cohesion: 0.67
Nodes (3): AdminBlogsPage(), getBlogs(), revalidate

### Community 17 - "admin/jobs/page.tsx"
Cohesion: 0.14
Nodes (14): AdminHomePage(), getHomeContent(), revalidate, AdminRecruitmentPage(), getRecruitmentData(), revalidate, AdminJobsPage(), getJobs() (+6 more)

### Community 19 - "quotations/page.tsx"
Cohesion: 0.38
Nodes (5): AdminAdsQuotationsPage(), metadata, revalidate, AdminAdsQuotationsManager(), Quotation

### Community 20 - "dispatch/page.tsx"
Cohesion: 0.32
Nodes (6): AdminAdsDispatchPage(), metadata, revalidate, AdminAdsDispatchManager(), OrderOption, Shipment

### Community 21 - "admin/ads/services/page.tsx"
Cohesion: 0.38
Nodes (5): AdminAdsServicesPage(), metadata, revalidate, AdminAdsServicesManager(), Service

### Community 23 - "ads/settings/page.tsx"
Cohesion: 0.38
Nodes (5): AdminAdsSettingsPage(), metadata, revalidate, AdminAdsSettingsEditor(), SettingProps

### Community 24 - "AdminNavShell.tsx"
Cohesion: 0.43
Nodes (5): AdminLayout(), metadata, AdminNavShell(), AdminNavShellProps, AdminSessionUser

### Community 27 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, postinstall, start

### Community 28 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 34 - "app/page.tsx"
Cohesion: 0.11
Nodes (20): framer-motion, three, metadata, RootLayout(), getHomeData(), HomePage(), ScrollReveal(), ScrollRevealProps (+12 more)

## Knowledge Gaps
- **11 isolated node(s):** `@types/three`, `react-dom`, `zod`, `@types/bcryptjs`, `@types/jsonwebtoken` (+6 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 206 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `prisma.ts`, `app/page.tsx`, `package.json`, `applications/page.tsx`, `AdsAdminHeader`, `billing/page.tsx`, `leads/page.tsx`, `enquiries/page.tsx`, `orders/page.tsx`, `next`, `admin/blogs/page.tsx`, `admin/jobs/page.tsx`, `quotations/page.tsx`, `dispatch/page.tsx`, `admin/ads/services/page.tsx`, `ads/settings/page.tsx`, `AdminNavShell.tsx`?**
  _High betweenness centrality (0.253) - this node is a cross-community bridge._
- **What connects `@types/three`, `react-dom`, `zod` to the rest of the system?**
  _11 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.05639097744360902 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `react`, `prisma.ts`, `[id]/route.ts`, `package.json`, `app/page.tsx`, `AdsAdminHeader`, `billing/page.tsx`, `leads/page.tsx`, `enquiries/page.tsx`, `orders/page.tsx`, `admin/blogs/page.tsx`, `admin/jobs/page.tsx`, `quotations/page.tsx`, `dispatch/page.tsx`, `admin/ads/services/page.tsx`, `AdminNavShell.tsx`?**
  _High betweenness centrality (0.221) - this node is a cross-community bridge._
- **Should `prisma.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.050140056022408966 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `react` to `prisma.ts`, `app/page.tsx`, `package.json`, `applications/page.tsx`, `AdsAdminHeader`, `billing/page.tsx`, `leads/page.tsx`, `enquiries/page.tsx`, `orders/page.tsx`, `next`, `admin/blogs/page.tsx`, `admin/jobs/page.tsx`, `quotations/page.tsx`, `dispatch/page.tsx`, `admin/ads/services/page.tsx`, `ads/settings/page.tsx`, `AdminNavShell.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._