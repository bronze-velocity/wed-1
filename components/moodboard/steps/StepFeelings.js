'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import StepShell from '../ui/StepShell'

const FEELINGS = [
  { id: 'cry-good-kind',          icon: '😭', label: 'Cry (the good kind)' },
  { id: 'everyone-laughing',      icon: '😂', label: 'Everyone laughing at the same time' },
  { id: 'room-feels-like-show',   icon: '🎭', label: 'Room feels like a show' },
  { id: 'strangers-become-friends',icon: '🤝', label: 'Strangers became friends' },
  { id: 'keepsake-from-everyone', icon: '💌', label: 'A keepsake from everyone' },
  { id: 'something-nobody-has-seen', icon: '🌙', label: "Something nobody's seen before" },
  { id: 'our-story-main-character', icon: '💑', label: 'Our story was the main character' },
  { id: 'guests-actually-look-up', icon: '👀', label: 'Guests actually looked up' },
]

const MAX = 2

const bigLabel = { fontSize: 'var(--text-body)', fontWeight: 700 }

export default function StepFeelings({ onNext, onBack, initialValues }) {
  const [selected, setSelected] = useState(new Set(initialValues?.feelings ?? []))

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
    <StepShell
      stepLabel="Step 4 of 6"
      title="What do you want to feel the next morning?"
      subtitle={`Pick up to ${MAX}`}
      cta={
        <div className="moodboard-cta">
          {onBack && (
            <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: "0 0 auto" }}>
              ←
            </button>
          )}
          <button
            onClick={() => onNext({ feelings: Array.from(selected) })}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            That's what we want →
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
        {FEELINGS.map((f) => (
          <TapCard
            key={f.id}
            type="illustrated"
            icon={f.icon}
            label={f.label}
            selected={selected.has(f.id)}
            onClick={() => toggle(f.id)}
            maxSelect={MAX}
            labelStyle={bigLabel}
          />
        ))}
      </div>
    </StepShell>
  )
}
