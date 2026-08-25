'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import PhoneShell from './PhoneShell'

const TO_LABELS = { both: 'Both', her: 'Her', him: 'Him' }

export default function AutoPlayPhone({ message, senderName, to = 'both', typeMs = 3800, active = true }) {
  const [typed, setTyped] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!active) {
      setTyped('')
      setSent(false)
      return
    }
    setTyped('')
    setSent(false)
    const perChar = Math.max(20, Math.round(typeMs / Math.max(message.length, 1)))
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTyped(message.slice(0, i))
      if (i >= message.length) {
        clearInterval(id)
        setTimeout(() => setSent(true), 500)
      }
    }, perChar)
    return () => clearInterval(id)
  }, [active, message, typeMs])

  return (
    <PhoneShell>
      <div style={{ padding: '0 16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ position: 'relative', height: 64, margin: '0 -16px', overflow: 'hidden' }}>
          <Image
            src="/images/post/legacy-1.jpg"
            alt=""
            fill
            sizes="280px"
            style={{ objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(17,17,17,0.05) 0%, rgba(17,17,17,0.55) 100%)',
          }} />
          <p style={{
            position: 'absolute',
            left: 12,
            bottom: 7,
            margin: 0,
            fontFamily: 'var(--font-serif-accent)',
            fontStyle: 'italic',
            fontSize: 15,
            color: '#fff',
          }}>
            Sam &amp; Jordan &middot; Oct 4
          </p>
        </div>

        <h3 style={{
          fontSize: 'var(--text-h4)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.2,
          margin: 0,
        }}>
          Leave them a message
        </h3>

        <div>
          <p style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--color-text-secondary)', margin: '0 0 7px' }}>To:</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {['both', 'her', 'him'].map((value) => {
              const isActive = to === value
              return (
                <span
                  key={value}
                  style={{
                    padding: '5px 13px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid',
                    borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border-strong)',
                    background: isActive ? 'var(--color-accent)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--color-text-secondary)',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 600,
                  }}
                >
                  {TO_LABELS[value]}
                </span>
              )
            })}
          </div>
        </div>

        <div style={{
          padding: '9px 11px',
          border: '1.5px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--text-body-sm)',
          color: senderName ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          background: 'var(--color-bg-subtle)',
          minHeight: 20,
        }}>
          {senderName || 'Your name — or leave it anonymous'}
        </div>

        <div style={{
          padding: '10px 11px',
          border: '1.5px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-primary)',
          background: 'var(--color-bg-subtle)',
          minHeight: 108,
          lineHeight: 1.55,
          whiteSpace: 'pre-wrap',
        }}>
          {typed}
          {!sent && (
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: 2,
                height: '1em',
                background: 'var(--color-accent)',
                marginLeft: 1,
                verticalAlign: 'text-bottom',
                animation: 'blink 1s steps(2, start) infinite',
              }}
            />
          )}
        </div>

        <div
          style={{
            padding: '11px',
            borderRadius: 'var(--radius-md)',
            background: sent ? 'var(--color-green)' : 'var(--color-accent)',
            color: '#fff',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 700,
            textAlign: 'center',
            transition: 'background 300ms var(--ease-out), transform 300ms var(--ease-out)',
            transform: sent ? 'scale(0.98)' : 'scale(1)',
          }}
        >
          {sent ? '✓ Sent to the moderator' : 'Send it →'}
        </div>
      </div>
      <style jsx>{`
        @keyframes blink { 50% { opacity: 0 } }
      `}</style>
    </PhoneShell>
  )
}
