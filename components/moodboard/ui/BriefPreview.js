'use client'

import { useState, useEffect, useRef } from 'react'

const VIBE_MAP = {
  'dinner-party':    'Dinner that got out of hand',
  'film-premiere':   'Film premiere energy',
  'pub-quiz':        'Pub quiz, best table wins',
  'gallery-opening': 'Gallery opening',
  bonfire:           'Bonfire',
  rooftop:           'Rooftop, city below',
  brunch:            'Brunch that never ended',
  'kitchen-party':   'Kitchen party',
}

const GUEST_MAP = {
  'grandparents-front-row': '👵 Grandparents front row',
  'wild-college-friends':   '🎉 Wild college friends',
  'strangers-meeting':      '🌍 Half never met',
  'work-crowd':             '👔 Work crowd',
  'kids-running':           '👧 Lots of kids',
  'loud-family':            '🎤 Loud family',
  dancers:                  '🕺 Dancers',
  'reserved-warm':          '🤍 Reserved but warm',
}

const MOMENT_MAP = {
  cocktail:      { icon: '🥂', label: 'Cocktail hour' },
  dinner:        { icon: '🍽️', label: 'Dinner' },
  'after-dinner':{ icon: '🕯️', label: 'After dinner' },
  dancing:       { icon: '💃', label: 'Dancing' },
  'late-night':  { icon: '🌙', label: 'Late night' },
}

const FEELING_MAP = {
  'cry-good-kind':              '😭 Cry (the good kind)',
  'everyone-laughing':          '😂 Everyone laughing',
  'room-feels-like-show':       '🎭 Room like a show',
  'strangers-become-friends':   '🤝 Strangers became friends',
  'keepsake-from-everyone':     '💌 Keepsake from everyone',
  'something-nobody-has-seen':  "🌙 Something nobody's seen",
  'our-story-main-character':   '💑 Our story is the star',
  'guests-actually-look-up':    '👀 Guests actually looked up',
}

const STORY_KEYS = {
  howWeMet:    'How you met',
  insideJoke:  'Inside joke',
  mostUs:      'Most "you" thing',
  movieGenre:  'Your movie genre',
  soUs:        '"That was so us"',
}

function countPicks(answers) {
  return (
    (answers.vibes?.length ?? 0) +
    (answers.guests?.length ?? 0) +
    (answers.moments?.length ?? 0) +
    (answers.feelings?.length ?? 0) +
    (answers.wildcard ? 1 : 0)
  )
}

function Chip({ children }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-accent-light)',
        color: 'var(--color-accent)',
        fontSize: 'var(--text-tiny)',
        fontWeight: 600,
        animation: 'briefEntryIn 280ms ease-out',
      }}
    >
      {children}
    </span>
  )
}

function Section({ label, children }) {
  return (
    <div style={{ animation: 'briefEntryIn 300ms ease-out' }}>
      <p
        style={{
          fontSize: 'var(--text-tiny)',
          fontWeight: 700,
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 'var(--space-2)',
        }}
      >
        {label}
      </p>
      {children}
    </div>
  )
}

