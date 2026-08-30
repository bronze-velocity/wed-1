# Image Generation Prompts — Wepho Marketing Site

All images should be generated with a consistent aesthetic. Below is the shared Style DNA and then group-by-group prompts. Images that appear side by side or in the same visual sequence are in the same group — generate them in one session with the same seed/style reference for maximum cohesion.

---

## Style DNA

Append this base to every prompt. Call it `[STYLE]`:

> documentary wedding photography, shot on 35mm film, Kodak Portra 400 look, warm amber and champagne highlights, slightly muted midtones, lifted blacks, natural film grain, f/2.0–2.4 shallow depth of field, candlelight and Edison string light ambiance, no harsh flash, no clinical white light, candid and unposed, intimate editorial aesthetic, photojournalistic framing, no stock-photo staging, no watermarks, no text overlays

For **Midjourney**: add `--style raw --v 6.1` and lock a seed (`--seed XXXXX`) for all images in the same group.

For **Stable Diffusion / Flux**: use a shared LoRA or consistent negative prompt: `oversaturated, HDR, harsh flash, posed, stock photo, cheerful illustration, cartoonish, watermark, text, bright white background`.

---

## Fictional Wedding — Venue Anchor

Groups 1 and 2 all depict the **same fictional wedding**. Use this venue description as an anchor in every prompt for those groups:

> converted stone estate hall, exposed timber ceiling beams, warm Edison string lights strung above, round tables with ivory linen, pillar candles in clusters, fresh greenery and white florals, leaded-glass windows in background, 60–70 guests, upscale but not stiff

---

## Group 1 — Site Photography (Coherent Fictional Wedding)

These images appear across the homepage hero, story beats, demo section, how-it-works steps, final CTA, and the Love Letter demo. They must feel like they come from the same night and the same photographer.

**Display format:** All serve as full-bleed photo backdrops (16:9 or 3:2 landscape). Generate at 16:9 or 3:2. Except `post/reading-1` and `post/legacy-1`, which display at smaller sizes and can be 3:2.

Generate all 10 in one session with a locked seed.

---

### `dancing/hero-bg-1.jpg`
*Used in: HomeHero (full-bleed backdrop behind phone mockup)*

> Guests dancing together in a converted stone estate hall, Edison string lights strung overhead casting warm amber glow, motion blur on moving figures in the midground, one couple twirling in soft foreground bokeh, wide-angle view from slightly elevated angle, joyful and alive, late-night energy, [STYLE], 16:9 landscape

---

### `cocktail/reaction-1.jpg`
*Used in: StoryBeat1 (full-bleed backdrop), PhoneFrame cycling images, WhoSaidItPhone*

> A group of five wedding guests mid-laugh during cocktail hour, standing near tall tables, wine and champagne glasses in hand, one person's mouth wide open in delighted surprise, warm candlelight from the left, display wall glow from slightly behind, candid moment nobody posed for, [STYLE], 16:9 landscape

---

### `cocktail/qr-scan-1.jpg`
*Used in: StoryBeat2 (full-bleed backdrop), HowItWorks step 3, AppHowItWorks step 2*

> A wedding guest looking down at their phone while scanning a QR code at a cocktail table, their face gently lit by the phone screen and nearby candlelight, a QR code tent card on the table in soft foreground focus, cocktail hour background with guests mingling out of focus, intimate close-up framing, [STYLE], 16:9 landscape

---

### `cocktail/writing-1.jpg`
*Used in: PhoneFrame cycling images*

> Close-up of a hand writing a short note on a cream card at a cocktail table, pen moving across the paper, wedding reception background softly blurred, warm candlelight from the left, a champagne flute partially visible at the edge of frame, intimate and quiet, [STYLE], 3:2 landscape

---

### `dinner/bigscreen-1.jpg`
*Used in: StoryBeat3 (full-bleed backdrop), DemoSection backdrop, BigScreenFrame, AppBigScreen*

> A wide shot of a wedding reception dinner in progress, the far wall showing a large projected display screen with a warm glow, all guests at round tables turning their heads toward the screen in the same direction, champagne glasses on tables catching the light, anticipatory energy like something special is about to happen, [STYLE], 16:9 landscape

---

### `pre/planning-1.jpg`
*Used in: HowItWorks step 1*

> A close-up of a wooden desk with wedding planning materials — printed photos, sticky notes, a pen mid-motion, a phone with a bright screen face-down nearby, daylight from a window on the left, warm and organized creative energy, no person visible, styled flat lay from a 45-degree angle, [STYLE], 3:2 landscape

