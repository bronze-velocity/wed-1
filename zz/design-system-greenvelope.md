# Greenvelope Design System — Reverse-Engineered Notes

Source: `www.greenvelope.com` (homepage), analyzed by downloading and parsing the site's actual
production stylesheets and HTML on 2026-07-10:

- `public-alt/_dist/css/master.min.css` — shared/app-wide styles (modals, alerts, form controls, timepicker, tabs)
- `public-alt/_dist/css/landing.min.css` — marketing/landing page styles (hero, features, overview tiles, blog, FAQ, testimonials, pricing)
- `public-alt/_icons/css/all.min.css` — Font Awesome Pro bundle

Everything below is measured directly from the CSS/HTML, not guessed from screenshots. No CSS
custom properties (`--variables`) are used anywhere on the site — every color and size is a
hardcoded literal repeated across rules. That's a notable contrast with Wepho's own token-based
system (`zz/styling/design-tokens.css`).

---

## 1. Typography

Two-font system, one display / one workhorse:

| Role | Font | Source | Weights seen |
|---|---|---|---|
| Display (h1, section headings like `.gv-designs h2`) | **Brandon Grotesque** (`"brandon-grotesque"`) | Adobe Fonts/Typekit (`.tk-brandon-grotesque` class, `use.typekit.net` kit) | 600 |
| Body / UI / most components | **Open Sans** | Self-hosted from Google Fonts (`fonts.gstatic.com/s/opensans/v44/...`) | 400 (normal), 400 italic, 500, 600, 700/bold |
| Fallback stack | `"Open Sans", Helvetica, Arial, sans-serif` | — | — |

Font sizes observed (mobile-first, then bumped at the `768px` breakpoint):

- H1: `30px/42px` line-height → `36px/52px` at desktop
- Section subheads: `24px`–`26px`
- Body copy: `14px`–`16px`, line-height ~`1.4`–`1.9` (very loose leading, e.g. `16px/30px`)
- Micro text / labels: `11px`–`13px`
- Large stat / price numerals: `36px`–`40px`

Letter-spacing is used sparingly and only on small UI text (e.g. `letter-spacing:.64125px` on modal
button labels) — headings and body copy use default tracking.

## 2. Color Palette

Extracted by frequency across both stylesheets:

### Brand green (primary)
| Hex | Usage |
|---|---|
| `#4ab37e` | Primary brand green — links, active nav/tab state, category-tile labels & hover borders, CTA underlines, testimonial rating hover |
| `#229b60` | Darker green — hover/active state for `#4ab37e` elements (link hover, selected timepicker item) |
| `#3c9a6b` | Secondary green — used for `.gv-tabs.green` (filled tab background) |
| `#e9f7f1` | Pale green tint — success-alert background, dropdown hover background |

### Neutrals (text & structure)
| Hex | Usage |
|---|---|
| `#333` | Primary heading/body text |
| `#727272` | Secondary/muted body text |
| `#505050` | Tertiary text |
| `#999` | Placeholder/disabled text |
| `#000` / `#fff` | Pure black / white — overlays, button text on color |
| `#cfcfcf` | Borders, dividers |
| `#e7e7e7`, `#ededed`, `#f8f8f8` | Card borders, subtle section backgrounds |

### Semantic / alert system
A fully-formed 4-state alert palette (`.gv-alert.*`):
| State | Hex |
|---|---|
| Error/danger | `#ed4949` |
| Warning | `#ffd641` |
| Info | `#5895ac` |
| Success | `#e9f7f1` (background tint; text presumably the green) |

### Occasional accent tints
`#f8f4e7` (cream), `#f7e6e6` (blush), `#e6edef` (pale blue-gray), `#f8dda1` (light gold) — small
one-off background tints, likely per-testimonial or per-badge accent chips rather than a system.

**Takeaway for Wepho comparison:** Greenvelope runs on essentially *one* accent hue (green, in 3
value-steps) plus a strict semantic set for system states, all on a warm-white/charcoal neutral
base. It does not multi-brand its palette — the restraint itself is the design decision.

