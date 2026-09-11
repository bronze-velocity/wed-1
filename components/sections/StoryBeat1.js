'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'
import Container from '@/components/layout/Container'

export default function StoryBeat1() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
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
      ref={sectionRef}
      className="section-screen"
      style={{
        position: 'relative',
        overflow: 'hidden',
        alignItems: 'center',
      }}
    >
      <PhotoBackdrop
        src="/images/cocktail/reaction-1.jpg"
        alt="Guests reacting mid-laugh, lit by the display wall during cocktail hour"
        strength="medium"
        parallax
        className="reveal-scale-photo"
      />

      <Container
        className="reveal"
        style={{ maxWidth: '840px', textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <p
          className="eyebrow"
          style={{ color: 'rgba(251,247,239,0.75)', marginBottom: 'var(--space-4)' }}
        >
          Live trivia · the whole room plays at once
        </p>

        <h2
          className="display-serif"
          style={{
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            fontSize: 'var(--text-display-fit)',
            color: 'rgba(251,247,239,0.98)',
            margin: 0,
            textShadow: '0 1px 24px rgba(31,29,27,0.35)',
          }}
        >
          How well do your guests{' '}
          <span className="display-italic" style={{ fontWeight: 400 }}>
            actually
          </span>{' '}
          know you?
        </h2>

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
A live trivia game everyone plays from their phone. Same question, same countdown,
          leaderboard on the big screen — every question written about the two of you.
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
