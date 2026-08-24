# Distribution — Bulk Tasks Claude Code Can Run Now

*Generated 2026-08-24. Tasks derived from `distribution/` contents. Each is scoped so Claude Code can do it in a single pass with no live-account access, no paid API calls, and no ambiguous product decisions. Grouped by "one prompt handles the whole batch."*

---

## A. Pinterest — Bulk Pin Copy + Metadata

Anchor docs: `pins/pinterest.md`, `pins/pinterest-creative-ideas.md`, `pins/pinterest-business-examples.md`.

- **A1. Generate 60 pin drafts (3 per app × 20 apps)** as a single JSON file at `distribution/pins/pin-drafts.json`. Each row: `{ app_slug, pin_title (max 100 char), pin_description (200–500 char, keyword-rich), board, alt_text, destination_url (/apps/[slug]), vibe_tag, moment_tag }`. Source app data from `zz/info/20-apps.json` + `data/apps.js`.
> done
- **A2. Board plan** at `distribution/pins/board-plan.md` — 8–12 boards mapped to vibe filters (e.g. "Weddings that feel like a talk show"), each with board description, cover-image direction, and which app_slugs feed it.
> done
- **A3. Rich Pins prep checklist** at `distribution/pins/rich-pins-checklist.md` — list the exact `<meta>` tags each `/apps/[slug]` page needs for Article Rich Pins, plus the domain-claim HTML snippet, cross-referenced against the current `generateMetadata` in `app/apps/[slug]/page.js`.
- **A4. Pin-title A/B variants** — for the top-20 keywords in `distribution/seo/keywords-top-20.md`, produce 2 title variants per pin (specificity-first vs. curiosity-first) into `distribution/pins/pin-title-variants.md`.

---

## B. Instagram / Reels — Scripts + Captions in Bulk

Anchor doc: `ig/strategy.md`, brainstorm §4.

- **B1. 20 Reel scripts** (one per app) at `distribution/ig/reel-scripts.md`. Each script uses the "For the couple who…" opener from the brainstorm, is 15–30s, ends with app name + wepho URL. Include: hook line, on-screen text beats (timestamped), b-roll direction, CTA.
- **B2. 60 caption variants** at `distribution/ig/reel-captions.md` — 3 tones per Reel (dry-witty / earnest / punchy) with hashtag sets (5 broad + 5 niche + 5 branded).
- **B3. Carousel briefs** at `distribution/ig/carousel-briefs.md` — 10 carousel outlines built from the "20 apps" essay (see D1). Each: cover hook, slide-by-slide text, save-bait final slide.
- **B4. Story frame templates** at `distribution/ig/story-templates.md` — 6 recurring story formats (poll, "guess the couple", vendor tag) with copy blanks.

---

## C. SEO — Keyword & On-Page Bulk Work

Anchor docs: `seo/keyword-research-plan.md`, `seo/keyword-seeds.enriched.json`, `seo/strategy.md`, `seo/keywords-top-20.md`.

- **C1. Keyword-to-page mapping** at `distribution/seo/keyword-to-page-map.md` — every seed keyword in `keyword-seeds.enriched.shortlist.json` mapped to the most appropriate `/apps/[slug]`, `/planners`, or `/` route. Flag orphan keywords needing a new page/blog post.
- **C2. Meta title + description drafts** at `distribution/seo/meta-drafts.json` — one entry per route currently in `app/`, pulling primary keyword from C1, with title (≤60 char) and description (≤155 char). Compare against current `generateMetadata` output.
- **C3. Internal-link plan** at `distribution/seo/internal-linking-plan.md` — for each `/apps/[slug]`, list 3–5 related apps + 2 non-app pages to link to, using vibe/moment overlap from `zz/info/20-apps.json`.
- **C4. Schema.org JSON-LD blocks** at `distribution/seo/jsonld-snippets.md` — copy-paste-ready `Service`, `FAQPage`, `BreadcrumbList`, and `Product` snippets for `/`, `/planners`, `/apps`, `/apps/[slug]`.
- **C5. FAQ mining** at `distribution/seo/faq-bank.md` — 8–12 FAQ Q&A per app, seeded from objection list in the one-pager + brainstorm §3 stage 4. These feed both the app pages and the FAQPage schema.
- **C6. H1/H2 outline** at `distribution/seo/heading-outlines.md` — target heading structure for each `/apps/[slug]` (H1 + 6–8 H2s) matching the 7-section structure in `zz/info/mkting-page-structure-shorter.md`.

---

## D. Long-form Content — Anchor Essays

Anchor doc: brainstorm §4, `ai-seo/content-strategy.md`.

