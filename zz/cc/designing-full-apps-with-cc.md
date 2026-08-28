# Designing full apps/websites with Claude Code

Claude writes correct code but converges on the statistical average of its training data when aesthetic direction is left open. The default output is Vercel-template-core: Inter, slate-900 on white, a purple-to-pink gradient somewhere, rounded-2xl cards, 6xl hero headline, "Get started" pill button. Technically fine. Forgettable.

The fix is not "prompt harder." It is separating the **taste decisions** from the **code generation** and giving Claude a persistent, opinionated spec to build against.

## Why our current site feels generic

Symptoms to watch for in your own project:
- Fonts default to Inter / system-ui / a Google-Fonts serif (Fraunces, Playfair)
- One accent color, used sparingly, on an otherwise white/near-white canvas
- Every section is `Container` → centered headline → 2/3-col grid of cards
- Every card looks the same: same radius, same shadow, same padding
- Motion is limited to fade-in-on-scroll
- Photography is present but treated as neutral background, not as the design

If most of those are true, no amount of copy tuning will make it feel bespoke. The layout system itself is generic.

## The workflow that actually works

### 1. Do the taste work *before* Claude writes any component

Decide these yourself (or with a designer / reference-hunt session). Do **not** ask Claude to invent them:

- **A specific visual reference** — 2–4 sites/products the design should feel like, with notes on *what* about each (Linear's density, Stripe's typography contrast, Kinfolk's photo scale, Ghia's color palette). "Elegant and modern" is not a reference.
- **Typography with intent** — a display face + a text face, both named. Weight contrast is where personality lives; a 300 next to a 700 reads as designed, a 500 next to a 600 reads as Bootstrap.
- **A real palette** — not "primary/secondary/accent." Name the mood (bone, ink, oxblood, sage) and give hex. Include the awkward in-between values (a warm off-white, a muted mid-tone) — those are what stop it looking like Tailwind defaults.
- **A signature move** — one thing the site does that nothing else does. Oversized editorial captions. A single continuous photograph running down the page. Numbers set in a wildly larger size than the text. Pick one and commit.

### 2. Bake it into `app/globals.css` and `CLAUDE.md`

The design tokens in `app/globals.css` are the contract. Anything Claude generates that hardcodes a hex, a radius, a font-size outside the scale is a bug — the current `CLAUDE.md` already says this, keep enforcing it. Add to `CLAUDE.md`:

- The named references ("feels like Ghia + Kinfolk, not like Linear")
- The signature move, described concretely enough that a component can be checked against it
- A short "what this site is not" list — the anti-patterns you keep drifting into (e.g. *no purple/pink gradients, no glassmorphism, no floating cards with heavy shadows, no emoji in headings*)

### 3. Design one section end-to-end before scaling the pattern

Do not ask Claude to build the whole page and then iterate. Build **one** hero or one signature section to the point where it feels *specifically ours*, then use it as the reference for the rest. Otherwise every section gets the average-of-averages treatment and the whole thing regresses to mean.

### 4. Prompt for the section, not the code

Bad: "Build a testimonials section with 3 columns."
Better: "Testimonials section. Full-bleed warm-bone background. One quote at a time, set in the display face at ~48px, name and wedding date in a 12px caption underneath in a much lighter weight. No cards, no borders, no avatars. Paginate horizontally on desktop with a thin progress rule."

The second prompt has already made the design decisions. Claude is transcribing, not inventing.

### 5. Review against the reference, not against "does it look ok"

After each section: put the reference site and our site side by side. The question is not "is this good?" — it's "which one looks like it was made on purpose?" If ours looks like it could be any SaaS, the taste inputs upstream were too vague.

## Specific to Wepho

The product is emotional, one-night-only, wedding-specific. The site should feel closer to an editorial magazine or a boutique hotel than to a SaaS landing page. Concretely, that probably means:

- Photography leads, UI recedes. Big photographs, minimal chrome over them, generous negative space.
- Serif display face doing real work at large sizes, not just as a "quote" accent.
- Warmer palette than the current near-white. Bone, cream, ink, one saturated jewel tone used almost never.
- Fewer cards. The 20-app gallery is the one place a grid makes sense; most other sections should be single-column, editorial, with the copy specificity (the "how you actually met" line) doing the lifting.
- One recurring motif that ties pages together — a hairline rule, a specific caption treatment, a photo crop ratio — so the site feels authored.

## Anti-patterns to remove on sight

- `bg-gradient-to-br from-purple-500 to-pink-500`
- `rounded-2xl shadow-xl` on every card
- Icon in a circle above every feature
- 3-column feature grid with identical cards
- "Trusted by" logo bar when there are no logos
- Emoji in H1s
- Any headline that could belong to a different product with one word swapped

## TL;DR

Claude Code is a very fast, very literal implementer. It will not save you from a generic design brief; it will render one crisply. The leverage is upstream: pick specific references, pick a signature move, encode both into `CLAUDE.md` and tokens, then prompt section-by-section with the design decisions already made.

---

Sources:
- [Claude Code Design Prompts — Superdesign](https://superdesign.dev/blog/claude-code-design-prompts)
- [Tips for getting LLMs to write good UI — Sam Pierce Lolla](https://sampiercelolla.com/tips-for-getting-llms-to-write-good-ui-code/)
- [Expose Your Design System to LLMs — Hardik](https://hardik.substack.com/p/expose-your-design-system-to-llms)
- [I made my design system LLM-readable — dlslead](https://dlslead.com/post/how-to-make-design-system-ai-ready)
