'use client'

import { useState } from 'react'
import FreeformField from '../ui/FreeformField'

const QUESTIONS = [
  {
    key: 'howWeMet',
    label: 'How did you meet?',
    hint: 'She sat next to me at a conference and corrected my wrong answer out loud',
  },
  {
    key: 'insideJoke',
    label: "What's a joke only your people would get?",
    hint: 'We call the third floor of our building "the vortex"',
  },
  {
    key: 'mostUs',
    label: "What's the most "you" thing about your relationship?",
    hint: "We argue about the optimal route to every destination and she's always right",
  },
  {
    key: 'movieGenre',
    label: 'If your wedding had a movie genre, what would it be?',
    hint: 'A Richard Linklater film that ends with someone crying on a staircase',
  },
  {
    key: 'soUs',
    label: 'What would make you say "that was so us" the next morning?',
    hint: "One of her aunts cornering me to say she knew from the first time she saw us together",
  },
]

export default function StepStory({ onNext, onBack, initialValues }) {
  const [substep, setSubstep] = useState(0)
  const [direction, setDirection] = useState('forward')
  const [story, setStory] = useState(initialValues?.story ?? {})

  const q = QUESTIONS[substep]
  const isLast = substep === QUESTIONS.length - 1

  function advance() {
    if (isLast) {
      onNext({ story })
    } else {
      setDirection('forward')
      setSubstep((s) => s + 1)
    }
  }

  function retreat() {
    if (substep > 0) {
      setDirection('back')
      setSubstep((s) => s - 1)
    } else {
      onBack?.()
    }
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
          Step 5 of 6 &nbsp;·&nbsp; {substep + 1} of {QUESTIONS.length}
        </p>
        <h2 style={{ fontSize: 'var(--text-h3)', fontWeight: 800, lineHeight: 1.2 }}>
          Tell us about you two
        </h2>
      </div>

      <div
        key={`${substep}-${direction}`}
        style={{
          animation: `${direction === 'forward' ? 'slideInFromRight' : 'slideInFromLeft'} 240ms ease-out`,
        }}
      >
        <FreeformField
          label={q.label}
          hint={q.hint}
          value={story[q.key] ?? ''}
          onChange={(val) => setStory((s) => ({ ...s, [q.key]: val }))}
          onSkip={advance}
        />
      </div>

      <div className="moodboard-cta">
        <button onClick={retreat} className="btn" style={{ flex: '0 0 auto' }}>
          ←
        </button>
        <button onClick={advance} className="btn btn-primary" style={{ flex: 1 }}>
          {isLast ? 'Almost there →' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
