'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'

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
    <StepShell
      stepLabel="Step 6 of 6"
      title="One last thing"
      subtitle="Pick the image that feels like your reception."
      cta={
        <div className="moodboard-cta">
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: "0 0 auto" }}>
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
      }
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-3)',
        }}
      >
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
    </StepShell>
  )
}
