# AI De-Slop Skills — GitHub Roundup

Claude Code / agent skills that detect and rewrite tell-tale AI writing patterns (em-dash overuse, "delve/leverage/robust," bulleted bold titles, hedging filler, rule-of-three, etc.). Sorted by GitHub stars.

_Compiled 2026-08-24._

## The list

### 1. blader/humanizer — 37.5k ★
- **Repo:** https://github.com/blader/humanizer
- **What:** Agent skill that removes signs of AI-generated writing from text. Ships as a Claude Desktop-ready release package (v2.11.x).
- **Why look:** Overwhelmingly the most popular in the category. Last push 2026-08-19.

### 2. conorbronsdon/avoid-ai-writing — 3.2k ★
- **Repo:** https://github.com/conorbronsdon/avoid-ai-writing
- **What:** Audits and rewrites content to remove "AI-isms." Portable across Claude Code, OpenClaw, Codex, Hermes.
- **Why look:** Actively maintained (last push 2026-08-23), agent-agnostic format.

### 3. stephenturner/skill-deslop — 359 ★
- **Repo:** https://github.com/stephenturner/skill-deslop
- **What:** De-AI-ify scientific writing specifically — tuned for academic/technical prose rather than marketing copy.
- **Notes:** Author blog post: https://blog.stephenturner.us/p/deslop

### 4. asavvin-pixel/unslop — 55 ★
- **Repo:** https://github.com/asavvin-pixel/unslop
- **What:** English humanizer for Claude covering typography, vocabulary, structure. Calibrates to your voice. Grounded in the UMD / Google DeepMind study and Wikipedia's "Signs of AI writing."
- **Why look:** The most researched/cited approach — good if you want defensible rules, not vibes.

### 5. adamdunkels/deslop-text — 13 ★
- **Repo:** https://github.com/adamdunkels/deslop-text
- **What:** Claude skill that runs 30 checks for tell-tale signs of AI-written text and suggests concrete rewrites for each violation.

### 6. skyzer/deslop-the-copy — 10 ★
- **Repo:** https://github.com/skyzer/deslop-the-copy
- **What:** Portable agent skill that strips AI patterns while preserving writer voice. Works across Claude Code, Codex, OpenClaw, Cursor.

### 7. humanizer-tools/slop-humanizer — 5 ★
- **Repo:** https://github.com/humanizer-tools/slop-humanizer
- **What:** Two-pass rewrite targeting 25+ documented AI patterns, then scores the output before delivering. Synthesized from 8 humanizer repos.
- **Why look:** The "scoring" pass is unusual — useful if you want a numeric slop score.

### 8. bharvey2026/humanise-skill — 0 ★
- **Repo:** https://github.com/bharvey2026/humanise-skill
- **What:** Claude Code skill that strips AI-prose tells (inflated vocab, manufactured antithesis, em-dash overuse, hedging filler, formulaic openers/closers) while preserving every substantive point.

## Topic pages (for browsing beyond this list)

- https://github.com/topics/anti-ai-slop
- https://github.com/topics/humanize-text
- https://github.com/topics/humanize-ai
- https://github.com/topics/text-humanizer
- https://github.com/topics/de-slop

## Common patterns these skills target

Useful as a checklist even if we don't install one:

- **Punctuation:** em-dash overuse (zero-tolerance in most), unnecessary semicolons, curly-quote inconsistency.
- **Banned words:** delve, unlock, leverage, harness, robust, showcase, vibrant, seamless, elevate, empower, foster, tapestry, testament, navigate, journey.
- **Banned phrases:** "in today's fast-paced world," "it's important to note," "at its core," "when it comes to," "the world of."
- **Structure:** rule-of-three lists, inline-header bulleted lists with **bold titles:**, Title Case section headings, metronomic sentence length.
- **Voice:** hedging stacks ("may potentially help"), synonym cycling, uncontracted verbs, manufactured antithesis ("not X, but Y").
- **Adds back:** varied rhythm, real opinions, contractions, specificity, rough edges.

## Recommendation for Wepho

For our distribution copy (Reddit posts, cold emails, blog drafts, pin captions) the two worth trying first are:

1. **conorbronsdon/avoid-ai-writing** — highest-stars actively-maintained one that's already agent-agnostic, so it slots into Claude Code without wrangling.
2. **asavvin-pixel/unslop** — best if we want the changes justified against a research baseline (helpful when Johanna reviews suggested rewrites).

Keep **stephenturner/skill-deslop** in reserve for anything that leans technical/long-form.

## Sources

- [skyzer/deslop-the-copy](https://github.com/skyzer/deslop-the-copy)
- [asavvin-pixel/unslop](https://github.com/asavvin-pixel/unslop)
- [adamdunkels/deslop-text](https://github.com/adamdunkels/deslop-text)
- [conorbronsdon/avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing)
- [stephenturner/skill-deslop](https://github.com/stephenturner/skill-deslop)
- [bharvey2026/humanise-skill](https://github.com/bharvey2026/humanise-skill)
- [humanizer-tools/slop-humanizer](https://github.com/humanizer-tools/slop-humanizer)
- [blader/humanizer](https://github.com/blader/humanizer)
- [Paired Ends — De-slop the text you shouldn't be writing anyway](https://blog.stephenturner.us/p/deslop)
- [GitHub topic: anti-ai-slop](https://github.com/topics/anti-ai-slop)
