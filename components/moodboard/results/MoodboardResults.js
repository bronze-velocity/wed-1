'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import ResultCard from './ResultCard'

// ── Section 1 ────────────────────────────────────────────────────────────────

function ThreeWords({ threeWords }) {
  const words = threeWords
    .split(/\.\s*/)
    .map((w) => w.trim())
    .filter(Boolean)

  return (
    <section
      className="section-py"
      style={{ textAlign: 'center', background: 'var(--color-bg)' }}
    >
      <Container>
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-muted)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-6)',
            animation: 'fadeInUp 500ms ease-out both',
          }}
        >
          Based on what you told us.
        </p>
        <div
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
        </div>
      </Container>
    </section>
  )
}

// ── Section 2 ────────────────────────────────────────────────────────────────

function MatchedApps({ matches, onWantThis }) {
  return (
    <section
      className="section-py"
      style={{ background: 'var(--color-bg-subtle)' }}
    >
      <Container>
        <h2
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 800,
            marginBottom: 'var(--space-10)',
            animation: 'fadeInUp 500ms ease-out 100ms both',
          }}
        >
          Apps that feel like you
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
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
  howWeMet:   'How you met',
  insideJoke: 'Your inside joke',
  mostUs:     'Most "you" thing',
  movieGenre: 'Your movie genre',
  soUs:       '"That was so us"',
}

function BriefEmailGate({ results, answers, sectionRef }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [copied, setCopied] = useState(false)

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
        body: JSON.stringify({ email, results, answers }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  function copyLink() {
    try {
      const payload = btoa(JSON.stringify({ results, answers }))
      const url = `${window.location.origin}/moodboard?brief=${payload}`
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    } catch {
      // silently fail
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
                color: 'var(--color-text-muted)',
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
                    color: 'var(--color-text-muted)',
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
                        color: 'var(--color-text-muted)',
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
              We&rsquo;ll send it to your inbox and follow up to talk through your picks.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="contact-field"
                style={{ flex: 1, minWidth: 220, fontSize: 16 }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending…' : 'Send it →'}
              </button>
            </div>
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

        {/* Copy link */}
        <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
          <button
            type="button"
            onClick={copyLink}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              textDecoration: 'underline',
              textDecorationColor: 'var(--color-border)',
            }}
          >
            {copied ? 'Link copied ✓' : 'Or copy a link to share with your planner'}
          </button>
        </div>
      </Container>
    </section>
  )
}

// ── Root composition ──────────────────────────────────────────────────────────

export default function MoodboardResults({ results, answers }) {
  const emailRef = useRef(null)

  function scrollToEmail() {
    emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <ThreeWords threeWords={results.threeWords} />
      <MatchedApps matches={results.matches} onWantThis={scrollToEmail} />
      <HiddenTier hiddenMatches={results.hiddenMatches} onWantThis={scrollToEmail} />
      <BriefEmailGate
        results={results}
        answers={answers}
        sectionRef={emailRef}
      />
    </div>
  )
}
