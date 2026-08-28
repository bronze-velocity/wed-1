# /how-it-works (technical trust page) — plan

## Purpose

One page that answers every "…but will it actually work at our reception?" objection. It's a **trust / reassurance page**, not a conversion page. It exists so we can *link to it* from FAQ, hero subheads, planner page, and per-app pages without cluttering those with technical detail.

Working URL: **`/how-it-works`** (alt candidates: `/tech`, `/reliability`, `/day-of`). `/how-it-works` reads as guest-facing UX explanation; matches how couples/planners phrase the question.

Tone: warm-but-technical. Same brand voice as the rest of the site, but denser and more specific. Concrete numbers where we have them ("<2s to load on venue LTE"), plain language where we don't ("keeps working if the Wi-Fi hiccups").

---

## Comprehensive list of technical aspects to cover

Grouped into 10 clusters. Each cluster becomes one section on the page.

### 1. Zero-install access
- QR code → live app in a browser tab, no App Store, no download
- Passwordless — no account, no email, no signup flow
- Short vanity URL printed on table cards as QR fallback
- Deep links directly into the current activity (guest lands where the action is, not on a homepage)
- Optional guest-name entry only; no identity beyond that
- Installable to home screen (PWA) but never required

### 2. Speed on real venue networks
- First paint <2s on venue LTE / mid-tier Wi-Fi
- Aggressive image optimization (`next/image`, AVIF/WebP)
- Small JS bundle per activity — we only ship what that moment needs
- Server-side rendered so the first screen appears instantly
- Edge-cached static assets
- Preloaded fonts, no layout shift

### 3. Works when the Wi-Fi doesn't
- Offline-tolerant: reads cached content, keeps the UI alive
- Submissions queue locally and sync when connection returns — nothing is lost
- Optimistic UI: taps feel instant even on slow networks
- Automatic reconnect after signal drops (elevator, basement bar, dance floor scrum)
- Graceful degraded mode if the backend hiccups — never a white screen of death

