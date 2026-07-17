'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'

export default function StoryBeat1() {
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
      className="px-6 md:px-10"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PhotoBackdrop
        src="/images/cocktail/reaction-1.jpg"
        alt="Guests reacting mid-laugh, lit by the display wall during cocktail hour"
        strength="medium"
      />

      <div
        ref={sceneRef}
        className="reveal w-full mx-auto"
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
          The room laughs before you even see what they wrote.
        </p>

        <Link
          href="/apps/live-roast-board"
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
          Live Roast Board — App #8
        </Link>
      </div>
    </section>
  )
}
