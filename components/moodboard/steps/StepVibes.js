'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'

const VIBES = [
  { id: 'dinner-party',   src: '/images/moodboard/vibes/dinner-party.jpg',   label: 'Dinner that got out of hand' },
  { id: 'film-premiere',  src: '/images/moodboard/vibes/film-premiere.jpg',  label: 'Film premiere energy' },
  { id: 'pub-quiz',       src: '/images/moodboard/vibes/pub-quiz.jpg',        label: 'Pub quiz, best table wins' },
  { id: 'gallery-opening',src: '/images/moodboard/vibes/gallery-opening.jpg', label: 'Gallery opening, wine in hand' },
  { id: 'bonfire',        src: '/images/moodboard/vibes/bonfire.jpg',          label: 'Bonfire at the end of the night' },
  { id: 'rooftop',        src: '/images/moodboard/vibes/rooftop.jpg',          label: 'Rooftop, city below' },
  { id: 'brunch',         src: '/images/moodboard/vibes/brunch.jpg',           label: 'Brunch that never ended' },
  { id: 'kitchen-party',  src: '/images/moodboard/vibes/kitchen-party.jpg',   label: 'Everyone ended up in the kitchen' },
]

const MAX = 3

export default function StepVibes({ onNext, onBack, initialValues }) {
  const [selected, setSelected] = useState(new Set(initialValues?.vibes ?? []))

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < MAX) {
        next.add(id)
      }
      return next
    })
  }

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
          Step 1 of 6
        </p>
        <h2
          style={{
            fontSize: 'var(--text-h3)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 'var(--space-2)',
          }}
        >
          What does your reception feel like?
        </h2>
        <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-muted)' }}>
          Pick up to {MAX}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-3)',
        }}
      >
        {VIBES.map((v) => (
          <TapCard
            key={v.id}
            type="photo"
            src={v.src}
            alt={v.label}
            label={v.label}
            selected={selected.has(v.id)}
            onClick={() => toggle(v.id)}
            maxSelect={MAX}
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
          onClick={() => onNext({ vibes: Array.from(selected) })}
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          These feel like us →
        </button>
      </div>
    </div>
  )
}
