# One Studio, Every Event — Unified App Studio Plan

Sibling of `duplication-plan.md`. That plan forks Wepho per niche. **This plan does the opposite: one brand, one codebase, one site — serving every event type from a single studio.**

The bet: the *craft* ("we build a custom interactive web app for one night of your life") is the brand, not the wedding. Weddings become one of many entry doors, not the whole product.

---

## 1. Positioning

**Working brand hypothesis:** "Custom apps for once-in-a-lifetime nights."

Not "event tech." Not "party games." A studio that makes a bespoke web app for the one evening that matters — wedding, 40th, mitzvah, retirement, memorial, kickoff. Same craftsmanship, same price ballpark, same team.

**Why this can work**
- The buyer psychographic is consistent across niches: someone planning a high-stakes, emotionally loaded, one-shot event who's willing to pay for something no one else will have.
- The production model is identical (custom app, one night, guest phones, big screen).
- The design system, device frames, moderation stack, and per-app template all transfer.

**Why it might not**
- Wedding buyers trust "the wedding people." A generalist studio may feel less credible in each niche than a specialist would.
- SEO becomes a harder game — you compete on "custom wedding app" against a specialist site (possibly your own former self).
- Sales complexity increases: intake needs to route by event type.

**Mitigating tactic:** lead with the craft on the homepage, but keep per-niche landing pages that read like a specialist wrote them. Buyer never has to feel like they landed on a generic marketplace.

---

## 2. Information Architecture

```
/                             studio-level homepage (craft-first, event-type picker)
/events/weddings              niche landing (feels specialist)
/events/birthdays
/events/mitzvahs
/events/anniversaries
/events/corporate             maybe spun out later
/events/memorials             sober treatment
/events/[…]
/apps                         full catalog, filterable by event × vibe × moment
/apps/[slug]                  per-app page, event-aware (adapts examples per referring event)
/process                      how a custom app gets built in 3 weeks
/studio                       who we are, portfolio, testimonials cross-niche
/pricing                      or price bands per event type
/contact                      unified intake, event-type routing
```

Homepage sections:
1. Hero — craft statement + rotating event-type demo
2. Event-type picker (6–8 tiles, each links to `/events/*`)
3. "How it works" (identical across events)
4. Portfolio strip (cross-niche real events)
5. Featured apps (filtered dynamically to a rotating event)
6. Studio credibility (team, press, guarantee)
7. Contact / booking CTA

---

## 3. Product & Data Model

Single source of truth. No forking per niche.

**Core entities**
- `EventType` — `wedding | birthday | mitzvah | anniversary | corporate | memorial | reunion | shower | fundraiser | custom`
- `Honoree` — polymorphic: `couple | person | family | org | group | none`
- `App` — with `eventTypes: EventType[]`, plus optional per-event copy overrides (`titleByEvent`, `descriptionByEvent`, `examplesByEvent`)
- `Moment` — event-type-scoped tags (a wedding's "first dance" ≠ a birthday's "cake cutting" ≠ a corporate "keynote")
- `Vibe` — mostly cross-cutting (intimate, playful, elegant, irreverent)

**Content module pattern**
```
content/
  studio.js                 brand voice, cross-cutting copy
  events/
    weddings.js             hero, ICP, testimonials, gallery slice
    birthdays.js
    mitzvahs.js
    …
  apps/
    apps.js                 base catalog
    overrides/
      love-letter.js        per-event framing (wedding: "to your partner", birthday: "to the birthday kid")
```

Sections consume a single `event` prop and pull copy + photos + demos from these modules.

---

## 4. Design System

Keep Wepho's tokens as the base. Add:

- **Tone dial** — a per-event motion/color preset. Memorial = motion-reduced, muted palette; birthday = brighter accents; corporate = restrained/premium. Implemented as CSS variable overrides scoped to `/events/*` routes.
- **Photography sets** — `public/images/events/{eventType}/` with a shared shape (hero, section-b, gallery grid). `PhotoBackdrop` takes an `event` prop and pulls the right set.
- **Iconography** — per-event moment icons (rings vs. cake vs. torah vs. balloons); shared UI icons stay one set.
- **Typography** — one type system across the studio. Do not fork per niche — that's what breaks brand coherence.

---

## 5. Demos

The demo is the single biggest brand asset. Ship **three universal demos** that reskin per event type via props:

1. **Message Machine** (evolution of Love Letter Machine) — anyone writes a message to anyone, approved, revealed on the big screen. Wedding: to your partner. Birthday: to the birthday kid. Memorial: memory of the honoree. Corporate: shoutout to a teammate.
2. **Who Said It** — trivia over any 2+ real people. Cross-event with zero code change.
3. **Live Prompt Wall** — audience answers a prompt, best answers ride the big screen. Universal.

