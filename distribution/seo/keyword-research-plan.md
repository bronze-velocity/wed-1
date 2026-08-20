# Keyword Research Plan — DataForSEO

Executable plan for mapping the wedding reception / entertainment search space. Pair with `strategy.md` (content architecture) and `dataforseo-api.md` (API mechanics + pricing).

**Goal:** build a shortlist of ~100 winnable keywords, assign each to a page, and set up monthly rank tracking. Total cost: well under $5 in API credits.

---

## Why these APIs, not others

| Need | Endpoint | Skip |
|---|---|---|
| Expand seed list → thousands of candidates | **Labs → Keyword Ideas** | — |
| Real monthly volume + CPC | **Keywords Data → Google Ads Search Volume** | Google Trends (relative only) |
| SERP feature check (AI Overview, PAA, featured snippet) | **SERP API → Live Advanced** | Task-based SERP (overkill here) |
| Competitor gap analysis | **Labs → Ranked Keywords** (on 2–3 rivals) | Backlinks API (not needed yet) |

Skip: Backlinks API, On-Page API, Merchant API, App Data API — none relevant at this stage.

---

## Phase 1 — Seed keyword list

Start with ~35 seeds, segmented by audience intent:

### Reception entertainment (highest intent for Wepho)
```
wedding reception games
wedding reception entertainment ideas
unique wedding entertainment
fun wedding reception ideas
interactive wedding reception
wedding guest entertainment
cocktail hour activities wedding
cocktail hour games wedding
photo booth alternative wedding
```

### Specific game types (long-tail, winnable)
```
wedding trivia questions about the couple
how well do you know the couple game
wedding shoe game questions
wedding roast ideas
wedding icebreaker games for guests
wedding quiz ideas
couple trivia game wedding
wedding bingo cards for guests
newlywed game questions reception
wedding scavenger hunt ideas
wedding mad libs
```

### "Custom" + "personalized" angle
```
custom wedding game
personalized wedding entertainment
bespoke wedding experience
unique wedding ideas for guests
wedding app for guests
interactive wedding app
digital wedding games
```

### German-language (if targeting DE/AT/CH)
```
Hochzeitsspiele modern
interaktive Hochzeitsspiele
moderne Hochzeitsunterhaltung
Hochzeit Unterhaltung Gäste
Cocktail Empfang Spiele Hochzeit
Hochzeit Quiz Gäste
Hochzeitsquiz Fragen Brautpaar
```

### Planner-intent seeds (for `/planners` page)
```
wedding entertainment vendor
unique wedding vendor ideas
wedding planner entertainment ideas
reception entertainment vendor
```

---

## Phase 2 — Expand via Labs

**Endpoint:** `POST /v3/dataforseo_labs/google/keyword_ideas/live`

For each seed, call Keyword Ideas + Related Keywords. Run seeds in batches of 10 (API limit per request).

```json
{
  "keywords": ["wedding reception games", "wedding trivia questions about the couple", ...],
  "language_name": "English",
  "location_name": "United States",
  "include_serp_info": false,
  "limit": 1000
}
```

Run twice — once for EN/US, once for EN/GB. For DE seeds: `"language_name": "German"`, `"location_name": "Germany"`.

**Expected output:** 3,000–6,000 raw candidates.

**Filter immediately:**
- Keep: contains any of `game | entertainment | reception | activity | activities | trivia | quiz | icebreaker | cocktail | roast | bingo | scavenger | ideas | interactive | fun | unique | personalized | custom | Hochzeit | Spiele | Quiz`
- Kill: `venue | dress | budget | invitation | RSVP | registry | photographer | florist | DJ | cake | catering | flowers | seating | checklist`
- Kill: branded terms (The Knot, Zola, Joy, Kahoot, etc.)

Expected post-filter: ~500–800 candidates.

---

## Phase 3 — Enrich with volume + CPC

**Endpoint:** `POST /v3/keywords_data/google_ads/search_volume/live`

Batch the filtered candidates (up to 1,000 per request). Get: `search_volume`, `cpc`, `competition` (low/medium/high).

```json
{
  "keywords": ["<filtered list>"],
  "language_name": "English",
  "location_name": "United States"
}
```

