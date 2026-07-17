# Confirmed Decisions

All open questions from pre-task-creation are resolved. This is the single source of truth.

---

## Product Decisions

| Decision | Answer |
|---|---|
| Brand name | **Wepho** |
| Price per app | **~$2,000** |
| Real photos available | **Yes** — use real photography, not placeholder illustrations |
| `/apps` gallery page | **Both** — homepage has a compressed gallery (6 cards + "see all →"), `/apps` has the full experience with all filters |

---

## Technical Decisions

### Contact / Booking CTA
**Decision: Serverless function + Nodemailer**

When a visitor clicks "Book this app" or submits an inquiry:
- A contact form captures: name, email, wedding date, which app(s) they're interested in, message
- Form POSTs to a Next.js Route Handler at `app/api/contact/route.js`
- The Route Handler sends the email via Nodemailer (SMTP credentials in env vars)
- Visitor sees a success state inline (no page redirect)
- No third-party form service needed

Env vars needed: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL_TO`

### Demo: The Love Letter Machine (#16)
**Decision: Fully interactive (frontend state only, no backend)**

The demo on the homepage lets the visitor:
1. **Phone frame** — type a real message into the guest input (with a "To: Both of us" selector and optional name field)
2. **Admin frame** — message appears in a mock moderation queue; visitor clicks "Approve" to surface it
3. **Big screen frame** — approved message animates onto a full-bleed display wall

All state lives in React (`useState`). No network calls. The sequence is guided (auto-advances with delays after each action) but the visitor's input is real — they type their own message.

On mobile: a pill switcher lets visitors flip between the three frames (phone / queue / screen) since all three can't show simultaneously on a small screen.

### Demo interactivity detail
- The phone frame auto-focuses the input on mount
- After the visitor types and submits, a 600ms delay then auto-switches to the admin frame
- The admin frame shows their message in a queue with a glowing "Approve" button
- After approval, a 400ms delay then auto-switches to the big screen frame
- The big screen frame shows the message appearing with a cinematic fade-in
- A "reset" button resets all state so they can try again

### App Page Structure
Each `/apps/[slug]` page follows the 7-section template from `zz/info/mkting-page-structure-shorter.md`:
1. Hero (headline + subhead + phone mockup + CTA)
2. The Scene (3–5 sentence narrative, no product language)
3. How It Works (3-column: set it up / guests use it / you keep it)
4. What's on the Big Screen (one sentence + display wall mockup)
5. Is This You? (3 bullets for self-selection)
6. Book It (CTA)
7. FAQ (4 questions max)

Content for each section is stored in `data/apps.js` (extended from the JSON source). See `architecture.md` for the full data shape.
