# Ideas Library — Plan

A second-tier catalog page that expands Wepho's example set from 20 to ~60 apps, built primarily to (a) give AI assistants far more concrete situation→app matches and (b) prove range to couples and planners. Companion to [`llm-agent-first-plan.md`](./llm-agent-first-plan.md) — this is the concrete build-out of that plan's Layer 3 "decision-shaped content."

---

## The core decision: two tiers, not 60 flagship pages

We do **not** create 40 more full `/apps/[slug]` marketing pages. That would triple the writing/maintenance load and dilute the ranking authority of the 20 flagship pages. Instead:

| | **Tier 1 — Flagship (existing 20)** | **Tier 2 — Ideas Library (new ~40)** |
|---|---|---|
| Route | `/apps/[slug]` (20 static pages) | **One page** — `/ideas` |
| Depth | Full: hero, scene, howItWorks, isThisYou, FAQ, JSON-LD | One strong, specific paragraph each |
| Purpose | SEO-primary, conversion, demos | Range, idea-matching, LLM fuel |
| Data | `data/apps.js` (extended content) | `data/ideas.js` (lightweight) |

**Framing (honesty rule):** Wepho builds *custom* apps, so the Ideas Library is presented as **"60 things we've built or could build — yours will be its own."** These are concepts, not off-the-shelf products. This is truthful (everything is bespoke anyway) and it prevents an LLM from promising a couple a polished product that has no real page behind it.

---

## What we're building

**Page:** `/ideas` — "The Ideas Library" (or "60 Ideas for Your Reception")

A single, fast, filterable page listing ~40 Tier-2 ideas (optionally interleaved with the 20 flagship apps for a full 60-item browse, with flagship cards linking out to their full pages).

**Each idea card contains:**
- **Title** — concrete, specific (e.g. "First-Kiss Map" not "Location Game")
- **One specific sentence** — meets the brand voice rule: names the real, concrete thing it does. _"A live map where each guest drops a pin and a one-line memory at the exact spot it happened for them — and the big screen fills in around the pin marking where you two first met."_
- **Vibe tag(s)** — from existing `_meta.alt1_vibes`: Make them laugh / Make them cry / Get them talking / Create a keepsake / Stop the room (max 2, primary first)
- **Moment tag** — from `_meta.alt2_moments`: Arrival / Ceremony / Cocktail Hour / Dinner / Speeches / Dancing / All Day
- **Feeling tag** — from `_meta.alt4_feelings`: Funny / Emotional / Social / Romantic
- **(Tier-1 cards only)** a "See the full app →" link to `/apps/[slug]`

**Filters:** reuse the `/apps` filter pattern — filter by vibe and moment (same taxonomy, so the two pages feel like one system).

---

## Data model — `data/ideas.js`

New lightweight file, separate from `data/apps.js`, mirroring its tag taxonomy so both feed the same filters and the same `llms-full.txt` generator.

```js
export const ideas = [
  {
    slug: 'first-kiss-map',
    title: 'First-Kiss Map',
    tier: 2,
    blurb: 'A live map where each guest drops a pin and a one-line memory at the exact spot it happened for them — and the big screen fills in around the pin marking where you two first met.',
    vibes: ['Make them cry', 'Create a keepsake'],
    moment: 'Cocktail Hour',
    feeling: 'Romantic',
  },
  // …~40 total
]
```

- No routes generated from this file — it renders only into the `/ideas` page and the `llms.txt` family.
- Same taxonomy strings as `zz/wed-apps/20-apps.json` `_meta` so filters and tags are shared.
- `getIdeas()` helper in `lib/` alongside `getApps()`.

---

## The specificity bar (this is the whole game)

40 vague ideas actively hurt us — they read as filler to Google and LLMs, and they contradict the brand rule. Every idea must pass this test:

