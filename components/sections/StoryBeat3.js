'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'
import Container from '@/components/layout/Container'

export default function StoryBeat3() {
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
        src="/images/dinner/bigscreen-1.jpg"
        alt="Guests' advice scrolling on the big screen during dinner"
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
          A live advice wall · answers scroll up in real time
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
          You post &ldquo;we can&rsquo;t agree on where to live — help,&rdquo; and a hundred
          people answer at once.
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
          Structured prompts land on guests&rsquo; phones — best advice for a long marriage, a
          mistake to avoid, something they wish they&rsquo;d known — and the answers stream onto
          the big screen in real time, some funny, some hard-won. Every one is saved into a
          &ldquo;Book of Advice&rdquo; you&rsquo;ll actually reread.
        </p>

        <Link
          href="/apps/advice-oracle"
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
          The Advice Oracle — App #12
        </Link>
      </Container>
    </section>
  )
}
