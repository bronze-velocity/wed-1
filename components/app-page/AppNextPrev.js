import Link from 'next/link'
import Container from '@/components/layout/Container'
import { getAdjacentApps } from '@/lib/getApps'

const vibeDot = {
  'Make them laugh':   'var(--color-amber)',
  'Make them cry':     'var(--color-rose)',
  'Get them talking':  'var(--color-teal)',
  'Create a keepsake': 'var(--color-green)',
  'Stop the room':     'var(--color-accent)',
}

function AppLinkCard({ app, direction }) {
  const isPrev = direction === 'prev'
  const eyebrow = isPrev ? '← Previous app' : 'Next app →'
  const vibe = app.alt1_vibe?.[0]
  const dotColor = vibeDot[vibe] || 'var(--color-accent)'

  return (
    <Link
      href={`/apps/${app.slug}`}
      className="hover-lift group"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        padding: 'var(--space-8)',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        textDecoration: 'none',
        textAlign: isPrev ? 'left' : 'right',
        alignItems: isPrev ? 'flex-start' : 'flex-end',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontSize: 'var(--text-label)',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
        }}
      >
        {isPrev && (
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: 'var(--radius-full)',
              background: dotColor,
              display: 'inline-block',
            }}
          />
        )}
        {eyebrow}
        {!isPrev && (
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: 'var(--radius-full)',
              background: dotColor,
              display: 'inline-block',
            }}
          />
        )}
      </span>

      <p
        style={{
          fontSize: 'var(--text-h4)',
          fontWeight: 600,
          letterSpacing: '-0.015em',
          lineHeight: 1.25,
          color: 'var(--color-text-primary)',
        }}
      >
        {app.title}
      </p>

      {vibe && (
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {vibe}
        </p>
      )}
    </Link>
  )
}

export default function AppNextPrev({ app }) {
  const { prev, next } = getAdjacentApps(app.slug)
  if (!prev && !next) return null

  return (
    <section
      className="section-py"
      style={{ background: 'var(--color-bg-subtle)' }}
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
              marginBottom: 'var(--space-3)',
            }}
          >
            Keep browsing
          </p>
          <h2
            style={{
              fontSize: 'var(--text-h3)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: 'var(--color-text-primary)',
            }}
          >
            Not quite the one? Try a neighbor.
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: 'var(--space-5)' }}
        >
          {prev && <AppLinkCard app={prev} direction="prev" />}
          {next && <AppLinkCard app={next} direction="next" />}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
          <Link
            href="/apps"
            className="link-underline"
            style={{
              fontSize: 'var(--text-label)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
            }}
          >
            See all example apps
          </Link>
        </div>
      </Container>
    </section>
  )
}
