# Animations Audit + Wow Ideas

A pass over what motion currently lives on the marketing site, followed by proposals to push the "delight ceiling" without breaking the calm, editorial tone.

---

## Part 1 — What's already there

### Motion tokens (`app/globals.css`)

- **Easings:** `--ease-out` (bouncy exit, `0.16,1,0.3,1`), `--ease-in-out`, `--ease-spring` (`0.34,1.56,0.64,1`)
- **Durations:** `--duration-instant` 80ms → `--duration-slowest` 900ms
- **`prefers-reduced-motion`** is globally honored: `.reveal`, `.card-enter`, `.hover-*`, `.link-underline`, `.petal`, `.pulse-dot` all disabled (globals.css:500–520)

### Scroll behavior

| Hook | What it does | Where |
|---|---|---|
| `useScrollReveal` | IntersectionObserver (threshold 0.15), toggles `is-visible` once, then disconnects | `hooks/useScrollReveal.js` |
| `useParallax` | Continuous `translateY` on scroll (default speed 0.2), passive listener, RM-safe | `hooks/useParallax.js` — used only in `ParallaxHeroBackdrop.js:7` at speed 0.15 |

Sections wired with reveal-on-scroll: `StoryBeat1/2/3`, `HowItWorks` (staggered), `SixRules` (staggered), `DemoSection` heading, `DemoSectionTwo` heading.

### Named CSS keyframes

| Keyframe | Used by | Effect |
|---|---|---|
| `slideInUp` | `.card-enter` | opacity + 16px rise |
| `fadeInUp` | (utility) | opacity + 16px rise |
| `resultCardIn` | Who-Said-It result | opacity + 24px rise |
| `briefEntryIn` | Admin brief entries | opacity + 6px rise |
| `petalDrift` | BigScreenFrame petals | drift down + rotate + fade in/out |
| `pulseDot` | `.pulse-dot`, matching loader | opacity/scale pulse (1.4s loop) |
| `lldFade` | LoveLetterDemo frame swap | opacity + 6px rise |
| `blink` | AutoPlayPhone cursor | 50% opacity toggle |

### Section-by-section motion (homepage `app/page.js`)

1. **HomeHero** — 5× `.card-enter` staggered on headline/sub/CTAs, static-rotated phone image
2. **StoryBeat1** — `.reveal` fade
3. **DemoSection** — heading reveal + `LoveLetterDemo` auto-play loop
4. **DemoSectionTwo** — heading reveal + `WhoSaidItDemo` interactive
5. **AppGalleryTeaser** — vibe pill toggle → `.card-enter` re-stagger on new set
6. **MoodboardInvite** — minimal
7. **StoryBeat2** — `.reveal`
8. **HowItWorks** — `.reveal-stagger` on 3 cards (80ms step)
9. **StoryBeat3** — `.reveal`
10. **SixRules** — `.reveal-stagger` on 6 cards
11. **PaperReframe** — static
12. **PlannersCallout** — static
13. **FinalCta** — form field transitions

### Demo motion

- **LoveLetterDemo** (`components/demo/LoveLetterDemo.js`) — 3-frame loop: phone (5.2s) → admin (2.4s) → screen (6s). Frame swaps use `lldFade`. Pauses when off-screen. Skips to final state under reduced motion.
- **AutoPlayPhone** — typewriter (variable char speed), blinking cursor, send-button color transition accent → green
- **AdminFrame** — approve tap → card fade + translateX(32px); approve-button glow + lift on hover
- **BigScreenFrame** — content scale 0.96 → 1 + fade over 900ms; 7 petals with staggered 6.1–8.2s drift durations; static gold radial glow; reset button fades in at 1.1s
- **WhoSaidItDemo** — interactive only, no auto-play; state-based UI updates

### Global interaction utilities

- `.hover-lift` — -2px translate + shadow (150ms)
- `.hover-scale` — 1.04× spring (150ms)
- `.link-underline` — underline grows 0 → 100% (250ms)
- `.faq-item[open] .faq-icon` — 180° chevron rotate

---

## Part 2 — What's missing / muted

- **No parallax** anywhere except the hero backdrop. All three `StoryBeat` full-bleed photos are static.
- **No motion continuity between sections** — every section fades in the same way (opacity + 28px rise). Zero variation, so the eye stops noticing after the third one.
- **CTAs are inert** — the primary "Book a call" button never draws attention on its own; it only reacts to hover.
- **Gallery cards never move** after their initial stagger. Hover is a tiny lift.
- **Numbers/counters** in `HowItWorks` / `SixRules` don't count up.
- **No cursor-following, tilt, or magnetic effects** on any card or button.
- **No text reveal effects** beyond block-level fade — headings don't split into words/lines.
- **No transition between routes** — hard swap.
- **No ambient motion** in idle states (drifting gradients, floating orbs, subtle grain).
- **BigScreenFrame petals** are lovely but they only fire during the demo — nowhere else on the page uses the same visual language.
- **Form submission** is silent — no checkmark draw, no confetti, no state motion.

