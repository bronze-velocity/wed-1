# DataForSEO API — Evaluation

The main affordable, pay-as-you-go source of SERP, keyword, and backlink data. Best fit for a solo builder who wants programmatic keyword research and rank tracking without a Semrush/Ahrefs subscription.

> **Product-fit note.** For a bespoke reception-app service, keyword volume in your niche is modest (hundreds to low-thousands/month per term). DataForSEO is still the right choice — cheaper than SerpApi/Semrush, sufficient depth, and the AI Overview endpoint doubles as a GEO signal. Skip the Backlinks and Merchant endpoints; you don't need them. Focus on Labs (keyword ideas), Keywords Data (volumes), and SERP API (rank + AIO checks).

> All pricing figures below reflect published rates through early 2026 and must be re-verified at https://dataforseo.com/pricing before budgeting.

---

## Product

- Website: https://dataforseo.com
- Docs: https://docs.dataforseo.com/v3/
- Dashboard: https://app.dataforseo.com

---

## Endpoint families

- **SERP API** — Google, Bing, Yahoo, Baidu, Naver, YouTube. Organic, ads, maps, images, news, jobs, shopping, featured snippets, People Also Ask, and **AI Overviews / AI Mode** (added 2024-25 for Google's SGE).
- **Keywords Data API** — Google Ads volumes/CPC/competition, Bing volumes, Google Trends, keyword suggestions, keywords-for-site, search-intent.
- **DataForSEO Labs** — their own database: keyword ideas, related keywords, ranked-keywords for a domain, SERP competitors, historical SERP, keyword difficulty, bulk metrics. The workhorse for cheap keyword research.
- **Backlinks API** — backlink profiles, referring domains, anchors, history.
- **On-Page API** — crawl a site, Lighthouse, page-level issues.
- **Content Analysis API** — brand/keyword mentions across the web, sentiment.
- **Domain Analytics** — WHOIS, tech stack, categorization.
- **App Data** — Google Play and App Store listings, reviews, rankings.
- **Business Data** — Google Business Profile, Google reviews, Trustpilot, Tripadvisor.
- **Merchant** — Amazon/Google Shopping.
- **AI Optimization / LLM endpoints** — newer suite (2024-25), covers AI Overviews inside SERP API; ChatGPT/Perplexity coverage is evolving — check the changelog at https://docs.dataforseo.com/v3/changelog/.

---

## Pricing model (verify all figures)

- **Pay-as-you-go with prepaid credit.** Minimum top-up historically **$50**. No subscription required.
- **SERP API (Standard, task-based)** — ~**$0.0006 per SERP** ($0.60 per 1,000).
- **SERP API (Live, regular)** — ~**$0.002 per SERP**.
- **SERP API (Live Advanced)** — ~**$0.003 per SERP**.
- **Keywords Data — Google Ads volume** — ~**$0.05 per 1,000 keywords** in a bulk call (very cheap).
- **DataForSEO Labs** — ~**$0.01–$0.02 per request**, each returning up to 1,000 keywords.
- **Backlinks** — ~**$0.02 per request** for summary/referring domains.
- **On-Page** — ~**$0.00025 per page crawled**.
- Volume discounts above ~$1,000/mo.

For a solo builder: **$50–$100/month covers substantial keyword research and weekly rank tracking for a few hundred terms.**

---

## Auth, format, limits

- **Auth**: HTTP Basic Auth with login (email) + password (or an API-specific password from the dashboard).
- **Format**: JSON in/out.
- **Task vs Live**: Task-based (POST → poll or webhook; cheaper, minutes latency) vs Live (synchronous; more expensive, seconds).
- **Rate limits**: 2,000 API calls/minute and 30 simultaneous requests per account by default; raise on request. Very generous vs SerpApi/Semrush.

---

## Alternatives — trade-offs

- **SerpApi (serpapi.com)** — cleanest SERP JSON, best for one-off scraping. Plans start ~$75/mo for 5,000 searches (~$0.015 each). **5–25× more expensive per SERP** than DataForSEO. Better docs, faster support.
- **Semrush API** — powerful, but Business plan ~$500/mo minimum + API top-up. Overkill for a solo builder.
- **Ahrefs API** — best backlink data. New v3 credit-based, requires Ahrefs subscription.
- **Keywords Everywhere** — browser extension + cheap credits ($10 = 100k). Good for manual research, not automation.
- **Google Ads API (Keyword Planner)** — free but volume-bucketed unless you spend on ads; strict OAuth/MCC. Fine as a supplement.
- **Google Trends (unofficial via pytrends or SerpApi's trends engine)** — free-ish, relative not absolute. Good for seasonality validation.

For **AI/GEO tracking specifically**: DataForSEO returns AI Overview blocks inside Google SERP responses. For ChatGPT Search / Perplexity / Gemini answer tracking see purpose-built tools in `../geo/tactics-and-tools.md`. DataForSEO is cheaper if you just need AI Overview presence.

---

## Starter workflow

**(a) Find a keyword set**
1. Seed 20–30 wedding tool terms.
2. Call **Labs → Keyword Ideas** and **Related Keywords** for each seed → deduplicate → ~5k candidates. Cost ~$0.50.
3. Bulk-enrich with **Keywords Data → Google Ads Search Volume** (up to 1,000 kw per request) for volume/CPC. A few cents.
4. Filter: volume >100, KD <40, informational or tool intent.

**(b) Analyze SERP competition**
1. For your ~200 shortlisted keywords, call **SERP API (Live Advanced, Google organic)** — captures organic, AI Overviews, PAA, featured snippets. Cost ~$0.60.
2. Parse who ranks top 10 and which SERP features exist. Deprioritize pure informational pages where AI Overviews eat the click.
3. Use **Labs → SERP Competitors** and **Ranked Keywords** on top competitors to find content gaps.

**(c) Monthly rank tracking**
1. Store your target ~200 keywords in Postgres.
2. Cron once a month: SERP API task-based POST for each keyword with your domain filter. Cost ~$0.12/month for 200 kw, or ~$1.50/month weekly.
3. Store position, URL, SERP-feature presence. Diff month-over-month.

**Total tooling cost for launch year: under $20/month** in DataForSEO credits.

---

## URLs to verify before spending

- https://dataforseo.com/pricing
- https://docs.dataforseo.com/v3/
- https://docs.dataforseo.com/v3/serp/google/organic/live/advanced/
- https://docs.dataforseo.com/v3/dataforseo_labs/overview/
- https://docs.dataforseo.com/v3/changelog/  ← for AI/LLM endpoint status
- https://serpapi.com/pricing
