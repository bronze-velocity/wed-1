# AI security
Done. Summary of the 5 changes:

**1. Untrusted-text delimiters (`lib/moodboard/prompts.js`)**
- Every freeform value (`guestFreeform`, each `story.*`, and every `customEntries` text) is now wrapped in `<untrusted_input>…</untrusted_input>` via a `wrapUntrusted()` helper that escapes any occurrence of the delimiter inside user text (`<untrusted_input_>`).
- System prompt gained a `SECURITY:` block instructing the model to treat delimited content as data only and to ignore any commands, role changes, or system-prompt requests inside it.

**2. Smuggling-char scrubber (`lib/moodboard/validateAnswers.js`)**
- New exported `scrubForLLM(str)` — NFC-normalizes then strips C0/C1 controls (keeps `\t\n\r`), zero-width chars, BiDi overrides, BOM, and Unicode tag characters (U+E0000–U+E007F).
- All freeform fields (`guestFreeform`, story values, custom-entry text) now go through `cleanString` which runs the scrub before slicing.

**3. Enforced JSON output (`app/api/moodboard/match/route.js`)**
- Added `response_format: { type: 'json_object' }` to the completion call. The regex code-fence strip stays as a belt-and-braces fallback.

**4. Timeout / AbortController**
- New `LLM_TIMEOUT_MS = 15_000`. `callOpenRouter` now spins up an `AbortController`, passes `{ signal }` to the SDK, and clears the timeout in `finally`. A hung upstream fails fast into the deterministic fallback.

**5. Output field caps + sourceQuote verification**
- New `OUTPUT_LIMITS` (`threeWords 40`, `rationale 400`, `personalReason 300`, `inventedTitle 60`, `inventedDescription 200`, `inventedWhy 300`, `inventedQuote 200`).
- `stitchResult` and `filterInventedApps` clip every user-facing string; if a capped rationale ends up empty we fall back to the deterministic `fallbackRationale`.
- `buildUserCorpus(answers)` builds a lowercase concatenation of everything the couple actually wrote. `inventedApps[*].sourceQuote` is set to `null` unless it's a substring of that corpus — so the model can't attribute a fabricated quote to them.