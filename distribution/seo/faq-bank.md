# FAQ Bank — per-app

Source seeds:
- **One-pager objections** (`zz/one-pager.md` §"Key Objections + Answers"): guests won't use it · older guests confused · what if it breaks · is $2,000 worth it · isn't this just Kahoot · do I have to run it.
- **Brainstorm §3 Stage 4 fears** (`distribution/distribution-brainstorm.md`): "will guests actually use it, what if it breaks, what if grandpa hates it."
- **Non-negotiable product rules** (one-pager §"Non-Negotiable Product Rules"): no install · moderation always included · locked to event day · keepsake output.

Every app gets **8–12 Q&A** — a mix of the universal objections adapted to the specific app + 2–4 app-specific questions surfaced by that app's mechanics. Answers stay short (1–3 sentences), token-consistent with brand voice (warm, specific, confident). Feed these into `/apps/[slug]` page FAQ sections **and** the `FAQPage` JSON-LD schema drafted in `distribution/seo/jsonld-snippets.md`.

Ordering per app: highest-friction objections first (participation, tech, price), then mechanical / logistical, then keepsake / after-the-night.

---

## 1. couple-trivia — Live "How Well Do You Know Us?" Trivia

**Q. Will our guests actually play?**
Trivia is the easiest sell on the list. One MC announcement, one QR code, and the leaderboard climbing on the big screen makes non-participation feel like sitting out the game everyone else is watching. Even 30% participation fills the screen.

**Q. What about older guests who don't want to type on a phone?**
The whole game is tap-only — A / B / C / D answers, no typing, no logins. Grandparents at the same table as a teenager tend to do fine because the teen turns their phone sideways and they play together.

**Q. What if the WiFi drops mid-game?**
We stress-test on venue WiFi before the day and keep a mobile hotspot on standby. If a phone briefly loses signal, its answer syncs when it reconnects — the leaderboard doesn't stall waiting on anyone.

**Q. Is this basically Kahoot with your names on it?**
No. Kahoot doesn't know that your first date was at the taco truck on Valencia Street or that she said yes before he finished the sentence. Every question is written from your actual relationship — that's the whole product.

**Q. Is $2,000 worth it for one 8-minute game?**
The game is 8 minutes. The winner giving an unscripted toast, the video reactions from you two lighting up after each reveal, and the private results page you keep are the parts that stay. Compare to $800 in flowers that die by morning.

**Q. Do we have to run this ourselves during the reception?**
No. Your MC reads questions from the mic; we handle the moderation queue and the leaderboard. You show up to your reception; we run the game from the back of the room.

**Q. How many questions can we submit?**
Fifteen is the sweet spot — that's the 8-minute total that keeps energy up. You can send us 20–30 and we help pick the ones with the biggest reveal.

**Q. Can guests play from different tables in teams?**
Yes — we score both per-guest and per-table, so head table vs. college friends becomes a subplot without changing the format.

**Q. What if a guest gets an offensive answer accepted?**
There are no free-text answers in trivia. Every option is pre-written by you two, so nothing can go rogue on screen.

**Q. Do we get anything after the wedding?**
A private results page — every question, every answer, the leaderboard, and the video reactions you recorded. It stays live at your URL forever.

---

## 2. venue-scavenger-hunt — Venue Scavenger Hunt with Their Love Story

**Q. Will guests actually walk around a venue for QR codes?**
Yes — because each chapter is a piece of your story, not a puzzle for its own sake. The "why is this stop here" reveal (bar = first drink, garden = proposal) is what pulls people to the next code.

**Q. What if guests find the QRs out of order?**
Chapters unlock in sequence. Scanning the wrong one just says "you're not there yet" — no one gets spoiled and no one gets lost.

**Q. What about older guests who won't scavenger-hunt?**
The hunt is designed to be optional and ambient — nobody is forced. Older guests get the summary chapter book in their post-wedding email regardless, so they get the story even if they never scanned a code.

**Q. What if a QR code gets ripped down or moved?**
We print backups and place two copies at each stop (one visible, one discreet). If a stop is truly compromised, we push a "skip this one" override remotely and the hunt keeps flowing.

**Q. Is this worth it if our venue is one room?**
It works better with a walkable venue (garden + bar + lawn), but even a single ballroom can hold 4–5 stops. Below that, the Relationship Origin Story Exhibit is a better fit.

**Q. Isn't this what those wedding-app scavenger-hunt templates already do?**
Templates hide letters that spell "MR & MRS SMITH." We hide chapters of your actual love story, one at a time, with a personal reason each is where it is.

**Q. Do we have to hide the codes ourselves?**
No. We deliver printed QR placards for each stop; you or the coordinator tape them up during setup. We can also work with the venue directly.

**Q. Does it work outdoors / in sunlight / with bad phone reception?**
Yes. QR codes work offline; the chapter content is preloaded when a guest scans in the first time. Weak reception at one corner of the garden won't break anything.

**Q. What's the keepsake?**
Every guest gets a "chapters unlocked" summary emailed after the wedding, and you get a hardcover book of all eight chapters with the exact location coordinates printed next to each.

**Q. Is $2,000 worth it for cocktail hour entertainment?**
Cocktail hour is usually the flattest hour of the wedding — 60 minutes of guests standing near the bar. This turns it into an active, story-driven walk with a private thank-you video at the end.

**Q. What if guests don't finish the hunt?**
The last chapter (the private thank-you video from you two) still gets emailed to everyone the day after. Nobody misses the payoff.

---

## 3. anniversary-time-capsule — Anniversary Time Capsule

**Q. Will guests really record a video?**
Yes, when they're prompted at a natural moment (during cocktail hour or between courses) and the interface is a single tap. Even at low participation (30%), 60 videos delivered on your 5th anniversary is a stunning number.

