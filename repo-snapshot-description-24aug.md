# Wepho repo snapshot — 24 Aug 2026

Marketing site for a custom wedding-app studio (~$2,000 per one-night app). Not the guest-facing apps themselves.

## Implemented

- **Routes**: `/` (homepage), `/planners`, `/apps` + `/apps/[slug]` (13 statically generated app pages), `/moodboard` (interactive brief wizard), `/blog` + `/blog/[slug]` (33 draft posts), `/privacy`, `/terms`, `/dev/phone/[slug]` (screenshot helper).
- **Homepage sections**: hero, three story beats, two frontend demos (Love Letter Machine, Who Said It?), 6-card app gallery teaser, HowItWorks, SixRules, PaperReframe, PlannersCallout, FinalCta.
- **Per-app marketing pages** composed from `components/app-page/*` (hero, big-screen scene, phone scene, chronology, why-not-paper, how-it-works, question types, make-it-yours, book-it, FAQ, next/prev).
- **Interactive demos** (`components/demo/`): PhoneFrame + BigScreenFrame + AdminFrame device shells; Love Letter and Who Said It flows fully client-side, no backend.
- **Moodboard wizard** (`components/moodboard/`): 6 steps (Vibes, Guests, Moments, Feelings, Story, Wildcard), localStorage autosave (30-day TTL), resume banner, always-visible "Talk to us" pill, brief preview panel, results screen. LLM matching via `/api/moodboard/match` (OpenRouter → Claude Haiku 4.5) returning top matches + hidden matches + a 3-word summary; email-gated brief delivery via `/api/moodboard/brief` (dual send: studio + confirmation to couple, no persistence).
- **Contact**: `/api/contact` → Nodemailer/SMTP. Same mailer reused by moodboard brief route.
- **GDPR cookie consent** (`components/consent/`, `lib/consentStore.js`, `lib/consentRegion.js`): region-aware banner, preferences modal, essential/analytics/marketing categories, localStorage-backed store.
- **Analytics shim** (`lib/analytics.js`): thin `trackEvent` wrapper around Vercel Analytics `window.va` — used by the moodboard flow.
- **SEO plumbing**: `generateMetadata` on every route, `app/sitemap.js` including apps + blog posts, `robots.js`, `public/llms.txt` + `public/llms-full.txt` (LLM-facing site summary generated from `data/apps.js` + `data/posts.js`, noting only 13 of 20 apps are live).
- **Data layer** (JSON-in-JS, no DB): `data/apps.js` (1.8k lines, 13 live apps + copy per section), `data/posts.js` (33 blog stubs), `data/faqs.js` (1.1k lines), `data/hidden-ideas.js`.
- **Design tokens**: Tailwind v4 + CSS custom properties in `app/globals.css` as source of truth; `<Container>` + `.section-py` rhythm enforced by CLAUDE.md.
- **Distribution kit** (`distribution/`): platforms overview, Pinterest pin drafts (39, generated from live apps), Reddit post drafts + rules, planner cold-email templates, 33-essay blog plan + republish checklist, SEO keyword research (`.enriched.shortlist.json`, keyword→page map, internal linking plan, FAQ bank), AI-SEO plan (per-route LLM-visibility audit, 60 probe questions, DataForSEO probe runbook).
- **Scripts** (`scripts/*.mjs`): DataForSEO AI probe, keyword-volume enrichment, placeholder-image fetch, reddit thread scraper, ZoomInfo planner scraper.

## WIP / not done

- Moodboard **`?brief=` share URL is generated but never consumed on load** — round-trip incomplete (called out in blotter and `zz/moodboard-persistence-and-cta.md`).
- Only **13 of the 20 planned apps** have live `/apps/[slug]` pages (`!skip` filter in `getApps.js`). Pinterest/pins generation and `llms-full.txt` both flag this.
- Homepage still has commented `PriceReframe` (T24) and `Testimonials` (T25) slots.
- All 33 blog posts are `draft: true` (badge on index, `noindex,nofollow` on slug pages) — outlines only, no full bodies.
- Photography is placeholder SVG (`next.config.mjs` allows dangerous SVG) — real photos not yet swapped in per `photo-plan.md`.
- `todo-pre-launch.md` open items: em-dash / AI-ism cleanup pass across all copy, responsiveness sweep, "switch out wepho everywhere" (naming), verify SSR of key content.
- LLM audit (`distribution/ai-seo/llm-audit.md`) flags `/moodboard` as critical (no `<main>`, no `<h1>`, JS-only), `/apps/[slug]` missing `<article>` + key-facts block, `SixRules` + `AppGalleryFull` needing `<ul>`/`<li>` conversion.
- PostHog wired **not** connected (only Vercel Analytics `window.va` shim); analytics-plan.md is proposal, not implementation.
- Contact-form spam protection, rate limiting on `/api/contact`, and analytics of form conversion not implemented.
- No tests anywhere (no `test/`, no runner in `package.json`).

