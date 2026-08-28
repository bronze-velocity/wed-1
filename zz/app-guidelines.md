# Wepho App Guidelines

Refined product guidelines for the 15 approved app concepts currently shown on the site. These guidelines are derived from `zz/one-pager.md`, the approved catalog in `zz/wed-apps/20-apps.json`, and the extended app pages in `data/apps.js`.

## What Every Wepho App Must Be

Wepho makes one-night-only interactive wedding experiences for one couple. The app is not the attraction by itself. It is the carefully designed mechanism that turns a couple's specific history, people, and future into a shared reception moment and a lasting artifact.

The central product model is:

> The phone is the input device. The room, the conversation, or the keepsake is the output.

An app is worth building when it does something generic software cannot do: it knows the couple, gives their guests a reason to participate, and creates a moment or artifact that could only belong to them.

## The Non-Negotiables

### 1. Guests should be in and out quickly

- QR code to mobile browser. No download, account, or login.
- The first meaningful action should be obvious without instructions.
- A single interaction should generally take less than 60 seconds.
- Longer experiences must be deliberately bounded, with a clear endpoint and a reason to look up.
- Design for mixed technical confidence, small screens, poor lighting, one-handed use, and older guests.

### 2. The app must return attention to the wedding

- Never build a feed for its own sake.
- Every phone interaction should cause something social: laughter, a debate, a toast, a shared reveal, a walk around the venue, or a future ritual.
- The display wall is not a dashboard. It is a stage, prompt, scoreboard, reveal, or ambient backdrop.
- If a feature encourages guests to keep scrolling alone, remove it or make it optional.
- A quiet, private experience is valid when privacy is the point. It still needs a clear reason to exist at a wedding.

### 3. The couple's specificity is the product

Replace generic prompts with details only this couple could supply:

- not "share a memory," but "what did you think of the other one after the Lisbon scooter incident?"
- not "guess the answer," but "who sent the 2:14am dumpling ultimatum?"
- not "give advice," but "what should they remember when the thermostat argument starts in year three?"

Every concept needs a believable couple-specific premise, a small set of concrete examples, and a customization path beyond names and colors.

### 4. The couple or a trusted person stays in control

- Moderation is included wherever guests can submit text, media, questions, jokes, or dares.
- The couple chooses who can approve, edit, hide, or feature content.
- Anonymous participation may be useful, but it must never remove the moderation layer.
- Sensitive, private, spicy, or family-inappropriate material must have an explicit visibility control.
- The MC, DJ, maid of honor, or planner should be able to understand the control surface in minutes.

### 5. Every app leaves something behind

The keepsake is part of the product, not an afterthought. It may be a private archive, interactive URL, printed book, chapbook, framed map, poster, video film, or anniversary delivery. Define it before defining the feature list.

The keepsake should:

- preserve the couple's actual content, not only participation statistics;
- be easy to revisit or share privately;
- have a clear delivery or availability expectation;
- remain useful or emotionally meaningful after the reception;
- avoid promising permanence, scheduled delivery, or media storage unless the operational system can support it.

### 6. The live-night promise must be credible

- The flow needs a clear owner, start time, end time, and fallback behavior.
- A host should never need to improvise the basic operation.
- The app must have a pre-event review path for anything that can appear publicly.
- The display state should remain legible from across the room and recover gracefully if submissions stop.
- The experience should still make sense with partial participation. It must not require every guest to join.

## Choosing the Right Shape

The approved catalog contains four useful experience shapes. New concepts should fit one of them or explain why they do not.

### Room games and reveals

`Live Trivia`, `Who Said It?`, `Unpopular Opinions`, `The Story Chain`, and `The Unprompted Love Letter Machine` create a shared burst of attention. They need a host, a bounded runtime, a strong reveal loop, and a display that can carry the room. The Love Letter Machine is the emotional outlier in this shape: guests submit privately, the couple reads live during speeches, and the register is tender rather than competitive.

### Ambient participation

`Custom Wedding Bingo`, `The Prediction Vault`, `The Guest Advice Oracle`, `Where To Next`, and `The Home Your Room Built` collect small contributions across dinner or the wider reception. They should be glanceable, tolerant of late participation, and never require guests to stay on their phones.

### Place and story exploration

`Venue Scavenger Hunt` and `Relationship Origin Story Exhibit` use the venue or the couple's chronology as the interface. Their job is to create movement and informed conversation, not to maximize submission count.

### Private keepsakes

`Anniversary Time Capsule`, `The Two-Minute Video Guestbook`, and `The First-Look Voice Letter` are deliberately quieter. They can omit the public display when a private future moment is the actual value. Do not force communal spectacle onto an app whose promise is intimacy.

