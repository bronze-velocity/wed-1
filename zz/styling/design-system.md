# Wepho Design System

Inspired by [pitch.com](https://pitch.com) — clean, modern, confident SaaS aesthetic adapted for a premium wedding app studio. Light mode first, generous whitespace, bold typography, smooth motion.

---

## Design Philosophy

| Principle | In Practice |
|---|---|
| **Bold, not loud** | Large display type and strong color accents — never clutter |
| **Premium confidence** | Clean layouts signal the $2,000 price point without stating it |
| **Warmth within precision** | Warm off-white backgrounds and rounded corners soften the geometry |
| **Motion as feedback** | Animations communicate state and guide attention, never decorate |

---

## Color Palette

### Base

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Primary page background |
| `--color-bg-subtle` | `#F7F6F3` | Alternating sections, cards |
| `--color-bg-dark` | `#111111` | Dark hero sections, footer |
| `--color-bg-dark-subtle` | `#1A1A1A` | Dark section cards/panels |

### Text

| Token | Hex | Usage |
|---|---|---|
| `--color-text-primary` | `#111111` | Body copy, headings on light bg |
| `--color-text-secondary` | `#6B6B6B` | Subheadings, meta, captions |
| `--color-text-muted` | `#AAAAAA` | Placeholder, disabled, footnotes |
| `--color-text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `--color-text-inverse-secondary` | `rgba(255,255,255,0.6)` | Secondary text on dark bg |

### Brand Accent (Purple)

| Token | Hex | Usage |
|---|---|---|
| `--color-accent` | `#6B5CE7` | Primary CTA, links, highlights |
| `--color-accent-hover` | `#5649D6` | Hover state |
| `--color-accent-light` | `#EDE9FF` | Tinted backgrounds, badges |
| `--color-accent-dark` | `#3D2DB5` | Active state, dark sections |

### Secondary Palette (for app type cards, features)

| Token | Hex | Usage |
|---|---|---|
| `--color-rose` | `#F24E78` | Romantic / ceremony apps |
| `--color-amber` | `#F8A324` | Celebration / games |
| `--color-teal` | `#36C5F0` | Memory / keepsake apps |
| `--color-green` | `#2EB67D` | Interactive / live apps |
| `--color-coral` | `#F87162` | Roast / fun apps |

### Borders & Dividers

| Token | Hex | Usage |
|---|---|---|
| `--color-border` | `#E8E8E8` | Default border |
| `--color-border-strong` | `#D0D0D0` | Emphasized borders, inputs |
| `--color-border-dark` | `rgba(255,255,255,0.12)` | Borders on dark backgrounds |

---

## Typography

### Font Stack

**Default browser font** — `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

No external font loaded. Uses the OS/browser system font for zero layout shift and no network dependency.

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `--text-display-xl` | `80px / 5rem` | 800 | 1.0 | `-0.04em` | Hero headline, single line |
| `--text-display` | `64px / 4rem` | 800 | 1.05 | `-0.03em` | Section hero |
| `--text-h1` | `48px / 3rem` | 700 | 1.1 | `-0.025em` | Page H1 |
| `--text-h2` | `36px / 2.25rem` | 700 | 1.15 | `-0.02em` | Section headings |
| `--text-h3` | `26px / 1.625rem` | 600 | 1.2 | `-0.015em` | Card headings, feature titles |
| `--text-h4` | `20px / 1.25rem` | 600 | 1.3 | `-0.01em` | Sub-section headings |
| `--text-body-lg` | `18px / 1.125rem` | 400 | 1.65 | `0` | Hero body, lead paragraphs |
| `--text-body` | `16px / 1rem` | 400 | 1.6 | `0` | Default body copy |
| `--text-body-sm` | `14px / 0.875rem` | 400 | 1.55 | `0` | Secondary copy, captions |
| `--text-label` | `13px / 0.8125rem` | 600 | 1.4 | `0.04em` | Labels, badges, overlines (ALL CAPS) |
| `--text-tiny` | `12px / 0.75rem` | 400 | 1.5 | `0` | Legal, footnotes |

### Responsive Typography

Mobile: multiply sizes by **0.75** for display/h1. H2+ stays the same.

```css
/* Example breakpoint scale */
@media (max-width: 768px) {
  --text-display-xl: 52px;
  --text-display: 44px;
  --text-h1: 36px;
  --text-h2: 28px;
}
```

### Overline / Label Style

Pitch uses small all-caps spaced labels above section headings:

```css
.overline {
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
}
```

---

## Spacing

**Base unit: 4px.** All spacing is a multiple of 4.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Micro gap (icon to label) |
| `--space-2` | `8px` | Tight spacing within components |
| `--space-3` | `12px` | Compact padding |
| `--space-4` | `16px` | Default component padding |
| `--space-5` | `20px` | — |
| `--space-6` | `24px` | Section inner padding |
| `--space-8` | `32px` | Card padding, gap between items |
| `--space-10` | `40px` | Between components |
| `--space-12` | `48px` | Section vertical padding (mobile) |
| `--space-16` | `64px` | Section vertical padding (tablet) |
| `--space-20` | `80px` | Section vertical padding (desktop) |
| `--space-24` | `96px` | Large section gap |
| `--space-32` | `128px` | Hero bottom space |
| `--space-40` | `160px` | Extra large section gap |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Tags, small chips |
| `--radius-md` | `8px` | Buttons, inputs, small cards |
| `--radius-lg` | `12px` | Default cards |
| `--radius-xl` | `16px` | Large feature cards |
| `--radius-2xl` | `24px` | Modals, big panels |
| `--radius-full` | `9999px` | Pills, avatars, icon chips |

---

## Shadows & Elevation

| Token | Value | Usage |
|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.06)` | Subtle lift (inputs) |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)` | Default card |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)` | Elevated card |
| `--shadow-lg` | `0 10px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)` | Modals, dropdowns |
| `--shadow-xl` | `0 24px 48px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)` | Hero product image |
| `--shadow-glow` | `0 0 0 3px var(--color-accent-light)` | Focus ring |
| `--shadow-glow-accent` | `0 8px 32px rgba(107,92,231,0.25)` | Accent button hover glow |

