# Moodboard — "Your Own Words" Custom Pills

A plan for letting the couple add their own answer to every step, capture it as a first-class pill, carry it through the wizard, hold it explicitly in the sidebar, and put it to work at the very end.

## The problem this solves

The moodboard today gives the couple pre-authored options with weighted `appIds`. Freeform typing exists only on Step 2 (`guestFreeform`) and Step 5 (`story`), and neither contributes to the deterministic direction ranking — they only show up in the LLM's user prompt at the very end.

That leaves three real gaps:

1. A couple whose actual wedding doesn't map cleanly to any pre-authored tile has no equal-status way to say so mid-flow.
2. Their freeform words are invisible in the sidebar's "directions so far" panel while they're picking — so the sidebar can feel like it's ignoring the most specific thing they've said.
3. All the specificity gets dumped on the LLM at the last moment, with no in-flow signal to the couple that "we're going to work with what you wrote" — so people either don't write anything, or write it and assume it was thrown away.

The proposed pattern is a single UI mechanic replicated on every step: an **"Add your own"** affordance that produces a **custom pill** visually distinct from the canned ones, that persists across steps, is explicitly acknowledged in the sidebar, and is put to work as a bundle in the last step before the match request.

---

## The UI pattern (per step)

### The affordance

At the end of every step's option grid, one **dashed-outline "＋ Add your own"** pill. Same size/rhythm as the option pills so it reads as a peer, not a footer.

Tapping it inline-expands into a compact input with:

- Single-line text field, placeholder tuned to the step ("Say it in your words — e.g. 'the room felt like a Nora Ephron scene'").
- Character cap: 60 (soft), 80 (hard). Long enough for a phrase, short enough to keep it pill-shaped.
- Two actions: **Add** (primary) and **Cancel**. Enter submits. Esc cancels.
- On submit, the input collapses back and the entered phrase appears as a **selected custom pill** in the same row as the canned options.

### The pill itself

- Visually distinct from canned pills: dashed border + a small "your words" eyebrow label above the pill (or a subtle icon). Same accent colour when selected as canned pills, so it reads as first-class.
- Tapping the pill body: toggles selection (same as canned pills).
- Tapping a small edit icon (pencil) on the pill: re-opens the inline editor with the text pre-filled.
- Tapping a small × on the pill: removes it entirely (not just deselects — since custom pills are transient, "hidden but stored" would be confusing).
- Selection counts against the step's normal cap (still "up to 2" for most steps). A custom pill and a canned pill together = 2/2. This keeps the cognitive load consistent.

### Cap per step

- Max **2 custom pills per step**. This is deliberately tight — the goal is *specificity*, not essay-writing. Once two exist, the "＋ Add your own" affordance greys out with a small hint ("You can edit or replace the ones you have").
- Exception: Step 5 (Your story) already has 8 freeform prompts — it does not need this pattern. Keep it as-is.
- Step 6 (Wildcard/Energy) is the review step; it does not need the "＋ Add your own" affordance either (see below).

### Steps that get the pattern

| Step | UI collects today | Gets custom pill? |
|---|---|---|
| 1. Scene (vibes) | Image cards | **Yes** — pill sits below the image grid |
| 2. Guests | Emoji tiles + one existing `guestFreeform` field | **Yes** — the freeform field is replaced by the same custom-pill affordance for consistency |
| 3. Moment | Text pills | **Yes** |
| 4. Feeling | Text pills | **Yes** |
| 5. Your story | Freeform per prompt | **No** — already all custom |
| 6. Energy (wildcard) | Image cards | **No** — stays a single-pick picker, unchanged |
| 7. Review (new) | Full brief on one page | **No** — this is the review moment (see § Review page) |

Placing the "＋ Add your own" pill *inside* each step's normal grid — not tucked at the bottom of the page — is the whole point. It has to feel like the eighth option, not a secondary path.

---

## Data model

Introduce one new field on `answers`:

```
customEntries: {
  vibes:    [{ id: 'custom-vibe-1',    text: 'nora-ephron rain' }],
  guests:   [{ id: 'custom-guest-1',   text: 'four generations dancing' }],
  moments:  [{ id: 'custom-moment-1',  text: 'the walk from ceremony to reception' }],
  feelings: [{ id: 'custom-feeling-1', text: 'quietly proud' }],
}
```

Rules:

