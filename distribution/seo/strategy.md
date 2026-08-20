# SEO Strategy — Bespoke Wedding Reception App

Concrete plan for getting found on Google/Bing as a bespoke wedding-entertainment service. Pair with `../geo/strategy.md` and `../vendor-referrals.md` — for a service like this, vendor referrals and inspiration platforms outweigh search, and AI answer engines matter as much as blue links.

See also:
- `wedding-search-landscape.md` — the wider market (most clusters don't apply to you)
- `dataforseo-api.md` — the data source
- `../pins/` — Pinterest is a top channel for this product

---

## Product-fit note

You are not a self-serve wedding tool. Buyers don't search "custom wedding app" — that keyword has near-zero volume. What they DO search:

- **Reception entertainment**: "wedding reception games", "unique wedding entertainment", "fun wedding reception ideas", "photo booth alternative"
- **Specific game categories**: "wedding trivia questions about the couple", "how well do you know the couple game", "wedding shoe game questions", "wedding roast ideas", "wedding icebreaker games"
- **Cocktail-hour activities**: "cocktail hour activities for guests", "wedding cocktail hour entertainment"
- **DE equivalents (bigger relative demand vs US)**: "Hochzeitsspiele", "moderne Hochzeitsspiele", "interaktive Hochzeitsspiele", "Hochzeit Unterhaltung Gäste", "Ideen für den Hochzeitsempfang", "Cocktail Empfang Spiele"

The buyer journey is discovery → inspiration → shortlist → booking. Search captures step 2 (inspiration) — you'll rank for the category, then convert on your site.

---

## Positioning wedge

Own **"the interactive alternative to a photo booth"** in couples' heads. Photo booths are the incumbent reception activity — well-understood, well-priced (~€800–€2k), universally offered. You're the modern, personal alternative in the same budget slot.

Every top-of-funnel page should:
- Reference the photo-booth comparison at least once
- Show real per-wedding footage/screenshots (not stock)
- Anchor at a price range or "starts at" figure so buyers self-qualify

---

## Content architecture

Three page types:

### 1. Category education (biggest bucket)
Rank for "wedding reception games", "unique wedding entertainment", "fun reception ideas", "Hochzeitsspiele modern". Listicle format because that's what ranks and what AI Overviews summarize.

Examples:
- `/blog/unique-wedding-reception-ideas`
- `/blog/wedding-reception-games-that-arent-cringe`
- `/blog/photo-booth-alternatives`
- `/blog/hochzeitsspiele-die-nicht-peinlich-sind`
- `/blog/cocktail-hour-activities-guests-actually-enjoy`

Each has your app naturally in position 1–3 of the list, with 4–8 real alternatives (including the incumbents) so it reads as genuine curation, not a pitch.

### 2. Game-specific long-tail
Own the individual game categories. Each page: what the game is, real questions/prompts from actual weddings, why it works, how your version does it live.

Examples:
- `/wedding-trivia-questions-about-the-couple` (this has real US volume)
- `/how-well-do-you-know-the-couple-game`
- `/wedding-roast-ideas`
- `/wedding-shoe-game-alternative`
- `/wedding-icebreakers-for-guests-who-dont-know-each-other`
- `/hochzeit-quiz-fragen-brautpaar`

These are the most winnable SEO terms in your niche because incumbents don't own them and search intent is high.

### 3. Case studies (the moat)
One per wedding you build for, with permission. Real names or pseudonyms, embedded video, guest reactions, what game we built, why they chose it, room reaction. These do double duty:
- Rank for "wedding + [city]" long-tail
- Convert visitors better than any sales page
- Feed AI engines with concrete quotable examples (see `../geo/`)

Aim for 1–2 case studies/month.

**Skip**: sales pages disguised as blog posts. Tool pages (you don't have tools). Programmatic city-page walls (you're bespoke, not scalable — a handful of thoughtful local pages beats 200 thin ones).

---

## Keyword workflow (using DataForSEO)

1. Seed 30 terms from the lists above.
2. Labs → Keyword Ideas + Related Keywords → ~3k candidates.
3. Filter for **reception / entertainment / games / activity** intent — kill anything about venues, dresses, invitations.
4. Enrich with Google Ads volume. Realistic band: 100–2,000 monthly searches for your best terms.
5. SERP-check the top ~80. Flag AI Overview presence — those need a `../geo/` play, not just an SEO play.
6. Assign each keyword to a page type above.
7. Rank tracking cron: monthly is enough for this niche.

Note on volume: total addressable search in your niche is small (tens of thousands of monthly searches globally, not millions). That's fine — a couple who searches "unique wedding reception ideas" and books a €3k experience is worth more than 1000 tire-kickers on "wedding website".

---

## Local SEO (if you deliver on-site)

If you travel to weddings physically, this is real leverage:

- **Google Business Profile** — category "Wedding Service" / "Event Planner". Photos of past weddings. Ask every couple for a review the week after.
- **Bing Places** — free, feeds Copilot.
- Regional pages: `/wedding-entertainment-berlin`, `/hochzeitsunterhaltung-muenchen`. One per city you actually serve. Include the specific venues you've worked at — venue names get searched.
- **Wedding directory listings** — see `../vendor-referrals.md`. These count as backlinks AND direct lead sources.

If you deliver remotely (couple runs it themselves via the app), skip local SEO and go all-in on Pinterest + GEO.

---

## On-page checklist (per page)

- Target keyword in `<title>`, `<h1>`, first 100 words, one image alt.
- Direct one-sentence answer at top of every H2 (also feeds GEO).
- Show, don't tell: embed one real video/screenshot per section.
- Price signal ("starts at €X") to self-qualify.
- FAQ block with `FAQPage` schema — 6–8 real questions from discovery calls.
- Schema: `Service`, `Organization` with `sameAs`, `Review` on case studies, `FAQPage` on guides.
- Photo-booth comparison mention somewhere on every top-of-funnel page.
- Visible last-updated date + `dateModified`.
- One prominent CTA per page: "Book a 20-min discovery call" — not "start free trial".

---

## Off-page priorities (do this before more on-page)

For a bespoke high-ticket service, off-page beats on-page. Priority order:

1. **Wedding directory listings** — Weddyplace, Hochzeitsplaza, Weddix, The Knot, Zola vendor pages, WeddingWire, Junebug. See `../vendor-referrals.md`.
2. **Real Weddings features** — Junebug, Green Wedding Shoes, Style Me Pretty, Rock My Wedding, Frieda Theres (DE). These features are the single strongest backlink + inspiration hit for reception vendors.
3. **Wedding-planner and photographer relationships** — 5 warm planner relationships > 50 cold backlinks. See `../vendor-referrals.md`.
4. **Podcast/YouTube guest spots** on wedding-industry shows — small audiences, extremely high intent.
5. **Reddit** in r/weddingplanning, r/HochzeitsPlanung, r/Weddingsunder35k — authentic answers on "unique reception ideas" threads.

---

## 90-day plan

**Month 1 — foundation**
- DataForSEO account + keyword shortlist (~80 terms).
- 3 category-education listicles + 3 game-specific long-tail pages.
- Google Business Profile + Bing Places if local.
- 2 wedding directory listings (start with Weddyplace + The Knot vendor).

**Month 2 — content velocity + case studies**
- 5 more long-tail game pages.
- First 2 case studies published (needs a past wedding with permission).
- 5 outreach pitches to wedding blogs for Real Weddings features.
- 3 pitches to wedding planners for coffee/intro calls.

**Month 3 — measurement + iteration**
- Monthly rank tracking cron live.
- Kill pages that haven't moved into top 50 after 90 days.
- Publish original-data piece: survey your past couples/guests ("we surveyed 200 wedding guests: 78% forgot the DJ's playlist, 94% remembered the trivia game" — real numbers, real angle). This feeds SEO backlinks AND GEO citations.

---

## Budget estimate (year one)

- DataForSEO: ~$20/month
- Google Business + Bing Places: free
- Wedding directory listings: mostly free tier, ~€50–€200/mo for premium slots on Weddyplace/The Knot
- Screaming Frog: free (site is small)
- **Total: under €2,500/year in tooling + listings.**

Time on content and outreach is the constraint, not money.

---

## What doesn't work for this product

- Chasing "wedding" head terms — you don't need volume, you need fit.
- Programmatic city walls — you're bespoke, thin pages will get punished and no couples will convert from them anyway.
- Pure SEO without inspiration channels — couples in "we want unique" mode browse Pinterest and Instagram first, then Google specific ideas. See `../pins/` and Instagram plays.
- Optimizing only for Google — Bing/Copilot is meaningful pipeline via ChatGPT Search.
- Trying to rank for "custom wedding app" — the keyword doesn't have volume because the category isn't in couples' heads yet. Educate them into it via GEO + listicles.
