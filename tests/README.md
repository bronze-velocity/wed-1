# Pre-deploy tests

Four checks that run against a fresh production build before every deploy.

## Setup (one-time)

```bash
pnpm install
pnpm exec playwright install chromium
```

## Run everything

```bash
pnpm test:pre-deploy
```

This will:

1. `next build`
2. Boot `next start` on `127.0.0.1:3999` with `CONTACT_TEST_MODE=1` (rate limiter off, mailer forced to log-only).
3. Run route smoke, contact API contract, Playwright e2e, and visual snapshots.
4. Tear down the server and exit non-zero on any failure.

## Flags

- `--skip-build` — reuse the last `.next` build (fastest local iteration).
- `--skip-e2e` — skip Playwright entirely.
- `--skip-visual` — run demo mount test but skip visual snapshots.
- `--update-snapshots` — refresh visual baselines. Commit the changed PNGs.

## What each test covers

| Test | File | Catches |
|---|---|---|
| Route smoke | `smoke-routes.mjs` | 4xx/5xx on any sitemap route, missing `<title>`, missing `<meta name="description">` — i.e. broken `generateMetadata`, missing app slugs, dynamic-route regressions. |
| Contact API | `contact-api.mjs` | Contract regressions on `/api/contact`: valid payload → 200, missing fields / bad email / bad JSON → 400, honeypot silently accepted. |
| Demo mount | `e2e/demos.spec.js` | Homepage Love Letter demo hydrates and transitions into interactive mode without console errors. |
| Visual snapshots | `e2e/visual.spec.js` | Layout/token drift on `/`, `/planners`, and one `/apps/[slug]` at mobile + desktop widths. |

## Individual test runs

Each expects a server already running at `http://127.0.0.1:3999` (or override with `--base=`):

```bash
pnpm test:smoke
pnpm test:contact
pnpm test:e2e
```
