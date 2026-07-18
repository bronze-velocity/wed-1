---
name: LP v3 — Copy Suggestions
description: Third-pass landing page copy suggestions. Incorporates all v2 suggestions plus 8 rounds of user feedback.
---

# Landing Page v3 — Copy Suggestions

Successor to `zz/lp-v2-suggestions.md`. All v2 suggestions are kept unless explicitly revised. Revisions and additions are triggered by 8 pieces of feedback (marked **[v3]** throughout).

**The four ideas the LP has to land, in order:**
1. These apps are **built from scratch for your specific couple** — you can even bring your own idea
2. They **respect the IRL wedding** — brief use, no scroll hole, they *cause* real-world moments
3. They are a **great-value add** — a keepsake that outlives the flowers and the caterer
4. **[v3, new]** We only build apps that do something paper, a good MC, or a decorated jar structurally *can't* do — no app just for the sake of it

Every copy change below serves one of those four.

---

## Section-by-section

### 1. `HomeHero`

**v2 suggestion (kept as base)**
- Eyebrow: *Custom Wedding Experience Studio*
- H1: **A wedding app built for one couple. Yours.**
- Sub: *Bring us an idea, or pick one of ours. We build it from scratch — designed for your wedding, seamless on the night, phone-in and phone-out in under a minute. ~$2,000.*

**[v3] Revised sub, addressing feedback #1 (make "phone in / phone out 60s" clearer) and #2 (grandma-friendly instead of "seamless on the night"):**

> *Bring us an idea, or pick one of ours. We build it from scratch — designed for your wedding, simple enough that grandma is in on it in seconds, and short enough that guests are back in the room before their drink gets warm. ~$2,000.*

**Why:**
- "phone in, phone out in under a minute" is jargon we invented — outsiders read it as a slogan, not a promise. "Back in the room before their drink gets warm" makes the *duration* concrete without a number-word ("60 seconds") that reads as marketing.
- "Seamless on the night" is vague — it could mean anything. Naming **grandma** does two jobs at once: (a) it's a universal shorthand for "the least tech-savvy guest," (b) it signals the app respects every generation in the room, not just the couple's friends.
- Alt phrasings if the copywriter wants variants:
  - *"…so simple your least tech-savvy uncle is playing along by the time he sits down."*
  - *"…grandma-proof by design. Under a minute per guest, per moment."*

---

### 2. `StoryBeat1` — *"The room laughs before you even see what they wrote."*

**Unchanged from v2.** Keep as is.

Optional micro-caption underneath the app-name link, **[v3] rephrased** for feedback #1:

> *"~40 seconds of tapping. The rest of the night, they're watching everyone else."*

("40 seconds of tapping" is more concrete than "40 seconds on their phone" — it names the actual action, not the device.)

---

### 3. `DemoSection` (Love Letter Machine — existing demo)

**Unchanged from v2 headline and rule-badge suggestion**, with **[v3] rephrased rule badges** per feedback #1:

Rule badge row above the demo, three pills:

> *Tap, submit, back to your drink · You approve every message · Yours to keep forever*

("Tap, submit, back to your drink" beats "Phone in under 60 seconds" — it names the action, not the timer.)

Everything else in v2's DemoSection guidance stays the same.

---

### 3b. **[v3, new]** `DemoSectionTwo` — the second interactive demo

> Feedback #3: user wants a second demo. Below is the recommendation.

