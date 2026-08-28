'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import PhoneShell from './PhoneShell'

function toLabelFor(to) {
  return to === 'her' ? 'To: Her' : to === 'him' ? 'To: Him' : 'To: Both'
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
  const lastApproved = queue.length > 0 ? queue[queue.length - 1] : null

  function handleApprove() {
    if (!active || isApproving) return
    setIsApproving(true)
    setTimeout(() => {
      onApprove()
    }, 400)
  }

  return (
    <PhoneShell screenBg="var(--color-bg-subtle)">
      <div style={{
        padding: '10px 14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily: 'var(--font-sans)',
      }}>
        {/* App header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}>
          <div style={{
            fontFamily: 'var(--font-serif-accent)',
            fontStyle: 'italic',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-primary)',
            lineHeight: 1.25,
          }}>
            Sam &amp; Jordan&rsquo;s queue
          </div>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: 'var(--color-gold-light)',
            color: 'var(--color-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '3px 8px',
            whiteSpace: 'nowrap',
          }}>
            1 waiting
          </div>
        </div>

        {/* Pending message card */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderLeft: '3px solid var(--color-gold)',
          borderRadius: 'var(--radius-lg)',
          padding: '12px 12px 14px',
          boxShadow: 'var(--shadow-sm)',
          transition: 'opacity 350ms var(--ease-out), transform 350ms var(--ease-out)',
          opacity: isApproving ? 0 : 1,
          transform: isApproving ? 'translateX(24px)' : 'translateX(0)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
            }}>
              {toLabel}
            </span>
            <span style={{
              fontSize: 10,
              color: 'var(--color-text-muted)',
            }}>
              just now
            </span>
          </div>

          {photo && (
            <div style={{ position: 'relative', width: 56, height: 56, borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 8, boxShadow: 'var(--shadow-sm)' }}>
              <Image src={photo} alt="Photo attached to this message" fill sizes="56px" style={{ objectFit: 'cover' }} />
            </div>
          )}

          <p style={{
            fontFamily: 'var(--font-serif-accent)',
            fontSize: 'var(--text-body-sm)',
            lineHeight: 1.5,
            color: 'var(--color-text-primary)',
            margin: '0 0 8px',
            fontStyle: 'italic',
          }}>
            &ldquo;{message}&rdquo;
          </p>

          <div style={{
            fontSize: 'var(--text-tiny)',
            color: 'var(--color-text-secondary)',
          }}>
            — {senderName || 'Anonymous'}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: 8,
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
              padding: '10px 12px',
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
            <span aria-hidden="true">♥</span> Approve
          </button>

          <button
            onClick={onSkip}
            disabled={isApproving}
            style={{
              padding: '10px 14px',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              border: '1.5px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 600,
              cursor: isApproving ? 'default' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Skip
          </button>
        </div>

        {/* Recently approved (compact) */}
        {lastApproved && (
          <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              Just approved
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 10px',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              opacity: 0.85,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0, color: 'var(--color-green)' }}>
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-serif-accent)',
                fontSize: 'var(--text-tiny)',
                color: 'var(--color-text-secondary)',
                fontStyle: 'italic',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                lineHeight: 1.4,
              }}>
                &ldquo;{lastApproved.message}&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>
    </PhoneShell>
  )
}
