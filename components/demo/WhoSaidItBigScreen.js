'use client'

import { useEffect, useState } from 'react'

const NAME_COLORS = {
  Jack: 'var(--color-accent)',
  Simone: 'var(--color-rose)',
}

const FINAL_STANDINGS = [
  { label: 'His Side', score: 34, color: 'var(--color-accent)' },
  { label: 'Her Side', score: 31, color: 'var(--color-rose)' },
  { label: 'Mutual', score: 28, color: 'var(--color-gold)' },
]

export default function WhoSaidItBigScreen({ question, isRevealed, index, total, done }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
      <div style={{
        position: 'relative',
        width: '100%',
        background: 'var(--color-bg-dark)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 0 0 3px rgba(173, 138, 62, 0.35), 0 24px 48px rgba(0, 0, 0, 0.5)',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Soft gold glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(173,138,62,0.18) 0%, rgba(17,17,17,0) 62%)',
        }} />

        <div style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(16px, 4.5%, 40px)',
        }}>
          {done ? (
            <FinalTally />
          ) : isRevealed ? (
            <RevealStats question={question} index={index} />
          ) : (
            <IdleState question={question} index={index} total={total} />
          )}
        </div>

        <span style={{
          position: 'absolute',
          bottom: 'var(--space-4)',
          right: 'var(--space-5)',
          fontSize: 'var(--text-tiny)',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: 'rgba(255, 255, 255, 0.2)',
        }}>
          Wepho
        </span>
      </div>
    </div>
  )
}

function ScreenEyebrow({ children }) {
  return (
    <p style={{
      fontSize: 'var(--text-label)',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--color-gold)',
      margin: '0 0 var(--space-3)',
    }}>
      {children}
    </p>
  )
}

function IdleState({ question, index, total }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <ScreenEyebrow>Who said it? · Text {index + 1} of {total}</ScreenEyebrow>
      <p style={{
        fontFamily: 'var(--font-serif-accent)',
        fontStyle: 'italic',
        fontSize: 'var(--text-h3)',
        lineHeight: 1.3,
        color: 'var(--color-text-inverse)',
        margin: '0 0 var(--space-5)',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        &ldquo;{question.text}&rdquo;
      </p>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 'var(--text-body)',
        color: 'var(--color-text-inverse-secondary)',
      }}>
        <span className="pulse-dot" style={{
          width: 8,
          height: 8,
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-gold)',
          display: 'inline-block',
        }} />
        Waiting for the room to vote&hellip;
      </div>
    </div>
  )
}

function RevealStats({ question, index }) {
  const { text, sender, votes, roomAccuracy, streak, standings } = question
  const rows = ['Jack', 'Simone'].map((name) => ({
    name,
    pct: votes[name],
    isAnswer: name === sender,
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div>
        <ScreenEyebrow>Text {index + 1} · The room voted</ScreenEyebrow>
        <p style={{
          fontFamily: 'var(--font-serif-accent)',
          fontStyle: 'italic',
          fontSize: 'var(--text-body-lg)',
          lineHeight: 1.35,
          color: 'var(--color-text-inverse)',
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          &ldquo;{text}&rdquo;
        </p>
      </div>

      <VoteBars rows={rows} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: 'var(--space-3)',
      }}>
        <span style={{
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-inverse-secondary)',
        }}>
          It was <strong style={{ color: NAME_COLORS[sender] }}>{sender}</strong> · {roomAccuracy}% of the room nailed it
        </span>
        <span style={{
          fontSize: 'var(--text-body-sm)',
          fontWeight: 700,
          color: 'var(--color-gold)',
          whiteSpace: 'nowrap',
        }}>
          His {standings.his} · Her {standings.her}
        </span>
      </div>

      {streak && (
        <p style={{
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-inverse-secondary)',
          margin: 0,
        }}>
          🔥 {streak}
        </p>
      )}
    </div>
  )
}

function VoteBars({ rows }) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(false)
    const t = setTimeout(() => setAnimated(true), 60)
    return () => clearTimeout(t)
  }, [rows])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {rows.map((row) => (
        <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            width: 62,
            fontSize: 'var(--text-body-sm)',
            fontWeight: 700,
            color: row.isAnswer ? '#fff' : 'var(--color-text-inverse-secondary)',
          }}>
            {row.name}
          </span>
          <div style={{
            flex: 1,
            height: 14,
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: animated ? `${row.pct}%` : '0%',
              background: NAME_COLORS[row.name],
              opacity: row.isAnswer ? 1 : 0.5,
              borderRadius: 'var(--radius-full)',
              transition: 'width 600ms var(--ease-out)',
            }} />
          </div>
          <span style={{
            width: 40,
            textAlign: 'right',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 700,
            color: row.isAnswer ? '#fff' : 'var(--color-text-inverse-secondary)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {row.pct}%
          </span>
        </div>
      ))}
    </div>
  )
}

function FinalTally() {
  const [animated, setAnimated] = useState(false)
  const maxScore = Math.max(...FINAL_STANDINGS.map((r) => r.score))

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ textAlign: 'center' }}>
        <ScreenEyebrow>Final tally</ScreenEyebrow>
        <p style={{
          fontFamily: 'var(--font-serif-accent)',
          fontStyle: 'italic',
          fontSize: 'var(--text-h3)',
          lineHeight: 1.2,
          color: 'var(--color-text-inverse)',
          margin: 0,
        }}>
          His Side takes it.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FINAL_STANDINGS.map((row) => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 72,
              fontSize: 'var(--text-body-sm)',
              fontWeight: 700,
              color: '#fff',
            }}>
              {row.label}
            </span>
            <div style={{
              flex: 1,
              height: 14,
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: animated ? `${(row.score / maxScore) * 100}%` : '0%',
                background: row.color,
                borderRadius: 'var(--radius-full)',
                transition: 'width 600ms var(--ease-out)',
              }} />
            </div>
            <span style={{
              width: 32,
              textAlign: 'right',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 700,
              color: '#fff',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {row.score}
            </span>
          </div>
        ))}
      </div>

      <p style={{
        fontSize: 'var(--text-body-sm)',
        color: 'var(--color-text-inverse-secondary)',
        margin: 0,
        textAlign: 'center',
      }}>
        🔥 Aunt Denise: 5 in a row
      </p>
    </div>
  )
}
