'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'

const WILDCARDS = [
  { id: 'candlelit-pan',           src: '/images/moodboard/wildcard/candlelit-pan.jpg',           alt: 'Candlelit pan' },
  { id: 'phone-in-dark',           src: '/images/moodboard/wildcard/phone-in-dark.jpg',           alt: 'Phone in the dark' },
  { id: 'crowd-goes-quiet',        src: '/images/moodboard/wildcard/crowd-goes-quiet.jpg',        alt: 'Crowd going quiet' },
  { id: 'everyone-points-at-screen',src: '/images/moodboard/wildcard/everyone-points-at-screen.jpg', alt: 'Everyone pointing at a screen' },
  { id: 'someone-crying-at-table', src: '/images/moodboard/wildcard/someone-crying-at-table.jpg', alt: 'Someone crying at a table' },
  { id: 'flash-mob',               src: '/images/moodboard/wildcard/flash-mob.jpg',               alt: 'Flash mob' },
]

export default function StepWildcard({ onNext, onBack, initialValues }) {
  const [selected, setSelected] = useState(initialValues?.wildcard ?? null)

  return (
    <div
      style={{
        minHeight: '100dvh',
        paddingTop: 'calc(var(--nav-height) + var(--space-16))',
        paddingBottom: 'var(--space-24)',
        paddingLeft: 'var(--space-6)',
        paddingRight: 'var(--space-6)',
        maxWidth: 540,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
      }}
    >
      <div>
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-muted)',
            fontWeight: 600,
            marginBottom: 'var(--space-2)',
          }}
        >
          Step 6 of 6
        </p>
        <h2 style={{ fontSize: 'var(--text-h3)', fontWeight: 800, lineHeight: 1.2 }}>
          One last thing
        </h2>
        <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
          Pick the image that feels like your reception.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {WILDCARDS.map((w) => (
          <TapCard
            key={w.id}
            type="photo"
            src={w.src}
            alt={w.alt}
            selected={selected === w.id}
            onClick={() => setSelected(w.id)}
            maxSelect={1}
          />
        ))}
      </div>

      <div className="moodboard-cta">
        {onBack && (
          <button onClick={onBack} className="btn" style={{ flex: '0 0 auto' }}>
            ←
          </button>
        )}
        <button
          onClick={() => onNext({ wildcard: selected })}
          className="btn btn-primary"
          style={{ flex: 1 }}
          disabled={!selected}
        >
          Find my apps →
        </button>
      </div>
    </div>
  )
}
