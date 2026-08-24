# Republish Checklist — Substack, Medium, Dev.to, Own Blog

Port checklist for the anchor essays in `distribution/content/`. Every essay has a **home** on `wepho.com/blog/[slug]` (the canonical) and gets syndicated to the platforms below. Follow the order: **own blog first → wait for Google to index (24–72h) → then Medium, Substack, Dev.to** with `canonical_url` pointing back home. This preserves SEO credit and avoids Google picking a syndicated copy as canonical.

Backlink `dofollow`/`nofollow` claims below are pulled from `distribution/platforms-overview.md` — verify at publish time with an inspector before quoting to anyone.

---

## Essays covered

| ID | Working title | Source file | Canonical URL |
|---|---|---|---|
| D1 | The 20 Wedding Apps We Build (And Why Each One Exists) | `distribution/content/20-apps-essay.md` | `https://wepho.com/blog/20-wedding-apps` |
| D2 | Why Every Wedding in 2026 Feels the Same | `distribution/content/why-weddings-feel-same.md` | `https://wepho.com/blog/why-weddings-feel-same` |

Add a row here every time a new anchor essay is written. The rest of this doc is per-platform mechanics that apply to *every* essay.

---

## 0. Own blog (`wepho.com/blog/[slug]`) — canonical home

- **Publish here first, always.** This is the URL every other platform will `rel="canonical"` back to.
- **Frontmatter / `data/posts.js` fields to fill:**
  - `slug` — the URL slug (matches the table above)
  - `title`, `dek` (subtitle), `publishedAt`, `updatedAt`
  - `tags` — 4–6, drawn from the tag bank in §5
  - `description` — used verbatim by `generateMetadata` (150–160 chars, includes the primary keyword)
  - `ogImage` — 1200×630, real photography per `photo-plan.md`
- **On-page linking:**
  - 2–3 links out to sibling `/blog/*` posts (see `distribution/ai-seo/content-strategy.md` §internal linking)
  - 3–5 links out to relevant `/apps/[slug]` marketing pages
  - 1 link to `/moodboard` and 1 to `/planners` where naturally warranted
- **Structured data:** `Article` JSON-LD via `generateMetadata` — `author`, `datePublished`, `dateModified`, `image`, `publisher`.
- **Wait 24–72 hours** for Google to crawl + index before syndicating. Confirm indexing via `site:wepho.com/blog/[slug]` before proceeding.

---

## 1. Medium — canonical import

Medium is uniquely useful because its **Import a Story** tool auto-inserts a `rel="canonical"` back to the source URL. This is the only correct way to republish on Medium — never paste-and-publish, or Medium becomes the canonical.

- **Import path:** `medium.com/p/import` → paste the `wepho.com/blog/[slug]` URL → Medium fetches + drafts the story with canonical baked in.
- **Post-import edits (safe):**
  - Adjust title/subtitle for Medium's audience (they favor curiosity gaps over SEO exact-match)
  - Add a *"This piece was originally published on the Wepho blog"* italic line at the top with a link back
  - Add a bottom CTA card linking to `/moodboard` or `/apps`
