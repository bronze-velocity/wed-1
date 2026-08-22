---
title: ZoomInfo API for wedding-planner prospecting
status: research
date: 2026-08-21
---

# ZoomInfo API — what's actually "free"

**TL;DR — there is no free tier.** ZoomInfo API access is only provisioned through an
enterprise contract (annual, seat-based, with a negotiated pool of API credits).
There is no self-serve signup, no public developer key, no trial.

What people mean by "free ZoomInfo API" is one of two things:

1. **The Search endpoint is credit-free.** Once you have paid API access, calls to
   `POST /gtm/data/v1/companies/search` do **not** consume enrichment credits and
   do **not** count against your record limit — they only count against your
   per-minute/per-day request quota. You can cast a wide net at no marginal cost
   and only spend credits when you decide to enrich a specific company.
2. **The free ZoomInfo Community Edition / Chrome extension**, which is a UI tool,
   not an API. Not useful for scripting.

If you don't already have a ZoomInfo contract, treat the script here as reference —
you won't be able to authenticate. For a bootstrap alternative see the
"Alternatives" section at the bottom.

---

## API basics (new platform, 2026)

- Base URL: `https://api.zoominfo.com`
- Docs: https://docs.zoominfo.com/
- Auth: OAuth 2.0
  - Server-to-server → **Client Credentials** flow
  - Token endpoint: `https://okta-login.zoominfo.com/oauth2/default/v1/token`
  - Scope for company data: `api:data:company`
- Legacy Enterprise API (`api-docs.zoominfo.com`) is being deprecated — target the
  new endpoints.
- Content type on requests: `application/vnd.api+json` (JSON:API shape).

### Get a token (client credentials)

```bash
curl -X POST https://okta-login.zoominfo.com/oauth2/default/v1/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "$ZI_CLIENT_ID:$ZI_CLIENT_SECRET" \
  -d "grant_type=client_credentials&scope=api:data:company"
```

Response contains `access_token` (bearer, short-lived — cache and refresh).

---

## Search Companies endpoint

`POST https://api.zoominfo.com/gtm/data/v1/companies/search`

Request body:

```json
{
  "data": {
    "type": "CompanySearch",
    "attributes": {
      "industryKeywords": "wedding planner",
      "country": "USA",
      "employeeRangeMin": "1",
      "employeeRangeMax": "50"
    }
  }
}
```

Useful attributes:

| attribute | notes |
|---|---|
| `companyName` | exact / partial name |
| `industryCodes` | e.g. `services.eventservices` — ZoomInfo's taxonomy |
| `industryKeywords` | freeform, supports AND/OR — best for "wedding planner" |
| `metroRegion` | e.g. `usa.newyork.newyork` |
| `country`, `state` | geo filters |
| `employeeRangeMin/Max` | as strings |
| `revenueMin/Max` | in $thousands |
| `companyWebsite` | domain filter |

Query params:

- `page[number]` (default 1)
- `page[size]` 1–100 (default 25)
- `sort` — `name` | `employeeCount` | `revenue`; prefix `-` for desc

Response (`200`):

```json
{
  "data": [
    {
      "id": "344589814",
      "type": "Company",
      "attributes": {
        "name": "…",
        "website": "…",
        "revenue": "…",
        "employeeCount": "…",
        "city": "…", "state": "…", "country": "…"
      }
    }
  ],
  "meta": { "totalResults": 2, "page": { "number": 1, "total": 1 } },
  "links": { "first": "…", "last": "…", "next": "…" }
}
```

Search returns **only basic firmographics** — name, website, coarse location,
employee/revenue bands. No contact emails/phones. To get contacts or full
profiles you must call the **Enrich** endpoint with the returned `id`s, and that
**does** consume credits.

Errors: `400` validation · `401` bad token · `403` scope missing · `429` rate limit.

---

## Applying this to Wepho (wedding planners)

Goal: build a cold outreach list of small US wedding-planning firms — decision-maker
lives in a 1–20 person business, we want the owner's contact.

**Strategy (credit-efficient):**

1. Search by `industryKeywords: "wedding planner"` + `country: USA`, page through
   all results — free.
2. Filter results locally: keep firms with `employeeCount` ≤ ~20 (our ICP — the
   owner still runs sales), drop obvious enterprise venues / national chains.
3. Only then call the Enrich endpoint on the filtered subset to spend credits on
   the ones worth pursuing.

The script in `scripts/zoominfo-wedding-planners.mjs` covers steps 1–2 (the free
part) and writes a CSV. Enrichment is intentionally not included — that step is a
budget decision, not a scripting one.

Region variants worth running as separate searches (industryKeywords isn't
geo-scoped in a smart way):

- `metroRegion: usa.newyork.newyork`
- `metroRegion: usa.california.losangeles`
- `metroRegion: usa.california.sanfrancisco`
- `metroRegion: usa.illinois.chicago`
- `metroRegion: usa.texas.austin`

---

## Alternatives if you don't have a ZoomInfo contract

Since API access requires an enterprise deal, these are more realistic starting
points for cold outreach:

- **Google Places / Google Maps Platform** — search "wedding planner near <city>"
  programmatically. Has a real free tier ($200/mo credit). Returns name, website,
  phone, address. No email, but website scrape → contact page usually works.
- **Apollo.io** — free tier includes limited API calls with contact emails.
- **Hunter.io** — email finder, real free tier.
- **The Knot / WeddingWire / Zola vendor directories** — public listings, scrape
  with permission-aware pacing.

For Wepho specifically, **Google Places + website scrape for contact email** is
almost certainly a better first channel than ZoomInfo.

---

## Sources

- https://docs.zoominfo.com/ (new API overview)
- https://docs.zoominfo.com/reference/searchinterface_searchcompany (Search Companies)
- https://cufinder.io/blog/api/zoominfo-api-access-pricing-alternatives/ (pricing/access reality)
- https://generect.com/blog/zoominfo-api/ (2026 review)
- https://api-docs.zoominfo.com/ (legacy, being deprecated)
