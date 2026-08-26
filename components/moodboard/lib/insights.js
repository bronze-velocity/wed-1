function includes(values, id) {
  return Array.isArray(values) && values.includes(id)
}

function excerpt(value, max = 72) {
  const clean = value?.trim()
  if (!clean || clean.length <= max) return clean
  return `${clean.slice(0, max - 1).trimEnd()}…`
}

export function buildMoodboardInsights(answers, step) {
  const ideas = []
  const fits = []
  const flags = []
  const seen = new Set()

  function addIdea(id, title, description, eyebrow = 'A first sketch') {
    if (seen.has(id)) return
    seen.add(id)
    ideas.push({ id, title, description, eyebrow })
  }

  function addFit(value) {
    if (value && !fits.includes(value)) fits.push(value)
  }

  function addFlag(value) {
    if (value && !flags.includes(value)) flags.push(value)
  }

  if (includes(answers.vibes, 'pub-quiz')) {
    addIdea('table-lore', 'The Table Lore League', 'Trivia where each table gets questions only someone sitting there could answer.')
    addFit('Games with a visible room-wide score')
  }
  if (includes(answers.vibes, 'film-premiere')) {
    addIdea('couple-cut', 'The Couple’s Cut', 'Guests unlock scenes from your story, then vote on which memory deserves the closing credits.')
    addFit('A polished big-screen reveal')
  }
  if (includes(answers.vibes, 'gallery-opening')) {
    addIdea('living-exhibit', 'A Living Relationship Exhibit', 'Every table contributes one caption, artifact, or disputed fact to a gallery that assembles live.')
    addFit('Beautiful, browse-at-your-own-pace contributions')
  }
  if (includes(answers.vibes, 'bonfire')) {
    addIdea('embers', 'Embers for Later', 'Quiet notes from the room appear one at a time, then seal into an anniversary keepsake.')
    addFit('Small, intimate reveals instead of a loud game')
  }
  if (includes(answers.vibes, 'rooftop')) {
    addIdea('city-constellation', 'Your City Constellation', 'Guests pin the places where your next chapter should happen and the skyline joins them live.')
  }
  if (includes(answers.vibes, 'dinner-party') || includes(answers.vibes, 'kitchen-party')) {
    addIdea('room-confessions', 'The Room Has Receipts', 'Tiny stories and affectionate accusations arrive between courses, then the couple guesses who sent each one.')
  }
  if (includes(answers.vibes, 'brunch')) {
    addIdea('morning-edition', 'Tomorrow Morning’s Front Page', 'Guests file headlines from the night and wake up to a one-off newspaper about the reception.')
  }

  if (includes(answers.guests, 'strangers-meeting')) {
    addIdea('six-degrees', 'Six Degrees of Your Wedding', 'A prompt quietly finds the surprising connection between guests who arrived as strangers.')
    addFit('Small-group mechanics that introduce people naturally')
    addFlag('Inside-joke games with no way in for half the room')
  }
  if (includes(answers.guests, 'wild-college-friends')) {
    addIdea('old-stories-new-votes', 'Old Stories, New Verdicts', 'Friends submit the stories they still argue about; the rest of the room decides what probably happened.')
  }
  if (includes(answers.guests, 'work-crowd')) {
    addIdea('two-versions', 'The Two Versions of You', 'Work friends and old friends answer the same prompts, then discover how differently they know you.')
  }
  if (includes(answers.guests, 'kids-running')) {
    addIdea('bedtime-broadcast', 'The Bedtime Broadcast', 'Kids record tiny predictions before they leave; the funniest ones premiere later for the grown-ups.')
    addFit('Short rounds children can join without owning a phone')
    addFlag('Anything saved exclusively for after the kids leave')
  }
  if (includes(answers.guests, 'loud-family')) {
    addIdea('speech-market', 'The Speech Prediction Market', 'Before each speech, tables bet on the story, phrase, or family member most likely to appear.')
    addFit('A format that gives big personalities boundaries')
    addFlag('An open microphone with unlimited submissions')
  }
  if (includes(answers.guests, 'reserved-warm')) {
    addIdea('quietest-table', 'Notes From the Quietest Table', 'Anonymous prompts let the least performative guests say the thing they would never take a microphone to say.')
    addFit('Anonymous or low-pressure contributions')
    addFlag('Public performance or forced participation')
  }
  if (includes(answers.guests, 'grandparents-front-row')) {
    addIdea('family-caption', 'The Family Caption Archive', 'Every generation captions the same photographs, and the contradictions become the show.')
    addFit('No-download interactions with a paper or host fallback')
    addFlag('Fast interfaces that assume every guest is phone-confident')
  }
  if (includes(answers.guests, 'dancers')) {
    addIdea('dancefloor-dares', 'The Dance Floor Calls It', 'The room chooses the next tiny dance-floor twist, but every vote closes before the song’s chorus.')
    addFit('Drop-in interactions that take under a minute')
    addFlag('A long seated round once the dance floor opens')
  }

  if (includes(answers.moments, 'cocktail')) {
    addIdea('arrival-thread', 'The Arrival Thread', 'One tiny prompt connects each new arrival to somebody already in the room.')
    addFit('Conversation starters people can use while arriving')
  }
  if (includes(answers.moments, 'dinner')) {
    addIdea('between-courses', 'Between Courses', 'Each course unlocks one question whose answer changes what the next table sees.')
    addFit('Table-based rounds between courses')
  }
  if (includes(answers.moments, 'after-dinner')) {
    addIdea('room-reveal', 'The Room Reveals Itself', 'Contributions gathered quietly all evening resolve into one shared-screen surprise after dinner.')
    addFit('One shared-screen reveal with a clear start and finish')
  }
  if (includes(answers.moments, 'dancing')) {
    addIdea('chorus-window', 'The Chorus Window', 'Guests get one chorus to steer the next visual, dedication, or tiny dance-floor challenge.')
    addFit('Interactions that resolve before the next chorus')
    addFlag('Screen moments that pull everyone off the dance floor')
  }
  if (includes(answers.moments, 'late-night')) {
    addIdea('last-ones-standing', 'The Last Ones Standing', 'The final guests leave predictions and evidence for a reveal the couple opens the next morning.')
    addFlag('Anything whose only payoff needs the full guest list present')
  }

  if (includes(answers.feelings, 'keepsake-from-everyone') || includes(answers.feelings, 'cry-good-kind')) {
    addIdea('future-footnotes', 'Footnotes for Your Future', 'Each guest leaves one precise thing they hope you never forget; the collection unlocks in chapters later.')
    addFit('Contributions that become a real artifact afterward')
    addFlag('Points for points’ sake with nothing worth keeping')
  }
  if (includes(answers.feelings, 'everyone-laughing')) {
    addIdea('unanimous-laugh', 'The Unanimous Laugh', 'The game hunts for the one story, opinion, or accusation every table can recognize at once.')
    addFit('Fast prompts with a room-wide reveal')
  }
  if (includes(answers.feelings, 'room-feels-like-show')) {
    addIdea('one-night-show', 'The One-Night-Only Show', 'Guest choices cue a sequence of reveals with an opening, a twist, and a finale built for your room.')
  }
  if (includes(answers.feelings, 'strangers-become-friends')) {
    addIdea('unexpected-overlap', 'The Unexpected Overlap', 'The app finds two guests with one improbable thing in common and gives them the next clue together.')
    addFit('Prompts answered in pairs or tables, not alone')
  }
  if (includes(answers.feelings, 'our-story-main-character')) {
    addIdea('story-evidence', 'Evidence From Your Story', 'Every round begins with a real place, person, message, or disputed detail from your relationship.')
    addFit('Your real names, places, arguments, and people in every round')
  }
  if (includes(answers.feelings, 'guests-actually-look-up')) {
    addIdea('look-up', 'The Look-Up Rule', 'Every phone action ends by changing something across the room, then the phones go dark again.')
    addFit('Phone-down pauses after every contribution')
    addFlag('An endless feed guests disappear into')
  }
  if (includes(answers.feelings, 'something-nobody-has-seen')) {
    addIdea('room-built-ending', 'An Ending the Room Builds', 'Every choice changes the final scene, so even we cannot know what your screen will show beforehand.', 'Pushing it further')
  }

  const wildcardIdeas = {
    'candlelit-pan': ['candlelight-sequence', 'The Candlelight Sequence', 'A slow chain of guest messages appears across the room one sentence at a time.'],
    'phone-in-dark': ['private-public', 'Private In, Public Out', 'Guests answer alone for ten seconds; their combined answer becomes one image everyone sees.'],
    'crowd-goes-quiet': ['earned-silence', 'The Earned Silence', 'A playful trail suddenly resolves into one true story nobody expected to hear.'],
    'everyone-points-at-screen': ['point-at-screen', 'The Screen Knows Something', 'A live reveal spots the connection, contradiction, or secret the whole room just created.'],
    'someone-crying-at-table': ['one-person-story', 'One Person Tells It', 'The room unlocks a story from the guest who knows this chapter better than anyone.'],
    'flash-mob': ['room-choreography', 'The Room Choreographs Itself', 'Tiny private instructions combine into one coordinated moment nobody had to rehearse.'],
  }
  if (answers.wildcard && wildcardIdeas[answers.wildcard]) {
    addIdea(...wildcardIdeas[answers.wildcard], 'Your boldest direction')
  }

  const storyEntries = Object.entries(answers.story ?? {}).filter(([, value]) => value?.trim())
  if (storyEntries.length) {
    const [key, value] = storyEntries[storyEntries.length - 1]
    const storyIdeas = {
      howWeMet: ['origin-remix', 'Your Origin Story, Remixed', `Guests reconstruct “${excerpt(value)}” from conflicting clues before you reveal what actually happened.`],
      insideJoke: ['inside-joke-decoder', 'The Inside Joke Decoder', `The room tries to reverse-engineer “${excerpt(value)}” without being told why it matters.`],
      soUs: ['tomorrow-headline', 'Tomorrow’s Headline', `Guests create the moment that earns this verdict: “${excerpt(value)}”`],
      runningDebate: ['final-ruling', 'The Final Ruling', `Your guests become the jury for “${excerpt(value)}”, with evidence submitted by both sides.`],
      shockGuests: ['secret-reveal', 'The Thing Nobody Knew', `A trail of increasingly specific clues leads the room to “${excerpt(value)}”.`],
      ritual: ['ritual-machine', 'The Ritual Machine', `The room makes one collective version of “${excerpt(value)}” for you to keep.`],
      anthem: ['meaning-map', 'The Meaning Map', `Guests add their own memories around “${excerpt(value)}” until it becomes a map of the room.`],
      bestStoryteller: ['storyteller-cut', 'The Storyteller’s Cut', `The app gives “${excerpt(value)}” a timed reveal, audience guesses, and the final word.`],
    }
    const idea = storyIdeas[key]
    if (idea) addIdea(...idea, 'Pulled from your words')
    addFit('Mechanics built around details only your guests know')
  }

  let commentary = ''
  if (step === 0 && answers.vibes?.length) {
    commentary = includes(answers.vibes, 'pub-quiz') && includes(answers.vibes, 'bonfire')
      ? 'Pub quiz plus bonfire is an interesting contradiction. We’d keep the shared guessing, then trade the loud scoreboard for a slower reveal.'
      : 'That gives us a visual language, not just a theme. Your app directions are taking their pace from it.'
  }
  if (step === 1 && answers.guests?.length) {
    if (includes(answers.guests, 'strangers-meeting') && includes(answers.guests, 'reserved-warm')) commentary = 'A room of strangers who are warm but reserved needs permission, not icebreakers. We’d use tiny table prompts and let the connection happen sideways.'
    else if (includes(answers.guests, 'kids-running')) commentary = 'Kids present changes the shape. We’d make their part tactile and early, then let it become a surprise for the adults later.'
    else if (includes(answers.guests, 'loud-family')) commentary = 'A loud family is useful raw material, but it needs rails. Structured predictions will land better than an open submission feed.'
    else commentary = 'The guest list is now changing the mechanic. We’re filtering for what these people will actually do, not what looks good in a catalog.'
  }
  if (step === 2 && answers.moments?.length) {
    commentary = includes(answers.moments, 'dancing')
      ? 'Dance-floor time is expensive. Anything we put there should take seconds, create one visible reaction, then get out of the way.'
      : 'Timing gives the idea a job. We can now tell whether this should warm the room up, hold attention, or leave something behind.'
  }
  if (step === 3 && answers.feelings?.length) {
    commentary = includes(answers.feelings, 'keepsake-from-everyone') && includes(answers.feelings, 'everyone-laughing')
      ? 'Funny now and worth keeping later is a high bar. We’d make the room laugh at the reveal, but make the underlying answers something you’ll still want in ten years.'
      : 'This is the useful filter: not what guests tap, but what you want the room to feel when the screen changes.'
  }
  if (step === 4 && storyEntries.length) {
    const [, value] = storyEntries[storyEntries.length - 1]
    commentary = `“${excerpt(value, 92)}” is specific enough to shape the app. We’re using it to sharpen your directions.`
  }
  if (step === 5 && answers.wildcard) {
    const wildcardCommentary = {
      'candlelit-pan': 'Quiet and cinematic wins. We’d let one image or sentence arrive at a time instead of filling the screen.',
      'phone-in-dark': 'This wants a private contribution with a public payoff, not a room full of people staring down at once.',
      'crowd-goes-quiet': 'You’re chasing attention without noise. A single earned reveal will beat a sequence of mini-games.',
      'everyone-points-at-screen': 'That shared “wait, look” reaction is the target. The screen needs to change because of something a guest just did.',
      'someone-crying-at-table': 'The emotional turn should come from a real person in the room, not generic sentiment written by us.',
      'flash-mob': 'You’re giving us permission to orchestrate the room. We’d still build in an easy spectator role for guests who won’t perform.',
    }
    commentary = wildcardCommentary[answers.wildcard] ?? ''
  }

  return {
    ideas: ideas.slice(-8).reverse(),
    commentary,
    fits: fits.slice(-4),
    flags: flags.slice(-4),
  }
}
