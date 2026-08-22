# Technical SEO & Structured Data — Gap Analysis vs `tasks.md`

Audit of Epic 8 (and scattered SEO touchpoints in earlier epics) against a full technical-SEO checklist for a Next.js 16 marketing site. Focus: what's *in the plan*, what's *missing*, and what to add.

---

## What the plan already covers

| Area | Where | Notes |
|---|---|---|
| Per-route metadata (title, description, OG) | T7, T28, T31, T32, T66, T72 | `generateMetadata` on all routes; per-app titles/descriptions |
| Dynamic OG images | T73 | `ImageResponse`-based, parameterized per app |
| Sitemap (`app/sitemap.js`) | T9, T74 | All 22 URLs, `lastModified` |
| Robots (`app/robots.js`) | T9 | Allow all + sitemap reference |
| Static generation of `/apps/[slug]` | T3, T4, T32 | `generateStaticParams` — 20 pre-rendered pages |
| `next/image` + explicit dimensions + `alt` + `priority` | T75 | Standard image perf pass |
| `next/link` for internal links | CLAUDE.md convention | Enforced by convention |
| Lighthouse audit (Perf/A11y/BP/SEO) | T79 | Target SEO = 100 |
| `<html lang="en">` | T7 | Set in root layout |
| Reduced-motion + a11y (focus rings, contrast, form labels) | T76, T77 | A11y correlates with SEO |
| Custom 404 | T78 | On-brand, with recovery links |

**Zero structured data (JSON-LD) is currently in the plan.** No canonicals, no Twitter cards, no hreflang, no web-vitals monitoring, no `metadataBase`. These are the material gaps.

---

## Gaps — proposed additions (drop-in tasks for Epic 8)

### T80 — `metadataBase` + canonical URLs
- Set `metadata.metadataBase = new URL('https://wepho.com')` in `app/layout.js` — required for Next.js to resolve absolute OG/Twitter image URLs correctly.
- Add `alternates: { canonical: '<absolute-url>' }` to `generateMetadata` on `/`, `/planners`, `/apps`, and `/apps/[slug]`.
- Prevents duplicate-content issues from trailing slashes, query params (utm_*), and www vs apex.

### T81 — Twitter card metadata
- Add `twitter: { card: 'summary_large_image', title, description, images: [...] }` to every route's metadata.
- Uses the same OG image generated in T73.

### T82 — JSON-LD structured data (highest-value gap)
Add a small helper `components/seo/JsonLd.js` that renders `<script type="application/ld+json">`. Emit the following schemas:

- **Organization** (root layout, sitewide) — `@type: Organization`, name "Wepho", url, logo, sameAs (social if any), contactPoint with email.
- **WebSite** (root layout) — `@type: WebSite`, url, name, optional `potentialAction` (SearchAction) if internal search added later. Enables sitelinks.
- **Service** (homepage `/`) — `@type: Service`, serviceType "Custom Wedding Experience App", provider → Organization, areaServed, `offers` with `price: 2000`, `priceCurrency`.
- **Product** or **Service** per `/apps/[slug]` — one per app, with name (`app.title`), description, image (OG image), brand → Wepho, offers ($2000). Product is fine even though it's a service; Google accepts it and it unlocks rich results.
- **BreadcrumbList** on `/apps` and `/apps/[slug]` — Home → Explore apps → [App name].
- **FAQPage** on each `/apps/[slug]` — powered by `app.faq` (already planned in T39). Direct rich-result eligibility.
- **CollectionPage** + **ItemList** on `/apps` — list of the 20 apps.
- **LocalBusiness** — *skip unless there's a physical address*. Not applicable to a remote studio.

Validate everything with Google's Rich Results Test before shipping.

### T83 — Verification, favicons, PWA basics
- Add `icons` to root metadata: `icon`, `shortcut`, `apple` — reference files in `app/` (Next.js auto-detects `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`).
- Add `app/manifest.js` (or `manifest.json`) — name, short_name, theme_color, icons. Small SEO signal, unlocks "add to home screen."
- If using Google Search Console, add `verification: { google: '...' }` to metadata.

