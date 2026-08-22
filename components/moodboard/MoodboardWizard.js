'use client'

import { useState, useEffect } from 'react'
import ProgressPulse from './ui/ProgressPulse'
import BriefPreview from './ui/BriefPreview'
import MoodboardResults from './results/MoodboardResults'
import StepVibes from './steps/StepVibes'
import StepGuests from './steps/StepGuests'
import StepMoments from './steps/StepMoments'
import StepFeelings from './steps/StepFeelings'
import StepStory from './steps/StepStory'
import StepWildcard from './steps/StepWildcard'

const STEPS = [StepVibes, StepGuests, StepMoments, StepFeelings, StepStory, StepWildcard]

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

function MatchingLoader() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        paddingTop: 'var(--nav-height)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-6)',
        textAlign: 'center',
        paddingInline: 'var(--space-6)',
      }}
    >
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="pulse-dot"
            style={{
              display: 'block',
              width: 10,
              height: 10,
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-accent)',
              animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <p
        style={{
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-muted)',
          fontWeight: 600,
          letterSpacing: '0.04em',
        }}
      >
        Reading your brief…
      </p>
      <h2
        style={{
          fontSize: 'var(--text-h3)',
          fontWeight: 800,
          lineHeight: 1.2,
          maxWidth: 380,
        }}
      >
        Finding your apps.
      </h2>
    </div>
  )
}

export default function MoodboardWizard() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [direction, setDirection] = useState('forward')
  const [results, setResults] = useState(null)
  const [matching, setMatching] = useState(false)
  const reducedMotion = useReducedMotion()

  // Prevent iOS overscroll bounce while wizard is active
  useEffect(() => {
    const prev = document.body.style.overscrollBehavior
    document.body.style.overscrollBehavior = 'contain'
    return () => {
      document.body.style.overscrollBehavior = prev
    }
  }, [])

  async function startMatching(finalAnswers) {
    setMatching(true)
    try {
      const res = await fetch('/api/moodboard/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      })
      const data = await res.json()
      setResults(data)
    } catch {
      // Use fallback results so the page always resolves
      setResults({
        threeWords: 'Yours. Entirely.',
        matches: [
          { id: 'who-said-it', tier: 'standard', score: 80, whyItFitsYou: "We couldn't reach the matching service right now — but Who Said It? is our most-loved app for any crowd.", appPageSlug: 'who-said-it' },
          { id: 'couple-trivia', tier: 'standard', score: 75, whyItFitsYou: 'Live Trivia brings the whole room together in under ten minutes. Strong for any couple with good stories.', appPageSlug: 'couple-trivia' },
        ],
        hiddenMatches: [],
      })
    } finally {
      setMatching(false)
    }
  }

  function onNext(stepAnswers) {
    const merged = { ...answers, ...stepAnswers }
    setAnswers(merged)
    setDirection('forward')
    const nextStep = step + 1
    setStep(nextStep)
    if (nextStep >= STEPS.length) {
      startMatching(merged)
    }
  }

  function onBack() {
    setDirection('back')
    setStep((prev) => Math.max(0, prev - 1))
  }

  const isDone = step >= STEPS.length

  if (isDone && matching) {
    return <MatchingLoader />
  }

  if (isDone && results) {
    return <MoodboardResults results={results} answers={answers} />
  }

  const CurrentStep = STEPS[step]

  return (
    <div style={{ position: 'relative', overscrollBehavior: 'contain' }}>
      <ProgressPulse total={STEPS.length} current={step} />
      <div
        key={step}
        style={{
          animation: reducedMotion
            ? 'none'
            : direction === 'forward'
            ? 'slideInFromRight 240ms ease-out'
            : 'slideInFromLeft 240ms ease-out',
        }}
      >
        <CurrentStep
          onNext={onNext}
          onBack={step > 0 ? onBack : undefined}
          initialValues={answers}
        />
      </div>
      <BriefPreview answers={answers} step={step} />
    </div>
  )
}