- `id` is `custom-<step>-<n>`, monotonic within the step, stable across edits.
- `text` is the raw string; trimmed, single-line, ≤80 chars.
- Custom entries appear alongside canned entries in the step's normal `answers.<step>` array, but by id (`custom-vibe-1`). The step components resolve the id → text via `answers.customEntries.<step>`.
- Persistence: `customEntries` piggybacks on the existing localStorage autosave.
- Shareable brief URL: included in the `?brief=` payload once the round-trip is implemented (already a known gap).

**No change to `appIds` scoring.** Custom entries do not add points to any app in the deterministic ranking — that would require inventing tags per pill, which is brittle and unpredictable for the couple. See § How they get used for how they influence the outcome.

---

## Sidebar treatment ("Directions so far")

Two changes to `BriefPreview.js`:

### 1. A new header strip above the top-3 directions

Small, warm, always visible once the couple has added at least one custom entry OR typed anything freeform:

> **Your own words are held.**
> The directions here come from your picks. Anything you wrote in your own words is bundled with them on the review page at the end — it shapes the final read.

Copy is deliberately reassuring, not technical. The subtext is "we didn't ignore what you typed — we're saving it for the model at the end."

### 2. A collapsed "In your words" chip list under that header

The custom pills from all steps so far, small, non-interactive in the sidebar (edits happen on the step where the pill lives, not in the sidebar — the sidebar is a read-only mirror).

```
In your words (3):
  · nora-ephron rain
  · four generations dancing
  · quietly proud
```

Tapping the count `(3)` scrolls the sidebar to the list. Long lists (>6) collapse with "… and 2 more."

This is the honest signal that closes the "did anyone see what I typed?" loop.

---

## Review page — a dedicated Step 7

Step 6 (Energy / wildcard) stays exactly as it is — one image pick, unchanged mechanics, unchanged +5 weight in the deterministic ranking. Its "Continue" no longer submits to `/api/moodboard/match` — instead it advances to a new **Step 7: Review**.

Step 7 is its own page in the wizard (its own entry in the `STEPS` array in `MoodboardWizard.js`), with its own step-navigator tick, its own animation entrance, and its own back button to Step 6. It is not a modal, not an accordion inside Step 6, not a section above the wildcard. It is the whole page.

### Layout

Full-width, no sidebar (`BriefPreview` is hidden on Step 7 — the review *is* the brief now, in full). One vertical stack:

1. **Header block**
   - Eyebrow: *"Step 7 of 7 — Your brief"*
   - Title: **"Everything you told us."**
   - Subtitle: *"This is what we're about to read. Edit anything in place, or jump back to a step. When you're ready, we'll find your apps."*

2. **Six grouped panels, one per prior step.** In wizard order: Scene, Guests, Moment, Feeling, Your story, Energy. Each panel:
   - **Step title** (large) with a small `Edit in step ↗` link that jumps back to that step (uses the existing `goToStep(n)` from `MoodboardWizard.js`).
   - **The selected pills** for that step, in the same visual language they had on the step (canned pills with their icon/label, custom pills with their dashed border + "your words" eyebrow).
   - **Inline actions on each pill:**
     - Canned pill: tap × to deselect (removes from `answers.<step>`), no editor.
     - Custom pill: tap pencil to inline-edit the text, tap × to delete.
   - **A single "＋ Add your own" pill** at the end of each panel, cap enforced (still 2 custom per step across the whole wizard — the review page shows the shared count, not a fresh pool).
   - **If the group is empty:** a muted "You skipped this step" line with a `Fill it in ↗` link that jumps back.

3. **"Your story" panel is slightly different.** Each of the 8 `STORY_QUESTIONS` that the couple answered is shown as `Question chip → their sentence`. Tap-to-edit opens the sentence inline (single-line grows to textarea for long answers). Unanswered questions are collapsed behind a "3 story prompts you skipped — show" toggle.

4. **"Anything else" catch-all** at the bottom of the stack, above the CTA. A single "＋ Add anything else" affordance that expands into a slightly larger editor (2 lines, ~200 chars). Stored under `customEntries.finalNotes: [{ id, text }]`, cap 3. Placeholder: *"Anything we should know before we read your brief? (Optional — but the specific stuff is what makes the match land.)"*

5. **Live "Directions so far" recap.** The deterministic top-3 apps from the sidebar's usual computation, but rendered inline as three medium cards. Same pin/dismiss controls. Rationale: the couple has been watching this rail in the sidebar all along; removing it on the one page where the LLM is about to run would feel like the wizard forgot itself. This also lets the couple do one last pin/dismiss before submit.