## Approved App Guidelines

### Live "How Well Do You Know Us?" Trivia

- **Job:** Turn the couple's specific history into a short, competitive room event.
- **Best moment:** Dinner or a planned hosted segment.
- **Core input:** Around 15 questions with real answers and funny, plausible wrong answers.
- **Required payoff:** Synchronized play, a visible leaderboard, and a winner or consequence such as a toast.
- **Design guardrail:** Keep the whole game to roughly eight minutes. The host reads the questions; guests should never race ahead in separate flows.
- **Make it personal:** Questions should come from actual dates, proposals, habits, arguments, family lore, and embarrassing details, not basic wedding trivia.
- **Do not:** Turn it into a generic quiz, add so many rounds that dinner becomes a game show, or rely on a leaderboard without a social consequence.

### Venue Scavenger Hunt With Their Love Story

- **Job:** Make the venue part of the couple's story and give guests a reason to explore it.
- **Best moment:** Cocktail hour.
- **Core input:** A sequence of chapters tied to meaningful physical locations.
- **Required payoff:** A final chapter, message, reveal, or completion moment that rewards movement through the venue.
- **Design guardrail:** Each stop must have a real reason to exist there. Keep scans brief and make progress resilient if guests join late or miss a stop.
- **Make it personal:** Use the bar, garden, staircase, first-look spot, or other places that carry actual history. Add photos, voice notes, or short video where they deepen the chapter.
- **Do not:** Hide codes only for the sake of difficulty, create a long phone quest, or make the experience impossible for guests with limited mobility.

### Anniversary Time Capsule

- **Job:** Convert wedding-day affection into a future ritual.
- **Best moment:** Cocktail hour, dinner, or any natural quiet pause.
- **Core input:** Short guest video or written messages assigned to a future anniversary or date.
- **Required payoff:** A trustworthy seal and a clearly explained future delivery or unlock moment.
- **Design guardrail:** Recording must be low-pressure, with a short limit, re-record support, and an easy assisted mode for older guests.
- **Make it personal:** Offer meaningful dates, prompts tied to the couple's future, and a space for the couple to leave messages for themselves.
- **Do not:** Suggest that content is magically secure or guaranteed for decades without a real storage and delivery plan. Do not make guests wait in a recording queue.

### The Prediction Vault

- **Job:** Give the couple and their guests a reason to reconnect on future anniversaries.
- **Best moment:** Cocktail hour or dinner, with an optional light live summary.
- **Core input:** Specific, signed or anonymous predictions grouped by time horizon.
- **Required payoff:** Sealed future batches that can be opened and scored year by year.
- **Design guardrail:** Make prediction entry fast and make the future date visible. The reception display can show aggregate patterns, but never expose a guest's private prediction prematurely.
- **Make it personal:** Ask about the couple's actual unresolved bets: where they will live, what they will still argue about, what they will learn, and which friend will be proven right.
- **Do not:** Present generic fortune-cookie prompts or turn the app into a financial or fertility prediction exercise without the couple explicitly choosing that tone.

### The Couple's Unpopular Opinions Icebreaker

- **Job:** Start conversations between strangers through the couple's real points of view.
- **Best moment:** Cocktail hour.
- **Core input:** A set of opinions with the actual stance of one or both partners.
- **Required payoff:** A live or periodic reveal that shows where the room lands and who holds the opinion.
- **Design guardrail:** Voting should take seconds. Results need to be legible and playful, not a faux scientific poll.
- **Make it personal:** Choose opinions that reveal personality and invite affectionate disagreement: food, habits, travel, media, mornings, hosting, and wedding assumptions.
- **Do not:** Use sensitive political, religious, or divisive material merely to manufacture conflict. Do not require a continuous screen presence throughout cocktail hour.

### Custom Wedding Bingo

- **Job:** Make guests notice and enjoy the unpredictable details of the whole wedding.
- **Best moment:** All day.
- **Core input:** Squares that could only happen at this wedding, with a unique card per guest.
- **Required payoff:** Clear win detection and a visible, celebratory callout without interrupting the actual wedding.
- **Design guardrail:** A square must be observable and unambiguous. Guests should tap once when something happens, then return their attention to the room.
- **Make it personal:** Write squares around known relatives, recurring stories, planned music, speeches, dance-floor behavior, and harmless wedding chaos.
- **Do not:** Make every square an inside joke that excludes most guests, require constant checking, or reward guests for manufacturing events.

### The Guest Advice Oracle

