// Planned blog posts. Drafts show up on /blog with a draft badge and a
// noindex flag so search engines don't pick them up before the writing lands.
// Content briefs for each post live in `distribution/seo/blog-post-notes.md`.

const DRAFT_NOTE =
  'This essay is in draft. Working outline below — full brief in <code>distribution/seo/blog-post-notes.md</code>.'

function draftHtml({ angle, outline }) {
  const lis = outline.map((line) => `<li>${line}</li>`).join('')
  return `
    <p><em>${DRAFT_NOTE}</em></p>
    <p><strong>Angle:</strong> ${angle}</p>
    <h2>Outline</h2>
    <ul>${lis}</ul>
  `
}

const draftEntries = [
  {
    slug: 'wedding-reception-ideas',
    title: 'The 25 wedding reception ideas we saw actually work',
    excerpt:
      "25 reception ideas grouped by moment, each with a specific-couple example — and the 5 we're begging couples to stop doing.",
    angle:
      "The 25 reception ideas we saw actually work — and the 5 we're begging couples to stop doing.",
    outline: [
      'Cold open: one scene from a real reception.',
      'How to read this list — grouped by moment (arrival / cocktail / dinner / speeches / dancing / after-party).',
      '25 ideas × ~120 words each, one specific-couple example per idea.',
      'The 5 that die on contact with a real room — kill list.',
      'How to pick 2–3 that fit your wedding, not 25.',
      'CTA to /moodboard for vibe match; /apps for the interactive-app version of 8 of the 25.',
    ],
  },
  {
    slug: '20-unforgettable-wedding-ideas',
    title: '20 unforgettable wedding ideas (and the rule behind all of them)',
    excerpt:
      "Every wedding you've been to in the last 5 years — and the 20 things that made you remember the one you actually loved.",
    angle:
      "Every wedding you've been to in the last 5 years — and the 20 things that made you remember the one you actually loved.",
    outline: [
      "Cold open: three specific weddings the writer has been to — why one is unforgettable and two aren't.",
      'Thesis: memory ≠ money spent. Memory = specificity + one held-breath moment.',
      '20 ideas, each with what it is, why it works, and the wedding it worked at.',
      "Closing: reveal the one-pager's specificity rule as the throughline.",
    ],
  },
  {
    slug: 'wedding-inspiration-2026',
    title: "Wedding inspiration 2026: real weddings we can't stop screenshotting",
    excerpt:
      "The throughline nobody's naming yet in 2026 weddings — and 12 real-wedding vignettes worth stealing from.",
    angle:
      "Real weddings we can't stop screenshotting in 2026 — and the throughline nobody's naming yet.",
    outline: [
      "Cold open: the writer's camera roll.",
      'The throughline: 2026 weddings are moving toward point-of-view, not aesthetic.',
      '12–15 real-wedding vignettes with a photo credit, the vibe, and the one detail worth stealing.',
      "'Build your own inspiration board' → CTA to /moodboard.",
    ],
  },
  {
    slug: 'unique-wedding-ideas',
    title: "Unique wedding ideas: unique isn't a colour palette",
    excerpt:
      'Unique is a specific decision only you would make — 12 categories of decision-you-can-make-different, each with 2 specific ideas.',
    angle:
      "Unique isn't a colour palette. Unique is a specific decision only you would make.",
    outline: [
      'The difference between "unique wedding" (search term) and unique wedding (the actual thing).',
      'Unique-by-decision, not by aesthetic — framing.',
      '12 categories × 2 specific ideas each.',
      "Kill list: 'unique' ideas that stopped being unique in 2019.",
    ],
  },
  {
    slug: 'non-traditional-wedding-ideas',
    title: 'Non-traditional wedding ideas: keep 3 rituals, rewrite the rest',
    excerpt:
      "You don't need to burn down tradition — you need to keep 3 rituals and rewrite the rest. 15 non-traditional swaps.",
    angle:
      "You don't need to burn down tradition. You need to keep 3 rituals and rewrite the rest.",
    outline: [
      'Three traditions worth keeping (why they still land) + why the rest are copy-paste.',
      'The rewrite framework: identity → substitute → keep the emotional beat.',
      '15 non-traditional swaps with the original, why it feels tired, and 2 alternatives.',
      'Warning: the swaps that always flop.',
    ],
  },
  {
    slug: 'wedding-trends-2026',
    title: 'Wedding trends 2026: 5 real, 5 fake, 1 forecast',
    excerpt:
      "What's actually shifting in 2026 — and what's a headline pretending to be a trend. Plus one specific 2027 prediction.",
    angle:
      "What's actually shifting in 2026 — and what's a headline pretending to be a trend.",
    outline: [
      'Executive summary: 5 real trends + 5 fake trends.',
      "Each real trend: what's changing, why now, one couple already doing it, how much it costs.",
      'Fake trends section: named + gently roasted with citations.',
      'Named prediction for one specific 2027 trend at the end.',
    ],
  },
  {
    slug: 'wedding-planning-tips',
    title: "12 wedding planning tips we'd tell a friend at 11pm the night before",
    excerpt:
      "The tips that matter aren't logistics — they're emotional infrastructure. 12 grouped as before, morning-of, during, night-after.",
    angle:
      "The 12 tips we'd tell a friend at 11pm the night before her wedding — nothing you'd Google.",
    outline: [
      '90% of tips online are logistics; the ones that matter are emotional infrastructure.',
      '12 tips: before the day / morning of / during / night after.',
      'Each tip: 60-word setup, one specific-couple example, "if you only do one thing…"',
      'The 3 tips we regret giving.',
    ],
  },
  {
    slug: 'wedding-activities',
    title: 'Wedding activities that make guests forget their phones',
    excerpt:
      '18 activities grouped as solo (fills a lull), pair (creates a conversation), and room (unifies attention).',
    angle:
      'Activities that actually make guests forget their phones — and the ones that make grandma leave early.',
    outline: [
      'What "activity" even means at a wedding (contrasted with entertainment).',
      'The 3 types — solo / pair / room.',
      "18 activities × 6 per type with duration, best moment, who it's for, how to run it.",
      'Kill list.',
    ],
  },
  {
    slug: 'wedding-after-party',
    title: 'Wedding after-party ideas: the two hours everyone remembers',
    excerpt:
      "Nobody plans the 2 hours after the reception ends — but they're the ones guests bring up years later.",
    angle:
      'The two hours after the reception ends — what nobody plans and everybody remembers.',
    outline: [
      'Hook: a specific 1am scene from a real after-party.',
      'The 3 kinds of after-party — full second venue / hotel-suite intimate / late-night bar takeover.',
      '10 after-party ideas per kind (30 ideas).',
      'Practical: budget ranges, logistics, when to end.',
    ],
  },
  {
    slug: 'cocktail-hour-ideas',
    title: '20 cocktail hour ideas that work in the 60 minutes nobody plans',
    excerpt:
      "60 minutes, a room of strangers, and a couple who's still taking photos — here's what actually works.",
    angle:
      "60 minutes, a room of strangers, and a couple who's still taking photos. Here's what actually works.",
    outline: [
      "The 3 jobs of cocktail hour: occupy strangers, mix tables, lower everyone's shoulders.",
      '20 ideas grouped by job.',
      'How to keep it under an hour.',
      'Signature-drink menu with 5 drinks named after real couples.',
    ],
  },
  {
    slug: 'adult-party-games',
    title: 'Adult party games that work with 30 people in a room',
    excerpt:
      "The games that don't feel like a corporate retreat — 15 ranked by 'would our clients play this at their own wedding.'",
    angle:
      'Party games that work with 30 adults in a room without feeling like a corporate retreat.',
    outline: [
      'Why most party-game listicles are recycled Kahoot content.',
      'The 4 rules of a game that actually works with adults.',
      '15 games ranked by "would our clients play this at their own wedding."',
      'When each game fits: dinner party / birthday / bachelor / rehearsal dinner / wedding reception.',
    ],
  },
  {
    slug: 'icebreakers',
    title: "Icebreakers that don't make anyone want to leave",
    excerpt:
      "The 12 icebreakers that pass the 'grown adult' test — plus 3 designed for a wedding cocktail hour.",
    angle:
      "The icebreakers that don't make anyone want to leave — including your dad.",
    outline: [
      "The icebreakers we've all endured and hated (named).",
      'Why most icebreakers fail — 3 reasons.',
      '12 icebreakers that pass the "grown adult" test.',
      'Bonus: 3 icebreakers designed for a wedding cocktail hour.',
    ],
  },
  {
    slug: 'wedding-lawn-games-alternatives',
    title: 'Wedding lawn games: 15 alternatives to cornhole',
    excerpt:
      "Cornhole is fine — but 15 alternatives don't require 6 months of Etsy custom orders and get remembered.",
    angle:
      "Cornhole is fine. Here are 15 alternatives that don't require six months of Etsy custom orders.",
    outline: [
      'How cornhole became the default and why nobody remembers the couple who had cornhole.',
      "The 'outdoor game' bar we should be clearing.",
      '15 alternatives — analog, app-augmented, hybrid.',
      'Practical: budget, rain plan, set-up time.',
    ],
  },
  {
    slug: 'newlywed-game-questions',
    title: '100 newlywed game questions — and the 12 that always land',
    excerpt:
      "100 questions we've written for real couples, tagged by category and difficulty, plus a house-style guide for writing your own.",
    angle:
      "The 100 newlywed-game questions we've written for real couples — plus the 12 that always land.",
    outline: [
      'The difference between a great question and a mediocre one — one word.',
      'The 4 categories: specificity, embarrassment, timeline, "would you rather."',
      '100 questions, tagged by category + difficulty.',
      'How to write your own — Wepho house style guide, given away.',
      'CTA to /apps/couple-trivia.',
    ],
  },
  {
    slug: 'wedding-trivia-questions',
    title: '60 wedding trivia questions that make the room lean in',
    excerpt:
      'Trivia at a wedding fails when questions could be from any wedding. 60 questions grouped by the specificity axis.',
    angle:
      '60 wedding-trivia questions that make the room lean in, not check their phones.',
    outline: [
      'Trivia at a wedding fails when questions could be from any wedding.',
      'The specificity axis — from "when did they meet" (weak) to "what did she say when he asked" (strong).',
      '60 questions grouped by axis position.',
      'How to interview the couple to get the good stuff.',
    ],
  },
  {
    slug: 'wedding-shoe-game-questions',
    title: '80 wedding shoe game questions ranked by spice',
    excerpt:
      '80 questions ranked PG to grandma-would-leave — and the 5 that always land.',
    angle:
      '80 shoe-game questions ranked from PG to grandma-would-leave — and the 5 that always land.',
    outline: [
      'The shoe game is the trivia of weddings — universal, tired, revivable.',
      'How to run it well: setup, MC role, timing.',
      '80 questions ranked by spice level (PG / PG-13 / R).',
      'The 5 that always work — case study.',
      'When to skip it and use /apps/couple-trivia instead.',
    ],
  },
  {
    slug: 'shoe-game-alternatives',
    title: 'The shoe game is 40 years old — here are 8 alternatives',
    excerpt:
      'Shoe-game energy without the shoes: 8 alternatives from lightly-refreshed to fully-different.',
    angle:
      "The shoe game is 40 years old. Here's what to do instead if it feels tired.",
    outline: [
      'Brief history + why the shoe game gets recycled.',
      '8 alternatives, lightly-refreshed to fully-different.',
      'Or: just run the shoe game with better questions — link out.',
    ],
  },
  {
    slug: 'wedding-bingo-cards-printable-vs-live',
    title: 'Wedding bingo: printable cards vs. live bingo',
    excerpt:
      'Printable bingo is a good icebreaker. Live bingo — where the room competes — is a different night entirely.',
    angle:
      'Printable wedding bingo is fine. Live bingo — where the room competes — is a different night entirely.',
    outline: [
      "What printable bingo does well vs. what it can't do.",
      'Comparison: printable vs. live — cost, setup, memory-value.',
      '5 printable templates (free download).',
      '5 live-bingo customisation angles → /apps/wedding-bingo.',
    ],
  },
  {
    slug: 'wedding-guestbook-ideas',
    title: 'Wedding guestbook ideas people will actually revisit',
    excerpt:
      'The wedding guestbook nobody signs vs. the one everyone stops to read a year later. 20 ideas ranked by revisit-score.',
    angle:
      'The guestbook nobody signs vs. the guestbook everyone stops to read a year later.',
    outline: [
      'The wedding guestbook museum — signed once, opened never.',
      'The 3 things a guestbook needs to do: be signed, be readable, be revisitable.',
      '20 guestbook ideas from paper-classic → analog-clever → digital-native.',
      'Why the video-guestbook is the format we bet on → /apps/video-guestbook.',
    ],
  },
  {
    slug: 'wedding-keepsake-ideas',
    title: 'Wedding keepsakes that get looked at at your 10th anniversary',
    excerpt:
      'The keepsakes that get looked at once vs. the ones that survive a decade — 20 ideas across visual, textual, audio, ritual.',
    angle:
      'The keepsakes that get looked at once vs. the ones that get looked at at your 10th anniversary.',
    outline: [
      'Keepsake ≠ photo. Keepsake = a specific artifact that unlocks a specific memory.',
      'The 4 kinds of keepsake: visual, textual, audio, ritual.',
      '20 ideas across the 4 types.',
      'Bonus: 3 keepsakes that only exist because of Wepho apps.',
    ],
  },
  {
    slug: 'wedding-photo-booth-alternatives',
    title: "You don't need a wedding photo booth — you need what it's a proxy for",
    excerpt:
      '12 alternatives to a wedding photo booth that hit the same needs at 1/3 the cost — plus the 2 cases you should still rent one.',
    angle:
      "You don't need a photo booth. You need what a photo booth is a proxy for.",
    outline: [
      'The photo-booth-industrial-complex and why every couple rents one.',
      'What guests actually want: permission to be silly + a keepsake + a fixed spot in the room.',
      '12 alternatives that hit those needs at 1/3 the cost.',
      'When you should still get a photo booth (2 legitimate cases).',
    ],
  },
  {
    slug: 'wedding-speeches-ideas',
    title: 'Wedding speech ideas that land vs. speeches politely thanked afterwards',
    excerpt:
      'The one structural principle: specificity + one held-breath moment + one laugh. 10 speech ideas by relationship.',
    angle:
      'The speeches everyone remembers vs. the ones the couple politely thanked afterwards.',
    outline: [
      'The 5 speech clichés we all suffer.',
      'The one structural principle: specificity + one held-breath moment + one laugh.',
      '10 speech ideas — one per relationship.',
      'Rehearsal tactic: read it aloud to one honest friend.',
    ],
  },
  {
    slug: 'best-man-speech-ideas',
    title: "Best man speech ideas that don't sound like the other 47",
    excerpt:
      "Best-man speeches are a genre. Here's the remix: specificity + one line the couple didn't know you knew.",
    angle:
      "Best-man speeches are a genre. Here's how to write one that doesn't sound like the other 47 you've heard.",
    outline: [
      "The anatomy of a bad best-man speech — and why it's dead.",
      "The remix: specificity → one held-breath moment → one line the couple didn't know you knew about them.",
      '10 speech outlines with real examples.',
      'Rehearsal & delivery tactics.',
    ],
  },
  {
    slug: 'wedding-toast-ideas',
    title: 'The 30-second wedding toast that lands',
    excerpt:
      'Toast ≠ speech. Toast = 30 seconds, one image, one raise-your-glass. 15 templates by relationship and mood.',
    angle:
      'The 30-second toast that lands vs. the 8-minute speech disguised as a toast.',
    outline: [
      'Toast ≠ speech. Toast = 30 seconds, one image, one raise-your-glass.',
      'The formula: image + turn + raise.',
      '15 toast templates by relationship and mood.',
      "The couple's own toast to their guests → /apps/advice-oracle.",
    ],
  },
  {
    slug: 'backyard-wedding-ideas',
    title: "25 backyard wedding ideas that don't run out of extension cords",
    excerpt:
      "The 25 backyard-wedding decisions that separate 'homemade charm' from 'we ran out of extension cords by 6pm.'",
    angle:
      'The 25 backyard-wedding decisions that separate homemade charm from we-ran-out-of-extension-cords-by-6pm.',
    outline: [
      'One backyard wedding that worked, one that flopped, and the single decision that separated them.',
      'The 5 constraints of a backyard wedding: space, power, weather, noise, neighbours.',
      '25 ideas grouped by constraint solved.',
      'Practical logistics: permits, insurance, restrooms, tent rental.',
    ],
  },
  {
    slug: 'outdoor-wedding-ideas',
    title: '25 outdoor wedding ideas by venue type',
    excerpt:
      '25 ideas grouped by venue type — beach, forest, farm, garden, urban rooftop, backyard — plus the 4-level weather-plan hierarchy.',
    angle:
      'Outdoor weddings, grouped by venue type — with a 4-level weather-plan hierarchy nobody plans for.',
    outline: [
      'Group by venue type: beach, forest, farm, garden, urban rooftop, backyard.',
      '25 ideas across the venue types.',
      'The weather-plan hierarchy: 4 levels of backup, when each kicks in.',
    ],
  },
  {
    slug: 'small-wedding-ideas',
    title: 'Small wedding ideas: 20 things you can only do with 20 guests',
    excerpt:
      'Small is a design choice, not a compromise. 20 ideas that lean into intimacy — plus the 5 things only tiny weddings can do.',
    angle:
      "Small is a design choice, not a compromise — and here's the 20-guest advantage.",
    outline: [
      'Small is a design choice, not a compromise.',
      '20 ideas that lean into intimacy (personalised place-settings, storytelling seating charts, guest-participation moments).',
      'The 20-guest advantage: 5 things you can only do when the whole room fits at one table.',
    ],
  },
  {
    slug: 'rustic-wedding-ideas',
    title: 'Rustic wedding ideas without doing 2015 rustic',
    excerpt:
      '20 rustic ideas that still work in 2026 — plus a kill list of things that scream Pinterest-past-decade.',
    angle: 'How to do rustic without doing 2015 rustic.',
    outline: [
      '20 rustic ideas that still work.',
      'Kill list: what screams Pinterest-past-decade.',
      '3 sub-vibes: barn / farmhouse / mountain.',
    ],
  },
  {
    slug: 'boho-wedding-ideas',
    title: 'Boho wedding ideas — and boho vs. its impostors',
    excerpt:
      '15 boho ideas across desert, forest, and coastal sub-vibes — plus a cutting section on what actually is boho vs. what got sold to you.',
    angle:
      'Boho vs. its impostors — what actually is boho vs. what got sold to you as boho.',
    outline: [
      '15 boho ideas.',
      'Sub-vibes: desert / forest / coastal.',
      'Boho vs. its impostors — cutting section.',
    ],
  },
  {
    slug: 'garden-wedding-ideas',
    title: 'Garden wedding ideas — 15 botanical decisions that hold up at 10pm',
    excerpt:
      '15 garden-wedding ideas with a seasonal-bloom calendar and a practical guide to which flowers survive to 10pm.',
    angle:
      "Garden weddings are aesthetic-perfect on Pinterest — here's which flowers actually hold up until 10pm.",
    outline: [
      '15 botanical-heavy ideas.',
      'Seasonal-bloom calendar.',
      'Which flowers will still be alive at 10pm.',
    ],
  },
  {
    slug: 'wedding-favor-ideas-reimagined',
    title: 'Wedding favors nobody takes home — and the one thing that gets pocketed',
    excerpt:
      'The wedding-favor graveyard, and the one thing that actually gets taken home: a personal message from the couple to that specific guest.',
    angle: "Nobody takes the favor home. Here's what actually gets pocketed.",
    outline: [
      'The wedding-favor graveyard: candied almonds, mini bottles, monogrammed matchbooks.',
      'The one thing that gets pocketed: a personal message from the couple to that specific guest.',
      '15 favor ideas ranked by take-home rate.',
      'The reframe: what if the "favor" is a digital keepsake delivered the morning after? → /apps/love-letter-machine.',
    ],
  },
  {
    slug: 'reception-program-timeline',
    title: 'The wedding reception timeline that keeps energy high, minute by minute',
    excerpt:
      'The 5-hour reception timeline broken into 15-minute blocks — including the energy dip nobody plans for 45 minutes after dinner starts.',
    angle:
      'The reception timeline that keeps energy high — minute-by-minute, from cocktail to send-off.',
    outline: [
      'The "energy dip" nobody plans for (usually 45 min after dinner starts).',
      'Full 5-hour reception timeline in 15-min blocks.',
      'What goes into each block: host announcements, moments, activities, quiet.',
      'Where interactive-app moments slot in without breaking flow.',
    ],
  },
  {
    slug: 'hochzeitsspiele-modern',
    title: 'Moderne Hochzeitsspiele, die 2026 wirklich funktionieren',
    excerpt:
      'Die klassischen Hochzeitsspiele (Ehequiz, Schuh-Spiel) funktionieren 2026 nicht mehr — 15 moderne Alternativen mit konkreten Beispielen.',
    angle:
      'Moderne Hochzeitsspiele, die euer 2026er-Publikum nicht peinlich finden wird.',
    outline: [
      'Warum die klassischen Hochzeitsspiele 2026 nicht mehr funktionieren.',
      'Was moderne Hochzeitsspiele wirklich brauchen — Prinzipien.',
      '15 moderne Spielideen (analog + digital) mit konkreten Beispielen.',
      'Wepho-Version am Ende — dezent, nicht aggressiv.',
    ],
  },
]

export const posts = draftEntries.map((entry) => ({
  slug: entry.slug,
  title: entry.title,
  excerpt: entry.excerpt,
  draft: true,
  html: draftHtml({ angle: entry.angle, outline: entry.outline }),
}))