**Recommendation: build "Who Said It?" (app #14) as the second demo.**

Why "Who Said It?" and not one of the others:

| Candidate | Why not as a demo |
|---|---|
| #17 Video Guestbook (best app) | Requires webcam permission + recording. Too heavy for an LP interaction. Save for a video *of* the app, not an interactive demo. |
| #2 Trivia | Overlaps with Who Said It? mechanically (guess-and-reveal) but requires more setup text per question. Who Said It? is punchier. |
| #5 Prediction Booth | Requires typing + a "live histogram" that needs fake aggregation data. Doable but heavier than Who Said It? |
| #10 Story Chain | Requires typing a sentence. Slower than tap-to-guess and duplicates the "typing" mechanic already used by Love Letter Machine. |
| #11 Scavenger Hunt | Requires photos / camera. Non-starter for a browser demo. |
| #18 AMA | Requires typing + upvoting UX. Doable, but flat as a first-time interaction — no reveal moment. |

**Why "Who Said It?" is the strongest second demo:**

1. **Zero typing.** Visitor just taps. This is the only app on your best-of list that literally demos "phone in, phone out in seconds" with a one-tap interaction. Load-bearing proof for the biggest promise on the page.
2. **Complements Love Letter Machine.** Love Letter is *emotional / typing / curation.* Who Said It? is *quick / funny / voting.* Together they show the two ends of Wepho's range (make them cry ↔ make them laugh) inside one scroll.
3. **Instantly universal.** A blurred text-message screenshot is a piece of UI everyone has seen a thousand times. No setup needed. The *"Jack or Simone?"* buttons are self-explanatory.
4. **No backend fakery required.** 4–5 hardcoded (fictional) texts, a blur/reveal animation, a running score in the corner. All client-side state.
5. **Perfect big-screen story.** The demo can end with a "…and this is what your wedding guests would see" flourish showing the family-vs-family leaderboard mocked up. Lands the "screen event" promise concretely.

**Suggested placement:** between the current DemoSection (Love Letter Machine) and the AppGalleryTeaser. Or make it a tabbed toggle inside a single "Try the demo" section: **Tab A: Read it together** (Love Letter), **Tab B: Guess the sender** (Who Said It?).

**Suggested heading for the Who Said It? demo section:**
> *Guess the sender. Loser buys the next round.*

**Suggested subhead:**
> *A real text from a real relationship. Blurred sender. You've got two guesses. This is one of the moments your wedding could actually be built around — the whole room voting at the same time, laughing at the same wrong answers.*

**Fictional-couple demo texts** (write 4–5 in this style; alternate between the two senders):
1. *"i cannot believe you made me watch a two-hour documentary about the history of paperclips"*
2. *"babe the cat threw up on the keyboard again please come home"*
3. *"you were right about the shoes. i'm sorry. i love you. don't gloat."*
4. *"if you eat the last piece of leftover thai i will actually leave you"*
5. *"just so you know: i've been humming that song from our first dance all day and now everyone at work thinks i'm losing it"*

The visitor sees the text, taps Jack or Simone, gets an animated reveal ("It was Simone — 78% of the room got this one wrong"), sees a running score, then continues to text 2. After 4 texts, a small stat card appears: *"You just used the app for 22 seconds and laughed twice. That's the entire pitch."*

---

### 4. `AppGalleryTeaser`

**Unchanged from v2.**

**[v3] Note:** if the gallery grid gets pruned to a "best-of 8" instead of showing all 20 as previews, use the following as the featured cards (based on `apps-chosen.md`): **#17, #14** (best), **#2, #5, #10, #11, #17, #14** (yes / good), with an "OK also" tier for **#9, #18**. Do not feature #1/3/4/6/12/13/15/19/20 as marquee tiles.

*(The full `/apps` gallery page can still list all 20 — this is only about which get top billing on the LP teaser grid.)*

---

### 5. `StoryBeat2` — *"Your grandmother records a 45-second video message..."*

**[v3] Revised, addressing feedback #5.** The v2 version used *"Your grandmother records a 45-second video message. Sealed until your 10th anniversary. You'll open it together — she might not be there when you do."*

**New v3 version:**

> *Your sister records a 45-second video of your grandmother giving her advice. Sealed until your 10th anniversary. You'll open it together — grandma might not be there when you do.*

**Why the change is stronger:**
- The v2 version quietly assumed grandma operates the phone herself. In practice, she doesn't — a younger relative films her. Naming that ("your sister records…") makes the mechanic *believable* instead of imagined.
- It also demos the "assisted mode" mechanic from app #17 (Video Guestbook: *"grandparents and older guests get an assisted mode where their grandkid runs it for them"*). Two rules land at once: the app is grandma-inclusive, and it doesn't fight the family dynamics already in the room.
- The emotional payload is unchanged — arguably heavier, because it now visualizes *two* generations together in one shot: the sister filming, the grandmother speaking. That's the wedding.

---

### 6. `HowItWorks` — Three steps

**Step 01 — Unchanged from v2:**
> **01 — Bring an idea, or pick one of ours**
> *Twenty apps we've built are on this site — pick one and we'll make it about you. Or bring us something no one has ever done at a wedding before. Weird, specific, tied to a private inside joke — if it fits your story, we'll build it.*

**Step 02 — [v3] Revised, addressing feedback #6 (mention best practices, expertise, creativity):**

> **02 — We design and build it (2–4 weeks)**
> *You tell us the stories, share the photos, name the moments. We bring the craft — five years of wedding-app pattern-matching, live-night reliability engineering, and a designer whose only job is making sure it feels like part of your wedding, not a bolt-on tool. We push back when an idea won't land in the room. We suggest mechanics you'd never have thought of. You get the version that actually works on the night, not the version you first described.*

**Why:** v2's step 02 undersold what the couple is actually paying for. The user is right — expertise, taste, and "we've done this before and know what will land" is a huge part of the $2,000. This version says it without bragging.

**Step 03 — [v3] Lightly revised for feedback #2 (grandma clarity):**

> **03 — QR on every table. That's it.**
> *Guests scan. No download, no login, no app store. Grandma's in within seconds — we'll test it against every generation before your wedding day. We're on call during the reception if anything wobbles.*

("We'll test it against every generation" beats "your grandmother can do it" as a promise, because it names an action we take, not a hope.)

**Section subheading:** unchanged from v2 (*"Three steps. Zero templates."*).

---

### 7. `FiveRules` — the new section from v2

**[v3] Revised to become SIX rules** — feedback #4 adds one more pillar: *we only build apps that beat the analog version.*

**Heading:** *What every Wepho app respects*

**Six cards, 2–3 columns, one line each.**

1. **Guests are back in the room in under a minute.** No feed. No scroll hole. Tap, submit, look up.
2. **The magic happens in the room, not on the screen.** Every app triggers something real — a toast, a hug, a burst of laughter from table three.
3. **You curate everything.** Nothing hits the big screen without your (or a trusted friend's) approval. No awkward surprises.
4. **Built for one couple. Yours.** Nothing off the shelf. Bring us an idea — however weird, however private, however specific — and if it fits your story, we build it.
5. **You bring the idea. We build it beautifully.** You don't touch code, wireframes, or config. We ship it with wedding-native design and rock-solid live-night reliability.
6. **[v3, new] If paper does it as well, we tell you.** We only build apps that do something a decorated jar, a good MC¹, or a stack of prompt cards *structurally* can't. If your idea is already a wedding tradition that works, we'll tell you to save the $2,000 and buy nicer flowers.

> *¹ MC = Master of Ceremonies. The person who runs the reception's timeline — announcements, introductions, and keeping the night on track. Sometimes the DJ, sometimes a hired host, sometimes a family friend with a microphone.*

**Why rule #6 belongs on the LP:**
- It reframes the pitch from *"buy our thing"* to *"we won't sell you something you don't need."* That's the highest-trust move on the page.
- It also justifies the $2,000. If the promise is *"this only exists because paper can't do it,"* then paying $2,000 stops looking like a splurge and starts looking like it's paying for a real capability.
- Full backing catalog for this rule is in `zz/info/app-vs-analog-value.md` — 20 mechanics categorized into 5 underlying capabilities (time-shifted delivery, live big-screen reveal, real-time aggregation, live moderation, auto-artifact production). Reference this doc when writing the /apps/[slug] pages — every app page should have a *"Why not paper?"* micro-section that pulls the specific mechanic(s) from this doc.

---

### 8. `PlannersCallout`

**Unchanged from v2.**

---

### 9. `FinalCta`

**Unchanged from v2.**

---

## Micro-copy: the price frame

**Unchanged from v2.**

---

## **[v3, new]** Wedding-terminology usage — feedback #8

The user asked whether we should introduce more wedding-specific terminology (MC, MOH, etc.) to signal we know the industry. **Recommendation: yes, sparingly, always with a brief inline gloss the first time each term appears.**

**Terms worth using:**

| Term | First-use gloss | Why use it |
|---|---|---|
| **MC** (Master of Ceremonies) | *"the person running the reception timeline"* | Signals we know weddings; feedback loops with rule #6 ("a good MC") |
| **MOH** (Maid of Honor) | *"the bride's #1 — usually the one holding the tablet and approving messages"* | Names a specific role in our curation flow |
| **First look** | *"the couple's first private moment together, dressed, before the ceremony"* | Photography context — useful in blog posts about capturing moments |
| **Reception** | (no gloss needed) | Universal |
| **Cocktail hour** | (no gloss needed) | Universal |
| **Head table / sweetheart table** | *"where the couple sits during dinner"* | Useful when describing table-vs-table scoring in trivia |
| **Escort card** | *"the little card that tells each guest their table number"* | Useful in `Where We Know You From` context |

**Rules for use:**
- **Always define on first appearance** on any page, using inline em-dashes or parentheses. Never assume the reader knows the acronym.
- **After first use, use the term unglossed.** Repeating the gloss condescends.
- **Never invent Wepho jargon** ("phone-in-phone-out" was fine internally, but on the LP it needs plain-English translation as noted above).
- **Voice test:** the terminology should sound like *the brilliant friend who happens to build things* casually name-checking the industry — not like a wedding vendor trying to prove they belong.

**Suggested places to introduce terms on the LP:**
- `FiveRules` #6 already says "a good MC" with a footnote gloss. ✓
- `DemoSection` sub-copy: *"Your MOH — that's your maid of honor, and yes she'll have a tablet — approves each message before it hits the big screen."*
- `StoryBeat2` (revised): the sister/grandmother line already implicitly uses the family-role vocabulary. Good.
- `HowItWorks` step 02: could mention "the MC's timeline" as one of the things we design around: *"…we design around your MC's run-of-show so the app never fights the toasts."*

**Where NOT to use jargon:**
- Hero H1 and sub — must be maximally readable to a first-time visitor.
- Any CTA button — buttons must be idiot-proof.
- `AppGalleryTeaser` vibe taglines — those need to punch, not explain.

---

## **[v3, new]** Where the app-vs-analog thesis lives — feedback #7

The user asked for `zz/info/app-vs-analog-value.md` to appear on the LP *and* to have a blog-post plan built around it.

### On the LP

Three touch points, ranked by leverage:

**1. `FiveRules` rule #6** (already added above) — the *headline* version of the thesis.

**2. `/apps/[slug]` page pattern — new section: "Why not paper?"**
Every app page should include a short section (~120 words) that names:
- The analog version of the app (already drafted in `zz/info/20-apps-reimagined.md` in each app's "Non-app version" section)
- The specific mechanic(s) from `app-vs-analog-value.md` that the app leans on
- An honest verdict: "worth the app" vs "consider the paper version" vs "hybrid"

For the "Marginal" apps flagged in the blotter (Guess the Year, Advice, Recipe Box, Who Said It?, Dedications, Slow Reveal), the "Why not paper?" section should be genuinely honest — *"a good photo wall gets you 80% of the way. We build this one when the extra 20% matters to you (usually because you want the montage as a keepsake)."* This candor is on-brand and reinforces rule #6.

**3. Homepage — optional new micro-section between `FiveRules` and `PlannersCallout`:**

> **Heading:** *We're the only app studio that will talk you out of an app*
> **Copy (~60 words):** *There are 100 wedding traditions that already work. Prediction jars. Dedication slips. The advice book on the sweetheart table. If your idea is already served well by paper, we'll say so and send you to a good stationer. We build the ones where the app is doing something a jar structurally can't — like emailing you your guests' predictions on your 25th anniversary.*

This is a **long-shot inclusion** — the LP is already dense — but if it fits, it's the strongest single-paragraph statement of Wepho's positioning on the whole site.

### Blog post plan

The `app-vs-analog-value.md` doc is a natural spine for a 5-part blog series. Each post pulls from one of the "five meta-capabilities" at the bottom of the doc.

**Post 1 — *"The wedding app moat: scheduled delivery"***
Meta-capability: **persistence across time.** Anchored on: Letters to the Future, Prediction Booth, Love Letter Machine anniversary-pinning. Angle: *"Nobody has ever successfully opened a 'to be read in 25 years' envelope on time. Software does this on autopilot."* SEO target: "wedding time capsule ideas," "anniversary letter ideas."

**Post 2 — *"Live big-screen reveals: turning one guest's submission into a room event"***
Meta-capability: **instant computation at scale.** Anchored on: Love Letter Machine, Story Chain, Mad Libs Vows, Songs With Stories. Angle: *"The difference between a hat full of paper slips and a big-screen reveal is the difference between reading someone's letter and the whole room reading it with you."* SEO target: "unique wedding reception ideas," "wedding big screen ideas."

**Post 3 — *"When paper wins: 4 wedding traditions we won't build an app for"***
Contrarian post. The Recipe Box, the advice book, the escort-card pin map, the dedication slips. Positions Wepho as trustworthy. SEO target: "wedding advice book ideas," "wedding guest book alternatives" *(counterintuitive but converts the readers who arrive skeptical of tech at their wedding)*.

**Post 4 — *"Bridging the room: how to include the family who can't fly in"***
Meta-capability: **bridging distance.** Anchored on: Toasts From Everywhere, live emoji hearts, Wall of Love lobby screen, auto-captioning across languages. Angle: *"Half your family is in Lagos. The wedding isn't half a wedding without them."* SEO target: "virtual wedding guest ideas," "international wedding families."

**Post 5 — *"The keepsake that arrives two weeks later: automatic curation"***
Meta-capability: **producing a polished artifact automatically.** Anchored on: hardbound letter book, cookbook, YouTube playlist archive, chapbook, emoji timeline. Angle: *"A wedding is not over on the wedding day. The best keepsakes come in the mail."* SEO target: "wedding keepsake ideas," "wedding book ideas," "wedding memory book."

**Optional Post 6 — *"MC-friendly wedding tech: why we design around your run-of-show"***
Uses wedding terminology (MC, run-of-show, first dance, toasts) explicitly. Angle: *"A good app is invisible until its moment, then it disappears again. Here's how we design around the timeline your MC already built."* SEO target: "MC wedding technology," "wedding day timeline app." *(Also serves as a soft pitch to planners.)*

**Cadence:** 1 post every 2–3 weeks, staggered so they seed backlinks to the LP and to specific `/apps/[slug]` pages. Each post ends with a soft CTA to the demo or the "bring us an idea" contact form.

**Cross-linking:** every post references `FiveRules` rule #6 by name and links back to the LP anchor.

---

## Summary of v3 additions on top of v2

If v2 said "top 3 changes to make first," v3 adds five more items to that shortlist:

4. **Rephrase "phone in/phone out"** everywhere on the LP to plain-English concrete descriptions (*"tap, submit, back to your drink"*, *"back in the room before their drink gets warm"*).
5. **Replace "seamless on the night" with grandma-specific language** (*"grandma-proof by design," "grandma's in within seconds"*).
6. **Add "Who Said It?" as a second demo** on the LP — recommended over other candidates because it's zero-typing and shows the funny/quick end of the range.
7. **Add rule #6 to the FiveRules section** — "if paper does it as well, we tell you" — the single strongest trust move on the page.
8. **Rewrite HowItWorks step 02** to name craft/expertise/pushback (not just "we design and build").
9. **Update StoryBeat2** to have the *sister film grandma*, not grandma film herself.
10. **Introduce MC/MOH terminology sparingly** with inline glosses on first use.
11. **Publish the app-vs-analog thesis** via the `/apps/[slug]` "Why not paper?" pattern and a 5-part blog series.

Everything from v2 that isn't explicitly revised above should be treated as still in force.
