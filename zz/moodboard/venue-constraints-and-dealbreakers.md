---
name: Venue constraints and app dealbreakers
description: Which approved apps can run without a big screen (and other real-world constraints that can make/break each app)
---

# Venue constraints & app dealbreakers

Source list: the 14 non-skipped apps in `zz/wed-apps/20-apps.json` (also cross-referenced against `apps-chosen.md`).

---

## 1. Big-screen dependency

### A. No big screen needed (native to the app)

| # | App | What it is | Why no screen |
|---|---|---|---|
| 2 | Venue Scavenger Hunt | QR codes hidden around the venue each unlock a chapter of the couple's love story. | Everything lives on the guest's phone; the venue itself is the "screen." |
| 3 | Anniversary Time Capsule | Guests record videos sealed until an anniversary. | Purely asynchronous; delivery is by email years later. |
| 6 | Prediction Vault | Sealed predictions grouped by 1/5/10/25-year buckets. | Same — future delivery, no live moment. |
| 11 | Custom Wedding Bingo | Each guest gets a unique card of couple-specific squares and taps them live. | The card lives on each phone; a winner just shouts "bingo." |
| 23 | Ask Us Anything | Guests submit + upvote questions, couple answers top ten at the mic. | Couple can read the ranked list off a tablet. Mic > screen. |
| 24 | Two-Minute Video Guestbook | Guests record a short seated message. | Delivered as a stitched film after the wedding. |
| 26 | First-Look Voice Letter | Guests leave voice memos, stitched into a private audio letter. | Private keepsake — never public. |

### B. Works with small modifications (no big screen)

| # | App | Needed edit |
|---|---|---|
| 1 | Live Trivia | Keep the mic-hosted format; move the leaderboard onto each phone (live standings between rounds) and print/announce the final winner. Loses shared "screen flip" drama but preserves the game. |
| 9 | Unpopular Opinions | Show the agree/disagree split on each guest's phone after each vote, with the MC calling out the biggest gaps on the mic. |
| 14 | Where To Next | Map lives on phones; guests browse each other's pins. Deliver the finished map + printed poster to the couple as the keepsake. |
| 21 | Who Said It? | Same as trivia — phone-based scoring, MC narrates, final reveals read aloud. Works well as a table-by-table game. |
| 25 | Home Your Room Built | Skip the live composite reveal; instead the illustration renders on the couple's phones at the end of the night, then arrives framed as a poster. Loses the "aww" moment but keeps the artifact. |

### C. Hard without a big screen (screen is the whole moment)

| # | App | Why it breaks |
|---|---|---|
| 12 | Guest Advice Oracle | The scrolling wall of advice *is* the payoff. On phones it's a feed nobody scrolls. Best swap: a printed keepsake book — no longer really an "app." |
| 22 | Story Chain | The whole room reading each new sentence appear is the mechanic. Without a shared surface it becomes a Google Doc. Best possible fix: MC reads each new line aloud on the mic — awkward and slow. |

---

## 2. Other real-world requirements that could be dealbreakers

Ordered roughly by how often they'd actually kill an app.

### Connectivity (bad venue wifi / weak cell)
- **Hits hardest:** 1, 9, 21 (real-time sync voting), 14, 22, 25 (live shared canvas), 3, 24, 26 (video/audio uploads that need bandwidth).
- **Barely affected:** 11 (bingo can be a pure client-side PWA once loaded), 2 (each QR just loads one small chapter), 6 (submitted once, delivered later).
- **Mitigation pattern:** ship each app as a PWA that loads once at check-in ("1 download and done"), buffers submissions locally, and syncs opportunistically. Real-time leaderboards need a fallback to periodic pull instead of websocket-live.

### Mic / PA system + a willing MC
- **Required:** 1, 22, 23 — the host reading things aloud is the format.
- **Nice to have:** 9, 21 for pacing and reveals.
- Dealbreaker if the couple has no MC or a quiet reception.

### Venue geography
- **2 (Scavenger Hunt)** needs walkable, distinct spots + reasonable lighting for QR scanning. Outdoor evening venues without lit signage kill it. Small venues (single-room restaurant) also kill it.
- **26 (Voice Letter)** benefits from quiet corners for recording — noisy tent weddings degrade the artifact.

### Video/audio recording constraints
- **3, 24, 26** need somewhere quiet enough to record and enough guest willingness. Also require meaningful storage + delivery pipeline (email/S3), plus retention promises (10-year time capsule = 10-year hosting commitment).

### Camera permissions
- All QR-code entry (every app) depends on iOS/Android camera prompts working. Rarely fails but worth building a fallback short-URL card at every table.

### Moderation
- **12, 23** and any anonymous-submission app need MC pre-approval before content goes public, or the couple gets a roast they didn't want. If nobody's willing to moderate live, these degrade.

### Guest tech comfort / demographics
- **Text-heavy** apps (12, 22) skew younger; older guests skip them. **Voice/photo** apps (26, 24) are more universally accessible.
- **Language mix** — multilingual weddings need copy variants; auto-translate on submissions is fragile.

### Timing/coordination
- **1, 9, 21, 22, 25** all want one specific moment in the reception timeline (post-dinner slot, cocktail hour, etc.). If the day runs long, the app slot gets cut. Async-friendly apps (2, 3, 6, 11, 24, 26) are much safer bets.

### Battery
- Apps that guests keep open for hours (11 bingo, 2 scavenger hunt, 17 emotion pulse) risk phone drain. Design for background/re-open, not sustained foreground use.

### Consent / privacy
- Anything that projects guest names, faces, or submissions on the big screen (1, 8, 9, 12, 21, 22, 23) needs a light consent step at QR scan-in — otherwise a guest sees themselves on a wall unexpectedly.

### Post-event delivery (long tail)
- 3, 6, 24, 26 all promise something *after* the wedding — sometimes a decade after. That's a business commitment as much as a technical one and should be priced/scoped accordingly.

---

## Quick summary

- **7 apps** need no big screen at all (2, 3, 6, 11, 23, 24, 26).
- **5 apps** work fine on phones with small edits (1, 9, 14, 21, 25).
- **2 apps** basically require the shared screen (12, 22).
- The **most portable / lowest-risk** apps across all constraints: **11 (Bingo)**, **6 (Prediction Vault)**, **26 (Voice Letter)** — offline-tolerant, no MC required, no venue assumptions.
- The **most constraint-heavy** apps: **22 (Story Chain)** and **1 (Trivia)** — need screen + mic + timing slot + solid wifi all at once.