---

## Gradients

```css
/* Hero gradient wash — large sections */
--gradient-hero: linear-gradient(160deg, #F7F4FF 0%, #FFFFFF 50%, #F0F9FF 100%);

/* Dark hero */
--gradient-hero-dark: linear-gradient(160deg, #1A1228 0%, #111111 60%);

/* Purple accent gradient — buttons, badges */
--gradient-accent: linear-gradient(135deg, #7B68EE 0%, #6B5CE7 100%);

/* Subtle card tint */
--gradient-card-tint: linear-gradient(180deg, rgba(107,92,231,0.04) 0%, transparent 100%);

/* Multi-color feature gradient (like Pitch's colorful integration section) */
--gradient-rainbow: linear-gradient(135deg, #F24E78, #F8A324, #36C5F0, #6B5CE7);
```

---

## Animation

### Timing Functions

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);        /* Snappy, confident exit — most common */
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);    /* Smooth crossing */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Slight overshoot — playful */
--ease-linear: linear;
```

### Durations

```css
--duration-instant: 80ms;    /* Micro interactions (checkbox, toggle) */
--duration-fast: 150ms;      /* Hover states */
--duration-normal: 250ms;    /* Transitions, reveals */
--duration-slow: 400ms;      /* Page-level, scroll-triggered */
--duration-slower: 600ms;    /* Complex animations, stagger parents */
--duration-slowest: 900ms;   /* Hero entrance, full-section reveals */
```

### Core Animation Classes

```css
/* --- Hover lift — applies to cards, buttons --- */
.hover-lift {
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* --- Hover scale — applies to icons, thumbnails --- */
.hover-scale {
  transition: transform var(--duration-fast) var(--ease-spring);
}
.hover-scale:hover {
  transform: scale(1.04);
}

/* --- Underline draw — for nav links --- */
.link-underline {
  position: relative;
  text-decoration: none;
}
.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: currentColor;
  transition: width var(--duration-normal) var(--ease-out);
}
.link-underline:hover::after {
  width: 100%;
}
```

---

## Scroll Animations

Pitch uses intersection-observer-based reveals. Every section element enters with a **fade + upward slide**. Grid items stagger with a delay.

### Base Reveal Pattern

```css
/* Initial state — set on every animated element */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}

/* Applied by IntersectionObserver when element enters viewport */
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children — each child gets a delay based on index */
.reveal-stagger > * {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}
.reveal-stagger.is-visible > *:nth-child(1) { transition-delay: 0ms;   opacity: 1; transform: none; }
.reveal-stagger.is-visible > *:nth-child(2) { transition-delay: 80ms;  opacity: 1; transform: none; }
.reveal-stagger.is-visible > *:nth-child(3) { transition-delay: 160ms; opacity: 1; transform: none; }
.reveal-stagger.is-visible > *:nth-child(4) { transition-delay: 240ms; opacity: 1; transform: none; }
.reveal-stagger.is-visible > *:nth-child(5) { transition-delay: 320ms; opacity: 1; transform: none; }
.reveal-stagger.is-visible > *:nth-child(6) { transition-delay: 400ms; opacity: 1; transform: none; }
```

### React Hook (Next.js)

```tsx
// hooks/useScrollReveal.ts
'use client'
import { useEffect, useRef } from 'react'

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
```

### Scroll-Linked Parallax (Hero Only)

```tsx
// Subtle parallax on hero illustration/product image
// Applied only to decorative elements — not to text content
'use client'
import { useEffect, useRef } from 'react'

export function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      el.style.transform = `translateY(${scrollY * speed}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}
```

---

## Buttons

