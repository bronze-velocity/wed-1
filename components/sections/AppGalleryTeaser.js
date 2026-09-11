'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Container from '@/components/layout/Container'
import ContactLink from '@/components/ui/ContactLink'
import TiltCard from '@/components/ui/TiltCard'
import HScrollControls from '@/components/ui/HScrollControls'

const VIBES = [
  {
    label: 'Make them laugh',
    tagline: 'Games, chaos, everyone in on the joke',
    color: 'var(--color-amber)',
    colorLight: 'var(--color-amber-light)',
    appIds: [1, 8, 9, 11, 19, 20, 21, 22, 23],
    image: { src: '/images/apps/vibe-laugh.jpg', alt: 'Guests mid-laugh in a candid group shot' },
  },
  {
    label: 'Make them cry',
    tagline: 'The moment nobody saw coming',
    color: 'var(--color-rose)',
    colorLight: 'var(--color-rose-light)',
    appIds: [3, 7, 12, 13, 16, 17, 24],
    image: { src: '/images/apps/vibe-cry.jpg', alt: 'A quiet, emotional moment between two guests' },
  },
  {
    label: 'Get them talking',
    tagline: 'Strangers leave as friends',
    color: 'var(--color-teal)',
    colorLight: 'var(--color-teal-light)',
    appIds: [2, 4, 5, 14, 18, 23],
    image: { src: '/images/apps/vibe-talk.jpg', alt: 'A cluster of guests deep in conversation at cocktail hour' },
  },
  {
    label: 'Create a keepsake',
    tagline: 'Something you still open in twenty years',
    color: 'var(--color-green)',
    colorLight: 'var(--color-green-light)',
    appIds: [3, 4, 6, 7, 12, 14, 15, 17, 22, 24],
    image: { src: '/images/apps/vibe-keepsake.jpg', alt: 'A still-life of a keepsake object, softly lit' },
  },
  {
    label: 'Stop the room',
    tagline: 'Every head turns. Nobody checks their phone.',
    color: 'var(--color-accent)',
    colorLight: 'var(--color-accent-light)',
    appIds: [1, 8, 10, 15, 21, 23],
    image: { src: '/images/apps/vibe-stop-room.jpg', alt: 'A wide shot of the room turned toward the display wall' },
  },
]

export default function AppGalleryTeaser({ apps }) {
  const [activeVibe, setActiveVibe] = useState(VIBES[0])
  const [animKey, setAnimKey] = useState(0)
  const scrollRef = useRef(null)

  function selectVibe(vibe) {
    if (vibe.label === activeVibe.label) return
    setActiveVibe(vibe)
    setAnimKey((k) => k + 1)
    scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
  }

  const visibleApps = apps
    .filter((app) => activeVibe.appIds.includes(app.id))
    .slice(0, 8)

  return (
    <section className="section-screen" style={{ background: 'var(--color-bg-subtle)' }}>
      <Container>

        <h2
          style={{
            fontSize: 'var(--text-h2-fit)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 'var(--space-2)',
            color: 'var(--color-text-primary)',
          }}
        >
          What kind of wedding do you want?
        </h2>

        <p
          style={{
            textAlign: 'center',
            fontSize: 'var(--text-body)',
            lineHeight: 1.5,
            color: 'var(--color-text-secondary)',
            maxWidth: '620px',
            margin: '0 auto var(--space-5)',
          }}
        >
          Five vibes, {apps.length} {' '}apps we&rsquo;ve built, and not one of them off the shelf.
        </p>

        {/* Vibe pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            justifyContent: 'center',
            marginBottom: 'var(--space-3)',
          }}
        >
          {VIBES.map((vibe) => {
            const isActive = vibe.label === activeVibe.label
            return (
              <button
                key={vibe.label}
                onClick={() => selectVibe(vibe)}
                style={{
                  background: isActive ? vibe.colorLight : 'transparent',
                  color: 'var(--color-text-primary)',
                  border: '1px solid',
                  borderColor: isActive ? vibe.color : 'var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 18px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 'var(--text-body-sm)',
                  lineHeight: 1,
                  boxShadow: isActive ? `inset 0 0 0 1px ${vibe.color}` : 'none',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                }}
              >
                {vibe.label}
              </button>
            )
          })}
        </div>

        <p
          key={`tagline-${activeVibe.label}`}
          className="card-enter"
          style={{
            '--stagger-i': 0,
            textAlign: 'center',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-5)',
          }}
        >
          {activeVibe.tagline}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-3)' }}>
          <HScrollControls targetRef={scrollRef} ariaLabel="Scroll app cards" />
        </div>

        {/* App cards — horizontal scroll strip so the section stays inside one viewport */}
        <div
          ref={scrollRef}
          className="hscroll"
          style={{
            marginBottom: 'var(--space-5)',
          }}
        >
          {visibleApps.map((app, i) => (
            <TiltCard
              key={`${animKey}-${app.id}`}
              className="card-deal hscroll-item"
              style={{
                '--stagger-i': i,
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                width: 'clamp(240px, 24vw, 300px)',
              }}
            >
            <Link
              href={`/apps/${app.slug}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                height: '100%',
              }}
            >
              <div style={{ position: 'relative', height: 'clamp(96px, 14vh, 140px)' }}>
                <Image
                  src={activeVibe.image.src}
                  alt={activeVibe.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 260px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1, padding: 'var(--space-6)' }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 'var(--text-h4)',
                    lineHeight: 1.3,
                    marginBottom: 'var(--space-2)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {app.title}
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: 'var(--space-4)',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {app.description}
                </p>
              </div>
              <span
                style={{
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  padding: '0 var(--space-6) var(--space-6)',
                }}
              >
                See how it works →
              </span>
            </Link>
            </TiltCard>
          ))}
        </div>

        {/* Tail — compact single row combining moodboard + see-all + own-idea */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <Link
            href="/moodboard"
            className="link-underline"
            style={{ color: 'var(--color-accent)', fontWeight: 600 }}
            data-moodboard-cta="gallery-teaser"
          >
            Build your moodboard →
          </Link>
          <span aria-hidden="true" style={{ color: 'var(--color-border-strong)' }}>·</span>
          <Link
            href="/apps"
            style={{ color: 'var(--color-text-primary)', fontWeight: 600, textDecoration: 'none', borderBottom: '2px solid var(--color-border-strong)', paddingBottom: 2 }}
          >
            See all {apps.length} app examples →
          </Link>
          <span aria-hidden="true" style={{ color: 'var(--color-border-strong)' }}>·</span>
          <ContactLink
            className="link-underline"
            style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}
          >
            Tell us your own idea
          </ContactLink>
        </div>

      </Container>
    </section>
  )
}
