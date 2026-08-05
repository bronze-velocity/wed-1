'use client'

import Container from '@/components/layout/Container'
import useScrollReveal from '@/hooks/useScrollReveal'

export default function AppScene({ app }) {
  const ref = useScrollReveal()
  if (!app.scene) return null

  return (
    <section
      className="section-py"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-subtle)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'var(--gradient-accent)',
          opacity: 0.08,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'var(--gradient-rainbow)',
          opacity: 0.06,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <Container narrow style={{ position: 'relative', zIndex: 1 }}>
        <div ref={ref} className="reveal" style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: 'var(--text-label)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Picture this
          </p>
          <span
            aria-hidden="true"
            style={{
              display: 'block',
              fontFamily: 'var(--font-serif-accent)',
              fontSize: '5rem',
              lineHeight: 0.5,
              color: 'var(--color-accent-light)',
              marginBottom: 'var(--space-4)',
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              fontSize: 'var(--text-h3)',
              lineHeight: 1.5,
              color: 'var(--color-text-primary)',
              fontWeight: 400,
              letterSpacing: '-0.005em',
            }}
          >
            {app.scene}
          </p>
        </div>
      </Container>
    </section>
  )
}
