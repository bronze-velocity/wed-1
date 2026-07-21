'use client'

import { useEffect, useState } from 'react'
import PhoneShell from './PhoneShell'

const NAME_COLORS = {
  Jack: 'var(--color-accent)',
  Simone: 'var(--color-rose)',
}

const NAME_TINT = {
  Jack: 'var(--color-accent-light)',
  Simone: 'var(--color-rose-light)',
}

export default function WhoSaidItHost({
  question,
  index,
  total,
  isRevealed,
  done,
  roomSize = 48,
  onReveal,
  onNext,
  onFinish,
  hostLabel = 'Host',
}) {
  const [votesIn, setVotesIn] = useState(roomSize)

  useEffect(() => {
    if (isRevealed || done) {
      setVotesIn(roomSize)
      return
    }
    let n = Math.round(roomSize * 0.5)
    setVotesIn(n)
    const id = setInterval(() => {
      n += 1
      if (n >= roomSize) {
        n = roomSize
        clearInterval(id)
      }
      setVotesIn(n)
    }, 45)
    return () => clearInterval(id)
  }, [question, isRevealed, done, roomSize])

  const jackFull = Math.round((question.votes.Jack / 100) * roomSize)
  const shownJack = Math.round((jackFull * votesIn) / roomSize)
  const shownSimone = votesIn - shownJack
  const counts = { Jack: shownJack, Simone: shownSimone }
  const isLast = index + 1 >= total

  const statusPill = done
    ? { label: 'Wrapped', bg: 'var(--color-gold-light)', fg: 'var(--color-gold)' }
    : isRevealed
    ? { label: 'Results up', bg: 'var(--color-gold-light)', fg: 'var(--color-gold)' }
    : { label: 'Voting open', bg: 'var(--color-green-light)', fg: 'var(--color-green)' }

  return (
    <PhoneShell>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <div style={{
          flexShrink: 0,
          padding: '12px 16px',
          background: 'var(--color-bg-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              {!isRevealed && !done && (
                <span className="pulse-dot" style={{
                  width: 7,
                  height: 7,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-green)',
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
              )}
              <p style={{
                margin: 0,
                fontSize: 'var(--text-body-sm)',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.01em',
              }}>
                Simone &amp; Jack
              </p>
            </div>
            <p style={{
              margin: '2px 0 0',
              fontSize: 'var(--text-tiny)',
              color: 'var(--color-text-inverse-secondary)',
            }}>
              Text {index + 1} of {total}
            </p>
          </div>
          <span style={{
            flexShrink: 0,
            fontSize: 'var(--text-tiny)',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: statusPill.fg,
            background: statusPill.bg,
            borderRadius: 'var(--radius-md)',
            padding: '5px 10px',
          }}>
            {statusPill.label}
          </span>
        </div>

        {done ? (
          <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{
              fontSize: 'var(--text-label)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              margin: 0,
            }}>
              Game wrapped
            </p>
            <p style={{
              fontSize: 'var(--text-h4)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}>
              His Side takes it, 34&ndash;31.
            </p>
            <p style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
              margin: 0,
            }}>
              Read the final tally off the big screen, then cue the first dance.
            </p>
          </div>
        ) : (
          <>
            {/* Body — sized to fill the screen without scrolling */}
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Answer — the host's private cheat sheet */}
              <div style={{
                padding: '11px 13px',
                borderRadius: 'var(--radius-lg)',
                background: NAME_TINT[question.sender],
                border: '1px solid var(--color-border)',
              }}>
                <p style={{
                  margin: '0 0 6px',
                  fontSize: 'var(--text-tiny)',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}>
                  🔒 Only you see this
                </p>
                <p style={{
                  margin: '0 0 9px',
                  fontFamily: 'var(--font-serif-accent)',
                  fontStyle: 'italic',
                  fontSize: 'var(--text-body-sm)',
                  lineHeight: 1.4,
                  color: 'var(--color-text-primary)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  &ldquo;{question.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{
                    fontSize: 'var(--text-tiny)',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                  }}>
                    Answer
                  </span>
                  <span style={{
                    fontSize: 'var(--text-h4)',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    color: NAME_COLORS[question.sender],
                  }}>
                    {question.sender}
                  </span>
                </div>
              </div>

              {/* Say this out loud — its own note */}
              <div style={{
                display: 'flex',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
              }}>
                <span aria-hidden="true" style={{ fontSize: 15, lineHeight: 1.4, flexShrink: 0 }}>🎤</span>
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    margin: '0 0 3px',
                    fontSize: 'var(--text-tiny)',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                  }}>
                    Say this out loud
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: 'var(--text-body-sm)',
                    lineHeight: 1.45,
                    color: 'var(--color-text-primary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {question.hostNote}
                  </p>
                </div>
              </div>

              {/* Live tally */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{
                    fontSize: 'var(--text-h4)',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1,
                  }}>
                    {votesIn}
                  </span>
                  <span style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-muted)',
                  }}>
                    of {roomSize} voted
                  </span>
                </div>
                <div style={{
                  height: 6,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-bg-subtle)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(votesIn / roomSize) * 100}%`,
                    background: 'var(--color-green)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 120ms linear',
                  }} />
                </div>

                {['Jack', 'Simone'].map((name) => {
                  const isAnswer = name === question.sender
                  const barColor = isRevealed && isAnswer
                    ? NAME_COLORS[name]
                    : 'var(--color-border-strong)'
                  return (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 48,
                        fontSize: 'var(--text-body-sm)',
                        fontWeight: 700,
                        color: isRevealed && isAnswer ? NAME_COLORS[name] : 'var(--color-text-secondary)',
                      }}>
                        {name}
                      </span>
                      <div style={{
                        flex: 1,
                        height: 10,
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--color-bg-subtle)',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${votesIn ? (counts[name] / votesIn) * 100 : 0}%`,
                          background: barColor,
                          borderRadius: 'var(--radius-full)',
                          transition: 'width 120ms linear, background var(--duration-fast) var(--ease-out)',
                        }} />
                      </div>
                      <span style={{
                        width: 26,
                        textAlign: 'right',
                        fontSize: 'var(--text-body-sm)',
                        fontWeight: 700,
                        color: 'var(--color-text-secondary)',
                        fontVariantNumeric: 'tabular-nums',
                      }}>
                        {counts[name]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Action footer */}
            <div style={{
              flexShrink: 0,
              padding: '10px 14px 12px',
              background: 'var(--color-bg)',
              borderTop: '1px solid var(--color-border)',
            }}>
              <button
                type="button"
                onClick={isRevealed ? (isLast ? onFinish : onNext) : onReveal}
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontSize: 'var(--text-body)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background var(--duration-fast) var(--ease-out)',
                }}
              >
                {isRevealed
                  ? isLast ? 'Show final tally →' : 'Next text →'
                  : 'Show the results →'}
              </button>
              <p style={{
                margin: '6px 0 0',
                textAlign: 'center',
                fontSize: 'var(--text-tiny)',
                color: 'var(--color-text-muted)',
              }}>
                {isRevealed
                  ? isLast ? 'Wraps the game and lights up the winner.' : 'Loads the next message for the room.'
                  : 'Reveals the vote breakdown on the big screen.'}
              </p>
            </div>
          </>
        )}
      </div>
    </PhoneShell>
  )
}
