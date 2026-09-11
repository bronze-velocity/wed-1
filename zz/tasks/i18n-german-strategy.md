# German Localization Strategy (SEO-Compliant)

Goal: serve the entire Wepho site in German alongside English with full SEO parity — no cloaking, no client-side language swaps, no duplicate-content penalties.

---

## 1. URL Structure — subpath, not subdomain

Use locale as the first path segment:

- `wepho.com/` → English (default)
- `wepho.com/de/` → German
- `wepho.com/de/planners` → `wepho.com/de/planer` (translated slugs — see §4)
- `wepho.com/de/apps/[slug]` → German slug per app

**Why subpath over subdomain (`de.wepho.com`) or ccTLD (`wepho.de`):**
- Inherits domain authority immediately (a new subdomain / ccTLD starts from zero).
- Simpler ops: one Next.js app, one deploy, one cert.
- ccTLD is only worth the cost if we plan to target DACH aggressively with local backlinks, GMB, etc. Not yet.

**Route reorganization required.** Move existing routes under `app/[locale]/…`:

```
app/
  [locale]/
    layout.js          // reads params.locale, sets <html lang>
    page.js            // home
    planners/page.js   // (or /planer via slug map)
    apps/page.js
    apps/[slug]/page.js
  sitemap.js
  robots.js
  api/                 // stays locale-agnostic
```

Add `middleware.js` at the repo root to:
- Detect locale from URL. If missing, redirect `/` → `/en/` (or keep `/` as EN alias — pick one and stick with it; recommend keeping `/` as EN to avoid breaking existing links, and treat `/en/*` as canonical duplicates handled via redirect to `/`).
- On first visit with no locale in URL, optionally sniff `Accept-Language` and 302 to `/de/`; but **only for the root path** and only when the user hasn't set a preference cookie. Never auto-redirect deep links — Google needs stable URLs.

---

## 2. hreflang + canonicals (the SEO-critical part)

Every page must emit hreflang link tags for **every** locale variant of that page, including a self-reference and `x-default`:

```html
<link rel="alternate" hreflang="en" href="https://wepho.com/apps/love-letter-machine" />
<link rel="alternate" hreflang="de" href="https://wepho.com/de/apps/liebesbrief-maschine" />
<link rel="alternate" hreflang="x-default" href="https://wepho.com/apps/love-letter-machine" />
<link rel="canonical" href="https://wepho.com/apps/love-letter-machine" />
```

Canonical points to **self** (same locale), never cross-locale. Cross-locale linkage is hreflang's job only.

Implement in `generateMetadata` per route via `alternates.languages` and `alternates.canonical` — Next 16 App Router supports this natively.

Also mirror hreflang in `app/sitemap.js` using `xhtml:link` entries. Google reads it from both, but sitemap is more reliable at scale.

---

## 3. `<html lang>` per locale

`app/[locale]/layout.js` must set `<html lang={locale}>`. Also set `dir="ltr"` explicitly. This is a ranking + accessibility signal.

---

## 4. Translated slugs (not just translated body copy)

German SEO expects German URLs. Map every route slug:

