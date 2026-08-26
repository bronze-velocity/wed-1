# Moodboard UI/UX Plan

**Status:** Implemented on 2026-08-26. The live flow uses the app-led direction, labelled non-linear navigation, compact persisted directions, deterministic approved-app ranking, and the shared studio shell described below.

## Decision Summary

Use the recommendation in `moodboard-app-led-alternatives-v2.md`:

- Keep the visual, emotional moodboard character.
- Reveal the app underneath each choice.
- Add a tiny guest-action example to early cards.
- Lead toward the 13 approved app shapes rather than inventing unrelated products.
- Use personal answers to customize an app shape, not to create novelty for its own sake.
- Remove the `Make it weirder` mechanic entirely.
- Replace long `Ideas so far` cards with compact directions whose descriptions are 3–10 words.

The intended feeling is a guided creative studio, not a form, quiz, or app catalog.

## Experience Principles

1. **One immersive surface.** The moodboard should feel like a product of its own, especially on a phone. Marketing navigation, the site footer, floating buttons, and wizard controls should not compete for attention.
2. **The current step is always clear.** A persistent labelled stepper sits directly above the step heading and is the only primary progress/navigation pattern.
3. **Every answer explains itself.** Cards show the scene first, then a brief guest action, then the likely app direction.
4. **Phone in, room out.** Copy describes what guests do and what changes in the room, not merely what appears on a phone.
5. **Recognition arrives early.** By Step 1 or 2, the couple should understand at least one plausible app direction.
6. **The interface stays light.** Supporting ideas are short enough to scan without covering the question being answered.
7. **One design language from start to share.** Fresh results, shared results, password gates, and edit mode use the same shell, spacing, controls, and terminology.

## 1. Immersive Product Shell

### Moodboard-only chrome

All `/moodboard` routes should use a dedicated studio mode:

- Hide the normal marketing footer.
- Replace the full marketing nav with a slim header containing the Wepho wordmark, `Talk to us`, and an optional `Save and leave` action.
- Do not show a `Start your moodboard` link while already inside the moodboard.
- Keep the same shell on the wizard, generated results, shared results, password gate, and edit flow.
- Coordinate the cookie banner with the bottom action area so it never covers the step CTA or ideas trigger.

The header should be part of normal layout flow rather than one of several independently fixed overlays. The wizard then owns the viewport below it.

### Phone layout

Use one vertical scroll surface for each step:

```text
Slim studio header
Clickable six-step navigator
Step eyebrow + question
Step cards / fields
Compact live reaction
Sticky Back + Continue bar
```

- Avoid a separately scrolling question region inside a scrolling page.
- Keep the CTA sticky at the bottom with safe-area padding.
- Let content scroll naturally behind the sticky action bar with sufficient bottom clearance.
- Never auto-open an overlay. The current Step 3 auto-expansion should be removed.
- Preserve draft answers immediately so direct step navigation never loses an unsubmitted selection or typed response.

### Desktop layout

Use a stable two-column studio canvas at wide widths:

- Main step column: approximately 600–680px.
- Live directions column: approximately 300–340px.
- Both columns live inside one centered container; the rail is not fixed on top of a globally centered step.
- At widths where both columns do not fit comfortably, switch to the mobile/tablet disclosure instead of allowing overlap.

### Visual language

- Use one warm neutral canvas across all steps.
- Let Step 1 and Step 6 photography run wider on mobile, close to the viewport edges, to create visual immersion.
- Retain a consistent card anatomy: visual or icon, title, guest action, app direction, selected state.
- Use the existing design tokens and radius rules.
- Keep motion directional and restrained: horizontal transition when changing steps, small card response on selection, brief fade for a newly relevant direction.
- Respect reduced-motion preferences by removing slides, staggers, and expanding transitions.

## 2. Clickable Six-Step Navigator

Replace `ProgressPulse` with a semantic, labelled stepper directly above the individual step.

### Labels

Use short, stable labels everywhere:

1. `Scene`
2. `Guests`
3. `Moment`
4. `Feeling`
5. `Your story`
6. `Energy`

These labels should also be the source of truth for step headings, persistence, analytics, and accessibility text.

### Desktop behavior

- Show all six steps in one horizontal row.
- Each step is a real button with a number, short label, and state.
- Current: accent background or underline plus `aria-current="step"`.
- Answered: subtle checkmark.
- Unanswered: neutral.
- All six steps are clickable, including future steps.

