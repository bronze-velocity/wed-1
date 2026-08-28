'use client'

import { useEffect, useRef, useState } from 'react'
import PhoneFrame from './PhoneFrame'
import AdminFrame from './AdminFrame'
import BigScreenFrame from './BigScreenFrame'
import AutoPlayPhone from './AutoPlayPhone'

const STEPS = ['phone', 'admin', 'screen']

const STEP_LABELS = {
  phone: "A guest's phone",
  admin: "Maid of honor's phone",
  screen: 'The reception screen',
}

const STEP_SUBTITLES = {
  phone: 'Any guest, any moment, from their own phone.',
  admin: 'She screens each one from her phone.',
  screen: 'Together, on the big screen, when dinner starts.',
}

// Seeded so the demo always has queue history and a pending message.
const SEED_MESSAGES = [
  { message: "I knew from the first dinner you brought him to that this was it.", senderName: 'Mom', to: 'both', approved: true, photo: null },
  { message: "Remember the parking lot in 2019? Look how far you've come.", senderName: 'Dani', to: 'her', approved: true, photo: '/images/post/reading-1.jpg' },
  { message: 'Take care of her the way you promised me at Christmas.', senderName: 'Uncle Pete', to: 'him', approved: false, photo: null },
]

const SEED_APPROVED = SEED_MESSAGES.filter(m => m.approved)
const SEED_PENDING = SEED_MESSAGES.find(m => !m.approved)
const AUTO_MESSAGE = {
  message: 'Take care of her the way you promised me at Christmas.',
  senderName: 'Uncle Pete',
  to: 'him',
  photo: null,
}
const DEFAULT_REVEAL = AUTO_MESSAGE

// Timings (ms)
const AUTO_PHONE_MS = 5200
const AUTO_ADMIN_MS = 2400
const AUTO_SCREEN_MS = 6000