**Q. What if the delivery service is gone in 25 years?**
We contract the delivery pipeline separately and store the videos in redundant cold storage with a fallback to a physical drive we ship to you. The 25-year and 50-year tiers get the paranoid backup plan.

**Q. What if grandpa doesn't want to record?**
There's an audio-only mode and a written mode for anyone camera-shy. Almost nobody sits out when the phrasing is "leave a message they'll open in 10 years" — the pull is universal.

**Q. Is this worth $2,000 when we could just use envelopes?**
Envelopes get lost. This is a scheduled email that will hit your inbox on the exact date, with the exact face and voice of the person who recorded it, even if that person is no longer around.

**Q. What if someone records something inappropriate?**
Every message is reviewed by you (or a designated moderator) before it's marked "delivered." You can also delete or re-schedule any message at any time via your dashboard.

**Q. Do we have to remember to open the capsules on the anniversary?**
No. We schedule the emails and they arrive automatically. You wake up on your 5th anniversary and there's a video from Aunt Rae in your inbox.

**Q. Can guests attach photos too?**
Yes — a still from the wedding, or a selfie from that night. So future-you sees present-them at the age they were tonight.

**Q. Do guests need to download an app to record?**
No. QR → mobile browser → record. Nothing installed, nothing to log into.

**Q. Can we (the couple) record messages to ourselves too?**
Yes. Same interface, same delivery schedule. Couples often record a message to future-them on the same 5-year tier.

**Q. What happens on the delivery date — does the video just appear?**
We email you and the recipient on the date. The video lives on a private page at your URL, playable forever, downloadable if you want.

---

## 4. bucket-list-builder — Guest Bucket List Builder

**Q. Will guests submit real items, or joke ones?**
Both, and both are welcome. The categorized prompts ("skills to learn", "scary things", "nights in") keep entries specific rather than generic, and the upvoting means the best of the joke ones surface without drowning the sincere ones.

**Q. Won't this just be a wall of "have kids" and "travel more"?**
The category prompts and the "attach a personal offer" mechanic ("I'll teach you to sail — Uncle Pete") push guests toward specificity. Generic entries get downvoted; specific ones get boosted.

**Q. What about older guests who won't type on a phone?**
Voice-to-text is one tap. Also, guests can hand their phone to a nearby guest and dictate — this happens a lot at dinner tables.

**Q. Is $2,000 worth a bucket list?**
The list isn't just a list — it's a printed hardcover book delivered two weeks after the wedding, and a living app you two check items off for years. Flowers die by morning; this is a ten-year artifact.

**Q. Isn't this just cards in a jar?**
Cards in a jar are lovely for the sentiment. But you can't upvote a card, you can't watch the list grow on the wall in real time, and you can't get a typeset hardcover book without months of transcription work.

**Q. Do we have to moderate every submission?**
Every entry goes through a one-tap approve/reject before hitting the wall. Your MOH or MC can moderate; most weddings run through ~150 entries in the space of one dinner course.

**Q. What if the display wall isn't in use at our venue?**
It can also run on the DJ's TV or a rented flatscreen we deliver. If there's genuinely no screen, the list still fills a phone gallery and the printed book is still delivered.

**Q. How does the printed book work?**
We typeset the final list, group by category, credit each item to the guest, and deliver a hardcover book two weeks after the wedding. Extra copies are available at cost.

**Q. Can we edit the list after the wedding?**
Yes. You keep dashboard access — add, remove, re-categorize. And you check items off as you complete them, which slowly turns the book into a life log.

**Q. Isn't the wall going to fill up with duplicates?**
The submission form auto-suggests similar existing entries so guests can upvote instead of duplicating. That's why the categorized prompts matter — they cluster related ideas.

---

## 5. conversation-starters — Table-Specific Conversation Starter Cards

**Q. Will guests actually scan a table QR code just to get talking prompts?**
Yes, because the prompts are specific to their table. "You and Marcus both spent time in Antigua" beats "what's your favorite movie" — guests scan once because the first prompt already knows something about them.

**Q. How do you get the 30-second guest profiles?**
We send a one-question form to every guest a month before the wedding, sent from your address. Typical response rate is 60–70%. Guests who don't respond still get generic prompts — the app degrades gracefully.

**Q. What if a guest sees a prompt about them they didn't want shared?**
Every guest reviews their own profile before it goes live. Nothing about a guest appears in a prompt they haven't approved.

**Q. Isn't this just printed icebreaker cards?**
Printed cards can't broker a "surprise me — go talk to this specific stranger at your table" match. And they can't be searchable, so a table of ten strangers stops using them after five minutes.

**Q. What about tables of only close friends who already know each other?**
The prompts adapt — for a table of college friends we lean into "who remembers X," for a mixed table we lean into introductions. Both cases use the same profile data with different prompt logic.

**Q. Do older guests get this?**
Yes. The UI is a single card at a time, tap to see the next one. No swiping, no scrolling, no logins.

**Q. Is $2,000 worth a conversation-starter tool?**
The gap between "I sat next to a stranger for three hours" and "I sat next to a stranger and now I know how they know the couple" is the difference between a good wedding and a great one for that guest. Multiply by 150 guests.

**Q. Do we run this during the reception?**
No. It runs itself. Guests scan the table QR when they sit down and use it at their own pace.

**Q. Is there a keepsake?**
Yes — every guest gets a booklet of "the people you met" with the profiles they were shown, mailed after the wedding. The couple gets an anonymized heat-map of which prompts drove the most conversation.

**Q. What if a table's guest mix changes at the last minute?**
You update the seating chart in your dashboard; prompts re-generate in seconds. We can also adapt on the day if a swap happens at cocktail hour.

---

## 6. prediction-vault — The Prediction Vault

**Q. Will guests actually make predictions instead of just eating dinner?**
Yes — the format is fast (5–6 questions, sliders and multiple choice, no typing). Most guests finish in under three minutes during cocktail hour, and the live histogram on screen ("73% think they'll have kids within 3 years") gives instant payoff.

