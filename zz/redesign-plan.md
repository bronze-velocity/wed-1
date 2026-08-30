# Wepho Redesign Plan — from SaaS to Editorial Wedding

Goal: shed the "startup landing page" feel (crisp white cards, purple accent, geometric sans, tight generic rhythm) and move toward an editorial wedding-magazine aesthetic — big dramatic photography, restrained typography, romantic muted palette, generous whitespace, names/titles that flirt with the edges of images.

Reference cues from the two screenshots you shared:
- **Jesse Tombs / "Chelsea Tombs"** — large italic display serif set *across* a portrait, half on the photo, half in whitespace. Vertical breathing room. Almost no chrome around the photo. Small tracked-out labels underneath.
- **La Fête / "Luxury Wedding & Events Archive"** — a small tracked eyebrow ("La Fête Weddings & Events"), a huge airy display serif title with an italic flourish word, quiet body copy underneath, and lots of top/bottom air. No boxes. No pills. No shadows.

Both are photo-first, type-second, chrome-third. That's the direction.

---

## 1. Typography system

### Fonts (self-hosted, no CDN)

| Role | Font | Usage | Notes |
|---|---|---|---|
| **Display / accent 1** | **Winsterday** (script) | Occasional single-word flourishes: *"real"*, *"together"*, *"yours"*, hero sub-word overlays, section eyebrows on story beats. **Never** run more than 3 words. | Purchase/license file, drop `.woff2` in `public/fonts/winsterday/`. |
| **Display / accent 2** | **Agatha** (didone-style modern serif) | Main hero titles, big overlap titles across photos (à la "Chelsea Tombs"), section titles on major pages. Short phrases only. | Same — self-host `.woff2`. |
| **Body + UI** | **Gill Sans Nova** (licensed) *or* **Cabin** (open-source fallback) | All paragraphs, buttons, nav, labels, forms. | Gill Sans Nova requires a Monotype webfont license (recurring, ~$100+/yr for our traffic tier). If we don't want that cost, **Cabin** is the closest freely-licensed humanist sans — nearly identical proportions on paragraph copy at 16–18px. Recommendation: ship Cabin now, swap to licensed Gill later if the visual difference matters. |

**Self-hosting mechanics** (applies to all three):
1. Add `.woff2` (and optional `.woff`) files under `public/fonts/<family>/`.
2. Declare `@font-face` blocks at the top of `app/globals.css` with `font-display: swap` and `unicode-range` for Latin subset only.
3. Preload the two most-used weights in `app/layout.js` with `<link rel="preload" as="font" type="font/woff2" crossorigin>`.
4. Remove the Google Fonts `<link>` tags currently in `app/layout.js`.
5. Add `--font-display-script` (Winsterday), `--font-display-serif` (Agatha), `--font-body` (Gill/Cabin) tokens in `:root`, and rebind `--font-sans` → `--font-body`.

