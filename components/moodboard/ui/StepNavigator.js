'use client'

import { useEffect, useRef } from 'react'
import { MOODBOARD_STEPS, hasStepAnswer } from '@/lib/moodboard/config'

export default function StepNavigator({ current, answers, onNavigate }) {
  const activeRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    activeRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest', inline: 'center' })
  }, [current])

  return (
    <nav className="moodboard-step-nav" aria-label="Moodboard steps">
      <div className="moodboard-step-nav-track">
        {MOODBOARD_STEPS.map((item, index) => {
          const active = index === current
          const answered = hasStepAnswer(answers, index)
          return (
            <button
              key={item.id}
              ref={active ? activeRef : null}
              type="button"
              className="moodboard-step-nav-item"
              data-active={active || undefined}
              data-answered={answered || undefined}
              aria-current={active ? 'step' : undefined}
              onClick={() => onNavigate(index)}
            >
              <span aria-hidden="true" className="moodboard-step-number">
                {answered && !active ? '\u2713' : index + 1}
              </span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
