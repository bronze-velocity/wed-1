## New copy for the homepage section

Five options, each pitched at "we're going to invent something for you, live, while you click."

---

### Option A — the invention framing

**Eyebrow:** `Build something no one else will have`
**Headline:** `Invent your wedding app with us.`
**Sub:** `Answer a few questions and watch ideas appear, get weirder, get sharper. By the end you'll have three or four sketches nobody's ever built before, aimed at your couple and your guest list specifically.`
**CTA:** `Start inventing`
**Reassurance:** `Three minutes. No email. You keep whatever we come up with.`

---

### Option B — the choose-your-own-adventure framing

**Eyebrow:** `Choose your own reception`
**Headline:** `Every answer branches somewhere different.`
**Sub:** `Say your uncle will hijack the mic. Suggestions shift. Say the ceremony is outdoors and half the guests fly in from abroad. They shift again. Keep going until something makes you say oh, that.`
**CTA:** `Start the branching`
**Reassurance:** `Three minutes. Nothing sent anywhere unless you decide to share it.`

---

### Option C — the co-designer framing (closest to brand voice)

**Eyebrow:** `Bring us the raw material`
**Headline:** `Let's cook something up for your wedding, right now.`
**Sub:** `Tell us a few real things about the two of you and the room you'll be in. As you go, we'll throw ideas back, some obvious, some wild, some we'd talk you out of. By the end you'll have a page of ideas that only make sense for your day.`
**CTA:** `Start cooking`
**Reassurance:** `Three minutes. No email. Nothing lands with us unless you send it.`

---

### Option D — the reactive / conversational framing

**Eyebrow:** `A real conversation, minus the call`
**Headline:** `The more you tell it, the wilder it gets.`
**Sub:** `You describe your couple, your crowd, the moment you're chasing. It answers back with app sketches you probably haven't seen, plus a few honest "no, this one would bomb at your wedding." You end with a shortlist we design toward.`
**CTA:** `See what it says`
**Reassurance:** `Three minutes. Nothing sent unless you send it.`

---

### Option E — the anti-catalog framing

**Eyebrow:** `Skip the catalog`
**Headline:** `Don't shop for a wedding app. Grow one.`
**Sub:** `Answer a handful of questions about your day. Instead of a filtered list, you get custom sketches that shift and mutate as you keep going. Some will be too much. Some will be perfect. All of them are aimed at you.`
**CTA:** `Grow one`
**Reassurance:** `Three minutes. No account. No email unless you ask.`

**My pick:** C for the section, with D's mechanic-forward sub if you want to lean harder on "it reacts as you go." E is the boldest positioning if you're comfortable partially undercutting `/apps`.

---

## Plan for the moodboard mechanic

Goal: turn the wizard from a filter-and-match tool into a live invention studio. Every answer should visibly change what comes next. The user's dopamine hit is *seeing an idea appear that they didn't type*.

### 1. Live "idea feed" that grows as they answer

A persistent right-rail (or sticky bottom sheet on mobile) titled something like **"Ideas so far"** or **"What we'd try for you."** Starts empty. Every step adds 1–3 cards to it. Some cards are catalog apps recontextualized ("Love Letter Machine, but the letters unlock only after the maid of honor's speech"). Some are wholly new. Cards can be pinned, dismissed, or "make it weirder" (which regenerates the card with a stronger version of whatever trait the user just told us).

Why this matters: users watch the artifact assemble. That's the exciting part. Right now the moodboard only pays off at the end.

### 2. Reactive commentary on each step

As they select or type, a small assistant line appears beside the field, in Wepho's voice. Not sycophantic. Specific.

- User picks "Late-night, family-heavy, kids present": *"Kids-present shifts things. A late-night dance floor game is out, but a bedtime keepsake app could hit really hard."*
- User writes in "Story" field: *"we met on a dance floor at a stranger's wedding"*: *"That's a whole app on its own. Adding it to the ideas rail."*
- User picks a big guest count with an intimate mood: *"Two hundred guests wanting an intimate feel is the classic reception paradox. We'd probably split the app into small-group moments instead of one big shared screen."*

These lines are the moment users think "oh, this thing is actually listening." Small language models can generate these live from a template + the step's data, or we ship a hand-authored pattern library keyed off common answer combos. Start with the second, add the first later.

### 3. Green-lights and red-flags as concrete feedback

Alongside the reactive commentary, a running "fits / doesn't fit" panel. Two columns, always visible.

- **Would work for your day:** live-populated tags like "shared screen moments," "quiet keepsake apps," "trivia-shaped games."
- **Probably not for you:** "anything that assumes everyone has strong Wi-Fi," "loud-room voting apps," "apps that need guests to install anything."

Each red-flag is a small piece of honest infrastructure critique tied to what they said. Users trust the good suggestions more when they see the tool willing to disqualify things.

### 4. Escalating "wildcard" prompts

The existing Wildcard step becomes a spine that runs through the whole wizard. Every 2 steps, the tool offers one increasingly bold prompt:

- Step 2: *"What's a family running joke that only your side would get?"*
- Step 4: *"If one guest could give a two-minute unscripted speech and nobody would judge them, who's the guest?"*
- Step 6: *"What's the version of your reception that you'd secretly love but feel too embarrassed to plan?"*

Answers to these feed the idea rail with the wildest cards. Optional skip on each. The escalation is the choose-your-own-adventure feel.

### 5. "Make it weirder" and "make it calmer" knobs

At any point, two buttons on the idea rail let the user shift the entire generated set toward more adventurous or more restrained. Applies a delta to the prompts that produce the next round of cards. Cheap to build, and a huge part of what makes it feel *playable* rather than a form.

### 6. The final brief becomes a "reel," not a report

Instead of a static brief page, the results view plays back as a short scrolling document with:
- The couple's answers in their own words at the top (in quotes).
- The top three custom app sketches, each with a one-line "why this fits your wedding specifically."
- The one or two catalog apps that survived the filtering, with the twist you'd apply for them.
- A "don't build" callout with the discarded ideas and why, in one line each. This is the credibility move.
- A footer with the same shareable-link + password gate you already have.

The reel format is more fun to share, and the "don't build" section is what makes people trust the recommendations.

### 7. Build order (roughly)

1. Ship the copy change on the homepage section (small, unblocks positioning).
2. Add the persistent "Ideas so far" rail with hand-authored card templates keyed to answer combos. Start with maybe 40 templates covering the common branches. No LLM yet.
3. Add reactive commentary lines using the same template approach.
4. Add the fits / doesn't-fit panel.
5. Add "make it weirder / calmer" toggles.
6. Restructure the results view into the reel format with the "don't build" section.
7. Optional later: swap hand-authored templates for a live model call when the shape of the interactions has settled.

### Risks worth flagging

- Live commentary that misfires ("your grandma will hate this" when there's no grandma coming) breaks the trust the whole tool depends on. The hand-authored template phase is important. Do not rush to LLM-generated commentary before you've watched real users go through it.
- The "don't build" section is powerful but risky. If a user's dream idea shows up in there, they bounce. Only red-flag structural mismatches (guest count, tech constraints, moment) and never taste calls.
- The idea rail is dopamine-heavy, which is great, but if it fills too fast the user stops reading. Cap at maybe 6 pinned + 4 recent, with older cards collapsing into a "see all" drawer.

---

Want me to (a) swap Option C or another into `MoodboardInvite.js`, (b) sketch the "Ideas so far" rail as a component skeleton, or (c) draft the first 20 or so hand-authored reactive-commentary templates? Any combination is fine.