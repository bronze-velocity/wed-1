'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from './Container'
import ContactLink from '../ui/ContactLink'

const LINKS = [
  { href: '/apps', label: 'Apps' },
  { href: '/planners', label: 'Planners' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const inMoodboard = pathname.startsWith('/moodboard')

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open
  const darkHeroRoutes = ['/']
  const overDarkHero = !solid && darkHeroRoutes.includes(pathname)
  const fg = overDarkHero ? 'rgba(251,247,239,0.96)' : 'var(--color-ink)'
  const fgAccent = overDarkHero ? 'rgba(251,247,239,0.96)' : 'var(--color-accent)'
  const fgBorder = overDarkHero ? 'rgba(251,247,239,0.6)' : 'var(--color-accent)'

  if (inMoodboard) {
    return (
      <header className="moodboard-studio-header">
        <Link href="/" className="moodboard-studio-logo">Wepho</Link>
        <span>Wedding app studio</span>
      </header>
    )
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 'var(--nav-height)',
        background: solid ? 'color-mix(in srgb, var(--color-paper) 94%, transparent)' : 'transparent',
        backdropFilter: solid ? 'saturate(140%) blur(12px)' : 'none',
        WebkitBackdropFilter: solid ? 'saturate(140%) blur(12px)' : 'none',
        borderBottom: solid ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'background 240ms ease, border-color 240ms ease',
      }}
    >
      <Container
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-6)',
        }}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          style={{
            fontFamily: 'var(--font-display-serif)',
            fontSize: '1.625rem',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: fg,
            textDecoration: 'none',
            lineHeight: 1,
            transition: 'color 240ms ease',
          }}
        >
          Wepho
        </Link>

        <nav
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: 'var(--space-8)' }}
          aria-label="Primary"
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: 'var(--text-eyebrow)',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: fg,
                textDecoration: 'none',
                transition: 'color 240ms ease',
              }}
              className="link-underline"
            >
              {l.label}
            </Link>
          ))}
          <ContactLink
            style={{
              fontSize: 'var(--text-eyebrow)',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: fg,
              textDecoration: 'none',
              transition: 'color 240ms ease',
            }}
            className="link-underline"
          >
            Contact
          </ContactLink>
          <Link
            href="/moodboard"
            style={{
              fontSize: 'var(--text-eyebrow)',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: fgAccent,
              textDecoration: 'none',
              borderBottom: `1px solid ${fgBorder}`,
              paddingBottom: 2,
              transition: 'color 240ms ease, border-color 240ms ease',
            }}
            data-moodboard-cta="nav"
          >
            Start moodboard
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 8,
            cursor: 'pointer',
            color: fg,
            fontFamily: 'inherit',
            transition: 'color 240ms ease',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div
          className="md:hidden"
          style={{
            background: 'var(--color-bg)',
            borderTop: '1px solid var(--color-border)',
            padding: 'var(--space-4) var(--space-6) var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 'var(--text-body-lg)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </Link>
          ))}
          <ContactLink
            onClick={() => setOpen(false)}
            style={{
              fontSize: 'var(--text-body-lg)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
            }}
          >
            Contact
          </ContactLink>
          <Link
            href="/moodboard"
            onClick={() => setOpen(false)}
            className="btn btn-primary"
            style={{ marginTop: 'var(--space-2)', textAlign: 'center' }}
            data-moodboard-cta="nav-mobile"
          >
            Start your moodboard
          </Link>
        </div>
      )}
    </header>
  )
}
