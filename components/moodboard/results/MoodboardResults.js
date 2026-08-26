'use client'

import { useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import ResultCard from './ResultCard'
import { slugify } from '@/lib/moodboard/slug'

// ── Section 1 ────────────────────────────────────────────────────────────────

function ThreeWords({ threeWords }) {
  const words = threeWords
    .split(/\.\s*/)
    .map((w) => w.trim())
    .filter(Boolean)

  return (
    <section
      className="moodboard-results-intro"
      style={{ textAlign: 'center', background: 'var(--color-bg)' }}
    >
      <Container>
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-secondary)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-6)',
            animation: 'fadeInUp 500ms ease-out both',
          }}
        >
          Based on what you told us.
        </p>
        <h1
          aria-label={threeWords}
          style={{
            fontFamily: 'var(--font-serif-accent)',
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            lineHeight: 1.15,
            fontStyle: 'italic',
            color: 'var(--color-text-primary)',
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                animation: `fadeInUp 500ms ease-out ${200 + i * 200}ms both`,
              }}
            >
              {word}.
            </span>
          ))}
        </h1>
      </Container>
    </section>
  )
}

// ── Section 2 ────────────────────────────────────────────────────────────────

function MatchedApps({ matches, onWantThis }) {
  return (
    <section
      className="moodboard-results-matches"
      style={{ background: 'var(--color-bg-subtle)' }}
    >
      <Container>
        <h2
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 800,
            marginBottom: 'var(--space-6)',
            animation: 'fadeInUp 500ms ease-out 100ms both',
          }}
        >
          Three that feel like you
        </h2>
        <div className="moodboard-results-grid">
          {matches.map((match, i) => (
            <ResultCard
              key={match.id}
              match={match}
              index={i}
              onWantThis={onWantThis}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

// ── Section 3 — Hidden Tier ───────────────────────────────────────────────────

function HiddenCard({ match, onWantThis }) {
  return (
    <div
      style={{
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255,255,255,0.12)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      <h3
        style={{
          fontSize: 'var(--text-h4)',
          fontWeight: 800,
          color: 'var(--color-text-inverse)',
          lineHeight: 1.2,
        }}
      >
        {match.id
          .replace(/^the-/, 'The ')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())}
      </h3>
      <p
        style={{
          fontSize: 'var(--text-body-lg)',
          lineHeight: 1.65,
          color: 'var(--color-text-inverse-secondary)',
        }}
      >
        {match.whyItFitsYou}
      </p>
      <button
        onClick={onWantThis}
        style={{
          alignSelf: 'flex-start',
          background: 'none',
          border: '1.5px solid rgba(255,255,255,0.4)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-5)',
          color: 'var(--color-text-inverse)',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        This one excites me →
      </button>
    </div>
  )
}

function HiddenTier({ hiddenMatches, onWantThis }) {
  if (!hiddenMatches?.length) return null

  return (
    <section
      className="section-py"
      style={{ background: 'var(--color-bg-dark)' }}
    >
      <Container>
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-inverse-secondary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          We don&rsquo;t usually show people these.
        </p>
        <h2
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 800,
            color: 'var(--color-text-inverse)',
            lineHeight: 1.25,
            marginBottom: 'var(--space-4)',
          }}
        >
          You picked something about wanting a moment nobody&rsquo;s seen before.
        </h2>
        <p
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--color-text-inverse-secondary)',
            marginBottom: 'var(--space-10)',
            maxWidth: 560,
          }}
        >
          So here are a couple of ideas we&rsquo;ve never built.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {hiddenMatches.map((match) => (
            <HiddenCard key={match.id} match={match} onWantThis={onWantThis} />
          ))}
        </div>
      </Container>
    </section>
  )
}

// ── Section 4 — Brief + Email Gate ───────────────────────────────────────────

const STORY_LABELS = {
  howWeMet: 'How you met',
  insideJoke: 'Your inside joke',
  soUs: '"That was so us"',
  runningDebate: 'Your running debate',
  shockGuests: "What guests don't know",
  ritual: 'Your ritual',
  anthem: 'What means "us"',
  bestStoryteller: 'Your best storyteller',
}

