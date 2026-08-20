# API Free Tiers & Trial Credits

Which APIs from `dataforseo-api.md` offer free access, trial credits, or free starting searches.

> Verify all details at each provider's pricing/signup page before relying on them — free tier terms change frequently.

---

## DataForSEO — ✅ Best free entry

- **$1 credit on signup** — no credit card required to register. At Standard Queue rates ($0.60/1k SERPs), ~1,500 free real API calls.
- **Free Sandbox** — unlimited use, returns structurally identical (simulated) responses. Lets you build and test all integration code for free before touching real credits.
- Verdict: most generous free tier of the group for a developer evaluating the API.

---

## SerpApi — ✅ Recurring free plan

- **250 searches/month, every month** — not a one-time trial, a permanent free tier.
- No credit card required to start.
- Caveat: 250 searches goes fast; SerpApi is also 5–25× more expensive than DataForSEO per SERP on paid plans.

---

## Semrush — ⚠️ Limited free plan, trial needs card

- **Free plan** (no card): 10 requests/day, 1 project, 10 tracked keywords. Very restricted for programmatic use.
- **14-day trial** (card required, cancel anytime): full plan access, but API access is only unlocked on the Advanced plan (~$500/mo). The trial covers the UI, not necessarily a developer API workflow.
- No standalone free API credits.

---

## Ahrefs — ❌ No free API access

- No free trial (the old $7 trial was discontinued in 2020).
- **Ahrefs Webmaster Tools** is free (Site Explorer + Site Audit for your own verified domain) but this is a UI product, not an API.
- API access requires the Enterprise plan or a separate API subscription ($500–$10,000/month). No free tier or trial credits for the API.

---

## Keywords Everywhere — ⚠️ Partial free features, no free credits

- Many features are free without credits: keyword ideas, traffic metrics, Moz link metrics, SEO/YouTube metrics, social signals, AI prompt templates.
- No traditional free trial with credits; no reported free starting credit balance.
- Paid plans start at $84/year. The free features are useful for manual browser-based research but not for automation.

---

## Google Ads API / Keyword Planner — ✅ Free, with a precision catch

- **Free** — no spend required; create a Google Ads account without launching a campaign or entering payment info (Google removed the billing requirement in 2023).
- **Catch**: accounts with no active ad spend see search volumes as broad ranges (e.g. 1K–10K) instead of precise numbers. This limits competitive analysis significantly.
- For keyword research supplementation it's useful; for precise volume data you need active spend.
- API access requires OAuth/MCC setup (see `dataforseo-api.md`).

---

## Google Trends / pytrends — ✅ Effectively free

- Google Trends is free to use; `pytrends` is an unofficial Python client that scrapes it.
- Data is relative (0–100 index), not absolute volume. Good for seasonality signals.
- Rate-limited informally — aggressive scraping gets blocked. Not suitable for bulk automation.

---

## Summary table

| API | Free tier? | What you get | Card required? |
|-----|-----------|--------------|----------------|
| DataForSEO | ✅ Yes | $1 credit (~1,500 SERPs) + unlimited Sandbox | No |
| SerpApi | ✅ Yes | 250 searches/month (recurring) | No |
| Semrush | ⚠️ Partial | 10 requests/day (UI); 14-day trial (API needs Advanced plan) | No (free plan) / Yes (trial) |
| Ahrefs | ❌ No | Webmaster Tools (UI only, own domain) | — |
| Keywords Everywhere | ⚠️ Partial | Free browser features; no free automation credits | No |
| Google Keyword Planner | ✅ Yes | Free but range-only volumes without ad spend | No |
| Google Trends / pytrends | ✅ Yes | Relative trend data, rate-limited | No |
