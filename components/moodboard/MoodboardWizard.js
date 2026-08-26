'use client'

import { useState, useEffect } from 'react'
import StepNavigator from './ui/StepNavigator'
import BriefPreview from './ui/BriefPreview'
import ResumeBanner from './ui/ResumeBanner'
import TalkToUs from './ui/TalkToUs'
import MoodboardResults from './results/MoodboardResults'
import StepVibes from './steps/StepVibes'
import StepGuests from './steps/StepGuests'
import StepMoments from './steps/StepMoments'
import StepFeelings from './steps/StepFeelings'
import StepStory from './steps/StepStory'
import StepWildcard from './steps/StepWildcard'
import { loadProgress, saveProgress, clearProgress } from './lib/persistence'
import { apps } from '@/data/apps'
import { trackEvent } from '@/lib/analytics'
import { buildMoodboardDirections } from '@/lib/moodboard/directions'

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
    <main
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
          color: 'var(--color-text-secondary)',
          fontWeight: 600,
          letterSpacing: '0.04em',
        }}
      >
        Reading your brief…
      </p>
      <h1
        style={{
          fontSize: 'var(--text-h3)',
          fontWeight: 800,
          lineHeight: 1.2,
          maxWidth: 380,
        }}
      >
        Finding your apps.
      </h1>
    </main>
  )
}

export default function MoodboardWizard({
  initialSeed = null,
  role = null,
  initialAnswers = null,
  lockedSlug = null,
}) {
  const seededApp = initialSeed ? apps.find((a) => a.slug === initialSeed) : null
  const [step, setStep] = useState(0)
  const [furthestVisitedStep, setFurthestVisitedStep] = useState(0)
  const [answers, setAnswers] = useState(() => {
    if (initialAnswers && typeof initialAnswers === 'object') {
      return { ...initialAnswers }
    }
    const base = {}
    if (seededApp) base.seededApp = seededApp.slug
    if (role) base.role = role
    return base
  })
  const [direction, setDirection] = useState('forward')
  const [results, setResults] = useState(null)
  const [matching, setMatching] = useState(false)
  const [resumeCandidate, setResumeCandidate] = useState(null)
  const [startedTracked, setStartedTracked] = useState(false)
  const reducedMotion = useReducedMotion()

  // Prevent iOS overscroll bounce while wizard is active
  useEffect(() => {
    const prev = document.body.style.overscrollBehavior
    document.body.style.overscrollBehavior = 'contain'
    return () => {
      document.body.style.overscrollBehavior = prev
    }
  }, [])

  // Check for saved progress on mount (once) — skip in edit mode
  useEffect(() => {
    if (lockedSlug) return
    const saved = loadProgress()
    if (saved) setResumeCandidate(saved)
  }, [lockedSlug])

  // Autosave whenever answers or step change (skip empty initial state, results phase, and edit mode)
  useEffect(() => {
    if (lockedSlug || results || matching) return
    saveProgress(answers, step, furthestVisitedStep)
  }, [answers, step, furthestVisitedStep, results, matching, lockedSlug])

  function handleContinueResume() {
    if (!resumeCandidate) return
    setAnswers(resumeCandidate.answers || {})
    setStep(Math.min(resumeCandidate.step ?? 0, STEPS.length - 1))
    setFurthestVisitedStep(Math.min(resumeCandidate.furthestVisitedStep ?? resumeCandidate.step ?? 0, STEPS.length - 1))
    setResumeCandidate(null)
  }

  function handleStartFresh() {
    clearProgress()
    setResumeCandidate(null)
  }

  function handleBriefSent() {
    trackEvent('moodboard_finished', { seed: seededApp?.slug || null, role: role || null })
    clearProgress()
  }

  async function startMatching(finalAnswers) {
    setMatching(true)
    try {
      const res = await fetch('/api/moodboard/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      })
      const data = await res.json()
      if (!res.ok || !Array.isArray(data.matches)) throw new Error('match failed')
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
    if (!startedTracked) {
      trackEvent('moodboard_started', { seed: seededApp?.slug || null, role: role || null })
      setStartedTracked(true)
    }
    const nextStep = step + 1
    setStep(nextStep)
    setFurthestVisitedStep((current) => Math.max(current, Math.min(nextStep, STEPS.length - 1)))
    if (nextStep >= STEPS.length) {
      startMatching(merged)
    }
  }

  function onBack() {
    setDirection('back')
    setStep((prev) => Math.max(0, prev - 1))
  }

  function goToStep(target) {
    if (target === step) return
    setDirection(target > step ? 'forward' : 'back')
    setStep(target)
    setFurthestVisitedStep((current) => Math.max(current, target))
  }

  function onDraftChange(stepAnswers) {
    setAnswers((current) => ({ ...current, ...stepAnswers }))
  }

  const isDone = step >= STEPS.length

  if (isDone && matching) {
    return <MatchingLoader />
  }

  if (isDone && results) {
    return (
      <MoodboardResults
        results={results}
        answers={answers}
        onBriefSent={handleBriefSent}
        lockedSlug={lockedSlug}
      />
    )
  }

  const CurrentStep = STEPS[step]
  const directionIds = buildMoodboardDirections(answers).map((item) => item.id)

  return (
    <main className="moodboard-experience">
      <TalkToUs answers={answers} />
      {(seededApp || role === 'planner') && (
        <div
          style={{
            width: 'fit-content',
            margin: 'var(--space-3) auto 0',
            background: 'var(--color-bg-subtle)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '6px 12px',
            fontSize: 'var(--text-tiny)',
            fontWeight: 600,
            letterSpacing: '0.02em',
            boxShadow: 'var(--shadow-xs)',
            maxWidth: 'calc(100vw - var(--space-8))',
            textAlign: 'center',
          }}
        >
          {seededApp ? `Designing around · ${seededApp.title}` : 'Planner brief'}
        </div>
      )}
      {resumeCandidate && (
        <ResumeBanner
          savedAt={resumeCandidate.savedAt}
          onContinue={handleContinueResume}
          onStartFresh={handleStartFresh}
        />
      )}
      <StepNavigator current={step} answers={answers} furthestVisitedStep={furthestVisitedStep} onNavigate={goToStep} />
      <div className="moodboard-studio-canvas">
        <div
          key={step}
          className="moodboard-step-stage"
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
            onDraftChange={onDraftChange}
            directionIds={directionIds}
          />
        </div>
        <BriefPreview
          answers={answers}
          step={step}
          onPreferencesChange={(directionPreferences) => onDraftChange({ directionPreferences })}
        />
      </div>
    </main>
  )
}
