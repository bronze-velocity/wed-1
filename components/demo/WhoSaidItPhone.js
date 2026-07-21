'use client'

import Image from 'next/image'
import PhoneShell from './PhoneShell'

export default function WhoSaidItPhone({
  question,
  index,
  total,
  guess,
  revealed,
  score,
  onGuess,
  done,
  finalScore,
  onReset,
  hostLabel = 'Host',
}) {
  const hasVoted = guess !== null
  const isCorrect = guess === question?.sender

  return (
    <PhoneShell>
      <div style={{
        padding: '0 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        {/* Couple photo strip */}
        <div style={{
          position: 'relative',
          height: 64,
          margin: '0 -16px',
          overflow: 'hidden',
        }}>
          <Image
            src="/images/cocktail/reaction-1.jpg"
            alt="Guests laughing together at the reception"
            fill
            sizes="280px"
            style={{ objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(17,17,17,0.05) 0%, rgba(17,17,17,0.55) 100%)',
          }} />
          <p style={{
            position: 'absolute',
            left: 12,
            bottom: 7,
            margin: 0,
            fontFamily: 'var(--font-serif-accent)',
            fontStyle: 'italic',
            fontSize: 15,
            color: '#fff',
            letterSpacing: '0.01em',
          }}>
            Simone &amp; Jack &middot; Aug 16
          </p>
        </div>

        {done ? (
          <DonePane finalScore={finalScore} onReset={onReset} />
        ) : (
          <>
            {/* Title + progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <h3 style={{
                fontSize: 'var(--text-h4)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                lineHeight: 1.2,
                margin: 0,
              }}>
                Who said it?
              </h3>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontSize: 'var(--text-tiny)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                }}>
                  Text {index + 1} of {total}
                </span>
                <span style={{
                  fontSize: 'var(--text-tiny)',
                  fontWeight: 700,
                  color: 'var(--color-text-secondary)',
                }}>
                  Score {score.correct}/{score.total}
                </span>
              </div>
            </div>

            {/* Sender line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-full)',
                background: revealed ? 'var(--color-accent)' : 'var(--color-bg-subtle)',
                border: '1.5px solid var(--color-border-strong)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 'var(--text-body-sm)',
                color: revealed ? '#fff' : 'var(--color-text-muted)',
                transition: 'background var(--duration-fast) var(--ease-out)',
                flexShrink: 0,
              }}>
                {revealed ? question.sender.charAt(0) : '?'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                  letterSpacing: revealed ? '0' : '0.15em',
                  filter: revealed ? 'none' : 'blur(4px)',
                  transition: 'filter var(--duration-fast) var(--ease-out)',
                  userSelect: revealed ? 'auto' : 'none',
                }}>
                  {revealed ? question.sender : 'Simone or Jack'}
                </p>
                <p style={{
                  fontSize: 'var(--text-tiny)',
                  color: 'var(--color-text-muted)',
                  margin: 0,
                }}>
                  Messages
                </p>
              </div>
            </div>

            {/* Text bubble */}
            <div style={{
              alignSelf: 'flex-start',
              maxWidth: '92%',
              padding: '11px 14px',
              borderRadius: '16px 16px 16px 4px',
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              fontSize: 'var(--text-body-sm)',
              lineHeight: 1.5,
              color: 'var(--color-text-primary)',
            }}>
              {question.text}
            </div>

            {/* Reveal explanation (once the host reveals) */}
            {revealed && (
              <div style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: !hasVoted
                  ? 'var(--color-bg-subtle)'
                  : isCorrect ? 'var(--color-green-light)' : 'var(--color-rose-light)',
                border: `1.5px solid ${!hasVoted
                  ? 'var(--color-border-strong)'
                  : isCorrect ? 'var(--color-green)' : 'var(--color-rose)'}`,
              }}>
                <p style={{
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 700,
                  color: !hasVoted
                    ? 'var(--color-text-primary)'
                    : isCorrect ? 'var(--color-green)' : 'var(--color-rose)',
                  margin: '0 0 4px',
                }}>
                  {!hasVoted ? `It was ${question.sender}.` : isCorrect ? 'You got it.' : `It was ${question.sender}.`}
                </p>
                <p style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {question.context}
                </p>
              </div>
            )}

            {/* Action area: guess → waiting for host → (host reveals above) */}
            {!revealed && !hasVoted && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
              }}>
                {['Jack', 'Simone'].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => onGuess(name)}
                    style={{
                      padding: '11px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--color-border-strong)',
                      background: 'var(--color-bg)',
                      fontSize: 'var(--text-body)',
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
            )}

            {!revealed && hasVoted && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '11px 13px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-subtle)',
                border: '1.5px solid var(--color-border)',
              }}>
                <span className="pulse-dot" style={{
                  width: 8,
                  height: 8,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-accent)',
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}>
                    Locked in: {guess}
                  </p>
                  <p style={{
                    fontSize: 'var(--text-tiny)',
                    color: 'var(--color-text-muted)',
                    margin: '2px 0 0',
                  }}>
                    Waiting for the {hostLabel} to reveal&hellip;
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </PhoneShell>
  )
}

function DonePane({ finalScore, onReset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
      <p style={{
        fontSize: 'var(--text-label)',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-accent)',
        margin: 0,
      }}>
        You&rsquo;re done
      </p>
      <p style={{
        fontSize: 'var(--text-h4)',
        fontWeight: 700,
        letterSpacing: '-0.015em',
        color: 'var(--color-text-primary)',
        margin: 0,
      }}>
        {finalScore.correct} / {finalScore.total} correct
      </p>
      <p style={{
        fontSize: 'var(--text-body-sm)',
        lineHeight: 1.55,
        color: 'var(--color-text-secondary)',
        margin: 0,
      }}>
        You used the app for about 20 seconds and laughed twice. That&rsquo;s the whole pitch.
      </p>

      <div style={{
        padding: '11px 12px',
        borderRadius: 'var(--radius-md)',
        border: '1.5px dashed var(--color-border-strong)',
        background: 'var(--color-bg-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{ fontSize: 20, lineHeight: 1 }} aria-hidden="true">🔒</span>
        <div>
          <p style={{
            fontSize: 'var(--text-body-sm)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: 0,
          }}>
            Spicy round · code required
          </p>
          <p style={{
            fontSize: 'var(--text-tiny)',
            color: 'var(--color-text-muted)',
            margin: '2px 0 0',
          }}>
            On the night, only the friends&rsquo; tables get the code.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        style={{
          width: '100%',
          padding: '11px',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--color-border-strong)',
          background: 'transparent',
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Play again
      </button>
    </div>
  )
}
