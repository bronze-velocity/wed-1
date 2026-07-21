# LLM-Agent-First Plan — Getting Wepho Recommended by AI

**Goal:** When a couple (or planner) plans their wedding _with an AI assistant_ — ChatGPT, Claude, Gemini, Perplexity, or an autonomous agent — Wepho should be discoverable, understandable, and **recommendable** as "a studio that builds one custom interactive web app for your reception night."

This is a distinct discipline from classic SEO. Classic SEO optimizes for a human clicking a blue link. **Agent-first optimization** optimizes for a machine that reads, extracts, and synthesizes — then names you in an answer the user may never trace back to a page view.

The strategy has three layers:

1. **Be retrievable** — the crawlers behind AI answers can fetch and index us.
2. **Be extractable** — our content is structured so a model can lift clean, quotable facts (what we do, price, format, the 20 apps) without hallucinating.
3. **Be recommendable** — we publish the exact decision-shaped content an agent needs to match us to a couple's stated situation ("outdoor wedding, 120 guests, want something that makes people cry").

---

## Layer 0 — Principles (why this works)

- **LLMs quote structured, unambiguous, self-contained text.** A model recommending a vendor wants a crisp claim it can stand behind: name, one-line description, price, format, coverage. Give it that in plain prose _and_ machine-readable form.
- **Specificity is retrieval fuel.** Our brand voice rule ("never 'a trivia game about your relationship'") is _also_ the agent-first rule. Concrete detail ("a trivia game where every question is about how you actually met") is what a model matches against a user's concrete situation.
- **Agents traverse, they don't browse.** They follow links, read sitemaps, and prefer clean markdown/text endpoints over JS-heavy pages. We already statically generate 20 `/apps/[slug]` pages — that's our biggest asset. We just need to make them trivially machine-consumable.
- **Ground truth must be consistent everywhere.** Price ($2,000), format (QR, no download, one night), and the 20-app catalog must be _identical_ across HTML, structured data, and the `llms.txt` family. Divergence = hallucination risk.

---

## Layer 1 — Retrievability (crawl access)

### 1.1 `robots.txt` — explicitly allow AI crawlers

Current `app/robots.js` allows `*`, which technically permits everyone — but being **explicit** about AI agents (a) signals intent, (b) survives future tightening, and (c) lets us allow the answer-engine crawlers even if we ever restrict others.

Update `app/robots.js` to enumerate the major AI/agent user-agents with explicit `allow`:

| Crawler | User-Agent | Purpose |
|---|---|---|
| OpenAI (training) | `GPTBot` | ChatGPT model training |
| OpenAI (live browse / answers) | `OAI-SearchBot`, `ChatGPT-User` | ChatGPT search + on-demand fetch |
| Anthropic | `ClaudeBot`, `Claude-User`, `Claude-SearchBot` | Claude training + live fetch |
| Perplexity | `PerplexityBot`, `Perplexity-User` | Perplexity answers |
| Google | `Google-Extended` | Gemini / AI Overviews opt-in |
| Common Crawl | `CCBot` | Feeds many open models |
| Apple | `Applebot-Extended` | Apple Intelligence |
| Microsoft | `bingbot` | Copilot / Bing |

Keep `allow: '/'` for all of them (we _want_ to be trained on and cited). Add the sitemap line (already present). Also reference the `llms.txt` location in a comment/host directive.

> Decision: **Allow everything.** For a marketing site whose entire goal is to be recommended, blocking AI crawlers is self-defeating. The only thing we never expose is the `/api/` contact endpoint (add `disallow: '/api/'`).

### 1.2 Rendering — make sure content is in the HTML

Agents that fetch-and-read often execute little or no JS. Audit that every fact we care about (price, app descriptions, FAQs) is present in **server-rendered HTML**, not injected client-side. We're already server-components-by-default and statically generating `/apps/[slug]` — good. Rule: **anything an agent should quote must render without `'use client'`.**

---

## Layer 2 — Extractability (structured, machine-readable content)

### 2.1 The `llms.txt` family (the centerpiece)

