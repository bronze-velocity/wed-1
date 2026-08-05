# Per-App Hero Background Image Prompts

Prompts for generating the full-bleed hero photo used on each `/apps/[slug]` marketing page. Rendered behind a heavy dark scrim (`--scrim-heavy`) with headline + subhead + CTA overlaid, so **compose for negative space on the left side** and keep contrast headroom for white type.

## File output convention

Save each generated image to:

```
public/images/apps/hero-<slug>.jpg
```

`AppHero.js` picks this up automatically. Alternatively set `extended.hero.image` in `data/apps.js` to override the path.

## Global style spec (prepend to every prompt)

> Editorial wedding photography, cinematic and candid — shot on a Sony A7 IV with a 35mm f/1.4, ambient warm light (golden hour or warm interior tungsten), shallow depth of field, film-grain texture, soft blooming highlights. Muted natural palette with warm amber and dusty rose accents. Real people, real skin texture, no stock-photo gloss. Wide 16:9 aspect. Leave the left third of the frame quieter (softer bokeh / darker) so overlaid white type stays legible. No text, no logos, no watermarks. Photojournalism, not staged influencer content.

Every prompt below should be concatenated with the block above.

---

## 1. couple-trivia — Live "How Well Do You Know Us?" Trivia
`hero-couple-trivia.jpg`

A wide shot of a candlelit reception hall mid-dinner: a long banquet table in the foreground with guests half-turned toward a large softly-glowing projection screen at the back of the room, one hand raised mid-answer, another guest laughing with her phone lit under her chin. The screen glow washes the room in warm amber. Feeling: shared attention, one-room-one-question. Focal action right-of-center; leave the left side to softer background bokeh of string lights.

## 2. venue-scavenger-hunt — Venue Scavenger Hunt with Their Love Story
`hero-venue-scavenger-hunt.jpg`

Cocktail hour in a garden venue at golden hour: two guests in wedding attire crouched near an ivy-covered stone wall, one holding a phone up to a small elegant brass plaque, the other pointing at something off-frame with a delighted expression. Champagne flute set on the wall next to them. Warm side-light, lens flare kissing the top corner. Composition weighted right — leave the left half a soft blur of foliage and bistro lights.

## 3. anniversary-time-capsule — Anniversary Time Capsule
`hero-anniversary-time-capsule.jpg`

An older woman in her 70s, elegantly dressed for a wedding, sitting alone at a candlelit table, holding a phone with both hands as she speaks softly into it. Her face is caught mid-sentence, eyes wet but smiling — she's leaving a message she knows the couple will hear years from now. Blurred candle flames and other guests deep in the background. Intimate and quiet. Left third: dark, warm shadow.

## 4. bucket-list-builder — Guest Bucket List Builder
`hero-bucket-list-builder.jpg`

Tight over-the-shoulder view of a guest at a dinner table adding an entry on his phone, with a large projected wall in the soft-focus background showing dozens of hand-typed lines slowly climbing a screen (represent as glowing warm text blocks, unreadable). Another guest across the table gestures animatedly toward the wall. Feels alive, additive, communal. Compose action to the right, leave left in tabletop bokeh (wine glass, candle stem).

## 5. conversation-starters — Table-Specific Conversation Starter Cards
`hero-conversation-starters.jpg`

A round dinner table shot from a low angle: four guests leaning in toward each other mid-laugh, one holding out her phone flat on the table so the others can read what's on it. A near-empty bread basket, tilted wine glasses, one hand animatedly gesturing. Warm candlelight from the center of the table under-lights their faces. The camera is a stranger's-eye-view of a table finally clicking. Leave upper-left of frame softer — a votive candle bokeh.

## 6. prediction-vault — The Prediction Vault
`hero-prediction-vault.jpg`

A single guest — mid-30s man in a linen suit — hunched thoughtfully over a phone at a beautifully set dinner table, brow slightly furrowed, half-smile. On the projection wall behind him, a large soft-focus histogram glows in warm colors, guests in silhouette watching it. Feels like committing a secret prediction. Right-anchored subject, negative space left for text.