**Licensing note:** Agatha and Winsterday are commercial fonts from small foundries — confirm we have webfont licenses (not just desktop) before deploying. If not, I'd suggest two free stand-ins:
- Agatha → **Playfair Display** (bolder didone contrast) or **Cormorant Garamond** (more airy/wedding-invitation feel — my pick).
- Winsterday → **Pinyon Script**, **Allura**, or **Petit Formal Script** (Google Fonts, we'd still self-host the files, not use the CDN).

### Type scale (revised)

Replace the current tightly-stepped SaaS scale with a wider editorial scale where display sizes get much bigger and body copy gets slightly larger + more relaxed line-height.

```
--text-display-xl: 7rem;    (from 5rem)
--text-display:    5rem;    (from 4rem)
--text-h1:         3.5rem;
--text-h2:         2.5rem;
--text-h3:         1.75rem;
--text-h4:         1.25rem;
--text-body-lg:    1.1875rem;   line-height 1.7
--text-body:       1.0625rem;   line-height 1.7
--text-eyebrow:    0.75rem;     letter-spacing 0.18em, uppercase
```

Editorial rules:
- Display titles use **Agatha** with tighter tracking (`-0.02em`) and short line-length (max ~10 words per line).
- One word per display headline may swap to **Winsterday** as an accent (like La Fête's italic "Wedding").
- Body copy is **Gill/Cabin**, line-height 1.65–1.75, max 68ch.
- All-caps eyebrows above every section, tracked out, in `--color-text-secondary`.

---

## 2. Color palette

Move from the current purple-accent SaaS palette to a muted romantic wedding palette. Your `#54697a` is beautiful but very specifically another wedding studio's signature — I'd shift the hue slightly warmer/dustier so it reads as *ours*.

### Proposed palette

| Token | Hex | Role |
|---|---|---|
| `--color-ink` | `#1F1D1B` | Primary text (warmer than pure black) |
| `--color-ink-soft` | `#3A3733` | Body text |
| `--color-mist` | `#8A857E` | Secondary text, captions |
| `--color-bone` | `#F5EFE4` | Page background (warm ivory, replaces `#F7F6F3`) |
| `--color-linen` | `#EBE3D3` | Subtle sections |
| `--color-slate` | `#6E7C8A` | **Primary accent** — our own take on the dusty blue-grey |
| `--color-dusk` | `#4C5966` | Deeper accent, hover states |
| `--color-rose` | `#C79E97` | Secondary romantic accent (dusty rose) |
| `--color-sage` | `#9AA793` | Tertiary accent (botanical) |
| `--color-gold` | `#AD8A3E` | Kept — already in the system |
| `--color-bordeaux` | `#5A2A2E` | Rare deep contrast for footer/hero backgrounds |

**Why not `#54697a` exactly:** that's Jesse Tombs' identifiable color. Shifting +6 on hue and +3 on saturation to `#6E7C8A` keeps the same emotional register (romantic, understated, "wedding-planner blue") without being derivative. If you want to go further from the reference, `#7A8B8F` (softer, more coastal) or `#5B6E70` (deeper, more slate) are also on the table.

### Retired
- Purple `--color-accent` `#6B5CE7` and everything derived (`accent-hover`, `accent-light`, `accent-dark`, `shadow-glow-accent`, `gradient-accent`, `gradient-hero`, `gradient-rainbow`).
- Bright utility colors (`--color-amber`, `--color-teal`, `--color-green`, `--color-coral`) — kept internally only for the moodboard app's status states; not used in marketing surfaces.

### Semantic remap
- `--color-accent` → `--color-slate`
- `--color-accent-hover` → `--color-dusk`
- `--color-accent-light` → `color-mix(in srgb, var(--color-slate) 12%, var(--color-bone))`
- `--color-bg` → `--color-bone`
- `--color-bg-subtle` → `--color-linen`
- `--color-text-primary` → `--color-ink`
- `--color-text-secondary` → `--color-mist`

Buttons: primary becomes solid `--color-ink` on `--color-bone` (already close), secondary becomes hairline `1px` `--color-slate` outline. Kill drop-shadows on buttons — editorial sites don't shadow buttons.

---

## 3. Photography treatment

The single biggest visual change. Photography stops being "supporting art next to text cards" and becomes the primary composition element.

### New patterns to introduce

**A. Overlap Title (the "Chelsea Tombs" treatment)**
- New component `components/ui/OverlapTitle.js`.
- Renders a large **Agatha italic** title with configurable overlap: first line sits in whitespace above/beside the image, second line crosses onto the top ~15% of the photo.
- Text color adapts (dark ink on cream side, `rgba(255,255,255,0.92)` on image side).
- Used for: `HomeHero`, `/planners` hero, `/apps/[slug]` hero, "About / who we are" section if we add one.

**B. Full-bleed editorial band**
- Section that breaks out of `<Container>` and goes edge-to-edge: single large photo (60–80vh), quiet caption + eyebrow floated bottom-left, no text overlay unless intentional.
- Reused for story beats and to punctuate long scrolls.

**C. Photo-first grid** (`/apps` gallery)
- Replace current uniform card grid with an asymmetric editorial grid: 2/3 + 1/3 rows, occasional full-width photo, titles set beneath in Agatha with a small tracked eyebrow of vibes above.
- No card borders, no shadows — the photo *is* the card. Hover: gentle scale + one-line italic caption fades in.

**D. Scrim + type on hero**
- Current hero relies on `--gradient-hero` (soft purple/blue wash). New hero: dark-cropped photo of a wedding moment, `--scrim-medium` overlay, Agatha display title (one word Winsterday), Gill body underneath, single Ink CTA.

### Photo direction (production notes)
Use the existing real photography (per `photo-plan.md`) but prefer:
- Detail shots (rings, hands, invitation stationery, candles, table settings) for section punctuation.
- Wide reception shots (people looking at phones/big screen) for demo-adjacent sections.
- Candid emotional portraits (laughing, tearing up) for testimonial and story beats.
Avoid: staged posed portraits, phone-in-hand product shots without context, anything that looks like stock.

---

## 4. Layout & chrome

Editorial sites use *less*, and what's there is quieter.

- **Section rhythm:** bump `.section-py` from 64/80/96 → **96/128/160**. More air is the single fastest way to shed the SaaS feel.
- **Container:** widen `--container-max` from 1200 → **1280**, but introduce a **`<Container editorial>`** variant at 960px for text-forward sections and a **`<Container reading>`** at 680px for long-form.
- **Radii:** drop everywhere except phone-frame hardware. Cards/panels → 0 or `--radius-sm` (4px) max. Buttons → `--radius-sm`. Photos → 0 (rectangular) by default; `--radius-md` only when explicitly needed. This is the biggest single "de-SaaS" move.
- **Shadows:** delete `--shadow-md/lg/xl` from marketing surfaces. Keep `--shadow-xs` for the sticky nav on scroll only. Editorial = no drop shadows.
- **Borders:** hairline `1px solid color-mix(in srgb, var(--color-ink) 12%, transparent)` — softer than the current `#E8E8E8`.
- **Nav:** shrink brand mark, switch to Agatha wordmark, add a serif-italic tagline slot. Nav links in Gill uppercase-tracked, no pill hover — underline-on-hover only.
- **Footer:** editorial masthead style — big Agatha wordmark, quiet columns of Gill links, one dusk-toned photo of a reception detail as background at 15% opacity.

---

## 5. Motion

Current motion (`reveal`, `word-reveal`, `card-deal`, `tilt-card`, `cta-breathe`) is playful and SaaS-y. Editorial motion is slower, subtler, and rarer.

- Keep: `reveal` (opacity + rise), `reveal-scale-photo` (photos gently settle from 1.06 → 1).
- Slow down: change `--duration-slow` from 400 → **700ms**, `--duration-slower` 600 → **900ms**. Editorial pace.
- Remove from marketing pages: `cta-breathe` (feels like a marketing modal), `card-deal` (feels like a game), `tilt-card` sheen (SaaS-y), `reveal-flip` (too showy).
- Add: parallax on hero and full-bleed bands (subtle, ~15% translate on scroll). Already have `useParallax` hook.
- Cursor: consider a soft custom cursor over photo grids ("View →" trailing) — optional stretch.

---

## 6. Component-level impact (what changes and where)

| Area | Change |
|---|---|
| `app/globals.css` | Replace `:root` tokens (colors, fonts, radii, shadows). Add `@font-face` for Agatha, Winsterday, Gill/Cabin. Bump `.section-py`. Add utility classes: `.eyebrow`, `.display-italic`, `.overlap-title`. |
| `app/layout.js` | Remove Google Fonts `<link>`. Add `<link rel="preload">` for two self-hosted `.woff2` files. |
| `tailwind.config.js` | Add font families (`display-serif`, `display-script`, `body`). Add new color tokens (`slate`, `dusk`, `bone`, `linen`, `ink`, `mist`, `rose`, `sage`, `bordeaux`). Drop retired accent tokens. |
| `components/layout/Container.js` | Add `editorial` and `reading` width variants. |
| `components/layout/NavBar.js` | Restyle brand → Agatha wordmark, links → tracked Gill uppercase, remove pill background on active state. |
| `components/layout/Footer.js` | Masthead redesign. |
| `components/sections/HomeHero.js` | Rebuild as full-bleed photo hero with OverlapTitle. |
| `components/sections/*` | Sweep for: rounded cards → flat, purple accents → slate, `<h2>` → Agatha display, replace stock icons with photography where possible. |
| `components/ui/AppCard.js` | Flatten — photo-first, no border, caption below. |
| `components/ui/OverlapTitle.js` | **New.** |
| `components/ui/EditorialBand.js` | **New.** Full-bleed photo section wrapper. |
| `components/app-page/*` | Same sweep — apply new type scale, remove card chrome. |
| `components/moodboard/*` | **Deliberately excluded** from the visual redesign scope — it's a guest-facing simulated app UI with its own product-UI conventions. We keep the tokens in sync so colors flow through, but don't restructure. |
| `components/demo/*` | Keep device frames as-is (they're intentionally UI-shaped). Restyle the *surrounding* section chrome only. |

---

## 7. Rollout order

Doing this in a single PR would be miserable to review and risky. Suggested order, each a merge-able step:

1. **Foundation** — self-host fonts, add `@font-face`, remove Google Fonts link, add new tokens (colors + type scale + radii + shadows) in parallel with existing ones. No visual change yet.
2. **Token swap** — rebind semantic tokens (`--color-accent` → `--color-slate`, etc.). Site instantly looks different but nothing structural has moved.
3. **Chrome pass** — flatten radii, remove shadows, widen section rhythm, restyle buttons + nav + footer.
4. **Homepage hero + one full-bleed band** — introduce `OverlapTitle` and `EditorialBand`, apply to `HomeHero` and one story beat. This is where the editorial feel really lands.
5. **Section-by-section sweep** — walk `components/sections/` and `components/app-page/` applying the new patterns.
6. **Gallery redesign** — asymmetric photo-first grid for `/apps`.
7. **Cleanup** — delete retired tokens, dead CSS, unused motion utilities.

Each step is safe to ship independently and gives us a chance to react to what the site looks like before committing further.

---

## 8. Open questions before I start

1. **Font licensing** — do we have webfont licenses for Agatha and Winsterday? If not, ok to use Cormorant Garamond + Pinyon Script as free stand-ins that still self-host?
2. **Gill Sans** — willing to license Gill Sans Nova (~$100+/yr) or ship Cabin?
3. **Slate hue** — happy with `#6E7C8A` (shifted from your reference), or want to stay closer to `#54697a`?
4. **Radius stance** — comfortable going fully rectangular (radius 0) for cards/photos, or keep a hint (`--radius-sm` 4px)?
5. **Moodboard scope** — confirm we leave the moodboard experience UI structurally alone and only inherit color/font tokens.
