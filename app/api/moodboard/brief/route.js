import { sendMail } from '@/lib/mailer.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const STORY_LABELS = {
  howWeMet:   'How they met',
  insideJoke: 'Their inside joke',
  mostUs:     'Most "them" thing',
  movieGenre: 'Movie genre',
  soUs:       '"That was so us"',
}

function buildBriefHtml(email, results, answers, keepBrief) {
  const topMatches = results.matches
    .slice(0, 3)
    .map(
      (m) => `<li><strong>${m.id}</strong> (score ${m.score}): ${m.whyItFitsYou}</li>`
    )
    .join('\n')

  const storyRows = Object.entries(answers.story ?? {})
    .filter(([, v]) => v?.trim())
    .map(([k, v]) => `<tr><td>${STORY_LABELS[k] ?? k}</td><td><em>"${v}"</em></td></tr>`)
    .join('\n')

  const retentionBanner = keepBrief
    ? `<p style="padding:8px 12px;background:#EDE9FF;border-radius:6px;font-size:13px"><strong>Retention:</strong> couple opted in to keep this brief. OK to retain in follow-up notes.</p>`
    : `<p style="padding:8px 12px;background:#F7F6F3;border-radius:6px;font-size:13px"><strong>Retention:</strong> couple did NOT opt in. Delete this brief from notes after replying (90-day max).</p>`

  return `
    <h2>Moodboard brief — ${results.threeWords}</h2>
    ${retentionBanner}
    <p><strong>Email:</strong> ${email}</p>
    <h3>Matches</h3>
    <ul>${topMatches}</ul>
    ${results.hiddenMatches?.length ? `<h3>Hidden matches</h3><ul>${results.hiddenMatches.map((m) => `<li><strong>${m.id}</strong>: ${m.whyItFitsYou}</li>`).join('')}</ul>` : ''}
    <h3>Their brief</h3>
    <table cellpadding="6">
      ${answers.vibes?.length ? `<tr><td>Vibes</td><td>${answers.vibes.join(', ')}</td></tr>` : ''}
      ${answers.moments?.length ? `<tr><td>Moments</td><td>${answers.moments.join(', ')}</td></tr>` : ''}
      ${answers.feelings?.length ? `<tr><td>Feelings</td><td>${answers.feelings.join(', ')}</td></tr>` : ''}
      ${answers.guestFreeform ? `<tr><td>Guest list</td><td><em>"${answers.guestFreeform}"</em></td></tr>` : ''}
      ${storyRows}
    </table>
  `
}

function buildConfirmationHtml(results) {
  const appNames = results.matches
    .map((m) => m.id.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' '))
    .join(', ')

  return `
    <h2>Your Wepho brief — ${results.threeWords}</h2>
    <p>Here's a copy of the brief you built. Your top matches: <strong>${appNames}</strong>.</p>
    <p>We'll be in touch to talk through your picks and figure out what we'd build for you.</p>
    <p>— The Wepho team</p>
  `
}

// GDPR note: this route intentionally does not persist the brief anywhere —
// it only sends two emails. If you add logging or a DB write here, mask the
// email address and drop `answers` (freeform personal content) before it
// touches Vercel logs or any store, and honour `keepBrief` as the lawful
// basis for keeping the row past the email send (default TTL: 90 days).
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { email, results, answers, keepBrief } = body

  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: 'Valid email required' }, { status: 400 })
  }
  if (!results?.matches?.length) {
    return Response.json({ error: 'Results missing' }, { status: 400 })
  }

  const keep = keepBrief === true

  try {
    await Promise.all([
      sendMail({
        to: process.env.CONTACT_EMAIL_TO,
        subject: `Moodboard brief${keep ? ' [KEEP]' : ''} — ${results.threeWords} — ${email}`,
        html: buildBriefHtml(email, results, answers ?? {}, keep),
      }),
      sendMail({
        to: email,
        subject: `Your Wepho brief — ${results.threeWords}`,
        html: buildConfirmationHtml(results),
      }),
    ])
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Mail error' }, { status: 500 })
  }
}
