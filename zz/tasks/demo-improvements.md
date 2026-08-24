# Homepage demo improvements

Goal: **simplicity, obviousness, amazing UX, clarity.** A first-time visitor should understand what the app *does at a wedding* within 3 seconds and feel the payoff within 15.

---

## What's working today

- Two real, playable demos on the homepage (Love Letter Machine + Who Said It).
- Three-frame layout communicates the "guest / host / room" split — which is a genuinely novel product idea worth showing.
- Seed data (Mom, Uncle Pete, Dani; Simone + Jack + Gerald the cat) gives the shells real weight.

## What's holding them back

1. **Three frames at once is a "where do I look?" problem.** On desktop, two dimmed frames + one active frame reads as UI chrome, not as a story. First-time visitors don't know they're supposed to advance a tab.
2. **The interaction contract is invisible until you read the paragraph above it.** "You play the guest, then the moderator, then the couple" is doing a lot of work.
3. **No auto-motion.** If a visitor doesn't tap, nothing happens. On a marketing page, that's a lot of visitors seeing a static screenshot.
4. **The payoff (big-screen reveal) is buried behind two steps.** The most emotional beat is the third click.
5. **The two demos use different visual languages** (LoveLetter's dim/scale trick vs. WhoSaidIt's labeled panels). Feels like two teams built them.

---

## Suggestion 1 — Auto-play by default, hijackable by tap ★ recommended

**One frame in view at a time.** The demo runs itself as a ~20-second loop: phone types a message (typewriter effect on seed data) → phone slides out, admin slides in and taps approve → admin slides out, big-screen fades up with the reveal → hold on the reveal for 4s → loop.

- A small pill row underneath ("Guest · Host · Big screen") acts as both progress indicator and manual jump.
- The moment a visitor taps *anywhere* inside the phone, autoplay pauses and they take over — their typed text flows through the rest of the sequence.
- After the reveal a soft "Try it yourself" button restarts in interactive mode.

**Why this wins:**
- Zero-effort visitors still see the *entire* story including the emotional payoff.
- Motion is the tutorial — no one needs to read the "play the guest, then the moderator" paragraph.
- Preserves the three-role reveal, but as a *narrative*, not a UI puzzle.
- One frame at a time = mobile and desktop use the same layout. Massive simplification.

**Implementation notes:**
- `useEffect` timer with a `phase` state machine (`type → approve → reveal → hold → loop`).
- Pause on `IntersectionObserver` (don't autoplay off-screen), on `prefers-reduced-motion`, and on first user tap.
- Reuse existing `PhoneFrame` / `AdminFrame` / `BigScreenFrame` — just cross-fade between them in a single slot.

---

## Suggestion 2 — Phone + big screen only; drop the admin frame from the marketing view

The admin/approve step is important for the *pitch* ("your MoH curates before it hits the wall"), but as a **third playable frame** it's the least interesting beat and it dilutes the two moments that actually sell the product: guest tapping, room reacting.

- Show two frames only: **phone** (left/top) and **big screen** (right/bottom).
- When the visitor submits, the message flies from the phone into a small "waiting for approval" chip on top of the big screen, pauses for ~600ms with a subtle "MoH approving…" microcopy, then bursts onto the big screen.
- The approve step becomes a *visible moderation moment* the visitor witnesses, not a screen they have to operate.

**Why this wins:**
- Two frames read instantly as "phone → screen." That's the whole idea, made obvious.
- The approval step still gets its beat (and its credit) without asking the visitor to context-switch into a third role.
- Cuts one third of the surface area, code, and cognitive load.

Pairs beautifully with Suggestion 1.

---

## Suggestion 3 — A "before/during/after" band, not a tab UI

Reframe the whole demo section as a filmstrip:

```
[ phone: writing ]  →  [ admin: approving ]  →  [ big screen: revealing ]
     ~10s                    ~4s                       ~8s, holds
```

Rendered as a horizontal `snap-x` scroll on mobile (finger-swipe = advance the story) and a synchronized 3-panel filmstrip on desktop where a subtle "spotlight" traveler moves left-to-right in a continuous loop. Each frame animates only when the spotlight is on it — the other two show a calm, low-contrast still.

**Why this wins:**
- Uses the visitor's existing mental model for stories (comic strip / Instagram story).
- The current dim-inactive-frames trick already gestures at this; making it a *moving spotlight* turns confusion into cinema.
- Manual mode: tap any panel to lock the spotlight and interact.

---

## Suggestion 4 — Ship an "auto-demo" fallback and make the interactive version opt-in

For both LoveLetter and WhoSaidIt, render a **soundless 15-second looping "screencast"** (real components animating themselves, not a video file) by default. A single button — **"Try it yourself"** — swaps in the full interactive version in place.

- Feels alive on scroll-past (which is 80% of traffic).
- Removes the ambiguity of "am I supposed to click? what happens if I do?" for the ambivalent middle.
- The people who *do* want to play get a clear, confident invitation.

**Why this wins:**
- Matches the behavior of best-in-class product marketing sites (Linear, Arc, Raycast, Superhuman).
- Reduces the "empty phone waiting for input" awkwardness that kills the current first impression.

---

## Suggestion 5 — Unify the two demos under one visual grammar

Right now LoveLetter uses opacity + scale to indicate inactive frames; WhoSaidIt uses labeled panels above each frame ("What your guest taps / What the host sees / What the whole room sees").

**The WhoSaidIt labels are the better pattern** — they explain the frame's *role* without requiring the user to guess. Adopt them everywhere:

- LoveLetter panels get: `Guest's phone` · `Maid of honor's tablet` · `Reception screen`
- WhoSaidIt keeps its current labels.
- Same panel component (`<DemoPanel label="…" width={…}>`) shared by both.
- Same interaction model (whichever of 1–4 above we choose).

**Why this wins:**
- Two demos start to feel like *the same product* shown twice, which is the truth.
- Kills the "what am I looking at?" question for good.

---

## Suggestion 6 — Small clarity fixes worth doing regardless

- **Sticky "step" caption above the active frame** ("Step 1 of 3 — write your message") so a visitor tabbing back never loses their place.
- **Big-screen frame should show the *reception room* subtly behind it** (dim photo of `/images/dinner/bigscreen-1.jpg` at ~15% opacity in a wide letterbox behind the screen) — turns "TV mockup" into "this is what your guests will see."
- **Replace the current 3-photo "at a real wedding" strip below the demo with a single wide hero photo** of the big screen lit up at dinner. Three thumbnails compete with the demo above; one hero photo *confirms* it.
- **Remove the mobile pill switcher** if we go to auto-play (Suggestion 1) — the pill row becomes progress dots instead.
- **Move the "That was the Unprompted Love Letter Machine, one of 20 apps we've built" line up into the reveal state** — right after the payoff, when the visitor is most receptive to "wait, there's more?"

---

## Recommendation

Ship **Suggestion 1 + Suggestion 5 + the small fixes in Suggestion 6.** That gives us:

- One demo pattern applied to both apps (unified grammar).
- Auto-motion so scroll-past visitors get the payoff.
- Labeled, single-frame-in-focus layout that reads instantly.
- No new copy required to explain the interaction.

If we're feeling bold, layer in **Suggestion 2** (drop the third playable frame) — it's the largest simplification available and I don't think we lose anything real.
