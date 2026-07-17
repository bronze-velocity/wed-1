'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const TO_LABELS = {
  both: 'Both of you',
  her: 'Her',
  him: 'Him',
}

const PETALS = [
  { left: '6%', duration: '6.4s', delay: '0s', size: 8, drift: '16px', color: 'rgba(173,138,62,0.55)' },
  { left: '18%', duration: '7.6s', delay: '1.4s', size: 6, drift: '-12px', color: 'rgba(242,78,120,0.35)' },
  { left: '32%', duration: '6.8s', delay: '2.6s', size: 10, drift: '14px', color: 'rgba(173,138,62,0.4)' },
  { left: '50%', duration: '8.2s', delay: '0.6s', size: 7, drift: '-16px', color: 'rgba(242,78,120,0.3)' },
  { left: '66%', duration: '7.1s', delay: '3.1s', size: 9, drift: '18px', color: 'rgba(173,138,62,0.5)' },
  { left: '80%', duration: '6.9s', delay: '1.9s', size: 6, drift: '-10px', color: 'rgba(242,78,120,0.35)' },
  { left: '92%', duration: '7.4s', delay: '2.8s', size: 8, drift: '12px', color: 'rgba(173,138,62,0.45)' },
]

export default function BigScreenFrame({ message, senderName, to, photo, onReset, active }) {
  const [visible, setVisible] = useState(false)
  const [showReset, setShowReset] = useState(false)

  useEffect(() => {
    if (!active) {
      setVisible(false)
      setShowReset(false)
      return
    }
    const visTimer = setTimeout(() => setVisible(true), 80)
    const resetTimer = setTimeout(() => setShowReset(true), 1100)
    return () => {
      clearTimeout(visTimer)
      clearTimeout(resetTimer)
    }
  }, [active])

  const toLabel = TO_LABELS[to] || 'Both of you'
  const attribution = senderName ? `— ${senderName}` : '— Anonymous'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          background: 'var(--color-bg-dark)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: active
            ? '0 0 0 3px rgba(173, 138, 62, 0.35), 0 24px 48px rgba(0, 0, 0, 0.5)'
            : '0 0 0 2px rgba(255,255,255,0.08), 0 24px 48px rgba(0, 0, 0, 0.5)',
          aspectRatio: '16 / 9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-10)',
          overflow: 'hidden',
          transition: 'box-shadow var(--duration-slow) var(--ease-out)',
        }}
      >
        {/* Soft gold glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(173,138,62,0.22) 0%, rgba(17,17,17,0) 62%)',
          }}
        />

        {/* Falling petals */}
        {active && PETALS.map((p, i) => (
          <span
            key={i}
            className="petal"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: '50% 0 50% 50%',
              animationDuration: p.duration,
              animationDelay: p.delay,
              '--petal-drift-x': p.drift,
            }}
          />
        ))}

        <div
          style={{
            position: 'relative',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.96)',
            transition: 'opacity var(--duration-slowest) var(--ease-out), transform var(--duration-slowest) var(--ease-out)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-4)',
          }}
        >
          {photo && (
            <div
              style={{
                width: 96,
                height: 96,
                background: '#fff',
                padding: 6,
                borderRadius: 4,
                boxShadow: '0 10px 24px rgba(0,0,0,0.4)',
                transform: 'rotate(-3deg)',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image src={photo} alt="Photo attached to this message" fill sizes="96px" style={{ objectFit: 'cover' }} />
              </div>
            </div>
          )}

          <p
            style={{
              fontSize: 'var(--text-label)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              margin: 0,
            }}
          >
            To: {toLabel}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', maxWidth: 220 }}>
            <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.25)' }} />
            <span style={{ color: 'var(--color-gold)', fontSize: 14 }} aria-hidden="true">❦</span>
            <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.25)' }} />
          </div>

          <p
            style={{
              fontFamily: 'var(--font-serif-accent)',
              fontStyle: 'italic',
              fontSize: 'var(--text-h2)',
              lineHeight: 1.3,
              color: 'var(--color-text-inverse)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            {message}
          </p>

          <p
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-inverse-secondary)',
              margin: 0,
            }}
          >
            {attribution}
          </p>
        </div>

        <span
          style={{
            position: 'absolute',
            bottom: 'var(--space-4)',
            right: 'var(--space-5)',
            fontSize: 'var(--text-tiny)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          Wepho
        </span>
      </div>

      <div
        style={{
          opacity: showReset ? 1 : 0,
          transition: 'opacity 300ms var(--ease-out)',
          pointerEvents: showReset ? 'auto' : 'none',
        }}
      >
        <button
          onClick={onReset}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-full)',
            padding: 'var(--space-2) var(--space-6)',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Start over
        </button>
      </div>
    </div>
  )
}
