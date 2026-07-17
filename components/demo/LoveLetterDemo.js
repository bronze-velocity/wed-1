'use client'

import { useState } from 'react'
import PhoneFrame from './PhoneFrame'
import AdminFrame from './AdminFrame'
import BigScreenFrame from './BigScreenFrame'

const STEPS = ['phone', 'admin', 'screen']

const TABS = [
  { id: 'phone', label: '1. Write' },
  { id: 'admin', label: '2. Approve' },
  { id: 'screen', label: '3. Reveal' },
]

// Seeded so step 2/3 look like a real reception in progress, even if a
// visitor never types anything in step 1.
const SEED_MESSAGES = [
  { message: "I knew from the first dinner you brought him to that this was it.", senderName: 'Mom', to: 'both', approved: true, photo: null },
  { message: "Remember the parking lot in 2019? Look how far you've come.", senderName: 'Dani', to: 'her', approved: true, photo: '/images/post/reading-1.jpg' },
  { message: 'Take care of her the way you promised me at Christmas.', senderName: 'Uncle Pete', to: 'him', approved: false, photo: null },
]

const SEED_APPROVED = SEED_MESSAGES.filter(m => m.approved)
const SEED_PENDING = SEED_MESSAGES.find(m => !m.approved)
const DEFAULT_REVEAL = SEED_APPROVED[SEED_APPROVED.length - 1]

export default function LoveLetterDemo() {
  const [activeTab, setActiveTab] = useState('phone')
  const [data, setData] = useState(null)
  const [approvedMessage, setApprovedMessage] = useState(null)
  const [resetCount, setResetCount] = useState(0)

  const currentStepIndex = STEPS.indexOf(activeTab)
  const pendingMessage = data || SEED_PENDING
  const revealMessage = approvedMessage || DEFAULT_REVEAL

  function handleSubmit({ message, senderName, to, photo }) {
    setData({ message, senderName, to, photo })
    setTimeout(() => {
      setActiveTab('admin')
    }, 600)
  }

  // AdminFrame already adds a 400ms animation delay before calling this
  function handleApprove() {
    setApprovedMessage(pendingMessage)
    setActiveTab('screen')
  }

  function reset() {
    setData(null)
    setApprovedMessage(null)
    setActiveTab('phone')
    setResetCount(c => c + 1)
  }

  function desktopFrameStyle(frameStep) {
    const isActive = activeTab === frameStep
    return {
      opacity: isActive ? 1 : 0.35,
      transform: isActive ? 'scale(1)' : 'scale(0.88)',
      filter: isActive ? 'none' : 'saturate(0.4)',
      transition: 'opacity 350ms ease-out, transform 350ms ease-out, filter 350ms ease-out',
      transformOrigin: 'top center',
      pointerEvents: isActive ? 'auto' : 'none',
    }
  }

  return (
    <div style={{ width: '100%' }}>

      {/* ── Mobile pill switcher — only on screens < 1024px ── */}
      <div
        className="lg:hidden"
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          marginBottom: 20,
          flexWrap: 'wrap',
        }}
      >
        {TABS.map(({ id, label }, i) => {
          const isActive = activeTab === id
          const isCompleted = i < currentStepIndex
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
                background: isActive ? 'var(--color-accent)' : 'transparent',
                color: isActive ? '#fff' : 'var(--color-text-secondary)',
                fontSize: 'var(--text-body-sm)',
                fontWeight: isActive ? 700 : 600,
                cursor: 'pointer',
                transition: 'all var(--duration-fast) var(--ease-out)',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              {isCompleted && (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {label}
            </button>
          )
        })}
      </div>

      {/* ── Mobile: one frame at a time ── */}
      <div
        className="lg:hidden"
        style={{ display: 'flex', justifyContent: 'center', padding: '0 16px' }}
      >
        <div style={{ width: '100%', maxWidth: activeTab === 'phone' ? 300 : 540 }}>
          {activeTab === 'phone' && (
            <PhoneFrame key={resetCount} onSubmit={handleSubmit} />
          )}
          {activeTab === 'admin' && (
            <AdminFrame
              queue={SEED_APPROVED}
              pending={pendingMessage}
              onApprove={handleApprove}
              onSkip={reset}
              active={activeTab === 'admin'}
              resetKey={resetCount}
            />
          )}
          {activeTab === 'screen' && (
            <BigScreenFrame
              key={resetCount}
              message={revealMessage.message}
              senderName={revealMessage.senderName}
              to={revealMessage.to}
              photo={revealMessage.photo}
              onReset={reset}
              active={activeTab === 'screen'}
            />
          )}
        </div>
      </div>

      {/* ── Desktop: all 3 frames side by side (≥ 1024px) ── */}
      <div
        className="hidden lg:flex"
        style={{
          gap: 20,
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflowX: 'auto',
          padding: '8px 0 4px',
        }}
      >
        {/* Phone */}
        <div style={{ flexShrink: 0, ...desktopFrameStyle('phone') }}>
          <PhoneFrame key={resetCount} onSubmit={handleSubmit} />
        </div>

        {/* Admin */}
        <div style={{ flexShrink: 0, width: 400, ...desktopFrameStyle('admin') }}>
          <AdminFrame
            queue={SEED_APPROVED}
            pending={pendingMessage}
            onApprove={handleApprove}
            onSkip={reset}
            active={activeTab === 'admin'}
            resetKey={resetCount}
          />
        </div>

        {/* Big screen */}
        <div style={{ flexShrink: 0, width: 500, ...desktopFrameStyle('screen') }}>
          <BigScreenFrame
            key={resetCount}
            message={revealMessage.message}
            senderName={revealMessage.senderName}
            to={revealMessage.to}
            photo={revealMessage.photo}
            onReset={reset}
            active={activeTab === 'screen'}
          />
        </div>
      </div>

    </div>
  )
}
