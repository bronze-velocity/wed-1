# Experiment — Enrich keyword list with volume + CPC

Phase 3 of `../seo/keyword-research-plan.md`. Takes a JSON keyword list and
hits DataForSEO's Google Ads Search Volume (live) endpoint to attach monthly
search volume, CPC, and competition to each keyword.

## Prereqs

1. DataForSEO account with credit. Sign up at https://dataforseo.com — top
   up $50 minimum for live use. Sandbox (`SANDBOX=1`) is free but returns
   fake data.
2. API credentials: **login** (usually your email) and an **API password**
   generated in the dashboard (not your account password).

Add to `.env.local` at the repo root (already gitignored via `.env*.local`):

```
DATAFORSEO_LOGIN=you@example.com
DATAFORSEO_API_PASSWORD=your-api-password
```

The script auto-loads `.env.local`; real env vars still take precedence.

## Run

Default (uses `distribution/seo/keyword-seeds.json` → writes
`distribution/seo/keyword-seeds.enriched.json`):

```bash
node scripts/enrich-keywords-volume.mjs
```

Custom input/output:

```bash
node scripts/enrich-keywords-volume.mjs path/to/input.json path/to/output.json
```

## Input shape

Canonical: an array of objects matching `distribution/seo/keyword-seeds.json`:

```json
[
  {
    "keyword": "wedding reception games",
    "category": "reception_entertainment",
    "tail": "head",
    "intent": "informational",
    "seed": true
  }
]
```

Bare strings are also accepted. Any extra fields are preserved verbatim on
the output, so the file stays pipelineable through later phases.

Rows with `category: "german"` are auto-routed to the German/Germany locale;
everything else goes to English/United States. Batches of up to 1000
keywords per API call.

## Cost

Live endpoint: **$0.09 per task** (1 task = up to 1000 keywords). The current
`keyword-seeds.json` is ~145 keywords across two locales → 2 tasks → **~$0.18**.

**A 5-keyword test costs the same as a 1000-keyword call** — pricing is per
task, not per keyword. Skip the "small test run" reflex. To sanity-check the
plumbing without spending, run against the free sandbox (returns dummy data):

```bash
SANDBOX=1 node scripts/enrich-keywords-volume.mjs
```

Then commit to the full real run once the sandbox call succeeds end-to-end.

## Output

Two files, both plain arrays of objects with the **same shape as the input**
plus enrichment fields:

- `keyword-seeds.enriched.json` — every enriched row.
- `keyword-seeds.enriched.shortlist.json` — Phase 3 filter applied
  (`100 ≤ search_volume ≤ 30 000`, sorted by volume desc).

Each row keeps its original metadata (`category`, `tail`, `intent`, `seed`,
etc.) and adds: `location`, `language`, `search_volume`, `cpc`,
`competition`, `competition_index`, `low_top_of_page_bid`,
`high_top_of_page_bid`, `monthly_searches` (12-month array).

The console prints the top 20 by volume as a quick sanity check.

## Next step

Feed the shortlist into Phase 4 (SERP competition check) — pick the top ~30
by volume and run them through the SERP API.