- **Job:** Turn a conventional guest book into useful, revisitable wisdom from the people who know the couple.
- **Best moment:** Dinner and natural pauses across the reception.
- **Core input:** A small set of thoughtful prompts, with optional anonymous responses.
- **Required payoff:** A searchable private advice archive and, where promised, a printed signed and anonymous edition.
- **Design guardrail:** Support longer responses without making the phone interface feel like a form. The public wall should reveal one readable thought at a time, not become a dense feed.
- **Make it personal:** Ask about the couple's actual life, anxieties, traditions, and future, not only "best marriage advice."
- **Do not:** Force every guest to provide profound advice, publish vulnerable material without approval, or claim that digital collection alone improves a standard advice book.

### Where To Next

- **Job:** Turn guests' recommendations into a map the couple can actually use together.
- **Best moment:** Dinner, with a live ambient map.
- **Core input:** Places to visit, eat, live, return to, or one day retire, each with a short reason.
- **Required payoff:** A useful private map plus a designed printed map or poster.
- **Design guardrail:** Keep pinning to one or two places per guest. Make categories and the couple's own starting pins easy to understand.
- **Make it personal:** Tie suggestions to shared travel, hometowns, favorite food, future plans, and the friends who know what the couple actually likes.
- **Do not:** Let the map become a generic travel board, overwhelm guests with map controls, or show precise sensitive locations without consent.

### Who Said It?

- **Job:** Make the couple's real voice the source of a fast, funny, room-wide guessing game.
- **Best moment:** Dinner or a planned hosted segment.
- **Core input:** Carefully selected texts, photos, and spoken lines arranged into a meaningful chronology.
- **Required payoff:** A blurred-sender reveal, family or friend-group scoreboard, and a final "who knows them best" result.
- **Design guardrail:** Use one or two taps per round and keep the full arc near ten minutes. Review every source item and provide a genuinely private option for sensitive rounds.
- **Make it personal:** The sequence should show how the couple's voice changed over time and include context that makes each reveal land.
- **Do not:** Use private messages just because they are shocking, expose guests' identifying information casually, or let scoring overshadow the relationship story.

### The Story Chain

- **Job:** Give the room a shared creative act with enough structure to become funny, tender, and unmistakably theirs.
- **Best moment:** Cocktail hour or dinner.
- **Core input:** One opening sentence and one guest-written sentence per turn.
- **Required payoff:** A readable live story that can be preserved as a web piece or printed chapbook.
- **Design guardrail:** Enforce turn length and cooldowns. A moderator must be able to redirect or remove a line before it becomes part of the public story.
- **Make it personal:** Seed the story with a real place, habit, or near-miss from the couple's history. Parallel wholesome and unhinged paths are acceptable when the audience can understand them.
- **Do not:** Depend on generative writing to fill the room's role, allow one guest to dominate, or confuse chaos with an unreadable wall of text.

### Ask Us Anything

- **Job:** Let the room decide what it genuinely wants to know, then turn that curiosity into a live couple moment.
- **Best moment:** Dinner, closing before dessert.
- **Core input:** Guest questions, optionally anonymous, with room upvoting.
- **Required payoff:** A moderated ranked list and a planned top-question segment at the mic.
- **Design guardrail:** Establish a voting close time, limit the live answer set, and give the couple a clear skip or pass option.
- **Make it personal:** Encourage a useful range from silly to sincere, including questions that illuminate how this couple actually works.
- **Do not:** Promise "nothing is off limits," make the couple answer invasive questions, or treat moderation as an afterthought.

### The Two-Minute Video Guestbook

- **Job:** Preserve guests' faces and voices without the queue and awkwardness of a video booth.
- **Best moment:** All day, from guests' seats or during natural pauses.
- **Core input:** One short video prompt, with optional prompt cards and assisted recording.
- **Required payoff:** A curated highlight film plus individually preserved clips.
- **Design guardrail:** Recording must work without an attendant, offer re-record, show duration clearly, and explain who can view the clips.
- **Make it personal:** Use a prompt that sounds like the couple, and capture the voices of people whose presence matters, especially older or distant relatives.
- **Do not:** Put a live video feed on the main wall, create a booth queue, or optimize for volume at the expense of usable, emotionally honest clips.

### The First-Look Voice Letter