6. **Submit CTA.** Full-width primary button: **"Find our apps"**. Below it, one line of tiny copy: *"We'll read everything you wrote — your picks, your own words, and your story — and come back with a shortlist in a few seconds."*

### Great-UX affordances worth calling out

- **Everything is edit-in-place.** No modals, no drawers. Tap-to-edit expands the pill or field where it sits; Esc/Cancel collapses.
- **"Edit in step ↗" is the escape hatch** for structural changes — e.g. the couple wants to un-pick a whole scene and re-choose from the image grid, which is a UX the review page shouldn't try to reproduce.
- **Sticky footer CTA on mobile.** The review page is long. The "Find our apps" button pins to the bottom edge on scroll so the couple never has to hunt for it.
- **Change indicator.** If the couple returns to Step 7 after jumping back and editing a step, the changed panel briefly pulses (accent border, 800ms) to acknowledge the edit landed. Skipped under `prefers-reduced-motion`.
- **Empty-brief guard.** If the couple somehow arrived here with zero picks and zero custom text (edge case, but real for browser back-button behaviour), the CTA disables and one line says: *"Add at least one thing to get a shortlist."*
- **No sidebar means no split attention.** On the six wizard steps the sidebar is doing real work; on Step 7 it would compete with the panels that are now showing the same data in a fuller form. Hide it cleanly.
- **Progress bar reads 7/7, not 6/6.** The step-navigator gets an extra tick labelled "Review" so the couple knows the review is a real step, not a surprise gate.

### Data-model consequence

The wizard's `STEPS` array grows from 6 to 7. The isDone / matching / results branching in `MoodboardWizard.js` still fires when `step >= STEPS.length`, so no logic change there — the submit lives in Step 7's own `onNext` handler, which merges any last-second edits and then calls the existing `startMatching(merged)`. No new fields required beyond `customEntries.finalNotes` (already introduced in the previous section).

### What this replaces

The earlier version of this plan folded the review into Step 6 above the wildcard. That's discarded — the wildcard's job (a single expressive pick that seeds the deterministic ranking) and the review's job (see everything, edit anything, consent to submit) do not want to share a screen. Separating them lets each be sized for its own job.

---

## How the custom entries get used

Three consumers, in order of impact:

### 1. LLM user prompt (biggest effect)

`buildUserPrompt` in `lib/moodboard/prompts.js` gets a new **"IN THEIR WORDS"** section:

```
IN THEIR WORDS
Vibes they added: "nora-ephron rain"
Guests they added: "four generations dancing"
Feelings they added: "quietly proud"
Final notes: "grandfather is 96; likely his last big trip"
```

The system prompt gains one line:

> When the couple has provided their own words in the IN THEIR WORDS block, quote or paraphrase at least one of them in a rationale where it fits naturally. Do not invent quotes.

Effect: the couple reads the rationales and finds their own phrase mirrored back — the "generic tools don't know you" promise is made concrete in the output.

### 2. Hidden matches list

The `/api/moodboard/match` route already returns a `hiddenMatches` list. Today it's populated by the LLM freely. Change: when `customEntries` is non-empty, instruct the LLM that at least one hidden match should be justified specifically by the couple's own words if a plausible connection exists. This turns custom entries into the primary driver of surprise picks.

### 3. Studio brief email

`lib/moodboard/brief` template gets a bolded "In their own words" block at the top, above the deterministic scores. This is the first thing the studio reads in the sales-conversation lead-in.

### What we deliberately do not do

- **Do not** try to auto-map custom text to `appIds` by keyword. Brittle, opaque to the couple, and violates the "ranking is deterministic and predictable" invariant that lets the LLM be a pure copywriter.
- **Do not** add a per-pill toggle for "match on this." Every custom pill counts equally; if the couple wants to reduce weight, they delete it.
- **Do not** show a live "we heard: 'nora-ephron rain'" chip in the deterministic top-3 directions rail. The rail stays honest about what shaped its ranking. Custom entries live in the header strip and the review panel, not in the top-3.

---

## Copy — what the couple actually reads

