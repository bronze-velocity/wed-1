# Pre-Launch Checklist

Things that must be done before the Wepho site goes live. Mostly about the
**contact form**, which is the only part of the site that depends on external
configuration (SMTP).

---

## ⚠️ OBS — Contact form email delivery

The contact form (`components/ui/ContactForm.js` → `POST /api/contact` →
`lib/mailer.js`) sends inquiries via **Nodemailer over SMTP**. It needs 5
environment variables to actually send mail:

| Variable | What it is |
|---|---|
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (e.g. `587`, `2525`) |
| `SMTP_USER` | SMTP username (also used as the `From` address) |
| `SMTP_PASS` | SMTP password / API key |
| `CONTACT_EMAIL_TO` | Inbox that receives the submissions |

### The dev fallback — and why it matters at launch

In **development**, if the `SMTP_*` vars are blank, `sendMail()` does **not**
send anything — it logs the submission to the terminal and returns success so
the form can be tested locally without credentials.

**This fallback is disabled in production** (`NODE_ENV === 'production'`), by
design: a prod deploy with missing credentials will *error visibly* rather than
silently pretend to send. So the launch risk is not silent success — it's a
visibly broken form. Either way, **you must configure real SMTP before launch.**

---

## Checklist

- [ ] **Pick an SMTP provider.** Recommended: [Resend](https://resend.com) (free
      tier, simple SMTP creds). Alternatives: SendGrid, Postmark, or a Gmail
      account with an App Password.
- [ ] **Verify your sending domain / address** with the provider (SPF/DKIM) so
      mail doesn't land in spam.
- [ ] **Set `CONTACT_EMAIL_TO`** to the real destination inbox for inquiries.
- [ ] **Add all 5 env vars in Vercel** → Project → Settings → Environment
      Variables. Add them to **Production** (and **Preview** if you want the
      form to work on preview deploys).
- [ ] **Redeploy** after adding env vars (Vercel only picks them up on a new
      build).
- [ ] **Test the live form end-to-end** — submit a real inquiry and confirm the
      email actually arrives in `CONTACT_EMAIL_TO`. Do not trust the on-screen
      success message alone.
- [ ] Confirm `.env.local` is **not** committed (it's gitignored) and never
      ships to prod — Vercel uses its own env vars, not this file.

---

## Testing locally

1. Run the dev server (`pnpm dev`).
2. Submit the contact form.
3. **No SMTP configured:** watch the terminal — you'll see the logged submission
   and the form shows its success state.
4. **Real send configured:** copy `.env.local.example` → `.env.local`, fill in
   real SMTP creds + `CONTACT_EMAIL_TO`, restart the dev server, submit, and
   confirm the email arrives.
