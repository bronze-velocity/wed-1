# RSVPify Design System — Reverse-Engineered Notes

Source: `www.rsvpify.com` homepage. The live site blocks bot/scripted traffic (Cloudflare returns
a 403 "you've been blocked" page to both `curl` and the fetch tool), so this analysis is built from
the **Wayback Machine snapshot dated 2026-05-21** (`web.archive.org/web/20260521014327/https://rsvpify.com/`),
~7 weeks old at time of writing — recent enough to trust for a design-system read, but flag this if
a decision hinges on something that may have shipped since.

Unlike Greenvelope (see `zz/design-system-greenvelope.md`), RSVPify runs on **WordPress + Elementor**
(theme: SaaSLand, plus a custom "Ester" addon plugin), with WP Rocket inlining the entire combined
CSS into a single ~307KB `<style>` block rather than linking separate stylesheet files. That
architecture choice itself is a finding: the CSS contains visible layers of history — legacy
Elementor/theme defaults still present but overridden — rather than one clean authored system.

---

## 1. Typography

- **Primary font: Sharp-Sans** — a licensed, self-hosted geometric sans (weights 500/regular,
  600/semibold, 700/bold; `.ttf` served from the theme's own addon plugin, not Google Fonts). It's
  applied with `!important` across a versioned type-scale layer (class prefix `typo-2-0-*`),
  which strongly suggests this is the *current* brand system bolted on top of an older build.
- **Legacy/dead fonts still in the CSS**: `Sarabun`, `Spectral`, and `"Open Sans"` all appear on
  `h1`/`h2`/`h3`/`body` selectors — these are Elementor/theme-kit defaults from earlier page
  templates that were never fully purged, and are overridden by the `!important` Sharp-Sans rules.
  Worth knowing only as a cautionary tale: page-builder sites accumulate dead type rules over time.
- **Type scale** (all Sharp-Sans, all `!important`, line-heights expressed as percentages rather
  than unitless multipliers):

| Token | Size | Line-height | Weight | Letter-spacing |
|---|---|---|---|---|
| `headline-2` | 44px (28px mobile) | 110% | 600 | -0.02em |
| `headline-4` | 36px (24px mobile) | 140% | 600 (500 mobile) | -0.01em |
| `headline-6` | 24px (18px mobile) | 105% | 600 | -0.01em |
| `body-1` / `body-1-semibold` | 18px | 150–160% | 500 / 600 | — |
| `body-2` / `body-2-semibold` | 16px | 150% | 500 / 600 | — |
| `body-3` / `body-3-semibold` | 14px | 150% | 500 / 600 | — |
| `caption-1` | 13px | 100% | 600 | — |
| `button-large` | 18px | 100% | 600 | — |
| `button-link` | 17px, underlined | 100% | 700 | — |

Negative tracking on every headline (tight, modern) contrasts with Greenvelope's default-tracking
approach — RSVPify's type reads more "SaaS product," Greenvelope's reads more "editorial/warm."

## 2. Color Palette

A purple-and-cream brand duotone, extracted directly from the shipped CSS (filtered to exclude the
large amount of unused Bootstrap/WordPress-preset noise also present in the bundle):

### Brand purple
| Hex | Usage |
|---|---|
| `#775ae0` | Primary button background (`.btn-2-0_primary`), accent underlines |
| `#6941c6` | Primary button hover / outline-button default text+border |
| `#8a6ff0` | Secondary hover state (lighter, used in one hover-shadow variant) |
| `#2c2263` | Primary heading/body text color, review-card text |
| `#45286b` | Link color, input focus border, active carousel dot |
| `#514695` | Dark card background fill (bento-grid "dark" cells) |
| `#4d399c` | Small badge text-on-white (inside the "primary-for-free" button's pill label) |

### Neutral / tint
| Hex | Usage |
|---|---|
| `#eeebff` | Pale lavender tint — bento-grid "light" cell background |
| `#f9f8f7` | Warm cream — alternate bento-grid cell background |
| `#f8f6ff` | Outline-button hover background wash |
| `#2c2263` on white / `#fff` on dark | The only two text colors used inside the bento cards — swapped per cell, never a third |

**Note on noise:** the combined stylesheet also contains the full Bootstrap default palette
(`#0d6efd`, `#dc3545`, `#198754`, `#ffc107`, `#0dcaf0`, etc.) and the full WordPress
`--wp--preset--color--*` block-editor defaults (pale-pink, vivid-red, luminous-orange, etc.) as
inherited framework/CMS baggage — none of those appear to be actually used in visible brand
surfaces on the homepage. Don't mistake framework defaults for brand palette when reading
Elementor/WP CSS exports; grep for where a color is *applied*, not just declared.

## 3. Buttons — a Versioned Component System ("2.0")

Class naming (`.btn-2-0`, `.btn-2-0_primary`, `.btn-2-0_outline`, `.btn-2-0_primary-for-free`)
strongly implies a mid-life rebrand: a new button system versioned and layered over the old one
with `!important`, rather than a full site rebuild.

- **Shape**: pill (`border-radius:50px`), `2px solid` border, `display:block; width:fit-content`
  (full-width on mobile).
- **Signature hover effect — diagonal shimmer sweep**: every button variant has a `::before`
  pseudo-element positioned at `left:-100%` with a horizontal gradient
  (`transparent → rgba(255,255,255,.3) → transparent`), animated to `left:100%` over `.5s` on
  hover. This is a purely decorative "light sweep" micro-interaction — worth noting because neither
  Greenvelope nor most marketing sites bother with it; it reads as a deliberate "premium SaaS" cue.
- **Hover state**: background lightens one step (`#775ae0 → #8a6ff0`) *and* gains a brand-colored
  glow: `box-shadow:0 0 20px rgba(119,90,224,.4)` — colored glow, not a neutral drop shadow.
- **Outline variant**: transparent bg, colored border+text, hover fills with a near-white purple
  wash (`#f8f6ff`) plus the same colored glow at lower opacity.
- **"primary-for-free" variant**: a compound button with an embedded white pill label
  (`border-radius:200px`, colored text `#4d399c`) inside the button — a "Free" or plan-tag chip
  nested inside the CTA itself, a pattern worth considering for Wepho's pricing-adjacent CTAs.

## 4. Cards — Asymmetric "Bento" Grid with Palette Cycling

The `.grid-slide` / `.grid-slide__card` component (used for a feature showcase section) is the
most distinctive layout pattern found:

- **CSS Grid, 12 columns**, first card spans 7, second spans 5 (asymmetric two-up), collapsing to
  full-width stacked cards in document order on mobile via explicit `order`.
- **20px border-radius**, `overflow:hidden`, with a `::before` pseudo-element carrying a
  `background-size:cover` photo — same "photo behind, content in front" pattern as a hero card.
- **Palette cycling, not per-card color**: background/text color is assigned by `nth-child`
  position within a repeating 4-card group, cycling through dark purple (`#514695` bg / white
  text), pale lavender (`#eeebff` bg / `#2c2263` text), and cream (`#f9f8f7` bg / `#2c2263` text).
  Net effect: a checkerboard of brand-purple-dark / lavender-light / cream-light cells that never
  repeats the same combination adjacent to itself — a cheap, systematic way to make a grid of
  otherwise-identical cards feel varied without per-card art direction.

## 5. Shadows — Brand-Tinted Elevation

Unlike Greenvelope's neutral `rgba(0,0,0,.X)` shadows, RSVPify tints its elevation shadows with the
brand hue instead of black:
- `box-shadow:0 20px 40px 0 rgba(12,0,46,.14)` — near-black but with a deep-violet cast, used for
  large card/modal elevation.
- `box-shadow:0 2.77px 2.21px rgba(146,123,169,.02), 0 6.65px 5.32px rgba(146,123,169,.027), ...`
  (multi-layer, ascending blur/opacity) — a proper "elevation ramp" (5–6 stacked shadows
  approximating a soft ambient-occlusion look, the same technique as Tailwind's `shadow-2xl` or
  Material's elevation tokens), tinted `rgba(146,123,169,*)` (a muted purple-gray) instead of black.
- Buttons get a separate glow treatment (`rgba(119,90,224,.3–.4)`, brand purple, see §3) — so there
  are effectively two shadow languages: neutral-tinted-violet for surfaces/cards, saturated-violet
  glow for interactive/hover feedback.

**Takeaway**: tinting shadows toward the brand's darkest hue (instead of pure black) is a cheap way
to make elevation feel "on-brand" rather than generic — worth considering for Wepho if a signature
accent color is chosen.

## 6. Icons — Three Parallel Systems (More Fragmented Than Greenvelope's Two)

1. **Bespoke line-icon SVGs**, one file per concept, uploaded individually rather than as a sprite
   or font: `bell-01.svg`, `lock-01.svg`, `mail-03.svg`, `marker-pin-01.svg`, `ticket-01.svg`,
   `qr-code-01.svg`, `user-plus-01.svg`, `file-check-02.svg`, `pie-chart-01.svg`,
   `dataflow-01.svg`, `coins-01.svg`, `passcode-lock.svg`. The `-01`/`-02` numeric suffixes match
   the naming convention of a well-known Figma icon library (Untitled UI or a close clone) rather
   than a custom-drawn set — i.e. this is very likely a licensed/free icon kit, not bespoke
   illustration. They're rendered as plain `<img>` / CSS `background-image`, **never inlined**, so
   their color can't be themed via CSS — each is presumably pre-colored to match the brand purple
   at export time.
2. **Font Awesome + ElegantIcons** (bundled by Elementor/SaaSLand) exist in the CSS but
   ElegantIcons is the only one actually invoked in markup, and only for **carousel chrome**:
   `eicon-chevron-left/right`, `eicon-chevron-double-left/right`, `eicon-close` — arrows and a
   close glyph, five total usages. Font Awesome ships but appears unused on this page.
3. **Lordicon** (`cdn.lordicon.com/libs/mssddfmo/lord-icon-2.1.0.js`) — an animated
   SVG/Lottie-style icon library, loaded but deferred via WP Rocket's lazy-script mechanism, so no
   `<lord-icon>` elements are present in the pre-hydration HTML. This is the headline difference
   from Greenvelope: RSVPify budgets for **animated micro-interaction icons** somewhere on the
   page (likely a feature/how-it-works section that plays a short animation on scroll or hover),
   whereas Greenvelope's icon strategy is 100% static.
4. **Social + trust badges**: custom flat SVGs per brand (`Facebook.svg`, `Instagram.svg`,
   `LinkedIn.svg`, `X.svg`, `YouTube.svg`) rather than an icon-font's brand glyphs, plus third-party
   review badges (`Capterra.svg`, `GetApp.svg`, `SOC2.svg`, `capterra_2026_badge.svg`,
   `software_advice_2026_badge.svg`) — B2B trust-signal badges Greenvelope's B2C page doesn't need.

**Practical implication for Wepho**: RSVPify's icon fragmentation (4 systems: static SVG kit, two
unused/underused icon fonts, one animated library) reads as organizational debt more than
intentional design — a symptom of a page-builder site with plugin accretion, not a pattern worth
copying. The *idea* worth taking is narrower: budget for **one** small animated-icon moment
(Lordicon-style) somewhere high-impact, but keep everything else on a single static system — don't
let three icon systems coexist by accident.

## 7. Motion

Far more animated than Greenvelope's near-static CSS:
- **`0.3s` is the house transition duration** for color/background-color/border-color/opacity —
  applied broadly and consistently (dozens of occurrences), so hover/focus states feel uniformly
  paced across the site.
- **Button shimmer sweep** (`.5s`, see §3) as a signature micro-interaction.
- **Accordion/expand pattern**: `transition:grid-template-rows .5s` — confirms FAQ-style
  expand/collapse is built on the modern CSS Grid `grid-template-rows: 0fr → 1fr` trick rather than
  `max-height` hacks or JS height measurement.

## 8. Responsive Strategy — Breakpoint Sprawl

In sharp contrast to Greenvelope's disciplined single `768px` breakpoint, RSVPify's combined CSS
carries **at least 15 distinct `max-width` values** (450, 480, 500, 576, 650, 767, 768, 991, 1024,
1199, 1250, 1280, 1440, 1450, 1550px…). This is the visible fingerprint of an Elementor page-builder
site: every widget/section can set its own responsive breakpoint independently, and over years of
edits those never get consolidated. It works, but it's not a *system* — there's no shared token
governing "tablet" or "desktop." Worth naming explicitly as the failure mode to avoid: Wepho's
hand-authored Tailwind approach with a small, fixed set of breakpoints is structurally healthier
than what page-builder accretion produces here, even though RSVPify is the bigger, more
established product.

---

## Summary — RSVPify vs. Greenvelope vs. Wepho

| Dimension | Greenvelope | RSVPify | Takeaway for Wepho |
|---|---|---|---|
| Stack | Hand-authored CSS, `.gv-*` BEM-ish | WordPress/Elementor + plugin accretion | Wepho's hand-authored Tailwind is closer to Greenvelope's discipline — keep it that way |
| Color | One green, 3 steps, strict neutrals | Purple + cream duotone, but framework-default noise still in the CSS | Pick one accent, and actually delete unused framework palette entries as you go |
| Buttons | Simple, instant state change | Pill-shaped, animated shimmer + glow on hover | A single signature hover micro-interaction (not three) reads as premium without adding system complexity |
| Cards | Flat, static, subtle shadow | Bento grid + palette-cycling + tinted elevation shadows | Tinting shadows toward your accent hue is cheap and effective; consider it over neutral grays |
| Icons | 2 clean systems (illustration + icon-font) split by intent | 4 overlapping systems (static SVG kit, 2 unused/underused icon fonts, 1 animated lib) | Budget one static system + optionally one animated moment — don't let a third accumulate by accident |
| Motion | Almost none (2 opacity transitions total) | Pervasive `.3s` on every interactive state, plus signature hover FX | Wepho's Love Letter demo animation should be the one big "spend" — keep everything else instant/minimal like Greenvelope, not pervasive like RSVPify |
| Breakpoints | 1 (768px) | 15+, uncoordinated | However Wepho's breakpoints get set, keep them to a small fixed list and reuse them everywhere |
