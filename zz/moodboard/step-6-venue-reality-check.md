---
name: Moodboard Step 6 — Venue Reality Check
description: Proposal for a short constraint-preferences step that gates/re-ranks app recommendations by what the couple's actual reception can support
---

# Moodboard Step 6: The Venue Reality Check

## Why add this step

The statement-select step (Step 5) figures out *who the couple is* and *what mood they want*. It does not yet know *what their room can actually support*. Two couples with identical statement answers can have completely different receptions: one has a projector wall and a sharp MC, the other is in a garden tent with spotty LTE and no host.

Right now our recommendation engine can happily suggest **Story Chain** to a couple whose venue has no big screen, or **Live Trivia** to a couple with no MC and unreliable wifi. That's a broken recommendation — even if the vibe matches perfectly.

Step 6 collects a handful of practical inputs and uses them to (a) filter out apps that literally can't work, (b) demote apps that would be fragile, and (c) suggest the specific modifications an app would need for their setup.

Kept out of scope on purpose: battery and post-event delivery. Battery is a design constraint we solve, not a couple-facing question. Delivery is a scoping/pricing conversation, not a vibe-shaping one.

---

## The five questions

Each is a single row with three tap targets. Same three-way answer shape across all of them so the couple learns the pattern in one row and blows through the rest.

The three-way answer set (used everywhere):

- **Yes, we've got that.**
- **Maybe / not sure yet.**
- **Definitely not.**

Language for each question is warm and specific — no jargon, no "does your venue support…" wording.

### Q1 — The big screen
> **Is there a projector, TV, or screen everyone can see?**
> A wall the whole room looks at together during the reception.

- Yes → all apps in play
- Maybe → screen-dependent apps stay but get a note
- No → screen-required apps get filtered or demoted with a modification tag

### Q2 — Someone on the mic
> **Is there a host or MC running the room?**
> Someone comfortable reading things aloud and holding the room's attention for a few minutes.

- Yes / Maybe / No
- Kills or downgrades apps that need a live host to work.

### Q3 — Wifi you'd bet on
> **Will the wifi (or cell signal) at the venue actually hold up for 100+ phones?**
> Outdoor tents, basements, and old barns often can't.

- Yes / Maybe / No
- No → real-time apps switch to their "load once, sync when possible" variant.

### Q4 — Room to roam
> **Is the venue the kind of place guests can wander through?**
> Multiple rooms, gardens, a courtyard — not one tight banquet hall.

- Yes / Maybe / No
- Only affects Scavenger Hunt directly.

### Q5 — Quiet corners for recording
> **Are there spots where a guest could step away and record a short voice or video message?**
> Doesn't need to be a booth — just somewhere that isn't right next to the speakers.

- Yes / Maybe / No
- Affects Time Capsule, Video Guestbook, Voice Letter quality.

**Optional 6th, only if we want it:** *"Are you okay with guests seeing each other's submissions live on a shared screen?"* — a privacy/consent gate that would down-rank public-wall apps (Advice Oracle, Roast Board, Story Chain) for private couples.

---

## Proposed UI/UX

### Layout — the "stacked toggle rows"

One vertical stack of five rows. Each row is a self-contained card:

```
┌─────────────────────────────────────────────────────────┐
│  Is there a projector, TV, or screen everyone can see?  │
│  A wall the whole room looks at together.               │
│                                                         │
│  [ Yes, we've got that ]  [ Maybe ]  [ Definitely not ] │
└─────────────────────────────────────────────────────────┘
```