### 4. Real-time without the drama
- Live updates over websockets / SSE — submissions appear on the big screen within a second
- Multi-device sync (dozens of guests submitting simultaneously)
- Backpressure and rate limiting so a spam flood can't take the app down
- Presence-aware (we know who's connected without asking)

### 5. Mobile-first UX
- Portrait-first, thumb-reachable controls
- 44pt+ tap targets everywhere
- One-handed operation (guests are holding a drink)
- Safe-area aware (notches, home indicators)
- Keyboard-aware inputs (won't be hidden behind the software keyboard)
- High-contrast palette that survives dim reception lighting
- Works on the beat-up Android your uncle has, not just the newest iPhone

### 6. Big-screen / display wall
- Separate view optimized for projector or TV
- Legible at 30 feet
- Auto-cycles content, no cursor visible, no admin UI leaking through
- Fullscreen mode
- Handles simultaneous submissions gracefully (queue, batch, animate)
- Custom typography that scales to any aspect ratio

### 7. Moderation & control
- Admin queue on a separate device (planner's phone or laptop)
- One-tap approve / reject / hide
- Optional profanity + spam filter as a first pass
- Blur or pull inappropriate content instantly
- Undo / rollback in case of accidents

### 8. Privacy & data
- No guest data stored beyond the event (configurable retention)
- No account creation, no email harvesting, no ad trackers
- Each event runs on an isolated URL — nothing leaks between weddings
- HTTPS end to end
- Per-event rate limiting / abuse protection
- Guest submissions are the couple's property — full export at the end

### 9. Reliability day-of
- Runs primarily off venue Wi-Fi with LTE fallback pattern
- We monitor every event in real time; if something looks off, we know before you do
- Backup admin flow (planner can advance activities from any device)
- Written pre-event runbook shared with the venue's AV person
- Test-run link the couple can share with a few friends the week before

### 10. Accessibility & keepsake
- Screen-reader labels, semantic markup
- High contrast, no color-only meaning
- Legible type sizes for older guests
- Post-event archive: every message, photo, and quiz result exported as a downloadable keepsake

---

## Page structure

Follows the same rhythm as the rest of the site (`section-py`, `Container`, real photography where possible).

1. **Hero** — "Built for the messiness of a wedding reception."
   Sub: "No app downloads. No accounts. No 'please refresh.' Here's exactly how it works, and what we've done so it doesn't break at 9:47 pm during your parents' toast."
2. **How guests actually get in** — QR → browser → activity, animated diagram, 3 bullets
3. **Speed** — with a real number ("<2 seconds on LTE") and a visual
4. **When the Wi-Fi struggles** — the offline / queue / reconnect story (this is the biggest hidden objection)
5. **Real-time, without the spam** — live updates + moderation queue explained together
6. **Mobile-first** — mocked-up phone screenshots + a note about older phones
7. **The big screen** — display-wall view + why it matters
8. **Moderation & the "what if someone writes something awful" question** — planner + one-tap reject
9. **Privacy** — one paragraph, plain language, no legalese
10. **Day-of reliability** — monitoring, runbook, test link, LTE fallback
11. **Accessibility & keepsake** — quick pair of paragraphs
12. **CTA** — "Talk through your reception setup" → contact form

Each section is a `components/how-it-works/*.js` sub-component. Reuse `Container`, `.section-py`, existing photo backdrops. No new design system tokens needed.

---

## Where to reference from

**FAQ (highest priority)** — several existing questions link straight to specific anchors:
- "Do guests need to download an app?" → `/how-it-works#access`
- "What if the Wi-Fi at our venue is bad?" → `/how-it-works#offline`
- "What happens if someone submits something inappropriate?" → `/how-it-works#moderation`
- "Is our guests' data safe?" → `/how-it-works#privacy`
- "Does it work on old phones?" → `/how-it-works#mobile`

**Homepage hero** — sub-headline gains a subtle inline link: "No apps, no accounts — [just scan and play](/how-it-works)." Understated.

**Homepage objection/reassurance section** — if we have (or add) a "how it works in 3 steps" strip, the last bullet ends with a "See the full technical breakdown →" link.

**`/planners` page** — this is the biggest win. Planners are the *most* technically nervous audience. A prominent card near the bottom: **"The technical reassurance you can pass to the venue's AV lead"** → link. Include a printable one-pager version (future task, not v1).

**`/apps/[slug]` pages** — inside the shared "How it works" or "What guests see" section (per the 7-section structure in `mkting-page-structure-shorter.md`), add a single line: "Runs entirely in the browser — [here's why that matters](/how-it-works)."

**Footer** — small link under a "Trust" or "Details" column: *How it works · Privacy · Contact*.

**Nav** — do **not** add to primary nav. This is a depth page, not a conversion page. Linking from FAQ + planners + footer is the right density.

---

## Build order (if we do this)

1. Draft copy for all 10 sections (this is 80% of the work — the tech content has to be specific and true)
2. Create `app/how-it-works/page.js` with `generateMetadata`
3. Build sub-components in `components/how-it-works/`
4. Add anchor IDs matching FAQ deep-links
5. Wire FAQ answers to the new anchors
6. Add hero-subhead inline link, planner-page card, footer link, per-app-page line
7. Update `app/sitemap.js` (auto-picks up if it globs `app/` — verify)

Est: half-day of copywriting + half-day of implementation, assuming no new photography.

---

## Open questions before building

- Do we want real numbers ("<2s") that we then have to keep true, or hand-wave with "fast"? Real numbers are more persuasive but create a maintenance obligation.
- Is there an existing document (in `zz/info/`) with the *actual* technical architecture of the guest apps? If yes, I should cross-check claims against it. If no, we're partly writing aspirational copy — worth flagging to Johanna.
- Should the planner-facing version be a separate `/for-planners/technical` page (denser, printable) or just the same page with a "Print this" button?