- **Tags (5 max, Medium's cap):** pick from §5.
- **Publications to pitch (in order):**
  1. *The Startup* — general founder audience, huge reach
  2. *Better Marketing* — for D2-style category-defining pieces
  3. *Wedding Industry Insider* (verify still active before pitching)
  4. Own the piece unpublished for 24h, then submit to a publication if not picked up organically
- **Boost eligibility:** Medium's Boost program favors first-person perspective + specific detail. Both essays qualify structurally.
- **Backlinks:** in-body links are `nofollow` in most cases; the *canonical tag* is the real prize. Do not count on Medium for direct SEO equity — count on it for `nofollow` referral + brand exposure + the canonical signal reinforcing the wepho.com original.

---

## 2. Substack — cross-post with canonical + Notes teaser

Substack post-body links are **`dofollow`** (rare and valuable — one of the few UGC platforms that still pass SEO equity per `platforms-overview.md` §Cross-Cutting Takeaways). This makes Substack the highest-SEO-value republish target.

- **Publication:** publish under the Wepho Substack (create if not yet live — free, no verification).
- **Canonical:** Substack does not expose a `canonical_url` field in the standard editor. Workaround options, in order of preference:
  1. **HTML `<link rel="canonical">` injection** — Substack allows raw HTML in the "Custom code" spot on paid tiers only; if unavailable, use option 2.
  2. **Explicit textual canonical** — first line of the post, italicized: *"This essay was first published on [wepho.com/blog/[slug]](canonical URL). It is republished here in full."* Google treats explicit textual canonicals as a weak but real signal.
  3. **Republish only an excerpt (first ~40%) + "read the rest on wepho.com" link** — sacrifices Substack's algorithmic push but eliminates duplicate-content ambiguity entirely. Use this variant if the essay is a keyword play we care deeply about ranking for on wepho.com.
- **Dofollow-link opportunities to include in-body (Substack passes equity here):**
  - 1 link to the canonical `wepho.com/blog/[slug]` in the intro
  - 2–3 links to relevant `/apps/[slug]` marketing pages
  - 1 link to `/moodboard`
  - 1 link to `/planners` if the essay is planner-adjacent
  - Do **not** stuff links — 4–6 dofollow anchors per essay is the natural ceiling before it reads like SEO spam and hurts on-Substack engagement.
- **About page:** ensure the Wepho Substack About page has a `dofollow` link back to `wepho.com` (About-page links are also dofollow).
- **Notes teaser:** immediately after publish, drop a 3–5 line Substack Note with the essay's most quotable hook + link. Notes has real algorithmic reach in 2026.
- **Cross-recommendation setup:** proactively recommend 3–5 wedding-planner / wedding-photographer / event-industry Substacks. Cross-recs are Substack's #1 growth channel per `platforms-overview.md` §Substack.
- **Tags:** Substack tags are lightweight — 3–5 broad tags from §5 is fine.

---

## 3. Dev.to — canonical frontmatter

Dev.to isn't the natural audience for wedding content, but it is worth porting D1 (the "20 apps" essay) as **a technical/design piece** — reframed as "How we structured a 20-app portfolio for a wedding-tech studio" — because:
- Dev.to canonical support is built-in and reliable (`canonical_url:` in frontmatter)
- In-body links have historically been `dofollow` (verify per `platforms-overview.md` §Dev.to)
- Dev.to ranks well in Google for niche builder queries

D2 ("Why every wedding in 2026 feels the same") does not fit Dev.to — skip it here.

**Frontmatter template for Dev.to** (paste at top of the Markdown editor):

```yaml
---
title: How We Structured a 20-App Portfolio for a Wedding-Tech Studio
published: true
description: A working catalog of 20 interactive wedding-reception apps — how they're grouped, how couples pick, and why a portfolio beats a builder for one-night software.
tags: webdev, showdev, casestudy, design
canonical_url: https://wepho.com/blog/20-wedding-apps
cover_image: https://wepho.com/images/blog/20-apps-cover.jpg
series: Wepho essays
---
```

- **`canonical_url`** must be the exact `wepho.com/blog/[slug]` URL — no trailing slash mismatch, no `www` mismatch. Dev.to renders this as `<link rel="canonical">` in the `<head>`.
- **Tags** are capped at 4 on Dev.to. Pick from: `webdev`, `showdev`, `casestudy`, `design`, `startup`, `career`, `writing`, `productivity`. Wedding-specific tags do not exist on Dev.to.
- **Reframe the intro** — the first paragraph should acknowledge the dev audience: e.g. "We build one-night-only web apps for wedding receptions. This piece is a catalog of 20 of them, mostly as a case study in structuring a productized-service portfolio."
- **Dofollow-link opportunities to include in-body:**
  - Canonical link in the first paragraph
  - 2–3 links to `/apps/[slug]` pages framed as "the marketing page for this app"
  - 1 link to the GitHub repo (if the site's source is public) — Dev.to readers click these

---

## 4. Hashnode — optional secondary syndication

If bandwidth allows, also port D1 to Hashnode. Hashnode canonical support works the same as Dev.to (`canonical_url` in frontmatter) and in-body links are `dofollow` per `platforms-overview.md` §Hashnode. Smaller audience than Dev.to, but a genuine dofollow backlink for near-zero marginal effort.

Use the same frontmatter shape:

```yaml
---
title: How We Structured a 20-App Portfolio for a Wedding-Tech Studio
canonical_url: https://wepho.com/blog/20-wedding-apps
tags: webdev, casestudy, design, writing
cover: https://wepho.com/images/blog/20-apps-cover.jpg
---
```

Skip LinkedIn Articles entirely — all outbound links are `nofollow`, reach is worse than a native LinkedIn text post, and there's no canonical support. Use LinkedIn for a native short post that *links* to the essay (see `distribution/content/spinoffs.md` when D4 is written).

---

## 5. Canonical tag bank

Draw from this list — never invent one-off tags per post.

**Wedding-facing (own blog + Substack):**
`weddings` · `wedding-planning` · `reception-ideas` · `wedding-tech` · `wedding-entertainment` · `wedding-guests` · `custom-weddings` · `interactive-weddings` · `wedding-2026`

**Founder/builder-facing (Medium, Dev.to, Hashnode):**
`startup` · `product-design` · `productized-service` · `design` · `casestudy` · `showdev` · `webdev` · `writing`

**Per-essay recommended tag sets:**
- D1 (20 apps): own blog → `weddings, wedding-tech, reception-ideas, interactive-weddings, custom-weddings`; Medium → `Weddings, Product Design, Startup, Design, Writing`; Dev.to → `webdev, showdev, casestudy, design`.
- D2 (why weddings feel the same): own blog → `weddings, wedding-2026, wedding-planning, wedding-tech, custom-weddings`; Medium → `Weddings, Culture, Startup, Design, Marketing`; not on Dev.to.

---

## 6. Per-essay execution checklist (copy for each new anchor)

Duplicate this block per essay in the essay's own file (or track in `tasks.md`):

```
[ ] Publish canonical on wepho.com/blog/[slug]
[ ] Confirm Google indexing via site: search (24–72h)
[ ] Medium: import via medium.com/p/import, verify canonical tag in <head>
[ ] Medium: pitch to The Startup + Better Marketing
[ ] Substack: cross-post with textual canonical (or HTML canonical if paid tier)
[ ] Substack: publish accompanying Note with quote + link
[ ] Substack: set up 3–5 cross-recommendations with wedding-adjacent writers
[ ] Dev.to (D1 only): publish with canonical_url frontmatter, reframed intro
[ ] Hashnode (D1 only, optional): publish with canonical_url frontmatter
[ ] Verify all canonical tags render correctly in each platform's <head>
[ ] Log referral traffic + backlink pickups in distribution/res/ after 7 and 30 days
```

---

## 7. What NOT to do

- **Never publish on Medium/Substack/Dev.to *before* the canonical goes live on wepho.com.** Google will pick whichever it indexes first as canonical, and clawing that back is painful.
- **Never paste-and-publish on Medium** — always use Import a Story so the canonical tag is set.
- **Never publish the full text as a LinkedIn Article** — no canonical, `nofollow` links, and worse reach than a native post.
- **Never syndicate to a platform whose canonical support you can't verify in `<head>`.** If a platform strips `<link rel="canonical">`, publish only an excerpt with a "read the rest on wepho.com" link.
- **Never invent new tags per post.** Consistency across essays builds topic clusters — see `distribution/ai-seo/content-strategy.md` §internal linking.