## Technical implementation (brief)

- **Next.js 16 App Router**, React 19, **JavaScript only** (no TS by rule), Tailwind v4 + CSS-first tokens, pnpm, deployed on Vercel.
- Server components by default; `'use client'` only in moodboard wizard, demos, consent banner, some hooks.
- Static generation for `/apps/[slug]` and `/blog/[slug]` via `generateStaticParams`.
- Moodboard matching uses **OpenRouter → Claude Haiku 4.5** with a hard-coded fallback response, in-memory IP rate limit (10/hr, resets on cold start), and schema validation of the model's JSON.
- Mail via Nodemailer SMTP (`lib/mailer.js`) — brief route intentionally does not persist any answers; retention opt-in flag toggles a "KEEP" tag in the studio-facing email subject/banner instead of touching a store.
- Consent state lives in `localStorage` under `wepho-cookie-consent`; a small pub/sub in `consentStore.js` lets components subscribe.
- Data is checked-in JS objects (`data/*.js`) — no CMS, no DB.
- Router-level `robots.js`, `sitemap.js`; llms.txt + llms-full.txt generated by hand from data files.

## Technical cons / risks (vibe-code residue)

- **Inline `style={{…}}` everywhere** in newer components (moodboard wizard, blog pages, `MatchingLoader`) despite CLAUDE.md preferring Tailwind utilities backed by tokens. Two styling systems in parallel is drift-prone.
- **Data files are massive single-file blobs** — `data/apps.js` (1828 lines) and `data/faqs.js` (1139 lines) are hard to review, easy to break silently. No schema/validation on any of them.
- **No tests, no type checking, no lint config visible** — every regression must be caught by eyeball.
- **In-memory rate limit** in `/api/moodboard/match` is per-instance and resets on cold start — trivial to bypass on serverless. LLM-cost DoS is possible; no auth, no captcha, no per-email throttle.
- **OpenRouter API key** is read from env but there's no request-body size cap; the `answers` object is forwarded straight into the model prompt.
- **Brief email HTML is built with string interpolation** — user-supplied freeform text (guest list, story answers, email address) is dropped into `<em>"${v}"</em>` and subject lines with no HTML escaping. XSS/header-injection risk in the studio's own inbox.
- **Server-rendered SEO gap on `/moodboard`** — the wizard is entirely client-side, so LLM/search crawlers see essentially nothing.
- **`?brief=` deep-link is a broken promise** — generated but not restored on load; users who share the URL get an empty wizard.
- **Placeholder photography via `dangerouslyAllowSVG`** is a documented temporary but is currently enabled in prod config with a strict CSP mitigation — needs to be reverted the moment real images ship.
- **Two todo/planning files at repo root** (`todo.md`, `todo-pre-launch.md`, `todo-post-launch.md`, `todo-distribution.md`, `tasks.md`, `tasks-seo-gaps.md`, `blotter.md`, `prompts.md`, `thoughts.md`, `pre-launch.md`) — no single source of truth for "what's next."
- **13 vs 20 apps mismatch** shows up in copy ("all 20 app types"), llms.txt notes, sitemap, and pin generator — the `!skip` filter makes this quiet, not loud.
- **Consent store gates nothing yet** — the categories exist but no analytics/marketing SDKs actually consult them, so the banner is currently theater.
- **Blog posts are indexed in the sitemap** but per-slug `robots: noindex,nofollow` — Google will crawl and immediately drop them. Fine as intended, worth being explicit.
- **`app/dev/phone/[slug]`** is a dev-only screenshot helper shipped in the production route tree with no gating.
