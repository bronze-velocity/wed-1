'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Container from '@/components/layout/Container'

const SAMPLE_CHIPS = [
  { label: 'Warm & rowdy', tone: 'accent' },
  { label: 'Late-night dancing', tone: 'accent' },
  { label: 'Family-heavy', tone: 'accent' },
  { label: 'Bring the cry', tone: 'accent' },
]

export default function MoodboardInvite() {
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="section-screen" style={{ background: 'var(--color-bg-subtle)' }}>
      <Container>
        <div
          ref={rootRef}
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-8)',
            alignItems: 'center',
          }}
        >
          {/* Copy column */}
          <div>
            <p
              style={{
                fontSize: 'var(--text-label)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-4)',
              }}
            >
              3 minutes, no email
            </p>

            <h2
              style={{
                fontSize: 'var(--text-h2-fit)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Tell us who you two actually are.
            </h2>

            <p
              style={{
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-5)',
              }}
            >
              Six prompts about your couple and your guest list. You get a shareable brief,
              which is the same document we read before we design anything. If nothing in our
              catalog fits, this is where we figure out what does.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-5)',
              }}
            >
              <Link
                href="/moodboard"
                data-moodboard-cta="home-invite-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  background: 'var(--color-text-primary)',
                  color: 'var(--color-text-inverse)',
                  padding: '14px 22px',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: 'var(--text-body)',
                  lineHeight: 1,
                  textDecoration: 'none',
                  transition: 'transform var(--duration-fast) var(--ease-out)',
                }}
              >
                <span>Start your moodboard</span>
                <span
                  style={{
                    fontSize: 'var(--text-tiny)',
                    fontWeight: 600,
                    opacity: 0.7,
                    letterSpacing: '0.04em',
                  }}
                >
                  · 3 min
                </span>
              </Link>

            </div>

            <p
              style={{
                fontSize: 'var(--text-body-sm)',
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
              }}
            >
              No account or calendar link. Nothing lands in your inbox unless you ask.
            </p>
          </div>

          {/* Brief-preview card */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              perspective: '900px',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '420px',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-md)',
                padding: 'var(--space-6)',
                transform: 'rotate(-1.5deg)',
                transition: 'transform var(--duration-base) var(--ease-out)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(-1.5deg)')}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-5)',
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--text-label)',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Moodboard
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Anna &amp; Jules
                </p>
              </div>

              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                The room, in four words:
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-2)',
                  marginBottom: 'var(--space-6)',
                }}
              >
                {SAMPLE_CHIPS.map((chip) => (
                  <span
                    key={chip.label}
                    style={{
                      background: 'var(--color-accent-light)',
                      color: 'var(--color-text-primary)',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--text-body-sm)',
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {chip.label}
                  </span>
                ))}
              </div>

              <p
                style={{
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                One moment you want people talking about at brunch:
              </p>

              <div
                style={{
                  background: 'var(--color-bg-subtle)',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)',
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-body-sm)',
                  fontStyle: 'italic',
                  marginBottom: 'var(--space-5)',
                }}
              >
                still writing…
              </div>

              <p
                style={{
                  fontSize: 'var(--text-tiny)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5,
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: 'var(--space-3)',
                }}
              >
                Sample prompt: &ldquo;What are you afraid the reception will feel like?&rdquo;
                Not &ldquo;what&rsquo;s your vision.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
