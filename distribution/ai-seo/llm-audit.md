# LLM-Friendly Page Audit

Audit of every public route against `technical-implementation.md` §4 (semantic HTML) and §11 (content format LLMs like to quote).

For each route: **semantic HTML landmarks**, **single H1 + heading hierarchy**, **structured lists**, **`<article>` wrapping** for item-detail pages, and a **key-facts / TL;DR block** near the top.

Legend: ✓ present · ✗ missing/issue · ▲ partial

---

## Summary matrix

| Route | `<main>` | Single H1 | Semantic sections | Structured lists | `<article>` wrap | Key-facts near top |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| `/` | ✓ | ✓ | ✓ | ✗ | n/a | ✗ |
| `/apps` | ✓ | ✓ | ✓ | ✗ | n/a | ▲ |
| `/apps/[slug]` | ✓ | ✓ | ✓ | ▲ | ✗ | ✗ |
| `/planners` | ✓ | ✓ | ✓ | n/a | n/a | ▲ |
| `/blog` | ✓ | ✓ | ✓ | ✓ | n/a | ✓ |
| `/blog/[slug]` | ✓ | ✓ | ✓ | n/a | ✓ | ✓ |
| `/moodboard` | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

Excluded: `/dev/phone/[slug]` and `/ui` (internal, `noindex`-appropriate).

---

## Root layout — `app/layout.js`

