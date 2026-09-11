'use client'

import { useState } from 'react'
import PhoneFrame from './PhoneFrame'
import AdminFrame from './AdminFrame'
import BigScreenFrame from './BigScreenFrame'

const SEED_MESSAGES = [
  { message: "I knew from the first dinner you brought him to that this was it.", senderName: 'Mom', to: 'both', approved: true, photo: null },
  { message: "Remember the parking lot in 2019? Look how far you've come.", senderName: 'Dani', to: 'her', approved: true, photo: '/images/post/reading-1.jpg' },
  { message: 'Take care of her the way you promised me at Christmas.', senderName: 'Uncle Pete', to: 'him', approved: false, photo: null },
]

const SEED_APPROVED = SEED_MESSAGES.filter((m) => m.approved)
const SEED_PENDING = SEED_MESSAGES.find((m) => !m.approved)

export default function LoveLetterDemo() {
  const [pending, setPending] = useState(SEED_PENDING)
  const [approved, setApproved] = useState(null)
  const [phoneKey, setPhoneKey] = useState(0)
  const [adminKey, setAdminKey] = useState(0)
  const [screenKey, setScreenKey] = useState(0)

  function handleSubmit({ message, senderName, to, photo }) {
    setPending({ message, senderName, to, photo, approved: false })
    setAdminKey((k) => k + 1)
  }

  function handleApprove() {
    setApproved(pending)
    setScreenKey((k) => k + 1)
  }

  function handleSkip() {
    setPending(SEED_PENDING)
    setAdminKey((k) => k + 1)
  }

  function handleReset() {
    setPending(SEED_PENDING)
    setApproved(null)
    setPhoneKey((k) => k + 1)
    setAdminKey((k) => k + 1)
    setScreenKey((k) => k + 1)
  }

  const revealMessage = approved || { message: '', senderName: '', to: 'both', photo: null }

  const phone = <PhoneFrame key={phoneKey} onSubmit={handleSubmit} />

  const host = (
    <AdminFrame
      queue={SEED_APPROVED}
      pending={pending}
      onApprove={handleApprove}
      onSkip={handleSkip}
      active={true}
      resetKey={adminKey}
    />
  )

  const bigScreen = (
    <BigScreenFrame
      key={screenKey}
      message={revealMessage.message}
      senderName={revealMessage.senderName}
      to={revealMessage.to}
      photo={revealMessage.photo}
      onReset={handleReset}
      active={true}
    />
  )

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflowX: 'auto',
          padding: '4px 0',
        }}
      >
        <Panel label="A guest's phone" width={260}>{phone}</Panel>
        <Panel label="The host's phone" width={260}>{host}</Panel>
        <Panel label="The reception screen" width={420}>{bigScreen}</Panel>
      </div>
    </div>
  )
}

function Panel({ label, width, children }) {
  return (
    <div
      style={{
        flexShrink: 1,
        flexGrow: 0,
        flexBasis: width ?? 'auto',
        maxWidth: width ?? undefined,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          fontSize: 'var(--text-tiny)',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          textAlign: 'center',
          margin: '0 0 var(--space-3)',
        }}
      >
        {label}
      </p>
      {children}
    </div>
  )
}
