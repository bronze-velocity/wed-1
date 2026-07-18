'use client'

import { useEffect, useState } from 'react'

const TEXTS = [
  {
    id: 1,
    text: 'i cannot believe you made me watch a two-hour documentary about the history of paperclips',
    sender: 'Simone',
    context: '78% of the room got this one wrong.',
  },
  {
    id: 2,
    text: 'babe the cat threw up on the keyboard again please come home',
    sender: 'Jack',
    context: 'Split down the middle. Simone denies ownership of the cat.',
  },
  {
    id: 3,
    text: 'you were right about the shoes. i’m sorry. i love you. don’t gloat.',
    sender: 'Jack',
    context: 'Only 34% guessed this one. The gloat is very much in progress.',
  },
  {
    id: 4,
    text: 'if you eat the last piece of leftover thai i will actually leave you',
    sender: 'Simone',
    context: '92% got it right. Simone has receipts.',
  },
  {
    id: 5,
    text: 'just so you know: i’ve been humming that song from our first dance all day and now everyone at work thinks i’m losing it',
    sender: 'Jack',
    context: 'A rare 100%. Everyone knew.',
  },
]

export default function WhoSaidItDemo() {
  const [index, setIndex] = useState(0)
  const [guess, setGuess] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [done, setDone] = useState(false)

  const current = TEXTS[index]
  const isRevealed = guess !== null
  const isCorrect = guess === current.sender

  function submitGuess(name) {
    if (isRevealed) return
    setGuess(name)
    setScore((s) => ({
      correct: s.correct + (name === current.sender ? 1 : 0),
      total: s.total + 1,
    }))
  }

  function next() {
    if (index + 1 >= TEXTS.length) {
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setGuess(null)
  }

  function reset() {
    setIndex(0)
    setGuess(null)
    setScore({ correct: 0, total: 0 })
    setDone(false)
  }

  if (done) {
    return <DoneCard score={score} onReset={reset} />
  }

  return (
    <div style={{ maxWidth: 520, margin: '0 auto' }}>
      {/* Score strip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-3)',
          padding: '0 var(--space-1)',
        }}
      >
        <span
          style={{
            fontSize: 'var(--text-label)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}
        >
          Text {index + 1} of {TEXTS.length}
        </span>
        <span
          style={{
            fontSize: 'var(--text-body-sm)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          Score: {score.correct} / {score.total}
        </span>
      </div>

      {/* Phone-ish card */}
      <div
        style={{
          background: '#1A1A1A',
          borderRadius: 'var(--radius-xl)',
          border: '2px solid #2E2E2E',
          padding: 'var(--space-3)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div
          style={{
            background: 'var(--color-bg)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)',
            minHeight: 320,
          }}
        >
          {/* Sender line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-full)',
                background: isRevealed
                  ? 'var(--color-accent)'
                  : 'var(--color-bg-subtle)',
                border: '1.5px solid var(--color-border-strong)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 'var(--text-body)',
                color: isRevealed ? '#fff' : 'var(--color-text-muted)',
                transition: 'background var(--duration-fast) var(--ease-out)',
              }}
            >
              {isRevealed ? current.sender.charAt(0) : '?'}
            </div>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  letterSpacing: isRevealed ? '0' : '0.15em',
                  filter: isRevealed ? 'none' : 'blur(4px)',
                  transition: 'filter var(--duration-fast) var(--ease-out)',
                  userSelect: isRevealed ? 'auto' : 'none',
                }}
              >
                {isRevealed ? current.sender : 'Simone or Jack'}
              </p>
              <p
                style={{
                  fontSize: 'var(--text-tiny)',
                  color: 'var(--color-text-muted)',
                  margin: 0,
                }}
              >
                Messages
              </p>
            </div>
          </div>

          {/* The text bubble */}
          <div
            style={{
              alignSelf: 'flex-start',
              maxWidth: '90%',
              padding: '12px 16px',
              borderRadius: '18px 18px 18px 4px',
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              fontSize: 'var(--text-body)',
              lineHeight: 1.5,
              color: 'var(--color-text-primary)',
            }}
          >
            {current.text}
          </div>

          {/* Reveal explanation */}
          {isRevealed && (
            <div
              style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                background: isCorrect
                  ? 'var(--color-green-light, #ECFDF5)'
                  : 'var(--color-rose-light, #FEF2F2)',
                border: `1.5px solid ${
                  isCorrect
                    ? 'var(--color-green, #10B981)'
                    : 'var(--color-rose, #E11D48)'
                }`,
              }}
            >
              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 700,
                  color: isCorrect
                    ? 'var(--color-green, #047857)'
                    : 'var(--color-rose, #B91C1C)',
                  margin: '0 0 4px',
                }}
              >
                {isCorrect ? 'You got it.' : `It was ${current.sender}.`}
              </p>
              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {current.context}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Guess buttons or Next */}
      {!isRevealed ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-4)',
          }}
        >
          {['Jack', 'Simone'].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => submitGuess(name)}
              style={{
                padding: '14px 12px',
                borderRadius: 'var(--radius-lg)',
                border: '2px solid var(--color-border-strong)',
                background: 'var(--color-bg)',
                fontSize: 'var(--text-body-lg)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all var(--duration-fast) var(--ease-out)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.background = 'var(--color-accent)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-strong)'
                e.currentTarget.style.background = 'var(--color-bg)'
                e.currentTarget.style.color = 'var(--color-text-primary)'
              }}
            >
              {name}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
          <button
            type="button"
            onClick={next}
            className="btn btn-primary btn-lg"
            style={{ fontFamily: 'inherit' }}
          >
            {index + 1 >= TEXTS.length ? 'See your score →' : 'Next text →'}
          </button>
        </div>
      )}
    </div>
  )
}

