# Technical Implementations for AI Chatbot Visibility

Concrete, shippable technical work to make Wepho more discoverable and citable by ChatGPT, Claude, Perplexity, Google AI Overviews, Gemini, and Copilot.

---

## 1. `/llms.txt` (proposed standard, llmstxt.org)

A markdown file at the site root that gives LLMs a curated, token-efficient map of the site.

- **Path:** `/llms.txt` → served from `public/llms.txt` (or a Next.js route handler for dynamic generation).
- **Content:** H1 site name, blockquote summary, then bulleted links grouped by section (Homepage, App catalog, Per-app pages, Planners page, Contact).
- **Optional:** `/llms-full.txt` with full inlined markdown of the most important pages (homepage copy, the 20 app descriptions, planners pitch) so a model can answer without crawling.
- **Not yet honored by major crawlers**, but cheap to ship and future-proofing. Anthropic, Cloudflare, Zapier, Stripe already publish one.

## 2. `robots.txt` — explicitly allow AI crawlers

Currently ambiguous defaults can get us blocked. Whitelist the bots we want:

- `GPTBot` (OpenAI training + browsing)
- `OAI-SearchBot` (ChatGPT search citations)
- `ChatGPT-User` (on-demand fetch when a user asks ChatGPT about us)
- `ClaudeBot` / `Claude-User` / `Claude-SearchBot` (Anthropic)
- `PerplexityBot` and `Perplexity-User`
- `Google-Extended` (controls whether Google can use content for Gemini/AI Overviews training — must be **allowed**, not just Googlebot)
- `Applebot-Extended`
- `Bytespider`, `Amazonbot`, `CCBot` (optional; broader reach vs. training-only)

Update `app/robots.js` (or add `public/robots.txt`) with explicit `User-agent` + `Allow: /` blocks.

## 3. Structured data (JSON-LD) — the single biggest lever

LLMs and AI Overviews lean heavily on schema.org markup. Add JSON-LD via `<script type="application/ld+json">` in each route's server component.

- **`Organization`** (root layout): name Wepho, url, logo, sameAs (social profiles), contactPoint, areaServed.
- **`WebSite`** with `SearchAction` (root layout).
- **`Service`** on `/` and `/planners`: `serviceType: "Custom wedding web app"`, `provider`, `areaServed`, `offers` (price ~$2,000), `audience`.
- **`Product` or `CreativeWork`** on each `/apps/[slug]`: name, description, image, offers, brand=Wepho.
- **`FAQPage`** on any page with Q&A (planners page, per-app pages).
- **`BreadcrumbList`** on `/apps` and `/apps/[slug]`.
- **`ImageObject`** with `caption` + `contentUrl` for hero photos (helps Google AI Overviews attribute imagery).
- Validate with Google's Rich Results Test and schema.org validator.

## 4. Semantic HTML + clean content structure

LLMs parse the DOM; they reward clarity.

- One `<h1>` per page, logical `<h2>`/`<h3>` hierarchy.
- Real `<article>`, `<section>`, `<nav>`, `<main>`, `<aside>` landmarks.
- `<dl>`/`<dt>`/`<dd>` for feature lists; `<table>` for comparisons (vs. paper/analog).
- Descriptive `alt` text on every `next/image` (no decorative "photo1.jpg").
- Question-shaped H2s (e.g. "How much does a custom wedding app cost?") — matches how users prompt chatbots.

## 5. Metadata completeness

Already partly handled by `generateMetadata`. Verify per route:

- `title`, `description` (150–160 chars, benefit-led).
- `openGraph` (title, description, image 1200×630, url, type).
- `twitter` card (`summary_large_image`).
- `canonical` URL.
- `alternates` if any locale variants.
- `author`, `publisher` = "Wepho".

## 6. Server-rendered content (no client-only text)

Confirm all copy — especially the 20 app descriptions, testimonials, price mentions — is present in the initial HTML response, not injected after hydration. AI crawlers largely **do not execute JS** (ChatGPT-User does, GPTBot does not reliably). CLAUDE.md already mandates server components by default; audit `components/demo/` and interactive sections to ensure marketing copy isn't trapped inside `'use client'` trees.

## 7. Sitemap + freshness signals

- `app/sitemap.js` already exists — ensure it includes `/apps`, every `/apps/[slug]`, `/planners`, and sets `lastModified` from real file mtimes.
- Add `<lastmod>` accuracy so crawlers re-fetch after edits.
- Submit sitemap in Google Search Console and Bing Webmaster Tools (Bing powers ChatGPT and Copilot search).

## 8. Bing / IndexNow

ChatGPT search and Microsoft Copilot pull from Bing's index. Getting indexed there is disproportionately valuable.

- Verify site in **Bing Webmaster Tools**.
- Implement **IndexNow** (`/api/indexnow` route) — ping Bing/Yandex on content changes for near-instant indexing. Publish the key file at `/{key}.txt`.

## 9. Author / entity signals

LLMs weight source authority. Build the Wepho entity:

- Consistent NAP (name/address/phone) across site, Google Business Profile, LinkedIn, Instagram.
- `sameAs` array in `Organization` schema linking every profile.
- Founder/team page with `Person` schema — real names get cited more often than anonymous brands.
- Get listed in aggregators/directories (The Knot, WeddingWire, Zola vendor lists) — these are frequent LLM sources.

## 10. Performance & accessibility basics

- Core Web Vitals (LCP, INP, CLS) affect Googlebot crawl budget and, indirectly, AI Overview inclusion.
- Working `<a href>` links (not `onClick` navigation) so crawlers can follow.
- No hydration errors — they can truncate crawled content.

## 11. Content format that AI likes to quote

Not strictly "technical," but ships as page structure:

- TL;DR / summary block at top of long pages (per-app pages, planners page).
- Definition-style opening sentence: "Wepho is a custom wedding app studio that…"
- Specific numbers (price, guest counts, timings) — models cite concrete facts.
- Explicit comparison sections ("Wepho vs. off-the-shelf wedding apps").

---

## Priority order for Wepho

1. **JSON-LD** on layout + `/apps/[slug]` (`Organization`, `Service`, `Product`, `FAQPage`) — biggest citation lever.
2. **`robots.txt`** whitelist for AI bots + `Google-Extended`.
3. **`/llms.txt`** at site root.
4. **Bing Webmaster + IndexNow** — cheap, unlocks ChatGPT/Copilot.
5. **Metadata + semantic HTML audit** across all 20 app pages.
6. **Entity building** (Google Business Profile, directory listings, `sameAs`).
