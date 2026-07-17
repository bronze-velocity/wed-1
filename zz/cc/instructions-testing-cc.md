73  
      74 +## Workflow                                                                  
      75 +                                                                             
      76 +**Do not run dev servers, open a browser, or run build/lint/test commands to 
         +verify work.** Make the requested code changes and stop — no self-verificatio
         +n loop. This overrides any default instruction to "test in a browser before r
         +eporting complete." The user will run and check the app themselves.          
      77 +                                                                             
      78 +---                                                                          
      79 +                                                                             
      80  ## Folder Structure (brief)
      81  
      82  ```

● Added a Workflow section to CLAUDE.md that explicitly overrides the default "start dev
  server / test in browser" behavior — Claude will now just make the changes and stop, no
  verification loop.

  Read 1 file, recalled 1 memory, wrote 3 memories (ctrl+o to expand)

● Done. CLAUDE.md now has a Workflow section instructing Claude to skip dev servers, browser
  checks, and build/lint/test runs entirely — just make the change and stop. I also saved this
  as a feedback memory so it carries into future sessions on this project.

✻ Cooked for 53s

❯ can you please list some bullets for claude's default instructions when it comes to this?   
  are they different for different models and/or effort levels?
  
  > Here's what's actually in my system prompt about this (the parts CLAUDE.md just overrode for this project):

**From the "Doing tasks" section:**
- For UI/frontend changes: start the dev server and exercise the feature in a browser before reporting the task complete
- Test the golden path *and* edge cases, and watch for regressions in unrelated features
- Type checking and test suites are explicitly called out as insufficient on their own — they "verify code correctness, not feature correctness"
- If UI can't actually be tested (no browser access, etc.), say so explicitly rather than claim success

**Related skills that can trigger similar behavior** (not always automatic — usually keyed off task type or explicit request):
- `verify` — "exercise the change end-to-end and observe behavior," recommended before committing nontrivial changes
- `run` — launches/drives the app to confirm a change works, used when asked to run/start/screenshot the app or on request

On your actual question — differences by model or effort level — I honestly can't tell you with confidence. I only have visibility into my own system prompt as loaded right now (Sonnet 5, this session's settings [effort high]). I have no access to what Opus, Haiku, or Fable are given, or whether reasoning-effort settings change these instructions. If that matters for how you're rolling this out, it's worth confirming with Anthropic docs or support rather than me guessing.

One thing I can confirm: CLAUDE.md instructions are documented to **override default behavior** for this project, which is exactly what the Workflow section I just added does — regardless of what model/effort is running, as long as it respects project CLAUDE.md.