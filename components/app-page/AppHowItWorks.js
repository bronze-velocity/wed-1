'use client'

import Image from 'next/image'
import Container from '@/components/layout/Container'
import useScrollReveal from '@/hooks/useScrollReveal'

const stepImages = [
  { src: '/images/pre/form-1.jpg',       alt: 'Notes and photos spread across a table during planning' },
  { src: '/images/cocktail/qr-scan-1.jpg', alt: 'A guest scanning a QR code at a reception table' },
  { src: '/images/post/legacy-1.jpg',    alt: 'A quiet keepsake artifact after the wedding' },
]

export default function AppHowItWorks({ app }) {
  const ref = useScrollReveal()
  const hiw = app.extended?.howItWorks
  if (!hiw || (!hiw.setup?.detail && !hiw.guests?.detail && !hiw.keepsake?.detail)) return null

  const columns = [
    { number: '01', heading: 'You set it up',   meta: hiw.setup?.time,       detail: hiw.setup?.detail,    image: stepImages[0] },
    { number: '02', heading: 'Guests use it',   meta: null,                  detail: hiw.guests?.detail,   image: stepImages[1] },
    { number: '03', heading: 'You keep it',     meta: hiw.keepsake?.artifact, detail: hiw.keepsake?.detail, image: stepImages[2] },
  ]

  return (
    <section className="section-py" style={{ background: 'var(--color-bg)' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
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
            How it works
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
            Three moments. One extraordinary night.
          </h2>
        </div>

        <div
          ref={ref}
          className="reveal-stagger grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 'var(--space-6)' }}
        >
          {columns.map((col) => (
            <div
              key={col.number}
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '3px',
                  background: 'var(--gradient-accent)',
                  zIndex: 2,
                }}
              />
              <div style={{ position: 'relative', height: 180 }}>
                <Image
                  src={col.image.src}
                  alt={col.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 'var(--space-3)',
                    left: 'var(--space-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-bg)',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 800,
                    color: 'var(--color-accent)',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  {col.number}
                </span>
              </div>

              <div style={{ padding: 'var(--space-8)' }}>
                <h3
                  style={{
                    fontSize: 'var(--text-h4)',
                    fontWeight: 600,
                    letterSpacing: '-0.015em',
                    lineHeight: 1.2,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {col.heading}
                </h3>
                {col.meta && (
                  <p
                    style={{
                      fontSize: 'var(--text-body-sm)',
                      fontWeight: 600,
                      color: 'var(--color-accent)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {col.meta}
                  </p>
                )}
                {col.detail && (
                  <p
                    style={{
                      fontSize: 'var(--text-body)',
                      lineHeight: 1.6,
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {col.detail}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
