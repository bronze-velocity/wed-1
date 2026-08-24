# Shareable Brief — v2 Plan

Follow-ups to `shareable-brief-backend.md`. Three features. Password gate is the baseline everything else runs on top of; the other two are independent.

---

## 0. Password gate (baseline for all brief pages)

Goal: every shared brief page requires a password the couple chose at save time. Non-negotiable — the plain public URL from v1 is going away.

**At save time:**
- Slug input on the results page gets a sibling **Password** input (required, min 4 chars, no upper bound).
- Client sends `{ ..., password }` to `POST /api/moodboard/share`.
- Server hashes it: `passwordHash = scrypt(password, randomSalt)` (Node built-in `crypto.scryptSync`) — never store the plaintext.
- Stored brief shape gains:
  ```js
  auth: {
    passwordHash: '<hex>',
    salt: '<hex>',
  }
  ```
- Response includes `{ slug, url }` as before. The password is **not** part of the URL — couple shares URL + password separately (WhatsApp: link in one message, password in the next).

**At view time:**
- `GET /moodboard/[slug]` becomes a two-step server component:
  1. Read `wepho_unlock_{slug}` HTTP-only cookie. If it equals the stored `passwordHash` (constant-time compare) → render the results.
  2. Otherwise → render `<BriefPasswordGate slug={slug} />` client component with a single password field.
- New route `POST /api/moodboard/unlock`:
  - Body `{ slug, password }`. Loads brief, `scryptSync(password, brief.auth.salt).equals(Buffer.from(brief.auth.passwordHash, 'hex'))`.
  - On match: sets `wepho_unlock_{slug}` cookie (HTTP-only, `SameSite=Lax`, 30-day expiry) with value = the passwordHash, and returns `{ ok: true }`.
  - On miss: `{ ok: false }`, 401, small rate-limit (5/min/IP/slug to blunt brute force).

**Constant-time comparison:** use `crypto.timingSafeEqual` — never a `===`.

**Owner shortcut:** the couple's own browser also gets the unlock cookie on the save response (server sets it as part of `POST /api/moodboard/share`) — so they land on the results page without re-typing what they just typed.

**Copy on the save form:** "Anyone with the link *and* password can view it. Pick a password you'd feel comfortable sharing over WhatsApp."

**Copy on the unlock page:** "This brief is password-protected. The couple who created it will have the password." — no email-recovery flow (we have no accounts).

**Not doing:** per-visitor accounts, magic-link email unlock, forgotten-password reset. If the couple loses their password, they re-run the wizard and overwrite the slug with a new password.

**Files touched:**
- `lib/moodboard/passwords.js` (new) — `hashPassword(pw)`, `verifyPassword(pw, hash, salt)`.
- `lib/moodboard/briefStore.js` — `auth` field in the shape (already flexible).
- `app/api/moodboard/share/route.js` — accept `password`, hash, set unlock cookie in the response; preserve existing `auth` on edit-save (see #1).
- `app/api/moodboard/unlock/route.js` (new) — POST handler above.
- `app/moodboard/[slug]/page.js` — read cookie; render `<BriefPasswordGate />` if missing/invalid.
- `components/moodboard/results/BriefPasswordGate.js` (new) — password input + POST + reload on success.
- `components/moodboard/results/MoodboardResults.js` — password field next to the slug input in `ShareableLink`.

**Effort:** ~3h.

---

## 1. Edit after save (always available)

Goal: anyone who unlocked a brief can tweak it. Save overwrites the same slug and keeps the same password.

**Flow:**
- `/moodboard/[slug]` always shows an **Edit this brief →** button (no ownership check — if you got past the password gate, you can edit; that's the model).
- Click → navigates to `/moodboard/[slug]/edit`.
- New route `app/moodboard/[slug]/edit/page.js`:
  - Cookie-gated exactly like the view route. Missing cookie → render `<BriefPasswordGate />`.
  - Server-fetches the brief, passes `answers` into a new prop on the wizard: `<MoodboardWizard initialAnswers={answers} lockedSlug={slug} />`.
  - `dynamic = 'force-dynamic'`, `robots: noindex`.
- `MoodboardWizard`:
  - New `initialAnswers` prop hydrates the answer state and starts at step 0 (couple taps through and edits whatever they want; step components already re-render selected state from `initialValues`).
  - New `lockedSlug` prop is forwarded to `MoodboardResults`.
- `MoodboardResults` + `ShareableLink`:
  - If `lockedSlug` set → hide the slug input and the password input, replace the button label with **Save changes →**.
  - Save POST body drops `desiredSlug`/`password`, sends `lockedSlug` instead.
- `POST /api/moodboard/share`:
  - If `lockedSlug` present AND the request has a valid unlock cookie for it → load the existing brief, keep its `auth` block, only update `answers` + `results` + `createdAt`. No new password required.
  - If `lockedSlug` present but no valid cookie → 401 (someone hitting the endpoint directly).

**Effort:** ~2h.

---

## 2. Analytics on brief views

Goal: know which briefs are being viewed and how often.

**Two tracks, one signal:**

### Track A — Redis-native counters (cheap, always on)
Every successful unlock (or already-unlocked view) fires a fire-and-forget increment:

```js
// inside lib/moodboard/briefStore.js
export async function recordView(slug) {
  const c = getClient()
  if (!c) return
  const now = Date.now()
  await c.multi()
    .hincrby(`moodboard:brief:${slug}:stats`, 'views', 1)
    .hset(`moodboard:brief:${slug}:stats`, 'lastViewedAt', now)
    .exec()
}
```

- Called from `app/moodboard/[slug]/page.js` with `void recordView(slug)` after we confirm the cookie is valid — never await, never block render.
- Excluded views: bot user-agents (basic regex on `user-agent` header). Owner-exclusion isn't worth the complexity now that we don't have an ownership flag; ignore the double-counting.

### Track B — PostHog event (already installed)
Same page mounts a tiny `<BriefViewBeacon slug={slug} />` client component that calls `posthog.capture('moodboard_brief_viewed', { slug, threeWords, coupleName })` once on mount. Runs only after unlock (component is only in the tree when we render results).

PostHog gives us funnels, retention, referrers. Redis gives the raw counts.

**Displaying stats to us:** no admin UI in v1. Read Redis directly (`redis-cli hgetall moodboard:brief:{slug}:stats`) or query PostHog.

**Effort:** ~1.5h.

---

## Build order

1. **Password gate (#0)** — ship this first, it changes the URL contract.
2. Edit flow (#1) — needs #0 for the cookie check on the save-preserve path.
3. Analytics (#2 Track A + Track B) — one change to `briefStore.js` + one small client component.

Total: ~6.5h.

---

## What we're deliberately NOT building yet

- Full auth / accounts. Password + cookie is the ceiling; no user records.
- Password recovery. Lose it → re-run wizard, overwrite the slug.
- Automatic expiry / TTL. Briefs live forever until we clean them up manually via `redis-cli`.
- Server-side bot filtering beyond user-agent regex (password gate does the heavy lifting anyway).
- A stats dashboard. `redis-cli` + PostHog cover us until the tool is used enough to justify one.
- Version history of edits — we overwrite; that's the whole model.