const LEADERBOARD = [
  { label: 'His Side', score: 34 },
  { label: 'Her Side', score: 31 },
  { label: 'Mutual', score: 28 },
]

function DoneCard({ score, onReset }) {
  const [animated, setAnimated] = useState(false)
  const maxScore = Math.max(...LEADERBOARD.map((r) => r.score))

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      style={{
        maxWidth: 520,
        margin: '0 auto',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-10)',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: 'var(--text-label)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: 'var(--space-4)',
        }}
      >
        You&rsquo;re done
      </p>
      <p
        style={{
          fontSize: 'var(--text-h3)',
          fontWeight: 700,
          letterSpacing: '-0.015em',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-6)',
        }}
      >
        {score.correct} / {score.total} correct
      </p>

      <div
        style={{
          background: '#0F1115',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5) var(--space-5) var(--space-4)',
          marginBottom: 'var(--space-6)',
          textAlign: 'left',
          border: '1px solid #1F2430',
        }}
      >
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.65)',
            margin: '0 0 var(--space-4)',
            textAlign: 'center',
          }}
        >
          …and this is what your wedding guests would see:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LEADERBOARD.map((row, i) => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  width: 72,
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {row.label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 14,
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: animated ? `${(row.score / maxScore) * 100}%` : '0%',
                    background:
                      i === 0
                        ? 'var(--color-accent)'
                        : i === 1
                        ? '#EC4899'
                        : '#F59E0B',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 600ms var(--ease-out, ease-out)',
                  }}
                />
              </div>
              <span
                style={{
                  width: 32,
                  textAlign: 'right',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 700,
                  color: '#fff',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {row.score}
              </span>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'rgba(255,255,255,0.7)',
            margin: 'var(--space-4) 0 0',
            textAlign: 'center',
          }}
        >
          🔥 Aunt Denise: 5 in a row
        </p>
      </div>

      <p
        style={{
          fontSize: 'var(--text-body-lg)',
          lineHeight: 1.6,
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-8)',
        }}
      >
        You just used the app for about 22 seconds and laughed twice. That&rsquo;s
        the entire pitch.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="btn btn-secondary"
        style={{ fontFamily: 'inherit' }}
      >
        Play again
      </button>

      <div
        style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4) var(--space-5)',
          borderRadius: 'var(--radius-lg)',
          border: '1.5px dashed var(--color-border-strong)',
          background: 'var(--color-bg-subtle)',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}
      >
        <span style={{ fontSize: 24, lineHeight: 1 }} aria-hidden="true">
          🔒
        </span>
        <div>
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            Spicy round · code required
          </p>
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-muted)',
              margin: '2px 0 0',
            }}
          >
            On the night, only the friends&rsquo; tables get the code.
          </p>
        </div>
      </div>
    </div>
  )
}