- **D1. "20 Apps" evergreen essay** at `distribution/content/20-apps-essay.md` — 2,000–3,000 words, one paragraph per app opening with a specific-couple hypothetical, using data from `zz/info/20-apps-reimagined.md`.
- **D2. "Why every wedding in 2026 feels the same"** at `distribution/content/why-weddings-feel-same.md` — 1,800–2,200 word category-defining piece per brainstorm §4.
- **D3. Substack + Medium + own-blog port checklist** at `distribution/content/republish-checklist.md` — for each essay, the canonical tags, dofollow-link opportunities (per `platforms-overview.md`), and Dev.to `canonical_url:` frontmatter.
>done
- **D4. 10 short-form spin-offs** at `distribution/content/spinoffs.md` — from D1 pull 10 tweet-length hooks + 10 LinkedIn post drafts + 10 Substack Notes.

---

## E. Reddit — Post + Comment Bank

Anchor docs: `reddit/reddit-organic-strategy.md`, `reddit/reddit-content-citation-rules.md`, `res/manual-reddit-res.md`, `forums/r-weddingplanning.md` (empty — see E1).

- **E1. Populate `forums/r-weddingplanning.md`** with a scan-summary template (top 30 recent threads that match our ICP-panic keywords: "generic", "boring", "personal", "interactive", "guests bored"). This is *template only* — Claude Code can't scrape live Reddit without an API key; produce the empty structure ready to be filled by a probe.
- **E2. 15 organic post drafts** at `distribution/reddit/post-drafts.md` — question-framed, non-promo, tailored to r/weddingplanning, r/weddingsunder10k, r/weddingsover10k, r/EngagementRings, r/bridezillas, r/JustEngaged. Each includes the sub, title, body, and the 9:1 helpful-context preface.
> done
- **E3. Comment reply bank** at `distribution/reddit/comment-bank.md` — 20 canned-but-personalizable replies to common threads ("what's a fun reception idea?", "how do we make it feel less generic?") that mention Wepho only when directly relevant.
- **E4. Karma-farm plan** at `distribution/reddit/karma-plan.md` — 30-day account-warmup schedule with sub list + daily target actions, per the karma gating rules in `reddit-organic-strategy.md`.

---

## F. Vendor / Planner Outreach — Personalization Templates

Anchor docs: `vendor-referrals.md`, brainstorm §5–§6.

- **F1. Planner cold-DM templates** at `distribution/cold/planner-dm-templates.md` — 6 variants (IG, LinkedIn, email, Facebook-group PM, referral-intro, follow-up). please do this for emails instead.
> done
- **F2. Photographer/venue partner one-pager** at `distribution/cold/partner-one-pager.md` — a printable/PDF-ready pitch with the three offer structures (referral / preferred / white-label) from brainstorm §5.
- **F3. Facebook-group post drafts** at `distribution/fb/group-post-drafts.md` — 8 non-promo posts for the planner-specific groups named in brainstorm §5.
- **F4. LinkedIn founder-post bank** at `distribution/cold/linkedin-posts.md` — 12 posts (2/wk for 6 weeks) targeting planners, per platform notes in `platforms-overview.md` §2.

---

## G. Podcast / PR Outreach

Anchor doc: brainstorm §2 + §10.

- **G1. Podcast target list** at `distribution/cold/podcast-targets.md` — 25 wedding-adjacent + entrepreneurship-adjacent shows with host, format, typical guest, contact vector, angle-pitch.
- **G2. Pitch email templates** at `distribution/cold/podcast-pitches.md` — 3 angle-pitches × 3 tone variants (warm-cold / referral / provocative-hook).
- **G3. Media list** at `distribution/cold/media-targets.md` — 20 wedding editorial outlets (Martha Stewart Weddings, The Knot editorial, Brides, Cup of Jo etc.) with beats + pitch angles.

---

## H. On-Site (Wepho website) — Content the Site Is Missing

These touch the actual codebase in this repo.

- **H1. Verify + list missing `/apps/[slug]` copy** — walk `app/apps/[slug]/page.js` + `components/app-page/` for each of the 20 slugs; produce `distribution/audit/apps-page-gaps.md` listing which sections (hypothetical scene, objection block, keepsake photo slot, pricing reframe, embedded reel) are stubbed vs. missing.
- **H2. Blog scaffolding** — add `app/blog/` route with `page.js` (list) and `[slug]/page.js` (post) using existing token/layout conventions, so essays from D1/D2 have a home. Include `generateMetadata` and sitemap entries.
- **H3. `/gallery` page scaffolding** — per brainstorm §7. Route + placeholder data file at `data/gallery.js` shaped for future real-wedding footage entries.
- **H4. Referral-link route** — `app/r/[code]/page.js` that reads a code, sets a cookie, and 302s to `/` per the on-the-night distribution loop (§7). Data lives in `data/referralCodes.js`.
- **H5. QR-code component** — `components/ui/BuiltByWephoFooter.js` (the always-present "Built by Wepho for [Couple]" footer) — build the component + Storybook-free example usage. Used later by the actual apps but the marketing site can preview it.
- **H6. Sitemap + robots audit** — read `app/sitemap.js` + `app/robots.js`, cross-check against every route now in `app/`, and open a diff PR. Output: `distribution/audit/sitemap-diff.md`.