**Filter:**
- `search_volume >= 100` (below this, even #1 position won't move needle)
- `search_volume <= 30,000` (above this, you're competing with The Knot — skip)

Sweet spot for Wepho: **200–5,000 monthly US searches**. CPC is secondary signal — higher CPC means commercial intent, which is good.

Expected post-filter: ~100–200 candidates.

---

## Phase 4 — SERP competition check

**Endpoint:** `POST /v3/serp/google/organic/live/advanced`

Run only your **top ~100 candidates** (prioritized by volume). This is the most expensive phase (~$0.30 for 100 keywords at $0.003/call).

```json
{
  "keyword": "wedding reception games",
  "language_name": "English",
  "location_name": "United States",
  "device": "mobile",
  "depth": 10
}
```

For each SERP, record:
- Does an **AI Overview** appear? → flag as GEO-priority, not pure SEO
- Does a **featured snippet** appear? → check if you can steal it (direct answer format)
- Who ranks 1–3? → check if they're wedding-info aggregators (beatable) or The Knot/Zola (tough)
- **Keyword difficulty proxy:** if positions 1–5 are all DA 70+ domains, flag as hard

**Practical shortcut:** instead of calling 100 SERPs, do the 30 highest-volume ones. Extrapolate competition for the rest by looking at who the top domains are from the Labs output.

---

## Phase 5 — Competitor gap analysis

Pick 2–3 actual competitors ranking for your terms. Good candidates to check:
- `bridalguide.com` (listicle content)
- `weddingwire.com` (entertainment section)
- `brides.com`

**Endpoint:** `POST /v3/dataforseo_labs/google/ranked_keywords/live`

```json
{
  "target": "bridalguide.com",
  "language_name": "English",
  "location_name": "United States",
  "limit": 1000,
  "filters": [
    ["keyword_data.keyword_info.search_volume", ">", 100],
    ["ranked_serp_element.serp_item.type", "=", "organic"]
  ]
}
```

Look for keywords they rank 4–20 for that you don't have in your list yet. Those are the easiest wins — already proven to rank, competitor isn't fully optimized.

---

## Phase 6 — Final shortlist + page assignment

Target: **80–120 keywords** assigned to pages.

| Page type | Keyword count | Volume profile | Example |
|---|---|---|---|
| Category listicles (`/blog/`) | 20–30 | 500–10k | "unique wedding reception ideas" |
| Game-specific long-tail | 40–60 | 100–2k | "wedding trivia questions about the couple" |
| `/apps/[slug]` pages (SEO) | 20–30 | 100–1k | "wedding bingo cards for guests" → `/apps/wedding-bingo` |
| `/planners` | 5–10 | 200–2k | "unique wedding vendor ideas" |
| German-language | 10–20 | 100–1k | "Hochzeitsspiele modern" |

For each keyword, record: target URL, primary intent (informational / commercial), AI Overview present (Y/N), estimated difficulty (easy/medium/hard).

---

## Phase 7 — Monthly rank tracking

Once the site has content, set up a lightweight cron.

**Endpoint:** `POST /v3/serp/google/organic/task_post` (task-based, not live — 4× cheaper)

Track ~80 keywords monthly. Cost: ~$0.05/month.

Store per keyword: date, position, URL that ranked, SERP features present. Diff month-over-month to see what's moving.

**Only add weekly tracking** for keywords where you're in positions 4–15 (tracking the climb is worth it). Don't pay for weekly tracking on keywords you're not yet appearing for.

---

## Execution order

1. Sign up / top up DataForSEO ($50 minimum). Docs: `https://docs.dataforseo.com/v3/`
2. Phase 2 (Labs expand) — ~$0.50
3. Phase 3 (volume enrich) — ~$0.05
4. Phase 4 (SERP spot-check, top 30) — ~$0.09
5. Phase 5 (competitor gap, 2 domains) — ~$0.02
6. Build shortlist in a spreadsheet / Notion / Postgres
7. Assign to page types (feeds `strategy.md` content calendar)
8. Phase 7 tracking after first content is live

**Total research cost: under $1.** Most of the $50 deposit stays for rank tracking and future research rounds.

---

## What to do with the output

- Feed the shortlist into `strategy.md`'s content calendar — each keyword gets a target page and a month
- High-AI-Overview keywords → flag for `../ai-seo/` treatment (structured answers, citations)
- German-language results → separate content calendar (consider whether DE is in scope before investing)
- Any keyword with `search_volume > 5,000` → reconsider; you probably can't outrank The Knot for those without significant domain authority
