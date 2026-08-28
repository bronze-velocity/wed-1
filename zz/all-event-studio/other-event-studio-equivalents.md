# App Studio Equivalents for Other Event Types

Custom one-night-only interactive web apps, same model as Wepho — different niches. Ordered by closeness of fit.

---

## 1. Milestone Birthdays (30/40/50/60/…)
- **Similar:** emotional, once-in-a-lifetime feel; guest phones during a party; "how well do you know X" games translate directly; slideshow/message-wall formats reusable.
- **Different:** one honoree instead of a couple (rewrite couple-centric copy/data model); budgets often lower (~$500–$1,200); planners rare — sell direct to the host or adult child organizing.
- **Watch:** less planner channel, more social/paid; sentimentality dial varies wildly (surprise 40th ≠ 90th tribute).

## 2. Anniversaries / Vow Renewals
- **Nearest cousin.** Almost the same app catalog; couple-centric data model reused as-is.
- **Different:** guests know the couple for decades — trivia gets harder/richer; "how we met" beats need a retrospective angle, not a discovery angle.
- **Watch:** smaller TAM; often bundled by wedding planners already — could live as a Wepho add-on rather than a separate studio.

## 3. Bar/Bat Mitzvahs / Quinceañeras / Sweet 16s
- **Similar:** big-budget catered event, phones-in-hand guests, DJ/emcee integration, family + friend mix.
- **Different:** honoree is a teen — UX, tone, and moderation change significantly (profanity filter, parental controls, no romantic framing); cultural/religious specificity matters (Hebrew, Spanish, tradition-aware moments).
- **Watch:** parents book, teen judges the "cool" factor — dual-audience design.

## 4. Corporate Events (offsites, holiday parties, sales kickoffs, award nights)
- **Similar:** live-audience-with-phones format, big-screen moments, icebreakers/trivia/polls, per-event customization.
- **Different:** B2B sale (procurement, legal, SSO, data retention, invoicing not Stripe); higher price ($5–25k); brand-skinning required; SOC2/privacy questions; recurring accounts, not one-shot.
- **Watch:** completely different GTM — feels like a separate company, not a duplicate site.

## 5. Retirement Parties & Milestone Career Celebrations
- **Similar:** tribute-heavy formats (message wall, "favorite memory of X", roast quotes) map cleanly.
- **Different:** often organized by HR/EA — semi-B2B; smaller catalog needed; lower emotional peak than weddings.
- **Watch:** thin standalone market — probably a subset of #4 rather than its own studio.

## 6. Funerals / Memorials / Celebrations of Life
- **Similar:** message wall, memory collection, photo slideshow, "share a story about…" all transfer.
- **Different:** tone is sacred — no games, no leaderboards, no gamification language anywhere; sold on short notice (48–72h turnaround) or pre-planned by funeral homes.
- **Watch:** ethically sensitive — brand voice/copy must be rewritten from scratch; consider partnerships with funeral homes rather than direct-to-family.

## 7. Baby Showers / Gender Reveals / Baby's-First-Year Parties
- **Similar:** intimate, guest-participation, "guess the…" games, keepsake angle (message-to-baby wall).
- **Different:** much lower budget ($200–500); shorter events; often DIY-first market — hard to justify $2k.
- **Watch:** likely a lower-priced SKU / template product, not a full custom studio.

## 8. Reunions (family, high school, college)
- **Similar:** "who said it", trivia, timeline, memory wall all reuse; group-with-shared-history is the exact wedding dynamic.
- **Different:** organizer is a volunteer with a committee, not a bride/planner; budget from ticketed pool, price-sensitive.
- **Watch:** great fit product-wise, weak fit commercially — consider a self-serve tier.

## 9. Engagement Parties / Bridal / Bachelorette
- **Similar:** couple data reusable; some apps (Who Said It, Love Letter) fit perfectly.
- **Different:** smaller event, lower budget, often the same buyer as the wedding — better sold as a Wepho upsell than as a separate site.
- **Watch:** cannibalization risk with the wedding itself.

## 10. Fundraisers / Galas / Charity Auctions
- **Similar:** live big-screen moments, guest phone interaction, real-time reveals.
- **Different:** functional apps (bidding, donations, payments) — regulated, PCI scope, integrations with Classy/GiveButter; totally different tech stack and compliance surface.
- **Watch:** don't underestimate — this is a separate product, not a reskin.

---

## Cross-Cutting Notes Before Duplicating

- **Reusable across all niches:** device frames (phone/big-screen/admin), demo pattern, per-app marketing page template, `data/apps.js` shape, contact-form → SMTP flow, design tokens, section rhythm, SEO scaffolding.
- **Always rewrite:** brand voice, hero copy, app catalog names/copy, photography, ICP framing, price anchor, planner-channel page.
- **Data model:** wedding assumes a couple (two people). Birthdays/memorials/mitzvahs assume one honoree. Corporate assumes an org + event. Refactor `couple`/`partners` into a generic `honoree(s)` entity before duplicating.
- **GTM channel changes more than the product:** planner network (weddings) → parent networks (mitzvahs) → HR/procurement (corporate) → funeral homes (memorials). Each demands a different site structure, not just different copy.
- **Pricing anchor drifts:** don't assume the $2k price holds. Corporate is 3–10×, birthdays/showers are ½ or less. Recheck willingness-to-pay per niche before cloning the pricing section.
- **Moderation risk scales with audience:** teen events and public fundraisers need heavier profanity/PII filtering than a wedding of 120 invited guests.
- **Best duplication candidates first:** Anniversaries (thinnest fork) → Milestone Birthdays (largest TAM with same shape) → Mitzvahs/Quinces (highest budget non-wedding personal event). Avoid Corporate and Fundraisers as "duplications" — they are new products.