---

### `pre/form-1.jpg`
*Used in: HowItWorks step 2, AppHowItWorks step 1*

> A couple sitting together at a kitchen table filling out a form on a laptop, leaning toward each other, one pointing at the screen while the other smiles, morning window light, coffee cups nearby, casual and warm, the action feels like filling out something exciting together, [STYLE], 3:2 landscape

---

### `post/reading-1.jpg`
*Used in: PhoneFrame cycling images, LoveLetterDemo message attachment thumbnail*

> A bride sitting alone in a quiet corner of the reception, reading a note on her phone with a hand over her mouth, eyes brimming, fairy lights blurred in background, warm amber glow, intimate and private moment nobody interrupted, [STYLE], 3:2 landscape

---

### `post/sendoff-1.jpg`
*Used in: FinalCta (full-bleed backdrop), PhoneFrame cycling images*

> The newlywed couple running through a tunnel of sparklers held by their guests, blurred faces on both sides, motion in the couple's movement, confetti or petals in the air, warm orange and gold light from the sparklers, joyful chaos, wide shot from behind the guests looking toward the couple, [STYLE], 16:9 landscape

---

### `post/legacy-1.jpg`
*Used in: AppHowItWorks step 3, AdminFrame, AutoPlayPhone, PhoneFrame cycling images*

> A quiet still life on a wooden surface: a handwritten note folded in half, a small printed photo strip with candid moments, a champagne flute with a gold rim, and a single dried rose petal, soft diffused daylight from window at left, no people, intimate and permanent feeling, like something kept forever, [STYLE], 3:2 landscape

---

## Group 2 — App Gallery Vibe Images

These 5 images appear as interactive tabs in `AppGalleryTeaser` on the homepage, and as fallback hero backgrounds in `AppHero`. They appear side by side as selectable options, so they must read as a cohesive set at a glance despite each having a distinct emotional tone.

**Display format:** Full-bleed card images at approximately 16:9 or 3:2. Generate at 3:2 landscape.

Use the same Fictional Wedding venue anchor as Group 1, but focus on the emotional moment rather than the venue.

Generate all 5 in one session with a locked seed.

---

### `apps/vibe-laugh.jpg`
*Vibe: "Make them laugh" — amber accent color*

> A candid wide shot of a wedding table erupting in genuine laughter, several guests throwing their heads back at the same moment, one person gripping a friend's arm, wine glasses trembling, pure uninhibited joy, warm amber side-light from nearby candles, the kind of photo nobody planned, [STYLE], 3:2 landscape

---

### `apps/vibe-cry.jpg`
*Vibe: "Make them cry" — rose accent color*

> A quiet, tender moment between two guests at a wedding reception — an older woman and a younger woman in profile, heads gently tilted together, both teary-eyed, one holding a napkin, blurred string lights behind them, almost no other guests in frame, intimate and still, [STYLE], 3:2 landscape

---

### `apps/vibe-talk.jpg`
*Vibe: "Get them talking" — teal accent color*

> A cluster of four wedding guests deep in animated conversation during cocktail hour, all facing slightly inward, one person gesturing expressively, another listening intently, champagne in hand, the kind of group that completely forgot to check their phones, warm candlelight, low-key elegance, [STYLE], 3:2 landscape

---

### `apps/vibe-keepsake.jpg`
*Vibe: "Create a keepsake" — green accent color*

> An intimate flat-lay still life: a guest's handwritten note on cream paper, a polaroid photo of the couple tucked underneath, a sprig of dried eucalyptus, a champagne flute rim visible at the top edge, soft diffused window light from the side, the kind of thing you keep in a drawer forever, [STYLE], 3:2 landscape

---

### `apps/vibe-stop-room.jpg`
*Vibe: "Stop the room" — accent (ivory/gold) color*

> A wide shot of the whole reception room in a single frozen moment — every guest has turned toward the big screen or a speaker at the front, faces lit by the screen glow, glasses mid-table, forks down, one person's hand covering their mouth in awe, the whole room held in one collective breath, [STYLE], 3:2 landscape

---

## Group 3 — Moodboard Vibe TapCards

These 8 images appear as photo tap cards in the moodboard wizard's StepVibes. They represent **party or gathering moods the couple wants to evoke** — not necessarily weddings. Each should feel like a mood board image: vivid enough to communicate a vibe at a glance, editorial and atmospheric.

