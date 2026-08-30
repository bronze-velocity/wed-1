'use client'

import { useState } from 'react'
import Container from '@/components/layout/Container'

export default function BriefPasswordGate({ slug }) {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!password) return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/moodboard/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        window.location.reload()
        return
      }
      setStatus('error')
      setMessage(
        res.status === 429
          ? 'Too many attempts. Try again in a minute.'
          : 'That password didn’t match. Try again.'
      )
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again.')
    }
  }

  return (
    <section
      className="section-py"
      style={{
        minHeight: '80dvh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--color-bg)',
      }}
    >
      <Container narrow>
        <div
          style={{
            padding: 'var(--space-8)',
            background: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-2xl)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Password protected
          </p>
          <h1
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: 'var(--space-3)',
            }}
          >
            This brief is private.
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-8)',
              lineHeight: 1.55,
            }}
          >
            The couple who created it will have the password.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              maxWidth: 360,
              margin: '0 auto',
            }}
          >
            <label htmlFor="moodboard-unlock-password" className="visually-hidden">Brief password</label>
            <input
              id="moodboard-unlock-password"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="moodboard-input"
              style={{ textAlign: 'center' }}
              autoComplete="off"
              maxLength={128}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'loading' || !password}
            >
              {status === 'loading' ? 'Checking…' : 'Unlock →'}
            </button>
            {status === 'error' && (
              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-accent)',
                  marginTop: 'var(--space-2)',
                }}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  )
}
