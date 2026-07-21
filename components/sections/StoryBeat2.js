'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'
import Container from '@/components/layout/Container'

export default function StoryBeat2() {
  const sceneRef = useRef(null)

  useEffect(() => {
    const el = sceneRef.current
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
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-bg-dark)' }}
    >
      <PhotoBackdrop
        src="/images/cocktail/qr-scan-1.jpg"
        alt="A guest scanning a QR code tucked into the venue during cocktail hour"
        strength="heavy"
      />

      <Container
        ref={sceneRef}
        className="reveal"
        style={{ maxWidth: '840px', textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <p
          style={{
            fontSize: 'var(--text-label)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-light)',
            marginBottom: 'var(--space-4)',
          }}
        >
          A hidden-QR hunt · roam the venue at cocktail hour
        </p>

        <p
          style={{
            fontSize: 'var(--text-h1)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            color: 'var(--color-text-inverse)',
          }}
        >
          The QR code behind the photo wall just told your cousin how you actually met.
        </p>

        <p
          style={{
            marginTop: 'var(--space-6)',
            fontSize: 'var(--text-body)',
            lineHeight: 1.6,
            color: 'var(--color-text-inverse-secondary)',
            maxWidth: '620px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Hidden codes around the venue each unlock a chapter of your love story — the first
          date, the trip where it got serious, the proposal — in your own words and photos.
          Guests roam and scan at their own pace, piecing it together in little groups, and
          the hardest-to-find last code reveals a private message from the two of you.
        </p>

        <Link
          href="/apps/venue-scavenger-hunt"
          className="link-underline"
          style={{
            display: 'inline-block',
            marginTop: 'var(--space-8)',
            fontSize: 'var(--text-label)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-inverse-secondary)',
          }}
        >
          Venue Scavenger Hunt — App #2
        </Link>
      </Container>
    </section>
  )
}