### T84 — Analytics + web-vitals monitoring
- Add Vercel Analytics or Plausible (privacy-friendly, no cookie banner needed) in `app/layout.js`.
- Wire `next/web-vitals` `useReportWebVitals` to log LCP / CLS / INP to the analytics endpoint — Lighthouse is a lab test; real-user metrics are what Search Console ranks on.
- Consider `next/third-parties` for GTM/GA if the user needs GA4.

### T85 — Preconnect / DNS-prefetch for third parties
- Google Fonts is loaded via `<link>` tags per T2 — confirm both `preconnect` (with `crossorigin`) and `dns-prefetch` are present.
- **Better:** migrate to `next/font/google` for Plus Jakarta Sans → self-hosted, zero external request, no CLS. Recommend this over the current `<link>` approach.
- Add `preconnect` for the SMTP or form provider only if it's called client-side (Nodemailer isn't, so no action needed there).

### T86 — Image responsiveness + modern formats
- Extend T75: ensure `next/image` uses `sizes` prop for responsive images (esp. hero + gallery cards) — otherwise Next serves oversized files.
- Confirm `next.config.js` has `images.formats: ['image/avif', 'image/webp']` (AVIF ships smaller).
- Add `loading="lazy"` (default) verified for below-the-fold images; `priority` only on LCP element.

### T87 — Enrich `sitemap.js`
Current T9 outputs `{ url, lastModified }`. Add:
- `changeFrequency` — `'monthly'` for marketing pages, `'yearly'` for evergreen app pages.
- `priority` — `1.0` for `/`, `0.9` for `/apps` and `/planners`, `0.7` for `/apps/[slug]`.
- Derive `lastModified` from git or a content-version constant, not `new Date()` on every request (which invalidates crawl signals).

### T88 — Redirects + trailing-slash policy
- Set `trailingSlash: false` (Next.js default) explicitly in `next.config.js` and document it.
- Add `redirects()` in `next.config.js` for any URL shape you want to consolidate (e.g., `/app/[slug]` → `/apps/[slug]` if you ever ship a typo). Empty is fine for launch, but the hook should exist.
- If launching with `www` and apex both live, add a permanent redirect to the canonical host at the DNS/Vercel level.

### T89 — Internal linking + breadcrumbs UI
- Render visible breadcrumbs on `/apps/[slug]` (Home › Explore apps › App name). Feeds the BreadcrumbList JSON-LD from T82 and improves crawl depth.
- Ensure every `/apps/[slug]` page links to at least 3 related apps (e.g., "Other apps with this vibe") — spreads PageRank across the 20 pages so none are orphaned.

### T90 — HTTP headers (security + SEO signal)
Configure in `next.config.js` `headers()`:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — deny camera/mic/geolocation (not used).
- Optional: `Content-Security-Policy` — nice-to-have for launch, mandatory later.

Google factors HTTPS + security headers into ranking indirectly (Core Web Vitals + trust).

### T91 — Content SEO for `/apps/[slug]` (already the SEO-primary route per CLAUDE.md)
- Ensure exactly one `<h1>` per page (the `AppHero` headline).
- Enforce heading hierarchy (`h2` for section titles, `h3` inside).
- Add descriptive URL-slugs (already done via `app.slug`).
- Ensure each app description is unique — no near-duplicates across the 20 pages (Google will drop dupes from the index).
- Target ~500–800 words per app page (the plan's section list roughly delivers this; verify after T40–T59 are filled).

### T92 — Search Console + Bing Webmaster onboarding
- Post-launch: verify domain, submit sitemap, monitor Coverage + Core Web Vitals reports.
- Not a code task, but belongs on the launch checklist.

---

## Suggested priority

**Must-have before launch:** T80 (canonicals), T81 (Twitter cards), T82 (JSON-LD — at minimum Organization + WebSite + per-app Product/FAQPage), T83 (icons/manifest), T86 (image `sizes`), T87 (sitemap enrichment), T90 (security headers).

**Should-have within 2 weeks of launch:** T84 (analytics + RUM), T85 (self-host font via `next/font`), T89 (breadcrumbs + related apps), T91 (content dedup check), T92 (Search Console).

**Nice-to-have:** T88 (redirects scaffold — trivial but low urgency until you have a URL to redirect).