function BriefEmailGate({ results, answers, sectionRef, onBriefSent, shared, lockedSlug }) {
  const [email, setEmail] = useState('')
  const [keepBrief, setKeepBrief] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const storyAnswers = Object.entries(answers?.story ?? {})
    .filter(([, v]) => v?.trim())
    .slice(0, 2)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/moodboard/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, results, answers, keepBrief }),
      })
      if (res.ok) {
        setStatus('success')
        onBriefSent?.()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={sectionRef} className="section-py" style={{ background: 'var(--color-bg)' }}>
      <Container narrow>
        {/* Brief summary card */}
        <div
          style={{
            padding: 'var(--space-8)',
            background: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-2xl)',
            marginBottom: 'var(--space-10)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif-accent)',
              fontStyle: 'italic',
              fontSize: 'var(--text-h4)',
              marginBottom: 'var(--space-5)',
              color: 'var(--color-accent)',
            }}
          >
            {results.threeWords}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p
              style={{
                fontSize: 'var(--text-tiny)',
                fontWeight: 700,
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Your top picks
            </p>
            {results.matches.slice(0, 2).map((m) => (
              <p
                key={m.id}
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-primary)',
                  fontWeight: 600,
                }}
              >
                {m.id
                  .split('-')
                  .map((w) => w[0].toUpperCase() + w.slice(1))
                  .join(' ')}
              </p>
            ))}

            {storyAnswers.length > 0 && (
              <>
                <p
                  style={{
                    fontSize: 'var(--text-tiny)',
                    fontWeight: 700,
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginTop: 'var(--space-3)',
                  }}
                >
                  From your brief
                </p>
                {storyAnswers.map(([key, val]) => (
                  <div key={key}>
                    <p
                      style={{
                        fontSize: 'var(--text-tiny)',
                        color: 'var(--color-text-secondary)',
                        marginBottom: 2,
                      }}
                    >
                      {STORY_LABELS[key] ?? key}
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        fontStyle: 'italic',
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.5,
                      }}
                    >
                      &ldquo;{val}&rdquo;
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Email capture */}
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
            <p style={{ fontSize: 'var(--text-h4)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
              Sent. ✓
            </p>
            <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-secondary)' }}>
              Your brief is on its way. We&rsquo;ll be in touch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p
              style={{
                fontSize: 'var(--text-h4)',
                fontWeight: 800,
                marginBottom: 'var(--space-2)',
              }}
            >
              Send me a copy of this brief
            </p>
            <p
              style={{
                fontSize: 'var(--text-body-lg)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-6)',
              }}
            >
              We&rsquo;ll email your brief and may follow up once about your wedding. That&rsquo;s it.
            </p>
            <label htmlFor="moodboard-brief-email" className="visually-hidden">Email address</label>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <input
                id="moodboard-brief-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="moodboard-input"
                style={{ flex: 1, minWidth: 220 }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending…' : 'Send it →'}
              </button>
            </div>
            <label
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                alignItems: 'flex-start',
                marginTop: 'var(--space-5)',
                cursor: 'pointer',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <input
                type="checkbox"
                checked={keepBrief}
                onChange={(e) => setKeepBrief(e.target.checked)}
                style={{ marginTop: 3, width: 16, height: 16, accentColor: 'var(--color-accent)' }}
              />
              <span>
                I&rsquo;d like Wepho to keep my brief so we can pick up the conversation.
                <span style={{ display: 'block', fontSize: 'var(--text-tiny)', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Otherwise we delete our server-side copy within 90 days. See our{' '}
                  <Link href="/privacy" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                    privacy policy
                  </Link>
                  .
                </span>
              </span>
            </label>
            {status === 'error' && (
              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-accent)',
                  marginTop: 'var(--space-3)',
                }}
              >
                Something went wrong — try again or email us directly.
              </p>
            )}
          </form>
        )}

        {!shared && (
          <div style={{ marginTop: 'var(--space-10)' }}>
            <ShareableLink results={results} answers={answers} lockedSlug={lockedSlug} />
          </div>
        )}
      </Container>
    </section>
  )
}

// ── Shareable Link block ─────────────────────────────────────────────────────

