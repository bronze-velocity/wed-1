'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import FreeformField from '../ui/FreeformField'

const GUESTS = [
  { id: 'grandparents-front-row', icon: '👵', label: 'Grandparents in the front row', sublabel: 'Family-first crowd' },
  { id: 'wild-college-friends',   icon: '🎉', label: 'Wild college friends',           sublabel: "They'll close the bar" },
  { id: 'strangers-meeting',      icon: '🌍', label: 'Half the room never met',        sublabel: "People meeting for the first time" },
  { id: 'work-crowd',             icon: '👔', label: 'Work crowd mixed in',             sublabel: 'Colleagues + close friends' },
  { id: 'kids-running',           icon: '👧', label: 'Lots of kids',                    sublabel: 'Multigenerational' },
  { id: 'loud-family',            icon: '🎤', label: 'Loud, opinionated family',        sublabel: 'Everyone has a speech in them' },
  { id: 'dancers',                icon: '🕺', label: 'Dancers',                          sublabel: 'The floor will fill' },
  { id: 'reserved-warm',          icon: '🤍', label: 'Reserved but warm',               sublabel: 'They show it differently' },
]

export default function StepGuests({ onNext, onBack, initialValues }) {
  const [selected, setSelected] = useState(new Set(initialValues?.guests ?? []))
  const [freeform, setFreeform] = useState(initialValues?.guestFreeform ?? '')

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
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
          Step 2 of 6
        </p>
        <h2 style={{ fontSize: 'var(--text-h3)', fontWeight: 800, lineHeight: 1.2 }}>
          Tell us about your people
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-3)',
        }}
      >
        {GUESTS.map((g) => (
          <TapCard
            key={g.id}
            type="illustrated"
            icon={g.icon}
            label={g.label}
            sublabel={g.sublabel}
            selected={selected.has(g.id)}
            onClick={() => toggle(g.id)}
          />
        ))}
      </div>

      <FreeformField
        label="Describe your guest list in one sentence"
        hint="My college friends, her enormous Italian family, and 40 people I've never met"
        value={freeform}
        onChange={setFreeform}
      />

      <div className="moodboard-cta">
        {onBack && (
          <button onClick={onBack} className="btn" style={{ flex: '0 0 auto' }}>
            ←
          </button>
        )}
        <button
          onClick={() =>
            onNext({ guests: Array.from(selected), guestFreeform: freeform })
          }
          className="btn btn-primary"
          style={{ flex: 1 }}
        >
          That's our crowd →
        </button>
      </div>
    </div>
  )
}
