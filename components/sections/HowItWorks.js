'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const steps = [
  {
    number: '01',
    heading: 'You pick your app',
    body: 'Browse 20 distinct experiences — from a trivia game where every question is about how you actually met, to a time capsule your grandmother records for your 10th anniversary. Filter by vibe or wedding moment. One will feel exactly right.',
    image: {
      src: '/images/pre/planning-1.jpg',
      alt: 'A couple browsing on a phone together at home, planning',
    },
  },
  {
    number: '02',
    heading: 'You fill in the form (~30 min)',
    body: "You write the trivia questions, share the real stories, upload the photos. Every detail comes from you — your inside jokes, your actual timeline, the moment you knew. The form isn't the homework before the fun. The form is the fun.",
    image: {
      src: '/images/pre/form-1.jpg',
      alt: 'Close detail of hands writing, photos spread on a table nearby',
    },
  },
  {
    number: '03',
    heading: 'Guests scan the QR on the night',
    body: 'A QR code on every table opens directly in their browser. No download, no login, no app store. Your grandmother can do it. Your most technophobic uncle can do it. Everyone is in from the first scan.',
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
      className="py-16 md:py-20 lg:py-32"
      style={{ background: 'var(--color-bg-subtle)' }}
    >
      <div
        className="w-full mx-auto px-6 md:px-10"
        style={{ maxWidth: 'var(--container-max)' }}
      >
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
            Three steps. One extraordinary night.
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
      </div>
    </section>
  )
}
