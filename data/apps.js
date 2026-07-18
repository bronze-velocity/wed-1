import rawApps from '../zz/info/20-apps.json' assert { type: 'json' }

const NO_DOWNLOAD_A =
  "No. Guests scan a QR code and everything happens in their phone's browser — nothing to install, nothing to log into."

const FAILS_A =
  'We test the whole flow before we hand it off, and we stay reachable during your reception if anything comes up.'

const extendedContent = {
  'couple-trivia': {
    hero: {
      headline: 'How well do your guests actually know you?',
      subhead:
        "A live trivia game where every question is real — your first date, who said 'I love you' first, what he said when he proposed. Winner gives a toast.",
    },
    scene:
      "Dinner is winding down. Someone taps a water glass, but instead of a toast, a countdown appears on the big screen. Fifteen questions, all about you two — where you had your first kiss, what she said when he proposed, which one of you cried at the vow rehearsal. Guests grab their phones, competitive immediately. Table six is convinced they know everything. They're wrong about question four. By the leaderboard's final flip, the whole room is arguing about who actually knows you best — and the winner is heading to the mic.",
    howItWorks: {
      setup: {
        time: '~20 minutes',
        detail:
          'You write 15–20 questions and answers — the real ones, plus a few funny wrong options. Add photos if you want. We build the rest.',
      },
      guests: {
        detail:
          'Guests scan a QR code at their table, no app to download. Questions appear live as the host reads them aloud; answers lock in on their phones.',
      },
      keepsake: {
        artifact: 'The full leaderboard + every answer, saved',
        detail:
          'You get a record of who knew you best — and how the room answered every question — as a keepsake you can look back on.',
      },
    },
    bigScreen:
      'A live leaderboard climbs and swaps in real time as answers come in, question by question, with your photos woven between rounds — built for a projector or TV, so the whole room watches the standings shift together.',
    isThisYou: [
      "You have specific, funny, or surprising stories you want guests to guess at — not just 'how did we meet.'",
      'You want a moment with real stakes — a winner, a toast, a leaderboard everyone can see.',
      'Your guest list mixes people who know you at different depths — college friends, work colleagues, family — and you want them all competing on equal footing.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      {
        q: 'How long does setup take?',
        a: 'About 20 minutes to write your questions and answers. We handle the build, the branding, and the live leaderboard.',
      },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Every question, every photo, the colors, and whether you two answer live alongside your guests.',
      },
    ],
  },

  'venue-scavenger-hunt': {
    hero: {
      headline: 'Cocktail hour becomes a treasure hunt through your love story.',
      subhead:
        'Hidden QR codes around the venue unlock chapters of how you met — guests explore the room to piece it together.',
    },
    scene:
      "Cocktail hour, and instead of hovering near the bar, guests are wandering — checking behind the photo wall, near the garden, by the spot where you're taking your first look. Each QR code unlocks a chapter: the story of your first date, the trip where things got serious, the proposal. Groups form around phones, comparing what they've found. By the time dinner is called, half the room has pieced together your whole story — and the last chapter, hidden hardest to find, reveals a message from the two of you.",
    howItWorks: {
      setup: {
        time: '~30 minutes',
        detail:
          'You write 8–12 chapters of your story with photos and pick where each one lives at your venue. We handle the QR codes and the chapter-tracking.',
      },
      guests: {
        detail:
          "Guests scan codes around the venue at their own pace — no app, just their phone's camera. Their progress saves as they go.",
      },
      keepsake: {
        artifact: 'A completion map + the full story, saved',
        detail:
          'You keep a record of who found every chapter first, plus your full story exactly as you told it that night.',
      },
    },
    bigScreen:
      'An optional live map of the venue lights up as chapters get discovered, showing which parts of your story the room has found — and which ones are still waiting.',
    isThisYou: [
      'Your venue has real texture — corners, a garden, a bar, a spot that means something — and you want guests exploring it.',
      "You have a story with real chapters, not just a single 'how we met' line, and you want to tell it properly.",
      'You have shy or unfamiliar guests who do better with something to do than a seat and small talk.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      {
        q: 'How long does setup take?',
        a: 'About 30 minutes to write your chapters and choose where they live around the venue.',
      },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'The number of chapters, where they live physically, and the secret message unlocked at the end.',
      },
    ],
  },

  'anniversary-time-capsule': {
    hero: {
      headline: 'A message from your wedding day, delivered on your 10th anniversary.',
      subhead:
        'Guests record short video messages sealed until the anniversary you choose — even the ones who might not be there when you open them.',
    },
    scene:
      "During cocktail hour, guests step aside one at a time to record a short video — thirty, forty-five seconds — addressed to your future selves. Some are goofy. Some, like your grandmother's, are quiet and careful, like she's choosing every word. She doesn't tell you what she said. The app seals it. Nobody, not even you, can open it early. Five years from now, or ten, an email arrives, and you sit down together to watch every message for the first time — including hers.",
    howItWorks: {
      setup: {
        time: '~15 minutes',
        detail:
          "You choose which anniversaries to unlock on — 1st, 5th, 10th, or a custom date. No content to write, this one's all your guests.",
      },
      guests: {
        detail:
          "Guests record directly in their phone's browser — no app, no account. They pick which anniversary their message unlocks on.",
      },
      keepsake: {
        artifact: 'A sealed video capsule, delivered on the date',
        detail:
          'On the anniversary, you get an email with an unlock link — every message, watched together, for the first time.',
      },
    },
    bigScreen:
      'A simple counter on the display wall shows how many messages have been recorded so far, building anticipation without revealing a word of what\'s inside.',
    isThisYou: [
      "You have guests — grandparents, older relatives — you want to hear from years from now, not just tonight.",
      "You like the idea of a gift you can't open early, no matter how tempting.",
      'You want a wedding-day artifact that keeps giving you a moment together, on repeat, for decades.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      {
        q: 'How long does setup take?',
        a: 'About 15 minutes — you just choose which anniversaries the capsule unlocks on.',
      },
      {
        q: 'What if something breaks on the day?',
        a: 'Videos are stored securely the moment they\'re recorded, and we test the unlock flow ahead of time so your capsule opens correctly, years from now.',
      },
      {
        q: 'What can we customize?',
        a: 'Which anniversaries trigger an unlock, and whether you two can leave a message to each other inside the capsule too.',
      },
    ],
  },

  'bucket-list-builder': {
    hero: {
      headline: 'Your guests just wrote your life together.',
      subhead:
        'During the reception, guests add to your shared bucket list live — you keep the finished list forever.',
    },
    scene:
      "Dinner is underway, and a growing list is projected on the wall — 'go to Japan together,' 'adopt a dog,' 'renew your vows in ten years.' Guests add items from their phones between courses, some serious, some ridiculous, a few clearly inside jokes from your college roommate. By dessert the list is fifty items long, and you're both laughing at what your friends think your life should look like. Weeks later, it arrives as a printed keepsake — the actual to-do list for your marriage, written by everyone who loves you.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'Barely any setup — just tell us your names and colors. Guests write the content live.',
      },
      guests: {
        detail:
          'Guests submit items from their phones throughout the reception, no download, and watch the list grow on the display wall.',
      },
      keepsake: {
        artifact: 'A formatted bucket list PDF',
        detail:
          'Every item, beautifully laid out, ready to print or frame — the actual to-do list for your marriage.',
      },
    },
    bigScreen:
      'The list builds live on the wall as submissions come in, giving guests something to read and react to between courses all night.',
    isThisYou: [
      'You want a keepsake that\'s forward-looking, not just a record of the day itself.',
      "Your friends and family are the kind of people who'll write something genuinely thoughtful — or genuinely unhinged — given the chance.",
      'You like the idea of guests shaping your future, not just celebrating your past.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes — this one runs almost entirely on your guests\' contributions.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'The prompt guests see when they add an item, and the design of your final printed list.',
      },
    ],
  },

  'conversation-starters': {
    hero: {
      headline: 'Every table gets its own inside jokes.',
      subhead: "QR-code prompts tailored to who's actually sitting there — not generic icebreakers.",
    },
    scene:
      "Table seven scans their code and gets a prompt about the summer everyone spent chasing the groom around campus. Table three, all cousins, gets asked what the bride was like at nine years old. Nobody's staring at their plate wondering what to say — the questions already know who they're talking to. Laughter breaks out at different tables at different times, each one following its own thread through your life.",
    howItWorks: {
      setup: {
        time: '~20 minutes',
        detail:
          'You tag each table — college friends, groom\'s family, work colleagues — and add a note or two of context. We generate the prompts.',
      },
      guests: {
        detail:
          "Guests scan their table's code and tap through prompts written for exactly who's sitting there — no download.",
      },
      keepsake: {
        artifact: 'The full prompt set, saved by table',
        detail:
          'You keep every prompt we generated, organized by table — a record of the conversations you engineered without anyone noticing.',
      },
    },
    bigScreen:
      "None — this one's designed to stay on the table, not the wall, so conversation happens face to face.",
    isThisYou: [
      "Your guest list is a real mix — college friends, family, coworkers — who mostly don't know each other.",
      'You want to solve the awkward-table-of-strangers problem without a forced icebreaker game.',
      'You have specific shared history with different groups and want it put to use.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 20 minutes to tag your tables and add context notes for each.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'The tags and context per table, how many prompts each table gets, and how personal the questions get.',
      },
    ],
  },

  'prediction-vault': {
    hero: {
      headline: 'Sealed predictions. Opened on your 25th anniversary.',
      subhead:
        "Guests predict your future — first kid, where you'll live, what you'll still be arguing about — and you score them for decades.",
    },
    scene:
      "Someone at table two is very confident you'll have three kids by 2030. Someone else thinks you'll move to Portugal. Your best man predicts you'll still be arguing about the thermostat in 2040, with his name attached so he can never live it down. The vault seals at midnight. On your first anniversary — and your fifth, and your tenth, and your twenty-fifth — you unlock that year's batch and find out, together, who called it.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: "Almost no setup on your end — this one's driven entirely by what your guests predict.",
      },
      guests: {
        detail:
          'Guests submit predictions from their phones, sorted by how far out they\'re betting — 1, 5, 10, or 25 years.',
      },
      keepsake: {
        artifact: 'A running scorecard, unlocked year by year',
        detail:
          "Each anniversary, that year's predictions unlock and you mark them right or wrong — a party game that spans decades.",
      },
    },
    bigScreen: 'None during the reception — the reveal happens privately, on your anniversaries, years from now.',
    isThisYou: [
      'You like the idea of a wedding gift that keeps arriving, one anniversary at a time.',
      'Your friends are funny enough to make good bets and petty enough to hold you to them.',
      'You want something that gives you and your guests a reason to reconnect years later.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes — you\'re mostly just deciding when each round unlocks.' },
      {
        q: 'What if something breaks on the day?',
        a: 'Predictions are stored securely the moment they\'re submitted, and we test the unlock flow ahead of each anniversary date.',
      },
      {
        q: 'What can we customize?',
        a: 'Which anniversaries trigger an unlock, and whether guests rate their own confidence on each prediction.',
      },
    ],
  },

  'guest-memory-map': {
    hero: {
      headline: 'Watch your people light up a map of the whole world.',
      subhead:
        'Guests pin where they were on the day you met, got engaged, or said yes — live, on a map, during the reception.',
    },
    scene:
      "The screen shows a world map, dark, waiting. Guests pin their location for the day you had your first date — Stockholm, where you were — and one by one, dots appear. A friend from your gap year in Buenos Aires. A cousin in Berlin. Your college roommate in Tokyo who couldn't make the flight but wanted to be there anyway. By the end of cocktail hour, the map is full of light, and it's the first time anyone in the room has actually seen how far your people reached to be part of this.",
    howItWorks: {
      setup: {
        time: '~15 minutes',
        detail: 'You pick 2–3 milestone dates — first date, engagement, whatever matters — and we build the map around them.',
      },
      guests: {
        detail: 'Guests drop a pin and a short note for each milestone, straight from their phone, no download.',
      },
      keepsake: {
        artifact: 'A printed map poster',
        detail:
          'Every pin, every note, laid out as a custom poster — proof of how far your people traveled, literally and otherwise, to be part of your story.',
      },
    },
    bigScreen:
      'Pins populate a live world map on the display wall as guests submit them, with an optional flyover animation once the map fills in.',
    isThisYou: [
      'You have guests scattered across cities, countries, or continents and want that distance to feel visible.',
      "You want a moment that's quietly moving rather than loud — something guests notice slowly.",
      "You'd love a piece of art out of this, not just a memory.",
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 15 minutes to choose your milestone dates.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Which milestones guests pin against, and the design of your final printed map poster.',
      },
    ],
  },

  'live-roast-board': {
    hero: {
      headline: 'Let them roast you. Safely.',
      subhead: 'Guests submit jokes and burns, you approve what hits the wall, the room votes on the funniest one.',
    },
    scene:
      "The board goes live during dinner and the submissions start immediately — someone brings up the time the groom cried during a dog food commercial, someone else drags up the bride's karaoke incident from 2019. You're approving them from your phone between bites, laughing at the ones you'd forgotten, holding back the ones that go too far. The best one gets voted up by the room, and the person behind it gets called up to say it to your face.",
    howItWorks: {
      setup: {
        time: '~5 minutes',
        detail: "Barely any setup — just decide who's moderating, you two or your MC, and we do the rest.",
      },
      guests: {
        detail:
          "Guests submit anonymously or by name from their phones; nothing posts until you or your MC approves it.",
      },
      keepsake: {
        artifact: 'Every submission, approved or not',
        detail: 'You keep the full record — every joke that made the wall, and the ones that almost did.',
      },
    },
    bigScreen:
      "Approved roasts post to the display wall in real time with a laugh/heart reaction count, and the crowd's favorite rises to the top.",
    isThisYou: [
      'You have a friend group that roasts each other as a love language and you want to give them a stage.',
      "You'd rather moderate a screen than sit through an unscripted open mic.",
      'You can take a joke — and you want the room to know it.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 5 minutes — you just pick who\'s moderating on the day.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Whether submissions are anonymous or named, and whether bride-roasts and groom-roasts run as separate boards.',
      },
    ],
  },

  'unpopular-opinions': {
    hero: {
      headline: 'Find out if the room sides with the bride or the groom.',
      subhead: 'You pre-load your real unpopular opinions. Guests vote live. The results don\'t lie.',
    },
    scene:
      "Cocktail hour, and the first opinion drops on everyone's phone: 'pineapple belongs on pizza.' The groom's stance is public. Guests vote, and the results split the room instantly — someone at the bar is visibly betrayed. The next one's about mornings versus evenings, then whether The Office is overrated, and now two strangers at different tables are arguing about it like old friends. By the time dinner starts, half the guest list has an opinion about your opinions.",
    howItWorks: {
      setup: {
        time: '~15 minutes',
        detail: 'You submit 10–15 real unpopular opinions with your actual stance on each. We build the voting flow.',
      },
      guests: {
        detail: 'Guests vote agree or disagree from their phones, no download — results update live as votes come in.',
      },
      keepsake: {
        artifact: 'The final vote tally on every opinion',
        detail: 'You keep a record of exactly where your guests landed on each take — proof of who\'s really on your side.',
      },
    },
    bigScreen:
      "Live results display as a split bar or gauge after each opinion closes, showing the room's verdict in real time.",
    isThisYou: [
      'You two actually have opinions — the kind that start arguments at dinner parties.',
      'You want an icebreaker that reveals personality instead of a generic conversation topic.',
      'Your guest list needs zero warm-up time to start debating with strangers.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 15 minutes to write your opinions and set your stances.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'The opinions themselves, and whether guests can submit their own for you to react to live.',
      },
    ],
  },

  'first-dance-ballot': {
    hero: {
      headline: "Your guests don't know which first dance is real.",
      subhead: 'Three options, one live vote, a countdown clock — the winner is the dance you actually perform.',
    },
    scene:
      "Three options appear on the screen during dinner: a slow waltz, something nobody's expecting, and a fully choreographed routine you've been secretly rehearsing for months. The countdown starts. Guests huddle at their tables, debating, voting, watching the tally shift in real time. At zero, the room goes quiet for the reveal — and however it lands, you're both already walking to the floor.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail:
          'You prepare (or pretend to prepare) three options with a teaser description for each. We build the live vote and countdown.',
      },
      guests: {
        detail: 'Guests vote from their phones before the countdown hits zero — no download, results update live.',
      },
      keepsake: {
        artifact: 'The full vote breakdown',
        detail: 'You keep the final tally — proof of exactly how close, or not, the room came to picking differently.',
      },
    },
    bigScreen:
      'A live vote counter and countdown clock build tension on the wall, then a fanfare reveal announces the winning dance.',
    isThisYou: [
      "You want your first dance to be a moment with real suspense, not just choreography.",
      "You're willing to prep more than one option — even a joke one — for the bit.",
      "You want the whole room invested before you've even taken the floor.",
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes to describe your three options and set the countdown length.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'The number of options, the teaser text for each, and how long the countdown runs.',
      },
    ],
  },

  'wedding-bingo': {
    hero: {
      headline: "They wrote the squares. Now they can't stop watching for them.",
      subhead: "Custom bingo cards with squares only your wedding could produce — 'best man cries during his own toast.'",
    },
    scene:
      "Every guest has a different card, and the squares are all yours — 'flower girl refuses to walk,' 'DJ plays ABBA,' 'someone brings up the group trip to Croatia.' All night, guests are watching everything, phones ready, waiting to tap a square the second it happens. When someone yells bingo during the speeches, half the room checks their own card in disbelief that they missed it.",
    howItWorks: {
      setup: {
        time: '~30 minutes',
        detail:
          'You write 40–60 custom squares specific to your wedding, your people, and your inside jokes. We generate unique cards for every guest.',
      },
      guests: {
        detail:
          'Each guest gets a randomized card on their phone and taps squares as they happen — no download, cheat-proof validation.',
      },
      keepsake: {
        artifact: 'Every card, and who won',
        detail: 'You keep every version of the card that went out, plus a record of who called bingo and when.',
      },
    },
    bigScreen:
      'A live winner announcement flashes on the wall the moment someone gets bingo, with their card displayed for the room to see.',
    isThisYou: [
      "You know exactly who's going to cry, what the DJ's going to play, and who's bringing up which story.",
      'You want guests paying attention to the whole day, not just their phones.',
      "You're comfortable being roasted a little by your own bingo card.",
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 30 minutes to write your 40–60 custom squares.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Every square, how many rounds you run, and whether later rounds get harder squares.',
      },
    ],
  },

  'advice-oracle': {
    hero: {
      headline: "Ask the room. They'll actually tell you.",
      subhead: 'Structured prompts turn your guest book into real, useful advice — displayed live as a scrolling wall.',
    },
    scene:
      "Instead of a guest book nobody reads twice, prompts appear on guests' phones: best advice for a long marriage, a mistake to avoid, something you wish someone had told you. The answers stream onto the wall in real time — some funny, some clearly hard-won. At one point you post a live question of your own — 'we can't agree on where to live, help' — and watch the room actually respond, mid-reception, like a hundred people just became your advisors.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail:
          'You pick which prompts to include from a set of 5–6, and decide if you want the live-question feature. Guests do the rest.',
      },
      guests: {
        detail:
          'Guests answer prompts from their phones throughout the night — no download, responses post to the wall as they come in.',
      },
      keepsake: {
        artifact: "A formatted 'Book of Advice' PDF",
        detail:
          "Every response, curated into a document you can actually reread when you need it — not a guest book that sits in a drawer.",
      },
    },
    bigScreen: 'Responses scroll onto the display wall in a clean, live-feed format as guests submit them.',
    isThisYou: [
      "You want a guest book you'll actually open again, not a keepsake you forget by month two.",
      "You're genuinely curious what your people would tell you about marriage.",
      "You like the idea of crowdsourcing an answer to something you're actually unsure about.",
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes — you just choose which prompts to run.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Which prompts guests see, and whether you can post a live question of your own during the reception.',
      },
    ],
  },

  'relationship-exhibit': {
    hero: {
      headline: "The 'how did you two meet' story, told properly.",
      subhead:
        'A beautifully designed digital exhibit of your relationship — photos, milestones, your own voice — guests explore like a mini-museum.',
    },
    scene:
      "Cocktail hour, and instead of asking each other 'so how did you two meet?' for the tenth time, guests scan a code at the entrance and scroll through it themselves — the timeline, the photos, a voice note of you explaining the terrible first-date restaurant choice. Distant relatives who've never heard the full story get pulled in. Someone finds the hidden chapter you buried three screens deep and texts their table about it.",
    howItWorks: {
      setup: {
        time: '~45 minutes',
        detail: 'You fill in key dates, photos, captions, and optional voice notes. We build it into a scrollable visual exhibit.',
      },
      guests: {
        detail: "Guests scan a code at the entrance and explore the exhibit on their own phone, at their own pace — no download.",
      },
      keepsake: {
        artifact: 'The full exhibit, yours to keep',
        detail:
          'The exhibit stays live and yours after the wedding — a proper archive of your story, not scattered across old texts and camera rolls.',
      },
    },
    bigScreen:
      "None — this one lives on guests' own phones, meant to be explored individually rather than watched as a group.",
    isThisYou: [
      'You have a real story — with real chapters, photos, maybe a voice note or two — and you want it told properly.',
      "Half your guest list doesn't know the full version and you're tired of retelling it.",
      "You want something that outlives the wedding day, not just decorates it.",
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 45 minutes — this is the most content-rich app, and it shows.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Every chapter, photo, and voice note, plus whether guests can leave reactions on each part of the exhibit.',
      },
    ],
  },

  'future-home-map': {
    hero: {
      headline: 'Guests just planned your next ten years.',
      subhead: 'An interactive map fills up live as guests pin places you should go, move to, or never leave.',
    },
    scene:
      "The map starts with a few pins you placed yourselves — the apartment, the spot of your first date, where he proposed. Then guests start adding their own: a restaurant a friend swears by, a neighborhood your college roommate insists you'd love, a park perfect for the kids nobody's mentioned yet but everyone's already imagining. By the end of the night the map is dense with opinions about your future, all of it from people who love you.",
    howItWorks: {
      setup: {
        time: '~15 minutes',
        detail: "You drop a few 'our places' pins to start — the rest fills in from your guests.",
      },
      guests: {
        detail: 'Guests add pins with short notes from their phones throughout the reception, no download.',
      },
      keepsake: {
        artifact: 'An interactive map + printed poster',
        detail:
          'You keep the live map plus an optional printed version — a real bucket-list map of places to go together.',
      },
    },
    bigScreen:
      'The map fills live on the display wall as pins come in, zooming in as clusters form around popular suggestions.',
    isThisYou: [
      "You like the idea of a keepsake that's a map, not a book — something you can actually use to plan a trip.",
      'Your friends have strong opinions about where you should live, eat, or travel.',
      'You want a wedding artifact that keeps being useful years later.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 15 minutes to drop your own starting pins.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Your starting pins, the map region, and the design of your printed poster afterward.',
      },
    ],
  },

  'collaborative-soundtrack': {
    hero: {
      headline: 'Every song comes with the story behind it.',
      subhead: 'Guests request songs and the memory attached — the DJ plays the top votes, the stories play on the wall.',
    },
    scene:
      "A request comes in: 'Dancing Queen' — the memory attached says it played in the car on the way to the lake house, the summer everyone screamed every word with the windows down. The DJ queues it. When it starts, the memory appears on the wall, and the entire lake house table loses it, mid-dance, mid-drink, completely unprompted. Every song that plays for the rest of the night carries someone's story with it.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'Minimal setup — mostly connecting with your DJ so they receive the live queue. Guests supply the songs and stories.',
      },
      guests: {
        detail:
          "Guests submit a song plus a short memory from their phones and vote on others' picks — no download, votes bump songs up the queue.",
      },
      keepsake: {
        artifact: 'The full playlist + every story attached',
        detail: 'You keep the complete list of songs and the memories behind them — a soundtrack you can replay with the stories intact.',
      },
    },
    bigScreen:
      'As each song starts, its submitted memory displays on the wall, turning the dance floor into a running commentary of your people\'s history with you.',
    isThisYou: [
      'You want song requests to mean something instead of just filling the queue.',
      'Your guests have specific memories tied to specific songs and you want those surfaced, not lost.',
      'You want the dance floor to feel like a story unfolding, not just a playlist.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes, mostly coordinating with your DJ.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Whether votes control the queue order, and how memories are displayed alongside each song.',
      },
    ],
  },

  'love-letter-machine': {
    hero: {
      headline: 'Read it together. For the first time. In front of everyone.',
      subhead: 'The Unprompted Love Letter Machine — your guests write one message. You read them live.',
    },
    scene:
      "During cocktail hour, your guests write you a secret message — a memory, a wish, something they've never said out loud. It takes five minutes, then they put their phones away. At dinner, you sit together and read them for the first time, on screen, one by one, at your own pace. Some will make you laugh. Some will wreck you. Most will be from people you didn't expect.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'Almost no setup — just tell us when during the reception you want the reveal moment. Guests write the rest.',
      },
      guests: {
        detail:
          "Guests submit a message via QR code, anonymous by default — no download, five minutes, then they put their phones away.",
      },
      keepsake: {
        artifact: 'Every message, formatted into a keepsake document',
        detail: "After the wedding, every message you read — and the ones you didn't get to — are yours in a formatted document.",
      },
    },
    bigScreen:
      'Messages appear one at a time in large type on the display wall as you read them live, at whatever pace you choose, with the room watching in real time.',
    isThisYou: [
      "You want a moment that's completely unscripted — nobody rehearses this, including you.",
      'You have people in your life — a grandmother, an old friend — whose unscripted words would mean everything.',
      "You're comfortable being surprised, live, in front of your guests.",
    ],
    faq: [
      {
        q: 'Do messages have to be anonymous?',
        a: 'By default, yes — guests can reveal themselves after if they want to. You can also turn anonymity off if you\'d rather know who wrote what.',
      },
      {
        q: 'What if a message is inappropriate?',
        a: "You get a moderation queue before anything goes live — nothing reaches the big screen without your approval.",
      },
      {
        q: 'How long does setup take?',
        a: 'About 10 minutes. Tell us when you want the reveal moment during your reception and we handle the rest.',
      },
      {
        q: "What's customizable?",
        a: 'Who the messages can be addressed to (her, him, or both), when the reveal happens, and the design of the keepsake document you receive after.',
      },
    ],
  },

  'emotion-pulse': {
    hero: {
      headline: 'Watch the whole room feel it, in real time.',
      subhead: 'Guests log how they\'re feeling throughout the day — the aggregate becomes a live pulse you keep forever.',
    },
    scene:
      "A gentle prompt lands on guests' phones during the ceremony: how are you feeling right now? A tap, two seconds, done. It happens again during cocktail hour, again during the speeches, again during your first dance. Nobody notices the pattern forming until later — a graph, quiet, building all day, spiking hardest during the vows and the first dance. You won't see it in the moment. You'll see it after, and it'll say more about the day than any photo does.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'You choose which moments trigger a prompt — ceremony, cocktail hour, dinner, dancing. We handle the rest.',
      },
      guests: {
        detail:
          'Guests opt in when they scan the event QR and respond with a simple emotion picker, five to six times over the day — no download.',
      },
      keepsake: {
        artifact: "A 'day in feelings' graph",
        detail:
          "You receive an infographic of the crowd's emotional pulse across the whole day — a keepsake that gets more moving the longer you have it.",
      },
    },
    bigScreen:
      "An optional live pulse visualization can run during the reception, showing the room's collective mood shift in real time.",
    isThisYou: [
      'You like data and want an unusual, honest artifact from your wedding — not just photos.',
      'You want proof, later, of exactly when the room felt it most.',
      'You\'re drawn to keepsakes that reveal themselves slowly rather than all at once.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes to choose which parts of the day trigger a prompt.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Which moments trigger a prompt, and whether the live pulse visualization runs during your reception.',
      },
    ],
  },

  'secret-relay': {
    hero: {
      headline: 'Strangers at table one just dared strangers at table four.',
      subhead: 'Tables pass dares to each other in a chain — completed, photographed, and passed on.',
    },
    scene:
      "Table one submits a dare for whoever's next: do your best rendition of the couple's first dance in ten seconds. Table four gets it, groans, does it anyway, photographs the results, and writes a new dare for table seven. By the end of cocktail hour, tables that started the night as strangers have a shared photo and a story that didn't exist an hour ago — and the wall is full of proof.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail:
          'You decide the routing — random, or you can pair specific tables on purpose (bride\'s college friends dare groom\'s coworkers).',
      },
      guests: {
        detail: 'Each table writes a dare, the next table completes it and uploads a photo — no download, all from the browser.',
      },
      keepsake: {
        artifact: 'Every dare and every photo, in sequence',
        detail: 'You keep the full chain — every dare, every completed photo — as a record of tables meeting tables.',
      },
    },
    bigScreen: 'Completed dares and their photos post to the display wall as they come in, building a visible chain across the room.',
    isThisYou: [
      "You have tables of guests who genuinely don't know each other and want them to.",
      "You like a little chaos, as long as it's structured.",
      'You want photo evidence of connections that only happened because of your wedding.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes to decide how tables get routed to each other.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'How tables are paired, and whether the routing is random or chosen by you.',
      },
    ],
  },

  'cocktail-quiz': {
    hero: {
      headline: 'Every cocktail on the menu is named after a moment in your story.',
      subhead: 'A short quiz matches guests to a personalized drink — and the story behind it.',
    },
    scene:
      "Guests arrive and take a thirty-second quiz — morning or night person, city or countryside — and get matched to a drink from your custom menu. Someone gets 'The Proposal Punch' and reads the story behind it: Lisbon, a ring you almost dropped into the harbor. Someone else gets 'The First Date Fizz' and immediately asks what happened on that date. By the time everyone's holding a drink, half the room is trading quiz results at the bar.",
    howItWorks: {
      setup: {
        time: '~30 minutes',
        detail: 'You build the drink menu — names, short stories, and which quiz answers map to which drink.',
      },
      guests: {
        detail: 'Guests take the quiz on arrival and get their recommended drink with its story — no download, straight from their phone.',
      },
      keepsake: {
        artifact: 'The full drink menu + story set',
        detail: 'You keep the complete menu, stories included — a fun artifact and a genuinely usable one at your next dinner party.',
      },
    },
    bigScreen:
      'An optional live dashboard shows bartenders which drinks are trending, and guests can share their result to a social wall.',
    isThisYou: [
      "You've got real stories behind real moments — a proposal city, a first-date disaster — worth naming a drink after.",
      'You want cocktail hour to double as a way of sharing your story.',
      'Your bar setup can support a small custom menu.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 30 minutes to build your drink menu and quiz mapping.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Every drink name and story, the quiz questions, and whether bartenders see a live trending dashboard.',
      },
    ],
  },

  'parallel-universe': {
    hero: {
      headline: "What would have happened if you'd never met?",
      subhead: 'Guests imagine the alternate universe — then you reveal how close you actually came to missing each other.',
    },
    scene:
      "During dinner, guests submit their theory: what would have happened to the two of you if you'd never met? Someone thinks he'd have married his college roommate's ex. Someone else thinks she'd have moved to New York and become someone neither of you would recognize. The best ones get read aloud — funny, a little absurd, a little too accurate — and then you tell the real story: how close you actually came to never meeting at all. It's always more dramatic than anyone guessed.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'You prepare your real \'how we almost didn\'t meet\' story to reveal after — guests supply the rest.',
      },
      guests: {
        detail: 'Guests submit a parallel-universe scenario capped at 150 characters — no download, forces creativity.',
      },
      keepsake: {
        artifact: 'Every submission, kept',
        detail: 'All the alternate universes your guests imagined, collected into a keepsake document alongside your real story.',
      },
    },
    bigScreen:
      'Selected submissions appear on the display wall one at a time during dinner, building to your real story as the final reveal.',
    isThisYou: [
      "You actually have a good 'almost didn't meet' story and want a reason to tell it.",
      'Your guests are creative enough to make this funny, not just filled in.',
      "You want a dinner moment that's genuinely surprising, not just sentimental.",
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes to prepare the real story you\'ll reveal at the end.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'The character limit on submissions, and how many entries get read aloud before your reveal.',
      },
    ],
  },

  'who-said-it': {
    hero: {
      headline: 'The room votes. The couple squirms. Grandma wins.',
      subhead:
        '20 real texts and photos from your relationship. Blurred sender. Your guests guess — his side vs her side vs the people who introduced you.',
    },
    scene:
      "Dinner plates are cleared, the MC picks up the mic, and the big screen lights up with a single text bubble — sender blurred. Every phone in the room turns into a two-button buzzer: his side, her side. Cousins argue at table three. Your college roommate is quietly pulling ahead. The screen reveals it was you at 2 a.m. in 2021, and Aunt Denise loses her mind because she called it. Nobody looks at their phone for more than five seconds at a time. Everyone looks at everyone else.",
    howItWorks: {
      setup: {
        time: '~90 minutes',
        detail:
          "You send us the material — screenshots, photos, memorable one-liners you've said out loud, plus a rough date on each. Ideally over a shared bottle of wine. We handle the layout, the chronology, the blur.",
      },
      guests: {
        detail:
          "Guests scan the QR at their seat, enter their name, tap his side / her side / mutual, and pick their relationship from a preset list — bridesmaid, groom's coworker, aunt. Done in 20 seconds. Two taps per message from then on.",
      },
      keepsake: {
        artifact: 'A private archive + a printed A5 card',
        detail:
          "A private URL of every message, every vote, every score — yours forever — plus a printed A5 card with the family-vs-family final tally and the 'who knew you best' award, mailed with your thank-you notes. Full chapbook available as a paid add-on.",
      },
    },
    bigScreen:
      "The current message with the sender blurred. Live vote tally bars filling in real time. Corner leaderboard: His Side 34 · Her Side 31 · Mutual 28. A streak callout when someone catches fire — 'Aunt Denise: 5 in a row.' The screen is the show. Phones are just the buzzer.",
    isThisYou: [
      'You have a group chat, a screenshot habit, and at least one legendary text neither of you will ever live down.',
      'Half the room would say "honestly, how are you two together" — affectionately.',
      "The idea of your uncle reading your text messages doesn't make you flinch. (If it does — see the spicy round setting.)",
    ],
    questionTypes: [
      {
        title: 'Texts',
        description:
          'The 20 messages that got you here. Blurred sender. Two taps to guess.',
      },
      {
        title: 'Photos',
        description:
          'A blurry photo of a genuinely terrible lasagna. Whose kitchen? Vote.',
      },
      {
        title: 'Spoken quotes',
        description:
          'The line your dad said the first time he met her. Was it him — or was it her dad?',
      },
      {
        title: 'Bonus layers',
        description:
          "After each vote, an optional 'guess the year' slider. Or the room votes on the context. Extra points for the brave.",
      },
      {
        title: 'The spicy round',
        locked: true,
        description:
          "Six messages the parents don't get to see. Passkey shared at the friends' tables only. Fully skippable.",
      },
    ],
    scoreboard: {
      threeWay: [
        { label: 'His Side', score: 34 },
        { label: 'Her Side', score: 31 },
        { label: 'Mutual', score: 28 },
      ],
      individualNote:
        'Individual leaderboard runs alongside — top 5 on the big screen, full list on every phone. Streak callouts light up when someone catches fire.',
      subLeaderboardsNote:
        'Sub-leaderboards for any group you name — the college crew, the coworkers, the neighbours who watched you fall in love from across the hall.',
      copy:
        'We built this app because "who knows the couple best" is the funniest ongoing question at every wedding. Now it has a scoreboard.',
    },
    chronology: {
      headline: 'First-week flirty to last-week grocery list.',
      description:
        'Chronological order matters. Guests hear your voice change across 4 years in 10 minutes. Nobody plans that arc — it just happens when you line the messages up.',
    },
    whyNotPaper: {
      paper:
        "A card-based reveal is very close to as fun. The MOH holds up a printed screenshot, the room shouts a guess, someone keeps score on a napkin. It works — and if that's your vibe, we'll tell you and send you to a good stationer.",
      app: "The family-vs-family leaderboard updating live. The 'room agrees' stat that tells you the crowd converged on the wrong answer. Streak callouts. A private digital archive of every message, every vote, every score — yours forever. Sub-leaderboards by group. A passkey-gated spicy round the parents structurally can't see.",
      verdict:
        "Worth the app if you want the live scoreboard and the family-vs-family bragging rights. Otherwise a good MOH with a deck of cards gets you 80% of the way.",
    },
    makeItYours: {
      intro:
        "Everything on this page is a starting point, not a spec. Because we build every Wepho app from scratch for one couple, every element is negotiable.",
      swaps: [
        {
          title: 'Content',
          detail:
            "Don't like text screenshots? We can build the whole thing around voicemails, handwritten notes, or 20 photos of the same broken kitchen appliance you keep sending each other.",
        },
        {
          title: 'Flow',
          detail:
            "Don't want three-way scoring? Do individual only, or bride's-team vs groom's-team, or 'everyone vs the couple.' Don't want a spicy round? We remove it entirely.",
        },
        {
          title: 'Reveal',
          detail:
            "The two-tap vote can become a slider, a ranking, or a 'confidence bet' where points scale with how sure you were.",
        },
        {
          title: 'Big screen',
          detail:
            'We design the display to match your venue — dark room with the screen as centerpiece, ambient side-screens, or a projection on the dance floor.',
        },
      ],
      examples: [
        "One couple replaced texts with lines from their favorite sitcom that either of them had quoted at each other in the wild.",
        "Another used only messages from their group chat with the wedding party — team-guess-team.",
      ],
      tagline:
        "This app template exists because it works. Yours won't look exactly like it. That's the point.",
    },
    setupEffort: {
      timeFromYou:
        '~90 minutes curating messages, plus 15 minutes per bonus round you want.',
      weHandle:
        'Blurring sender bubbles, iMessage/Android styling consistency, chronology, spicy-round separation, the passkey UX, and a pre-wedding review dashboard so nothing shows up on the big screen you haven\'t seen first.',
      optional:
        'A 10-minute call with your MC to draft the inter-round commentary so between-round patter is actually funny, not filler.',
    },
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      {
        q: "What if a guest gets a message wrong that's obviously their own text?",
        a: 'We flag it for you in the review dashboard before the night. You can pull it or leave it in — comedy gold either way.',
      },
      {
        q: 'Can we skip the spicy round entirely?',
        a: 'Yes. One setting, no code exists, nobody knows it was ever an option.',
      },
      {
        q: 'Do we get the raw vote data?',
        a: 'Yes. Every message, every vote, every score lives at a private URL that stays yours forever — part of the default keepsake.',
      },
    ],
  },
}

const emptyExtended = {
  hero: {},
  scene: '',
  howItWorks: {},
  bigScreen: '',
  isThisYou: [],
  faq: [],
  questionTypes: [],
  scoreboard: null,
  chronology: null,
  setupEffort: null,
  makeItYours: null,
  whyNotPaper: null,
}

export const apps = rawApps.apps.map((app) => ({
  ...app,
  extended: { ...emptyExtended, ...extendedContent[app.slug] },
}))
