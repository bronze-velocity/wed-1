'use client'

import Link from 'next/link'
import Image from 'next/image'
import useScrollReveal from '../../hooks/useScrollReveal'
import LoveLetterDemo from '../demo/LoveLetterDemo'
import Container from '@/components/layout/Container'

const STRIP_PHOTOS = [
  {
    src: '/images/cocktail/writing-1.jpg',
    alt: 'A guest typing a secret message on their phone at a cocktail table',
    caption: 'Cocktail hour',
  },
  {
    src: '/images/dinner/bigscreen-1.jpg',
    alt: 'The display wall lit up in a dim reception room as a message appears',
    caption: 'Dinner',
  },
  {
    src: '/images/post/reading-1.jpg',
    alt: 'The couple reading a message together, heads close, visibly moved',
    caption: 'After',
  },
]

export default function DemoSection() {
  const headingRef = useScrollReveal()

  return (
    <section
      style={{
        background: 'var(--gradient-hero)',
        padding: 'var(--space-24) 0',
      }}
    >
      <Container>
        <div
          ref={headingRef}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: 'var(--space-14)' }}
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
            Live demo
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
            Read it together. For the first time. In front of everyone.
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
            During cocktail hour, your guests write you a secret message — a memory, a wish,
            something they&apos;ve never said out loud. Your MOH (that&rsquo;s your maid of
            honor, and yes she&rsquo;ll have a tablet) approves each one before it hits the
            big screen. At dinner, you read them together for the first time, live, one by
            one. Try it below. You&rsquo;re both the guest and the couple — write, approve,
            reveal.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
              justifyContent: 'center',
              marginTop: 'var(--space-8)',
            }}
          >
            {[
              'Tap, submit, back to your drink',
              'You approve every message',
              'Yours to keep forever',
            ].map((label) => (
              <span
                key={label}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--color-border-strong)',
                  background: 'var(--color-bg)',
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

        <LoveLetterDemo />

        <div
          style={{
            marginTop: 'var(--space-20)',
            paddingTop: 'var(--space-14)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p
            style={{
              textAlign: 'center',
              fontSize: 'var(--text-label)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-6)',
            }}
          >
            What this looks like at a real wedding
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: 'var(--space-4)' }}
          >
            {STRIP_PHOTOS.map((photo) => (
              <div key={photo.src}>
                <div
                  style={{
                    position: 'relative',
                    height: 240,
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    marginTop: 'var(--space-3)',
                  }}
                >
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <p
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-4)',
              maxWidth: '580px',
              margin: '0 auto var(--space-4)',
            }}
          >
            This is one of 20 apps we&rsquo;ve built. Or bring us an idea we haven&rsquo;t.
          </p>
          <Link
            href="/apps"
            style={{
              fontSize: 'var(--text-body)',
              fontWeight: 600,
              color: 'var(--color-accent)',
              textDecoration: 'none',
            }}
          >
            This is App #16 — The Unprompted Love Letter Machine → See all 20 apps
          </Link>
        </div>
      </Container>
    </section>
  )
}
