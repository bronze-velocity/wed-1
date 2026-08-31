# Moodboard Step 5: Statement-Select Alternative

## Why switch from questions to statements

The v2 questions ("How did you meet?", "What do your friends tease you about?") still ask couples to type or describe. Most answers come back generic: *we met at work, our friends tease us about being late*. Generic answers do not discriminate between apps. Two couples with almost identical answers end up with the same recommendation regardless of what would actually work in their room.

A statement-select mechanic flips the burden. Instead of asking the couple to describe themselves, we show ~30–50 short, opinionated statements and let them tap the ones that ring true. Each statement is engineered to point strongly toward one or two approved apps. The couple does the pattern-matching for us by recognizing themselves; the matching engine just counts weighted votes across app buckets.

The prompt shifts from *"tell us about yourselves"* to *"which of these actually sound like you?"* — much faster, more honest, and more entertaining.

## The core mechanic

**Prompt:** `Tap any of these that sound like you two. Hit the "really us" star on the ones that nail it.`

- Single tap on the card = applies
- Tap the small `★ really us` toggle on the card = strongly applies, counts double. Visible and explicit — no hidden double-tap gesture.
- Tap as many as ring true. No cap.
- Skip anything that does not fit
- No typing required; couples can add a written detail later if they want to
- Grouped into 5–7 loose themes so it does not feel like a wall of text
- Statement order is shuffled per session (within each theme) so no app is systematically favored by position. Theme order stays fixed for readability.
- Couples or their planners can fill this out — the mechanic and scoring are identical either way. If a planner is filling it in, a small toggle at the top of the results screen lets them label the recommendation as "on behalf of [couple names]" for the shareable brief.

## Why this works better than open-ended questions

1. **The couple recognizes themselves faster than they can describe themselves.** Ten seconds of tapping beats two minutes of typing.
2. **Each statement is pre-tagged with the app(s) it favors.** No NLP or interpretation layer required — the matching engine is a weighted sum.
3. **Contradictions become signal.** A couple that taps both "we want everyone laughing" and "we are actually quite private" tells us more than either answer alone.
4. **The statements themselves are marketing.** Reading them, the couple learns what Wepho notices about weddings. That builds trust before any result appears.
5. **It is genuinely fun.** Statement-select feels like a personality quiz, which is the register couples are in when they land on the site.

## Statement bank (draft)

Each statement is followed by the app(s) it points toward and a weight. `++` = strong signal, `+` = supporting signal. The final recommendation is whichever app cluster accumulates the highest score after doubling any "really us" taps.

The venue reality check (Step 6, at the end of the flow) then applies its constraint multipliers on top of these raw scores — see `step-6-venue-reality-check.md`.

### Theme 1 — How you argue and disagree

- `We disagree about literally everything, and it is somehow the point.` → Unpopular Opinions ++, Live Trivia +
- `One of us plans every trip down to the hour. The other just wants to show up.` → Where To Next ++, Unpopular Opinions +
- `We have the same fight about the thermostat every week.` → Unpopular Opinions ++
- `We cannot agree on a restaurant without a twenty-minute negotiation.` → Unpopular Opinions ++, Live Trivia +
- `One of us is always late. The other has learned to lie about start times.` → Custom Wedding Bingo ++, Live Trivia +
- `We argue about money the fun way — nice hotel or extra week?` → Prediction Vault ++, Where To Next +

### Theme 2 — How you met and your history

- `We met at work and technically were not supposed to.` → Who Said It? ++, Live Trivia +
- `Our friends set us up and will not let us forget it.` → Live Trivia ++, Who Said It? +
- `We met online and the first date almost did not happen.` → Who Said It? ++, Story Chain +
- `We have been together long enough that most guests only know the recent version of us.` → Who Said It? ++, Anniversary Time Capsule +
- `There is a specific text message that changed everything.` → Who Said It? ++
- `We were friends for years before anything happened.` → Story Chain ++, Live Trivia +

### Theme 3 — What the room should feel like

- `We want the whole room laughing at the same joke at the same time.` → Live Trivia ++, Custom Wedding Bingo +
- `We want people who have never met to be talking by dessert.` → Unpopular Opinions ++, Venue Scavenger Hunt +
- `We want a quiet moment with our parents and grandparents that does not feel staged.` → Two-Minute Video Guestbook ++, Guest Advice Oracle +
- `We want guests moving around, not glued to their seats.` → Venue Scavenger Hunt ++, Custom Wedding Bingo +
- `We do not want a big public performance. We are private people with a lot of people.` → Two-Minute Video Guestbook ++, Guest Advice Oracle +
- `We want something we can still look at on our first anniversary.` → Anniversary Time Capsule ++, Two-Minute Video Guestbook +