**Q. Is the live histogram going to embarrass anyone?**
No — it's aggregate only. Individual predictions stay sealed until the anniversary. The histogram shows the room, not the person.

**Q. What if the delivery emails don't fire on our 25th anniversary?**
We use a dedicated scheduled-email service and back it up with a physical delivery mechanism (an annual reminder to you two). See the anniversary-time-capsule FAQ for the paranoid backup plan.

**Q. Isn't this just prediction cards in a jar?**
A jar can't show you a live histogram, can't schedule emails for the next 25 years, and can't score predictions automatically ("73 of your guests got the kids question right; 12 got the city wrong"). Also, jars get lost during moves.

**Q. What about guests who don't want to make predictions?**
They watch the histogram grow with the room and skip submission. Participation of even a third of the room fills a good histogram.

**Q. Do we run this ourselves on our anniversary?**
No. The email arrives with a scoring interface. You tap through each question and see how the room did. Takes five minutes over morning coffee.

**Q. What about the guests — do they find out what they predicted?**
They get a "prediction receipt" texted to them tonight, and an anniversary email if they opted in. They can score their own predictions against reality.

**Q. Is this worth $2,000 for one dinner activity?**
It's not one activity — it's a 25-year drip of anniversary rituals with your people. That's the actual value; the dinner submission is the entry point.

**Q. What if we don't want to publicly show certain questions on the histogram?**
You choose per-question whether the histogram shows live during dinner or stays sealed until the anniversary. Kids question public, income question sealed, up to you.

**Q. Can guests change their prediction after submitting?**
Yes, until the vault seals at the end of dinner. After that, everything is locked.

---

## 7. guest-memory-map — Guest Memory Map

**Q. Will guests take the 30 seconds to pin the map?**
Yes — it's the fastest submission on the list, and the payoff is visible on the wall within seconds. Watching a new pin drop on a different continent is a small dopamine hit that pulls the next person to submit.

**Q. Isn't this just a printed pin map on an easel?**
A physical map is a lovely keepsake but it doesn't pulse when a new pin drops, doesn't show which of your friends were coincidentally in the same city on the day you met, and doesn't animate in front of the whole room.

**Q. What about older guests who don't want to search a map?**
Location auto-detects from the phone (with permission). If not, they type the city and it fills in. If they still can't, a nearby guest usually pins it for them — this is a very handoff-friendly submission.

**Q. What if guests don't want to share their location?**
Everything is city-level, never precise. And it's opt-in — guests who skip just aren't on the map.

**Q. Is $2,000 worth it for a map on a wall?**
The map is a live 3D globe that fills up in front of the room, exports as a large-format print, and reveals coincidences like "your college roommate was in Berlin the night your dad landed." That last one is unbuyable in any other format.

**Q. What if we don't have a screen for the big display?**
We can run it on the DJ's TV or a rented flatscreen. The globe is the whole appeal though, so if there's genuinely no display, another app is probably a better fit.

**Q. Do we have to run this during the reception?**
No. It runs itself. Guests pin as they arrive or during cocktail hour; the map fills through dinner.

**Q. What's the keepsake?**
A high-resolution print of the finished globe with every pin labeled, plus a private page listing every guest with their pin location. The print is delivered mounted, ready to frame.

**Q. Can guests pin multiple milestones?**
Yes — the milestone selector lets guests re-pin for "the day you met," "the day he proposed," "tonight." Same map, three layers.

**Q. Won't the map just be a cluster around our home city?**
Some clusters are the point ("look how many of our people came from home"). But the globe layout means single pins in Tokyo, Berlin, and São Paulo pop against the cluster — the geographic contrast is the reveal.

---

## 8. live-roast-board — The Live Roast Board

**Q. What if someone submits something truly awful?**
Nothing hits the wall without best-man / MC approval. The moderator dashboard is a one-tap approve/reject with an "edit for length" option. Bad submissions never appear.

**Q. Will guests actually submit roasts?**
Yes — especially when they see the first two approved ones land on the wall. The submissions come in waves triggered by big laughs from the room.

**Q. Isn't this just an open mic risk?**
The opposite. It gives the funny friend a channel *without* the open-mic chaos: everything is written, moderated, and delivered by the wall in the couple's own pace, not by a nervous guy at a microphone.

**Q. Do we have to moderate this ourselves during the reception?**
No — the best man or MC handles moderation from their phone. You're on the dance floor. Moderation takes two seconds per submission.

**Q. What about older / conservative guests seeing the wall?**
The wall shows only what's been approved. Moderators calibrate to the room — a Southern Baptist reception filters differently than a Brooklyn one.

**Q. Is $2,000 worth it for a roast?**
It's not just a roast — it's a moderated live wall that also captures every submission (approved and rejected) as a private "roast book" you get after the wedding. That's the keepsake.

**Q. What if nobody submits?**
The MC seeds it with three pre-written ones (co-written with you) to kick off. Submissions almost always follow within minutes.

**Q. Can guests submit anonymously?**
Yes — every submission has a "signed / anonymous" toggle. Most guests sign; a few submit the good ones anonymously.

**Q. Do we get to see everything that was rejected?**
Yes. A separate private "cutting room floor" section shows every rejected submission for you two to enjoy privately (or delete).

**Q. What's the crowd voting mechanic?**
Guests can heart approved roasts. The top-voted one at the end of the night gets a callout on the wall — the "roast of the night."

**Q. Won't this drag on and derail dinner?**
It runs in a bounded window (usually 20 minutes during dessert), then closes. The wall goes back to the main display and the roast book compiles after.

---

## 9. unpopular-opinions — The Couple's Unpopular Opinions Icebreaker

