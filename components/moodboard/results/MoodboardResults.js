'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import ResultCard from './ResultCard'
import ShareSheet from './ShareSheet'
import { slugify } from '@/lib/moodboard/slug'
import { VIBES, GUESTS, MOMENTS, FEELINGS, STORY_QUESTIONS } from '@/lib/moodboard/config'

function buildAnswerChips(answers) {
  const chips = []
  const pushMany = (list, ids, kind, field) => {
    for (const id of ids ?? []) {
      const item = list.find((entry) => entry.id === id)
      if (item) chips.push({ kind, label: item.label, id, field, kind_: 'multi' })
    }
  }
  pushMany(VIBES, answers?.vibes, 'Scene', 'vibes')
  pushMany(GUESTS, answers?.guests, 'Guests', 'guests')
  pushMany(MOMENTS, answers?.moments, 'Moment', 'moments')
  pushMany(FEELINGS, answers?.feelings, 'Feeling', 'feelings')
  return chips
}

function removeChipFromAnswers(answers, chip) {
  const next = { ...answers }
  next[chip.field] = (answers?.[chip.field] ?? []).filter((id) => id !== chip.id)
  return next
}

function AnswerStrip({ answers, onRemoveChip, onAdd, onRerun, dirty, rerunsLeft, rerunning }) {
  const chips = buildAnswerChips(answers)
  if (!chips.length && !onAdd) return null
  const canRerun = dirty && rerunsLeft > 0 && !rerunning
  const outOfReruns = dirty && rerunsLeft <= 0

  return (
    <section
      className="moodboard-answer-strip"
      aria-label="Your answers"
      style={{
        background: 'var(--color-bg)',
        paddingTop: 'var(--space-8)',
        paddingBottom: 'var(--space-8)',
        borderTop: '1px solid var(--color-border-subtle, rgba(0,0,0,0.06))',
      }}
    >
      <Container>
        <p
          style={{
            fontSize: 'var(--text-tiny)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-3)',
            textAlign: 'center',
          }}
        >
          You told us
        </p>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            justifyContent: 'center',
          }}
        >
          {chips.map((chip, i) => (
            <li
              key={`${chip.kind}-${chip.id}-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-3) var(--space-2) var(--space-4)',
                background: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-text-primary)',
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-tiny)',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {chip.kind}
              </span>
              <span>{chip.label}</span>
              {onRemoveChip && (
                <button
                  type="button"
                  onClick={() => onRemoveChip(chip)}
                  aria-label={`Remove ${chip.kind}: ${chip.label}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 20,
                    height: 20,
                    marginLeft: 2,
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    fontSize: 14,
                    lineHeight: 1,
                    padding: 0,
                  }}
                >
                  ×
                </button>
              )}
            </li>
          ))}
          {onAdd && (
            <li>
              <button
                type="button"
                onClick={onAdd}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-4)',
                  background: 'transparent',
                  border: '1px dashed var(--color-border-strong)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  lineHeight: 1.3,
                }}
              >
                ＋ Add
              </button>
            </li>
          )}
        </ul>
        {(canRerun || outOfReruns || rerunning) && (
          <div
            style={{
              marginTop: 'var(--space-5)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {canRerun && (
              <button
                type="button"
                onClick={onRerun}
                className="btn btn-primary"
                style={{ minHeight: 44 }}
              >
                Re-run with edits →
              </button>
            )}
            {rerunning && (
              <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)' }}>
                Re-matching…
              </span>
            )}
            {outOfReruns && (
              <button
                type="button"
                className="btn btn-secondary"
                disabled
                style={{ minHeight: 44, opacity: 0.6 }}
              >
                Tweak more in the review step
              </button>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}

// ── Section 1 ────────────────────────────────────────────────────────────────

function ThreeWords({ threeWords, onShare, onTweak }) {
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
        {(onShare || onTweak) && (
          <div
            style={{
              marginTop: 'var(--space-8)',
              display: 'flex',
              gap: 'var(--space-3)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              animation: 'fadeInUp 500ms ease-out 900ms both',
            }}
          >
            {onShare && (
              <button
                type="button"
                onClick={onShare}
                className="btn btn-primary"
                style={{ minHeight: 44 }}
              >
                Share this moodboard →
              </button>
            )}
            {onTweak && (
              <button
                type="button"
                onClick={onTweak}
                className="btn btn-secondary"
                style={{ minHeight: 44 }}
              >
                ← Tweak your answers
              </button>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}

// ── Section 2 ────────────────────────────────────────────────────────────────

const COUNT_WORDS = { 1: 'One', 2: 'Two', 3: 'Three' }
const COUNT_VERB = { 1: 'feels', 2: 'feel', 3: 'feel' }

function MatchedApps({ matches, answers, onWantThis }) {
  const count = matches.length
  const topRaw = matches[0]?.rawScore ?? 0
  const softFallback = topRaw > 0 && topRaw < 5
  const heading = softFallback
    ? 'Closest to what you told us'
    : `${COUNT_WORDS[count] ?? 'A few'} that ${COUNT_VERB[count] ?? 'feel'} like you`

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
            marginBottom: count === 1 && !softFallback ? 'var(--space-3)' : 'var(--space-6)',
            animation: 'fadeInUp 500ms ease-out 100ms both',
          }}
        >
          {heading}
        </h2>
        {count === 1 && !softFallback && (
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-6)',
              maxWidth: 560,
              animation: 'fadeInUp 500ms ease-out 200ms both',
            }}
          >
            We&rsquo;d rather show you one strong fit than pad it out.
          </p>
        )}
        <div className="moodboard-results-grid">
          {matches.map((match, i) => (
            <ResultCard
              key={match.id}
              match={match}
              index={i}
              total={count}
              answers={answers}
              onWantThis={onWantThis}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

// ── Invented Apps (AI-generated when hasOwnWords) ────────────────────────────

function InventedApps({ inventedApps, onWantThis }) {
  if (!inventedApps?.length) return null
  return (
    <section
      className="section-py"
      style={{ background: 'var(--color-bg)' }}
    >
      <Container>
        <p
          style={{
            fontSize: 'var(--text-tiny)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          From what you wrote
        </p>
        <h2
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 800,
            marginBottom: 'var(--space-6)',
            maxWidth: 640,
          }}
        >
          Ideas we thought of while reading your words
        </h2>
        <div
          style={{
            display: 'grid',
            gap: 'var(--space-5)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {inventedApps.map((idea, i) => (
            <article
              key={`${idea.title}-${i}`}
              style={{
                padding: 'var(--space-6)',
                border: '1px dashed var(--color-border-strong)',
                borderRadius: 'var(--radius-xl)',
                background: 'var(--color-bg-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
              <h3 style={{ fontSize: 'var(--text-h4)', fontWeight: 800, lineHeight: 1.2 }}>
                {idea.title}
              </h3>
              {idea.description && (
                <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {idea.description}
                </p>
              )}
              {idea.whyItFitsYou && (
                <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
                  {idea.whyItFitsYou}
                </p>
              )}
              {idea.sourceQuote && (
                <p
                  style={{
                    fontSize: 'var(--text-tiny)',
                    color: 'var(--color-text-secondary)',
                    fontStyle: 'italic',
                    borderLeft: '2px solid var(--color-accent)',
                    paddingLeft: 'var(--space-3)',
                  }}
                >
                  From what you wrote: &ldquo;{idea.sourceQuote}&rdquo;
                </p>
              )}
              <button
                type="button"
                onClick={onWantThis}
                className="btn btn-secondary"
                style={{ alignSelf: 'flex-start', marginTop: 'var(--space-2)' }}
              >
                Talk to us about this idea
              </button>
            </article>
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

function BriefEmailGate({ results, answers, sectionRef, onBriefSent, shared, lockedSlug, onShared, openSheet, savedShare }) {
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
                maxLength={254}
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
            <ShareableLink
              results={results}
              answers={answers}
              lockedSlug={lockedSlug}
              onShared={onShared}
              openSheet={openSheet}
              savedShare={savedShare}
            />
          </div>
        )}
        {shared && openSheet && (
          <div style={{ marginTop: 'var(--space-10)', textAlign: 'center' }}>
            <button
              type="button"
              onClick={openSheet}
              className="btn btn-secondary"
              style={{ minHeight: 44 }}
            >
              Share this moodboard →
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}

// ── Shareable Link block ─────────────────────────────────────────────────────

function ShareableLink({ results, answers, lockedSlug, onShared, openSheet, savedShare }) {
  const isEdit = Boolean(lockedSlug)
  const [coupleName, setCoupleName] = useState('')
  const [desiredSlug, setDesiredSlug] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | ready | error
  const [errorMsg, setErrorMsg] = useState('')

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://wepho.com'
  const previewSlug = useMemo(
    () => slugify(desiredSlug || coupleName),
    [desiredSlug, coupleName]
  )
  const displaySlug = previewSlug || 'auto-generated'
  const shareUrl = savedShare?.privateUrl || ''

  async function handleShare(e) {
    e.preventDefault()
    if (!isEdit && (!password || password.length < 4)) {
      setStatus('error')
      setErrorMsg('Password must be at least 4 characters.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const body = isEdit
        ? {
            answers,
            results,
            lockedSlug,
            coupleName: coupleName || undefined,
            meta: { role: answers?.role ?? 'couple' },
          }
        : {
            answers,
            results,
            desiredSlug: desiredSlug || undefined,
            coupleName: coupleName || undefined,
            password,
            meta: { role: answers?.role ?? 'couple' },
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
      onShared?.({
        slug: data.slug,
        privateUrl: data.privateUrl || data.url,
        socialUrl: data.socialUrl || null,
        socialPreviewEnabled: Boolean(data.socialPreviewEnabled),
        coupleName: data.coupleName || coupleName || null,
        password: isEdit ? null : password,
      })
      setStatus('ready')
    } catch {
      setStatus('error')
      setErrorMsg('Couldn’t save. Try again.')
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
            <label htmlFor="moodboard-share-couple" className="visually-hidden">Couple names</label>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <input
                id="moodboard-share-couple"
                type="text"
                maxLength={120}
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value.slice(0, 120))}
                placeholder="Jack & Simone (optional)"
                className="moodboard-input"
                style={{ flex: 1, minWidth: 220 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-3)' }}>
              <label htmlFor="moodboard-share-slug" className="visually-hidden">Custom URL</label>
              <input
                id="moodboard-share-slug"
                type="text"
                maxLength={60}
                value={desiredSlug}
                onChange={(e) => setDesiredSlug(e.target.value.slice(0, 60))}
                placeholder="Custom URL (optional)"
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
                maxLength={128}
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

      {status === 'ready' && shareUrl && (
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
          <span
            style={{
              flex: 1,
              minWidth: 200,
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-primary)',
              wordBreak: 'break-all',
            }}
          >
            {shareUrl}
          </span>
          <button
            type="button"
            onClick={openSheet}
            className="btn btn-primary"
            style={{ padding: 'var(--space-2) var(--space-4)' }}
          >
            Share options →
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
  sharedBrief = null,
  onTweak = null,
  onRerun = null,
  rerunCount = 0,
  justUpdatedTs = 0,
}) {
  const emailRef = useRef(null)
  const shareRef = useRef(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [editedAnswers, setEditedAnswers] = useState(null)
  const [rerunning, setRerunning] = useState(false)
  const RERUN_LIMIT = 3
  const rerunsLeft = Math.max(0, RERUN_LIMIT - (rerunCount ?? 0))
  const workingAnswers = editedAnswers ?? answers
  const dirty = editedAnswers !== null

  useEffect(() => {
    if (!justUpdatedTs) return
    setShowToast(true)
    setEditedAnswers(null)
    setRerunning(false)
    const t = setTimeout(() => setShowToast(false), 2600)
    return () => clearTimeout(t)
  }, [justUpdatedTs])

  const handleRemoveChip = useCallback((chip) => {
    setEditedAnswers((current) => removeChipFromAnswers(current ?? answers, chip))
  }, [answers])

  const handleRerun = useCallback(async () => {
    if (!onRerun || !editedAnswers || rerunsLeft <= 0) return
    setRerunning(true)
    try {
      await onRerun(editedAnswers)
    } finally {
      setRerunning(false)
    }
  }, [onRerun, editedAnswers, rerunsLeft])
  const [savedShare, setSavedShare] = useState(() => {
    if (shared && sharedBrief) {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      return {
        slug: sharedBrief.slug,
        privateUrl: `${origin}/moodboard/${sharedBrief.slug}`,
        socialUrl: sharedBrief.socialPreviewEnabled
          ? `${origin}/moodboard/${sharedBrief.slug}/preview`
          : null,
        socialPreviewEnabled: Boolean(sharedBrief.socialPreviewEnabled),
        coupleName: sharedBrief.coupleName || null,
        password: null,
      }
    }
    return null
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!savedShare || savedShare.privateUrl?.startsWith('http')) return
    setSavedShare((s) => (s ? { ...s, privateUrl: `${window.location.origin}${s.privateUrl}` } : s))
  }, [savedShare])

  function scrollToEmail() {
    emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const openSheet = useCallback(() => {
    if (savedShare?.privateUrl) {
      setSheetOpen(true)
    } else {
      shareRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [savedShare])

  const handleShared = useCallback((data) => {
    setSavedShare(data)
    setSheetOpen(true)
  }, [])

  const handlePreviewChange = useCallback((patch) => {
    setSavedShare((s) => (s ? { ...s, ...patch } : s))
  }, [])

  const sharedByName = shared ? savedShare?.coupleName || sharedBrief?.coupleName : null

  return (
    <main className="moodboard-results">
      {shared && (
        <section
          aria-label="Shared moodboard"
          style={{
            background: 'var(--color-accent-light)',
            paddingTop: 'var(--space-4)',
            paddingBottom: 'var(--space-4)',
            textAlign: 'center',
          }}
        >
          <Container>
            <p
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-accent-dark)',
                fontWeight: 600,
              }}
            >
              {sharedByName
                ? `Shared with you by ${sharedByName}`
                : 'Shared with you'}
              {' · '}
              <span style={{ color: 'var(--color-text-secondary)' }}>
                A wedding moodboard from Wepho
              </span>
            </p>
          </Container>
        </section>
      )}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: 'calc(var(--nav-height) + var(--space-3))',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 90,
            background: 'var(--color-text-primary)',
            color: 'var(--color-text-inverse)',
            padding: 'var(--space-3) var(--space-5)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 600,
            boxShadow: 'var(--shadow-md)',
            animation: 'fadeInUp 300ms ease-out both',
          }}
        >
          Updated with your edits.
        </div>
      )}
      <ThreeWords threeWords={results.threeWords} onShare={openSheet} onTweak={onTweak} />
      <AnswerStrip
        answers={workingAnswers}
        onRemoveChip={onRerun ? handleRemoveChip : null}
        onAdd={onTweak}
        onRerun={handleRerun}
        dirty={dirty}
        rerunsLeft={rerunsLeft}
        rerunning={rerunning}
      />
      <MatchedApps matches={results.matches} answers={answers} onWantThis={scrollToEmail} />
      {results.hasOwnWords && (
        <InventedApps inventedApps={results.inventedApps} onWantThis={scrollToEmail} />
      )}
      <HiddenTier hiddenMatches={results.hiddenMatches} onWantThis={scrollToEmail} />
      <div ref={shareRef}>
        <BriefEmailGate
          results={results}
          answers={answers}
          sectionRef={emailRef}
          onBriefSent={onBriefSent}
          shared={shared}
          lockedSlug={lockedSlug}
          onShared={handleShared}
          openSheet={savedShare?.privateUrl ? () => setSheetOpen(true) : null}
          savedShare={savedShare}
        />
      </div>
      <ShareSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        coupleName={savedShare?.coupleName}
        threeWords={results.threeWords}
        privateUrl={savedShare?.privateUrl || ''}
        socialUrl={savedShare?.socialUrl || null}
        socialPreviewEnabled={Boolean(savedShare?.socialPreviewEnabled)}
        password={savedShare?.password || null}
        slug={savedShare?.slug || null}
        onPreviewChange={handlePreviewChange}
      />
    </main>
  )
}
