'use client'

import { useState } from 'react'
import FreeformField from '../ui/FreeformField'
import StepShell from '../ui/StepShell'

const QUESTIONS = [
  {
    key: 'howWeMet',
    chip: 'How you met',
    label: 'How did you meet?',
    hint: 'She sat next to me at a conference and corrected my wrong answer out loud',
  },
  {
    key: 'insideJoke',
    chip: 'An inside joke',
    label: "What's a joke only your people would get?",
    hint: 'We call the third floor of our building "the vortex"',
  },
  {
    key: 'soUs',
    chip: '"That was so us"',
    label: 'What would make you say "that was so us" the next morning?',
    hint: 'One of her aunts cornering me to say she knew from the first time she saw us together',
  },
  {
    key: 'runningDebate',
    chip: 'A debate you never resolve',
    label: "What's a running debate you two never resolve?",
    hint: 'Whether a hot dog is a sandwich. It has been four years.',
  },
  {
    key: 'shockGuests',
    chip: 'Something guests don’t know',
    label: "What's something your guests would be shocked to learn about you two?",
    hint: 'We met on a dating app neither of us admits to using anymore',
  },
  {
    key: 'ritual',
    chip: 'A tradition only you two have',
    label: 'What’s a ritual or tradition that only the two of you share?',
    hint: 'Sunday morning we read horoscopes aloud in bad accents',
  },
  {
    key: 'anthem',
    chip: 'A song, place, or thing that means "us"',
    label: 'What’s a song, place, or object that instantly means "us"?',
    hint: 'The corner booth at Rae’s. We were there the night everything changed.',
  },
  {
    key: 'bestStoryteller',
    chip: 'Who has the best story about you',
    label: 'Who in the room has the best story about you two — and what is it?',
    hint: 'His brother Sam. Ask him about the flat tire in Portugal.',
  },
]

function preview(text) {
  const trimmed = text.trim()
  if (trimmed.length <= 60) return trimmed
  return trimmed.slice(0, 57).trimEnd() + '…'
}

export default function StepStory({ onNext, onBack, initialValues }) {
  const [story, setStory] = useState(initialValues?.story ?? {})
  const [openKey, setOpenKey] = useState(null)

  const answeredCount = Object.values(story).filter((v) => v?.trim()).length

  function toggle(key) {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  function submit() {
    onNext({ story })
  }

  return (
    <StepShell
      stepLabel="Step 5 of 6"
      title="Tell us about you two"
      subtitle="Tap any prompt that sparks something. Answer as many as you like — even one helps."
      cta={
        <div className="moodboard-cta">
          <button onClick={onBack} aria-label="Back" className="btn moodboard-back" style={{ flex: "0 0 auto" }}>
            ←
          </button>
          <button onClick={submit} className="btn btn-primary" style={{ flex: 1 }}>
            {answeredCount > 0
              ? `Almost there → (${answeredCount})`
              : 'Skip this step →'}
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {QUESTIONS.map((q) => {
          const value = story[q.key] ?? ''
          const isOpen = openKey === q.key
          const isAnswered = value.trim().length > 0
          return (
            <div
              key={q.key}
              style={{
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-subtle)',
                border: `1.5px solid ${
                  isOpen
                    ? 'var(--color-accent)'
                    : isAnswered
                    ? 'var(--color-accent-light)'
                    : 'transparent'
                }`,
                transition: 'border-color 200ms ease',
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => toggle(q.key)}
                aria-expanded={isOpen}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-3)',
                  width: '100%',
                  padding: 'var(--space-4)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: 'var(--text-body)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.3,
                    }}
                  >
                    {q.chip}
                  </span>
                  {isAnswered && !isOpen && (
                    <span
                      style={{
                        fontSize: 'var(--text-body-sm)',
                        color: 'var(--color-text-muted)',
                        fontStyle: 'italic',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      &ldquo;{preview(value)}&rdquo;
                    </span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isAnswered
                      ? 'var(--color-accent)'
                      : 'transparent',
                    color: isAnswered ? 'var(--color-bg)' : 'var(--color-text-muted)',
                    fontSize: 14,
                    fontWeight: 700,
                    transition: 'background 200ms ease',
                  }}
                >
                  {isAnswered ? '✓' : isOpen ? '–' : '+'}
                </span>
              </button>
              {isOpen && (
                <div
                  style={{
                    padding: '0 var(--space-4) var(--space-4)',
                    animation: 'briefEntryIn 220ms ease-out',
                  }}
                >
                  <FreeformField
                    label={q.label}
                    hint={q.hint}
                    value={value}
                    onChange={(val) => setStory((s) => ({ ...s, [q.key]: val }))}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </StepShell>
  )
}