**Q. What are "unpopular opinions" in this context?**
Statements you two actually hold, spanning silly to serious ("hot dogs are sandwiches", "wedding registries are gauche"). Guests slide their agreement anonymously; the histogram shows the room in real time.

**Q. Will guests engage with this?**
Yes — anonymous, opinion-based, one slider per screen. The engagement floor is very low. And the moment a controversial opinion lands ("open marriages should be normalized"), the room lights up.

**Q. Isn't this just conversation cards?**
Cards don't animate a live histogram in front of the room. That histogram — watching the entire wedding disagree with your dad in real time — is the whole product.

**Q. What if an opinion feels risky to display live?**
You review every opinion before dinner. Anything too spicy stays off the reception screen but can be included in the post-wedding keepsake.

**Q. What about older / conservative guests?**
The opinions are yours to write, so the risk is entirely on you two. Most couples calibrate a healthy mix of light and pointed.

**Q. Is $2,000 worth it?**
The 20 minutes of the room laughing / gasping at real-time opinion tallies is what you're paying for, plus the keepsake histogram poster showing how your people actually split on every question.

**Q. Do we run this ourselves?**
No. It runs on a timer during dinner (one opinion every 90 seconds), and your MC can pause or advance from the mic.

**Q. Can guests see how they specifically voted vs. the room?**
They see their own position on each slider vs. the average. Nobody sees anyone else's individual vote.

**Q. What's the keepsake?**
A printed poster with every opinion and the room's histogram, plus a private page you can share with guests who want to see the full breakdown.

**Q. What about guests who don't want to answer?**
Slider defaults to neutral; skipping is fine. Even at 40% participation the histogram is meaningful.

---

## 10. first-dance-ballot — The First Dance Reveal Ballot

**Q. So the guests pick our first dance song?**
Yes — from a shortlist you and your partner curate (typically 4–5 songs). The DJ plays the winner live; you find out at the same moment as everyone else.

**Q. What if we hate the song the room picks?**
Every song on the shortlist is one you *both* said you'd be happy to dance to. There's no losing option — the surprise is which one, not whether.

**Q. Will guests actually vote?**
Yes — it's a one-tap ballot open during cocktail hour. Voting typically hits 70–80% because the stakes ("we pick their song") are irresistible.

**Q. Isn't this just a Spotify poll?**
A poll doesn't reveal the winner live in front of the whole room, doesn't have a countdown, and doesn't give you the vote breakdown as a keepsake. The reveal is the product.

**Q. What if our DJ doesn't want to work with this?**
We coordinate with the DJ directly. All they need is the winning song five minutes before the first dance — same as any set list change.

**Q. What about older guests?**
One tap, big song titles, no login. Grandparents often love voting because the stakes are so clear.

**Q. Is $2,000 worth it for a song vote?**
It's not the vote — it's the walk-to-the-floor moment. You've been at every wedding where the couple walks to a pre-known song. This one is a shared reveal for 150 people.

**Q. What if we want to add a wildcard song?**
Yes — you can seed a hidden "if this hits 5% write-in votes, it wins" wildcard. Rarely gets triggered but the option is there.

**Q. Do we have to run this during the reception?**
No. Voting closes automatically 15 minutes before the first dance. The DJ gets a push notification with the winner.

**Q. What's the keepsake?**
A vote breakdown by table (or by "how they know you") and a private page with every ballot cast. Fun to look back on years later.

**Q. Can we do this for a second dance / dad dance / anniversary dance too?**
Yes — the ballot format works for any "the room picks the song" moment.

---

## 11. wedding-bingo — Custom Wedding Bingo

**Q. Isn't wedding bingo already a thing?**
The paper version is. But the squares on a paper card are generic ("someone crying"). Ours are specific to your wedding ("the groom's dad gives the third toast of the night", "the flower girl steals a canapé") — that's the whole difference.

**Q. Do guests really pay attention long enough to fill a card?**
Yes — because the squares reward *attention to your wedding specifically*. Bingo forces guests to watch the room instead of their phone.

**Q. What about older guests?**
The card is one screen, tap to mark. No typing, no scrolling. Easy for anyone who can play any card game.

**Q. Is $2,000 worth it for a party game?**
Bingo runs the whole night as ambient entertainment, generates a "first to bingo" moment that pulls the room's attention, and produces a keepsake card showing what actually happened. It's not one moment; it's a 5-hour thread.

**Q. What's the "first to bingo" moment?**
When a guest hits five in a row they tap "BINGO" — the wall announces the winner by name and table. Small prize at the bar. Room cheers.

**Q. Do we have to run this during the reception?**
No — it runs itself. Guests pull up their card whenever they want.

**Q. What if a square happens and nobody notices?**
Guests self-verify by tapping the square when they see it. There's an "verify with the wall" option for contested squares, but 99% of squares are self-scored honor system.

**Q. What if we don't know 25 specific things that'll happen at our wedding?**
We work with you to build the card — half from your relationships (who will cry first, whose speech will run over), half from the venue and format. The card ends up sounding like an inside joke.

**Q. What's the keepsake?**
A private page showing which squares got marked and when. Also the winning card, framed if you want.

**Q. Can guests get different cards?**
Yes — every guest's card has the same 25 squares in a different arrangement. Same event, different bingo path.

---

## 12. advice-oracle — The Guest Advice Oracle

**Q. Won't we just get 100 pieces of generic advice?**
The prompts steer toward specificity ("what should they do the first Sunday of every month", "the one hard conversation they should have before year 3"). Generic advice is filtered out at moderation.

**Q. Isn't this just an advice card box?**
An advice box lets you read the cards once. This lets you get an anniversary "here's what your Uncle Pete told you five years ago" surfaced automatically.

**Q. What about older guests?**
Voice-to-text or written, either works. Older guests often *love* this one — advice is the format they most want to give.

**Q. Is $2,000 worth it?**
The pieces of advice run on the wall during dinner as an ambient thread, get compiled into a keepsake book, and re-surface on anniversaries. It's a decade-long artifact from one dinner submission.