**Display format:** TapCard renders at 3:2 aspect ratio. Generate at 3:2.

These 8 images do not need to share a venue or event — they represent different aesthetics. However they must share the same color grade and editorial quality. Generate in one session with a locked seed, then review that the set reads cohesively as a grid.

---

### `moodboard/vibes/dinner-party.jpg`
*Used for: "Candlelit and slow" + "Dinner that got out of hand"*

> A long candlelit dinner table in an elegant home or restaurant private room, guests leaning toward each other mid-conversation, wine bottles half-empty, plates pushed aside, candles burned a quarter down, the kind of dinner that started at 7 and nobody noticed it was midnight, warm amber glow, [STYLE], 3:2 landscape

---

### `moodboard/vibes/film-premiere.jpg`
*Used for: "Film premiere energy"*

> An elegant event lobby or grand staircase, well-dressed guests arriving and mingling, anticipatory energy, dramatic up-lighting from below, champagne flutes glinting, everyone dressed up and slightly performative in the best way, someone laughing on the stairs while others look on, editorial and cinematic, [STYLE], 3:2 landscape

---

### `moodboard/vibes/pub-quiz.jpg`
*Used for: "Pub quiz, best table wins"*

> A warm pub interior, four people at a table huddled over a quiz sheet, pencils out, one person whispering the answer, another shaking their head in disagreement, dark wood, amber pendant lights overhead, pints of beer and a shared basket of fries, low-key competitive delight, [STYLE], 3:2 landscape

---

### `moodboard/vibes/rooftop.jpg`
*Used for: "A first-dance kind of night" + "Rooftop, city below"*

> A rooftop gathering at dusk, string lights strung overhead, a city skyline out of focus far below, two or three people standing close together with champagne glasses raised, the golden-blue edge between sunset and night in the sky, expansive and romantic, [STYLE], 3:2 landscape

---

### `moodboard/vibes/gallery-opening.jpg`
*Used for: "Gallery opening, wine in hand"*

> A gallery opening in a white-walled art space with polished concrete floors, guests circulating with wine glasses, abstract or photographic work on walls, people stopping to look and pointing, low-key sophisticated energy, overhead track lighting casting warm pools, [STYLE], 3:2 landscape

---

### `moodboard/vibes/bonfire.jpg`
*Used for: "Bonfire at the end of the night"*

> A late-night outdoor gathering around a large bonfire, five or six people seated in a loose circle on logs and chairs, faces lit from below by ember-orange firelight, someone holding a drink, the rest of the world pitch dark behind them, intimate and timeless, [STYLE], 3:2 landscape

---

### `moodboard/vibes/brunch.jpg`
*Used for: "Brunch that never ended"*

> A long brunch table in late morning light, plates half-cleared, coffee cups everywhere, guests still seated talking two hours after the food was done, bright natural light from nearby windows, someone leaning back in their chair laughing, the ease of time with nowhere to be, [STYLE], 3:2 landscape

---

### `moodboard/vibes/kitchen-party.jpg`
*Used for: "Everyone ended up in the kitchen"*

> A crowded home kitchen, people pressed around an island with drinks in hand, someone stirring something on the stove, animated conversation, half-eaten snacks on the counter, warm overhead pendants, the magnetic chaos of everyone ending up in the kitchen at every party ever, [STYLE], 3:2 landscape

---

## Group 4 — Moodboard Wildcard Images

These files exist in `public/images/moodboard/wildcard/`. The step that used them (`StepWildcard.js`) was deleted, but the images may be reintroduced. Generate them at 3:2 landscape.

Each of these depicts a specific live wedding reception moment. Treat them like Group 1 (fictional wedding, consistent venue) but these are higher-drama emotional peaks.

---

### `moodboard/wildcard/candlelit-pan.jpg`

> A slow motion-like wide shot panning across candlelit dinner tables at a wedding reception, all tables in frame, warm amber glow from clustered pillar candles, guests visible at each table in soft focus, a sense of the whole room breathing together in the warm light, [STYLE], 3:2 landscape

---

### `moodboard/wildcard/crowd-goes-quiet.jpg`

> A wide shot of a wedding reception room at the exact moment the crowd has gone quiet — heads turning, glasses held mid-sip, faces lit by a projected screen, one person at the front beginning to speak with a microphone, the collective held breath before something emotional, [STYLE], 3:2 landscape

---

### `moodboard/wildcard/everyone-points-at-screen.jpg`

