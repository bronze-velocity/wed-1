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
            fontSize: 'var(--text-label)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-light)',
            marginBottom: 'var(--space-4)',
          }}
        >
          Live trivia · the whole room plays at once
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
          Fifteen questions in, the whole room is shouting at the same answer — and grandma
          is beating the college roommates.
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
          One live game, hosted from the mic: the same question hits every phone at the same
          moment, a shared countdown moves the whole room together, and the leaderboard climbs
          on the big screen between rounds — how you actually met, who said &ldquo;I love
          you&rdquo; first, what she said when he proposed.
        </p>

        <Link
          href="/apps/couple-trivia"
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
          Live &ldquo;How Well Do You Know Us?&rdquo; Trivia — App #1
        </Link>
      </Container>
    </section>
  )
}
