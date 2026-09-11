---
title: Pre-launch test plan
status: draft
scope: Wepho marketing site — pre-production sanity checks
---

# Pre-launch test plan

Simple, mostly-manual checks before going live. No test framework required. Goal: catch the embarrassing stuff, not achieve coverage.

---

## 1. Build & basic health

- [ ] `pnpm build` completes with zero errors and no new warnings
- [ ] `pnpm start` boots and serves `/`, `/planners`, `/apps`, `/apps/[slug]`, `/how-it-works`, `/moodboard`, `/blog`, `/privacy`, `/terms`, `/not-found`
- [ ] No console errors or React hydration warnings on any page (check DevTools on each route)
- [ ] `/sitemap.xml` and `/robots.txt` load and list expected routes
- [ ] `next/image` used everywhere — no raw `<img>` in built HTML (grep the repo)

## 2. Routes & SEO

- [ ] Every route has a unique `<title>` and `<meta description>` (view-source spot check)
- [ ] OG image + Twitter card render on 1 homepage + 1 `/apps/[slug]` (test with opengraph.xyz or similar)
- [ ] All 20 `/apps/[slug]` pages statically generate and load
- [ ] Internal links use `next/link`; no dead links (quick crawl with a link checker or `wget --spider -r`)
- [ ] Canonical URLs correct on production domain (not localhost)

## 3. Contact form (highest-risk path — it's the conversion)

- [ ] Happy path: submit from `/` and `/planners` → email arrives at the configured inbox
- [ ] SMTP creds set in production env vars, not committed
- [ ] Validation: empty fields, invalid email, oversized message — all rejected gracefully
- [ ] Basic spam guard works (honeypot / rate limit — whichever is in place)
- [ ] Success + error UI states both render (force an error by breaking SMTP temporarily in staging)
- [ ] No PII logged to server logs

## 4. Interactive demos

- [ ] **Love Letter Machine:** type → approve → reveal flow works on mobile Safari + Chrome
- [ ] **Who Said It?:** full question set plays through, score displays, replay works
- [ ] Both demos are keyboard-navigable and don't trap focus
- [ ] No layout shift when demos mount

## 5. Moodboard

- [ ] Full wizard completes end-to-end (all steps, all branches)
- [ ] `/api/moodboard/brief` and `/api/moodboard/match` return valid responses
- [ ] Handle API failure: shows a graceful error, not a blank screen
- [ ] Results page renders with a real generated brief

## 6. Responsive & cross-browser

- [ ] Spot-check on: iPhone Safari, Android Chrome, desktop Chrome, desktop Safari, Firefox
- [ ] Breakpoints: 375, 768, 1024, 1440 — no horizontal scroll, no broken layouts
- [ ] NavBar mobile menu opens/closes and locks body scroll
- [ ] Footer links all resolve

## 7. Performance (quick pass)

- [ ] Lighthouse on `/` and one `/apps/[slug]` — Performance ≥ 85, SEO ≥ 95, A11y ≥ 90
- [ ] Largest images are optimized (`next/image` with correct `sizes`)
- [ ] No blocking third-party scripts on first paint

## 8. Accessibility (quick pass)

- [ ] Tab through `/` — focus visible on every interactive element, logical order
- [ ] All images have meaningful `alt` (or empty `alt=""` if decorative)
- [ ] Color contrast passes on body text and CTAs (Lighthouse a11y catches most)
- [ ] Forms have proper labels

## 9. Content & legal

- [ ] No lorem ipsum, TODOs, or placeholder copy anywhere
- [ ] Price ($2,000) and CTAs consistent across pages
- [ ] `/privacy` and `/terms` reflect actual practice (contact form, email storage)
- [ ] Copyright year current

## 10. Production environment

- [ ] Env vars set on host: SMTP, any API keys, `NEXT_PUBLIC_*`
- [ ] `NODE_ENV=production`
- [ ] Domain + HTTPS working, no mixed content
- [ ] 404 page renders on unknown route
- [ ] Docker container restarts cleanly; logs go somewhere readable
- [ ] Analytics (if any) firing on page views + contact submit

## 11. Post-launch smoke test (within 15 min of going live)

- [ ] Load homepage on real phone over cellular (not office wifi)
- [ ] Submit the contact form once from the live site with a real email
- [ ] Confirm email delivery within 1 minute
- [ ] Check server logs for unexpected errors
