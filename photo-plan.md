# Photo-Forward Homepage Plan

Status: proposed — not yet built. Companion to `architecture.md`, `decisions.md`, `tasks.md`.

## Why

`decisions.md` already confirms real photography is available, but nothing on the homepage uses it today. Every section (`HomeHero`, `DemoSection`, `AppGalleryTeaser`, `HowItWorks`, `StoryBeat2`, `PlannersCallout`, `FinalCta`) is built entirely from CSS mockups, color, and type. `StoryBeat1` is a live placeholder (`return null`) — an already-reserved slot with zero content in it.

The brand line is "generic tools don't know who you are." Right now the page proves that claim with copy only. Real photography — real ceremonies, real cocktail-hour chaos, real grandparents crying into a phone — proves it visually, and it's the fastest way to make the site feel like a studio that has actually done this 100 times, not a template pretending to be custom.

## Principles

1. **Photograph the day, not the product.** Guests don't buy a phone-in-hand stock photo — they buy the feeling of *that* wedding. Every image should read as a candid moment from a real reception, not a posed "person using an app" shot.
2. **Cover the full timeline, not just "the party."** The plan below spans pre-wedding (prep, arrival), ceremony, cocktail hour, dinner, dancing/late night, and post-wedding (send-off, morning-after, the keepsake itself) — because the copy already talks about all of these phases (see `zz/info/key.md`) and the page currently shows none of them.
3. **Every photo needs a reason to be there.** No decorative filler. Each slot below is tied to the copy next to it — the photo should make that specific sentence more believable, not just fill whitespace.
4. **Real over polished.** Slightly imperfect, candid, flash-lit reception photography beats a stock-agency "happy couple on laptop" aesthetic. If a shot looks like it could be for any wedding, it's wrong — the whole pitch is specificity.
5. **Don't break the existing interaction design.** The demo, the vibe filter, the phone mockups stay — photography wraps around them, it doesn't replace the product proof.

---

## Photo Taxonomy (for sourcing/shot list)

Tag every asset by wedding phase so slots below can be filled consistently:

| Phase | What it captures |
|---|---|
| **Pre** | Getting ready, first look, arrivals, place cards/programs, the venue empty before guests arrive |
| **Ceremony** | Vows, the aisle, reactions of seated guests (not the couple) |
| **Cocktail hour** | Mingling, drinks in hand, guests on their phones scanning something, small clusters talking |
| **Dinner** | Tables, speeches, guests laughing at something off-camera, a projector/screen glowing in a dim room |
| **Dancing / late night** | Motion blur, string lights, shoes off, group dancing, phone flashlights up |
| **Post** | Send-off (sparklers/confetti exit), the morning after, an envelope/keepsake object on a table, a couple reading something together quietly |
| **Detail / object** | Rings, invitation suite, table settings, a phone screen glowing on a table — used sparingly as texture, not hero content |

Aim for a mix of **wide/environmental** (establishes the room, the scale, the light) and **tight/candid** (one or two faces, genuine reaction) shots per phase — the plan below specifies which to use where.

---

## Section-by-Section Plan

### 1. `HomeHero` (`components/sections/HomeHero.js`)
**Current state:** two-column layout — copy left, CSS-drawn fake phone mockup right. No photography at all.

**Change:** keep the phone mockup (it's the product proof, don't dilute it) but stop floating it on a flat gradient. Add a **background photo layer behind the entire hero**, full-bleed, with the existing `var(--gradient-hero)` reapplied as a scrim/overlay on top so text contrast is preserved.

- **Slot:** full-bleed background, behind both columns
- **Phase:** Dancing / late night, or Cocktail hour
- **Description:** A wide shot of a reception in full swing — string lights or uplighting, guests mid-motion (dancing or laughing at a table), shot slightly overexposed/warm. Faces don't need to be sharp — this is atmosphere, the phone mockup is the focal point. Avoid anything where a face is large/sharp in the frame the CTA buttons will sit over (left third needs to stay low-contrast for text legibility).
- **Treatment:** desaturate slightly + darken 30–40% via gradient overlay so `--color-text-primary` copy stays readable; add a **subtle parallax** using the existing `useParallax` hook (already scaffolded, currently unused) so the photo drifts slower than scroll — reinforces "product image" pattern already named in `design-system.md` (Pattern 1 — Centered Hero: "product image/animation below").
- **File:** `public/images/dancing/hero-bg-1.jpg` (recommend a 21:9 or wider crop, min 2400px wide)
- **`next/image`:** `fill`, `priority` (above the fold), `sizes="100vw"`

