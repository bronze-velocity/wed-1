# Demo App v2: The Unprompted Love Letter Machine (#16)

# OBS
so that the demo works on mobile screens, maybe there should be a pillswitcher for switching between the different interfaces on mobile.


## Why Not Bingo

Bingo keeps guests checking their phones all night — tapping squares every time something happens. That's phone-first, experience-second. It competes with the wedding rather than amplifying it.

---

## The Pick

**The Unprompted Love Letter Machine** — guests write one secret message (anonymous by default) to the bride, the groom, or both during cocktail hour or dinner. At a chosen moment, the couple sits together and reads them live on screen for the first time, one by one, in front of everyone.

---

## Why This One

**Phone use is five minutes, once.** Guest writes their message, puts their phone away, and then watches. For the rest of the night their eyes are on the couple, not a screen.

**The payoff is entirely communal.** The big moment — the couple reading live, in real time, in front of the room — happens on the shared screen. Guests aren't looking at their own phones; they're watching two people they love read things written specifically for them. That's a room-wide experience.

**The "we need this" moment is visceral.** The second a couple imagines sitting together and reading what their closest people actually wrote — not a toast they rehearsed, not advice on a card, but something someone typed in the moment because they meant it — they feel it immediately. There's nothing generic about it.

**It captures what generic guest books never do.** A handwritten card in a book gets read once, alone, weeks later. This happens live, together, witnessed by everyone who wrote the messages. The emotional stakes are completely different.

**Demos beautifully solo.** Show a feed of sample messages (funny ones, serious ones, anonymous ones), the moderation queue, and the reveal interface where the couple controls the pace. The concept is self-evident in seconds.

**Grandma's message.** The moment you say "imagine your grandmother writing something to you at your wedding that you read together for the first time, in that room, surrounded by everyone you love" — the sale is done.

---

## Landing Page Intro Language

### Headline
**Read it together. For the first time. In front of everyone.**

### Subheadline
The Unprompted Love Letter Machine — your guests write one message. You read them live.

### Body

No one rehearses this.

During cocktail hour, your guests write you a secret message — a memory, a wish, something they've never said out loud. It takes five minutes. Then they put their phones away.

At dinner, you sit together and read them for the first time — on screen, one by one, at your own pace. The room watches.

Some will make you laugh. Some will wreck you. Most will be from people you didn't expect.

It's not a speech. It's not a toast. It's what the people who love you most actually wanted to say — written in the moment, meant for that night, addressed to you.

---

*We build it for you. Guests submit via QR code, no app install. You get a moderation queue to review before the live reading. After the wedding, every message is yours in a formatted keepsake document.*

> what's the best way to display this as a demo on the landing page? given there's an         
  interface for guests and one for admin who can pick out and rearrange, and one for sharing  
  on the big screen

This is a design question worth thinking through carefully. Here's my take:

**The three interfaces tell a story with a natural order:** guest submits → couple curates → room watches. The landing page demo should tell that story in sequence, and it matters which one you end on.

**End on the big screen.** The reveal moment is the emotional climax — full-width, cinematic, dramatic. If visitors scroll through the demo and the last thing they see is a message appearing on a big screen in a dark room, that's the image they carry. Starting or burying it loses the punch.

**Device frames do real work here.** The guest interface belongs in a phone. The admin queue belongs in a laptop or tablet. The big screen belongs in a widescreen TV frame or just raw full-bleed. Different frames signal "these are genuinely different experiences happening simultaneously" without needing to explain it.

**The best version is interactive, not just illustrated.** Let the landing page visitor actually type a message in the phone mockup, watch it appear in the admin queue live (frontend-only simulation, no backend needed), then hit a "reveal it" button that triggers the big-screen animation. They feel the flow instead of reading about it. That experience is the demo — they've just done what their guests will do.

**The admin view should be brief but reassuring.** It's not the emotional hook, it's the trust signal: the couple sees every message before it goes up. A quick glance at a moderation queue is enough. Don't linger there.

So: vertical scroll, phone frame → tablet admin frame (brief) → full-bleed TV frame as the hero. Interactive if you can swing it, animated fallback if not. The sequence mirrors the wedding night itself.

Want me to build this out?