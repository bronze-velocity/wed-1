'use client'

import useScrollReveal from '../../hooks/useScrollReveal'
import WhoSaidItDemo from '../demo/WhoSaidItDemo'
import Container from '@/components/layout/Container'

export default function DemoSectionTwo() {
  const headingRef = useScrollReveal()

  return (
    <section
      style={{
        background: 'var(--color-bg)',
        padding: 'var(--space-24) 0',
      }}
    >
      <Container>
        <div
          ref={headingRef}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
        >
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
            Second demo · Make them laugh
          </p>
          <h2
            style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-5)',
            }}
          >
            Guess the sender. Loser buys the next round.
          </h2>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            A real text from a real relationship. Blurred sender. You&rsquo;ve got two guesses.
            This is one of the moments your wedding could actually be built around — the whole
            room voting at the same time, laughing at the same wrong answers.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
              justifyContent: 'center',
              marginTop: 'var(--space-6)',
            }}
          >
            {[
              'One tap per round',
              'Family vs. family scoring',
              'Zero typing required',
            ].map((label) => (
              <span
                key={label}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--color-border-strong)',
                  background: 'var(--color-bg-subtle)',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <WhoSaidItDemo />

        <p
          style={{
            fontSize: 'var(--text-body)',
            lineHeight: 1.6,
            color: 'var(--color-text-muted)',
            maxWidth: '640px',
            margin: 'var(--space-8) auto 0',
            textAlign: 'center',
          }}
        >
          On the night: 20 messages, chronological. Side-vs-side scoring on the big
          screen. One passkey-locked round the parents don&rsquo;t get to see.
        </p>
      </Container>
    </section>
  )
}