export default function LoveLetterDemo() {
  const [mode, setMode] = useState('auto') // 'auto' | 'interactive'
  const [step, setStep] = useState('phone')
  const [interactiveData, setInteractiveData] = useState(null)
  const [approvedMessage, setApprovedMessage] = useState(null)
  const [resetCount, setResetCount] = useState(0)
  const [inView, setInView] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const containerRef = useRef(null)

  const stepIndex = STEPS.indexOf(step)
  const pendingMessage = mode === 'interactive' ? (interactiveData || SEED_PENDING) : AUTO_MESSAGE
  const revealMessage = mode === 'interactive'
    ? (approvedMessage || DEFAULT_REVEAL)
    : AUTO_MESSAGE

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  // Pause autoplay when off-screen
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  // Autoplay loop (phone → admin → screen → loop) when in auto mode.
  useEffect(() => {
    if (mode !== 'auto' || !inView) return
    if (reducedMotion) {
      setStep('screen')
      return
    }
    let timer
    if (step === 'phone') {
      timer = setTimeout(() => setStep('admin'), AUTO_PHONE_MS)
    } else if (step === 'screen') {
      timer = setTimeout(() => {
        setStep('phone')
        setResetCount((c) => c + 1)
      }, AUTO_SCREEN_MS)
    }
    // 'admin' advances via AdminFrame's autoApproveAfterMs → onApprove.
    return () => clearTimeout(timer)
  }, [mode, step, inView, reducedMotion, resetCount])

  function handleInteractiveSubmit({ message, senderName, to, photo }) {
    setInteractiveData({ message, senderName, to, photo })
    setTimeout(() => setStep('admin'), 500)
  }

  function handleApprove() {
    if (mode === 'interactive') {
      setApprovedMessage(interactiveData || SEED_PENDING)
    }
    setStep('screen')
  }

  function tryItYourself() {
    setMode('interactive')
    setInteractiveData(null)
    setApprovedMessage(null)
    setStep('phone')
    setResetCount((c) => c + 1)
  }

  function restart() {
    setMode('auto')
    setInteractiveData(null)
    setApprovedMessage(null)
    setStep('phone')
    setResetCount((c) => c + 1)
  }

  const isAuto = mode === 'auto'
  const frameWidth = step === 'screen' ? 620 : 300

  function goPrev() {
    if (mode === 'auto') return
    const i = Math.max(0, stepIndex - 1)
    setStep(STEPS[i])
  }
  function goNext() {
    if (mode === 'auto') return
    if (stepIndex >= STEPS.length - 1) return
    setStep(STEPS[stepIndex + 1])
  }

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {/* Label + subtitle above the active frame */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)', minHeight: 68 }}>
        <p style={{
          fontSize: 'var(--text-tiny)',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          margin: '0 0 6px',
        }}>
          Step {stepIndex + 1} of 3 · {STEP_LABELS[step]}
        </p>
        <p style={{
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-secondary)',
          maxWidth: 460,
          margin: '0 auto',
        }}>
          {STEP_SUBTITLES[step]}
        </p>
      </div>

      {/* Single frame slot with cross-fade */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '4px 16px',
          minHeight: 560,
        }}
      >
        <div
          key={`${mode}-${step}-${resetCount}`}
          style={{
            width: '100%',
            maxWidth: frameWidth,
            animation: 'lldFade 350ms var(--ease-out)',
          }}
        >
          {step === 'phone' && isAuto && (
            <AutoPlayPhone
              message={AUTO_MESSAGE.message}
              senderName={AUTO_MESSAGE.senderName}
              to={AUTO_MESSAGE.to}
              typeMs={AUTO_PHONE_MS - 1400}
              active={inView && !reducedMotion}
            />
          )}
          {step === 'phone' && !isAuto && (
            <PhoneFrame key={resetCount} onSubmit={handleInteractiveSubmit} />
          )}
          {step === 'admin' && (
            <AdminFrame
              queue={SEED_APPROVED}
              pending={pendingMessage}
              onApprove={handleApprove}
              onSkip={restart}
              active={true}
              resetKey={resetCount}
              autoApproveAfterMs={isAuto ? AUTO_ADMIN_MS : null}
            />
          )}
          {step === 'screen' && (
            <BigScreenFrame
              key={resetCount}
              message={revealMessage.message}
              senderName={revealMessage.senderName}
              to={revealMessage.to}
              photo={revealMessage.photo}
              onReset={isAuto ? tryItYourself : restart}
              active={true}
            />
          )}
        </div>
      </div>

      {/* Progress + controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-4)',
        marginTop: 'var(--space-6)',
      }}>
        {isAuto ? (
          <>
            <div style={{ display: 'flex', gap: 8 }}>
              {STEPS.map((s, i) => {
                const isCurrent = s === step
                const isDone = i < stepIndex
                return (
                  <span
                    key={s}
                    aria-hidden="true"
                    style={{
                      width: isCurrent ? 28 : 10,
                      height: 10,
                      borderRadius: 'var(--radius-full)',
                      background: isCurrent
                        ? 'var(--color-accent)'
                        : isDone
                        ? 'var(--color-border-strong)'
                        : 'var(--color-border)',
                      transition: 'width 300ms var(--ease-out), background 300ms var(--ease-out)',
                    }}
                  />
                )
              })}
            </div>
            <button
              type="button"
              onClick={tryItYourself}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-accent)',
                background: 'var(--color-accent)',
                color: '#fff',
                fontSize: 'var(--text-body-sm)',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Try it yourself →
            </button>
          </>
        ) : (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-4)',
            }}>
              <button
                type="button"
                onClick={goPrev}
                disabled={stepIndex === 0}
                aria-label="Previous step"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg)',
                  color: stepIndex === 0 ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 600,
                  cursor: stepIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: stepIndex === 0 ? 0.5 : 1,
                  fontFamily: 'inherit',
                  transition: 'background var(--duration-fast), border-color var(--duration-fast)',
                }}
              >
                <span aria-hidden="true">←</span> Back
              </button>

              <div style={{ display: 'flex', gap: 8 }}>
                {STEPS.map((s, i) => {
                  const isCurrent = s === step
                  const isDone = i < stepIndex
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStep(s)}
                      aria-label={`Jump to step ${i + 1}: ${STEP_LABELS[s]}`}
                      aria-current={isCurrent ? 'step' : undefined}
                      style={{
                        width: isCurrent ? 28 : 10,
                        height: 10,
                        padding: 0,
                        borderRadius: 'var(--radius-full)',
                        border: 'none',
                        background: isCurrent
                          ? 'var(--color-accent)'
                          : isDone
                          ? 'var(--color-border-strong)'
                          : 'var(--color-border)',
                        cursor: 'pointer',
                        transition: 'width 300ms var(--ease-out), background 300ms var(--ease-out)',
                      }}
                    />
                  )
                })}
              </div>

              <button
                type="button"
                onClick={goNext}
                disabled={stepIndex >= STEPS.length - 1}
                aria-label="Next step"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--color-accent)',
                  background: stepIndex >= STEPS.length - 1 ? 'transparent' : 'var(--color-accent)',
                  color: stepIndex >= STEPS.length - 1 ? 'var(--color-text-muted)' : '#fff',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 700,
                  cursor: stepIndex >= STEPS.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: stepIndex >= STEPS.length - 1 ? 0.5 : 1,
                  fontFamily: 'inherit',
                  borderColor: stepIndex >= STEPS.length - 1 ? 'var(--color-border)' : 'var(--color-accent)',
                  transition: 'background var(--duration-fast)',
                }}
              >
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
            <button
              type="button"
              onClick={restart}
              style={{
                padding: '4px 8px',
                border: 'none',
                background: 'transparent',
                color: 'var(--color-text-muted)',
                fontSize: 'var(--text-body-sm)',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              ↺ Watch the auto-demo
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes lldFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