> A wedding reception room mid-reaction — multiple guests pointing toward the large display wall at the front, faces in delight and disbelief, some laughing, some open-mouthed, the big screen itself slightly visible at the edge casting a warm glow, spontaneous group reaction nobody planned, [STYLE], 3:2 landscape

---

### `moodboard/wildcard/flash-mob.jpg`

> A surprise moment erupting at a wedding reception — a small group of guests jumping to their feet in a choreographed moment, other guests spinning toward them in surprise and delight, motion blur on the dancing figures, phones raised by seated guests catching the moment, joyful chaos, [STYLE], 3:2 landscape

---

### `moodboard/wildcard/phone-in-dark.jpg`

> A close-up of a single phone screen glowing in a dimmed reception hall, a face partially illuminated by the screen light in the foreground, the rest of the room in warm darkness with string lights blurred, intimate and modern, the glow of something personal in a crowd, [STYLE], 3:2 landscape

---

### `moodboard/wildcard/someone-crying-at-table.jpg`

> A wedding guest sitting alone at their dinner table, a used napkin to their eyes, smiling through tears, the kind of cry that happens because everything is too beautiful and too right, warm candlelight on their face, rest of the room softly blurred, a full wine glass on the table, [STYLE], 3:2 landscape

---

## Group 5 — Per-App Hero Images (Optional)

`AppHero` falls back to the relevant vibe photo if no app-specific image exists. These are enhancements — only generate the ones worth the investment. All display as full-bleed photo backdrops at 16:9.

The shared Style DNA still applies. The fictional wedding venue is optional here — each image should convey the specific moment or emotion that app creates.

---

### `apps/hero-couple-trivia.jpg`

> A wedding dinner scene with every guest at the table looking at their phone at the same moment, someone at the front on a mic, a large projected leaderboard on the wall, faces lit by screen glow and candles, competitive delight, nobody is talking — everyone is focused, [STYLE], 16:9

---

### `apps/hero-venue-scavenger-hunt.jpg`

> A small group of wedding guests wandering a beautiful venue corridor or garden, phones raised, reading clues, discovery energy, one person pointing at something around a corner, warm afternoon or golden hour light, playful and exploratory, [STYLE], 16:9

---

### `apps/hero-anniversary-time-capsule.jpg`

> Close-up of hands writing a note on cream paper at a wedding reception table, a sealed envelope beside it, candlelight from the left, the pen caught mid-motion, intimate and intentional, the feeling of writing something meant to be read years from now, [STYLE], 16:9

---

### `apps/hero-bucket-list-builder.jpg`

> A couple at a table with a map or list spread before them, one leaning over the other's shoulder pointing somewhere, dreaming together, soft warm light, glasses of wine nearby, planning-a-future energy, [STYLE], 16:9

---

### `apps/hero-conversation-starters.jpg`

> Four strangers at a wedding table who are now obviously not strangers anymore, leaning in, all talking at once, nobody looking at their phones, a conversation starter card on the table face-up, animated and fully present, [STYLE], 16:9

---

### `apps/hero-prediction-vault.jpg`

> A guest folding a note at a wedding reception table, a small sealed envelope nearby, secretive and delighted expression, the feeling of writing something private that will be revealed later, warm candlelight, [STYLE], 16:9

---

### `apps/hero-guest-memory-map.jpg`

> A close-up of a large decorative map on a table with small pins or flags placed at different locations by guests, hands partially visible adding a pin, warm ambient light, a glass of champagne resting at the edge, [STYLE], 16:9

---

### `apps/hero-live-roast-board.jpg`

> Wedding guests laughing uproariously at a display screen showing text, one person hiding their face in their hands while others point, the energy of a roast where everyone's in on it, warm amber light, genuine delight, [STYLE], 16:9

---

### `apps/hero-unpopular-opinions.jpg`

> Two wedding guests at a table locked in playful debate — one making an emphatic point, the other visibly disagreeing with a huge grin, others at the table watching and enjoying it, wine in hand, animated and social, [STYLE], 16:9

---

### `apps/hero-first-dance-ballot.jpg`

> A couple sharing their first dance at the center of the reception floor, guests gathered in a loose circle around them, phones slightly raised, the display screen behind the couple with a ballot countdown visible, anticipatory energy, [STYLE], 16:9

---

### `apps/hero-wedding-bingo.jpg`

> A wedding guest looking at their phone with a wide, delighted grin, mid-yell of "bingo!", the guest beside them laughing in disbelief, cocktail hour energy, everyone nearby turning to look, [STYLE], 16:9