### Theme 4 — Your daily life

- `Our dog is essentially a third person in the relationship.` → Custom Wedding Bingo ++, Home Your Room Built +
- `Sunday breakfast is sacred, even when we are traveling.` → Custom Wedding Bingo ++, Guest Advice Oracle +
- `We take a walk after dinner every night to actually talk.` → Guest Advice Oracle ++
- `We have a running list of places we want to live one day.` → Where To Next ++, Prediction Vault +
- `Our old apartment was tiny and we still talk about it.` → Home Your Room Built ++
- `We are quietly, ridiculously competitive with each other.` → Live Trivia ++, Unpopular Opinions +

### Theme 5 — Who is in the room

- `Our siblings will fight about which stories are actually true.` → Who Said It? ++, Live Trivia +
- `Our oldest friends have receipts on both of us.` → Live Trivia ++, Story Chain +
- `Our parents know the family version of us but not the daily version.` → Guest Advice Oracle ++, Two-Minute Video Guestbook +
- `Half the room does not know the other half yet.` → Unpopular Opinions ++, Venue Scavenger Hunt +
- `We have a wedding party that will absolutely take over the dance floor.` → Custom Wedding Bingo ++
- `Most of our guests traveled a long way to be here.` → Venue Scavenger Hunt +, Where To Next +

### Theme 6 — What you have to work with

- `We have a folder of screenshots that basically writes itself into a story.` → Who Said It? ++
- `We have photos going back years that no one has ever seen.` → Who Said It? +, Two-Minute Video Guestbook +
- `The venue has meaningful spots we would love guests to notice.` → Venue Scavenger Hunt ++
- `There is a song that will make every friend from that summer look up.` → Custom Wedding Bingo ++, Live Trivia +
- `There is a restaurant that keeps showing up in our story.` → Venue Scavenger Hunt ++, Where To Next +

## Optional: dealbreaker toggles

At the end, a small set of "definitely not" statements the couple can tap to eliminate app options outright, even if the score is high:

- `Please, no big public game shows.` → down-weights Live Trivia, Who Said It?
- `We do not want anything on a big screen during dinner.` → down-weights any live-display app during that window
- `We do not want guests on their phones the whole night.` → down-weights ambient/all-night formats
- `We do not want anything that requires speeches.` → down-weights Two-Minute Video Guestbook framing

Dealbreakers are cheap and honest; they solve the "everything sounds fun but I know what I do not want" problem.

## Result surface

After the couple finishes tapping, the result page should read like a diagnosis, not a menu:

> `You tapped nine statements. Six of them cluster around one thing: you want the room laughing together, you have receipts from years of texts, and your siblings will argue about the details. Who Said It? is the shape that uses all three at once. Live Trivia is the close second if you would rather run one big game than a running one.`

The recommendation names the shape, references the statements that drove it, and offers one alternative — same structure as v2 but grounded in what the couple actually clicked, not what we inferred from a paragraph.

## What this replaces in v2

- The eight open questions become one screen of taggable statements
- The "Answer A / B / C" mock replies disappear — the statements *are* the answer options
- The matching-engine signals (story source, depth, content available, social shape, emotional temperature, publicness) are still the extraction targets, but each statement is pre-tagged against them so extraction is a table lookup instead of an interpretation
- The "realistic outcome" copy still gets written, but it references the tapped statements by name for continuity ("You said your siblings will fight about the stories...")

## Resolved decisions

1. **Statement count is uncapped.** Couples tap as many as ring true — no "pick up to 15." The scoring is a weighted sum, not a ranking exercise, so more signal is better and prioritization happens automatically through the "really us" toggle.
2. **"Really us" is a visible star toggle on each card**, not a double-tap or long-press. Hidden gestures are undiscoverable; the star is honest about the extra weight it carries.
3. **Statements shuffle per session** (within each theme; theme order stays fixed) so no app is systematically favored by list position.
4. **Planners can fill this out on behalf of couples.** The mechanic and scoring are identical; a small "filled by planner for [couple]" toggle on the results page attributes the shareable brief correctly.