### Mobile behavior

- Use one horizontally scrollable, scroll-snapping row.
- Each item has a minimum 44–48px touch target.
- Show number plus short label; do not fall back to six anonymous dots.
- Automatically center the active step after navigation.
- Add edge fades to indicate more steps off-screen.
- Do not wrap the stepper into two rows; it would consume too much of the phone viewport.
- Keep the stepper sticky below the slim studio header while the step content scrolls.

### Navigation rules

- Tapping any step first commits the current local draft into `answers`, then changes step.
- Directional animation is based on target index versus current index.
- Do not block forward navigation because most questions are intentionally optional.
- Mark a step answered when it contains at least one meaningful answer, not merely because it was visited.
- Track `furthestVisitedStep` separately from completion so resumed and non-linear sessions remain accurate.
- The browser Back button should not be overloaded for every internal step in v1; the visible Back button and stepper remain the predictable controls.
- On step change, move focus to the new step heading and reset the content scroll position.

## 3. Revised Six-Step Flow

This follows Alternative 2 and adds the small interaction preview recommended from Alternative 3.

### Step 1: Scene

**Question:** `Which scene feels like the reception you want?`

Keep the eight photo choices. Every card has:

- Scene title.
- A 5–10-word guest-action line.
- `Often points toward` with one or two approved apps.

Example:

```text
Dinner that got out of hand
Guests answer together between courses.
Often points toward Live Trivia or Who Said It?
```

On mobile, show the action and app direction without requiring hover. Keep the image dominant and place supporting text in a high-contrast lower panel rather than stacking paragraphs over photography.

### Step 2: Guests

**Question:** `Which description sounds most like your guests?`

Keep familiar guest descriptions, but change the subline from demographic color to participation consequences.

Examples:

- `Grandparents in the front row` / `Simple prompts with an assisted option.`
- `Half the room never met` / `Low-pressure reasons to compare answers.`
- `Reserved but warm` / `Private or anonymous contributions work best.`

Selecting a card should update likely mechanics and exclusions in the live directions area. Keep the optional one-sentence guest description.

### Step 3: Moment

**Question:** `When should this experience earn its place?`

Keep the timeline choices, but make each subline a concrete room example:

- Cocktail hour: `Unlock a story while guests explore.`
- Dinner: `One question appears between courses.`
- After dinner: `The room watches the final reveal.`
- Dancing: `One quick tap, then phones away.`
- Late night: `Leave predictions to open later.`

When an app direction already exists, preview it in context, such as `Who Said It? during dinner`.

### Step 4: Feeling

**Question:** `What should the room feel like?`

Keep emotional language, but pair every choice with the mechanism that creates it.

Example:

```text
Everyone laughing at the same time
A short room game with a shared reveal.
```

Retain `Something nobody has seen before` as a preference signal. It may affect the final custom treatment, but it must not introduce a `Make it weirder` button or an unbounded invention flow.

### Step 5: Your Story

**Question:** `What could make this unmistakably yours?`

Do not show all eight generic prompts as equal choices. Use the surviving app directions to prioritize two or three relevant prompts, with `More prompts` available as a disclosure.

Examples:

- Guessing/game direction: ask about a disputed story, memorable quote, or person who knows the answer.
- Keepsake direction: ask who they most want to hear from years later and what should be remembered.
- Shared creation direction: ask about places, objects, pets, routines, or future plans.
- Exploration direction: ask which venue locations can carry a real story.

All questions remain optional. Existing saved answers remain visible and editable even if changing an earlier step changes the prioritized prompt set.

### Step 6: Energy

**Question:** `Which final image has the right energy?`

Keep the visual finish, but add a short visible label to every image so the choice is understandable and accessible. Show a compact final shortlist preview beneath the selected image before the CTA.

CTA: `Reveal our directions`.

## 4. Compact “Ideas So Far”

Rename the live artifact to `Directions so far`. `Ideas so far` can remain as secondary copy if desired, but `directions` better communicates that these are grounded in app shapes rather than unrelated inventions.

### Card content

Each compact direction contains only:

- Approved app title or app family.
- A **3–10-word guest-action description**.
- Optional contextual badge such as `Dinner`, `Low pressure`, or `Keepsake`.
- `Save` and `Not for us` controls.

Examples:

