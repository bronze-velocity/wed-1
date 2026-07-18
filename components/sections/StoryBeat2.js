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
      className="py-16 md:py-24 lg:py-32"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-bg-dark)' }}
    >
      <PhotoBackdrop
        src="/images/post/legacy-1.jpg"
        alt="A grandparent-aged guest, emotional, recording a message on a phone"
        strength="heavy"
      />

      <Container
        ref={sceneRef}
        className="reveal"
        style={{ maxWidth: '840px', textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <p
          style={{
            fontSize: 'var(--text-h1)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            color: 'var(--color-text-inverse)',
          }}
        >
          Your sister records a 45-second video of your grandmother giving
          her advice. Sealed until your 10th anniversary. You&rsquo;ll open it
          together — grandma might not be there when you do.
        </p>

        <Link
          href="/apps/anniversary-time-capsule"
          className="link-underline"
          style={{
            display: 'inline-block',
            marginTop: 'var(--space-10)',
            fontSize: 'var(--text-label)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-inverse-secondary)',
          }}
        >
          Anniversary Time Capsule — App #3
        </Link>
      </Container>
    </section>
  )
}