## 3. Surface Treatment (radius, shadow, borders)

- **Border-radius:** small and consistent — `4px` (cards/tiles), `6px` (buttons/inputs), `10px`
  (a couple of larger containers), `50%` (avatars/circular icons). Nothing above `10px` except full
  circles — no large "soft" rounding anywhere.
- **Box-shadow:** used sparingly, all soft and dark-neutral (`rgba(0,0,0,.05)` to `rgba(0,0,0,.18)`),
  never colored:
  - Resting card: `0 2px 4px rgba(0,0,0,.05)` (barely-there)
  - Hover/elevated: `0 4px 15px rgba(0,0,0,.18)`
  - Modals: `0 6px 12px rgba(0,0,0,.18)` / `0 0 8px 4px rgba(0,0,0,.18)`
  - Focus ring style: `box-shadow:0 0 0 1px #4ab37e` (color-swap of a border, not a glow)
- **Borders:** thin, `1px solid #ededed` as the default card border, swapping to `1px solid #4ab37e`
  on hover — border-color swap + shadow increase is the standard "this is interactive" signal,
  not a background-color change.

## 4. Motion

Very restrained — only two `transition` declarations found in either stylesheet:
`opacity linear .5s` and `opacity ease 1s`. There is no system of eased transforms, slide-ins, or
staggered reveals in the core CSS. The signature "envelope opening" animation is a bespoke,
one-off interaction (likely canvas/JS or a dedicated animation module), not part of the general
component motion language. Hover states elsewhere (tile borders, shadows, color swaps) appear to
rely on the browser's default instant/CSS-transition-less state change unless explicitly set.

## 5. Layout & Grid

- **Responsive strategy:** exactly two breakpoints in the entire CSS: `min-width:768px` and
  `max-width:767px, max-height:450px`. Everything is mobile-first base styles overridden once at
  tablet/desktop — no intermediate tablet-only or large-desktop-only tiers.
- **Category/feature tile grid** (`.overview-tiles ul.tiles`): flexbox, `flex-wrap:wrap`,
  `justify-content:center`, fixed tile width (`180px` desktop → 2-column `calc(50% - 10px)` on
  mobile), negative margin trick (`margin:0 -10px; width:calc(100% + 20px)`) to bleed gutters to
  the container edge.
- **Section wrapper pattern:** every section follows `section.gv-{name} > div.gv-content > ...` —
  a consistent two-level wrapper (outer full-bleed section, inner constrained `.gv-content`) for
  every marketing block (`gv-overview`, `gv-features`, `gv-designs`, `gv-blog`, `gv-faq`,
  `gv-testimonials`, `gv-pricing`, `gv-making-a-difference`, `gv-support`, `gv-get-started`).

## 6. Buttons

Component class is `.gv-button` with modifier classes layered on, e.g.:
`gv-button confirm`, `gv-button dismiss`, `gv-button green-light`, `gv-button gray-light reject`,
`gv-button transparent small narrow`, `gv-button inline-block sign-up`.

Base rules seen directly (color-variant rules for `green-light`/`gray-light`/`transparent` live in
a core app bundle not loaded on the public marketing page, so exact hex-per-variant couldn't be
confirmed — but the naming convention itself, "color-tone + shape modifier" as separate composable
classes, is the reusable pattern worth borrowing):
- Font: Open Sans, `16px`–`22px` depending on context
- Full-width on mobile (`width:100%`), fixed width on desktop for hero CTAs (e.g. `width:220px`)
- Text-align center, letter-spacing `~0.6px` on compact/modal buttons

## 7. Icon System — Two Parallel Systems

Greenvelope does **not** use a single icon system; it deliberately splits by purpose:

