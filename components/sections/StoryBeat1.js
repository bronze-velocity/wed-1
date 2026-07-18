'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'
import Container from '@/components/layout/Container'

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
          The room laughs before your uncle even looks up from his phone.
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
          He tapped out one line — a jab about your dad&rsquo;s dance moves — and it hit
          the big screen. Now he&rsquo;s watching table three read what your college roommate wrote.
        </p>

        <Link
          href="/apps/live-roast-board"
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
          Live Roast Board — App #8
        </Link>
      </Container>
    </section>
  )
}
