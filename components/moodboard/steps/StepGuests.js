'use client'

import { useState } from 'react'
import TapCard from '../ui/TapCard'
import OptionalFreeform from '../ui/OptionalFreeform'
import StepShell from '../ui/StepShell'

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
    <StepShell
      stepLabel="Step 2 of 6"
      title="Tell us about your people"
      cta={
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
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
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

        <OptionalFreeform
          triggerLabel="Describe your guest list in one sentence"
          label="Describe your guest list in one sentence"
          hint="My college friends, her enormous Italian family, and 40 people I've never met"
          value={freeform}
          onChange={setFreeform}
        />
      </div>
    </StepShell>
  )
}