1. **Custom illustrated PNG icons** for marketing/feature content (e.g. the 8-item "Powerful
   Features" list: personalization, guest-list import, messaging, address validation, etc.).
   - Served as `<picture>` + `srcset` 1x/2x PNGs (`icon-personalization.1x.png` /
     `.2x.png`), ~`59–68px` square, lazy-loaded.
   - Flat, single-scene line/soft-color illustrations, one per feature, each paired with a short
     `<span>` label + `<small>` description — icon reinforces meaning rather than decorating.
2. **Font Awesome Pro** (`all.min.css`, styles: **solid**, **light**, **brands** — confirms a Pro
   license, since "light" weight predates FA6's naming and isn't in the free tier) for interface
   chrome only:
   - `fa-times` — close (modals, dismissible banners)
   - `fa-bars` — mobile nav hamburger
   - `fa-circle-notch fa-spin` — loading spinners
   - `fa-question-circle` — inline help/tooltip triggers
   - `fa-star` — review/rating stars
   - `fa-*-square` brand icons (`fa-facebook-square`, `fa-twitter-square`, `fa-instagram`,
     `fa-pinterest-square`, `fa-rss-square`) — footer/social row, all using the "square" glyph
     variant for a consistent boxed look rather than mixing round and square brand marks.
   - Icon color for these is almost always inherited text color (`#333`/`#727272`) or brand green
     on hover — no separate icon-color token.
3. **CSS-drawn chevrons/arrows** (no icon asset at all): small `::after` pseudo-elements built from
   two rotated borders, e.g.
   `border-bottom:1px solid #4ab37e; border-right:1px solid #4ab37e; transform:rotate(-45deg)`.
   Used for "view more" link arrows and FAQ accordion carets. Zero-asset, always exactly matches
   text color, trivially themeable — a pattern worth reusing anywhere Wepho needs a small directional
   affordance without pulling in an icon font.

**Practical implication for Wepho:** don't reach for one icon font for everything. Bespoke concept
icons (used to *teach* a feature) read as custom illustration/PNG; disposable UI chrome (close,
spinner, hamburger, socials) is where an icon font pulls its weight; and single-glyph directional
cues (arrows, carets) are cheaper and more consistent as a 2-border CSS rotation than as any icon
asset.

## 8. Naming Convention

BEM-adjacent but section-scoped rather than component-scoped: every top-level block is
`gv-{section}` (`gv-overview`, `gv-features`, `gv-designs`, `gv-blog`, `gv-faq`, `gv-testimonials`,
`gv-pricing`, `gv-navbar`, `gv-modal`, `gv-alert`, `gv-tabs`, `gv-tooltip`, `gv-input`, `gv-button`),
and nested elements are addressed via descendant combinators off that root
(`section.gv-overview .gv-content>.overview-tiles>ul.tiles>li>a`) rather than flat BEM
`block__element` class names. Modifiers are bare adjacent classes (`.dismiss`, `.green-light`,
`.reject`, `.danger`), not `--modifier` suffixes.

---

## Summary — What's Actually Transferable to Wepho

1. **One accent hue, three value-steps, strict neutral base.** Resist multi-color branding; let a
   single green (or Wepho's chosen accent) carry all interactive/active meaning.
2. **Interactive state = border-color swap + shadow increase**, not background recoloring or scale
   transforms. Cheap, calm, and consistent with "generous whitespace, minimal chrome" positioning.
3. **Small, consistent radius scale** (`4/6/10px` + full circle) — no large soft-rounded card style.
4. **Split icon strategy by intent**: custom illustration for teaching a feature, icon font (or SVG
   sprite) only for disposable UI chrome, CSS-only shapes for arrows/carets.
5. **Exactly two responsive tiers.** A single `768px` breakpoint, mobile-first, is enough for a
   marketing site this size — don't over-engineer Wepho's breakpoint system.
6. **Motion is nearly absent in the base CSS.** The one signature animation (envelope opening) is
   bespoke and separate from the component system — everything else changes state instantly or via
   a bare opacity fade. Wepho's `/` demo (Love Letter reveal) should probably follow the same
   pattern: one hero-level bespoke animation, plain instant/opacity transitions everywhere else.
