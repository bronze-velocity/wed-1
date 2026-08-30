'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import PhoneShell from './PhoneShell'

function toLabelFor(to) {
  return to === 'her' ? 'To Her' : to === 'him' ? 'To Him' : 'To Both'
}

function initialsFor(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function truncate(text, max = 52) {
  if (!text) return ''
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + '…'
}

export default function AdminFrame({ queue = [], pending, onApprove, onSkip, active, resetKey, autoApproveAfterMs = null }) {
  const [isApproving, setIsApproving] = useState(false)

  useEffect(() => {
    setIsApproving(false)
  }, [resetKey])

  useEffect(() => {
    if (!active || autoApproveAfterMs == null) return
    const id = setTimeout(() => {
      setIsApproving(true)
      setTimeout(() => onApprove?.(), 400)
    }, autoApproveAfterMs)
    return () => clearTimeout(id)
  }, [active, autoApproveAfterMs, onApprove, resetKey])

  const { message, senderName, to, photo } = pending
  const toLabel = toLabelFor(to)
  const recentApproved = queue.slice(-3).reverse()

  function handleApprove() {
    if (!active || isApproving) return
    setIsApproving(true)
    setTimeout(() => {
      onApprove()
    }, 400)
  }

  return (
    <PhoneShell>
      <div style={{
        padding: '0 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        fontFamily: 'var(--font-sans)',
      }}>
        {/* Couple photo strip — the only place brand romance lives on this screen */}
        <div style={{
          position: 'relative',
          height: 64,
          margin: '0 -16px',
          overflow: 'hidden',
        }}>
          <Image
            src="/images/post/legacy-1.jpg"
            alt=""
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
            Sam &amp; Jordan &middot; Oct 4
          </p>
        </div>

        {/* Header row */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 8,
        }}>
          <h3 style={{
            fontSize: 'var(--text-h4)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.2,
            margin: 0,
          }}>
            Approve for the wall
          </h3>
          <span style={{
            fontSize: 'var(--text-tiny)',
            color: 'var(--color-text-muted)',
            fontWeight: 600,
          }}>
            1 waiting
          </span>
        </div>

        {/* Pending message card — inbox-item styling */}
        <div style={{
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '12px',
          transition: 'opacity 350ms var(--ease-out), transform 350ms var(--ease-out)',
          opacity: isApproving ? 0 : 1,
          transform: isApproving ? 'translateX(24px)' : 'translateX(0)',
        }}>
          {/* Sender row: avatar + name + timestamp, To-chip on the right */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 10,
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--color-text-secondary)',
              flexShrink: 0,
            }}>
              {initialsFor(senderName)}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, minWidth: 0, flex: 1 }}>
              <span style={{
                fontSize: 'var(--text-body-sm)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {senderName || 'Anonymous'}
              </span>
              <span style={{
                fontSize: 'var(--text-tiny)',
                color: 'var(--color-text-muted)',
                whiteSpace: 'nowrap',
              }}>
                · 12s ago
              </span>
            </div>
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'var(--color-text-secondary)',
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '2px 6px',
              whiteSpace: 'nowrap',
            }}>
              {toLabel}
            </span>
          </div>

          {photo && (
            <div style={{ position: 'relative', width: '100%', height: 120, borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 10 }}>
              <Image src={photo} alt="Photo attached to this message" fill sizes="260px" style={{ objectFit: 'cover' }} />
            </div>
          )}

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body-sm)',
            lineHeight: 1.5,
            color: 'var(--color-text-primary)',
            margin: 0,
          }}>
            {message}
          </p>
        </div>

        {/* Action buttons — Approve dominant, Skip as low-weight text link */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <button
            onClick={handleApprove}
            disabled={!active || isApproving}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '11px 12px',
              background: 'var(--color-green)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 700,
              cursor: active && !isApproving ? 'pointer' : 'not-allowed',
              transition: 'box-shadow var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out), opacity var(--duration-fast)',
              opacity: isApproving ? 0.6 : 1,
              fontFamily: 'inherit',
            }}
          >
            Approve
          </button>

          <button
            onClick={onSkip}
            disabled={isApproving}
            style={{
              padding: '4px 6px',
              background: 'transparent',
              color: 'var(--color-text-muted)',
              border: 'none',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 500,
              cursor: isApproving ? 'default' : 'pointer',
              fontFamily: 'inherit',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Skip
          </button>
        </div>

        {/* Queue — recently approved */}
        {recentApproved.length > 0 && (
          <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              Recently approved
            </span>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
              {recentApproved.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0, color: 'var(--color-green)' }}>
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{
                    fontSize: 'var(--text-tiny)',
                    fontWeight: 700,
                    color: 'var(--color-text-secondary)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    {item.senderName || 'Anonymous'}
                  </span>
                  <span style={{
                    fontSize: 'var(--text-tiny)',
                    color: 'var(--color-text-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                  }}>
                    {truncate(item.message, 40)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PhoneShell>
  )
}