### 2. `StoryBeat1` (`components/sections/StoryBeat1.js`)
**Current state:** `export default function StoryBeat1() { return null }` — a reserved, empty section between the hero and the demo.

**Change:** this is the highest-value slot in the whole plan because it's free real estate that currently renders nothing. Build it as a **full-bleed single photo + one line of copy**, mirroring the treatment `StoryBeat2` already uses for its "grandmother records a video message" quote — but photo-first instead of text-only.

- **Slot:** full-bleed image, ~70–90vh, one short line of overlaid copy (bottom-left or centered, following `StoryBeat2`'s existing centered-quote pattern)
- **Phase:** Ceremony or Cocktail hour reaction shot
- **Description:** A tight, candid shot of **guests' faces reacting** — mid-laugh, or mid-gasp, lit by a phone screen or the display wall glow (ties directly to the "live display wall changes the social physics" insight in `zz/info/key.md`). Ideally 2–4 people in frame, genuine unposed expressions, shallow depth of field so the background reception blurs out.
- **Copy pairing (example, adjust to brand voice):** "The room reacts before you do." or reuse the existing story-beat pattern: one sentence + a link to the relevant app (e.g. `/apps/live-roast-board` or `/apps/couple-trivia`), matching `StoryBeat2`'s `link-underline` → app page pattern.
- **File:** `public/images/cocktail/reaction-1.jpg`
- **`next/image`:** `fill`, lazy (below fold), `sizes="100vw"`

### 3. `DemoSection` (`components/sections/DemoSection.js`)
**Current state:** heading + copy + the live `LoveLetterDemo` interactive component on a gradient background. No photography — correctly so, since the interactive demo *is* the hero content here.

**Change:** don't put a photo behind or inside the demo (it would compete with the interactive mockup). Instead add a **small supporting photo strip below the demo**, before the "See all 20 apps" link — two or three small candid images showing the *real-world version* of what the visitor just did in the demo.

- **Slot:** 2–3 small images in a row, ~240px tall, beneath `<LoveLetterDemo />`
- **Phase:** Cocktail hour (writing) + Dinner (reveal on screen) + Post (couple reading together)
- **Description:**
  1. A guest's hands typing on a phone at a cocktail table, drink nearby, candid.
  2. The display wall lit up in a dim reception room with a message visible on it, guests' silhouettes in foreground watching.
  3. The couple at their table, heads together, visibly emotional, reading something on a screen or printed page.
- **Why three, in this order:** it mirrors the demo's own sequence (phone → queue/screen → couple), reinforcing "this is real, this actually happens" immediately after the visitor just simulated it themselves.
- **Files:** `public/images/cocktail/writing-1.jpg`, `public/images/dinner/bigscreen-1.jpg`, `public/images/post/reading-1.jpg`
- **`next/image`:** fixed small size, lazy, `object-fit: cover`, rounded via `var(--radius-xl)`

### 4. `AppGalleryTeaser` (`components/sections/AppGalleryTeaser.js`)
**Current state:** vibe-filter buttons + text-only app cards (title, description, "See how it works →"). Zero imagery in the cards — currently the least photo-forward, most template-feeling part of the page.

**Change:** give each app card a **representative photo header** (16:9, top of card, above the title). This is the single highest-impact change for "photo forward" because it's repeated 5 times per vibe × 5 vibes = the visual density of the whole gallery changes immediately.

- **Slot:** top of each card, replacing empty space above the title
- **Phase:** varies per app — this needs one representative photo per app (20 total), sourced from `data/apps.js` per-app fields (add an `image` field to the data shape in `architecture.md`)
- **Description guidance per vibe** (use as the sourcing brief since 20 individual descriptions would be premature before real assets are picked):
  - *Make them laugh* apps (trivia, roast board, bingo, unpopular opinions, cocktail quiz, parallel universe): candid mid-laugh guest shots, groups not individuals, bright/high-energy lighting
  - *Make them cry* apps (time capsule, memory map, advice oracle, exhibit, love letter machine, emotion pulse): quiet, softer light, one or two faces, emotional not staged — a hand on a shoulder, a tissue, a couple embracing
  - *Get them talking* apps (scavenger hunt, bucket list, conversation starters, future home map, secret relay): guests in conversation clusters, cocktail hour energy, mid-gesture not posed-smile
  - *Create a keepsake* apps (time capsule, bucket list, prediction vault, memory map, advice oracle, future home map, emotion pulse): the physical/digital artifact itself — an envelope, a printed book, a screen — shot as a still-life detail
  - *Stop the room* apps (trivia, scavenger hunt, roast board, first dance ballot, bingo, soundtrack): wide room shots, the display wall or projector visible, whole-room attention on one point
- **Fallback if only ~20 doesn't stretch to real per-app photography:** reuse a smaller curated pool (8–10 strong images) mapped across apps by vibe rather than 1:1 — better than a placeholder/illustration per `decisions.md`'s "real photos, not placeholder illustrations" rule.
- **File convention:** `public/images/apps/{slug}.jpg`
- **`next/image`:** fixed 16:9, lazy, `sizes="(max-width: 768px) 100vw, 260px"`

### 5. `StoryBeat2` (`components/sections/StoryBeat2.js`)
**Current state:** dark full-bleed section, centered quote text only ("Your grandmother records a 45-second video message...") + link to the Anniversary Time Capsule app page. No image — currently pure typography on `var(--color-bg-dark)`.

**Change:** add a **background photo behind the quote**, same full-bleed treatment as proposed for `StoryBeat1`, so the two story-beat sections read as a matched pair (photo + line pattern) bookending the demo and gallery.

- **Slot:** full-bleed background behind the existing centered text
- **Phase:** Post (or a staged/still-life shot standing in for the time-capsule moment, since "opened in 10 years" can't be literally photographed at the wedding itself)
- **Description:** A close, warm shot of an older guest (grandparent-aged) mid-speech or mid-toast, visibly emotional, phone or camera in hand recording something — OR a still-life of a sealed envelope/box on a table with a handwritten label, softly lit, shallow focus. Either works; pick whichever real assets are strongest, since this is illustrating an emotional concept (legacy, permanence) rather than a literal documentable moment.
- **Treatment:** darken 50–60% (heavier than `StoryBeat1` since body text sits directly on top at higher line-count), same `var(--color-bg-dark)` overlay tint to keep continuity with current section styling.
- **File:** `public/images/post/legacy-1.jpg`
- **`next/image`:** `fill`, lazy, `sizes="100vw"`

### 6. `HowItWorks` (`components/sections/HowItWorks.js`)
**Current state:** three numbered cards (01/02/03) on `var(--color-bg-subtle)`, pure text + a colored top border accent. No imagery.

**Change:** add a **small photo thumbnail per step**, top of each card (replacing or sitting alongside the large `01`/`02`/`03` numeral — numeral can shrink and move to overlay the photo corner, similar to a caption badge).

- **Step 1 — "You pick your app":** a phone screen showing the `/apps` gallery mid-scroll, or a couple's hands on a laptop/phone together choosing — Pre-wedding phase, planning context, warm/domestic lighting (not reception lighting) to visually signal "this happens before the wedding."
- **Step 2 — "You fill in the form":** a close detail shot — hands writing, or a couple laughing while typing on a laptop, photos spread on a table nearby (ties to copy: "you upload the photos"). Pre-wedding, same domestic setting as step 1 for consistency.
- **Step 3 — "Guests scan the QR":** a guest's hand holding a phone up to a table QR code/card, reception table setting visible in the background, warm reception lighting. This one should shift to Cocktail/Dinner phase lighting — the visual transition from "planning at home" (steps 1–2) to "the actual night" (step 3) reinforces the copy's own before/after structure.
- **Files:** `public/images/pre/planning-1.jpg`, `public/images/pre/form-1.jpg`, `public/images/cocktail/qr-scan-1.jpg`
- **`next/image`:** small fixed thumbnail (e.g. 96×96 rounded square or 4:3 card-width), lazy

### 7. `PlannersCallout` (`components/sections/PlannersCallout.js`)
**Current state:** thin single-line banner, text + link only, bordered strip.

**Change:** leave as-is. This is intentionally a low-visual-weight utility banner between two heavier sections — adding a photo here would fight the "thin strip" purpose. **No photo slot.**

### 8. `FinalCta` (`components/sections/FinalCta.js`)
**Current state:** dark full-width section, centered headline + subhead + `ContactForm`. No imagery.

**Change:** same full-bleed background-photo treatment as `StoryBeat1`/`StoryBeat2`, creating a consistent "three dark full-bleed photo moments" rhythm down the page (StoryBeat1 → StoryBeat2 → FinalCta) that bookends the lighter demo/gallery sections in between.

- **Slot:** full-bleed background behind the form
- **Phase:** Post — send-off
- **Description:** Wide shot of a send-off moment — sparklers, confetti, or the couple leaving through a crowd of guests, night shot, motion blur acceptable/desirable. This is the last image the visitor sees before the form — it should feel like an ending, matching the emotional beat of "ready to make this yours?"
- **Treatment:** darken heavily (60%+) since the `ContactForm` needs strong contrast and is left-aligned text on a `textAlign: 'left'` block — check the overlay doesn't reduce input-field legibility; may need a solid-color card behind the form itself rather than relying on the photo darkening alone.
- **File:** `public/images/post/sendoff-1.jpg`
- **`next/image`:** `fill`, lazy, `sizes="100vw"`

---

## Summary Table — Every New Photo Slot

| # | Section | Phase | Treatment | Priority |
|---|---|---|---|---|
| 1 | HomeHero | Dancing/Cocktail | Full-bleed bg, parallax, gradient scrim | `priority` (above fold) |
| 2 | StoryBeat1 (currently empty) | Ceremony/Cocktail reaction | Full-bleed, dark overlay, 1-line copy | lazy |
| 3 | DemoSection | Cocktail + Dinner + Post | 3-photo strip below demo | lazy |
| 4 | AppGalleryTeaser | Varies by vibe | 16:9 card header × up to 20 | lazy |
| 5 | StoryBeat2 | Post/legacy | Full-bleed, heavy dark overlay | lazy |
| 6 | HowItWorks | Pre × 2, Cocktail × 1 | Small thumbnail per step | lazy |
| 7 | PlannersCallout | — | No change | — |
| 8 | FinalCta | Post (send-off) | Full-bleed, heavy dark overlay | lazy |

Result: every phase of the wedding (pre, ceremony, cocktail, dinner, dancing, post) appears at least once, and the page goes from **zero real photography** to photography anchoring 6 of 8 sections.

---

## Technical Notes

- All images via `next/image`, per existing convention in `architecture.md` / `tasks.md` (T75 image optimization audit already anticipates this).
- Only `HomeHero`'s background image gets `priority`; everything else lazy-loads.
- Every image needs specific `alt` text describing the actual scene (not "wedding photo") — per `tasks.md` T75's "no meaningless alt text" rule. Draft alts alongside final asset selection.
- Full-bleed background photos (`StoryBeat1`, `StoryBeat2`, `FinalCta`, `HomeHero`) all need a scrim/overlay — recommend adding a shared utility (e.g. a `.photo-scrim` class or a small `PhotoSection` wrapper component in `components/sections/`) rather than repeating inline overlay styles four times, since the pattern is identical: full-bleed `<Image fill>` + absolutely-positioned gradient div + `position: relative` content on top.
- `useParallax` hook already exists (`hooks/useParallax.js`) but is unused anywhere in the current codebase — this plan is its first real use case (HomeHero background).
- No new design tokens needed for color — reuse `var(--color-bg-dark)` and existing shadow tokens. Consider adding a `--overlay-scrim` token (e.g. `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))`) to `design-tokens.css` so overlay darkness stays consistent across sections instead of ad hoc per component.
- `data/apps.js` needs one new field per app: `image: '/images/apps/{slug}.jpg'` (or a curated fallback pool per vibe, see AppGalleryTeaser section above).

## Asset Checklist (hand to photographer/couple or use from existing real photography)

- [ ] Dancing/cocktail wide shot, warm/energetic — hero background
- [ ] Candid guest reaction (2–4 faces, phone/screen-lit) — StoryBeat1
- [ ] Guest writing on phone at cocktail table — DemoSection strip
- [ ] Display wall lit up in dim room, silhouettes watching — DemoSection strip
- [ ] Couple reading together, emotional — DemoSection strip
- [ ] Up to 20 app-representative photos (or 8–10 curated by vibe) — AppGalleryTeaser
- [ ] Grandparent/older guest emotional moment OR sealed envelope still-life — StoryBeat2
- [ ] Couple/hands planning at home (pre-wedding, domestic lighting) — HowItWorks step 1
- [ ] Close detail of writing/photos-on-table (pre-wedding) — HowItWorks step 2
- [ ] Guest scanning QR at reception table — HowItWorks step 3
- [ ] Send-off (sparklers/confetti/night exit) — FinalCta background

## Suggested Build Order

1. Add the shared full-bleed photo-section pattern (wrapper + overlay) once, use it for `StoryBeat1`, `StoryBeat2`, `FinalCta`, `HomeHero` — highest leverage, fixes the empty `StoryBeat1` slot immediately.
2. `HowItWorks` thumbnails — small, self-contained, no data-model changes.
3. `DemoSection` 3-photo strip — self-contained.
4. `AppGalleryTeaser` card images — requires the `data/apps.js` schema addition, touch last since it's the largest asset requirement (up to 20 photos).