| Direction | Short description |
|---|---|
| Live Trivia | `Guests answer together; the room sees results.` |
| Who Said It? | `Guess the speaker, then reveal the message.` |
| Custom Wedding Bingo | `Spot real moments throughout the reception.` |
| Prediction Vault | `Leave predictions to unlock years later.` |
| Guest Advice Oracle | `Ask one question; receive everyone’s advice.` |
| Where To Next | `Guests build your shared future map.` |
| Two-Minute Video Guestbook | `Record short messages you can replay.` |
| Venue Scavenger Hunt | `Explore the venue to unlock your story.` |

The 3–10-word rule applies to the description only; app titles and small badges do not count. Enforce this in authored data review rather than truncating strings in the UI.

### Mobile presentation

- Collapsed trigger: `Directions · 3` plus a preview of the strongest direction.
- Open as a non-modal bottom sheet no taller than roughly half the viewport.
- Do not auto-open it.
- Render only three active directions by default; saved directions remain first.
- Use compact rows rather than large article cards.
- When closed, remove hidden controls from the focus order.
- Keep `What we’re noticing`, green lights, exclusions, and raw answers in separate optional disclosures rather than stacking all content in the first sheet view.

### Desktop presentation

- Show the same compact direction rows in the right studio column.
- Keep the strongest three visible.
- Put saved directions first and dismissed directions out of view.
- Use the same content and interaction labels as mobile.

### State and matching

Move saved and rejected direction IDs into `MoodboardWizard` state so they:

- persist with the draft;
- survive direct step navigation;
- affect deterministic ranking;
- appear in shared briefs;
- cannot contradict the final shortlist.

`Save` should add a meaningful positive weight. `Not for us` should exclude that app shape unless the user explicitly restores it.

## 5. Remove “Make It Weirder”

The control is not present in the live implementation, so this is primarily a product and documentation cleanup:

- Do not add per-card `Make it weirder`.
- Do not add global `weirder / calmer` controls.
- Remove promises that ideas will `get weirder`, `shift and mutate`, or behave like an unbounded generator.
- Remove the mechanic from `moodboard-cta.md` and `moodboard-mechanic-scenarios.md` when implementation begins.
- Replace those promises with `gets clearer`, `gets more specific`, or `narrows toward what your guests would actually enjoy`.

This does **not** require removing:

- `Something nobody has seen before` as a Step 4 answer;
- a carefully bounded custom twist on an approved app;
- the optional hidden result, provided it remains grounded in an approved interaction shape.

## 6. App-Led Data Model

Centralize step labels, option copy, guest actions, app relationships, and accessible labels in one shared configuration rather than repeating maps across steps, the live rail, prompts, results, and email.

Each selectable option should support:

```js
{
  id,
  label,
  shortLabel,
  description,
  guestAction,
  appIds,
  fitSignals,
  exclusionSignals,
  image,
  imageAlt,
}
```

Each live direction should support:

```js
{
  appId,
  shortDescription, // authored 3–10 words
  contextTags,
  sourceStepIds,
  status, // neutral | saved | rejected
}
```

Only the 13 approved, non-skipped apps should be matchable. The app catalog, route slug, displayed title, short description, result card, share page, and email should all resolve from canonical app data rather than model-returned strings.

## 7. Matching and Result Consistency

Adopt the score-then-narrate approach in `components/moodboard/results-redesign.md`:

1. Deterministically rank approved apps from selected scene, guests, moment, feeling, story category, energy, seed, and saved/rejected directions.
2. Select a small shortlist of two or three apps.
3. Use the model only to write short, couple-specific reasoning for known app IDs.
4. Validate all output against the canonical catalog.
5. Fall back to deterministic picks and canonical descriptions if narration fails.

The final result must never recommend an app the couple rejected in `Directions so far`.

### Results layout

Use one strong reveal followed by expandable detail:

- Three-word summary and top direction visible immediately.
- Two or three collapsed match cards with a one-sentence reason.
- Expanded state shows guest action, room payoff, preview, and full rationale.
- Optional custom/hidden direction appears as a compact strip, not a separate full-height section.
- Email and share actions remain visible without requiring a long scroll.

Fresh, shared, and edit views should render the same result component inside the same moodboard shell. Shared pages may add owner actions, but should not change the visual hierarchy.

## 8. Accessibility and Interaction Requirements

