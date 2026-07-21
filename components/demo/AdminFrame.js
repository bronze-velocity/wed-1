'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

function toLabelFor(to) {
  return to === 'her' ? 'To: Her' : to === 'him' ? 'To: Him' : 'To: Both of you'
}

export default function AdminFrame({ queue = [], pending, onApprove, onSkip, active, resetKey }) {
  const [isApproving, setIsApproving] = useState(false)

  // AdminFrame stays mounted across the whole demo now, so the fade-out
  // triggered by an earlier approval needs to clear when the demo resets.
  useEffect(() => {
    setIsApproving(false)
  }, [resetKey])

  const { message, senderName, to, photo } = pending
  const toLabel = toLabelFor(to)

  function handleApprove() {
    if (!active || isApproving) return
    setIsApproving(true)
    setTimeout(() => {
      onApprove()
    }, 400)
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '560px',
      background: '#FFFFFF',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      border: '1px solid var(--color-border)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Laptop top bar */}
      <div style={{
        height: '32px',
        background: '#E8E8E8',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '0 12px',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        <div style={{
          flex: 1,
          marginLeft: '8px',
          height: '18px',
          background: '#D8D8D8',
          borderRadius: '4px',
          maxWidth: '200px',
        }} />
      </div>

      {/* App header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FAFAFA',
      }}>
        <div style={{
          fontFamily: 'var(--font-serif-accent)',
          fontStyle: 'italic',
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-primary)',
        }}>
          Sam &amp; Jordan&rsquo;s reception — message queue
        </div>
        <div style={{
          fontSize: 'var(--text-tiny)',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          background: 'var(--color-gold-light)',
          color: 'var(--color-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '3px 10px',
          whiteSpace: 'nowrap',
        }}>
          1 message waiting
        </div>
      </div>

      {/* Queue body */}
      <div style={{ padding: '20px' }}>
        {/* Already-approved history */}
        {queue.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            <span style={{
              fontSize: 'var(--text-tiny)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              Already approved
            </span>
            {queue.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 12px',
                  background: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  opacity: 0.75,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0, color: 'var(--color-green)' }}>
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item.photo && (
                  <div style={{ position: 'relative', width: 22, height: 22, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                    <Image src={item.photo} alt="" fill sizes="22px" style={{ objectFit: 'cover' }} />
                  </div>
                )}
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-serif-accent)',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-secondary)',
                  fontStyle: 'italic',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  &ldquo;{item.message}&rdquo; <span style={{ fontStyle: 'normal', color: 'var(--color-text-muted)' }}>— {item.senderName}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Message card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderLeft: '3px solid var(--color-gold)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          boxShadow: 'var(--shadow-sm)',
          transition: 'opacity 350ms var(--ease-out), transform 350ms var(--ease-out)',
          opacity: isApproving ? 0 : 1,
          transform: isApproving ? 'translateX(32px)' : 'translateX(0)',
        }}>
          {/* Card header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}>
            <span style={{
              fontSize: 'var(--text-tiny)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
            }}>
              {toLabel}
            </span>
            <span style={{
              fontSize: 'var(--text-tiny)',
              color: 'var(--color-text-muted)',
            }}>
              just now
            </span>
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: 11,
            letterSpacing: '0.3em',
            color: 'var(--color-border-strong)',
            margin: '0 0 10px',
          }}>
            &#10086;
          </div>

          {photo && (
            <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 10, boxShadow: 'var(--shadow-sm)' }}>
              <Image src={photo} alt="Photo attached to this message" fill sizes="72px" style={{ objectFit: 'cover' }} />
            </div>
          )}

          {/* Message text */}
          <p style={{
            fontFamily: 'var(--font-serif-accent)',
            fontSize: 'var(--text-body)',
            lineHeight: 1.6,
            color: 'var(--color-text-primary)',
            marginBottom: '10px',
            fontStyle: 'italic',
          }}>
            &ldquo;{message}&rdquo;
          </p>

          {/* Sender */}
          <div style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-secondary)',
          }}>
            — {senderName || 'Anonymous'}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '14px',
        }}>
          <button
            onClick={handleApprove}
            disabled={!active || isApproving}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '10px 16px',
              background: 'var(--color-green)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 600,
              cursor: active && !isApproving ? 'pointer' : 'not-allowed',
              transition: 'box-shadow var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out), opacity var(--duration-fast)',
              boxShadow: isApproving ? 'none' : '0 0 0 0 rgba(46,182,125,0)',
              opacity: isApproving ? 0.6 : 1,
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              if (!isApproving) {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(46,182,125,0.4)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span aria-hidden="true">♥</span> Approve
          </button>

          <button
            onClick={onSkip}
            disabled={isApproving}
            style={{
              padding: '10px 16px',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              border: '1.5px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 600,
              cursor: isApproving ? 'default' : 'pointer',
              transition: 'background var(--duration-fast), border-color var(--duration-fast), color var(--duration-fast)',
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              if (!isApproving) {
                e.currentTarget.style.background = '#F0F0F0'
                e.currentTarget.style.borderColor = '#888888'
                e.currentTarget.style.color = 'var(--color-text-primary)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'var(--color-border-strong)'
              e.currentTarget.style.color = 'var(--color-text-secondary)'
            }}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}
