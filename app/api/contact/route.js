import { sendMail } from '../../../lib/mailer.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { name, email, weddingDate, appInterest, message } = body

  if (!name || !email || !appInterest || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const subject = `New Wepho inquiry — ${appInterest} — ${weddingDate || 'date not set'}`

  const html = `
    <h2>New inquiry from Wepho</h2>
    <table cellpadding="6">
      <tr><td><strong>Name</strong></td><td>${name}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      <tr><td><strong>Wedding date</strong></td><td>${weddingDate || '—'}</td></tr>
      <tr><td><strong>App interest</strong></td><td>${appInterest}</td></tr>
      <tr><td><strong>Message</strong></td><td>${message}</td></tr>
    </table>
  `

  try {
    await sendMail({ to: process.env.CONTACT_EMAIL_TO, subject, html })
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