function BriefContent({ answers }) {
  const { vibes, guests, guestFreeform, moments, feelings, story } = answers
  const storyAnswers = Object.entries(story ?? {}).filter(([, v]) => v?.trim())

  const hasContent =
    vibes?.length ||
    guests?.length ||
    guestFreeform ||
    moments?.length ||
    feelings?.length ||
    storyAnswers.length

  if (!hasContent) {
    return (
      <p
        style={{
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          lineHeight: 1.5,
        }}
      >
        Your answers appear here as you go.
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {vibes?.length > 0 && (
        <Section label="Vibe">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {vibes.map((id) => (
              <Chip key={id}>{VIBE_MAP[id] ?? id}</Chip>
            ))}
          </div>
        </Section>
      )}

      {(guests?.length > 0 || guestFreeform) && (
        <Section label="Your people">
          {guestFreeform ? (
            <p
              style={{
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 1.5,
                fontStyle: 'italic',
                animation: 'briefEntryIn 300ms ease-out',
              }}
            >
              &ldquo;{guestFreeform}&rdquo;
            </p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {guests.map((id) => (
                <Chip key={id}>{GUEST_MAP[id] ?? id}</Chip>
              ))}
            </div>
          )}
        </Section>
      )}

      {moments?.length > 0 && (
        <Section label="Moments">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {moments.map((id) => {
              const m = MOMENT_MAP[id]
              return m ? (
                <span
                  key={id}
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    animation: 'briefEntryIn 300ms ease-out',
                  }}
                >
                  {m.icon} {m.label}
                </span>
              ) : null
            })}
          </div>
        </Section>
      )}

      {feelings?.length > 0 && (
        <Section label="You want to feel">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {feelings.map((id) => (
              <Chip key={id}>{FEELING_MAP[id] ?? id}</Chip>
            ))}
          </div>
        </Section>
      )}

      {storyAnswers.length > 0 && (
        <Section label="Your story">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {storyAnswers.map(([key, val]) => (
              <div key={key} style={{ animation: 'briefEntryIn 300ms ease-out' }}>
                <p
                  style={{
                    fontSize: 'var(--text-tiny)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 2,
                  }}
                >
                  {STORY_KEYS[key] ?? key}
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{val}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

export default function BriefPreview({ answers, step }) {
  const [expanded, setExpanded] = useState(false)
  const hasAutoExpanded = useRef(false)
  const contentRef = useRef(null)

  useEffect(() => {
    if (step >= 3 && !hasAutoExpanded.current) {
      setExpanded(true)
      hasAutoExpanded.current = true
    }
  }, [step])

  // Focus trap when drawer is expanded
  useEffect(() => {
    if (!expanded) return
    const el = contentRef.current
    if (!el) return
    const focusable = el.querySelectorAll(
      'button, a, input, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    function trap(e) {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    el.addEventListener('keydown', trap)
    return () => el.removeEventListener('keydown', trap)
  }, [expanded])

  const picks = countPicks(answers)

  return (
    <>
      {/* Mobile drawer — hidden on lg+ */}
      <div
        className="lg:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: 'var(--color-bg)',
          borderTop: '1px solid var(--color-border)',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.07)',
        }}
      >
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse brief' : 'Expand brief'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: 48,
            padding: '0 var(--space-6)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            touchAction: 'pan-y',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span
            style={{
              fontSize: 'var(--text-body-sm)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            Your brief
            {picks > 0 && (
              <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>
                {' '}· {picks} pick{picks !== 1 ? 's' : ''} so far
              </span>
            )}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            style={{
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 250ms ease',
              flexShrink: 0,
            }}
          >
            <path
              d="M3 6l5 5 5-5"
              stroke="var(--color-text-muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          ref={contentRef}
          style={{
            maxHeight: expanded ? '55dvh' : 0,
            overflowY: expanded ? 'auto' : 'hidden',
            transition: 'max-height 350ms cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          <div style={{ padding: 'var(--space-4) var(--space-6) var(--space-8)' }}>
            <BriefContent answers={answers} />
          </div>
        </div>
      </div>

      {/* Desktop sidebar — hidden below lg */}
      <div
        className="hidden lg:block"
        style={{
          position: 'fixed',
          top: 'calc(var(--nav-height) + var(--space-6))',
          right: 'var(--space-8)',
          width: 280,
          maxHeight: 'calc(100dvh - var(--nav-height) - var(--space-8) * 2)',
          overflowY: 'auto',
          padding: 'var(--space-5)',
          background: 'var(--color-bg)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
          zIndex: 30,
        }}
      >
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-5)',
          }}
        >
          Your brief
        </p>
        <BriefContent answers={answers} />
      </div>
    </>
  )
}
