'use client'

import { useEffect, useRef, useState } from 'react'

const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  'mailto:hello@wepho.com?subject=Book%20a%2015-min%20call'

function hasAnswers(answers) {
  if (!answers) return false
  return Object.values(answers).some((v) => {
    if (v == null) return false
    if (typeof v === 'string') return v.trim().length > 0
    if (Array.isArray(v)) return v.length > 0
    if (typeof v === 'object') return Object.values(v).some((x) => (typeof x === 'string' ? x.trim().length > 0 : Boolean(x)))
    return Boolean(v)
  })
}

function summarizeAnswers(answers) {
  if (!answers) return ''
  const lines = []
  for (const [key, val] of Object.entries(answers)) {
    if (val == null) continue
    if (typeof val === 'string') {
      if (val.trim()) lines.push(`${key}: ${val.trim()}`)
    } else if (Array.isArray(val)) {
      if (val.length) lines.push(`${key}: ${val.join(', ')}`)
    } else if (typeof val === 'object') {
      const nested = Object.entries(val)
        .filter(([, v]) => (typeof v === 'string' ? v.trim() : Boolean(v)))
        .map(([k, v]) => `  ${k}: ${v}`)
        .join('\n')
      if (nested) lines.push(`${key}:\n${nested}`)
    }
  }
  return lines.join('\n')
}

function TalkToUsModal({ answers, onClose }) {
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [includeBrief, setIncludeBrief] = useState(true)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const dialogRef = useRef(null)

  const answersExist = hasAnswers(answers)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !note.trim()) return
    setStatus('loading')
    const briefText = answersExist && includeBrief ? `\n\n--- Brief so far ---\n${summarizeAnswers(answers)}` : ''
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: email.split('@')[0] || 'Moodboard visitor',
          email,
          appInterest: 'Moodboard — Talk to us',
          message: `${note.trim()}${briefText}`,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Talk to Wepho"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(17,17,17,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        animation: 'fadeInUp 200ms ease-out both',
      }}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-bg)',
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-8)',
          maxWidth: 480,
          width: '100%',
          maxHeight: 'calc(100dvh - var(--space-8))',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            right: 'var(--space-4)',
            background: 'none',
            border: 'none',
            padding: 8,
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
            fontFamily: 'inherit',
            lineHeight: 1,
            fontSize: 20,
          }}
        >
          ×
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
            <p style={{ fontSize: 'var(--text-h4)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
              Got it. ✓
            </p>
            <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-secondary)' }}>
              We&rsquo;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <>
            <h2
              style={{
                fontSize: 'var(--text-h3)',
                fontWeight: 800,
                marginBottom: 'var(--space-2)',
                lineHeight: 1.2,
              }}
            >
              Talk to a human
            </h2>
            <p
              style={{
                fontSize: 'var(--text-body-lg)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Skip the quiz — tell us what you&rsquo;re thinking and we&rsquo;ll reply.
            </p>

            <a
              href={BOOKING_URL}
              target={BOOKING_URL.startsWith('http') ? '_blank' : undefined}
              rel={BOOKING_URL.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'block',
                textAlign: 'center',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-4)',
                marginBottom: 'var(--space-6)',
                color: 'var(--color-text-primary)',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: 'var(--text-body)',
              }}
            >
              Book a 15-min call →
            </a>

            <div
              style={{
                textAlign: 'center',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-4)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              or email us
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="contact-field"
                style={{ fontSize: 16 }}
              />
              <textarea
                required
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What&rsquo;s on your mind?"
                rows={3}
                className="contact-field"
                style={{ fontSize: 16, resize: 'vertical', minHeight: 80 }}
              />
              {answersExist && (
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={includeBrief}
                    onChange={(e) => setIncludeBrief(e.target.checked)}
                    style={{ marginTop: 3 }}
                  />
                  <span>Send my brief-so-far with the message</span>
                </label>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
                style={{ marginTop: 'var(--space-2)' }}
              >
                {status === 'loading' ? 'Sending…' : 'Send →'}
              </button>
              {status === 'error' && (
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-accent)',
                    margin: 0,
                  }}
                >
                  Something went wrong — try again or email hello@wepho.com directly.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function TalkToUs({ answers }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          top: 'calc(var(--nav-height) + var(--space-3))',
          left: 'var(--space-4)',
          zIndex: 44,
          background: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 14px',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: 'var(--shadow-xs)',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        Talk to us →
      </button>
      {open && <TalkToUsModal answers={answers} onClose={() => setOpen(false)} />}
    </>
  )
}