**Q. What if someone gives bad advice?**
Every submission is moderated before it hits the wall. Bad advice can be kept for you privately and never displayed.

**Q. Do we have to moderate live?**
Yes, someone does — usually a designated friend, MOH, or MC. Two seconds per approval. Guests aren't held up because the wall runs on a small delay.

**Q. Can guests give advice anonymously?**
Yes — signed or anonymous per submission. Most sign because they want you to know.

**Q. What's the keepsake?**
A printed and bound "advice book" mailed two weeks after the wedding, plus scheduled anniversary re-surfacing of specific advice.

**Q. Won't the wall get boring if it's just text?**
Design-wise the wall alternates advice with photos, big-type quotes, and negative space. It's not a static feed.

**Q. Can we filter advice by topic (parenting, money, communication)?**
Yes — guests select a topic when they submit, and the book is organized by topic.

---

## 13. relationship-exhibit — The Relationship Origin Story Exhibit

**Q. What actually happens with this one?**
The venue gets an "exhibit" — 4–6 zones, each a chapter of your story. Guests walk through with their phone as an audio guide, hearing you two narrate each chapter in your own voices.

**Q. Isn't this just a photo wall?**
A photo wall is passive. This is a self-paced walk-through where guests hear the actual voice of the bride telling the story of the fight in Lisbon, standing in front of the photo from that trip.

**Q. Will guests actually walk through it?**
Yes — especially during cocktail hour, when everyone is looking for something to do. The "audio guide" framing is universal enough that guests know exactly what to do.

**Q. What about older guests?**
It's the most physical / least-app-heavy experience on our list — walking, looking, listening. If they don't want the audio, the printed panels still tell the story.

**Q. Do we need a big venue for this?**
It scales — six zones for a big venue, three for a small one. Below three zones, the Venue Scavenger Hunt is a better fit for the walking format.

**Q. Is $2,000 worth it?**
You're paying for the museum-caliber design treatment of your own story, an artifact that gets photographed and shared for years. The audio narration alone becomes a keepsake podcast episode.

**Q. Do we have to run this during the reception?**
No — it runs itself. Guests scan a QR at the entrance and self-pace.

**Q. What's the keepsake?**
A printed "exhibit catalog" (like a museum booklet) with every panel, mailed to every guest. And the audio guide becomes a downloadable episode you can share with anyone who wasn't there.

**Q. What if we're not good at narrating?**
We coach you through recording sessions before the wedding — 5–8 minutes of raw audio, edited by us. Most couples surprise themselves.

**Q. Can guests contribute to the exhibit?**
Yes — the final zone is a "guest wall" where guests submit their own moment of the couple, which gets added to the exhibit book and available to browse next to the printed panels.

---

## 14. where-next-map — Where To Next