> Could a couple read the one sentence and immediately picture **their own** version, with **their** details? If it works only as a category ("a fun photo game"), it fails. If it names a concrete mechanic + a concrete personal hook ("drop a pin at the spot it happened for *you*"), it passes.

Quality over count: **ship ~30 excellent ideas rather than 40 where the last 10 are weak.** Draft ~50, cut to the strongest.

Spread coverage deliberately across the taxonomy so agents can match any query:
- Every **moment** (Arrival → Dancing → All Day) has several ideas.
- Every **vibe** (laugh / cry / talk / keepsake / stop-the-room) is well represented.
- Cover common couple situations: no-host/self-running, high-energy vs. intimate, keepsake-focused, competitive, kids-present, remote guests, cultural/tradition-specific.

---

## LLM / agent-first integration

- **`llms-full.txt`** includes all ~60 (Tier 1 + Tier 2) as `title + URL-or-page + one sentence`, generated from both `data/apps.js` and `data/ideas.js`. This is the payoff: a couple asking an AI for "something nerdy for cocktail hour" now has a matchable, quotable example.
- **`llms.txt`** (concise index) links to `/ideas` under a "More ideas" heading; it lists the 20 flagships, not all 60, to stay token-efficient.
- **JSON-LD:** the `/ideas` page carries a single `ItemList` of the ideas (name + description each). No per-idea `Product`/`Offer` — they aren't individually purchasable products, they're concepts. This keeps structured data honest.
- **Sitemap:** add `/ideas` to `app/sitemap.js` static routes. No per-idea URLs.
- Ties directly to the flagship plan's **"Which app should we get?" decision table** — the Ideas Library is the expanded menu that table points into.

---

## Page structure (sections)

1. **Header** — "The Ideas Library." Subhead states the honesty framing: custom studio, these are concepts, yours will be its own. One line on price/format (~$2,000, QR, no download) for the agents that land here first.
2. **Filter bar** — vibe + moment pills (reused `/apps` pattern).
3. **Idea grid** — cards as specced above. Flagship (Tier-1) cards visually distinct + linked to full pages; Tier-2 cards are terminal (no detail page).
4. **CTA** — "Don't see yours? That's the point — every one is custom." → contact form.

**Reuse, don't reinvent:** the card and filter components from `/apps` (`components/ui/AppCard.js`, the gallery/filter sections). Add a lighter card variant for Tier-2 (no CTA link) rather than a new component tree. Wrap in `<Container>`; use `.section-py`; tokens only — same design-system rules as everywhere.

---

## Build checklist

- [ ] Draft ~50 Tier-2 ideas into a review file (`zz/agents/ideas-draft.md`), each meeting the specificity bar, tagged with vibe/moment/feeling.
- [ ] Cut to the strongest ~30–40; confirm taxonomy coverage is even.
- [ ] Create `data/ideas.js` from the approved set.
- [ ] Add `getIdeas()` to `lib/`.
- [ ] Build `/ideas` page (`app/ideas/page.js`) with `generateMetadata` (standalone quotable description).
- [ ] Add Tier-2 card variant; reuse filter bar.
- [ ] Add `ItemList` JSON-LD to `/ideas`.
- [ ] Add `/ideas` to `app/sitemap.js`.
- [ ] Feed `data/ideas.js` into the `llms-full.txt` generator; link `/ideas` from `llms.txt`.
- [ ] Cross-link: `/apps` gallery and homepage gallery teaser point to "See all 60 ideas →".

---

## Open questions for the user

1. **Total count** — cap at 60 (20 + 40), or ship fewer Tier-2 (e.g. 30) to hold the quality bar higher?
2. **Interleave or separate** — does `/ideas` show all 60 (flagships mixed in, linking out), or only the 40 new Tier-2 ideas with a "see our 20 signature apps" pointer to `/apps`?
3. **Honesty framing wording** — confirm "we've built or could build" is accurate; if some ideas are purely aspirational, lean the copy toward "concepts."