function ShareableLink({ results, answers, lockedSlug }) {
  const isEdit = Boolean(lockedSlug)
  const [desiredSlug, setDesiredSlug] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | ready | error
  const [errorMsg, setErrorMsg] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://wepho.com'
  const previewSlug = useMemo(() => slugify(desiredSlug), [desiredSlug])
  const displaySlug = previewSlug || 'auto-generated'

  async function handleShare(e) {
    e.preventDefault()
    if (!isEdit && (!password || password.length < 4)) {
      setStatus('error')
      setErrorMsg('Password must be at least 4 characters.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    setCopied(false)
    try {
      const body = isEdit
        ? {
            answers,
            results,
            lockedSlug,
            meta: { role: answers?.role ?? 'couple' },
          }
        : {
            answers,
            results,
            desiredSlug,
            password,
            meta: { coupleName: desiredSlug || null, role: answers?.role ?? 'couple' },
          }
      const res = await fetch('/api/moodboard/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setStatus('error')
        setErrorMsg(data.error || 'Couldn’t save. Try again.')
        return
      }
      const data = await res.json()
      setShareUrl(data.url)
      setStatus('ready')
    } catch {
      setStatus('error')
      setErrorMsg('Couldn’t save. Try again.')
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div
      style={{
        padding: 'var(--space-6)',
        background: 'var(--color-bg-subtle)',
        borderRadius: 'var(--radius-xl)',
      }}
    >
      <p style={{ fontSize: 'var(--text-h4)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
        {isEdit ? 'Save your changes' : 'Get a shareable link'}
      </p>
      <p
        style={{
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-5)',
          lineHeight: 1.5,
        }}
      >
        {isEdit
          ? 'Overwrites the existing brief at the same link. Your password stays the same.'
          : 'Anyone with the link and password can view it. Pick a password you’d feel comfortable sharing over WhatsApp. Sharing the same name again replaces the old one.'}
      </p>

      <form onSubmit={handleShare}>
        {!isEdit && (
          <>
            <label htmlFor="moodboard-share-name" className="visually-hidden">Share link name</label>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <input
                id="moodboard-share-name"
                type="text"
                value={desiredSlug}
                onChange={(e) => setDesiredSlug(e.target.value)}
                placeholder="jack-and-simone (optional)"
                className="moodboard-input"
                style={{ flex: 1, minWidth: 220 }}
              />
            </div>
            <p
              style={{
                marginTop: 'var(--space-3)',
                fontSize: 'var(--text-tiny)',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-mono, monospace)',
              }}
            >
              {origin.replace(/^https?:\/\//, '')}/moodboard/<strong>{displaySlug}</strong>
            </p>
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
                flexWrap: 'wrap',
                marginTop: 'var(--space-4)',
              }}
            >
              <label htmlFor="moodboard-share-password" className="visually-hidden">Share password</label>
              <input
                id="moodboard-share-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 4 characters)"
                className="moodboard-input"
                style={{ flex: 1, minWidth: 220 }}
                autoComplete="new-password"
                required
                minLength={4}
              />
            </div>
          </>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: isEdit ? 0 : 'var(--space-5)',
          }}
        >
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'loading'}
          >
            {status === 'loading'
              ? 'Saving…'
              : isEdit
              ? 'Save changes →'
              : 'Get my link →'}
          </button>
        </div>
      </form>

      {status === 'ready' && (
        <div
          style={{
            marginTop: 'var(--space-5)',
            padding: 'var(--space-4)',
            background: 'var(--color-bg)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            gap: 'var(--space-3)',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              minWidth: 200,
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-accent)',
              wordBreak: 'break-all',
              textDecoration: 'underline',
            }}
          >
            {shareUrl}
          </a>
          <button
            type="button"
            onClick={copy}
            className="btn btn-secondary"
            style={{ padding: 'var(--space-2) var(--space-4)' }}
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      )}

      {status === 'error' && (
        <p
          style={{
            marginTop: 'var(--space-3)',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-accent)',
          }}
        >
          {errorMsg || 'Couldn’t save the link — try again.'}
        </p>
      )}
    </div>
  )
}

// ── Root composition ──────────────────────────────────────────────────────────

export default function MoodboardResults({
  results,
  answers,
  onBriefSent,
  shared = false,
  lockedSlug = null,
}) {
  const emailRef = useRef(null)

  function scrollToEmail() {
    emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="moodboard-results">
      <ThreeWords threeWords={results.threeWords} />
      <MatchedApps matches={results.matches} onWantThis={scrollToEmail} />
      <HiddenTier hiddenMatches={results.hiddenMatches} onWantThis={scrollToEmail} />
      <BriefEmailGate
        results={results}
        answers={answers}
        sectionRef={emailRef}
        onBriefSent={onBriefSent}
        shared={shared}
        lockedSlug={lockedSlug}
      />
    </main>
  )
}