- Add a `<main>` landmark and one page-level heading strategy.
- Use semantic buttons for step navigation with `aria-current="step"`.
- Announce step changes and focus the new heading.
- Group selectable cards with `fieldset`/`legend` or equivalent labelled group semantics.
- Preserve visible focus rings on selected cards.
- Explain selection limits and mark unavailable extra choices rather than silently ignoring taps.
- Give every Step 6 image a visible label, not only alt text.
- Keep all touch targets at least 44px, preferably 48px.
- Use explicit labels for email, slug, and password fields.
- When the mobile directions sheet is closed, make its contents hidden or inert.
- If the sheet remains non-modal, keep it short and do not trap focus. If it visually blocks most of the interface, promote it to a real modal dialog with focus management and a backdrop.
- Ensure muted instructional copy meets normal-text contrast requirements.
- Apply reduced-motion behavior to step transitions, cards, live directions, result entrances, and disclosures.

## 9. Implementation Sequence

### Phase 1: Foundations

- Create shared moodboard option and step configuration.
- Filter matching to the approved non-skipped app catalog.
- Add route-aware moodboard studio chrome.
- Replace `ProgressPulse` with the clickable labelled stepper.
- Add target-step navigation, completion state, and `furthestVisitedStep`.

### Phase 2: App-led steps

- Update Steps 1, 2, and 4 with guest-action and app-direction copy from Alternative 2.
- Update Step 3 with concrete temporal examples.
- Make Step 5 prompts responsive to surviving app directions.
- Add visible labels and shortlist context to Step 6.

### Phase 3: Compact directions

- Replace speculative long idea cards with approved app-led direction rows.
- Author every short description at 3–10 words.
- Keep `Save` and `Not for us`; omit `Make it weirder`.
- Lift saved/rejected state into the wizard and persistence payload.
- Remove mobile auto-open and split secondary guidance into disclosures.

### Phase 4: Matching and results

- Add deterministic app scoring.
- Use the model only for validated personalization copy.
- Feed saved/rejected directions into ranking.
- Implement the compact expandable result reveal.
- Unify fresh, shared, password, and edit states in the studio shell.

### Phase 5: Copy and accessibility cleanup

- Remove obsolete `Make it weirder` promises from moodboard documents and promotional copy.
- Centralize stale story labels used in results and email.
- Complete focus, field-label, selection-group, contrast, and reduced-motion work.

## 10. Acceptance Criteria

- All six named steps are directly clickable above every step on desktop and mobile.
- A user can jump from Step 2 to Step 6 and back without losing draft input.
- The active mobile step scrolls into view and has a 44px-or-larger target.
- No moodboard route shows the ordinary marketing footer or a redundant start CTA.
- No two moodboard controls overlap at common phone widths.
- There is only one main page scroll surface while answering questions.
- The mobile directions sheet never opens by itself.
- Every live direction description contains 3–10 words.
- Every early choice explains a guest action or room outcome.
- Only approved, routable apps appear as live or final directions.
- Saved and rejected directions persist and affect the final shortlist.
- No `Make it weirder` control or promise remains.
- Fresh and shared results use the same visual shell and terminology.
- The complete flow is usable by keyboard and with reduced motion enabled.

## Likely Files

- `components/moodboard/MoodboardWizard.js`
- `components/moodboard/ui/ProgressPulse.js` or a replacement `StepNavigator.js`
- `components/moodboard/ui/StepShell.js`
- `components/moodboard/ui/BriefPreview.js`
- `components/moodboard/ui/TapCard.js`
- `components/moodboard/lib/insights.js`
- `components/moodboard/lib/persistence.js`
- `components/moodboard/steps/StepVibes.js`
- `components/moodboard/steps/StepGuests.js`
- `components/moodboard/steps/StepMoments.js`
- `components/moodboard/steps/StepFeelings.js`
- `components/moodboard/steps/StepStory.js`
- `components/moodboard/steps/StepWildcard.js`
- `components/moodboard/results/MoodboardResults.js`
- `components/moodboard/results/ResultCard.js`
- `lib/moodboard/appCatalog.js`
- `lib/moodboard/prompts.js`
- new shared option/scoring files under `lib/moodboard/`
- `app/api/moodboard/match/route.js`
- `app/api/moodboard/brief/route.js`
- `app/moodboard/page.js`
- `app/moodboard/[slug]/page.js`
- `app/moodboard/[slug]/edit/page.js`
- route-aware site chrome and `app/globals.css`