| EN | DE |
|---|---|
| `/planners` | `/planer` |
| `/apps` | `/apps` (or `/anwendungen` — keep `/apps`; it's a loanword, high-recognition) |
| `/apps/love-letter-machine` | `/apps/liebesbrief-maschine` |
| `/apps/who-said-it` | `/apps/wer-hat-es-gesagt` |

Store the slug map in `lib/i18n/slugs.js`:

```js
export const slugMap = {
  'love-letter-machine': { en: 'love-letter-machine', de: 'liebesbrief-maschine' },
  // …20 apps
};
```

Data source (`zz/info/20-apps.json`) needs a `slug_de` + `title_de` + `description_de` field per app. Same for vibes/moments filter labels.

---

## 5. Translation content pipeline

Options, ordered by recommended path:

1. **Flat JSON dictionaries** per locale — `lib/i18n/messages/en.json`, `de.json`. Server components read the correct file based on `params.locale`. No runtime library needed; a tiny `t(key, locale)` helper is enough. Zero client JS overhead.
2. **`next-intl`** if we outgrow flat lookups (pluralization, ICU messages, formatting) — well-supported on App Router.
3. Avoid `react-i18next` — client-first, hurts our server-component default.

**Key constraint:** don't render English then swap — that hurts SEO and Core Web Vitals. Translations must be resolved server-side before HTML ships.

**Translation quality:** machine translation (DeepL) as a first pass, then human review by a native German-speaking wedding-industry copywriter. Brand voice ("warm, specific, confident") does not survive raw DeepL — every headline needs a human pass. Budget ~2–3 days of copywriter time for the full site.

---

## 6. Localized metadata

Every `generateMetadata` returns locale-specific `title`, `description`, `openGraph`, `twitter`. German meta descriptions must be written fresh, not translated 1:1 — they're conversion copy, not body text.

Include German keywords: "Hochzeits-App", "individuelle Hochzeits-Website", "Hochzeitsspiele für Gäste", "Interaktive Hochzeit". Do keyword research against `.de` SERPs before locking these in.

---

## 7. Structured data (JSON-LD)

If we add `Product` / `Service` / `LocalBusiness` schema, emit locale-appropriate values: `inLanguage: "de-DE"`, translated names/descriptions, EUR pricing hint (~€1,800) if we're actually targeting DACH commercially.

---

## 8. Sitemap + robots

- `app/sitemap.js` emits both locales for every URL, with hreflang cross-references.
- `robots.txt` stays universal; do **not** block either locale.
- Submit sitemap to Google Search Console with both locales; add a separate GSC property for `wepho.com/de/` to monitor DE performance in isolation.

---

## 9. Language switcher UX

- Persistent in `NavBar` + `Footer`.
- Links directly to the **translated equivalent** of the current page (uses the slug map), not the locale root. Falls back to locale root if no equivalent exists.
- Sets a `NEXT_LOCALE` cookie on click so middleware honors user preference on future visits.
- Rendered as `<a>` / `<Link>` with `hreflang` attribute — the switcher itself is a hreflang signal to crawlers.

---

## 10. Contact form + emails

- `POST /api/contact` accepts a `locale` field.
- Nodemailer template has EN + DE versions. Auto-reply to the couple is in their locale; internal notification to us stays in English.
- Form validation error messages localized.

---

## 11. Assets

- Photography: reuse the same shots.
- Any image with baked-in English text (rare for us, but check hero mockups, phone-screen renders in `components/demo/`) needs a DE variant OR text moved to HTML overlay so it's translatable without new asset generation.

---

## 12. Rollout order

1. Refactor routes under `app/[locale]/…`, keep only EN working. Ship. Verify nothing regressed.
2. Add i18n helper + EN dictionary extraction (still one language, but all copy sourced from JSON).
3. Add DE dictionary with DeepL first pass. Wire language switcher, hreflang, canonicals, sitemap.
4. Human copy review pass on DE.
5. Submit DE sitemap to GSC. Monitor Coverage + hreflang errors for 2 weeks.
6. Only then consider DE-specific link building / DACH outreach.

---

## Open questions before starting

- Is `/` staying as EN, or do we want an explicit `/en/` and locale-selection splash at `/`? (Recommend keeping `/` as EN.)
- Are we launching DE simultaneously across all 20 `/apps/[slug]` pages, or a subset first? (SEO prefers full launch — partial locale coverage triggers "missing translation" hreflang warnings.)
- Do we want `wepho.de` as a defensive registration even if we don't use it? (Yes — cheap insurance.)
- Pricing display: EUR on DE pages, or keep USD everywhere? (Recommend EUR on DE, converted at a stable round number.)
