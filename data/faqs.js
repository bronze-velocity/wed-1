export const universalFaqs = [
  {
    q: 'Do our guests have to download anything?',
    a: "No. Every Wepho app is browser-based. Guests scan a QR code and everything happens in their phone's browser.",
  },
  {
    q: 'What if it breaks during the wedding?',
    a: 'We stress-test on your actual venue WiFi before the day, we deploy the app ourselves, and we stay reachable during your reception if anything comes up.',
  },
  {
    q: 'How much does a Wepho app cost?',
    a: "Around $2,000. For context: flowers cost $800 and die by morning; a photographer costs $3,500 and guests don't see the photos for six weeks. Wepho is $2,000 and every guest participates.",
  },
  {
    q: 'Is this basically Kahoot with a wedding theme?',
    a: "No. Kahoot doesn't know your story. Every Wepho app is custom-built for one couple, one night — the content, the mechanics, the moderation rules, the keepsake.",
  },
  {
    q: 'What if our guests are older / less tech-comfortable?',
    a: 'Every Wepho app is designed grandparent-first. No downloads, no logins, big buttons, voice input where relevant. Most older guests are our highest-engagement demographic.',
  },
  {
    q: 'Do we have to run the app during our own reception?',
    a: "No. Your MC or a designated friend handles moderation (usually two seconds per decision). You're on the dance floor.",
  },
  {
    q: 'How far in advance do we need to book?',
    a: 'Minimum 8 weeks for a straightforward build; 12+ weeks for the more custom apps (Relationship Exhibit, Home Your Room Built).',
  },
  {
    q: 'Can we mix multiple apps in one wedding?',
    a: 'Yes — most weddings run 2–3 apps across different moments (cocktail hour + dinner + dancing). Bundle pricing available for 2+ apps.',
  },
  {
    q: 'What happens to our data after the wedding?',
    a: 'Guest submissions live on a private page you access forever. Aggregate data (histograms, leaderboards, keepsake pages) is yours; individual guest data is deleted after 12 months unless you export it.',
  },
  {
    q: 'Can we see a real wedding’s app before booking?',
    a: "Yes — we have footage from prior weddings we can share on a discovery call (subject to that couple's release). Homepage demos let you try two apps end-to-end without a call.",
  },
]

