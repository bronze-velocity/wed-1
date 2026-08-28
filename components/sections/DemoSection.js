'use client'

import Link from 'next/link'
import Image from 'next/image'
import useScrollReveal from '../../hooks/useScrollReveal'
import LoveLetterDemo from '../demo/LoveLetterDemo'
import Container from '@/components/layout/Container'
import { apps } from '@/data/apps'

export default function DemoSection() {
  const headingRef = useScrollReveal()
  const appCount = apps.length

  return (
    <section
      className="section-py"
      style={{
        background: 'var(--gradient-hero)',
      }}
    >
      <Container>
        <div
          ref={headingRef}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: 'var(--space-20)' }}
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
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            The Unprompted Love Letter Machine. Every guest gets a chance to say the thing they&rsquo;d never say out loud. Read them together, live, when dinner starts.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'center',
              marginTop: 'var(--space-6)',
            }}
          >
            {[
              'No app to download',
              'Nothing hits the wall unapproved',
              'Every message saved',
            ].map((label) => (
              <span
                key={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 12px 5px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-subtle)',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  style={{ flexShrink: 0, color: 'var(--color-accent)' }}
                >
                  <path
                    d="M2 6.2l2.6 2.6L10 3.4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>

        <LoveLetterDemo />

        <div
          style={{
            marginTop: 'var(--space-16)',
            position: 'relative',
            borderRadius: 'var(--radius-2xl)',
            overflow: 'hidden',
            aspectRatio: '21 / 9',
            maxHeight: 420,
          }}
        >
          <Image
            src="/images/dinner/bigscreen-1.jpg"
            alt="The display wall lit up in a dim reception room as a message appears"
            fill
            sizes="(max-width: 768px) 100vw, 960px"
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(17,17,17,0.1) 40%, rgba(17,17,17,0.75) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 'var(--space-8)',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-serif-accent)',
              fontStyle: 'italic',
              fontSize: 'clamp(var(--text-body-lg), 2.4vw, var(--text-h4))',
              color: '#fff',
              margin: 0,
              maxWidth: 640,
              lineHeight: 1.4,
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}>
              This is what your guests will see, at dinner, together.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <p
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: '580px',
              margin: '0 auto var(--space-4)',
            }}
          >
            That was the Unprompted Love Letter Machine &mdash; one of {appCount}{' '}apps we&rsquo;ve built. Or bring us one we haven&rsquo;t.
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
            See all {appCount} apps →
          </Link>
        </div>
      </Container>
    </section>
  )
}