---

## Part 3 — Wow ideas (ranked by "impact ÷ effort")

### Tier A — high impact, low/medium effort

1. **Word-by-word (or letter-by-letter) headline reveal on hero**
   Split `HomeHero` headline into spans; stagger 40–60ms per word with `.card-enter`-like rise + blur → clear. Instantly signals "this site was made with care". ~1 hr.

2. **Sticky-scroll photo parallax in `StoryBeat1/2/3`**
   Apply `useParallax` (speed ~0.12) to the backdrop image so the photo drifts slower than the text scrolls past it. Also add a subtle overlay-scrim fade tied to scroll progress. ~1–2 hrs.

3. **Primary CTA "breathing" glow**
   Very slow (4–6s) box-shadow pulse on the hero + final-CTA buttons, disabled under reduced motion. Draws the eye without being loud. ~30 min.

4. **Magnetic buttons on the two CTAs**
   On pointer-move within ~120px, translate the button 4–8px toward the cursor with a spring ease. Feels premium the moment you hover. ~1 hr.

5. **Card tilt on `AppGalleryTeaser`**
   Small perspective tilt (max ±6°) tracking pointer position over each card, with a soft highlight sheen following the cursor. ~2 hrs.

6. **Section-entrance variety**
   Instead of "opacity + rise" everywhere, give each section a signature move:
   - StoryBeats → photo scale-in from 1.06 while text rises
   - HowItWorks → cards flip up from a slight X-axis rotation
   - SixRules → cards scale-in with staggered scale origin from top-left
   - AppGallery → cards deal in like cards from a deck
   Same easing tokens, different feel. ~2–3 hrs.

7. **Ambient falling petals in the final CTA** (reuse `petalDrift`)
   Ties the last section back to the demo — you asked, we answered. Very light density (3–4 petals, slow). ~30 min.

### Tier B — high impact, higher effort

8. **Scroll-scrubbed hero video-cover phone**
   The phone mockup in the hero currently sits at a static rotation. Instead: tie its rotation and Y-position to scroll progress so it "hands off" to the demo section as you scroll past. Feels like a director's transition. ~3 hrs.

9. **Split-screen scroll-driven demo intro**
   Before the LoveLetterDemo auto-plays, do a scroll-scrubbed reveal: at 0% in view, only the phone is visible; at 50%, the admin frame slides in; at 100%, the big screen appears — then auto-play begins. Turns a passive demo into an earned reveal. ~4–6 hrs.

10. **Confetti / petal burst on form submit**
    When the contact form succeeds, briefly rain the same petals from `BigScreenFrame` across the form area, plus an SVG-draw checkmark. Emotional payoff at conversion. ~2 hrs.

11. **Route transitions (View Transitions API)**
    Next 16 + React 19 supports the View Transitions API. A soft crossfade / shared-element move between `/`, `/apps`, and `/apps/[slug]` cards would feel app-like. ~2–4 hrs, with browser-support fallback.

12. **Marquee of past-couple quotes** in a thin band under `StoryBeat3`
    Slow horizontal drift, pauses on hover. Cheap to build, adds social-proof texture. ~1 hr.

### Tier C — signature/high-risk

13. **Cursor-follow "veil"** — a soft, blurred warm-white circle following the cursor over dark sections, revealing photography brightness underneath. Very signature; needs careful accessibility. ~3–4 hrs.

14. **Interactive vibe sorter** on `AppGalleryTeaser` — instead of pill toggles, let the user drag a mood-slider (romantic ↔ playful ↔ chaotic) and watch cards physically re-sort with FLIP animations. ~1 day. Doubles as a signature interaction that shows up nowhere else in the wedding-vendor space.

15. **Live cursor-count on demo** — "24 people are watching this demo right now" with dots that appear/disappear. Fake or real. Doesn't need to be true to work. ~2 hrs (fake), ~1 day (real).

---

## Part 4 — Suggested build order

If we do this as a single push, I'd sequence:

1. Tier-A #3 (CTA glow) + #7 (petals in final CTA) — 1 hr, immediate polish
2. Tier-A #2 (storybeat parallax) — biggest "scroll feels alive" delta
3. Tier-A #1 (hero headline reveal) — sets tone in first 2 seconds
4. Tier-A #4 (magnetic buttons) + #5 (card tilt) — micro-interactions everywhere
5. Tier-A #6 (section-entrance variety) — kills the sameness
6. Tier-B #10 (submit confetti) — closes the emotional loop
7. Tier-B #8 or #9 (hero-to-demo scroll choreography) — the "wow" centerpiece

Everything above respects the existing token system (`--ease-*`, `--duration-*`) and the `prefers-reduced-motion` conventions already in place. No new dependencies required for Tier A; Tier B #11 uses a browser-native API; Tier C ideas may want `motion` (formerly framer-motion) if we get into FLIP or spring-heavy work.
