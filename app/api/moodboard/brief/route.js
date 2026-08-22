import { sendMail } from '@/lib/mailer.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const STORY_LABELS = {
  howWeMet:   'How they met',
  insideJoke: 'Their inside joke',
  mostUs:     'Most "them" thing',
  movieGenre: 'Movie genre',
  soUs:       '"That was so us"',
}

function buildBriefHtml(email, results, answers) {
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

  return `
    <h2>Moodboard brief — ${results.threeWords}</h2>
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

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { email, results, answers } = body

  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: 'Valid email required' }, { status: 400 })
  }
  if (!results?.matches?.length) {
    return Response.json({ error: 'Results missing' }, { status: 400 })
  }

  try {
    await Promise.all([
      sendMail({
        to: process.env.CONTACT_EMAIL_TO,
        subject: `Moodboard brief — ${results.threeWords} — ${email}`,
        html: buildBriefHtml(email, results, answers ?? {}),
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