- Pill affordance: **"＋ Add your own"**
- Editor placeholder (Scene): *"Say it in your words — e.g. 'the room felt like a Nora Ephron scene.'"*
- Editor placeholder (Guests): *"Something specific about your people — e.g. 'four generations dancing.'"*
- Editor placeholder (Moment): *"A moment we didn't list — e.g. 'the walk from ceremony to reception.'"*
- Editor placeholder (Feeling): *"A feeling we didn't list — e.g. 'quietly proud.'"*
- Pill "your words" eyebrow label: **your words**
- Sidebar header: *"Your own words are held. The directions here come from your picks. Anything you wrote in your own words is bundled with them on the review page at the end — it shapes the final read."*
- Step 7 title: *"Everything you told us."*
- Step 7 subtitle: *"This is what we're about to read. Edit anything in place, or jump back to a step. When you're ready, we'll find your apps."*
- Step 7 CTA: **"Find our apps"**
- Step 7 CTA subline: *"We'll read everything you wrote — your picks, your own words, and your story — and come back with a shortlist in a few seconds."*
- Final "＋ Add anything else": *"Anything we should know before we read your brief? (Optional — but the specific stuff is what makes the match land.)"*

---

## Rough edges and open questions

1. **The `guestFreeform` migration.** Today it's a single string. It should be migrated into `customEntries.guests[]` (probably as one entry) on first load, then the field itself removed from the schema. Backward-compat matters because the shareable-brief URL round-trip references it (or will).
2. **Character cap tuning.** 80 might be tight for feelings ("quietly proud that we made a room this many people actually wanted to be in"). Consider raising to 120 for Feeling and Guest steps, keeping Vibe/Moment at 80 for pill legibility.
3. **Reduced-motion behaviour.** The inline-expand editor should skip the height animation under `prefers-reduced-motion` — the wizard already has this hook.
4. **Empty-state behaviour.** If the couple never adds a custom pill, the sidebar header strip and Step-6 review panel should stay hidden (not show an empty "Your own words: none" — that's the anti-goal). The "＋ Add your own" pill on each step is the only signal for couples who don't want to write.
5. **Studio moderation of custom text.** Anything the couple types will land in the brief email. The XSS/header-injection concern flagged in `one-pager.md § Known Gaps` becomes more acute — string interpolation in the brief HTML must be replaced with escaped templating before this ships. Blocking issue for launch.
6. **Rate-limit interaction.** The `/api/moodboard/match` route has a per-IP rate limit. Custom entries don't change request count, so no additional limit needed, but the LLM prompt grows — consider a hard cap of 10 total custom entries across all steps to keep prompt tokens bounded.
7. **What if the LLM ignores the words?** The fallback response (`Who Said It?`, `Live Trivia`) does not reference custom entries at all. If the LLM path fails on a brief with heavy custom input, the couple sees a rationale that doesn't reflect anything they wrote — a worse experience than today. Fallback should at minimum surface a single line like "We saved what you wrote in your own words and will read it before we get back to you."
8. **Analytics.** Track `moodboard_custom_added` (per step) and `moodboard_custom_kept_at_review` — the ratio will tell us whether the review panel is doing its job.

---

## Phased rollout

**Phase 1 — one step, invisible sidebar.** Ship the "＋ Add your own" pill on Step 1 (Scene) only. Add `customEntries` to the data model. Prompt template gains the IN THEIR WORDS block. No sidebar changes yet. Goal: prove the pill mechanic feels first-class, measure add rate.

**Phase 2 — all steps + sidebar header.** Replicate the affordance on Steps 2–4. Migrate `guestFreeform` to `customEntries.guests`. Add the sidebar header strip + "In your words" chip list.

**Phase 3 — Step 7 review page.** Add the new Step 7 as its own entry in the `STEPS` array with its own step-navigator tick, edit-in-place for every pill and story sentence, `Edit in step ↗` jump-backs, the "＋ Add anything else" catch-all, the inline top-3 recap, the sticky-footer CTA on mobile, and the empty-brief guard. Move the `startMatching` submit to Step 7's onNext. Add the fallback response line for custom-heavy briefs. Fix the brief-email escaping.

**Phase 4 — hidden matches from custom entries.** Amend the LLM instructions so hidden matches must be justified by custom words when non-empty. Add analytics on custom-driven hidden matches to see whether they're the ones couples actually reach out about.

Ship 1 → 2 → 3 in one release train if possible; the sidebar header alone (without the pill) would be misleading, and the pill without the sidebar acknowledgement is the current failure mode of `guestFreeform`.
