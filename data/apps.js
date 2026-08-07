import rawApps from '../zz/wed-apps/20-apps.json' with { type: 'json' }

const NO_DOWNLOAD_A =
  "No. Guests scan a QR code and everything happens in their phone's browser. Nothing to install, nothing to log into."

const FAILS_A =
  'We test the whole flow before we hand it off, and we stay reachable during your reception if anything comes up.'

const extendedContent = {
  'couple-trivia': {
    hero: {
      headline: 'How well do your guests actually know you?',
      subhead:
        "One live game, played by the whole room at once. A host reads each question aloud on the mic, the same question hits every phone at the same moment, and the leaderboard on the big screen moves together. Your first date, who said 'I love you' first, what he said when he proposed. Winner gives a toast.",
    },
    scene:
      "Dinner is winding down. Someone taps a water glass, but instead of a toast, a countdown fills the big screen and a host lifts the mic. Question one, the same one on every phone in the room at the same second. Fifteen questions, all about you two, everyone answering together against one shared clock: where you had your first kiss, what she said when he proposed, which one of you cried at the vow rehearsal. The whole room locks in, groans, and laughs on the same beat. Table six is convinced they know everything. They're wrong about question four. By the final leaderboard flip, the entire room is arguing about who actually knows you best, and the winner is walking to the mic.",
    howItWorks: {
      setup: {
        time: '~20 minutes',
        detail:
          'You write your own questions and answers: the real ones, plus a few funny wrong options. Add photos if you want, and pick who hosts: your MC, or one of you on the mic. We build the rest.',
      },
      guests: {
        detail:
          'Everyone scans a QR code once, no app to download, then plays together in sync. The host reads each question aloud, it appears on every phone at the same moment, and a shared countdown moves the whole room from one question to the next, so nobody races ahead or falls behind.',
      },
      keepsake: {
        artifact: 'A private results page, live forever',
        detail:
          'A shareable URL with the final leaderboard, every question, and how the room answered each one. Send it to whoever wants to argue their placement.',
      },
    },
    bigScreen:
      "The big screen runs the show: the current question and its countdown for the whole room, then the live leaderboard climbing and swapping between rounds, with your photos woven in. Everyone watches the same screen and moves together. It's the shared centerpiece, not something each table follows on its own.",
    deviceScenes: {
      phone: {
        layout: 'vote',
        eyebrow: 'Round 1 · Question 4',
        prompt: 'What did Simone say when Jack got down on one knee?',
        options: ['Are you kidding me?', 'Wait, is this real?', 'Yes. Obviously.', 'Get up, you’re on one knee!'],
        selectedIndex: 2,
        countdown: 12,
        questionIndex: 4,
        questionTotal: 15,
        score: '3/3',
      },
      bigScreen: {
        layout: 'leaderboard',
        title: 'Round 4 · Live standings',
        subtitle: 'Who knows Simone & Jack best?',
        rows: [
          { rank: 1, name: 'Table 6 · Aunt Rae', score: 41 },
          { rank: 2, name: 'Table 3 · Devon', score: 39 },
          { rank: 3, name: 'Table 2 · Priya', score: 37 },
          { rank: 4, name: 'Table 6 · Marcus', score: 34 },
          { rank: 5, name: 'Table 1 · Uncle Ben', score: 31 },
        ],
        footer: '15 questions · 8 minutes · winner gives the next toast',
      },
    },
    isThisYou: [
      "You have specific, funny, or surprising stories you want guests to guess at, not just 'how did we meet.'",
      'You want a moment with real stakes: a winner, a toast, a leaderboard everyone can see.',
      'You want the whole room doing one thing together, on the same question at the same time. Not a game each table plays at its own pace.',
      'Your guest list mixes people who know you at different depths (college friends, work colleagues, family), and you want them all competing on equal footing.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      {
        q: 'Does everyone play at the same time?',
        a: "Yes, that's the whole point. It's one synchronized game hosted from the mic, not a quiz each table does at its own pace. The host reads every question aloud, the same question hits every phone at once, and a shared countdown keeps the entire room on the same beat.",
      },
      {
        q: 'How long does setup take?',
        a: 'About 20 minutes to write your questions and answers. We handle the build, the branding, and the live leaderboard.',
      },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Every question, every photo, the colors, who hosts on the mic, and whether you two answer live alongside your guests.',
      },
    ],
  },

  'venue-scavenger-hunt': {
    hero: {
      headline: 'Cocktail hour becomes a treasure hunt through your love story.',
      subhead:
        'Hidden QR codes around the venue unlock chapters of how you met. Guests explore the room to piece it together.',
    },
    scene:
      "Cocktail hour, and instead of hovering near the bar, guests are wandering, checking behind the photo wall, near the garden, by the spot where you're taking your first look. Each QR code unlocks a chapter: the story of your first date, the trip where things got serious, the proposal. Groups form around phones, comparing what they've found. By the time dinner is called, half the room has pieced together your whole story, and the last chapter, hidden hardest to find, reveals a message from the two of you.",
    howItWorks: {
      setup: {
        time: '~30 minutes',
        detail:
          'You write the chapters of your story with photos and pick where each one lives at your venue. We handle the QR codes and the chapter-tracking.',
      },
      guests: {
        detail:
          "Guests scan codes around the venue at their own pace. No app, just their phone's camera. Their progress saves as they go.",
      },
      keepsake: {
        artifact: 'A private replay of the hunt',
        detail:
          'A URL that recreates the hunt in your browser: every chapter in order, plus who found what first. You can walk anyone through your story later without them ever setting foot at the venue.',
      },
    },
    bigScreen:
      'An optional live map of the venue lights up as chapters get discovered, showing which parts of your story the room has found, and which ones are still waiting.',
    deviceScenes: {
      phone: {
        layout: 'chapter',
        chapter: 3,
        total: 8,
        title: 'Chapter three · The Lisbon spring',
        body: 'The trip where things stopped being casual. A rented scooter neither of them could ride, and the same custard tart four days in a row.',
        photo: '/images/pre/planning-1.jpg',
        nextLabel: 'Find chapter four',
      },
      bigScreen: {
        layout: 'map',
        title: 'Live · chapters unlocked',
        subtitle: '5 of 8 found. The last one is hidden hardest.',
        shape: 'map',
        pins: [
          { x: 12, y: 30, label: 'Chapter 1' },
          { x: 28, y: 62, label: 'Chapter 2' },
          { x: 44, y: 25, label: 'Chapter 3', big: true },
          { x: 60, y: 55, label: 'Chapter 4' },
          { x: 76, y: 40, label: 'Chapter 5' },
          { x: 88, y: 70 },
        ],
        footer: 'Cocktail hour has 22 more minutes on the clock.',
      },
    },
    isThisYou: [
      'Your venue has real texture (corners, a garden, a bar, a spot that means something), and you want guests exploring it.',
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
        'Guests record short video messages sealed until the anniversary you choose, even the ones who might not be there when you open them.',
    },
    scene:
      "During cocktail hour, guests step aside one at a time to record a short video, thirty or forty-five seconds, addressed to your future selves. Some are goofy. Some, like your grandmother's, are quiet and careful, like she's choosing every word. She doesn't tell you what she said. The app seals it. Nobody, not even you, can open it early. Five years from now, or ten, an email arrives, and you sit down together to watch every message for the first time. Including hers.",
    howItWorks: {
      setup: {
        time: '~15 minutes',
        detail:
          "You choose which anniversaries to unlock on: 1st, 5th, 10th, or a custom date. No content to write, this one's all your guests.",
      },
      guests: {
        detail:
          "Guests record directly in their phone's browser. No app, no account. They pick which anniversary their message unlocks on.",
      },
      keepsake: {
        artifact: 'A sealed video capsule, delivered on the date',
        detail:
          'On the anniversary, an email arrives with an unlock link. Every message, watched together for the first time, in a private browser vault that stays open once opened.',
      },
    },
    bigScreen:
      'A simple counter on the display wall shows how many messages have been recorded so far, building anticipation without revealing a word of what\'s inside.',
    deviceScenes: {
      phone: {
        layout: 'submit',
        eyebrow: 'For their 10th',
        prompt: 'Record a message Simone & Jack will hear ten years from tonight.',
        subtitle: 'Sealed until Aug 16, 2036. Not a second before.',
        placeholder: 'Type or hit record. Anything you want them to remember.',
        draft: 'You were still bickering about the seating chart yesterday. I hope by 2036 you\'re still bickering about something equally small.',
        charLimit: 400,
        buttonLabel: 'Seal it',
        toOptions: ['1yr', '5yr', '10yr'],
        toSelected: 2,
      },
      bigScreen: {
        layout: 'aggregator',
        title: 'Sealed tonight',
        headline: '84 messages. None of them yours to open yet.',
        bars: [
          { label: '1st anniversary', count: 22 },
          { label: '5th anniversary', count: 31 },
          { label: '10th anniversary', count: 24 },
          { label: 'Wildcard year', count: 7 },
        ],
        footer: 'Delivered on the date. Not a second before.',
      },
    },
    isThisYou: [
      "You have guests you want to hear from years from now, not just tonight: grandparents, older relatives.",
      "You like the idea of a gift you can't open early, no matter how tempting.",
      'You want a wedding-day artifact that keeps giving you a moment together, on repeat, for decades.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      {
        q: 'How long does setup take?',
        a: 'About 15 minutes. You just choose which anniversaries the capsule unlocks on.',
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
        'During the reception, guests add to your shared bucket list live. You keep the finished list forever.',
    },
    scene:
      "Dinner is underway, and a growing list is projected on the wall: 'go to Japan together,' 'adopt a dog,' 'renew your vows in ten years.' Guests add items from their phones between courses, some serious, some ridiculous, a few clearly inside jokes from your college roommate. By dessert the list is fifty items long, and you're both laughing at what your friends think your life should look like. Weeks later, it arrives as a printed keepsake: the actual to-do list for your marriage, written by everyone who loves you.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'Barely any setup. Just tell us your names and colors. Guests write the content live.',
      },
      guests: {
        detail:
          'Guests submit items from their phones throughout the reception, no download, and watch the list grow on the display wall.',
      },
      keepsake: {
        artifact: 'A living bucket list you can actually check off',
        detail:
          'The finished list lives at a private URL you both share. Tick things off as you do them. Guests can pop back in years later to see how the list they wrote for you is going.',
      },
    },
    bigScreen:
      'The list builds live on the wall as submissions come in, giving guests something to read and react to between courses all night.',
    deviceScenes: {
      phone: {
        layout: 'submit',
        eyebrow: 'Add to their life list',
        prompt: 'One thing Simone & Jack should do before their 40th.',
        subtitle: 'Ambitious, ridiculous, or quiet. All welcome.',
        placeholder: 'Type your addition to their bucket list…',
        draft: 'Rent a house on the Amalfi coast for a month and refuse to check email.',
        charLimit: 140,
        buttonLabel: 'Add to list',
      },
      bigScreen: {
        layout: 'gallery',
        title: 'The list, so far',
        subtitle: '52 things their people think they should do.',
        items: [
          { label: 'Amalfi coast, a full month' },
          { label: 'Learn to sail, both of you' },
          { label: 'Foster a scruffy rescue dog' },
          { label: 'Write letters to your kids before you have them', highlight: true },
          { label: 'Renew vows in 10 yrs, same suit' },
          { label: 'Ride the Trans-Siberian, once' },
          { label: 'Live somewhere warm, one winter' },
          { label: 'Adopt a language, badly' },
          { label: 'Cook every Ottolenghi book' },
        ],
        footer: 'Mailed to the couple as a printed keepsake after the honeymoon.',
      },
    },
    isThisYou: [
      'You want a keepsake that\'s forward-looking, not just a record of the day itself.',
      "Your friends and family are the kind of people who'll write something genuinely thoughtful (or genuinely unhinged) given the chance.",
      'You like the idea of guests shaping your future, not just celebrating your past.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes. This one runs almost entirely on your guests\' contributions.' },
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
      subhead: "QR-code prompts tailored to who's actually sitting there. Not generic icebreakers.",
    },
    scene:
      "Table seven scans their code and gets a prompt about the summer everyone spent chasing the groom around campus. Table three, all cousins, gets asked what the bride was like at nine years old. Nobody's staring at their plate wondering what to say. The questions already know who they're talking to. Laughter breaks out at different tables at different times, each one following its own thread through your life.",
    howItWorks: {
      setup: {
        time: '~20 minutes',
        detail:
          'You tag each table (college friends, groom\'s family, work colleagues) and add a note or two of context. We generate the prompts.',
      },
      guests: {
        detail:
          "Guests scan their table's code and tap through prompts written for exactly who's sitting there. No download.",
      },
      keepsake: {
        artifact: 'A private archive of every prompt, sorted by table',
        detail:
          'A URL with every generated prompt, grouped by table. A quiet record of the conversations you engineered without anyone noticing.',
      },
    },
    bigScreen:
      "None. This one's designed to stay on the table, not the wall, so conversation happens face to face.",
    deviceScenes: {
      phone: {
        layout: 'chapter',
        chapter: 3,
        total: 6,
        title: 'Table 7 · the college crew',
        body: 'Simone said this table has the most photographic evidence against her. So, who owns the most compromising picture, and are you willing to describe it?',
        photo: '/images/cocktail/reaction-1.jpg',
        nextLabel: 'Next prompt',
      },
      bigScreen: {
        layout: 'moment',
        title: 'Cocktail hour',
        headline: 'This one lives at the table, not on the wall.',
        subtitle: 'Every table gets its own thread through Simone & Jack’s story.',
      },
    },
    isThisYou: [
      "Your guest list is a real mix of college friends, family, and coworkers who mostly don't know each other.",
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
        "Guests predict your future (first kid, where you'll live, what you'll still be arguing about) and you score them for decades.",
    },
    scene:
      "Someone at table two is very confident you'll have three kids by 2030. Someone else thinks you'll move to Portugal. Your best man predicts you'll still be arguing about the thermostat in 2040, with his name attached so he can never live it down. The vault seals at midnight. On your first anniversary, and your fifth, and your tenth, and your twenty-fifth, you unlock that year's batch and find out, together, who called it.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: "Almost no setup on your end. This one's driven entirely by what your guests predict.",
      },
      guests: {
        detail:
          'Guests submit predictions from their phones, sorted by how far out they\'re betting: 1, 5, 10, or 25 years.',
      },
      keepsake: {
        artifact: 'A running scorecard, unlocked year by year',
        detail:
          "Each anniversary, that year's predictions unlock inside a private dashboard. Mark them right or wrong. A party game that spans decades, all in one link.",
      },
    },
    bigScreen: 'None during the reception. The reveal happens privately, on your anniversaries, years from now.',
    deviceScenes: {
      phone: {
        layout: 'submit',
        eyebrow: 'Prediction · 5 years out',
        prompt: 'By August 2031, Simone & Jack will…',
        subtitle: 'Signed with your name so they know who to blame.',
        placeholder: 'Kids? A dog? A move? The bet Marcus keeps making?',
        draft: 'Have a chaotic golden retriever named after a wine, and exactly one child.',
        charLimit: 200,
        buttonLabel: 'Seal prediction',
        toOptions: ['1yr', '5yr', '10yr', '25yr'],
        toSelected: 1,
      },
      bigScreen: {
        layout: 'aggregator',
        title: 'The vault · sealed tonight',
        headline: 'What the room bet on Simone & Jack.',
        bars: [
          { label: 'Kids by 2028', pct: 72 },
          { label: 'Move out of the city', pct: 41 },
          { label: 'Get a dog before a kid', pct: 58 },
          { label: 'Still arguing about the thermostat', pct: 91 },
        ],
        footer: 'Unlocks year by year. Nobody sees who bet what, until then.',
      },
    },
    isThisYou: [
      'You like the idea of a wedding gift that keeps arriving, one anniversary at a time.',
      'Your friends are funny enough to make good bets and petty enough to hold you to them.',
      'You want something that gives you and your guests a reason to reconnect years later.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes. You\'re mostly just deciding when each round unlocks.' },
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
        'Guests pin where they were on the day you met, got engaged, or said yes, live, on a map, during the reception.',
    },
    scene:
      "The screen shows a world map, dark, waiting. Guests pin their location for the day you had your first date (Stockholm, where you were) and one by one, dots appear. A friend from your gap year in Buenos Aires. A cousin in Berlin. Your college roommate in Tokyo who couldn't make the flight but wanted to be there anyway. By the end of cocktail hour, the map is full of light, and it's the first time anyone in the room has actually seen how far your people reached to be part of this.",
    howItWorks: {
      setup: {
        time: '~15 minutes',
        detail: 'You pick a few milestone dates (first date, engagement, whatever matters) and we build the map around them.',
      },
      guests: {
        detail: 'Guests drop a pin and a short note for each milestone, straight from their phone, no download.',
      },
      keepsake: {
        artifact: 'An interactive world map, yours forever',
        detail:
          "A private URL of the finished map. Click any pin to read that guest's note about where they were. Zoomable, shareable, and it doesn't fade in a frame.",
      },
    },
    bigScreen:
      'Pins populate a live world map on the display wall as guests submit them, with an optional flyover animation once the map fills in.',
    deviceScenes: {
      phone: {
        layout: 'submit',
        eyebrow: 'Milestone · their first date',
        prompt: 'Where were you the night Simone & Jack met?',
        subtitle: 'Drop a pin and a line. Watch the map fill in live.',
        placeholder: 'Type your city, or tap it on the map…',
        draft: 'Buenos Aires. Hearing about you both from Priya over a bad pisco sour.',
        charLimit: 160,
        buttonLabel: 'Drop pin',
      },
      bigScreen: {
        layout: 'map',
        title: 'Milestone · the first date',
        subtitle: 'Where their people were, the night they met.',
        shape: 'map',
        pins: [
          { x: 22, y: 34, label: 'Stockholm', big: true },
          { x: 38, y: 28 },
          { x: 46, y: 40 },
          { x: 52, y: 25, label: 'Berlin' },
          { x: 60, y: 55 },
          { x: 68, y: 62, label: 'Buenos Aires' },
          { x: 82, y: 30, label: 'Tokyo' },
          { x: 90, y: 42 },
        ],
        footer: 'A pin for every person who traveled, literally or otherwise, to be here.',
      },
    },
    isThisYou: [
      'You have guests scattered across cities, countries, or continents and want that distance to feel visible.',
      "You want a moment that's quietly moving rather than loud, something guests notice slowly.",
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
      "The board goes live during dinner and the submissions start immediately. Someone brings up the time the groom cried during a dog food commercial, someone else drags up the bride's karaoke incident from 2019. You're approving them from your phone between bites, laughing at the ones you'd forgotten, holding back the ones that go too far. The best one gets voted up by the room, and the person behind it gets called up to say it to your face.",
    howItWorks: {
      setup: {
        time: '~5 minutes',
        detail: "Barely any setup. Just decide who's moderating (you two or your MC), and we do the rest.",
      },
      guests: {
        detail:
          "Guests submit anonymously or by name from their phones; nothing posts until you or your MC approves it.",
      },
      keepsake: {
        artifact: 'Every submission, approved or not, in a private archive',
        detail:
          'A URL of the full record: the jokes that made the wall and the ones the moderator held back. Read it back on your first anniversary, when you can finally admit which ones were the funniest.',
      },
    },
    bigScreen:
      "Approved roasts post to the display wall in real time with a laugh/heart reaction count, and the crowd's favorite rises to the top.",
    deviceScenes: {
      phone: {
        layout: 'submit',
        eyebrow: 'Roast Jack · 20 words',
        prompt: 'One thing about Jack the room needs to hear right now.',
        subtitle: 'Anonymous. Reviewed before it hits the wall.',
        placeholder: 'The bit even Simone doesn\'t know yet…',
        draft: 'Jack once wore socks with sandals to a job interview and got the job. That is his entire brand.',
        charLimit: 140,
        buttonLabel: 'Send it in',
      },
      bigScreen: {
        layout: 'feed',
        title: 'The Roast · live from your friends',
        quote: 'Jack once wore socks with sandals to a job interview. He got the job. That is his entire brand.',
        attribution: 'Devon · best man',
        subtitle: '3 more waiting in the moderation queue.',
        footer: 'Read once. Then retired forever.',
      },
    },
    isThisYou: [
      'You have a friend group that roasts each other as a love language and you want to give them a stage.',
      "You'd rather moderate a screen than sit through an unscripted open mic.",
      'You can take a joke, and you want the room to know it.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 5 minutes. You just pick who\'s moderating on the day.' },
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
      "Cocktail hour, and the first opinion drops on everyone's phone: 'pineapple belongs on pizza.' The groom's stance is public. Guests vote, and the results split the room instantly. Someone at the bar is visibly betrayed. The next one's about mornings versus evenings, then whether The Office is overrated, and now two strangers at different tables are arguing about it like old friends. By the time dinner starts, half the guest list has an opinion about your opinions.",
    howItWorks: {
      setup: {
        time: '~15 minutes',
        detail: 'You submit your real unpopular opinions with your actual stance on each. We build the voting flow.',
      },
      guests: {
        detail: 'Guests vote agree or disagree from their phones, no download. Results update live as votes come in.',
      },
      keepsake: {
        artifact: 'A private results dashboard',
        detail:
          "A URL with the final vote on every opinion, broken down by table if you want it. Proof, in charts, of exactly who's on your side.",
      },
    },
    bigScreen:
      "Live results display as a split bar or gauge after each opinion closes, showing the room's verdict in real time.",
    deviceScenes: {
      phone: {
        layout: 'pulse',
        eyebrow: 'Opinion 4 of 12',
        prompt: '“A destination wedding is always a little selfish.”',
        subtitle: 'Slide to where you land. Anonymously.',
        emoji: '🌴',
        leftLabel: 'Strong disagree',
        rightLabel: 'Strong agree',
        position: 0.68,
        liveNote: '38 guests have voted so far.',
      },
      bigScreen: {
        layout: 'aggregator',
        title: 'Live · opinion 4 of 12',
        headline: '“A destination wedding is always a little selfish.”',
        bars: [
          { label: 'Strong disagree', pct: 12 },
          { label: 'Disagree', pct: 24 },
          { label: 'Agree', pct: 41 },
          { label: 'Strong agree', pct: 23 },
        ],
        footer: 'The room disagrees with itself. Perfect.',
      },
    },
    isThisYou: [
      'You two actually have opinions. The kind that start arguments at dinner parties.',
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
      subhead: 'Three options, one live vote, a countdown clock. The winner is the dance you actually perform.',
    },
    scene:
      "Three options appear on the screen during dinner: a slow waltz, something nobody's expecting, and a fully choreographed routine you've been secretly rehearsing for months. The countdown starts. Guests huddle at their tables, debating, voting, watching the tally shift in real time. At zero, the room goes quiet for the reveal, and however it lands, you're both already walking to the floor.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail:
          'You prepare (or pretend to prepare) three options with a teaser description for each. We build the live vote and countdown.',
      },
      guests: {
        detail: 'Guests vote from their phones before the countdown hits zero. No download, results update live.',
      },
      keepsake: {
        artifact: 'The final tally, saved as a live results page',
        detail:
          'A URL with the full vote breakdown. Proof of how close, or not, the room came to picking a different first-dance song.',
      },
    },
    bigScreen:
      'A live vote counter and countdown clock build tension on the wall, then a fanfare reveal announces the winning dance.',
    deviceScenes: {
      phone: {
        layout: 'vote',
        eyebrow: 'Vote · the first dance',
        prompt: 'Which song do Simone & Jack dance to first?',
        options: [
          'At Last, by Etta James',
          'Can’t Help Falling in Love, by Elvis',
          'Harvest Moon, by Neil Young',
          'Make You Feel My Love, by Adele',
        ],
        selectedIndex: 2,
        countdown: 18,
        countdownTotal: 30,
      },
      bigScreen: {
        layout: 'leaderboard',
        title: 'Live tally · first dance',
        subtitle: 'The room picks the song. They pick the moment.',
        rows: [
          { rank: 1, name: 'Harvest Moon, by Neil Young', score: 48 },
          { rank: 2, name: 'At Last, by Etta James', score: 34 },
          { rank: 3, name: 'Can’t Help Falling in Love, by Elvis', score: 22 },
          { rank: 4, name: 'Make You Feel My Love, by Adele', score: 16 },
        ],
        footer: 'Voting closes in 4 minutes.',
      },
    },
    isThisYou: [
      "You want your first dance to be a moment with real suspense, not just choreography.",
      "You're willing to prep more than one option (even a joke one) for the bit.",
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
      subhead: "Custom bingo cards with squares only your wedding could produce. 'Best man cries during his own toast.'",
    },
    scene:
      "Every guest has a different card, and the squares are all yours: 'flower girl refuses to walk,' 'DJ plays ABBA,' 'someone brings up the group trip to Croatia.' All night, guests are watching everything, phones ready, waiting to tap a square the second it happens. When someone yells bingo during the speeches, half the room checks their own card in disbelief that they missed it.",
    howItWorks: {
      setup: {
        time: '~30 minutes',
        detail:
          'You write your own custom squares specific to your wedding, your people, and your inside jokes. We generate unique cards for every guest.',
      },
      guests: {
        detail:
          'Each guest gets a randomized card on their phone and taps squares as they happen. No download, cheat-proof validation.',
      },
      keepsake: {
        artifact: 'A private archive of every card and every call',
        detail:
          "A URL with every card that went out, who called bingo, and when. A weirdly detailed record of your reception's dumbest, most fun moment.",
      },
    },
    bigScreen:
      'A live winner announcement flashes on the wall the moment someone gets bingo, with their card displayed for the room to see.',
    deviceScenes: {
      phone: {
        layout: 'picker',
        eyebrow: 'Your card · Table 6',
        prompt: 'Tap when you see it happen.',
        subtitle: 'First to five in a row shouts BINGO.',
        items: [
          { label: 'Jack cries at vows', selected: true },
          'Aunt Rae dance move',
          { label: 'Ring dropped', selected: true },
          'Uncle Ben speech',
          { label: 'FREE · you’re here', selected: true },
          'Kid steals cake',
          'Slow dance to fast song',
          { label: 'DJ misreads room', selected: true },
          'Groomsman shirt off',
        ],
        columns: 3,
        footer: 'You’re one away.',
      },
      bigScreen: {
        layout: 'leaderboard',
        title: 'Reception bingo · standings',
        subtitle: 'BINGO · Aunt Rae, Table 6',
        rows: [
          { rank: 1, name: 'Aunt Rae · Table 6', score: 5 },
          { rank: 2, name: 'Priya · Table 2', score: 4 },
          { rank: 3, name: 'Devon · Table 3', score: 4 },
          { rank: 4, name: 'Marcus · Table 6', score: 3 },
        ],
        footer: 'Next card wins a slow dance with the DJ.',
      },
    },
    isThisYou: [
      "You know exactly who's going to cry, what the DJ's going to play, and who's bringing up which story.",
      'You want guests paying attention to the whole day, not just their phones.',
      "You're comfortable being roasted a little by your own bingo card.",
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 30 minutes to write your custom squares.' },
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
      subhead: 'Structured prompts turn your guest book into real, useful advice, displayed live as a scrolling wall.',
    },
    scene:
      "Instead of a guest book nobody reads twice, prompts appear on guests' phones: best advice for a long marriage, a mistake to avoid, something you wish someone had told you. The answers stream onto the wall in real time. Some funny, some clearly hard-won. At one point you post a live question of your own ('we can't agree on where to live, help') and watch the room actually respond, mid-reception, like a hundred people just became your advisors.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail:
          'You pick which prompts to include from a curated set, and decide if you want the live-question feature. Guests do the rest.',
      },
      guests: {
        detail:
          'Guests answer prompts from their phones throughout the night. No download. Responses post to the wall as they come in.',
      },
      keepsake: {
        artifact: 'A searchable "Book of Advice," private URL',
        detail:
          'Every response, organized and searchable at your own private link. Pull it up on a bad Tuesday five years in and actually find the answer.',
      },
    },
    bigScreen: 'Responses scroll onto the display wall in a clean, live-feed format as guests submit them.',
    deviceScenes: {
      phone: {
        layout: 'submit',
        eyebrow: 'Best advice for their first year',
        prompt: 'What do Simone & Jack need to know?',
        subtitle: 'One line. The room reads them all night.',
        placeholder: 'What you wish someone had told you…',
        draft: 'Never let the small argument go to bed. The big one can wait until morning.',
        charLimit: 180,
        buttonLabel: 'Send to the oracle',
      },
      bigScreen: {
        layout: 'feed',
        title: 'The Oracle · advice from the room',
        quote: 'Never let the small argument go to bed. The big one can wait until morning.',
        attribution: 'Priya · Simone’s side',
        subtitle: '84 more pieces of advice waiting tonight.',
        footer: 'One quote at a time · all night',
      },
    },
    isThisYou: [
      "You want a guest book you'll actually open again, not a keepsake you forget by month two.",
      "You're genuinely curious what your people would tell you about marriage.",
      "You like the idea of crowdsourcing an answer to something you're actually unsure about.",
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes. You just choose which prompts to run.' },
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
        'A beautifully designed digital exhibit of your relationship (photos, milestones, your own voice) that guests explore like a mini-museum.',
    },
    scene:
      "Cocktail hour, and instead of asking each other 'so how did you two meet?' for the tenth time, guests scan a code at the entrance and scroll through it themselves: the timeline, the photos, a voice note of you explaining the terrible first-date restaurant choice. Distant relatives who've never heard the full story get pulled in. Someone finds the hidden chapter you buried three screens deep and texts their table about it.",
    howItWorks: {
      setup: {
        time: '~45 minutes',
        detail: 'You fill in key dates, photos, captions, and optional voice notes. We build it into a scrollable visual exhibit.',
      },
      guests: {
        detail: "Guests scan a code at the entrance and explore the exhibit on their own phone, at their own pace. No download.",
      },
      keepsake: {
        artifact: 'The full exhibit, yours to keep, live forever',
        detail:
          'A private URL to the whole exhibit. Stays live after the wedding: a proper archive of your story, not scattered across old texts and camera rolls.',
      },
    },
    bigScreen:
      "None. This one lives on guests' own phones, meant to be explored individually rather than watched as a group.",
    deviceScenes: {
      phone: {
        layout: 'chapter',
        chapter: 2,
        total: 5,
        title: 'Room two · Lisbon, spring 2022',
        body: 'The trip Simone still calls the reason. The night on the tiled rooftop. The morning neither of them mentioned, but both remember exactly.',
        photo: '/images/pre/planning-1.jpg',
        nextLabel: 'Enter room three',
      },
      bigScreen: {
        layout: 'gallery',
        title: 'The Exhibit · room two',
        subtitle: 'Lisbon, spring 2022',
        items: [
          { label: 'The tiled rooftop', highlight: true },
          { label: 'Custard tart · day 4' },
          { label: 'The scooter neither could ride' },
          { label: 'Voice note · 2:14am' },
          { label: 'The receipt she kept' },
          { label: 'A photo he never showed her' },
        ],
        footer: 'Move through the room at your own pace.',
      },
    },
    isThisYou: [
      'You have a real story with real chapters, photos, maybe a voice note or two, and you want it told properly.',
      "Half your guest list doesn't know the full version and you're tired of retelling it.",
      "You want something that outlives the wedding day, not just decorates it.",
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 45 minutes. This is the most content-rich app, and it shows.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'Every chapter, photo, and voice note, plus whether guests can leave reactions on each part of the exhibit.',
      },
    ],
  },

  'where-next-map': {
    hero: {
      headline: 'Guests just planned your next ten years.',
      subhead: 'An interactive map fills up live as guests pin places you should go, move to, or never leave.',
    },
    scene:
      "The map starts with a few pins you placed yourselves: the apartment, the spot of your first date, where he proposed. Then guests start adding their own: a restaurant a friend swears by, a neighborhood your college roommate insists you'd love, a park perfect for the kids nobody's mentioned yet but everyone's already imagining. By the end of the night the map is dense with opinions about your future, all of it from people who love you.",
    howItWorks: {
      setup: {
        time: '~15 minutes',
        detail: "You drop a few 'our places' pins to start. The rest fills in from your guests.",
      },
      guests: {
        detail: 'Guests add pins with short notes from their phones throughout the reception, no download.',
      },
      keepsake: {
        artifact: 'An interactive travel map, always in your pocket',
        detail:
          "A private URL of the finished map. Every pin, every note from your people, ready to pull up when you're actually planning where to go next.",
      },
    },
    bigScreen:
      'The map fills live on the display wall as pins come in, zooming in as clusters form around popular suggestions.',
    deviceScenes: {
      phone: {
        layout: 'picker',
        eyebrow: 'Pin a place they should go',
        prompt: 'Where do Simone & Jack belong next?',
        subtitle: 'Drop a pin. Add one line why.',
        items: [
          { label: '📍 Lisbon — move here', selected: true },
          '📍 Tokyo — go once',
          { label: '📍 That ramen shop in Austin', selected: true },
          '📍 Big Sur — anniversary',
          { label: '📍 Our lake — every summer', selected: true },
          '📍 Mexico City — long weekend',
          '📍 Maine coast — retire here',
          '📍 Paris — go back',
          '📍 The cabin — never sell',
        ],
        columns: 3,
      },
      bigScreen: {
        layout: 'map',
        title: 'Your future map · pinned by the room',
        subtitle: '84 pins live from your people.',
        shape: 'map',
        pins: [
          { x: 20, y: 30, label: 'Lisbon' },
          { x: 35, y: 55, label: 'That ramen shop', big: true },
          { x: 55, y: 25, label: 'The lake' },
          { x: 65, y: 60, label: 'Big Sur' },
          { x: 80, y: 40, label: 'Tokyo' },
          { x: 90, y: 68, label: 'Maine coast' },
        ],
        footer: 'Delivered as a framed poster after the honeymoon.',
      },
    },
    isThisYou: [
      "You like the idea of a keepsake that's a map, not a book, something you can actually use to plan a trip.",
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

  'home-the-room-built': {
    hero: {
      headline: 'Your people just built you a home.',
      subhead: 'Guests fill your someday place from their phones (pets, furniture, features, silly rules) and a house draws itself live on the wall.',
    },
    scene:
      "A friend adds a dog with a note that says 'nothing works without one.' A cousin adds a record player, then another, then four more, the room clearly has strong opinions about vinyl. Your dad adds a porch swing 'to argue on in the mornings.' By the end of dinner the illustration on the wall has a garden, a big table, a reading nook, and one weirdly specific note from your college roommate about a hot tub. It's the home your people imagined for you, drawn by them.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'You pick a few categories that feel like you (pets, outside things, silly rules). Guests supply everything else.',
      },
      guests: {
        detail: 'Guests tap up to three things and add a one-line "why" for each, from their phones, no download.',
      },
      keepsake: {
        artifact: 'A zoomable digital illustration, signed by the room',
        detail:
          "The finished illustration at a private URL, every guest signature embedded. Set it as your desktop wallpaper. Send it to your parents. It doesn't warp with humidity.",
      },
    },
    bigScreen:
      'A composite illustration of a house fills in live as votes cluster: the porch appears when ten people vote for it, the dog shows up as soon as the room agrees, a running "strong opinions" ticker calls out the surprising ones.',
    deviceScenes: {
      phone: {
        layout: 'picker',
        eyebrow: 'Add to their future home',
        prompt: 'What do Simone & Jack need in the home they’ll build?',
        subtitle: 'Tap up to 3. Yours joins the wall.',
        items: [
          { label: 'A dog', selected: true },
          'Espresso machine',
          { label: 'A record player', selected: true },
          'Big table',
          { label: 'A porch swing', selected: true },
          'Herb garden',
          'Reading nook',
          'A guest room',
          'A cat, secretly',
        ],
        columns: 3,
      },
      bigScreen: {
        layout: 'map',
        title: 'The house · built by the room',
        subtitle: '84 contributions, live from your people.',
        shape: 'map',
        pins: [
          { x: 20, y: 30, label: 'Reading nook' },
          { x: 35, y: 55, label: 'Big table', big: true },
          { x: 55, y: 25, label: 'A dog' },
          { x: 65, y: 60, label: 'Herb garden' },
          { x: 80, y: 40, label: 'Record player' },
          { x: 90, y: 68, label: 'Porch swing' },
        ],
        footer: 'Delivered as a framed illustrated poster after the honeymoon.',
      },
    },
    isThisYou: [
      "You'd rather leave with a keepsake you can hang on the wall than a book you'll open twice.",
      'Your friends and family have very specific opinions about how you should live.',
      'You like the idea of a wedding artifact that keeps being a running joke for years.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes to pick your categories and seed a starter suggestion or two.' },
      { q: 'What if something breaks on the day?', a: FAILS_A },
      {
        q: 'What can we customize?',
        a: 'The categories, the illustration style of your poster, and any starter suggestions you seed the wall with.',
      },
    ],
  },

  'collaborative-soundtrack': {
    hero: {
      headline: 'Every song comes with the story behind it.',
      subhead: 'Guests request songs and the memory attached. The DJ plays the top votes, the stories play on the wall.',
    },
    scene:
      "A request comes in: 'Dancing Queen.' The memory attached says it played in the car on the way to the lake house, the summer everyone screamed every word with the windows down. The DJ queues it. When it starts, the memory appears on the wall, and the entire lake house table loses it, mid-dance, mid-drink, completely unprompted. Every song that plays for the rest of the night carries someone's story with it.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'Minimal setup. Mostly connecting with your DJ so they receive the live queue. Guests supply the songs and stories.',
      },
      guests: {
        detail:
          "Guests submit a song plus a short memory from their phones and vote on others' picks. No download. Votes bump songs up the queue.",
      },
      keepsake: {
        artifact: 'A Spotify + Apple Music playlist, with every story attached',
        detail:
          'The finished playlist on the streaming service of your choice, plus a private companion URL where each song reveals the memory the guest attached to it.',
      },
    },
    bigScreen:
      'As each song starts, its submitted memory displays on the wall, turning the dance floor into a running commentary of your people\'s history with you.',
    deviceScenes: {
      phone: {
        layout: 'picker',
        eyebrow: 'Vote on the dance floor',
        prompt: 'Which songs does the room need tonight?',
        subtitle: 'DJ pulls from your top hearts.',
        items: [
          { label: '♥ Murder on the Dancefloor', selected: true },
          'Dancing on My Own',
          { label: '♥ Levitating', selected: true },
          'September',
          { label: '♥ Padam Padam', selected: true },
          'Dance With Somebody',
          'Mr. Brightside',
          'Blinding Lights',
          'Toxic',
        ],
        columns: 3,
      },
      bigScreen: {
        layout: 'gallery',
        title: 'Now spinning · picked by the room',
        subtitle: 'Murder on the Dancefloor · +14 hearts',
        items: [
          { label: 'NOW · Murder on the Dancefloor', highlight: true },
          { label: 'Next · Padam Padam' },
          { label: 'Then · Levitating' },
          { label: 'Then · Dancing on My Own' },
          { label: 'Then · September' },
          { label: 'Then · Mr. Brightside' },
        ],
        footer: 'Queue rebuilds every 20 minutes as votes shift.',
      },
    },
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
      subhead: 'The Unprompted Love Letter Machine. Your guests write one message. You read them live.',
    },
    scene:
      "During cocktail hour, your guests write you a secret message: a memory, a wish, something they've never said out loud. It takes five minutes, then they put their phones away. At dinner, you sit together and read them for the first time, on screen, one by one, at your own pace. Some will make you laugh. Some will wreck you. Most will be from people you didn't expect.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'Almost no setup. Just tell us when during the reception you want the reveal moment. Guests write the rest.',
      },
      guests: {
        detail:
          "Guests submit a message via QR code, anonymous by default. No download, five minutes, then they put their phones away.",
      },
      keepsake: {
        artifact: 'Every letter, in a private, searchable archive',
        detail:
          "A URL of every message read on the night (and the ones you didn't get to). Search by name. Come back to it whenever you want to hear from your people again.",
      },
    },
    bigScreen:
      'Messages appear one at a time in large type on the display wall as you read them live, at whatever pace you choose, with the room watching in real time.',
    deviceScenes: {
      phone: {
        layout: 'submit',
        eyebrow: 'To Simone',
        prompt: 'A short love letter, on their wedding night.',
        subtitle: 'You approve it before it hits the wall. Signed or anonymous.',
        placeholder: 'What you’ve been meaning to say out loud…',
        draft: 'Simone. You look at Jack like nobody else in the room knows him. Some of us do. But he’s luckiest that you do.',
        charLimit: 220,
        buttonLabel: 'Approve & send',
        toOptions: ['Her', 'Him', 'Both'],
        toSelected: 0,
      },
      bigScreen: {
        layout: 'feed',
        title: 'To: Simone',
        quote: 'You look at Jack like nobody else in the room knows him. Some of us do. But he’s luckiest that you do.',
        attribution: 'Priya',
        subtitle: 'One letter every 30 seconds, all night.',
        footer: 'From the room',
      },
    },
    isThisYou: [
      "You want a moment that's completely unscripted. Nobody rehearses this, including you.",
      'You have people in your life (a grandmother, an old friend) whose unscripted words would mean everything.',
      "You're comfortable being surprised, live, in front of your guests.",
    ],
    faq: [
      {
        q: 'Do messages have to be anonymous?',
        a: 'By default, yes. Guests can reveal themselves after if they want to. You can also turn anonymity off if you\'d rather know who wrote what.',
      },
      {
        q: 'What if a message is inappropriate?',
        a: "You get a moderation queue before anything goes live. Nothing reaches the big screen without your approval.",
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
      subhead: 'Guests log how they\'re feeling throughout the day. The aggregate becomes a live pulse you keep forever.',
    },
    scene:
      "A gentle prompt lands on guests' phones during the ceremony: how are you feeling right now? A tap, two seconds, done. It happens again during cocktail hour, again during the speeches, again during your first dance. Nobody notices the pattern forming until later: a graph, quiet, building all day, spiking hardest during the vows and the first dance. You won't see it in the moment. You'll see it after, and it'll say more about the day than any photo does.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'You choose which moments trigger a prompt: ceremony, cocktail hour, dinner, dancing. We handle the rest.',
      },
      guests: {
        detail:
          'Guests opt in when they scan the event QR and respond with a simple emotion picker, five to six times over the day. No download.',
      },
      keepsake: {
        artifact: 'An interactive "day in feelings" dashboard',
        detail:
          "A private URL that plays back the emotional pulse of your wedding hour by hour. Scrub the timeline. Zoom into the exact moment the room lost it during your father's speech.",
      },
    },
    bigScreen:
      "An optional live pulse visualization can run during the reception, showing the room's collective mood shift in real time.",
    deviceScenes: {
      phone: {
        layout: 'pulse',
        eyebrow: '9:47pm · during the toasts',
        prompt: 'How are you feeling right now?',
        subtitle: 'Anonymous. Adds one dot to the room’s pulse.',
        emoji: '🥲',
        leftLabel: 'Wrecked',
        rightLabel: 'Alight',
        position: 0.78,
        liveNote: 'Room average is climbing all night.',
      },
      bigScreen: {
        layout: 'aggregator',
        title: 'The room · right now',
        headline: 'The night is peaking.',
        subtitle: 'Averaged across every phone in the room, every minute.',
        bars: [
          { label: '8:00 · Cocktails', pct: 62 },
          { label: '8:45 · Sit-down', pct: 71 },
          { label: '9:20 · Speeches begin', pct: 82 },
          { label: '9:47 · Grandma’s toast · NOW', pct: 94 },
          { label: '10:30 · Dancing (predicted)', pct: 88 },
        ],
        footer: 'The night’s pulse, mailed as a keepsake print after.',
      },
    },
    isThisYou: [
      'You like data and want an unusual, honest artifact from your wedding. Not just photos.',
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
      subhead: 'Tables pass dares to each other in a chain, completed, photographed, and passed on.',
    },
    scene:
      "Table one submits a dare for whoever's next: do your best rendition of the couple's first dance in ten seconds. Table four gets it, groans, does it anyway, photographs the results, and writes a new dare for table seven. By the end of cocktail hour, tables that started the night as strangers have a shared photo and a story that didn't exist an hour ago. The wall is full of proof.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail:
          'You decide the routing: random, or you can pair specific tables on purpose (bride\'s college friends dare groom\'s coworkers).',
      },
      guests: {
        detail: 'Each table writes a dare, the next table completes it and uploads a photo. No download, all from the browser.',
      },
      keepsake: {
        artifact: 'The full chain of dares and photos, private URL',
        detail:
          'A private page with every dare and every photo, in the order it happened. A visual record of tables meeting tables, saved as a scrollable timeline.',
      },
    },
    bigScreen: 'Completed dares and their photos post to the display wall as they come in, building a visible chain across the room.',
    deviceScenes: {
      phone: {
        layout: 'feed',
        eyebrow: 'A secret arrived at Table 6',
        prompt: 'From Table 3 · pass it on before dessert.',
        items: [
          { text: 'Jack was late to his own engagement dinner. He denies it. Ask Priya.', attribution: 'Table 3', kind: 'gold' },
          { text: 'You have 12 minutes to pass a secret of your own to Table 1.', attribution: 'The relay', kind: 'plain' },
        ],
        replyLabel: 'Write one for Table 1',
      },
      bigScreen: {
        layout: 'map',
        title: 'The relay · live from your tables',
        subtitle: '18 secrets passed. 4 in flight.',
        shape: 'web',
        pins: [
          { x: 50, y: 50, label: 'Head table', big: true },
          { x: 15, y: 25, label: 'T1' },
          { x: 30, y: 78, label: 'T2' },
          { x: 68, y: 22, label: 'T3' },
          { x: 82, y: 60, label: 'T4' },
          { x: 20, y: 55, label: 'T5' },
          { x: 75, y: 78, label: 'T6' },
        ],
        footer: 'The head table never sees a single secret.',
      },
    },
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
      subhead: 'A short quiz matches guests to a personalized drink, and the story behind it.',
    },
    scene:
      "Guests arrive and take a thirty-second quiz (morning or night person, city or countryside) and get matched to a drink from your custom menu. Someone gets 'The Proposal Punch' and reads the story behind it: Lisbon, a ring you almost dropped into the harbor. Someone else gets 'The First Date Fizz' and immediately asks what happened on that date. By the time everyone's holding a drink, half the room is trading quiz results at the bar.",
    howItWorks: {
      setup: {
        time: '~30 minutes',
        detail: 'You build the drink menu: names, short stories, and which quiz answers map to which drink.',
      },
      guests: {
        detail: 'Guests take the quiz on arrival and get their recommended drink with its story. No download, straight from their phone.',
      },
      keepsake: {
        artifact: 'A private digital drink menu with the stories embedded',
        detail:
          'A private URL with the full menu and the memory behind each drink. Pull it up before your next dinner party. Actually make the cocktail.',
      },
    },
    bigScreen:
      'An optional live dashboard shows bartenders which drinks are trending, and guests can share their result to a social wall.',
    deviceScenes: {
      phone: {
        layout: 'vote',
        eyebrow: 'Question 3 of 5',
        prompt: 'What do you order when the night has gone completely off the rails?',
        options: [
          'A negroni, obviously',
          'Espresso martini · again',
          'Whatever the bartender picks',
          'Water, honestly',
        ],
        selectedIndex: 0,
        countdown: 15,
      },
      bigScreen: {
        layout: 'leaderboard',
        title: 'Bar top 5 · picked by the room',
        subtitle: 'What Simone & Jack’s people actually order.',
        rows: [
          { rank: 1, name: 'Negroni', score: 34 },
          { rank: 2, name: 'Espresso Martini', score: 27 },
          { rank: 3, name: 'Old Fashioned', score: 19 },
          { rank: 4, name: 'Aperol Spritz', score: 15 },
          { rank: 5, name: 'Anything but water', score: 11 },
        ],
        footer: 'Bartender is now making the top 3 in rotation.',
      },
    },
    isThisYou: [
      "You've got real stories behind real moments (a proposal city, a first-date disaster) worth naming a drink after.",
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
      subhead: 'Guests imagine the alternate universe. Then you reveal how close you actually came to missing each other.',
    },
    scene:
      "During dinner, guests submit their theory: what would have happened to the two of you if you'd never met? Someone thinks he'd have married his college roommate's ex. Someone else thinks she'd have moved to New York and become someone neither of you would recognize. The best ones get read aloud (funny, a little absurd, a little too accurate) and then you tell the real story: how close you actually came to never meeting at all. It's always more dramatic than anyone guessed.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail: 'You prepare your real \'how we almost didn\'t meet\' story to reveal after. Guests supply the rest.',
      },
      guests: {
        detail: 'Guests submit a parallel-universe scenario capped at 150 characters. No download, forces creativity.',
      },
      keepsake: {
        artifact: 'An archive of every alternate universe your guests wrote',
        detail:
          'A private URL of every submission, alongside your real story. The imagined lives you almost had, kept next to the one you actually got.',
      },
    },
    bigScreen:
      'Selected submissions appear on the display wall one at a time during dinner, building to your real story as the final reveal.',
    deviceScenes: {
      phone: {
        layout: 'vote',
        eyebrow: 'In another life…',
        prompt: 'What is Jack doing in a universe where he never met Simone?',
        options: [
          'Running a mediocre wine bar',
          'Coaching a losing football team',
          'Writing a novel he’ll never finish',
          'Exactly the same job, honestly',
        ],
        selectedIndex: 0,
        countdown: 20,
      },
      bigScreen: {
        layout: 'aggregator',
        title: 'Parallel universes · the room votes',
        headline: 'In another life, Jack runs a mediocre wine bar.',
        bars: [
          { label: 'Runs a mediocre wine bar', pct: 44 },
          { label: 'Coaches a losing football team', pct: 22 },
          { label: 'Writes an unfinished novel', pct: 19 },
          { label: 'Exactly the same job', pct: 15 },
        ],
        footer: 'And in every one of them, Simone still finds him.',
      },
    },
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
        '20 real texts and photos from your relationship. Blurred sender. Your guests guess: his side vs her side vs the people who introduced you.',
    },
    scene:
      "Dinner plates are cleared, the MC picks up the mic, and the big screen lights up with a single text bubble, sender blurred. Every phone in the room turns into a two-button buzzer: his side, her side. Cousins argue at table three. Your college roommate is quietly pulling ahead. The screen reveals it was you at 2 a.m. in 2021, and Aunt Denise loses her mind because she called it. Nobody looks at their phone for more than five seconds at a time. Everyone looks at everyone else.",
    howItWorks: {
      setup: {
        time: '~90 minutes',
        detail:
          "You send us the material: screenshots, photos, memorable one-liners you've said out loud, plus a rough date on each. We handle the layout, the chronology, the blur.",
      },
      guests: {
        detail:
          "Guests scan the QR at their seat, enter their name, tap his side / her side / mutual, and pick their relationship from a preset list (bridesmaid, groom's coworker, aunt). Done in 20 seconds. Two taps per message from then on.",
      },
      keepsake: {
        artifact: 'A private results archive with the highlight reel',
        detail:
          'A URL of every vote, every score, and the "who knew you best" final tally. Auto-generated shareable graphics you can text to whoever won. No paper, no mailing, just a link that stays live forever.',
      },
    },
    bigScreen:
      "The current message with the sender blurred. Live vote tally bars filling in real time. Corner leaderboard: His Side 34 · Her Side 31 · Mutual 28. A streak callout when someone catches fire: 'Aunt Denise: 5 in a row.' The screen is the show. Phones are just the buzzer.",
    deviceScenes: {
      phone: {
        layout: 'vote',
        eyebrow: 'Text 7 of 20 · 2:14am',
        prompt: '“if you eat the last dumpling I will end this relationship out of principle”',
        options: ['Simone', 'Jack'],
        selectedIndex: 0,
        columns: 2,
        countdown: 8,
        score: '4/6',
      },
      bigScreen: {
        layout: 'leaderboard',
        title: 'Who Said It · live tally',
        subtitle: 'Text 7 of 20 · sender still blurred',
        rows: [
          { rank: 1, name: 'His Side', score: 34 },
          { rank: 2, name: 'Her Side', score: 31 },
          { rank: 3, name: 'Mutual friends', score: 28 },
          { rank: 4, name: '⭐ Aunt Denise · 5 in a row', score: 26 },
        ],
        footer: 'Individual scores update every question.',
      },
    },
    isThisYou: [
      'You have a group chat, a screenshot habit, and at least one legendary text neither of you will ever live down.',
      'Half the room would say "honestly, how are you two together." Affectionately.',
      "The idea of your uncle reading your text messages doesn't make you flinch. (If it does, see the spicy round setting.)",
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
          'The line your dad said the first time he met her. Was it him, or was it her dad?',
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
        'Individual leaderboard runs alongside: top 5 on the big screen, full list on every phone. Streak callouts light up when someone catches fire.',
      subLeaderboardsNote:
        'Sub-leaderboards for any group you name: the college crew, the coworkers, the neighbours who watched you fall in love from across the hall.',
      copy:
        'We built this app because "who knows the couple best" is the funniest ongoing question at every wedding. Now it has a scoreboard.',
    },
    chronology: {
      headline: 'First-week flirty to last-week grocery list.',
      description:
        'Chronological order matters. Guests hear your voice change across 4 years in 10 minutes. Nobody plans that arc. It just happens when you line the messages up.',
    },
    whyNotPaper: {
      paper:
        "A card-based reveal is very close to as fun. The MOH holds up a printed screenshot, the room shouts a guess, someone keeps score on a napkin. It works, and if that's your vibe, we'll tell you and send you to a good stationer.",
      app: "The family-vs-family leaderboard updating live. The 'room agrees' stat that tells you the crowd converged on the wrong answer. Streak callouts. A private digital archive of every message, every vote, every score, yours forever. Sub-leaderboards by group. A passkey-gated spicy round the parents structurally can't see.",
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
            'We design the display to match your venue: dark room with the screen as centerpiece, ambient side-screens, or a projection on the dance floor.',
        },
      ],
      examples: [
        "One couple replaced texts with lines from their favorite sitcom that either of them had quoted at each other in the wild.",
        "Another used only messages from their group chat with the wedding party, team-guess-team.",
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
        a: 'We flag it for you in the review dashboard before the night. You can pull it or leave it in. Comedy gold either way.',
      },
      {
        q: 'Can we skip the spicy round entirely?',
        a: 'Yes. One setting, no code exists, nobody knows it was ever an option.',
      },
      {
        q: 'Do we get the raw vote data?',
        a: 'Yes. Every message, every vote, every score lives at a private URL that stays yours forever, part of the default keepsake.',
      },
    ],
  },

  'story-chain': {
    hero: {
      headline: 'Your guests are about to write your love story. One sentence each.',
      subhead:
        'It starts with a single line on the big screen. Everyone adds one sentence. The whole room watches the story grow, and go off the rails.',
    },
    scene:
      "One sentence sits on the big screen: 'Their love story actually began when…' Then someone at table four adds a line, and it appears. Then someone else. The story lurches from sweet to absurd and back. Your college friends are clearly trying to sabotage it, the DJ reads the best lines aloud, and by the time dessert lands you have a two-page origin myth that is almost entirely untrue and completely yours. It's printed and in your hands a week later.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail:
          'You write the opening sentence (or pick one of ours) and, if you want, name a friend to moderate. Guests write everything after that.',
      },
      guests: {
        detail:
          'Guests add one sentence at a time from their phones (no download) with a short cooldown so nobody hijacks the plot. Each line appears live on the wall.',
      },
      keepsake: {
        artifact: 'The finished story as an interactive web piece',
        detail:
          "The whole chain, typeset into a scrollable web story at your own private URL. Every guest's contribution attributed. Your wedding's official, wildly inaccurate origin story, permanently online.",
      },
    },
    bigScreen:
      'The story builds live on the display wall, one sentence at a time, with the newest line highlighted as it lands. The room reads along and reacts together.',
    deviceScenes: {
      phone: {
        layout: 'submit',
        eyebrow: 'Story · sentence 47',
        prompt: 'Add the next sentence.',
        subtitle: 'Last one: “And then Simone looked at him and said…”',
        placeholder: 'One sentence. Then hand it to the next table.',
        draft: '“You do realize you’re standing in the fountain, right?”',
        charLimit: 180,
        buttonLabel: 'Add to the story',
      },
      bigScreen: {
        layout: 'feed',
        title: 'The Story · sentence 47',
        quote: 'And then Simone looked at him and said, “You do realize you’re standing in the fountain, right?”',
        attribution: 'Devon · Table 3',
        subtitle: 'Read back start-to-finish at the last dance.',
        footer: 'Written by the room, one sentence at a time.',
      },
    },
    isThisYou: [
      'You have a friend group that will absolutely try to sabotage a shared doc, and you want to give them a stage for it.',
      "You want a keepsake with your people's fingerprints all over it, not just your own.",
      'You like a little structured chaos as your dinner entertainment.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes. You just write the opening line and pick a moderator.' },
      {
        q: 'What if it goes off the rails?',
        a: "That's half the fun, but your moderator can redirect or remove any line before it sticks, so it never goes truly off-side.",
      },
      {
        q: 'What can we customize?',
        a: 'The opening sentence, whether you run one story or parallel wholesome-and-unhinged chapters, and the design of the printed chapbook.',
      },
    ],
  },

  'ask-us-anything': {
    hero: {
      headline: 'The room asks. You answer. Live.',
      subhead:
        'Guests submit questions during dinner and upvote the ones they actually want answered. You take the mic over dessert and answer the top ten.',
    },
    scene:
      "The questions start rolling in during dinner: some silly ('which of you would survive longer in a zombie apocalypse'), some that make you pause ('what changed your mind about kids'). The room upvotes, and the best ones climb while the safe ones sink. By dessert there's a clear top ten, and you're at the mic answering questions your guests genuinely wanted asked. Not the ones a host guessed at. Some land as jokes. One or two land somewhere quieter.",
    howItWorks: {
      setup: {
        time: '~5 minutes',
        detail:
          "Almost nothing on your end. Just decide who moderates and roughly when during dessert you'll take the mic. Guests supply the questions.",
      },
      guests: {
        detail:
          'Guests submit questions anonymously or credited from their phones (no download) and upvote others. Voting closes 15 minutes before dessert.',
      },
      keepsake: {
        artifact: 'The full ranked list of questions, saved',
        detail:
          "A private URL with every question ranked by votes: the ones you answered on the night and the ones you didn't. A snapshot of what your people were most curious about.",
      },
    },
    bigScreen:
      'The top questions display on the wall with their vote counts once voting closes, so the room sees exactly what it chose before you start answering.',
    deviceScenes: {
      phone: {
        layout: 'submit',
        eyebrow: 'Ask Simone & Jack anything',
        prompt: 'They’ll pick the best ones at midnight.',
        subtitle: 'Upvote what you also want to hear.',
        placeholder: 'Nothing off limits. No wrong questions.',
        draft: 'What’s the thing you almost broke up over, and how did you get past it?',
        charLimit: 200,
        buttonLabel: 'Ask it',
      },
      bigScreen: {
        layout: 'feed',
        title: 'Top question · right now',
        quote: 'What’s the thing you almost broke up over, and how did you get past it?',
        attribution: '32 guests upvoted this',
        subtitle: 'Answered on the mic at midnight.',
        footer: '84 questions in the queue',
      },
    },
    isThisYou: [
      'You two are comfortable on the spot and actually enjoy a good Q&A.',
      'You want a dinner moment with real spontaneity, not a rehearsed bit.',
      'Your guests are curious enough (and funny enough) to make the question list worth reading.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 5 minutes. You just pick a moderator and a rough time to take the mic.' },
      {
        q: 'What if a question is inappropriate?',
        a: 'Your moderator gets a view to hide anything actively bad before it ever reaches the screen or the ranking.',
      },
      {
        q: 'What can we customize?',
        a: 'The question categories, whether submissions can be anonymous, and how many top questions you answer live.',
      },
    ],
  },

  'video-guestbook': {
    hero: {
      headline: "A guestbook you'll actually watch. For the rest of your life.",
      subhead:
        'Instead of signing a book, guests record a short video from their seat. Every clip curated into a film delivered the week after.',
    },
    scene:
      "There's no line, no booth, no attendant. Sometime during the night, each guest opens a prompt on their phone ('What do you want them to remember?') and records sixty seconds from wherever they're sitting. Some are laughing. Some go quiet halfway through and mean every word. Grandparents get their grandkids to hold the phone. A week later a film arrives, and every individual clip is saved on its own too, so decades from now, every voice is still there, one by one.",
    howItWorks: {
      setup: {
        time: '~10 minutes',
        detail:
          'You choose the prompt (or a few) and name whoever curates the final film. Guests record the rest across the day.',
      },
      guests: {
        detail:
          "Guests record a short message directly in their phone's browser (no app, no queue) with a discreet re-record button so nobody submits a bad take.",
      },
      keepsake: {
        artifact: 'A private video archive plus a highlight cut',
        detail:
          'A private URL with every clip archived on its own, plus one short highlight edit delivered the week after. Each message preserved individually, so no single file failure loses anyone.',
      },
    },
    bigScreen:
      "None during the night. This one stays private and personal, recorded from each guest's seat rather than performed for the room.",
    deviceScenes: {
      phone: {
        layout: 'record',
        eyebrow: '2 minutes · one take',
        prompt: 'A message to Simone & Jack. From you, for them.',
        subtitle: 'They’ll watch this one late, together, when everyone is gone.',
        timer: '0:23',
        maxDuration: '2:00',
        recording: true,
      },
      bigScreen: {
        layout: 'moment',
        title: 'Video guestbook · live',
        statusPill: 'Recording · Table 3',
        headline: 'Devon is telling Simone & Jack something they’ll play in ten years.',
        subtitle: 'The wall stays quiet on purpose. This one is meant to be private.',
      },
    },
    isThisYou: [
      "You know the value of a well-preserved video: a voice you'd give anything to hear again.",
      "You want a guestbook you'll revisit, not one that goes in a drawer after the honeymoon.",
      'You have older relatives whose message you want captured while you can.',
    ],
    faq: [
      { q: 'Do guests need to download anything?', a: NO_DOWNLOAD_A },
      { q: 'How long does setup take?', a: 'About 10 minutes to choose your prompts and pick who curates the film.' },
      {
        q: 'What if something breaks on the day?',
        a: "Videos upload and are stored securely the moment they're recorded, and we test the whole flow before the wedding so nothing is lost.",
      },
      {
        q: 'What can we customize?',
        a: 'The prompts guests see, whether older guests get assisted mode, and the edit and length of the final film.',
      },
    ],
  },
}

const emptyExtended = {
  hero: {},
  scene: '',
  howItWorks: {},
  bigScreen: '',
  deviceScenes: null,
  isThisYou: [],
  faq: [],
  questionTypes: [],
  scoreboard: null,
  chronology: null,
  setupEffort: null,
  makeItYours: null,
  whyNotPaper: null,
}

export const apps = rawApps.apps
  .filter((app) => !app.skip)
  .map((app) => ({
    ...app,
    extended: { ...emptyExtended, ...extendedContent[app.slug] },
  }))