---

## I. AI-SEO / LLM Discovery

Anchor docs: `ai-seo/strategy.md`, `ai-seo/technical-implementation.md`, `ai-seo/content-strategy.md`.

- **I1. LLM-friendly page audit** at `distribution/ai-seo/llm-audit.md` — for each route, check for: semantic HTML, single H1, structured lists, `<article>` wrapping, presence of a `key-facts` block near top. Flag issues per `technical-implementation.md`.
- **I2. `/llms.txt`** — draft `public/llms.txt` following the emerging llms.txt spec, listing every canonical route with a one-line description. Also `public/llms-full.txt` with linked essay content.
- **I3. Probe question bank** at `distribution/ai-seo/probe-questions.md` — 60 natural-language questions our ICP would ask an LLM ("what's a wedding reception game that isn't cheesy?"), tagged by which page should be the ideal answer. Feeds the existing dataforseo AI probe (`scripts/dataforseo-ai-probe.mjs`).
- **I4. FAQ + How-To JSON-LD** — extend C4 with AI-oriented `HowTo` and `QAPage` schemas that answer the I3 questions inline on relevant pages.

---

## J. Cross-Cutting Housekeeping

- **J1. Distribution index** at `distribution/README.md` — a one-page ToC of every file currently in `distribution/`, one-line description each, grouped by channel. Right now newcomers have to `ls` everything.
- **J2. Backlink-source hit list** at `distribution/backlink-targets.md` — extracted from `platforms-overview.md` § Cross-Cutting Takeaways: the concrete list of dofollow sources to pursue (Substack, Dev.to, Hashnode, Product Hunt, GitHub, TAAFT, Awwwards, SiteInspire) with submission-URL + spec for each.
- **J3. UTM convention doc** at `distribution/utm-conventions.md` — one canonical UTM scheme (source/medium/campaign/content) with example URLs per channel, so every asset in A–I uses consistent tagging.
- **J4. Consolidate the two content-strategy files** — `distribution/content-strategy.md` (2 lines) and `distribution/ai-seo/content-strategy.md` conflict/orphan. Merge into one canonical file and leave a pointer stub.
- **J5. German-market spinoff plan** at `distribution/de/plan.md` — synthesize `forums/german-wedding-communities.md` + `res/manual-german-forums.md` into a coherent DE launch checklist (translation scope, DE-specific keyword seeds, forums to target).

---

## K. Data / Scripts (touching code)

- **K1. Keyword-shortlist enrichment** — extend `scripts/dataforseo-ai-probe.mjs` (already modified) so it can consume `keyword-seeds.enriched.shortlist.json` and emit per-app probe reports keyed by app_slug. Non-destructive — new subcommand only.
- **K2. Pin-draft CSV export** — small script `scripts/export-pin-drafts.mjs` that turns `distribution/pins/pin-drafts.json` (from A1) into a Pinterest bulk-upload CSV.
- **K3. Sitemap + `llms.txt` sync check** — script `scripts/audit-discovery-files.mjs` that fails CI-style if `sitemap.js` and `llms.txt` disagree on route inventory.

---

## Suggested execution order (highest leverage first)

1. **J1** (distribution README) — cheap, unblocks everything.
2. **C1 + C2 + C6** (keyword mapping + meta + headings) — one prompt, feeds all app-page copy work.
3. **A1 + A2** (60 pins + board plan) — Pinterest is the #1 organic bet per brainstorm §2.
4. **D1** (20 Apps essay) — anchor content that fuels D4, B3, E2, G2.
5. **H1** (apps-page gaps audit) — tells us exactly what site work remains before ads run.
6. **B1 + B2** (Reel scripts + captions) — ready-to-shoot when footage lands.
7. **E2 + E3** (Reddit post + comment banks) — high-intent, per §2.
8. **F1 + F2** (planner outreach kits) — enables §5 execution.
9. Everything else in parallel batches.

Each item above is scoped to fit in one Claude Code session; most groups (A, B, C, E, F) are essentially "one prompt, one output file." Point at any letter and say "do A" or "do C1–C4" and it's a self-contained run.
