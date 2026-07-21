'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Container from '@/components/layout/Container'

const steps = [
  {
    number: '01',
    heading: 'Bring an idea, or pick one of ours',
    body: "Twelve apps we've built are on this site — pick one and we'll make it about you. Or bring us something no one has ever done at a wedding before. Weird, specific, tied to a private inside joke — if it fits your story, we'll build it.",
    image: {
      src: '/images/pre/planning-1.jpg',
      alt: 'A couple browsing on a phone together at home, planning',
    },
  },
  {
    number: '02',
    heading: 'We design and build it (2–4 weeks)',
    body: "You tell us the stories, share the photos, name the moments. We bring the craft — five years of wedding-app pattern-matching, live-night reliability engineering, and a designer whose only job is making sure it feels like part of your wedding, not a bolt-on tool. We push back when an idea won't land in the room. We suggest mechanics you'd never have thought of. You get the version that actually works on the night, not the version you first described.",
    image: {
      src: '/images/pre/form-1.jpg',
      alt: 'Close detail of hands writing, photos spread on a table nearby',
    },
  },
  {
    number: '03',
    heading: 'QR on every table. That’s it.',
    body: "Guests scan. No download, no login, no app store. Grandma's in within seconds — we'll test it against every generation before your wedding day. We're on call during the reception if anything wobbles.",
    image: {
      src: '/images/cocktail/qr-scan-1.jpg',
      alt: "A guest's hand scanning a QR code on a reception table card",
    },
  },
]

export default function HowItWorks() {
  const stepsRef = useRef(null)

  useEffect(() => {
    const el = stepsRef.current
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
      style={{ background: 'var(--color-bg-subtle)' }}
    >
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
            Three steps. Zero templates.
          </h2>
        </div>

        <div
          ref={stepsRef}
          className="reveal-stagger grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 'var(--space-6)' }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
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
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'var(--gradient-accent)',
                  zIndex: 1,
                }}
              />
              <div style={{ position: 'relative', height: 160 }}>
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
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
                    width: 40,
                    height: 40,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-bg)',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 800,
                    color: 'var(--color-accent)',
                  }}
                >
                  {step.number}
                </span>
              </div>
              <div style={{ padding: 'var(--space-8)' }}>
                <h3
                  style={{
                    fontSize: 'var(--text-h3)',
                    fontWeight: 600,
                    letterSpacing: '-0.015em',
                    lineHeight: 1.2,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  {step.heading}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-body)',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