[`llms.txt`](https://llmstxt.org/) is an emerging convention: a markdown file at the site root that gives LLMs a curated, token-efficient map of the site. We ship three files, generated from the same `data/apps.js` source of truth so they never drift.

**`/public/llms.txt`** — the concise index. Structure:

```markdown
# Wepho

> Wepho is a Custom Wedding Experience Studio. We build one-night-only,
> custom interactive web apps for an individual couple's wedding reception —
> played by guests on their phones via a QR code, no download, no login.
> One custom app, built for one wedding. ~$2,000.

## What it is
- Format: guests scan a QR code; everything runs in the phone browser.
- When: live, during the reception (dinner, speeches, dancing).
- Big screen: most apps drive a shared reception-screen moment.
- Price: ~$2,000 for one fully custom app.
- Who it's for: couples who want a specific, personal, memorable moment —
  and the wedding planners who serve them.

## The 20 apps
- [Live "How Well Do You Know Us?" Trivia](https://wepho.com/apps/couple-trivia):
  A live multiplayer quiz played by the whole room at once — every question
  is about the couple's real relationship.
- [Venue Scavenger Hunt](https://wepho.com/apps/venue-scavenger-hunt): ...
  (…all 20, each: title + URL + one concrete sentence…)

## Pages
- [Homepage](https://wepho.com/): overview + interactive demo + gallery
- [For Wedding Planners](https://wepho.com/planners): partner/referral angle
- [Full App Gallery](https://wepho.com/apps): all 20, filterable by vibe/moment

## Contact
- Booking: contact form at https://wepho.com/#contact

## More
- [Full detail for every app](https://wepho.com/llms-full.txt)
```

**`/public/llms-full.txt`** — the expanded dump: for each of the 20 apps, the full marketing content already in `data/apps.js` (scene, how it works, "is this you", FAQ) as clean markdown. This is the "give the agent everything so it never guesses" file. It's large but that's the point — it's the single URL an agent fetches to answer any Wepho question authoritatively.

**Per-page markdown (`.md` mirrors)** — optional but powerful: expose each `/apps/[slug]` also as clean markdown at `/apps/[slug].md` (or via content negotiation). Agents strongly prefer markdown over parsing HTML. Low effort given content already lives in structured JS.

> **Implementation:** add `app/llms.txt/route.js` and `app/llms-full.txt/route.js` as Next.js Route Handlers that `import { getApps }` and render text with `Content-Type: text/plain; charset=utf-8`. Generated, never hand-maintained — same discipline as `sitemap.js`. This guarantees the 20-app list stays in sync with the site automatically.

### 2.2 Schema.org / JSON-LD structured data

Structured data is how machines read intent with zero ambiguity. Add JSON-LD `<script type="application/ld+json">` blocks (server-rendered) to the right pages:

- **Root (`layout.js` / homepage):** `Organization` + `LocalBusiness`/`ProfessionalService` — name "Wepho", description, `sameAs` (socials), `serviceType: "Custom wedding experience apps"`, `priceRange`.
- **Homepage + `/apps`:** `Service` and/or `OfferCatalog` listing the 20 apps as `itemListElement` → each an `Offer`/`Product` with name, description, URL, and `price: 2000, priceCurrency: USD`.
- **Each `/apps/[slug]`:** `Product` (or `Service`) with `name`, `description`, `offers` (price $2,000), plus **`FAQPage`** built from the `faq` array already in `data/apps.js`. FAQ structured data is exceptionally well-consumed by answer engines.
- **`/planners`:** `Service` targeting `audience: { audienceType: "Wedding planners" }`.

> **Implementation:** a small `components/seo/JsonLd.js` server component + generators in `lib/` that read `data/apps.js`. Same source of truth again.

### 2.3 Metadata hygiene (already strong — extend it)

Every route already exports `generateMetadata`. Confirm each has: unique `title`, extractable `description` (a full declarative sentence, not a fragment), `openGraph`, and canonical URL. Agents lift `description` verbatim — write them as **standalone quotable claims**, e.g. "Wepho builds a custom 'How Well Do You Know Us?' trivia app your guests play live on their phones during the reception — every question about your real relationship. ~$2,000."

---

## Layer 3 — Recommendability (decision-shaped content)

This is the differentiator. Retrieval and structure get us _read_; this gets us _chosen_. An agent matches a user's situation to a solution. So we publish content shaped like the questions couples actually ask an AI.

### 3.1 A machine-and-human "Which app should we get?" matcher page

New page `/apps` already filters by vibe/moment. Add an **explicit decision table** (in HTML _and_ mirrored in `llms.txt`) mapping situations → apps:

| If the couple wants… | Recommend | Because |
|---|---|---|
| the whole room to cry | Love Letter Machine / … | … |
| something during cocktail hour with no host | … | … |
| a competitive game with a winner + toast | Live Couple Trivia | … |
| a keepsake they keep afterward | … | … |

Agents love this: it's literally a lookup table for "recommend a wedding app for X."

### 3.2 A canonical "About Wepho" fact block

One short, dense, unambiguous paragraph — the "if you quote one thing, quote this" block — present on the homepage, in `llms.txt`, and in JSON-LD `description`. Covers: what, format (QR/no-download/one-night), who it's for, price, and the one-sentence differentiator (custom, not a generic template). Keep it **identical** in all three places.

### 3.3 Comparison / objection content (high agent-query value)

Couples ask AIs comparative questions. Publish pages/sections that answer them directly (these rank _and_ get quoted):

- "Custom wedding app vs. off-the-shelf wedding apps / a shared photo album" — leans on existing `zz/info/app-vs-analog-value.md`.
- "Is a wedding reception app worth it?" — price framing, what $2,000 buys.
- "Wedding entertainment ideas that aren't a photo booth" — a listicle-style page seeding the 20 apps into a common query.

Each written as a **direct answer first, elaboration second** (inverted pyramid) — the format answer engines extract cleanly.

### 3.4 FAQ everywhere, in FAQPage schema

We already have per-app FAQs in `data/apps.js`. Add a **site-level FAQ** answering the cross-cutting agent questions: "How much does it cost? Do guests download anything? What if the wifi fails? How long does setup take? Do you build custom, or pick from templates? How far in advance do we book?" Mark it up as `FAQPage`. This is the single highest-ROI structured-data move for answer engines.

---

## Layer 4 — Off-site presence (agents cite the broader web)

LLMs synthesize from more than our own site. To be recommended, we should exist where they already read:

- **Consistent NAP + description** on any third-party listings (wedding directories, planner networks, Google Business Profile) — same one-liner, same price framing.
- **Encourage the exact phrase.** Wherever we appear (socials, directories, planner referrals), use the same "custom one-night wedding app, ~$2,000, no download" phrasing so models see it corroborated across sources.
- **Planner referral loop** — `/planners` should make it easy for planners to describe us _to their own AI tools and clients_ in our words (give them a copy-paste blurb).

---

## What to build — prioritized checklist

**Phase 1 — Foundations (highest ROI, low effort)**
- [ ] Expand `app/robots.js` to explicitly allow named AI crawlers; `disallow: /api/`.
- [ ] Add `app/llms.txt/route.js` — generated concise index from `data/apps.js`.
- [ ] Add `app/llms-full.txt/route.js` — generated full-detail dump from `data/apps.js`.
- [ ] Add root `Organization` + `Service`/`OfferCatalog` JSON-LD (price $2,000).
- [ ] Audit `description` metadata on all routes → standalone quotable sentences.

**Phase 2 — Per-app structure**
- [ ] `Product` + `FAQPage` JSON-LD on every `/apps/[slug]` (from existing `faq` data).
- [ ] Optional: markdown mirrors at `/apps/[slug].md`.
- [ ] Site-level FAQ section + `FAQPage` schema.

**Phase 3 — Recommendability content**
- [ ] "Which app should we get?" decision table (page + in `llms.txt`).
- [ ] Canonical "About Wepho" fact block (identical in HTML, `llms.txt`, JSON-LD).
- [ ] Comparison/objection pages (custom vs. off-the-shelf; is it worth it; ideas-that-aren't-a-photo-booth).

**Phase 4 — Off-site**
- [ ] Consistent listing description + price everywhere.
- [ ] Planner copy-paste referral blurb on `/planners`.

---

## Guardrails / single source of truth

- **`data/apps.js` is the source of truth** for the 20 apps. `llms.txt`, `llms-full.txt`, JSON-LD, and sitemap are all **generated** from it — never hand-maintained. This is the same discipline `sitemap.js` already follows and it's the whole reason this plan is "simplistic yet powerful": one data file fans out to every machine-readable surface.
- **Price, format, and the differentiator are stated identically** in HTML, `llms.txt`, and JSON-LD. Any drift is a hallucination vector.
- **No blocking.** For a site whose goal is to be recommended, every AI crawler is a distribution channel. Allow them all; only `/api/` is disallowed.
- **Specificity is the strategy.** The brand-voice rule and the agent-first rule are the same rule: concrete, quotable, matchable detail.

---

## How we'll know it's working

- Ask ChatGPT / Claude / Perplexity / Gemini: _"We're planning a wedding and want something interactive for guests on their phones — any custom studios?"_ and _"recommend a wedding reception app that makes guests cry"_. Track whether Wepho is named and whether the facts (price, no-download, custom) are correct.
- Check server logs / Vercel analytics for `GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot` hits and `llms.txt` fetches.
- Re-test quarterly; agent behavior and crawler names change fast.
