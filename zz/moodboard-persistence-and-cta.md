# Moodboard — Persistence, Cross-Device Resume, and Always-On CTA

## 1. Current storage situation (as of today)

**Nothing is persisted.** All state lives in React `useState` inside `components/moodboard/MoodboardWizard.js`.

| Scenario | What happens today |
|---|---|
| Refresh / accidental tab close mid-flow | All answers lost. Restart from Step 1. |
| Close browser, come back tomorrow | Same. Nothing survives. |
| Open a second tab | Second tab starts fresh; tabs don't share state. |
| Different browser / device | No cross-device resume — we have no user identity until email is submitted at the results screen. |
| Finish flow → get results → close | Results and answers are lost unless the user (a) clicks "Send me a copy" (email via `/api/moodboard/brief`) or (b) clicks "Copy link" which base64-encodes `{results, answers}` into `?brief=…` (and note: `app/moodboard/page.js` does **not** currently read that param back — the share URL is generated but not consumed).

**Server side:** answers are POSTed to `/api/moodboard/match` (LLM call, response returned, nothing stored) and `/api/moodboard/brief` (Nodemailer send, nothing stored).

## 2. Suggested persistence layers

Layered from cheapest → most complete. Ship 1 and 2; consider 3 later.

### Layer 1 — `localStorage` autosave (same-browser resume)
- Debounced write of `{ answers, step, savedAt }` under key `wepho.moodboard.v1` after every `onNext` / freeform edit.
- On mount, if a saved payload exists **and** is <30 days old, show a small non-blocking banner: *"Pick up where you left off? [Continue] [Start fresh]"* — don't auto-restore silently (a couple sitting down together may want a clean start).
- Clear the key when the brief is emailed (they've captured it) or when the user explicitly starts fresh.
- Covers the biggest real failure mode (accidental refresh, coming back later same day) with zero backend and zero PII.

### Layer 2 — URL-encoded resume link (cross-device, no account)
- The `?brief=<base64>` pattern is already half-built. Finish it:
  - `app/moodboard/page.js` reads the param, decodes, and jumps straight to results (or into the wizard with pre-filled answers if `results` is absent).
  - Add a "Copy resume link" affordance at any point in the wizard (not just at the results screen) so a couple planning together can share progress via message/email.
- Payload gets long fast — cap it (~2KB) or truncate freeform fields before encoding, or use LZ-string compression.
- Fully client-side, no PII stored anywhere.

### Layer 3 — Optional server-side resume (only if metrics justify it)
- Introduce a `brief_id` (UUID) written to a small KV store (Vercel KV / Upstash) when a user chooses "Save my progress" — explicit opt-in only, never automatic.
- Return a short link (`/moodboard/r/abc123`) instead of a giant base64 URL.
- TTL = 30 days, then hard delete.
- Only justified if analytics show meaningful drop-off between "started" and "finished" that L1 + L2 aren't recovering.

## 3. GDPR-clean approach

The wizard collects freeform text about a couple's private life. Even without names, that's personal data the moment it's stored server-side or tied to an email. Principles:

- **Local-first by default.** Layer 1 (`localStorage`) is not "processing" under GDPR when it's purely client-side and the user controls their own browser — no notice required beyond a mention in the privacy policy that we use it. No cookie banner needed for functional local storage.
- **No third-party analytics inside the wizard.** Vercel Analytics (aggregated, cookieless) is fine; anything that fingerprints or sends answers to a third party is not.
- **Explicit consent at the email gate.** The email box on the results screen already collects PII. Add:
  - A clear purpose statement: *"We'll email your brief and may follow up once about your wedding. That's it."*
  - An unticked checkbox: *"I'd like Wepho to keep my brief so we can pick up the conversation."* (This is the lawful basis for keeping the row on the server past the email send. Without it, delete the answers after the email is sent.)
  - Link to a privacy policy that names the data categories, retention (e.g., 90 days), and how to request deletion (`hello@wepho.com`).
- **Data minimisation.** Don't POST the whole `answers` blob to `/api/moodboard/brief` if the LLM has already produced the summary — send only what's needed to build the email.
- **Right to erasure.** Simple manual process is fine at this scale: an email to `hello@wepho.com` triggers deletion of the KV row + any email records. Document it.
- **Retention.** Hard delete server-side answers after 90 days unless the couple has become a customer. Set the KV TTL up front so this happens automatically.
- **Log discipline.** Don't log full answers or emails to Vercel logs — redact freeform fields and mask emails (`j***@live.se`) in any error breadcrumbs.

## 4. Always-visible "Start your moodboard" CTA (site-wide)

Reframe: the always-on CTA across marketing pages should push visitors **into the moodboard**, not out to a call. The moodboard is the qualifier — it produces a warm, pre-briefed lead in ~3 minutes, whereas a raw "book a call" ask converts a much colder slice of traffic. Every marketing surface should treat "Start your moodboard" as the primary action; "Talk to us" / "Book a call" becomes a secondary, quieter fallback.

Rationale: the moodboard already collects the exact context a sales conversation would need (feelings, guests, moments, story, vibes, wildcard) and ends with an email gate. Sending cold traffic to a Calendly is asking for no-shows and unqualified calls; sending them through 6 short steps first means the couple that *does* book has already told us who they are.

### 4a. Primary CTA copy + destination — unify across the site

Today the site mixes "Book your app", "Talk to us about yours", "Find your app" (`NavBar`), and various contact forms. Consolidate:

| Surface | Today | Change to |
|---|---|---|
| `components/layout/NavBar.js` desktop + mobile "Book your app" buttons | `/#book` (or contact) | `/moodboard` — label: **"Start your moodboard"** |
| `components/sections/HomeHero.js` primary CTA ("Talk to us about yours") | contact | `/moodboard` — label: **"Build your moodboard →"** (secondary link "or talk to a human" → `/#book`) |
| `components/sections/FinalCta.js` | contact form section | Lead with a moodboard card ("3 minutes, no signup — see what your night could feel like") + smaller contact form below |
| `components/app-page/AppBookIt.js` (bottom of every `/apps/[slug]`) | contact form | Two-panel: **left** = "Start your moodboard" prefilled with this app pre-selected (`/moodboard?seed=<slug>`); **right** = existing contact form as fallback |
| `components/layout/Footer.js` "Book your app" link | contact | `/moodboard` |
| `components/sections/AppGalleryTeaser.js` | (varies) | Append "Not sure which? Build your moodboard →" beneath the grid |
| `/planners` page hero + FinalCta | contact-only | Same pattern — moodboard primary, contact secondary. Planners get a planner-specific pre-seed (see 4d). |

Global copy rule: the moodboard button verb is always **"Start"** or **"Build"**, never "Try" or "Take" (those imply low commitment / quiz-ness — this is a design tool, not a Buzzfeed quiz).

### 4b. Persistent floating "Start your moodboard" pill (marketing pages only)

Add a small persistent bottom-right pill that appears on all non-wizard marketing pages after the visitor scrolls past the hero (~600px). Not on `/moodboard` itself.

- **Shape:** rounded pill, `var(--radius-full)` — this is one of the *few* exceptions to the "no fully-rounded pills" rule in `CLAUDE.md`, because it's a floating action, not an in-flow control. Confirm with user before shipping; alternative is `var(--radius-md)` to stay strict.
- **Copy:** "Start your moodboard · 3 min" — the duration removes the biggest objection.
- **Behavior:** click → `/moodboard`. Dismissible with an `×` (store dismissal in `localStorage` for 7 days so it doesn't nag).
- **Hide when:** the visitor is already inside the wizard, on `/privacy`, or when a section-level moodboard CTA is currently in the viewport (use `IntersectionObserver` on a `data-moodboard-cta` attribute so the floating pill doesn't double up with an inline one).
- **New component:** `components/ui/MoodboardPill.js`. Mount once in `app/layout.js`; internally it checks `usePathname()` to opt out of `/moodboard/*`.

### 4c. In-wizard chrome — keep the "Talk to us" escape hatch, don't inflate it

The existing `components/moodboard/ui/TalkToUs.js` stays as-is — it's the escape valve, and it correctly stays secondary (small, top-left, subdued). No always-on "book a call" band. If anything, downgrade it further on mobile so it never competes with the primary Next / Back buttons.

Do **not** add a "Book a call" pill to marketing pages. One primary CTA per surface; the call option lives inside the contact section (`#book`) and inside `TalkToUs` for people already mid-wizard.

### 4d. Pre-seeding the moodboard from context

The whole reason to push into the moodboard is that it produces a warm brief. Make sure the entry point captures the visitor's context:

- `/apps/[slug]` deep-links: `/moodboard?seed=<slug>` — pre-select the app on `StepMoments` or `StepVibes` (wherever it maps) so the couple doesn't have to re-answer what they came in wanting.
- `/planners` deep-link: `/moodboard?role=planner` — swaps the intro copy to planner-voice ("Design a moodboard for a couple you're briefing") and routes the resulting email to a different template (`planner-brief`).
- Homepage demo → moodboard: after the Love Letter / Who Said It demo finishes, the CTA changes from "That's the demo — book yours" to **"Design your own moodboard →"**.

Implementation notes:
- Read `searchParams` in `app/moodboard/page.js`, pass `initialSeed` + `role` props into `MoodboardWizard`.
- Store both in the `localStorage` payload from §1 so a resume doesn't lose the seed.

### 4e. Instrumentation to prove it worked

Before rolling out, add three events to whatever analytics layer is live (Vercel Analytics custom events are fine):

1. `moodboard_cta_click` — with `{ surface: 'nav' | 'hero' | 'final' | 'app-book-it' | 'pill' | 'gallery' | 'demo-end', slug?: string }`.
2. `moodboard_started` — first `onNext` from Step 1.
3. `moodboard_finished` — email submitted on results screen.

Success = the ratio `moodboard_finished / (moodboard_finished + contact_submitted)` moves meaningfully up. If it doesn't after ~2 weeks of traffic, revisit — maybe the moodboard needs to be shorter, or the contact form needs to stay more prominent for a specific segment (probably planners).

### 4f. Build order for section 4

1. Unify primary-CTA destination + copy across `NavBar`, `HomeHero`, `Footer`, `FinalCta`, `AppBookIt`, `AppGalleryTeaser`, `planners/page.js`. *(~half a day — mostly find-and-replace + copy tuning.)*
2. Add `?seed=<slug>` and `?role=planner` handling in `app/moodboard/page.js` + `MoodboardWizard`. *(~2 hours.)*
3. Build `components/ui/MoodboardPill.js` and wire it into `app/layout.js` with viewport-collision hiding. *(~2–3 hours.)*
4. Add the three analytics events. *(~1 hour.)*
5. Leave `TalkToUs` untouched inside the wizard. Delete any leftover "Book a call" marketing surfaces that now duplicate the moodboard CTA.

## 5. Suggested build order

1. Layer 1 `localStorage` autosave + resume banner. *(~half a day, biggest UX win.)*
2. Site-wide "Start your moodboard" CTA unification + floating pill + `?seed` / `?role` pre-seeding (see §4). *(~1–1.5 days, direct conversion lever.)*
3. Finish the `?brief=` round-trip so the existing "Copy link" actually works, and expose the same affordance mid-flow. *(~2–3 hours.)*
4. Privacy-policy paragraph + explicit consent checkbox on the email gate. *(~1 hour + legal copy.)*
5. Layer 3 server-side resume — **only** if drop-off analytics show it's needed. Otherwise skip.
