import nodemailer from 'nodemailer'

function hasSmtpConfig() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendMail({ to, subject, html }) {
  // Dev fallback: with no SMTP credentials, log the submission instead of
  // sending so the form can be tested end-to-end locally. Never active in
  // production — a misconfigured prod deploy must fail loudly, not fake success.
  if (!hasSmtpConfig() && process.env.NODE_ENV !== 'production') {
    console.log('\n[contact] SMTP not configured — logging submission instead of sending:')
    console.log(`  To:      ${to || '(CONTACT_EMAIL_TO not set)'}`)
    console.log(`  Subject: ${subject}`)
    console.log(`  Body:\n${html}\n`)
    return { dev: true }
  }

  const transporter = createTransporter()
  return transporter.sendMail({ from: process.env.SMTP_USER, to, subject, html })
}
