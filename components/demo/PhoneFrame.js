'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import PhoneShell from './PhoneShell'

const MAX_CHARS = 280

const EXAMPLE_PROMPTS = [
  "The first time you brought him home, Mom texted me before you'd even left the driveway: “This one.”",
  "You always said you'd know it was right when someone remembered you hate the ends of bread. He does.",
  "I was there the night you two met at Sara's — you argued about a movie for an hour and neither of you left.",
  "You told me in college you wanted someone who'd suffer through your fantasy football trash talk. Congrats.",
]

const SAMPLE_LIBRARY = [
  { src: '/images/cocktail/reaction-1.jpg', alt: 'Guests laughing together at cocktail hour' },
  { src: '/images/cocktail/writing-1.jpg', alt: 'A hand writing a note at a cocktail table' },
  { src: '/images/post/reading-1.jpg', alt: 'A couple reading a message together' },
  { src: '/images/post/sendoff-1.jpg', alt: 'A joyful send-off moment' },
]

export default function PhoneFrame({ onSubmit }) {
  const [to, setTo] = useState('both')
  const [senderName, setSenderName] = useState('')
  const [message, setMessage] = useState('')
  const [photo, setPhoto] = useState(null)
  const [showLibrary, setShowLibrary] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const textareaRef = useRef(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex(i => (i + 1) % EXAMPLE_PROMPTS.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  function handleSubmit() {
    if (!message.trim()) return
    onSubmit({ message, senderName, to, photo })
  }

  function pickPhoto(src) {
    setPhoto(src)
    setShowLibrary(false)
  }

  const canSubmit = message.trim().length > 0
  const charCount = message.length

  return (
    <PhoneShell>
      <div style={{
        padding: '0 16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        {/* Couple photo strip */}
        <div style={{
          position: 'relative',
          height: 64,
          margin: '0 -16px',
          overflow: 'hidden',
        }}>
          <Image
            src="/images/post/legacy-1.jpg"
            alt="Wax-sealed envelopes laid out for the reception"
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
            letterSpacing: '0.01em',
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

        {/* To selector */}
        <div>
          <p style={{
            fontSize: 'var(--text-body-sm)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            margin: '0 0 7px',
          }}>
            To:
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { value: 'both', label: 'Both' },
              { value: 'her', label: 'Her' },
              { value: 'him', label: 'Him' },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTo(value)}
                style={{
                  padding: '5px 13px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid',
                  borderColor: to === value ? 'var(--color-accent)' : 'var(--color-border-strong)',
                  background: to === value ? 'var(--color-accent)' : 'transparent',
                  color: to === value ? '#fff' : 'var(--color-text-secondary)',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                  fontFamily: 'inherit',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Name input */}
        <input
          type="text"
          value={senderName}
          onChange={e => setSenderName(e.target.value)}
          placeholder="Your name — or leave it anonymous"
          style={{
            width: '100%',
            padding: '9px 11px',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-primary)',
            background: 'var(--color-bg-subtle)',
            outline: 'none',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
        />

        {/* Textarea + char count */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value.slice(0, MAX_CHARS))}
            placeholder={EXAMPLE_PROMPTS[placeholderIndex]}
            rows={5}
            style={{
              width: '100%',
              padding: '10px 11px',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-primary)',
              background: 'var(--color-bg-subtle)',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              lineHeight: 1.55,
              boxSizing: 'border-box',
            }}
          />
          <div style={{
            textAlign: 'right',
            fontSize: 'var(--text-tiny)',
            color: charCount > 250 ? 'var(--color-coral)' : 'var(--color-text-muted)',
          }}>
            {charCount}/{MAX_CHARS}
          </div>
        </div>

        {/* Photo attach */}
        <div>
          {photo ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ position: 'relative', width: 40, height: 40, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                <Image src={photo} alt="Attached photo" fill sizes="40px" style={{ objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: 'var(--text-body-sm)', color: 'var(--color-text-secondary)', flex: 1 }}>
                Photo attached
              </span>
              <button
                type="button"
                onClick={() => setPhoto(null)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-body-sm)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  padding: 4,
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowLibrary(v => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                border: '1.5px dashed var(--color-border-strong)',
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 11px',
                fontSize: 'var(--text-body-sm)',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                width: '100%',
              }}
            >
              📷 Add a photo
            </button>
          )}

          {showLibrary && !photo && (
            <div style={{
              marginTop: 8,
              padding: 10,
              background: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
            }}>
              <p style={{
                margin: '0 0 8px',
                fontSize: 'var(--text-tiny)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}>
                Choose a photo
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {SAMPLE_LIBRARY.map(({ src, alt }) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => pickPhoto(src)}
                    style={{
                      position: 'relative',
                      height: 48,
                      padding: 0,
                      border: '1.5px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: 'none',
                    }}
                  >
                    <Image src={src} alt={alt} fill sizes="48px" style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: canSubmit ? 'var(--color-accent)' : 'var(--color-border)',
            color: canSubmit ? '#fff' : 'var(--color-text-muted)',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 700,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            transition: 'background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)',
            fontFamily: 'inherit',
          }}
        >
          Send it →
        </button>
      </div>
    </PhoneShell>
  )
}
