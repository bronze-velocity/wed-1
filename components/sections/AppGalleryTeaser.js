'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const VIBES = [
  {
    label: 'Make them laugh',
    tagline: 'Games, chaos, everyone in on the joke',
    color: 'var(--color-amber)',
    colorLight: 'var(--color-amber-light)',
    appIds: [1, 8, 9, 11, 19, 20],
    image: { src: '/images/apps/vibe-laugh.jpg', alt: 'Guests mid-laugh in a candid group shot' },
  },
  {
    label: 'Make them cry',
    tagline: 'The moment nobody saw coming',
    color: 'var(--color-rose)',
    colorLight: 'var(--color-rose-light)',
    appIds: [3, 7, 12, 13, 16, 17],
    image: { src: '/images/apps/vibe-cry.jpg', alt: 'A quiet, emotional moment between two guests' },
  },
  {
    label: 'Get them talking',
    tagline: 'Strangers leave as friends',
    color: 'var(--color-teal)',
    colorLight: 'var(--color-teal-light)',
    appIds: [2, 4, 5, 14, 18],
    image: { src: '/images/apps/vibe-talk.jpg', alt: 'A cluster of guests deep in conversation at cocktail hour' },
  },
  {
    label: 'Create a keepsake',
    tagline: 'Something you still open in twenty years',
    color: 'var(--color-green)',
    colorLight: 'var(--color-green-light)',
    appIds: [3, 4, 6, 7, 12, 14, 15, 17],
    image: { src: '/images/apps/vibe-keepsake.jpg', alt: 'A still-life of a keepsake object, softly lit' },
  },
  {
    label: 'Stop the room',
    tagline: 'Every head turns. Nobody checks their phone.',
    color: 'var(--color-accent)',
    colorLight: 'var(--color-accent-light)',
    appIds: [1, 2, 8, 10, 11, 15],
    image: { src: '/images/apps/vibe-stop-room.jpg', alt: 'A wide shot of the room turned toward the display wall' },
  },
]

export default function AppGalleryTeaser({ apps }) {
  const [activeVibe, setActiveVibe] = useState(VIBES[0])
  const [animKey, setAnimKey] = useState(0)

  function selectVibe(vibe) {
    if (vibe.label === activeVibe.label) return
    setActiveVibe(vibe)
    setAnimKey((k) => k + 1)
  }

  const visibleApps = apps
    .filter((app) => activeVibe.appIds.includes(app.id))
    .slice(0, 5)

  return (
    <section style={{ background: 'var(--color-bg-subtle)', padding: 'var(--space-24) 0' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--space-6)' }}>

        <h2
          style={{
            fontSize: 'var(--text-h2)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 'var(--space-10)',
            color: 'var(--color-text-primary)',
          }}
        >
          What kind of wedding do you want?
        </h2>

        {/* Vibe tiles */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-3)',
            justifyContent: 'center',
            marginBottom: 'var(--space-10)',
          }}
        >
          {VIBES.map((vibe) => {
            const isActive = vibe.label === activeVibe.label
            return (
              <button
                key={vibe.label}
                onClick={() => selectVibe(vibe)}
                style={{
                  background: isActive ? vibe.color : vibe.colorLight,
                  color: isActive ? 'var(--color-text-inverse)' : vibe.color,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: vibe.color,
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-4) var(--space-5)',
                  minWidth: '180px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 'var(--text-body)', lineHeight: 1.3 }}>
                  {vibe.label}
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-tiny)',
                    fontWeight: 400,
                    marginTop: '3px',
                    opacity: isActive ? 0.85 : 0.7,
                    lineHeight: 1.4,
                  }}
                >
                  {vibe.tagline}
                </div>
              </button>
            )
          })}
        </div>

        {/* App cards — key per card includes animKey so all cards remount on vibe switch */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {visibleApps.map((app, i) => (
            <Link
              key={`${animKey}-${app.id}`}
              href={`/apps/${app.slug}`}
              className="card-enter hover-lift"
              style={{
                '--stagger-i': i,
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ position: 'relative', height: 140 }}>
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
          ))}
        </div>

        {/* See all link */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/apps"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              fontWeight: 600,
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              borderBottom: '2px solid var(--color-border-strong)',
              paddingBottom: '3px',
              transition: 'border-color var(--duration-fast) var(--ease-out)',
            }}
          >
            See all 20 app examples →
          </Link>
        </div>

      </div>
    </section>
  )
}