```css
/* --- Base --- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: inherit;
  font-weight: 600;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}
.btn:active { transform: scale(0.98); }

/* Sizes */
.btn-sm  { padding: 8px 16px;  font-size: 13px; }
.btn-md  { padding: 12px 24px; font-size: 15px; }
.btn-lg  { padding: 15px 32px; font-size: 16px; }

/* --- Primary (black — Pitch's default style) --- */
.btn-primary {
  background: #111111;
  color: #FFFFFF;
}
.btn-primary:hover {
  background: #2A2A2A;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* --- Accent (purple) --- */
.btn-accent {
  background: var(--color-accent);
  color: #FFFFFF;
}
.btn-accent:hover {
  background: var(--color-accent-hover);
  box-shadow: var(--shadow-glow-accent);
  transform: translateY(-1px);
}

/* --- Secondary (outlined) --- */
.btn-secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid var(--color-border-strong);
}
.btn-secondary:hover {
  border-color: #888888;
  background: #F7F7F7;
}

/* --- Ghost (text only) --- */
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  padding-left: 8px;
  padding-right: 8px;
}
.btn-ghost:hover {
  color: var(--color-text-primary);
  background: #F0F0F0;
}

/* --- Pill variant --- */
.btn-pill { border-radius: var(--radius-full); }
```

---

## Cards

```css
/* --- Base card --- */
.card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-sm);
  transition:
    box-shadow var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}
.card:hover {
  box-shadow: var(--shadow-md);
  border-color: #D8D8D8;
  transform: translateY(-2px);
}

/* --- Subtle card (on white bg use this for slight contrast) --- */
.card-subtle {
  background: var(--color-bg-subtle);
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--space-8);
}

/* --- Dark card --- */
.card-dark {
  background: var(--color-bg-dark-subtle);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  color: var(--color-text-inverse);
}

/* --- Feature card (large, with colored top border or tinted bg) --- */
.card-feature {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-10) var(--space-8);
  position: relative;
  overflow: hidden;
}
.card-feature::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--gradient-accent);
}
```

---

## Badges & Labels

```css
/* --- Base badge --- */
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: var(--radius-full);
  padding: 4px 12px;
}

.badge-accent {
  background: var(--color-accent-light);
  color: var(--color-accent-dark);
}
.badge-neutral {
  background: #F0F0F0;
  color: var(--color-text-secondary);
}
.badge-dark {
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.8);
}
```

---

## Layout & Grid

```css
/* --- Max-width container --- */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

@media (min-width: 768px) {
  .container { padding: 0 var(--space-10); }
}
@media (min-width: 1280px) {
  .container { padding: 0 var(--space-16); }
}

/* --- Feature grid (2-col on tablet, 3-col on desktop) --- */
.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}
@media (min-width: 640px) {
  .feature-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .feature-grid { grid-template-columns: repeat(3, 1fr); }
}

/* --- Section vertical rhythm --- */
.section {
  padding: var(--space-16) 0;
}
@media (min-width: 768px) {
  .section { padding: var(--space-20) 0; }
}
@media (min-width: 1024px) {
  .section { padding: var(--space-32) 0; }
}
```

---

## Navigation

Pitch-style nav: fixed, transparent → frosted glass on scroll.

```css
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: 64px;
  display: flex;
  align-items: center;
  transition: background var(--duration-normal) var(--ease-out),
              backdrop-filter var(--duration-normal) var(--ease-out),
              box-shadow var(--duration-normal) var(--ease-out);
}

.nav.scrolled {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--color-border);
}
```

---

## Section Patterns

### Pattern 1 — Centered Hero

```
[OVERLINE LABEL]
[Large headline, 2–3 lines max]
[Subline body text, ~2 sentences]
[CTA Button] [Secondary link →]
[Product image / animation below]
```

### Pattern 2 — Feature Split (alternating left/right)

```
[Image/Demo]          [Overline]
                      [Heading]
                      [Body copy]
                      [Link →]
```

### Pattern 3 — Card Grid

```
[Section heading, left-aligned]
[Body, left-aligned]
[─────────────────────────────]
[Card] [Card] [Card]
[Card] [Card] [Card]
```

### Pattern 4 — Dark Full-Bleed CTA

```
[Dark background section]
[Large centered headline]
[CTA button — white or accent]
```

### Pattern 5 — Testimonial Strip

```
Logo Logo Logo Logo Logo Logo (marquee scroll)
"Quote quote quote"
— Name, Role at Company
```

---

## Responsive Breakpoints

| Token | Value | Target |
|---|---|---|
| `sm` | `640px` | Large phones |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Small laptops |
| `xl` | `1280px` | Desktop |
| `2xl` | `1536px` | Wide screens |

---

## Accessibility

- **Focus ring**: `box-shadow: 0 0 0 3px var(--color-accent-light), 0 0 0 5px var(--color-accent)` — never remove default focus, replace it
- **Minimum contrast**: 4.5:1 for body text, 3:1 for large text and UI
- **Reduced motion**: wrap all animations in `@media (prefers-reduced-motion: no-preference)`
- **Touch targets**: minimum 44×44px for all interactive elements

```css
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-stagger > * {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```
