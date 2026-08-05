'use client'

import Container from '@/components/layout/Container'
import useScrollReveal from '@/hooks/useScrollReveal'

export default function AppIsThisYou({ app }) {
  const ref = useScrollReveal()
  const bullets = app.extended?.isThisYou
  if (!bullets || bullets.length === 0) return null

  return (
    <section className="section-py" style={{ background: 'var(--color-bg-subtle)' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
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
            The fit check
          </p>
          <h2
            style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--color-text-primary)',
            }}
          >
            Is this you?
          </h2>
        </div>

        <ul
          ref={ref}
          className="reveal-stagger grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 'var(--space-5)' }}
        >
          {bullets.map((bullet, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-4)',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6) var(--space-6)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flex: '0 0 auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-accent-light)',
                  color: 'var(--color-accent)',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <p
                style={{
                  fontSize: 'var(--text-body-lg)',
                  lineHeight: 1.5,
                  color: 'var(--color-text-primary)',
                }}
              >
                {bullet}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
