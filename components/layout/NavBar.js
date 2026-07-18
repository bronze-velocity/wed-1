'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from './Container'

const LINKS = [
  { href: '/apps', label: 'Apps' },
  { href: '/planners', label: 'Planners' },
  { href: '/#contact', label: 'Contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 'var(--nav-height)',
        background: solid ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: solid ? 'saturate(150%) blur(10px)' : 'none',
        WebkitBackdropFilter: solid ? 'saturate(150%) blur(10px)' : 'none',
        borderBottom: solid ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'background 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
        boxShadow: solid ? '0 1px 12px rgba(0,0,0,0.04)' : 'none',
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
            fontSize: 'var(--text-h4)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            lineHeight: 1,
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
                fontSize: 'var(--text-body-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
              }}
              className="link-underline"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: 'var(--text-body-sm)' }}
          >
            Book your app
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
            color: 'var(--color-text-primary)',
            fontFamily: 'inherit',
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
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary"
            style={{ marginTop: 'var(--space-2)', textAlign: 'center' }}
          >
            Book your app
          </Link>
        </div>
      )}
    </header>
  )
}