## 7. guest-memory-map — Guest Memory Map
`hero-guest-memory-map.jpg`

Wide reception shot dominated by a large glowing projection of a rotating 3D globe covered in pulsing pin-dots of warm amber light. Silhouettes of guests standing in loose clusters watching the screen, one child pointing up at it. The globe's blue-warm glow is the primary light source in the room. Cinematic, "quiet awe" feel. Composition centered-right; keep left in a dark room-edge shadow.

## 8. live-roast-board — The Live Roast Board
`hero-live-roast-board.jpg`

A best-man in his 30s standing beside the DJ booth grinning as he reads a phone in one hand and holds a microphone in the other. Behind him a large screen glows with a soft blurred wall of short text blocks (unreadable). The head table is visible in mid-ground, groom in mock-horror covering his face, bride mid-laugh. Warm reception lighting, real energy, imperfect. Anchor right, quieter left.

## 9. unpopular-opinions — The Couple's Unpopular Opinions Icebreaker
`hero-unpopular-opinions.jpg`

Two strangers at a cocktail hour — a woman in a slip dress with a martini, a man in a rumpled blazer — mid-debate, both laughing, one holding a phone up like exhibit A. In the background, a projection screen shows a soft-focus horizontal bar chart with two glowing warm-and-rose colored bars. Bistro lights above. Playful conflict. Right-anchored, left in bar-blur.

## 10. first-dance-ballot — The First Dance Reveal Ballot
`hero-first-dance-ballot.jpg`

A hushed reception moment: the whole room facing a large screen showing a soft-focus large-format countdown in warm amber. Guests holding phones just below their chins, faces lit by the countdown's warm glow. In the near-center foreground, the couple standing on the dance floor, hands clasped, looking at the screen with anticipation. Cinematic, breath-held. Compose so the couple are in the right-of-center third.

## 11. wedding-bingo — Custom Wedding Bingo
`hero-wedding-bingo.jpg`

Guests at a long banquet table mid-reception, one older man mid-fist-pump with a phone lit in his other hand, wife next to him laughing and pointing at his screen. A speaker at the head table in blurred background gesturing during a toast. The winning-a-tiny-victory feeling. Warm reception light, candles down the table's centerline. Anchor action right-of-center.

## 12. advice-oracle — The Guest Advice Oracle
`hero-advice-oracle.jpg`

A grandmother in a soft-focus foreground, hands folded over a phone in her lap, mid-thought as she composes something. On the back wall, a projection of a scrolling glowing wall of short text blocks (unreadable) drifts upward. Other guests in the near background are half-turned to read the wall. Quiet, warm, generational. Subject slightly right of center; left third dark and calm.

## 13. relationship-exhibit — The Relationship Origin Story Exhibit
`hero-relationship-exhibit.jpg`

Cocktail hour in a candlelit lounge area: two guests, phones lit under their faces, standing shoulder-to-shoulder engrossed as one scrolls through what looks like a photo timeline. A third guest leans in over their shoulder. All three faces softly awash in phone glow. Behind them, dim bar lights and floating candles. Museum-in-your-pocket mood. Compose right, left in ambient bokeh.

## 14. future-home-map — Design Our Future Home Map
`hero-future-home-map.jpg`

Wide reception shot with a large projected world map on the back wall — soft focus, glowing amber pin-clusters over Europe and Southeast Asia. In the mid-ground, guests turned toward the wall, one gesturing broadly at a specific region while others at the same table laugh. Head-tilt-and-argue energy. Anchor action right, keep left in candlelit table-edge blur.

## 15. collaborative-soundtrack — The Collaborative Soundtrack
`hero-collaborative-soundtrack.jpg`

Dance floor at full tilt: warm gel lights, DJ booth's soft blue glow at the far end, guests mid-motion in a slight motion blur. In the near foreground, one guest raising her phone briefly as she dances, screen a soft glow. Above the DJ, a projection panel shows a large blurred short line of text (unreadable, warm-toned). Feels like joy caught mid-frame. Anchor motion right, left in soft light-streak.