export const faqsBySlug = {
  'couple-trivia': [
    {
      q: 'Will our guests actually play?',
      a: 'Trivia is the easiest sell on the list. One MC announcement, one QR code, and the leaderboard climbing on the big screen makes non-participation feel like sitting out the game everyone else is watching. Even 30% participation fills the screen.',
    },
    {
      q: "What about older guests who don't want to type on a phone?",
      a: 'The whole game is tap-only — A / B / C / D answers, no typing, no logins. Grandparents at the same table as a teenager tend to do fine because the teen turns their phone sideways and they play together.',
    },
    {
      q: 'What if the WiFi drops mid-game?',
      a: "We stress-test on venue WiFi before the day and keep a mobile hotspot on standby. If a phone briefly loses signal, its answer syncs when it reconnects — the leaderboard doesn't stall waiting on anyone.",
    },
    {
      q: 'Is this basically Kahoot with your names on it?',
      a: "No. Kahoot doesn't know that your first date was at the taco truck on Valencia Street or that she said yes before he finished the sentence. Every question is written from your actual relationship — that's the whole product.",
    },
    {
      q: 'Is $2,000 worth it for one 8-minute game?',
      a: 'The game is 8 minutes. The winner giving an unscripted toast, the video reactions from you two lighting up after each reveal, and the private results page you keep are the parts that stay. Compare to $800 in flowers that die by morning.',
    },
    {
      q: 'Do we have to run this ourselves during the reception?',
      a: 'No. Your MC reads questions from the mic; we handle the moderation queue and the leaderboard. You show up to your reception; we run the game from the back of the room.',
    },
    {
      q: 'How many questions can we submit?',
      a: "Fifteen is the sweet spot — that's the 8-minute total that keeps energy up. You can send us 20–30 and we help pick the ones with the biggest reveal.",
    },
    {
      q: 'Can guests play from different tables in teams?',
      a: 'Yes — we score both per-guest and per-table, so head table vs. college friends becomes a subplot without changing the format.',
    },
    {
      q: 'What if a guest gets an offensive answer accepted?',
      a: 'There are no free-text answers in trivia. Every option is pre-written by you two, so nothing can go rogue on screen.',
    },
    {
      q: 'Do we get anything after the wedding?',
      a: 'A private results page — every question, every answer, the leaderboard, and the video reactions you recorded. It stays live at your URL forever.',
    },
  ],

  'venue-scavenger-hunt': [
    {
      q: 'Will guests actually walk around a venue for QR codes?',
      a: 'Yes — because each chapter is a piece of your story, not a puzzle for its own sake. The "why is this stop here" reveal (bar = first drink, garden = proposal) is what pulls people to the next code.',
    },
    {
      q: 'What if guests find the QRs out of order?',
      a: 'Chapters unlock in sequence. Scanning the wrong one just says "you’re not there yet" — no one gets spoiled and no one gets lost.',
    },
    {
      q: "What about older guests who won't scavenger-hunt?",
      a: 'The hunt is designed to be optional and ambient — nobody is forced. Older guests get the summary chapter book in their post-wedding email regardless, so they get the story even if they never scanned a code.',
    },
    {
      q: 'What if a QR code gets ripped down or moved?',
      a: 'We print backups and place two copies at each stop (one visible, one discreet). If a stop is truly compromised, we push a "skip this one" override remotely and the hunt keeps flowing.',
    },
    {
      q: 'Is this worth it if our venue is one room?',
      a: 'It works better with a walkable venue (garden + bar + lawn), but even a single ballroom can hold 4–5 stops. Below that, the Relationship Origin Story Exhibit is a better fit.',
    },
    {
      q: 'Isn’t this what those wedding-app scavenger-hunt templates already do?',
      a: 'Templates hide letters that spell "MR & MRS SMITH." We hide chapters of your actual love story, one at a time, with a personal reason each is where it is.',
    },
    {
      q: 'Do we have to hide the codes ourselves?',
      a: 'No. We deliver printed QR placards for each stop; you or the coordinator tape them up during setup. We can also work with the venue directly.',
    },
    {
      q: 'Does it work outdoors / in sunlight / with bad phone reception?',
      a: "Yes. QR codes work offline; the chapter content is preloaded when a guest scans in the first time. Weak reception at one corner of the garden won't break anything.",
    },
    {
      q: "What's the keepsake?",
      a: 'Every guest gets a "chapters unlocked" summary emailed after the wedding, and you get a hardcover book of all eight chapters with the exact location coordinates printed next to each.',
    },
    {
      q: 'Is $2,000 worth it for cocktail hour entertainment?',
      a: 'Cocktail hour is usually the flattest hour of the wedding — 60 minutes of guests standing near the bar. This turns it into an active, story-driven walk with a private thank-you video at the end.',
    },
    {
      q: "What if guests don't finish the hunt?",
      a: 'The last chapter (the private thank-you video from you two) still gets emailed to everyone the day after. Nobody misses the payoff.',
    },
  ],

  'anniversary-time-capsule': [
    {
      q: 'Will guests really record a video?',
      a: 'Yes, when they’re prompted at a natural moment (during cocktail hour or between courses) and the interface is a single tap. Even at low participation (30%), 60 videos delivered on your 5th anniversary is a stunning number.',
    },
    {
      q: 'What if the delivery service is gone in 25 years?',
      a: 'We contract the delivery pipeline separately and store the videos in redundant cold storage with a fallback to a physical drive we ship to you. The 25-year and 50-year tiers get the paranoid backup plan.',
    },
    {
      q: "What if grandpa doesn't want to record?",
      a: "There's an audio-only mode and a written mode for anyone camera-shy. Almost nobody sits out when the phrasing is \"leave a message they'll open in 10 years\" — the pull is universal.",
    },
    {
      q: 'Is this worth $2,000 when we could just use envelopes?',
      a: 'Envelopes get lost. This is a scheduled email that will hit your inbox on the exact date, with the exact face and voice of the person who recorded it, even if that person is no longer around.',
    },
    {
      q: 'What if someone records something inappropriate?',
      a: 'Every message is reviewed by you (or a designated moderator) before it’s marked "delivered." You can also delete or re-schedule any message at any time via your dashboard.',
    },
    {
      q: 'Do we have to remember to open the capsules on the anniversary?',
      a: "No. We schedule the emails and they arrive automatically. You wake up on your 5th anniversary and there's a video from Aunt Rae in your inbox.",
    },
    {
      q: 'Can guests attach photos too?',
      a: 'Yes — a still from the wedding, or a selfie from that night. So future-you sees present-them at the age they were tonight.',
    },
    {
      q: 'Do guests need to download an app to record?',
      a: 'No. QR → mobile browser → record. Nothing installed, nothing to log into.',
    },
    {
      q: 'Can we (the couple) record messages to ourselves too?',
      a: 'Yes. Same interface, same delivery schedule. Couples often record a message to future-them on the same 5-year tier.',
    },
    {
      q: 'What happens on the delivery date — does the video just appear?',
      a: 'We email you and the recipient on the date. The video lives on a private page at your URL, playable forever, downloadable if you want.',
    },
  ],

  'bucket-list-builder': [
    {
      q: 'Will guests submit real items, or joke ones?',
      a: 'Both, and both are welcome. The categorized prompts ("skills to learn", "scary things", "nights in") keep entries specific rather than generic, and the upvoting means the best of the joke ones surface without drowning the sincere ones.',
    },
    {
      q: 'Won’t this just be a wall of "have kids" and "travel more"?',
      a: 'The category prompts and the "attach a personal offer" mechanic ("I’ll teach you to sail — Uncle Pete") push guests toward specificity. Generic entries get downvoted; specific ones get boosted.',
    },
    {
      q: "What about older guests who won't type on a phone?",
      a: 'Voice-to-text is one tap. Also, guests can hand their phone to a nearby guest and dictate — this happens a lot at dinner tables.',
    },
    {
      q: 'Is $2,000 worth a bucket list?',
      a: "The list isn't just a list — it's a printed hardcover book delivered two weeks after the wedding, and a living app you two check items off for years. Flowers die by morning; this is a ten-year artifact.",
    },
    {
      q: 'Isn’t this just cards in a jar?',
      a: "Cards in a jar are lovely for the sentiment. But you can't upvote a card, you can't watch the list grow on the wall in real time, and you can't get a typeset hardcover book without months of transcription work.",
    },
    {
      q: 'Do we have to moderate every submission?',
      a: 'Every entry goes through a one-tap approve/reject before hitting the wall. Your MOH or MC can moderate; most weddings run through ~150 entries in the space of one dinner course.',
    },
    {
      q: "What if the display wall isn't in use at our venue?",
      a: "It can also run on the DJ's TV or a rented flatscreen we deliver. If there's genuinely no screen, the list still fills a phone gallery and the printed book is still delivered.",
    },
    {
      q: 'How does the printed book work?',
      a: 'We typeset the final list, group by category, credit each item to the guest, and deliver a hardcover book two weeks after the wedding. Extra copies are available at cost.',
    },
    {
      q: 'Can we edit the list after the wedding?',
      a: 'Yes. You keep dashboard access — add, remove, re-categorize. And you check items off as you complete them, which slowly turns the book into a life log.',
    },
    {
      q: 'Isn’t the wall going to fill up with duplicates?',
      a: "The submission form auto-suggests similar existing entries so guests can upvote instead of duplicating. That's why the categorized prompts matter — they cluster related ideas.",
    },
  ],

  'conversation-starters': [
    {
      q: 'Will guests actually scan a table QR code just to get talking prompts?',
      a: 'Yes, because the prompts are specific to their table. "You and Marcus both spent time in Antigua" beats "what’s your favorite movie" — guests scan once because the first prompt already knows something about them.',
    },
    {
      q: 'How do you get the 30-second guest profiles?',
      a: 'We send a one-question form to every guest a month before the wedding, sent from your address. Typical response rate is 60–70%. Guests who don’t respond still get generic prompts — the app degrades gracefully.',
    },
    {
      q: "What if a guest sees a prompt about them they didn't want shared?",
      a: 'Every guest reviews their own profile before it goes live. Nothing about a guest appears in a prompt they haven’t approved.',
    },
    {
      q: 'Isn’t this just printed icebreaker cards?',
      a: "Printed cards can't broker a \"surprise me — go talk to this specific stranger at your table\" match. And they can't be searchable, so a table of ten strangers stops using them after five minutes.",
    },
    {
      q: 'What about tables of only close friends who already know each other?',
      a: 'The prompts adapt — for a table of college friends we lean into "who remembers X," for a mixed table we lean into introductions. Both cases use the same profile data with different prompt logic.',
    },
    {
      q: 'Do older guests get this?',
      a: 'Yes. The UI is a single card at a time, tap to see the next one. No swiping, no scrolling, no logins.',
    },
    {
      q: 'Is $2,000 worth a conversation-starter tool?',
      a: 'The gap between "I sat next to a stranger for three hours" and "I sat next to a stranger and now I know how they know the couple" is the difference between a good wedding and a great one for that guest. Multiply by 150 guests.',
    },
    {
      q: 'Do we run this during the reception?',
      a: 'No. It runs itself. Guests scan the table QR when they sit down and use it at their own pace.',
    },
    {
      q: 'Is there a keepsake?',
      a: 'Yes — every guest gets a booklet of "the people you met" with the profiles they were shown, mailed after the wedding. The couple gets an anonymized heat-map of which prompts drove the most conversation.',
    },
    {
      q: "What if a table's guest mix changes at the last minute?",
      a: 'You update the seating chart in your dashboard; prompts re-generate in seconds. We can also adapt on the day if a swap happens at cocktail hour.',
    },
  ],

  'prediction-vault': [
    {
      q: 'Will guests actually make predictions instead of just eating dinner?',
      a: 'Yes — the format is fast (5–6 questions, sliders and multiple choice, no typing). Most guests finish in under three minutes during cocktail hour, and the live histogram on screen ("73% think they’ll have kids within 3 years") gives instant payoff.',
    },
    {
      q: 'Is the live histogram going to embarrass anyone?',
      a: 'No — it’s aggregate only. Individual predictions stay sealed until the anniversary. The histogram shows the room, not the person.',
    },
    {
      q: "What if the delivery emails don't fire on our 25th anniversary?",
      a: 'We use a dedicated scheduled-email service and back it up with a physical delivery mechanism (an annual reminder to you two). See the anniversary-time-capsule FAQ for the paranoid backup plan.',
    },
    {
      q: 'Isn’t this just prediction cards in a jar?',
      a: 'A jar can’t show you a live histogram, can’t schedule emails for the next 25 years, and can’t score predictions automatically ("73 of your guests got the kids question right; 12 got the city wrong"). Also, jars get lost during moves.',
    },
    {
      q: "What about guests who don't want to make predictions?",
      a: 'They watch the histogram grow with the room and skip submission. Participation of even a third of the room fills a good histogram.',
    },
    {
      q: 'Do we run this ourselves on our anniversary?',
      a: 'No. The email arrives with a scoring interface. You tap through each question and see how the room did. Takes five minutes over morning coffee.',
    },
    {
      q: 'What about the guests — do they find out what they predicted?',
      a: 'They get a "prediction receipt" texted to them tonight, and an anniversary email if they opted in. They can score their own predictions against reality.',
    },
    {
      q: 'Is this worth $2,000 for one dinner activity?',
      a: "It's not one activity — it's a 25-year drip of anniversary rituals with your people. That's the actual value; the dinner submission is the entry point.",
    },
    {
      q: "What if we don't want to publicly show certain questions on the histogram?",
      a: 'You choose per-question whether the histogram shows live during dinner or stays sealed until the anniversary. Kids question public, income question sealed, up to you.',
    },
    {
      q: 'Can guests change their prediction after submitting?',
      a: 'Yes, until the vault seals at the end of dinner. After that, everything is locked.',
    },
  ],

  'guest-memory-map': [
    {
      q: 'Will guests take the 30 seconds to pin the map?',
      a: 'Yes — it’s the fastest submission on the list, and the payoff is visible on the wall within seconds. Watching a new pin drop on a different continent is a small dopamine hit that pulls the next person to submit.',
    },
    {
      q: 'Isn’t this just a printed pin map on an easel?',
      a: 'A physical map is a lovely keepsake but it doesn’t pulse when a new pin drops, doesn’t show which of your friends were coincidentally in the same city on the day you met, and doesn’t animate in front of the whole room.',
    },
    {
      q: "What about older guests who don't want to search a map?",
      a: 'Location auto-detects from the phone (with permission). If not, they type the city and it fills in. If they still can’t, a nearby guest usually pins it for them — this is a very handoff-friendly submission.',
    },
    {
      q: "What if guests don't want to share their location?",
      a: 'Everything is city-level, never precise. And it’s opt-in — guests who skip just aren’t on the map.',
    },
    {
      q: 'Is $2,000 worth it for a map on a wall?',
      a: 'The map is a live 3D globe that fills up in front of the room, exports as a large-format print, and reveals coincidences like "your college roommate was in Berlin the night your dad landed." That last one is unbuyable in any other format.',
    },
    {
      q: "What if we don't have a screen for the big display?",
      a: "We can run it on the DJ's TV or a rented flatscreen. The globe is the whole appeal though, so if there's genuinely no display, another app is probably a better fit.",
    },
    {
      q: 'Do we have to run this during the reception?',
      a: 'No. It runs itself. Guests pin as they arrive or during cocktail hour; the map fills through dinner.',
    },
    {
      q: "What's the keepsake?",
      a: 'A high-resolution print of the finished globe with every pin labeled, plus a private page listing every guest with their pin location. The print is delivered mounted, ready to frame.',
    },
    {
      q: 'Can guests pin multiple milestones?',
      a: 'Yes — the milestone selector lets guests re-pin for "the day you met," "the day he proposed," "tonight." Same map, three layers.',
    },
    {
      q: 'Won’t the map just be a cluster around our home city?',
      a: 'Some clusters are the point ("look how many of our people came from home"). But the globe layout means single pins in Tokyo, Berlin, and São Paulo pop against the cluster — the geographic contrast is the reveal.',
    },
  ],

  'live-roast-board': [
    {
      q: 'What if someone submits something truly awful?',
      a: 'Nothing hits the wall without best-man / MC approval. The moderator dashboard is a one-tap approve/reject with an "edit for length" option. Bad submissions never appear.',
    },
    {
      q: 'Will guests actually submit roasts?',
      a: 'Yes — especially when they see the first two approved ones land on the wall. The submissions come in waves triggered by big laughs from the room.',
    },
    {
      q: 'Isn’t this just an open mic risk?',
      a: 'The opposite. It gives the funny friend a channel *without* the open-mic chaos: everything is written, moderated, and delivered by the wall in the couple’s own pace, not by a nervous guy at a microphone.',
    },
    {
      q: 'Do we have to moderate this ourselves during the reception?',
      a: "No — the best man or MC handles moderation from their phone. You're on the dance floor. Moderation takes two seconds per submission.",
    },
    {
      q: 'What about older / conservative guests seeing the wall?',
      a: 'The wall shows only what’s been approved. Moderators calibrate to the room — a Southern Baptist reception filters differently than a Brooklyn one.',
    },
    {
      q: 'Is $2,000 worth it for a roast?',
      a: "It's not just a roast — it's a moderated live wall that also captures every submission (approved and rejected) as a private \"roast book\" you get after the wedding. That's the keepsake.",
    },
    {
      q: 'What if nobody submits?',
      a: 'The MC seeds it with three pre-written ones (co-written with you) to kick off. Submissions almost always follow within minutes.',
    },
    {
      q: 'Can guests submit anonymously?',
      a: 'Yes — every submission has a "signed / anonymous" toggle. Most guests sign; a few submit the good ones anonymously.',
    },
    {
      q: 'Do we get to see everything that was rejected?',
      a: 'Yes. A separate private "cutting room floor" section shows every rejected submission for you two to enjoy privately (or delete).',
    },
    {
      q: "What's the crowd voting mechanic?",
      a: 'Guests can heart approved roasts. The top-voted one at the end of the night gets a callout on the wall — the "roast of the night."',
    },
    {
      q: 'Won’t this drag on and derail dinner?',
      a: 'It runs in a bounded window (usually 20 minutes during dessert), then closes. The wall goes back to the main display and the roast book compiles after.',
    },
  ],

  'unpopular-opinions': [
    {
      q: 'What are "unpopular opinions" in this context?',
      a: 'Statements you two actually hold, spanning silly to serious ("hot dogs are sandwiches", "wedding registries are gauche"). Guests slide their agreement anonymously; the histogram shows the room in real time.',
    },
    {
      q: 'Will guests engage with this?',
      a: 'Yes — anonymous, opinion-based, one slider per screen. The engagement floor is very low. And the moment a controversial opinion lands ("open marriages should be normalized"), the room lights up.',
    },
    {
      q: 'Isn’t this just conversation cards?',
      a: 'Cards don’t animate a live histogram in front of the room. That histogram — watching the entire wedding disagree with your dad in real time — is the whole product.',
    },
    {
      q: 'What if an opinion feels risky to display live?',
      a: 'You review every opinion before dinner. Anything too spicy stays off the reception screen but can be included in the post-wedding keepsake.',
    },
    {
      q: 'What about older / conservative guests?',
      a: 'The opinions are yours to write, so the risk is entirely on you two. Most couples calibrate a healthy mix of light and pointed.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'The 20 minutes of the room laughing / gasping at real-time opinion tallies is what you’re paying for, plus the keepsake histogram poster showing how your people actually split on every question.',
    },
    {
      q: 'Do we run this ourselves?',
      a: 'No. It runs on a timer during dinner (one opinion every 90 seconds), and your MC can pause or advance from the mic.',
    },
    {
      q: 'Can guests see how they specifically voted vs. the room?',
      a: 'They see their own position on each slider vs. the average. Nobody sees anyone else’s individual vote.',
    },
    {
      q: "What's the keepsake?",
      a: 'A printed poster with every opinion and the room’s histogram, plus a private page you can share with guests who want to see the full breakdown.',
    },
    {
      q: "What about guests who don't want to answer?",
      a: 'Slider defaults to neutral; skipping is fine. Even at 40% participation the histogram is meaningful.',
    },
  ],

  'first-dance-ballot': [
    {
      q: 'So the guests pick our first dance song?',
      a: 'Yes — from a shortlist you and your partner curate (typically 4–5 songs). The DJ plays the winner live; you find out at the same moment as everyone else.',
    },
    {
      q: 'What if we hate the song the room picks?',
      a: "Every song on the shortlist is one you *both* said you'd be happy to dance to. There's no losing option — the surprise is which one, not whether.",
    },
    {
      q: 'Will guests actually vote?',
      a: 'Yes — it’s a one-tap ballot open during cocktail hour. Voting typically hits 70–80% because the stakes ("we pick their song") are irresistible.',
    },
    {
      q: 'Isn’t this just a Spotify poll?',
      a: 'A poll doesn’t reveal the winner live in front of the whole room, doesn’t have a countdown, and doesn’t give you the vote breakdown as a keepsake. The reveal is the product.',
    },
    {
      q: "What if our DJ doesn't want to work with this?",
      a: 'We coordinate with the DJ directly. All they need is the winning song five minutes before the first dance — same as any set list change.',
    },
    {
      q: 'What about older guests?',
      a: 'One tap, big song titles, no login. Grandparents often love voting because the stakes are so clear.',
    },
    {
      q: 'Is $2,000 worth it for a song vote?',
      a: "It's not the vote — it's the walk-to-the-floor moment. You've been at every wedding where the couple walks to a pre-known song. This one is a shared reveal for 150 people.",
    },
    {
      q: 'What if we want to add a wildcard song?',
      a: 'Yes — you can seed a hidden "if this hits 5% write-in votes, it wins" wildcard. Rarely gets triggered but the option is there.',
    },
    {
      q: 'Do we have to run this during the reception?',
      a: 'No. Voting closes automatically 15 minutes before the first dance. The DJ gets a push notification with the winner.',
    },
    {
      q: "What's the keepsake?",
      a: 'A vote breakdown by table (or by "how they know you") and a private page with every ballot cast. Fun to look back on years later.',
    },
    {
      q: 'Can we do this for a second dance / dad dance / anniversary dance too?',
      a: 'Yes — the ballot format works for any "the room picks the song" moment.',
    },
  ],

  'wedding-bingo': [
    {
      q: 'Isn’t wedding bingo already a thing?',
      a: 'The paper version is. But the squares on a paper card are generic ("someone crying"). Ours are specific to your wedding ("the groom’s dad gives the third toast of the night", "the flower girl steals a canapé") — that’s the whole difference.',
    },
    {
      q: 'Do guests really pay attention long enough to fill a card?',
      a: 'Yes — because the squares reward *attention to your wedding specifically*. Bingo forces guests to watch the room instead of their phone.',
    },
    {
      q: 'What about older guests?',
      a: 'The card is one screen, tap to mark. No typing, no scrolling. Easy for anyone who can play any card game.',
    },
    {
      q: 'Is $2,000 worth it for a party game?',
      a: "Bingo runs the whole night as ambient entertainment, generates a \"first to bingo\" moment that pulls the room's attention, and produces a keepsake card showing what actually happened. It's not one moment; it's a 5-hour thread.",
    },
    {
      q: 'What’s the "first to bingo" moment?',
      a: 'When a guest hits five in a row they tap "BINGO" — the wall announces the winner by name and table. Small prize at the bar. Room cheers.',
    },
    {
      q: 'Do we have to run this during the reception?',
      a: 'No — it runs itself. Guests pull up their card whenever they want.',
    },
    {
      q: 'What if a square happens and nobody notices?',
      a: 'Guests self-verify by tapping the square when they see it. There’s an "verify with the wall" option for contested squares, but 99% of squares are self-scored honor system.',
    },
    {
      q: "What if we don't know 25 specific things that'll happen at our wedding?",
      a: 'We work with you to build the card — half from your relationships (who will cry first, whose speech will run over), half from the venue and format. The card ends up sounding like an inside joke.',
    },
    {
      q: "What's the keepsake?",
      a: 'A private page showing which squares got marked and when. Also the winning card, framed if you want.',
    },
    {
      q: 'Can guests get different cards?',
      a: 'Yes — every guest’s card has the same 25 squares in a different arrangement. Same event, different bingo path.',
    },
  ],

  'advice-oracle': [
    {
      q: "Won't we just get 100 pieces of generic advice?",
      a: 'The prompts steer toward specificity ("what should they do the first Sunday of every month", "the one hard conversation they should have before year 3"). Generic advice is filtered out at moderation.',
    },
    {
      q: 'Isn’t this just an advice card box?',
      a: 'An advice box lets you read the cards once. This lets you get an anniversary "here’s what your Uncle Pete told you five years ago" surfaced automatically.',
    },
    {
      q: 'What about older guests?',
      a: 'Voice-to-text or written, either works. Older guests often *love* this one — advice is the format they most want to give.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: "The pieces of advice run on the wall during dinner as an ambient thread, get compiled into a keepsake book, and re-surface on anniversaries. It's a decade-long artifact from one dinner submission.",
    },
    {
      q: 'What if someone gives bad advice?',
      a: 'Every submission is moderated before it hits the wall. Bad advice can be kept for you privately and never displayed.',
    },
    {
      q: 'Do we have to moderate live?',
      a: 'Yes, someone does — usually a designated friend, MOH, or MC. Two seconds per approval. Guests aren’t held up because the wall runs on a small delay.',
    },
    {
      q: 'Can guests give advice anonymously?',
      a: 'Yes — signed or anonymous per submission. Most sign because they want you to know.',
    },
    {
      q: "What's the keepsake?",
      a: 'A printed and bound "advice book" mailed two weeks after the wedding, plus scheduled anniversary re-surfacing of specific advice.',
    },
    {
      q: 'Won’t the wall get boring if it’s just text?',
      a: "Design-wise the wall alternates advice with photos, big-type quotes, and negative space. It's not a static feed.",
    },
    {
      q: 'Can we filter advice by topic (parenting, money, communication)?',
      a: 'Yes — guests select a topic when they submit, and the book is organized by topic.',
    },
  ],

  'relationship-exhibit': [
    {
      q: 'What actually happens with this one?',
      a: 'The venue gets an "exhibit" — 4–6 zones, each a chapter of your story. Guests walk through with their phone as an audio guide, hearing you two narrate each chapter in your own voices.',
    },
    {
      q: 'Isn’t this just a photo wall?',
      a: 'A photo wall is passive. This is a self-paced walk-through where guests hear the actual voice of the bride telling the story of the fight in Lisbon, standing in front of the photo from that trip.',
    },
    {
      q: 'Will guests actually walk through it?',
      a: 'Yes — especially during cocktail hour, when everyone is looking for something to do. The "audio guide" framing is universal enough that guests know exactly what to do.',
    },
    {
      q: 'What about older guests?',
      a: 'It’s the most physical / least-app-heavy experience on our list — walking, looking, listening. If they don’t want the audio, the printed panels still tell the story.',
    },
    {
      q: 'Do we need a big venue for this?',
      a: 'It scales — six zones for a big venue, three for a small one. Below three zones, the Venue Scavenger Hunt is a better fit for the walking format.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'You’re paying for the museum-caliber design treatment of your own story, an artifact that gets photographed and shared for years. The audio narration alone becomes a keepsake podcast episode.',
    },
    {
      q: 'Do we have to run this during the reception?',
      a: 'No — it runs itself. Guests scan a QR at the entrance and self-pace.',
    },
    {
      q: "What's the keepsake?",
      a: 'A printed "exhibit catalog" (like a museum booklet) with every panel, mailed to every guest. And the audio guide becomes a downloadable episode you can share with anyone who wasn’t there.',
    },
    {
      q: "What if we're not good at narrating?",
      a: 'We coach you through recording sessions before the wedding — 5–8 minutes of raw audio, edited by us. Most couples surprise themselves.',
    },
    {
      q: 'Can guests contribute to the exhibit?',
      a: 'Yes — the final zone is a "guest wall" where guests submit their own moment of the couple, which gets added to the exhibit book and available to browse next to the printed panels.',
    },
  ],

  'where-next-map': [
    {
      q: 'So guests suggest where we should honeymoon / travel next?',
      a: 'Yes. They pin a spot on a globe with one line about why. The couple picks (or doesn’t) from the suggestions; the room sees the map fill in real time.',
    },
    {
      q: 'Will guests engage?',
      a: 'Yes — pinning a map is a 20-second submission with a visible payoff (their pin drops on the screen). Participation is usually 60%+.',
    },
    {
      q: 'Isn’t this just Pinterest?',
      a: 'Pinterest is anonymous strangers’ opinions. This is your people saying "you should go to my hometown in Nova Scotia because I want you to eat at my mom’s restaurant." Different product.',
    },
    {
      q: 'What about older guests?',
      a: 'One tap on a map, dictate one sentence. Easier than most submissions on our list.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'You get a curated map of your favorite people’s favorite places on earth, ranked by their emotional investment. That map goes with you for the next decade of trips.',
    },
    {
      q: 'Do we have to run this?',
      a: 'No. Runs itself. Pins accumulate through the night on the reception screen.',
    },
    {
      q: 'What if someone pins the same place?',
      a: 'Overlapping pins cluster and show all the associated notes when tapped. The "why" is the differentiator, not the place.',
    },
    {
      q: "What's the keepsake?",
      a: 'A printed map with every pin labeled, plus a private page you use to plan trips against. Guests get an email when you visit their pin ("Uncle Pete, we finally made it to your hometown").',
    },
    {
      q: 'Can guests attach a photo of themselves at the pinned place?',
      a: 'Yes — most do. The map ends up double-purposed as a photo mosaic of your people at their favorite places.',
    },
    {
      q: 'Can guests pin more than one spot?',
      a: 'Up to 3 per guest. Keeps the map dense without any one guest dominating.',
    },
  ],

  'collaborative-soundtrack': [
    {
      q: 'Doesn’t this just replace the DJ?',
      a: 'No — the DJ picks from the top-hearted requests from the room. The DJ still curates, but they curate from the room’s real-time signal instead of guessing.',
    },
    {
      q: 'What about the "guests will crash the wedding with terrible songs" fear?',
      a: 'The DJ has final say. And every song is moderated for genre fit before it hits the queue. Nothing plays without being cleared.',
    },
    {
      q: 'Will guests actually vote on songs?',
      a: 'Yes — it’s the most-used app format on the list because the reward (dancing to your own request) is immediate.',
    },
    {
      q: "What about older guests who don't know Spotify?",
      a: 'The interface is "search song / artist" (voice or type), tap heart. No account needed.',
    },
    {
      q: 'Isn’t this just a DJ request slip?',
      a: 'A slip goes to one person. This surfaces the room’s collective signal in real time — the DJ can see that 40 people want a specific decade and pivot the set accordingly.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'The dance floor gets more energy because guests are dancing to songs they voted for. And you get a "who requested what" keepsake — a private playlist tagged by guest for every song played.',
    },
    {
      q: 'Do we have to run this?',
      a: 'No. Guests vote through the night; the DJ works from the live queue. No involvement from you two required.',
    },
    {
      q: 'What if the DJ refuses to work with this?',
      a: 'We work with your DJ ahead of time and can supply a rider that explains the setup. Most professional DJs actually love it — it removes ambiguity about what the room wants.',
    },
    {
      q: 'Can we pre-lock the first dance, parent dances, etc.?',
      a: 'Yes. Those slots are locked and never subject to the vote. The soundtrack app runs from the second the floor opens to the end of the night.',
    },
    {
      q: "What's the keepsake?",
      a: 'A private "the night, by song" page — every song played, who requested it, how many hearts it got. Doubles as a shareable playlist.',
    },
  ],

  'love-letter-machine': [
    {
      q: 'What is this, exactly?',
      a: 'A guest types a short message to one of you two ("To: Simone — thank you for being the reason our friend finally slowed down"). Every letter goes through you for approval, then appears on the big screen, one at a time, all night.',
    },
    {
      q: 'Will guests actually write love letters?',
      a: 'Yes — because the prompt is small ("one line, to one of them"), the moderation gives them cover, and seeing others’ letters on the wall pulls them to submit their own.',
    },
    {
      q: 'What about older guests?',
      a: 'Voice-to-text or a friend types for them. But older guests are actually the highest-participation demographic on this one — they write the letters people quote at the end of the night.',
    },
    {
      q: 'Isn’t this a guest book?',
      a: 'A guest book is a physical book that gets closed at 11pm and stored in a closet. This is a live stream of letters on the screen, appearing one at a time, that you read across the whole reception.',
    },
    {
      q: 'What if someone writes something inappropriate?',
      a: 'Every letter is approved by you (or a designated friend) before it hits the screen. Rejection is invisible to the guest.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'The mid-reception moment where the whole room quiets to read a letter from grandma is the reason people spend on Wepho. This is the flagship demo for a reason.',
    },
    {
      q: 'Do we have to run this?',
      a: 'The moderator does. Two seconds per approval, and moderation can be one designated friend (not the couple).',
    },
    {
      q: 'Is this the same as the Love Letter Machine demo on the homepage?',
      a: 'Yes — the homepage demo lets you try it. Real weddings run the same core interaction at scale.',
    },
    {
      q: "What's the keepsake?",
      a: 'A private page with every letter, plus a printed hardcover book of all approved letters delivered after the wedding. Grandma’s letter, in her words, forever.',
    },
    {
      q: 'Can letters be anonymous?',
      a: 'Yes — signed or anonymous, guest’s choice per letter.',
    },
    {
      q: 'What if we get too many letters to display?',
      a: 'The wall rotates through them. Every letter is preserved in the keepsake; not every one shows on the screen.',
    },
  ],

  'emotion-pulse': [
    {
      q: 'What does "emotion pulse" mean, mechanically?',
      a: 'Guests tap one of six emotion buttons ("moved", "laughing", "buzzing", "nostalgic", "restless", "in awe") whenever they feel like it. The room averages every minute. The result is a graph of the wedding’s emotional arc.',
    },
    {
      q: 'Will guests really tap emotions?',
      a: 'Yes — the tap is one screen, no login, and the graph on the wall pulses with the room’s signal. It’s a strange and pleasing form of participation.',
    },
    {
      q: 'Isn’t this just a novelty?',
      a: 'The graph is the artifact. You get to see the exact minute the room emotionally peaked — often during the third toast, sometimes during a dance nobody expected. That data is unbuyable elsewhere.',
    },
    {
      q: 'What about older guests?',
      a: 'Six big buttons, tap once. As accessible as an emoji reaction.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'The keepsake — a printed graph of your reception’s emotional arc, minute by minute, with annotations — is the reason. Framed and hung, it’s a piece of art.',
    },
    {
      q: 'Do we have to run this?',
      a: 'No. It runs itself all night.',
    },
    {
      q: 'Is anything anonymous?',
      a: 'Everything. No individual pulses are traceable to a guest.',
    },
    {
      q: 'What if guests forget to tap?',
      a: 'Fine — even 20% participation makes a clean signal. The graph doesn’t need every guest to be meaningful.',
    },
    {
      q: 'Can we see the graph in real time during the reception?',
      a: 'The wall can show it live (subtle) or hide it until the after-party for the reveal. Your choice.',
    },
    {
      q: "What's the keepsake?",
      a: 'A large-format printed graph with annotations from the timeline (toasts, dances, cake) mapped to the pulse peaks. Also downloadable as a shareable image.',
    },
  ],

  'secret-relay': [
    {
      q: 'So tables pass anonymous secrets to other tables?',
      a: 'Yes — each table submits a short prompt or confession, which routes to another table who has to guess who wrote it. The wall tracks the relay chain live.',
    },
    {
      q: 'Won’t this get weird / gossipy fast?',
      a: 'Every relay is moderated before it goes to the next table. Off-limit topics (health, exes, arguments) are filtered at the prompt level.',
    },
    {
      q: 'Will tables engage?',
      a: 'Yes — the format has stakes ("we have to guess who this is"). Peer pressure at the table drives participation.',
    },
    {
      q: 'Isn’t this just a party game?',
      a: 'It’s a party game structured for a wedding — where every table only knows a fraction of the room, so the guessing game reveals connections nobody knew about.',
    },
    {
      q: 'What about older guests?',
      a: 'The MC / table host on each table drives the interaction. Older guests participate socially without needing the app.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'The keepsake — an anonymized book of every secret shared and every guess made — is a specific artifact you literally cannot make any other way.',
    },
    {
      q: 'Do we run this?',
      a: 'No. The MC seeds the first relay; guests keep it moving. Moderation is one designated friend on a phone.',
    },
    {
      q: "What if a table doesn't play?",
      a: 'The relay routes around them. No table is a bottleneck.',
    },
    {
      q: "What's the keepsake?",
      a: 'A printed book of every prompt and every guess, with the reveal of who submitted what, delivered after the wedding.',
    },
    {
      q: 'Can guests opt out of the relay?',
      a: 'Yes. Anyone can decline to participate; the table still plays without them.',
    },
  ],

  'cocktail-quiz': [
    {
      q: 'What does this do, exactly?',
      a: 'Guests answer 4–6 personality questions, and the bar serves them a cocktail matched to their answers — with a note from you two about why that drink fits them.',
    },
    {
      q: 'Will the bar go along with this?',
      a: 'Yes — we coordinate the drink list with your bar in advance. Usually 5–6 pre-approved cocktails covering the answer combinations. The bar sees the guest’s match on their tablet.',
    },
    {
      q: 'Will guests actually take the quiz?',
      a: 'Yes — it’s fun, it takes 90 seconds, and there’s a drink at the end. Very high participation format.',
    },
    {
      q: 'What about older guests / non-drinkers?',
      a: 'Full non-alcoholic version with matched mocktails. Older guests love the "here’s why this drink is for you" note from the couple.',
    },
    {
      q: 'Isn’t this just a signature cocktail?',
      a: 'A signature cocktail is one drink for everyone. This is 5–6 drinks matched to who a guest actually is, with a personal note. Different scale of thoughtfulness.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'The bar becomes a personalized moment for every guest, plus a "cocktail top 5" keepsake showing which drinks the room actually gravitated toward. Doubles as an anniversary-drink reveal.',
    },
    {
      q: 'Do we have to run this?',
      a: 'No. Guests self-serve the quiz at the bar; the bartender pulls the match on their tablet.',
    },
    {
      q: 'What if a guest hates their match?',
      a: 'There’s a "give me a different one" button. The point is the note, not the algorithm.',
    },
    {
      q: "What's the keepsake?",
      a: 'A private "bar top 5" page ranked by the room, plus every guest’s individual match with the personalized note.',
    },
    {
      q: 'Do we have to buy a special POS system for the bar?',
      a: 'No. We supply a tablet or the bar uses their phone. Zero infrastructure required from the venue.',
    },
  ],

  'parallel-universe': [
    {
      q: 'What does this game do?',
      a: 'Guests vote on "what would your life look like if…" scenarios about you two (if she’d taken the Berlin job, if he’d stayed with his college girlfriend). The wall shows the room’s picks in real time.',
    },
    {
      q: 'Isn’t this weirdly dark for a wedding?',
      a: 'It’s played as a comedy — the scenarios are absurd more often than serious. Done right, it’s a celebration of "of all the paths, you two got here."',
    },
    {
      q: 'Will guests engage with hypotheticals about our lives?',
      a: 'Yes — the questions are so specific to your relationship that guests want to weigh in. It plays like collective fan fiction.',
    },
    {
      q: 'What about older / conservative guests?',
      a: 'The scenarios you write are up to you — a lighter mix works for a wider audience. Grandparents typically love giving their opinion on these.',
    },
    {
      q: 'Isn’t this just trivia in a different shirt?',
      a: 'Trivia has right answers. This is opinions on hypotheticals with no right answer — a fundamentally different mechanic.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'You get 20 minutes of the room laughing at collective fan fiction about your relationship, plus a keepsake showing what the room thought would have happened in every parallel life.',
    },
    {
      q: 'Do we run this?',
      a: 'No. Runs on a timer or under MC control from the mic.',
    },
    {
      q: "What's the keepsake?",
      a: 'A printed "parallel lives" booklet showing the room’s vote for each scenario, with the actual outcome (the one where you two met) as the closing chapter.',
    },
    {
      q: 'What if a scenario is too personal?',
      a: 'You write every scenario. Nothing goes live without your approval.',
    },
    {
      q: 'Do guests see how they specifically voted?',
      a: 'Yes — each guest sees their picks vs. the room. Aggregate view for the wall; individual view for the guest.',
    },
  ],

  'who-said-it': [
    {
      q: 'What is this game?',
      a: 'Guests see 20 real quotes / texts / photos and guess which one of you two said or sent each. Live tally on the wall. Bonus layers reveal the sender after each round.',
    },
    {
      q: 'Isn’t this just trivia?',
      a: 'Same category, different mechanic. Trivia is questions with answers. Who Said It is *content* (real screenshots, real texts, real quotes) with a binary guess. The material is the star.',
    },
    {
      q: 'Will guests engage?',
      a: 'Very high — the format has a built-in social hook ("I *knew* that was Simone"). The room votes together and reacts to the reveal.',
    },
    {
      q: 'What about older guests?',
      a: 'Two big buttons per screen. Easiest UX on the list.',
    },
    {
      q: 'Are we going to be embarrassed by our own text messages?',
      a: 'You curate every quote and screenshot. Nothing is submitted by guests, and nothing appears without your approval. Embarrassment is a controlled variable.',
    },
    {
      q: 'Is $2,000 worth it for a guessing game?',
      a: 'The 15-minute Who Said It round becomes the most-quoted moment of the wedding, and the keepsake ("here’s every quote we used, with the sender revealed") is a unique record of your voice as a couple.',
    },
    {
      q: 'Do we run this?',
      a: 'Your MC hosts from the mic; we handle the wall and the tally.',
    },
    {
      q: "Can we skip photos or quotes we're not comfortable with?",
      a: 'Yes — anytime during setup, including the day of.',
    },
    {
      q: 'Isn’t the Who Said It demo on the homepage the same thing?',
      a: 'Yes — the homepage demo lets you try the mechanic. Real weddings run a full 20-round version with more layers (text, photo, voice memo).',
    },
    {
      q: "What's the keepsake?",
      a: 'A private page with every quote / photo used, the reveal, and the room’s guess distribution. Also a scoreboard by guest so people can see how well they know you.',
    },
  ],

  'story-chain': [
    {
      q: 'What is a story chain?',
      a: 'Guests build a collaborative story about you two, one line at a time. Each guest adds a sentence; the wall shows the story growing in real time.',
    },
    {
      q: 'Won’t this just be chaos?',
      a: 'Every submission is moderated. Chaos is the failure mode of an unmoderated chain — ours is curated by a designated friend for length and continuity.',
    },
    {
      q: 'Will guests participate?',
      a: 'Yes — a one-line submission is the lowest-friction ask on the list. Adding a sentence to a growing story is more inviting than starting one from scratch.',
    },
    {
      q: 'Isn’t this just a group text?',
      a: 'A group text has no shape. The moderator here shapes the story into chapters, and it becomes a coherent narrative by the end of the night.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'You get a moderated, coherent, printed story of your relationship co-written by your closest 150 people. Delivered as a hardcover. That’s the artifact.',
    },
    {
      q: 'Do we have to moderate this?',
      a: 'A designated friend moderates. Two seconds per submission. The chain doesn’t stall.',
    },
    {
      q: 'What about older guests?',
      a: 'Voice-to-text works, or a friend types for them. Older guests often submit the best lines.',
    },
    {
      q: "What's the keepsake?",
      a: 'A printed hardcover story with every line credited to the guest who wrote it.',
    },
    {
      q: 'What if two guests submit contradictory sentences?',
      a: 'The moderator picks the one that fits and passes the other into the "outtakes" section of the book.',
    },
    {
      q: 'Can we start the chain with a prompt?',
      a: 'Yes. You seed the opening line ("It started with a taco truck on Valencia Street…") and guests build from there.',
    },
  ],

  'ask-us-anything': [
    {
      q: 'What is this?',
      a: 'Guests submit questions to you two throughout the night. You answer live during a dedicated 15-minute AMA segment, or in written form on the wall.',
    },
    {
      q: 'Will guests submit questions?',
      a: 'Yes — especially about how you two met, your future, and stories they’ve heard secondhand. The AMA format is universally understood.',
    },
    {
      q: 'Isn’t this just Q&A?',
      a: 'Structurally, yes. The value is that every guest gets to ask the thing they’ve been wondering about you two, without needing to grab you personally.',
    },
    {
      q: 'What about inappropriate questions?',
      a: 'Every question is moderated. You pick which to answer live and which to skip.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'The AMA segment is a wedding moment nobody else does, and the answers you give become a keepsake record of your voice at this specific moment in your relationship.',
    },
    {
      q: 'Do we have to run this?',
      a: 'The MC hosts; you two answer. Moderation is one friend on a phone.',
    },
    {
      q: 'What about older guests?',
      a: 'They love asking questions in this format. Written submission or voice-to-text, either works.',
    },
    {
      q: "What's the keepsake?",
      a: 'A printed booklet of every question asked and every answer given, plus the private full list of unanswered questions if you want to answer them later.',
    },
    {
      q: 'Can we prep answers in advance?',
      a: 'Yes — many couples pre-seed a few questions to warm the room up.',
    },
    {
      q: 'What if we get too many questions?',
      a: 'The moderator surfaces the best ones. Every question is preserved in the keepsake regardless of what got answered live.',
    },
  ],

  'video-guestbook': [
    {
      q: 'Isn’t this just a video booth?',
      a: 'A video booth requires a physical station and someone running it. This is any guest, on their own phone, at any moment, recording up to two minutes.',
    },
    {
      q: 'Will guests actually record?',
      a: 'Yes — the two-minute cap and the prompt ("what do you want to tell them in ten years?") gives structure. Participation typically hits 50%+.',
    },
    {
      q: 'What about camera-shy guests?',
      a: 'Audio-only mode. Written mode. Or a friend records with them on-screen. Zero pressure.',
    },
    {
      q: "What if grandma doesn't know how to record on her phone?",
      a: 'The scan-to-record flow is one tap. Guests-helping-guests handles the rest.',
    },
    {
      q: 'Isn’t this just Instagram Stories?',
      a: 'Instagram Stories vanish. This is a permanent, edited, structured video book delivered as one film after the wedding.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'The finished piece — an edited compilation of your people’s video messages, delivered as one 30-minute film — is a documentary-grade artifact.',
    },
    {
      q: 'Do we have to run this?',
      a: 'No. Runs itself all night.',
    },
    {
      q: 'What about privacy — where do the videos live?',
      a: "On a private URL only you two access. Guests can't see each other's videos.",
    },
    {
      q: "What's the keepsake?",
      a: 'An edited compilation film of all messages (delivered ~3 weeks after the wedding) plus the raw individual videos on your private page forever.',
    },
    {
      q: 'Can we ask specific questions?',
      a: 'Yes — the prompt is customizable ("what should we name our first kid", "what’s the one piece of advice you’d give us").',
    },
  ],

  'home-the-room-built': [
    {
      q: 'What is this, exactly?',
      a: 'Guests answer questions about the home you two will eventually live in ("what room matters most", "what’s in the kitchen", "what’s on the walls"). Their answers build a live illustrated home on the wall.',
    },
    {
      q: 'Isn’t this just cards in a box?',
      a: 'Cards can’t render your guests’ collective answers as an illustrated home in real time. The rendering is the payoff.',
    },
    {
      q: 'Will guests engage?',
      a: 'Yes — it’s a creative, low-stakes, imagination-based submission with a beautiful reveal. Very high participation.',
    },
    {
      q: 'What about older guests?',
      a: 'Multiple choice with images. No typing required.',
    },
    {
      q: 'Is $2,000 worth it?',
      a: 'You get a printed illustration of the home your people imagined for you, plus the aggregated answers as a keepsake book. Both are things you literally cannot buy elsewhere.',
    },
    {
      q: 'Do we run this?',
      a: 'No. Runs itself; the illustration builds through dinner.',
    },
    {
      q: 'Is the illustration hand-drawn or generated?',
      a: 'It’s generated from a hand-drawn illustration library we commission per wedding. Your home’s style (cottage, modernist, farmhouse) is picked in advance and rendered from a set of hundreds of drawn assets.',
    },
    {
      q: 'Can we customize the questions?',
      a: 'Yes — the base set is 12 questions but you can swap or add up to 4 more.',
    },
    {
      q: "What's the keepsake?",
      a: 'A large-format print of the finished illustration, framed and shipped. Plus a private page with every guest’s contributions labeled.',
    },
    {
      q: 'Won’t the answers just contradict each other?',
      a: 'The rendering handles blending — the most-common answers dominate, minority answers appear as small details. Every guest’s answer shows up somewhere.',
    },
  ],
}

export function getFaqsForApp(slug) {
  return faqsBySlug[slug] || []
}
