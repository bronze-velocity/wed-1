# Reddit APIs for Monitoring New Threads in Subreddits

Practical options for pulling new posts from specific subreddits (e.g. r/weddingplanning, r/weddingsunder10k, r/engaged) — sorted from easiest/cheapest to most robust.

---

## 1. Reddit's Public JSON Endpoints (free, no auth, no signup)

Any Reddit listing URL accepts `.json` and returns the same data.

```
https://www.reddit.com/r/weddingplanning/new.json?limit=100
https://www.reddit.com/r/weddingplanning/new.json?limit=100&after=t3_xxxxx
```

- **Cost:** free
- **Auth:** none
- **Rate limit:** ~10 requests/min per IP unauth (loosely enforced, but Reddit *has* been tightening this since 2023)
- **User-Agent:** must set a descriptive UA header or you get 429/403 (`User-Agent: wepho-monitor/0.1 by u/yourname`)
- **Limits:** returns up to 100 items per call; paginate with `after=` cursor. `new.json` only goes back ~1000 posts total.
- **Gotchas:** unofficial for production use; can 429 without warning; no guaranteed SLA.

Good enough for a cron job that polls every 5–15 minutes.

---

## 2. Official Reddit API via OAuth (free, 100 QPM)

The blessed path. Same data, higher limits, needs a free app registration.

- Register app at https://www.reddit.com/prefs/apps → "script" type → get `client_id` + `client_secret`
- Auth flow: `POST https://www.reddit.com/api/v1/access_token` with basic auth → bearer token (valid ~1 hour)
- Then hit `https://oauth.reddit.com/r/weddingplanning/new?limit=100`
- **Rate limit:** 100 queries/minute per OAuth client (as of 2024 pricing change) for non-commercial use
- **Cost:** free for non-commercial; commercial use is $0.24 per 1K API calls above the free tier (this is the change that killed Apollo/RIF in 2023)
- **"Commercial" definition is fuzzy** — internal tooling for lead-gen has bitten some devs. Read the Data API Terms before scaling.

**Python:** use [PRAW](https://praw.readthedocs.io/) — thin wrapper, handles auth + rate limiting.
**Node:** [snoowrap](https://github.com/not-an-aardvark/snoowrap) (unmaintained but works) or roll your own with `fetch`.

---

## 3. Pushshift (via Arctic Shift) — historical archive, limited live

Pushshift was *the* research API for Reddit history. Reddit killed public access in 2023; it's now moderator-only.

- **Arctic Shift** (https://arctic-shift.photon-reddit.com/) is the community successor: full dumps of historical Reddit data, downloadable as monthly `.zst` files, plus a search API.
- Best for backfilling historical wedding threads to find keyword patterns, not for real-time monitoring.
- Free.

---

## 4. Third-party paid APIs (if you want to skip the plumbing)

- **Apify Reddit Scraper** (https://apify.com/trudax/reddit-scraper) — pay-per-result, ~$0.30 per 1K posts. Handles rate limits + rotating proxies for you.
- **SocialGrep** (https://socialgrep.com/) — search/keyword-focused Reddit API, has a free tier (~100 queries/day) + paid plans from ~$10/mo. Better for keyword monitoring across all of Reddit than for subreddit-firehose.
- **Bright Data / ScrapingBee / Oxylabs** — general-purpose scrapers with Reddit templates. Overkill unless you're already using them.

---

## 5. RSS (dead simple, no code)

Every subreddit exposes RSS for its listings:

```
https://www.reddit.com/r/weddingplanning/new.rss
https://www.reddit.com/r/weddingplanning/search.rss?q=photographer&restrict_sr=1&sort=new
```

- **Cost:** free, no auth
- Pipe into Feedly, Inoreader, n8n, Zapier, or a self-hosted feed reader for alerting
- Limited to ~25 items per pull, no historical backfill
- **Best for:** low-volume passive monitoring / Slack-alerting on new posts matching a keyword

---

## Recommendation for Wepho lead-monitoring

**Start:** RSS + Inoreader keyword alerts on `r/weddingplanning`, `r/weddingsunder10k`, `r/engaged`, `r/weddingphotography`, `r/weddingdj`, filtered on terms like *"interactive"*, *"guest experience"*, *"reception activity"*, *"photo booth alternative"*. Zero code, done in an afternoon.

**If that gets noisy or you want dashboards:** OAuth + PRAW cron job every 10 min → SQLite → filter → email/Slack digest. Free, ~50 lines of Python.

**Skip:** paid scrapers until volume justifies it. Reddit's own OAuth quota is more than enough for monitoring ~20 subreddits.
