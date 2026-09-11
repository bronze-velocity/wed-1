'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Container from './Container'
import ContactLink from '../ui/ContactLink'
import CookiePreferencesLink from '../consent/CookiePreferencesLink'

const columns = [
  {
    heading: 'The studio',
    links: [
      { href: '/apps',          label: 'The apps' },
      { href: '/how-it-works',  label: 'How it works' },
      { href: '/planners',      label: 'For planners' },
      { href: '/moodboard',     label: 'Start your moodboard', cta: 'footer' },
    ],
  },
]

export default function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/moodboard')) return null

  return (
    <footer
      style={{
        position: 'relative',
        background: 'var(--color-ink)',
        color: 'var(--color-text-inverse)',
        paddingTop: 'var(--space-32)',
        paddingBottom: 'var(--space-10)',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      >
        <Image
          src="/images/dancing/hero-bg-1.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(31,29,27,0.6) 0%, rgba(31,29,27,0.95) 100%)',
          }}
        />
      </div>

      <Container style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              color: 'var(--color-text-inverse)',
              textDecoration: 'none',
            }}
          >
            Wepho
          </Link>
          <p
            className="display-italic"
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'rgba(251,247,239,0.72)',
              margin: 0,
              maxWidth: '48ch',
            }}
          >
            Custom wedding experience apps, built one couple at a time.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-10)',
          }}
        >
          {columns.map((col) => (
            <div key={col.heading} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <p className="eyebrow" style={{ color: 'rgba(251,247,239,0.55)' }}>{col.heading}</p>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {col.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="link-underline"
                    data-moodboard-cta={l.cta}
                    style={{
                      fontFamily: 'var(--font-display-serif)',
                      fontSize: '1.375rem',
                      fontWeight: 400,
                      lineHeight: 1.2,
                      color: 'var(--color-text-inverse)',
                      textDecoration: 'none',
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p className="eyebrow" style={{ color: 'rgba(251,247,239,0.55)' }}>Say hello</p>
            <ContactLink
              className="link-underline"
              style={{
                fontFamily: 'var(--font-display-serif)',
                fontSize: '1.375rem',
                fontWeight: 400,
                lineHeight: 1.2,
                color: 'var(--color-text-inverse)',
                textDecoration: 'none',
              }}
            >
              Talk to a human
            </ContactLink>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-6)',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--color-border-dark)',
            paddingTop: 'var(--space-6)',
          }}
        >
          <p
            className="eyebrow"
            style={{ color: 'rgba(251,247,239,0.45)', margin: 0 }}
          >
            © 2026 Wepho
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)' }}>
            <Link
              href="/privacy"
              className="link-underline"
              style={{
                fontSize: 'var(--text-tiny)',
                color: 'rgba(251,247,239,0.6)',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="link-underline"
              style={{
                fontSize: 'var(--text-tiny)',
                color: 'rgba(251,247,239,0.6)',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Terms
            </Link>
            <CookiePreferencesLink
              className="link-underline"
              style={{
                fontSize: 'var(--text-tiny)',
                color: 'rgba(251,247,239,0.6)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            />
          </div>
        </div>
      </Container>
    </footer>
  )
}
