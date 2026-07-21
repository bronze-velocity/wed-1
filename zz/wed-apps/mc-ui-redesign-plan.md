# MC control screen — redesign plan

The current `WhoSaidItHost.js` is a passive mirror: it counts votes up on
its own and never actually *does* anything. On the night the MC is the person
running the room, so their phone should be the **remote control** for the game,
not a second scoreboard. This plan reshapes it around one job: *the MC decides
when the room sees the answer.*

Plan only — nothing here is built yet. Approve or redline before implementation.

---

## The core change: the MC drives the reveal

Right now the guest phone triggers the reveal and the MC/big screen mirror it.
That's backwards for a live show. The new model:

- The **guest phone** stays a personal toy (guess for fun, see your own score).
- The **MC phone** owns the room. It holds the answer back until the MC taps
  **"Show the results"**, which flips the big screen from the question to the
  vote breakdown.
- The big screen reads the shared "revealed" flag, same as today.

State move: lift the reveal from the guest phone up to `WhoSaidItDemo`. Add a
`revealed` boolean and a `phase` derived from it (`'voting' | 'results'`). The
guest's own guess still gates its *personal* reveal, but the **room** reveal is
the MC's `revealed` flag. `submitGuess` no longer sets the shared reveal.

New handlers in `WhoSaidItDemo`:
- `revealResults()` → `setRevealed(true)` (the requested button).
- `next()` → advance index, `setRevealed(false)`, reset per-question vote count.

---

## Screen anatomy (top → bottom)

A single scannable column an MC can read in a dark room from arm's length.
Everything is bigger, calmer, and grouped into three zones with clear hierarchy.

**1. Header bar (stays dark, full-bleed)**
- Line 1: `Nadia & Theo` · small "LIVE" dot when voting is open.
- Line 2: `Round 2 · Text 4 of 14`.
- Right side: the status pill (Voting open / Results up / Wrapped) — same
  token colors, but larger tap-target sizing.

**2. The answer card — the MC's private cheat sheet (hero of the screen)**
This is what the MC actually looks at. Make it the visual center, not a
footnote.
- The text itself, in the serif-accent italic, so the MC can re-read it aloud.
- `🔒 Only you see this` label.
- **Answer: Nadia** in her name-color, large.
- The `hostNote` ("say this out loud") folded into the same card as a quoted
  line, so it's one glance instead of two boxes.

**3. Live vote readout**
- Big `31 / 48 voted` counter with the thin progress bar (keep, but larger).
- Two-row Nadia/Theo tally bars. While voting, show them **muted/neutral** (no
  color leak that hints the answer); the winning color only saturates *after*
  reveal. This keeps the MC from flashing the answer via the bars.

**4. The action zone (bottom, thumb-reachable) — the requested button**
One primary full-width button that changes by phase:
- Voting phase → **`Show the results →`** (accent-filled, the money button).
  Optional helper line under it: "Big screen reveals to everyone."
- Results phase → **`Next text →`** (advances the game), plus a secondary
  ghost link **`Re-show results`** in case they moved on too fast.
- Last question, results shown → **`Show final tally →`**.
- Done → the wrap card ("His Side takes it, 34–31 — cue the first dance").

Because the phone now scrolls internally (via `PhoneShell`), the button can sit
in a subtle sticky footer inside the screen so it's always reachable without
scrolling — nice-to-have, not required for v1.

---

## Visual polish notes

- **Hierarchy by size, not by borders.** The current UI leans on lots of
  boxed cards of equal weight, which reads as clutter. Give the answer card
  real prominence (larger type, a soft tinted background in the sender's color
  at low alpha) and let the tally/counter be quieter supporting rows.
- **Color discipline.** Only the answer and the post-reveal winning bar carry
  saturated color; everything else is neutral ink on `--color-bg`. Tokens only.
- **One accent action at a time.** Exactly one accent-filled button on screen so
  the MC's thumb always knows where to go.
- **Motion:** keep the vote counter tick, drop anything else. The reveal is the
  moment — animate the bars filling in on the big screen, not on the MC phone.
- Reuse `PhoneShell` for the frame (already done); this plan only concerns the
  screen content.

---

## Open questions for you

1. **Who controls the reveal — MC or guest?** This plan hands it to the MC
   (matches real use + gives us the button you asked for). The guest keeps a
   personal guess/score only. Good, or should tapping a guess still reveal the
   guest's own result instantly while the *room* waits on the MC? (My default:
   yes — personal reveal is instant, room reveal waits on the MC.)
2. **Sticky footer button** inside the phone, or inline at the end of the
   column? Sticky is nicer but slightly more code.
3. Keep the `hostNote` merged into the answer card, or as its own gold
   "say this out loud" box like today?
