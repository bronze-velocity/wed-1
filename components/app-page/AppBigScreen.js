'use client'

import Image from 'next/image'
import Container from '@/components/layout/Container'
import useScrollReveal from '@/hooks/useScrollReveal'

export default function AppBigScreen({ app }) {
  const ref = useScrollReveal()
  const description = app.extended?.bigScreen
  if (!description) return null

  const primaryVibe = app.alt1_vibe?.[0]

  return (
    <section
      className="section-py"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-dark)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60%',
          background: 'var(--gradient-accent)',
          opacity: 0.14,
          filter: 'blur(140px)',
          pointerEvents: 'none',
        }}
      />

      <Container narrow style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <p
            style={{
              fontSize: 'var(--text-label)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-light)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Live on the night
          </p>
          <h2
            style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--color-text-inverse)',
              marginBottom: 'var(--space-5)',
            }}
          >
            What the room sees
          </h2>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              color: 'var(--color-text-inverse-secondary)',
              maxWidth: '38rem',
              margin: '0 auto',
            }}
          >
            {description}
          </p>
        </div>

        <div
          ref={ref}
          className="reveal"
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-2xl)',
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          <Image
            src="/images/dinner/bigscreen-1.jpg"
            alt="A wedding reception big screen glowing above a full dance floor"
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-heavy)' }} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-4)',
              padding: 'var(--space-8)',
              textAlign: 'center',
            }}
          >
            {primaryVibe && (
              <p
                style={{
                  fontSize: 'var(--text-label)',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-light)',
                }}
              >
                {primaryVibe}
              </p>
            )}
            <p
              style={{
                fontSize: 'var(--text-h2)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: 'var(--color-text-inverse)',
                textShadow: '0 2px 20px rgba(0,0,0,0.4)',
              }}
            >
              {app.title}
            </p>
          </div>
          <span
            style={{
              position: 'absolute',
              bottom: 'var(--space-4)',
              right: 'var(--space-5)',
              fontSize: 'var(--text-tiny)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            Wepho
          </span>
        </div>
      </Container>
    </section>
  )
}