---

### `apps/hero-advice-oracle.jpg`

> A guest sitting thoughtfully at a table, pen touching lip, writing advice on a phone or card, a quiet contemplative moment in a lively room, warm candlelight, the feeling of wanting to say exactly the right thing, [STYLE], 16:9

---

### `apps/hero-relationship-exhibit.jpg`

> Wedding guests gathered around a large display wall or print exhibit, reading text and looking at photos of the couple's story, pointing, leaning in, discovering something, like wandering through a museum at a party, [STYLE], 16:9

---

### `apps/hero-where-next-map.jpg`

> An overhead close-up of a world map or travel atlas on a table with wine, hands hovering over it pointing to different countries, the energy of planning the next adventure together, warm window light, [STYLE], 16:9

---

### `apps/hero-collaborative-soundtrack.jpg`

> A wedding guest holding their phone up toward a DJ booth or speaker, the DJ visible in the background with headphones on, the guest's face lit by phone screen glow, music-request energy, motion in the background from dancing guests, [STYLE], 16:9

---

### `apps/hero-love-letter-machine.jpg`

> A person sitting alone in a quiet corner of a wedding reception reading something on their phone, hand pressed to their heart, eyes glistening, string lights blurred in background, the weight of receiving something unexpected and sincere, [STYLE], 16:9

---

### `apps/hero-emotion-pulse.jpg`

> A wide shot of a wedding reception with dozens of phone screens glowing simultaneously in the slightly dimmed room, faces lit by individual screen light, all guests in a shared emotional moment, a collective breath, [STYLE], 16:9

---

### `apps/hero-secret-relay.jpg`

> A guest leaning across the wedding table whispering into another guest's ear, recipient's eyebrows raised in delighted surprise, others at the table leaning in trying to hear, mischievous energy, [STYLE], 16:9

---

### `apps/hero-cocktail-quiz.jpg`

> A cocktail bar at a wedding reception, three personalized drinks lined up on the counter with small printed cards labeling each one, a bartender in the background mixing, warm amber bar light, intimate and bespoke, [STYLE], 16:9

---

### `apps/hero-parallel-universe.jpg`

> A wedding couple in formal attire standing together, a soft double-exposure effect faintly showing two different scenes layered in the background — one serious, one laughing — the feeling of two paths that converged, dreamy and conceptual, [STYLE], 16:9

---

### `apps/hero-who-said-it.jpg`

> Wedding guests at dinner all leaning toward the person next to them debating something, some pointing at the display screen showing a quote, the energy of everyone having a strong opinion all at once, lively and funny, [STYLE], 16:9

---

### `apps/hero-story-chain.jpg`

> A guest passing their phone to the person next to them at a wedding reception table, both looking at the screen with big grins, a chain of similar small exchanges visible along the rest of the table in the soft background, collaborative and playful, [STYLE], 16:9

---

### `apps/hero-ask-us-anything.jpg`

> The newlywed couple sitting together at a head table or sweetheart table, leaning toward each other reading something on a phone screen, amused and slightly surprised by a question they just saw, intimate and warm, [STYLE], 16:9

---

### `apps/hero-video-guestbook.jpg`

> A wedding guest holding their phone up at arm's length recording a short video message, a big warm smile, slightly emotional, they're clearly saying something heartfelt, other guests visible softly in background, [STYLE], 16:9

---

### `apps/hero-home-the-room-built.jpg`

> An elegant aerial close-up of a hand-sketched or printed floor plan on a cream card, surrounded by pen marks and small illustrated details added by guests, on a wedding table with candles, the feeling of something being built together in real time, [STYLE], 16:9

---

### `apps/hero-first-look-voice-letter.jpg`

> A groom or partner standing alone just before the ceremony begins, eyes closed, earbuds in, hand pressed to chest, listening to something private and deeply meaningful, daylight from a nearby window, still and sacred, [STYLE], 16:9

---

## Note: Phone Screenshot Images

The files at `public/images/apps/phones/[slug].png` are **not photography** — they are intended to be actual UI screenshots of the rendered `PhoneScene` component for each app. The `AppHero` component only shows them if the file exists. To generate them:

1. Run the dev server
2. Navigate to `/apps/[slug]`
3. Isolate and screenshot the `PhoneScene` component at the correct dimensions (IPHONE spec from `components/demo/deviceSpec.js`)
4. Export at 2x resolution as PNG

These do not need AI image generation — they are captures of the actual built UI.