- **Job:** Preserve the voices of the room in a private audio letter the couple listens to later — no video queue, no big-screen presence, no performance pressure.
- **Best moment:** Available across cocktail hour and dinner, with a single soft MC prompt.
- **Core input:** One 15 to 30 second voice memo per guest, answering one of three couple-authored prompts (what you noticed today, what you wish for them, what you remember from before).
- **Required payoff:** A stitched 25 to 40 minute audio letter delivered as a private podcast link the week after the wedding, plus every individual clip archived on its own.
- **Design guardrail:** Recording must work without an attendant, offer re-record, respect a hard length limit, and expose an assisted mode so a family member can hold the phone for older guests. Nothing appears on the wall — the in-room presence is a printed prompt in the program and one gentle MC mention.
- **Make it personal:** Prompts should sound like the couple, not like a form. Encourage guests to name specific memories, not generic well-wishes.
- **Do not:** Add a public feed. Turn this into a video app in disguise. Suggest permanent archival without a real hosting plan. Force a live-night reveal moment onto an experience whose whole value is quiet.

### The Unprompted Love Letter Machine

- **Job:** Turn every guest into a source of specific, on-the-night affection the couple reads together in front of the room.
- **Best moment:** Speeches, or a planned tender segment before dessert.
- **Core input:** One short written message per guest, submitted from their phone.
- **Required payoff:** The couple (or MC) reads approved messages live from the big screen; the room hears grandma, the college roommate, the aunt who never says anything out loud. Ends with a printed or PDF keepsake of every message.
- **Design guardrail:** Submission is dead simple and can be re-edited before send. Every message passes through a moderation queue held by a trusted friend so the couple never sees an unreviewed one live. The reader controls pace — nothing auto-advances.
- **Make it personal:** Prompt language should sound like the couple. Include an optional "who is this from" line so the room can react when a specific voice appears. Seed the queue with a written message from each partner to the other so the display never sits empty.
- **Do not:** Auto-publish anything. Let the queue become a public feed. Use it as an open-mic replacement — this app supports speeches, it does not replace them. Promise permanent hosting of messages without a real storage plan for the keepsake.

### The Home Your Room Built

- **Job:** Turn guests' opinions about the couple's future home into a playful communal illustration and keepsake.
- **Best moment:** Dinner, between courses.
- **Core input:** A few selected home elements and a one-line reason for each.
- **Required payoff:** A home that visibly takes shape on the wall and a polished framed poster afterward.
- **Design guardrail:** Keep choices concrete and visual. Limit each guest's contribution so the composition remains legible and the room can see consensus forming.
- **Make it personal:** Use the couple's actual pets, habits, neighborhoods, objects, rituals, and running jokes. Let the final illustration feel like their imagined home, not an asset library.
- **Do not:** Reduce the idea to a poll of furniture, create an unstructured word cloud, or imply that the result is a real architectural plan.

## Content Brief For Each New Build

Before design or implementation, capture:

1. **The couple:** Who are they, what do their people know, and what detail makes the concept unmistakably theirs?
2. **The moment:** When does this happen, who introduces it, how long does it run, and what is everyone else doing?
3. **The guest action:** What is the one primary action? How does a guest know they are finished?
4. **The room payoff:** What changes on the display, at the table, on the dance floor, or at the mic because guests participated?
5. **The curation model:** Who approves content, what can be hidden, and what happens when participation is low?
6. **The keepsake:** What exactly does the couple receive, when, through which delivery path, and for how long is it available?
7. **The fallback:** What can the MC or planner do if the display, network, media upload, or moderation flow has a problem?
8. **The boundary:** What content, guest data, locations, photos, or recordings should never be shown or retained?

If these questions do not have clear answers, the app is not ready to sell.

## Marketing And Copy Rules

- Lead with the room moment, not the feature list.
- Describe a scene with specific people, timing, and behavior.
- Say what the couple supplies and what Wepho handles.
- State the approximate setup effort honestly.
- Explain the non-app alternative when useful. Wepho should win because it creates a better moment or artifact, not because paper is mocked.
- Use the approved vibe language consistently: Make them laugh, Make them cry, Get them talking, Create a keepsake, Stop the room.
- Use the approved moment language consistently: Arrival, Ceremony, Cocktail Hour, Dinner, Speeches, Dancing, All Day.
- Keep the implicit promise visible: generic tools do not know this couple.
- Never call a concept "interactive" without naming the guest action and the resulting human moment.

## Final Quality Test

An approved Wepho app should pass all of these tests:

- A guest can explain what to do after seeing the QR landing screen for three seconds.
- The guest can complete the core action quickly and put the phone down.
- The room gets a payoff that could not happen through a generic form alone.
- The couple's own history is present in the content, not only in the branding.
- A trusted person can run moderation or hosting without technical support.
- The experience works with partial participation and a mixed-age audience.
- The couple receives a concrete, revisitable keepsake.
- A paper or analog version is acknowledged honestly, and the app's added value is specific.
- The app makes the wedding feel more alive, not more screen-heavy.