- ✓ `<header>` (NavBar) — `components/layout/NavBar.js:30`
- ✓ `<nav>` primary — `NavBar.js:70`
- ✓ `<footer>` with nested `<nav>` — `components/layout/Footer.js:7,52`
- ▲ No site-wide `<main>` wrapper — each page provides its own. Acceptable, but every route must remember to add one (moodboard doesn't — see below).

---

## `/` — `app/page.js`

- ✓ `<main>` — `app/page.js:31`
- ✓ Single `<h1>` in `HomeHero` — `components/sections/HomeHero.js:39`
- ✓ Sections use `<section>` (HomeHero, StoryBeat*, DemoSection, etc.)
- ✗ **SixRules renders 6 enumerable rules as `<div>` grid** — `components/sections/SixRules.js:94–97`. Should be `<ul><li>` (or `<ol>` if order matters). LLMs cite list items far more reliably than flex-boxed divs.
- ✗ **No key-facts / TL;DR block near top.** Hero has a headline + descriptor but no definition-style sentence ("Wepho is a custom wedding app studio that…") and no summary block for AI to quote. Add per §11 of `technical-implementation.md`.

## `/apps` — `app/apps/page.js`

- ✓ `<main>` — line 20
- ✓ Single `<h1>` — line 42–54
- ✓ Two top-level `<section>` blocks (hero + gallery) — lines 21, 97
- ✗ **App gallery is a `<div>` grid** — `components/sections/AppGalleryFull.js:113–137`. 20 catalog items are the archetypal `<ul>/<li>` case; convert wrapper to `<ul>` and each card to `<li>`.
- ✗ Vibe/moment filters rendered as bare buttons in a flex div — `AppGalleryFull.js:65–82`. Consider `role="tablist"` or wrapping in `<ul>` for structure.
- ▲ Intro paragraph at line 29–83 partially serves as a summary, but there is no explicit `key-facts` block (e.g. price, apps count, delivery timing) — the exact concrete-numbers block §11 recommends.

## `/apps/[slug]` — `app/apps/[slug]/page.js` (**SEO-primary route**)

- ✓ `<main>` — line 43
- ✓ Single `<h1>` in `AppHero` — `components/app-page/AppHero.js:77–89`
- ✓ Each section component wraps in `<section>` (AppHero:34, AppHowItWorks:25, AppIsThisYou:12, AppBookIt:6)
- ▲ Lists partially structured:
  - ✓ `AppIsThisYou` uses real `<ul>` — `components/app-page/AppIsThisYou.js:40–96`
  - ✗ `AppHowItWorks` renders numbered steps as `<div>` grid — `components/app-page/AppHowItWorks.js:53–147`. Should be `<ol>` (order matters) or `<dl>` (term/description pairs).
- ✗ **No `<article>` wrapper.** Per-item pages should be `<main><article>…</article></main>` so LLMs know where the primary content begins and ends. Use `/blog/[slug]` as the template.
- ✗ **No key-facts block near top.** These are the pages we most want quoted. Add a compact block right after the hero with: price (~$2,000), timeline, guest-count fit, what's included. Per §11 ("Specific numbers … models cite concrete facts") and §3 (should also carry `Product`/`FAQPage` JSON-LD).

## `/planners` — `app/planners/page.js`

- ✓ `<main>` — line 18
- ✓ Single `<h1>` — line 33–43
- ✓ Hero `<section>` — line 19–56
- n/a Structured lists (no enumerable content on the current version)
- ▲ Hero paragraph functions as a summary but no explicit key-facts block. Since `technical-implementation.md` §3 calls for `FAQPage` schema here, add a semantic `<section>` of Q&A (with question-shaped `<h2>`s per §4) — it doubles as the key-facts block.

## `/blog` — `app/blog/page.js`

- ✓ `<main>` — line 20
- ✓ Single `<h1>` — line 41–53
- ✓ `<section>` for hero + list — lines 21, 68
- ✓ **Real `<ul>`/`<li>` post list with `<h2>` per post** — line 80–147. Reference implementation for other index pages.
- ✓ Subtitle paragraph (line 54–64) acts as summary.

## `/blog/[slug]` — `app/blog/[slug]/page.js`

- ✓ `<main>` + `<article>` + `<header>` + `<section>` — lines 39, 40, 41, 91. **Exemplary.**
- ✓ Single `<h1>` — line 64–75
- ✓ Article header carries title + date metadata — line 76–87
- ✓ Prose body inside `<section>` — line 91–106
- Use this file as the template when refactoring `/apps/[slug]`.

## `/moodboard` — `app/moodboard/page.js` (**critical**)

- ✗ Page renders `<MoodboardWizard />` directly — `app/moodboard/page.js:35`. No `<main>` on the route.
- ✗ **No `<h1>` anywhere in the wizard.** `MoodboardWizard.js:69` starts at `<h2>` — heading hierarchy broken.
- ✗ No semantic landmarks — wizard shell is a `<div>` (`MoodboardWizard.js:154–171`), same for `MatchingLoader` (`:30–80`).
- ✗ Step components render option grids as `<div>`s rather than `<ul>`/`<li>` — options are the definition of enumerable content.
- ✗ No key-facts / definition block; the page is JS-heavy and a crawler that doesn't execute JS (GPTBot) will see essentially nothing here. See §6 of `technical-implementation.md`.
- Note: if this route is intentionally client-only and not meant to be indexed, add a `noindex` meta and a server-rendered stub that at least contains an `<h1>` + one-sentence definition + `<a>` links to the other routes. Otherwise fix the semantic structure.

---

## Priority fix list

1. **`/moodboard`** — add `<main>`, an `<h1>`, and a server-rendered summary + link stub. Highest crawler-visibility loss right now.
2. **`/apps/[slug]`** — wrap page in `<article>`; convert `AppHowItWorks` steps to `<ol>`; add a key-facts block (price · timeline · guest fit · what's included) directly under the hero.
3. **`/apps`** — convert `AppGalleryFull` grid to `<ul>`/`<li>`.
4. **`/`** — convert `SixRules` to `<ul>`/`<li>`; add a definition-style sentence + key-facts block near the hero ("Wepho is a custom wedding-app studio. ~$2,000. Delivered in N weeks. Runs on guests' phones.").
5. **`/planners`** — add a `FAQPage`-shaped Q&A `<section>` with question `<h2>`s (also unlocks the JSON-LD in §3).
6. **`/blog` / `/blog/[slug]`** — no changes required; use as reference templates.

## Cross-cutting recommendation

Every fix above compounds with §3 (JSON-LD) and §11 (content format). Ship the semantic HTML first — `Product` / `FAQPage` / `BreadcrumbList` schema is far more credible when the visible DOM already matches its shape.