## 16. love-letter-machine — The Unprompted Love Letter Machine
`hero-love-letter-machine.jpg`

The couple seated together on stools at the front of a hushed reception, both looking up at a large projected screen (blurred, showing what appears to be handwritten script in glowing warm ink). The bride's hand is over her mouth; the groom's arm is around her shoulder, his own eyes glistening. The whole room in soft silhouette watching them read. Sacred, cinematic. Compose the couple in the right-of-center third.

## 17. emotion-pulse — Wedding Day Emotion Pulse
`hero-emotion-pulse.jpg`

An intimate reception moment right after the first dance — guests at a table wiping their eyes and laughing at once, one tapping softly on a phone. On the back wall, a projected soft-focus line-graph glows warmly, curving upward and to the right (represent as abstract luminous line, not text). Painterly warmth, real emotion. Anchor to the right, left is warm shadow.

## 18. secret-relay — Table-to-Table Secret Relay
`hero-secret-relay.jpg`

A candid moment between two dinner tables: three guests from one table walking toward another, one holding out a phone screen with a mischievous grin. The receiving table looks up, one guest half-standing, another laughing while pointing. Server passing behind carrying plates, soft motion blur. Room feels alive with cross-table conspiracy. Anchor action right-of-center.

## 19. cocktail-quiz — The Personalized Cocktail Quiz
`hero-cocktail-quiz.jpg`

Cocktail hour at a beautifully styled bar: warm backlit bottles, a bartender in the mid-ground mid-pour. In the near foreground, a guest laughing as she shows her phone to a stranger next to her, both holding matching signature cocktails garnished with rosemary and citrus. Sparkle of golden-hour light through a nearby window. Anchor subjects right, left in soft bar-bokeh.

## 20. parallel-universe — The Parallel Universe Game
`hero-parallel-universe.jpg`

Dinner reception mid-course: a guest hunched forward over her phone, biting her lip in concentration and half-laughing as she writes something. Wine glass in her free hand. Across the table, her partner watches her with an amused, curious expression, waiting for the reveal. Warm intimate candlelight, soft rim-light from a distant projector wall. Anchor subject right of center.

## 21. who-said-it — Who Said It?
`hero-who-said-it.jpg`

A rowdy dinner-table moment: six guests all reacting at once to a shared reveal — two mid-shout with hands raised in disbelief, one clutching another's arm laughing, one leaning back cackling with a napkin at her mouth. In the blurred background, a large projection wall glows warmly with what looks like a text-message thread (unreadable). Warm candlelight, chaotic joy. Anchor mid-right; left in table-edge bokeh (glassware, half-eaten dessert).

## 22. story-chain — The Story Chain
`hero-story-chain.jpg`

A wide reception shot: guests at multiple tables all half-turned toward a big projection wall that glows with a soft blur of stacked short lines (represent as luminous horizontal bars, unreadable). One guest in the foreground types on her phone with a smirk while her tablemates lean in reading over her shoulder. Feels like writing the wedding's group novel together. Anchor right-of-center; left in candlelit ambient blur.

## 23. ask-us-anything — Ask Us Anything
`hero-ask-us-anything.jpg`

The couple standing together at the mic during dessert, laughing awkwardly-in-love at an unseen question — bride mid-eyeroll-smile at the groom, groom holding the mic with a "do I really have to answer this" grin. Blurred reception hall behind them, warm chandelier light. Champagne flutes on a nearby table catching sparkles. Anchor the couple right-of-center; left in bokeh of glassware and warm lights.

## 24. video-guestbook — The Two-Minute Video Guestbook
`hero-video-guestbook.jpg`

An older guest at his dinner table holding a phone at arm's length, mid-recording, speaking sincerely into the camera. His face is warmly lit by the phone screen and candlelight; his eyes are soft, remembering. A grandson beside him steadying his arm and encouraging him. Other tables in gentle background blur. Anchor subject right, left in candlelit shadow.
