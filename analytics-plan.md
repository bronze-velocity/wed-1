# Analytics Plan — Wepho

Goal: know which distribution channels bring visitors, which pages they land on, and where they drop off — without spending days plumbing analytics or scaring off EU couples with a cluttered banner.

Kept deliberately small. Two products, one lightweight backend layer for our own signals, plus room to grow.

---

## What we actually need to answer

1. **Where are visitors coming from?** (Reddit thread, Pinterest pin, blog post, direct, Google, planner email…)
2. **Which pages do they land on and read?** (`/`, `/apps`, individual `/apps/[slug]`, `/blog/[slug]`, `/planners`)
3. **What converts?** (contact form submit, moodboard wizard start/completion, apps-page scroll depth)
4. **Which content wins?** (which blog posts pull traffic + rank, which pin themes get repins, which Reddit comments drive clicks)

Not needed yet: session replay, funnel builders, feature flags, cohort math, user identification.

---

## Recommended stack (in priority order)

### 1. Vercel Analytics + Vercel Speed Insights — enable Day 1

- **Cost:** free tier is enough at our traffic volume (10k data points/month on hobby, 100k+ on pro).
- **What it gives:** page views by path, referrers, top pages, top countries, Core Web Vitals per route. No cookies → no consent banner needed for this piece.
- **Cost to add:** `@vercel/analytics` + one component in `app/layout.js`.
- **Why first:** the "which pages, from where" question is 80% of what we'll ask in the first 3 months of distribution.

### 2. PostHog (EU cloud) — add once distribution ramps

- **Cost:** free up to 1M events/month, EU-hosted option for GDPR simplicity.
- **What it adds beyond Vercel Analytics:**
  - Custom events (moodboard step reached, contact form submitted, filter used on `/apps`)
  - Funnels (landing → apps browse → contact click → submit)
  - Session-level context (which referrer led to which event chain)
  - Optional heatmaps + session replay if we ever want them
- **Consent-gated.** Only initialize after the user opts into analytics cookies (banner already handles this).
- **When:** after we ship 2+ blog posts and start driving traffic from Reddit/Pinterest, so there's something to analyze.

### 3. Google Search Console — enable Day 1

- Not analytics per se, but essential: shows which queries surface Wepho, impression/click curves per URL, and indexing issues on `/apps/[slug]` and `/blog/[slug]`.
- Zero cost, zero code — just verify the domain.

### 4. Pinterest + Reddit native insights — check weekly

- Free, no code. Pinterest analytics tells us which pins repin; Reddit gives per-post/comment view counts.
- Combine with UTM tags (below) to close the loop into Vercel Analytics / PostHog.

---

## UTM discipline (the one habit that matters)

Every outbound link we place gets a `?utm_source=…&utm_medium=…&utm_campaign=…` tag. Without this, "traffic from Pinterest" and "traffic from Reddit" show up as `pinterest.com` referrer + `t.co`-style shorteners and it's a mess.

Suggested convention:
- `utm_source`: `pinterest` | `reddit` | `planner-email` | `blog` | `newsletter`
- `utm_medium`: `pin` | `comment` | `post` | `cold` | `organic`
- `utm_campaign`: campaign slug, e.g. `2026-08-launch` or `moody-boho-pins`

Keep the list in `distribution/utm-log.md` (one row per link we publish) so we can cross-reference later.

---

## Custom events worth tracking (once PostHog is wired)

Small, hand-picked. Not "everything a user does."

| Event | Where | Why |
|---|---|---|
| `contact_form_submitted` | `/` and `/apps/[slug]` CTA | Primary conversion |
| `moodboard_started` | `/moodboard` step 1 render | Top-of-funnel intent |
| `moodboard_completed` | Results screen render | Completion rate |
| `apps_filter_used` | `/apps` filter toggle | What vibes/moments matter |
| `app_slug_viewed` | `/apps/[slug]` mount | Which apps get demand |
| `blog_post_read_50` | `/blog/[slug]` 50% scroll | Content quality signal |
| `pricing_seen` | Any price mention scrolled into view | Sanity-check price framing |

Each event carries `{ path, referrer, utm_* }` automatically via a PostHog init helper.

---

## Consent model (matches the cookie banner we ship today)

- **Essential** — always on. No cookies today; reserved for future contact-form CSRF token if needed.
- **Analytics** — opt-in in EU/UK, opt-out in California, implied-consent elsewhere. PostHog gated on this. Vercel Analytics is cookieless so runs regardless.
- **Marketing** — reserved, off. We don't have retargeting pixels; leaving room for a Meta pixel if we ever run ads for the planners page.

Users can reopen the settings modal from a footer "Cookie preferences" link.

---

## Rough phasing

| Phase | Timing | What ships |
|---|---|---|
| **0 — now** | This PR | Cookie banner + Privacy + Terms (no analytics wired yet) |
| **1 — this week** | Before distribution push | Vercel Analytics + Speed Insights, Search Console verified, UTM log started |
| **2 — when traffic > ~200/day** | Post-first blog posts | PostHog EU cloud, consent-gated, ~5 custom events wired |
| **3 — only if needed** | Later | Session replay, funnels dashboard, A/B on hero copy |

---

## What we're explicitly NOT doing

- Google Analytics 4 — heavier, worse UX, cookies required, and we get better answers from Vercel + PostHog.
- Facebook/Meta Pixel — no paid ads planned.
- Hotjar / FullStory — session replay is a distraction until we have real traffic to review.
- Server-side event forwarding — premature; browser-side PostHog is enough at this scale.
