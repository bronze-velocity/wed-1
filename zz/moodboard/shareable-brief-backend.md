# Shareable Moodboard Brief — Backend Plan

Supersedes Task 8 (URL-encoded sharing) in `moodboard-implementation-plan.md`. Goal: a real URL like `wepho.com/moodboard/jack-and-simone` that anyone can open and see the results — with a couple-chosen slug when they want one, or a short random id otherwise. Overwrite-always: no availability checks, last write wins.

Wepho is self-hosted (Node + Docker on our own host — no Vercel/Netlify), so we run our own Redis alongside the app.

---

## URL shape

- `POST /api/moodboard/share` → `{ slug, url }`
- `GET  /moodboard/[slug]` → server-rendered results page (fetches the stored brief, hydrates `MoodboardResults`)

Slug rules:
- If the couple typed a name → `slugify(name)` (lowercase, `-` separated, strip non `[a-z0-9-]`, collapse dashes, trim, cap at 60 chars).
- Empty / all-stripped / reserved → fall back to a 7-char `nanoid` from a URL-safe alphabet.
- Reserved list (hardcoded in `lib/moodboard/slug.js`): `new`, `edit`, `api`, `admin`, and any existing/future route segment under `/moodboard/`.
- **No collision check.** Same slug = overwrite. Couples get told this at the input: "Anyone who visits this link sees your latest version."

---

## Storage — Redis in Docker

A single Redis container next to the Node app on the same host. No cloud vendor, no lock-in.

### Compose fragment

```yaml
# docker-compose.yml (fragment)
services:
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: ["redis-server", "--save", "60", "1", "--appendonly", "yes"]
    volumes:
      - redis-data:/data
    # Only exposed on the internal Docker network — do NOT publish to the host
    # unless you also add `--requirepass` and a real password.

  web:
    # existing Wepho Next.js service
    environment:
      REDIS_URL: redis://redis:6379
    depends_on:
      - redis

volumes:
  redis-data:
```

Persistence: RDB snapshots + AOF. If the host reboots, briefs survive. Backups: rsync the `redis-data` volume nightly to wherever we keep everything else.

### Access from Node

Client: `ioredis` (mature, resilient, works everywhere).

- Env var: `REDIS_URL` (e.g. `redis://redis:6379` in prod, `redis://127.0.0.1:6379` in local dev).
- Key: `moodboard:brief:{slug}`
- Value: JSON string.
- TTL: none. Briefs are meant to survive to the wedding date.
- Item size: < 8 KB.

If `REDIS_URL` is unset (typical for local dev without Redis), the store falls back to an in-memory `Map`. Shared briefs work in a single-process dev server but reset on restart — good enough for hacking on the UI.

---

## Stored brief shape

```js
{
  slug: 'jack-and-simone',
  createdAt: '2026-08-24T14:22:00.000Z',
  answers: { /* full wizard answers object, same as sent to /api/moodboard/match */ },
  results: { /* the Claude response: threeWords, matches, hiddenMatches */ },
  meta: {
    coupleName: 'Jack & Simone',   // optional, only if provided
    role: 'couple' | 'planner',
  },
}
```

One blob = everything needed to render the results page without re-calling Claude.

---

## API contract

### `POST /api/moodboard/share`
Body:
```json
{
  "answers": { ... },
  "results": { ... },
  "desiredSlug": "Jack & Simone",
  "meta": { "coupleName": "Jack & Simone", "role": "couple" }
}
```
Handler:
1. `slug = slugify(desiredSlug)` → if empty or reserved → `newSlug()` (nanoid, 7 chars).
2. `SET moodboard:brief:${slug} <json>` — no `NX`, always overwrite.
3. Return `{ slug, url: `${SITE_URL}/moodboard/${slug}` }`.

No auth. Rate-limit by IP (reuse the in-memory map from `/api/moodboard/match`, 20/hr). No captcha in v1.

### `GET /moodboard/[slug]` (page, not API)
`app/moodboard/[slug]/page.js`:
- Server component. `const brief = await getBrief(slug)`.
- If missing → `notFound()`.
- If present → render `<MoodboardResults results={brief.results} answers={brief.answers} shared />`.
- `generateMetadata`: pull `meta.coupleName` + `results.threeWords` into title/OG for real link previews (this is the whole point of moving off base64).
- `export const dynamic = 'force-dynamic'` — briefs can be overwritten, so no ISR caching.

---

## Client changes

In `MoodboardResults` Section 4:

- Replace the base64-link copy with a **Get a shareable link** block:
  - Slug input, prefilled from `slugify(coupleName)` if we have one.
  - Placeholder: `jack-and-simone`
  - Helper text: `wepho.com/moodboard/` + `<slug-preview>` + " · Anyone with this link can view it. Sharing the same name again replaces the old one."
  - Button: **Get my link →**
- On click → `POST /api/moodboard/share` → show returned URL with a copy button + "Open".

---

## What needs adding (concrete diff)

- **New deps:** `ioredis`, `nanoid`.
- **Env vars:**
  - `REDIS_URL` (e.g. `redis://redis:6379`)
  - `SITE_URL` (e.g. `https://wepho.com`, used to build absolute share URLs)
- **New files:**
  - `lib/moodboard/slug.js` — `slugify()`, reserved list, `newSlug()` (nanoid).
  - `lib/moodboard/briefStore.js` — thin wrapper: `saveBrief(brief)`, `getBrief(slug)`. Redis in prod, in-memory Map fallback if `REDIS_URL` unset.
  - `app/api/moodboard/share/route.js` — POST handler above.
  - `app/moodboard/[slug]/page.js` — server-rendered shared results.
- **Modify:**
  - `components/moodboard/results/MoodboardResults.js` — slug input + save flow.
  - `app/robots.js` — `Disallow: /moodboard/*` sub-paths (still allow `/moodboard`).
  - `docker-compose.yml` — add the Redis service.
- **Leave alone:**
  - `app/sitemap.js` — already excludes slug pages.
  - `app/api/moodboard/brief/route.js` — that's the email-brief flow, unrelated.

---

## Why this stays "seamless"

- One POST, one GET. No auth, no email verification, no availability dance.
- Overwrite semantics mean the couple can refine their brief and reshare the same link — no "brief-v2" clutter.
- The slug fallback means every result is shareable in one click even if the couple never types a name.
- Real URLs unlock real OG previews (huge for planner Slack/WhatsApp shares) — the payoff for adding a tiny bit of backend.

---

## Deferred (explicitly not v1)
> top 3 in progress too
- Editing after save (couple wants to tweak) → for now: re-run the wizard, save with the same slug, it overwrites.
- Analytics on brief views.
- Automatic expiry — none. Briefs live forever; manual cleanup via `redis-cli`.
- Password-protected briefs.
- "Claim this slug" for planners who want a stable URL across many couples.
