'use client'

import { useRef, useEffect } from 'react'
import Container from '@/components/layout/Container'

const RULES = [
  {
    n: '01',
    heading: 'Guests are back in the room in under a minute.',
    body: 'No feed. No scroll hole. Tap, submit, look up.',
  },
  {
    n: '02',
    heading: 'The magic happens in the room, not on the screen.',
    body: 'Every app triggers something real — a toast, a hug, a burst of laughter from table three.',
  },
  {
    n: '03',
    heading: 'You curate everything.',
    body: 'Nothing hits the big screen without your (or a trusted friend’s) approval. No awkward surprises.',
  },
  {
    n: '04',
    heading: 'Built for one couple. Yours.',
    body: 'Nothing off the shelf. Bring us an idea — however weird, however private, however specific — and if it fits your story, we build it.',
  },
  {
    n: '05',
    heading: 'You bring the idea. We build it beautifully.',
    body: 'You don’t touch code, wireframes, or config. We ship it with wedding-native design and rock-solid live-night reliability.',
  },
  {
    n: '06',
    heading: 'If paper does it as well, we tell you.',
    body: 'We only build apps that do something a decorated jar, the host with the microphone, or a stack of prompt cards structurally can’t. If your idea is already a wedding tradition that works, we’ll tell you to save the $2,000 and buy nicer flowers.',
  },
]

export default function SixRules() {
  const gridRef = useRef(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="section-py"
      style={{ background: 'var(--color-bg)' }}
    >
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <p
            style={{
              fontSize: 'var(--text-label)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Six rules
          </p>
          <h2
            style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--color-text-primary)',
              maxWidth: '760px',
              margin: '0 auto',
            }}
          >
            What every Wepho app respects
          </h2>
        </div>

        <div
          ref={gridRef}
          className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 'var(--space-5)' }}
        >
          {RULES.map((rule) => (
            <div
              key={rule.n}
              style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-label)',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: 'var(--color-accent)',
                }}
              >
                {rule.n}
              </span>
              <h3
                style={{
                  fontSize: 'var(--text-h4)',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.25,
                  color: 'var(--color-text-primary)',
                }}
              >
                {rule.heading}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-body)',
                  lineHeight: 1.6,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {rule.body}
              </p>
            </div>
          ))}
        </div>

      </Container>
    </section>
  )
}