- Three pill buttons per row, evenly weighted, single tap to select.
- Selected pill fills with the accent color; the other two go muted.
- No "next" button between rows — tapping a pill visually locks that row and softly scrolls the next one into focus. (Same interaction pattern as Typeform's one-question-at-a-time flow, but without hiding prior rows.)
- Once all five are answered, a sticky "See what fits" CTA appears at the bottom. Couples who don't answer everything can still proceed — unanswered = treated as "Maybe".

### Micro-interactions that make it feel simple

- **A running summary line at the top** ("2 of 5 answered · you're keeping it flexible") — gives momentum without being a progress bar.
- **Inline "why we're asking"** collapsed under a small `?` link on each row. Reveals one sentence: "Some apps live on the projector. If yours doesn't, we'll swap in a phone-first version." No modal.
- **No wrong answers** framing. Every combination produces a real set of results — this is not a qualification quiz.
- **Reversible.** Tapping a different pill just changes the answer. No undo needed.

### Why this beats a form

The three-answer shape means the couple never has to read new answer labels — they scan the *question*, tap the pill, move on. Five rows finish in under a minute. It also reads honestly: the "Maybe" middle option matches how couples actually feel four months out from the wedding.

---

## Scoring model

The statement-select step (Step 5) produces a raw score per app. Step 6 applies a **multiplier** per app based on the constraint answers. Nothing is deleted outright unless the couple gives an unambiguous "definitely not" against a hard requirement.

### Per-answer effect

| Answer | Multiplier on affected apps |
|---|---|
| Yes | ×1.0 (no penalty) |
| Maybe | ×0.7 (soft demote, still shown, tagged with a modification note) |
| Definitely not | ×0.0 for hard-dependent apps (filtered out), ×0.5 for soft-dependent (demoted with a required modification note) |

### Constraint → affected apps

Using the classifications from `venue-constraints-and-dealbreakers.md`:

| Constraint | Hard-dependent (×0 on "not") | Soft-dependent (×0.5 on "not") |
|---|---|---|
| Big screen | Story Chain, Advice Oracle | Trivia, Unpopular Opinions, Where To Next, Who Said It, Home Your Room Built |
| Mic / MC | Trivia, Ask Us Anything | Story Chain, Who Said It, Unpopular Opinions |
| Reliable wifi | (none — all can be made offline-tolerant) | Trivia, Unpopular Opinions, Who Said It, Where To Next, Story Chain, Home Your Room Built, Time Capsule, Video Guestbook, Voice Letter |
| Room to roam | Scavenger Hunt | (none) |
| Quiet corners | (none) | Time Capsule, Video Guestbook, Voice Letter |

### Tie-break rule

If a couple's top three recommended apps all get demoted to ×0 by constraints, surface the highest-scoring **unaffected** app at the top instead — with an explicit note ("your top match needs a projector, so here's what fits your room best"). Never leave the couple with an empty results screen.

---

## Displaying results with modifications

The results screen already ranks apps. Add two lightweight surfaces on each card:

### 1. A "fit for your room" chip

Small chip on every recommended app card, color-coded:

- **Green — "Runs as designed"**: no constraint conflicts.
- **Amber — "Small tweak needed"**: one soft-dependency demote. Chip is clickable, expands into one sentence explaining the tweak. e.g. *"Your room has no big screen — we'll move the leaderboard onto each guest's phone."*
- **Grey — "Modified version"**: multiple soft demotes or one 0.5 demote. Same expand pattern; the sentence describes the whole reshape. e.g. *"No screen and shaky wifi — we'll ship this as a phone-only game that loads once at check-in."*

Hard-filtered apps (multiplier 0) don't appear on the results screen at all, but get a collapsed section at the bottom: **"Not a fit for your setup — 3 apps we hid."** Expandable, transparent, so the couple sees we're not just ignoring options.

### 2. Modification notes on the app detail view

Clicking through a recommended app opens its detail view. If any constraint modification applies, show a small callout at the top of the "How it works" section:

> **Adapted for your reception:**
> Since your venue doesn't have a projector, guests will see the leaderboard live on their own phones instead of the big screen. The MC still runs the game from the mic; the shared moment happens phone-to-phone.

One or two sentences. Written by us per (app × constraint) pair, not generated. Rough count: 5 constraints × ~14 apps = ~30 modification snippets to write, though most apps only need 1–2.

### 3. Optional: an "assumptions" line at the top of the results

> Based on your setup — projector yes, MC maybe, wifi solid, walkable venue yes, quiet spots no.

Editable. Tapping any word jumps back to that question. This gives the couple a sense of control and also invites them to re-run the recommendation as their planning firms up.

---

## Where this step lives in the flow

Between Step 5 (statement select) and the results screen.

Rationale: the statement step is emotionally engaging and creates investment. Sliding the practical questions in *after* that means the couple is already committed and reads them as "we're being taken seriously," not as a form. Putting them before Step 5 would feel like a bureaucracy gate.

---

## Open questions

- Do we want a "we don't know yet — plan around anything" escape hatch that treats every answer as "Maybe" and just shows all apps with mild ranking? Useful for couples still venue-hunting.
- Should we let planners pre-fill this step per venue and share a link? (E.g. "The Cordage — projector yes, MC yes, wifi yes.")
- Do we surface the constraint modifications in the shareable brief PDF, or only in the on-site results? Leaning toward: yes, include them — the modifications *are* the value.