Homepage rotates one demo based on the visitor's picked event type (or defaults to a random one). Each `/events/*` page pins the demo that fits best.

---

## 6. Pricing

Do **not** ship a single "$2k" number. Different niches carry different anchors.

Recommended structure:
- **Bands, not a price**: "Custom apps start at $1,500. Most events land between $2k–$4k. Corporate and multi-day events price separately."
- Per-event page shows the band that applies (birthday: 1.5–2.5k, wedding: 2–4k, corporate: 5–20k).
- Detailed quote via contact form. Never a public price grid — leaves room to segment.

---

## 7. Booking & Ops

- **Unified intake form** with an event-type field first. Routes to a niche-tagged inbox / CRM lane.
- **SLA tiers** — memorial (fast turnaround, 48–72h possible), everything else 2–4 weeks lead time. Surface this on the page.
- **Playbook per event type** — internal doc per niche: what to ask on the discovery call, common apps for that event, timing considerations, edge cases. Not customer-facing.
- **Moderation defaults per event type** — heavier for teen events (mitzvahs) and public events (corporate), lighter for close-knit ones.

---

## 8. SEO

The umbrella model's biggest risk.

- Each `/events/{type}` page targets that niche's head terms ("custom birthday party app", "interactive mitzvah app").
- Each `/apps/[slug]` page targets long-tail app-name terms and shows all supported events.
- Cross-linking: event pages → filtered `/apps` view; app pages → applicable event pages.
- Content marketing forks per niche (blog posts, keyword lists under `distribution/seo/events/{type}/`).
- Watch: canonical URLs to avoid duplicate-content between `/apps/love-letter` and any event-specific variant.

---

## 9. Migration Path from Current Wepho Repo

**Phase 1 — Generalize in place (1 week)**
- Refactor `couple` → `Honoree` with a type discriminator.
- Add `eventTypes` to every entry in `data/apps.js` (default all to `['wedding']`).
- Extract homepage copy into `content/events/weddings.js`.
- Add an `event` prop to every section under `components/sections/`.

**Phase 2 — Studio-shell rename (2–3 days)**
- Decide new brand (Wepho stays as a wedding sub-brand? Or full rename?).
- Update `NavBar`, `Footer`, `layout.js`, `robots`, `sitemap`, contact SMTP identity.
- Move current `/` content under `/events/weddings` with 301s. Build new studio-level `/`.

**Phase 3 — Second event live (1–2 weeks)**
- Anniversaries first (cheapest fork). Full landing, filtered catalog, photography set, testimonial (even if seeded), demo props.

**Phase 4 — Add 2–3 more events in parallel (2–3 weeks)**
- Birthdays, mitzvahs, memorials. Each follows the same pattern → mostly a content + photo exercise.

**Phase 5 — Ops hardening (ongoing)**
- CRM tagging, per-event playbooks, moderation profiles, pricing bands live.

**Phase 6 — Decide on spin-outs**
- Corporate and memorial almost always end up wanting their own brand. Revisit after 6 months of data.

---

## 10. Team Implications

- **Design:** photography direction becomes a rolling cost — budget for 1 shoot per niche in year 1.
- **Sales/discovery:** discovery-call script grows event-type variants. Consider a lightweight intake questionnaire that pre-fills the call.
- **Delivery:** per-event playbooks matter more than they do at Wepho today; without them, delivery quality drops as niches multiply.
- **Support:** night-of support model (someone on-call during the event) stays identical.

---

## 11. Risks & Kill Criteria

- **Positioning risk** — if conversion on `/events/weddings` drops materially vs. Wepho standalone, the umbrella brand is hurting more than helping. Kill / spin out.
- **Content debt** — 6 niches × 20 apps = 120 marketing surfaces. Templatize hard, or freeze the app catalog per niche at 6–8 hero apps.
- **Sales complexity** — if discovery calls double in length because reps have to context-switch across niches, split the team.
- **Corporate gravity** — B2B corporate events will pull the studio away from consumer craft. Either spin them out early or lock a hard cap on their share of pipeline.

---

## 12. What to Build First (concrete)

If this plan is greenlit, ship in this order (~5 weeks):

1. Data-model refactor + `content/events/weddings.js` extraction (no visible change) — 1 wk
2. Studio-shell homepage + event picker + rename — 1 wk
3. Anniversaries as second live niche — 1 wk
4. Milestone birthdays as third — 1 wk
5. Unified intake + CRM tagging + per-event playbooks v1 — 1 wk

After this, additional niches are ~3–5 days of copy + photo + SEO each.