**Q. So guests suggest where we should honeymoon / travel next?**
Yes. They pin a spot on a globe with one line about why. The couple picks (or doesn't) from the suggestions; the room sees the map fill in real time.

**Q. Will guests engage?**
Yes — pinning a map is a 20-second submission with a visible payoff (their pin drops on the screen). Participation is usually 60%+.

**Q. Isn't this just Pinterest?**
Pinterest is anonymous strangers' opinions. This is your people saying "you should go to my hometown in Nova Scotia because I want you to eat at my mom's restaurant." Different product.

**Q. What about older guests?**
One tap on a map, dictate one sentence. Easier than most submissions on our list.

**Q. Is $2,000 worth it?**
You get a curated map of your favorite people's favorite places on earth, ranked by their emotional investment. That map goes with you for the next decade of trips.

**Q. Do we have to run this?**
No. Runs itself. Pins accumulate through the night on the reception screen.

**Q. What if someone pins the same place?**
Overlapping pins cluster and show all the associated notes when tapped. The "why" is the differentiator, not the place.

**Q. What's the keepsake?**
A printed map with every pin labeled, plus a private page you use to plan trips against. Guests get an email when you visit their pin ("Uncle Pete, we finally made it to your hometown").

**Q. Can guests attach a photo of themselves at the pinned place?**
Yes — most do. The map ends up double-purposed as a photo mosaic of your people at their favorite places.

**Q. Can guests pin more than one spot?**
Up to 3 per guest. Keeps the map dense without any one guest dominating.

---

## 15. collaborative-soundtrack — The Collaborative Soundtrack

**Q. Doesn't this just replace the DJ?**
No — the DJ picks from the top-hearted requests from the room. The DJ still curates, but they curate from the room's real-time signal instead of guessing.

**Q. What about the "guests will crash the wedding with terrible songs" fear?**
The DJ has final say. And every song is moderated for genre fit before it hits the queue. Nothing plays without being cleared.

**Q. Will guests actually vote on songs?**
Yes — it's the most-used app format on the list because the reward (dancing to your own request) is immediate.

**Q. What about older guests who don't know Spotify?**
The interface is "search song / artist" (voice or type), tap heart. No account needed.

**Q. Isn't this just a DJ request slip?**
A slip goes to one person. This surfaces the room's collective signal in real time — the DJ can see that 40 people want a specific decade and pivot the set accordingly.

**Q. Is $2,000 worth it?**
The dance floor gets more energy because guests are dancing to songs they voted for. And you get a "who requested what" keepsake — a private playlist tagged by guest for every song played.

**Q. Do we have to run this?**
No. Guests vote through the night; the DJ works from the live queue. No involvement from you two required.

**Q. What if the DJ refuses to work with this?**
We work with your DJ ahead of time and can supply a rider that explains the setup. Most professional DJs actually love it — it removes ambiguity about what the room wants.

**Q. Can we pre-lock the first dance, parent dances, etc.?**
Yes. Those slots are locked and never subject to the vote. The soundtrack app runs from the second the floor opens to the end of the night.

**Q. What's the keepsake?**
A private "the night, by song" page — every song played, who requested it, how many hearts it got. Doubles as a shareable playlist.

---

## 16. love-letter-machine — The Unprompted Love Letter Machine

**Q. What is this, exactly?**
A guest types a short message to one of you two ("To: Simone — thank you for being the reason our friend finally slowed down"). Every letter goes through you for approval, then appears on the big screen, one at a time, all night.

**Q. Will guests actually write love letters?**
Yes — because the prompt is small ("one line, to one of them"), the moderation gives them cover, and seeing others' letters on the wall pulls them to submit their own.

**Q. What about older guests?**
Voice-to-text or a friend types for them. But older guests are actually the highest-participation demographic on this one — they write the letters people quote at the end of the night.

**Q. Isn't this a guest book?**
A guest book is a physical book that gets closed at 11pm and stored in a closet. This is a live stream of letters on the screen, appearing one at a time, that you read across the whole reception.

**Q. What if someone writes something inappropriate?**
Every letter is approved by you (or a designated friend) before it hits the screen. Rejection is invisible to the guest.

**Q. Is $2,000 worth it?**
The mid-reception moment where the whole room quiets to read a letter from grandma is the reason people spend on Wepho. This is the flagship demo for a reason.

**Q. Do we have to run this?**
The moderator does. Two seconds per approval, and moderation can be one designated friend (not the couple).

**Q. Is this the same as the Love Letter Machine demo on the homepage?**
Yes — the homepage demo lets you try it. Real weddings run the same core interaction at scale.

**Q. What's the keepsake?**
A private page with every letter, plus a printed hardcover book of all approved letters delivered after the wedding. Grandma's letter, in her words, forever.

**Q. Can letters be anonymous?**
Yes — signed or anonymous, guest's choice per letter.

**Q. What if we get too many letters to display?**
The wall rotates through them. Every letter is preserved in the keepsake; not every one shows on the screen.

---

## 17. emotion-pulse — Wedding Day Emotion Pulse

**Q. What does "emotion pulse" mean, mechanically?**
Guests tap one of six emotion buttons ("moved", "laughing", "buzzing", "nostalgic", "restless", "in awe") whenever they feel like it. The room averages every minute. The result is a graph of the wedding's emotional arc.

**Q. Will guests really tap emotions?**
Yes — the tap is one screen, no login, and the graph on the wall pulses with the room's signal. It's a strange and pleasing form of participation.

**Q. Isn't this just a novelty?**
The graph is the artifact. You get to see the exact minute the room emotionally peaked — often during the third toast, sometimes during a dance nobody expected. That data is unbuyable elsewhere.

**Q. What about older guests?**
Six big buttons, tap once. As accessible as an emoji reaction.

**Q. Is $2,000 worth it?**
The keepsake — a printed graph of your reception's emotional arc, minute by minute, with annotations — is the reason. Framed and hung, it's a piece of art.

**Q. Do we have to run this?**
No. It runs itself all night.

**Q. Is anything anonymous?**
Everything. No individual pulses are traceable to a guest.

**Q. What if guests forget to tap?**
Fine — even 20% participation makes a clean signal. The graph doesn't need every guest to be meaningful.

**Q. Can we see the graph in real time during the reception?**
The wall can show it live (subtle) or hide it until the after-party for the reveal. Your choice.

**Q. What's the keepsake?**
A large-format printed graph with annotations from the timeline (toasts, dances, cake) mapped to the pulse peaks. Also downloadable as a shareable image.

---

## 18. secret-relay — Table-to-Table Secret Relay

**Q. So tables pass anonymous secrets to other tables?**
Yes — each table submits a short prompt or confession, which routes to another table who has to guess who wrote it. The wall tracks the relay chain live.

**Q. Won't this get weird / gossipy fast?**
Every relay is moderated before it goes to the next table. Off-limit topics (health, exes, arguments) are filtered at the prompt level.

**Q. Will tables engage?**
Yes — the format has stakes ("we have to guess who this is"). Peer pressure at the table drives participation.

**Q. Isn't this just a party game?**
It's a party game structured for a wedding — where every table only knows a fraction of the room, so the guessing game reveals connections nobody knew about.

**Q. What about older guests?**
The MC / table host on each table drives the interaction. Older guests participate socially without needing the app.

**Q. Is $2,000 worth it?**
The keepsake — an anonymized book of every secret shared and every guess made — is a specific artifact you literally cannot make any other way.

**Q. Do we run this?**
No. The MC seeds the first relay; guests keep it moving. Moderation is one designated friend on a phone.

**Q. What if a table doesn't play?**
The relay routes around them. No table is a bottleneck.

**Q. What's the keepsake?**
A printed book of every prompt and every guess, with the reveal of who submitted what, delivered after the wedding.

**Q. Can guests opt out of the relay?**
Yes. Anyone can decline to participate; the table still plays without them.

---

## 19. cocktail-quiz — The Personalized Cocktail Quiz

**Q. What does this do, exactly?**
Guests answer 4–6 personality questions, and the bar serves them a cocktail matched to their answers — with a note from you two about why that drink fits them.

**Q. Will the bar go along with this?**
Yes — we coordinate the drink list with your bar in advance. Usually 5–6 pre-approved cocktails covering the answer combinations. The bar sees the guest's match on their tablet.

**Q. Will guests actually take the quiz?**
Yes — it's fun, it takes 90 seconds, and there's a drink at the end. Very high participation format.

**Q. What about older guests / non-drinkers?**
Full non-alcoholic version with matched mocktails. Older guests love the "here's why this drink is for you" note from the couple.

**Q. Isn't this just a signature cocktail?**
A signature cocktail is one drink for everyone. This is 5–6 drinks matched to who a guest actually is, with a personal note. Different scale of thoughtfulness.

**Q. Is $2,000 worth it?**
The bar becomes a personalized moment for every guest, plus a "cocktail top 5" keepsake showing which drinks the room actually gravitated toward. Doubles as an anniversary-drink reveal.

**Q. Do we have to run this?**
No. Guests self-serve the quiz at the bar; the bartender pulls the match on their tablet.

**Q. What if a guest hates their match?**
There's a "give me a different one" button. The point is the note, not the algorithm.

**Q. What's the keepsake?**
A private "bar top 5" page ranked by the room, plus every guest's individual match with the personalized note.

**Q. Do we have to buy a special POS system for the bar?**
No. We supply a tablet or the bar uses their phone. Zero infrastructure required from the venue.

---

## 20. parallel-universe — The Parallel Universe Game

**Q. What does this game do?**
Guests vote on "what would your life look like if…" scenarios about you two (if she'd taken the Berlin job, if he'd stayed with his college girlfriend). The wall shows the room's picks in real time.

**Q. Isn't this weirdly dark for a wedding?**
It's played as a comedy — the scenarios are absurd more often than serious. Done right, it's a celebration of "of all the paths, you two got here."

**Q. Will guests engage with hypotheticals about our lives?**
Yes — the questions are so specific to your relationship that guests want to weigh in. It plays like collective fan fiction.

**Q. What about older / conservative guests?**
The scenarios you write are up to you — a lighter mix works for a wider audience. Grandparents typically love giving their opinion on these.

**Q. Isn't this just trivia in a different shirt?**
Trivia has right answers. This is opinions on hypotheticals with no right answer — a fundamentally different mechanic.

**Q. Is $2,000 worth it?**
You get 20 minutes of the room laughing at collective fan fiction about your relationship, plus a keepsake showing what the room thought would have happened in every parallel life.

**Q. Do we run this?**
No. Runs on a timer or under MC control from the mic.

**Q. What's the keepsake?**
A printed "parallel lives" booklet showing the room's vote for each scenario, with the actual outcome (the one where you two met) as the closing chapter.

**Q. What if a scenario is too personal?**
You write every scenario. Nothing goes live without your approval.

**Q. Do guests see how they specifically voted?**
Yes — each guest sees their picks vs. the room. Aggregate view for the wall; individual view for the guest.

---

## 21. who-said-it — Who Said It?

**Q. What is this game?**
Guests see 20 real quotes / texts / photos and guess which one of you two said or sent each. Live tally on the wall. Bonus layers reveal the sender after each round.

**Q. Isn't this just trivia?**
Same category, different mechanic. Trivia is questions with answers. Who Said It is *content* (real screenshots, real texts, real quotes) with a binary guess. The material is the star.

**Q. Will guests engage?**
Very high — the format has a built-in social hook ("I *knew* that was Simone"). The room votes together and reacts to the reveal.

**Q. What about older guests?**
Two big buttons per screen. Easiest UX on the list.

**Q. Are we going to be embarrassed by our own text messages?**
You curate every quote and screenshot. Nothing is submitted by guests, and nothing appears without your approval. Embarrassment is a controlled variable.

**Q. Is $2,000 worth it for a guessing game?**
The 15-minute Who Said It round becomes the most-quoted moment of the wedding, and the keepsake ("here's every quote we used, with the sender revealed") is a unique record of your voice as a couple.

**Q. Do we run this?**
Your MC hosts from the mic; we handle the wall and the tally.

**Q. Can we skip photos or quotes we're not comfortable with?**
Yes — anytime during setup, including the day of.

**Q. Isn't the Who Said It demo on the homepage the same thing?**
Yes — the homepage demo lets you try the mechanic. Real weddings run a full 20-round version with more layers (text, photo, voice memo).

**Q. What's the keepsake?**
A private page with every quote / photo used, the reveal, and the room's guess distribution. Also a scoreboard by guest so people can see how well they know you.

---

## 22. story-chain — The Story Chain

**Q. What is a story chain?**
Guests build a collaborative story about you two, one line at a time. Each guest adds a sentence; the wall shows the story growing in real time.

**Q. Won't this just be chaos?**
Every submission is moderated. Chaos is the failure mode of an unmoderated chain — ours is curated by a designated friend for length and continuity.

**Q. Will guests participate?**
Yes — a one-line submission is the lowest-friction ask on the list. Adding a sentence to a growing story is more inviting than starting one from scratch.

**Q. Isn't this just a group text?**
A group text has no shape. The moderator here shapes the story into chapters, and it becomes a coherent narrative by the end of the night.

**Q. Is $2,000 worth it?**
You get a moderated, coherent, printed story of your relationship co-written by your closest 150 people. Delivered as a hardcover. That's the artifact.

**Q. Do we have to moderate this?**
A designated friend moderates. Two seconds per submission. The chain doesn't stall.

**Q. What about older guests?**
Voice-to-text works, or a friend types for them. Older guests often submit the best lines.

**Q. What's the keepsake?**
A printed hardcover story with every line credited to the guest who wrote it.

**Q. What if two guests submit contradictory sentences?**
The moderator picks the one that fits and passes the other into the "outtakes" section of the book.

**Q. Can we start the chain with a prompt?**
Yes. You seed the opening line ("It started with a taco truck on Valencia Street…") and guests build from there.

---

## 23. ask-us-anything — Ask Us Anything

**Q. What is this?**
Guests submit questions to you two throughout the night. You answer live during a dedicated 15-minute AMA segment, or in written form on the wall.

**Q. Will guests submit questions?**
Yes — especially about how you two met, your future, and stories they've heard secondhand. The AMA format is universally understood.

**Q. Isn't this just Q&A?**
Structurally, yes. The value is that every guest gets to ask the thing they've been wondering about you two, without needing to grab you personally.

**Q. What about inappropriate questions?**
Every question is moderated. You pick which to answer live and which to skip.

**Q. Is $2,000 worth it?**
The AMA segment is a wedding moment nobody else does, and the answers you give become a keepsake record of your voice at this specific moment in your relationship.

**Q. Do we have to run this?**
The MC hosts; you two answer. Moderation is one friend on a phone.

**Q. What about older guests?**
They love asking questions in this format. Written submission or voice-to-text, either works.

**Q. What's the keepsake?**
A printed booklet of every question asked and every answer given, plus the private full list of unanswered questions if you want to answer them later.

**Q. Can we prep answers in advance?**
Yes — many couples pre-seed a few questions to warm the room up.

**Q. What if we get too many questions?**
The moderator surfaces the best ones. Every question is preserved in the keepsake regardless of what got answered live.

---

## 24. video-guestbook — The Two-Minute Video Guestbook

**Q. Isn't this just a video booth?**
A video booth requires a physical station and someone running it. This is any guest, on their own phone, at any moment, recording up to two minutes.

**Q. Will guests actually record?**
Yes — the two-minute cap and the prompt ("what do you want to tell them in ten years?") gives structure. Participation typically hits 50%+.

**Q. What about camera-shy guests?**
Audio-only mode. Written mode. Or a friend records with them on-screen. Zero pressure.

**Q. What if grandma doesn't know how to record on her phone?**
The scan-to-record flow is one tap. Guests-helping-guests handles the rest.

**Q. Isn't this just Instagram Stories?**
Instagram Stories vanish. This is a permanent, edited, structured video book delivered as one film after the wedding.

**Q. Is $2,000 worth it?**
The finished piece — an edited compilation of your people's video messages, delivered as one 30-minute film — is a documentary-grade artifact.

**Q. Do we have to run this?**
No. Runs itself all night.

**Q. What about privacy — where do the videos live?**
On a private URL only you two access. Guests can't see each other's videos.

**Q. What's the keepsake?**
An edited compilation film of all messages (delivered ~3 weeks after the wedding) plus the raw individual videos on your private page forever.

**Q. Can we ask specific questions?**
Yes — the prompt is customizable ("what should we name our first kid", "what's the one piece of advice you'd give us").

---

## 25. home-the-room-built — The Home Your Room Built

**Q. What is this, exactly?**
Guests answer questions about the home you two will eventually live in ("what room matters most", "what's in the kitchen", "what's on the walls"). Their answers build a live illustrated home on the wall.

**Q. Isn't this just cards in a box?**
Cards can't render your guests' collective answers as an illustrated home in real time. The rendering is the payoff.

**Q. Will guests engage?**
Yes — it's a creative, low-stakes, imagination-based submission with a beautiful reveal. Very high participation.

**Q. What about older guests?**
Multiple choice with images. No typing required.

**Q. Is $2,000 worth it?**
You get a printed illustration of the home your people imagined for you, plus the aggregated answers as a keepsake book. Both are things you literally cannot buy elsewhere.

**Q. Do we run this?**
No. Runs itself; the illustration builds through dinner.

**Q. Is the illustration hand-drawn or generated?**
It's generated from a hand-drawn illustration library we commission per wedding. Your home's style (cottage, modernist, farmhouse) is picked in advance and rendered from a set of hundreds of drawn assets.

**Q. Can we customize the questions?**
Yes — the base set is 12 questions but you can swap or add up to 4 more.

**Q. What's the keepsake?**
A large-format print of the finished illustration, framed and shipped. Plus a private page with every guest's contributions labeled.

**Q. Won't the answers just contradict each other?**
The rendering handles blending — the most-common answers dominate, minority answers appear as small details. Every guest's answer shows up somewhere.

---

## Universal FAQ set (also embed on `/apps` and `/`)

These aren't per-app; they apply to Wepho as a whole and should be included on `/apps` and `/` (see `jsonld-snippets.md` for the FAQPage schema variant to use).

**Q. Do our guests have to download anything?**
No. Every Wepho app is browser-based. Guests scan a QR code and everything happens in their phone's browser.

**Q. What if it breaks during the wedding?**
We stress-test on your actual venue WiFi before the day, we deploy the app ourselves, and we stay reachable during your reception if anything comes up.

**Q. How much does a Wepho app cost?**
Around $2,000. For context: flowers cost $800 and die by morning; a photographer costs $3,500 and guests don't see the photos for six weeks. Wepho is $2,000 and every guest participates.

**Q. Is this basically Kahoot with a wedding theme?**
No. Kahoot doesn't know your story. Every Wepho app is custom-built for one couple, one night — the content, the mechanics, the moderation rules, the keepsake.

**Q. What if our guests are older / less tech-comfortable?**
Every Wepho app is designed grandparent-first. No downloads, no logins, big buttons, voice input where relevant. Most older guests are our highest-engagement demographic.

**Q. Do we have to run the app during our own reception?**
No. Your MC or a designated friend handles moderation (usually two seconds per decision). You're on the dance floor.

**Q. How far in advance do we need to book?**
Minimum 8 weeks for a straightforward build; 12+ weeks for the more custom apps (Relationship Exhibit, Home Your Room Built).

**Q. Can we mix multiple apps in one wedding?**
Yes — most weddings run 2–3 apps across different moments (cocktail hour + dinner + dancing). Bundle pricing available for 2+ apps.

**Q. What happens to our data after the wedding?**
Guest submissions live on a private page you access forever. Aggregate data (histograms, leaderboards, keepsake pages) is yours; individual guest data is deleted after 12 months unless you export it.

**Q. Can we see a real wedding's app before booking?**
Yes — we have footage from prior weddings we can share on a discovery call (subject to that couple's release). Homepage demos let you try two apps end-to-end without a call.

---

*End of FAQ bank. Update per app when new objections surface on discovery calls, in Reddit threads (`distribution/forums/r-weddingplanning.md`), or in post-wedding debriefs.*
