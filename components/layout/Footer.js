import Link from 'next/link'
import Container from './Container'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-bg-dark)',
        color: 'var(--color-text-inverse)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-10)',
      }}
    >
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-10)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: 'var(--text-h4)',
              fontWeight: 700,
              color: 'var(--color-text-inverse)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            Wepho
          </Link>
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-inverse-secondary)',
              margin: 0,
            }}
          >
            Custom wedding experience apps built for your guests.
          </p>
        </div>

        <nav
          style={{
            display: 'flex',
            gap: 'var(--space-8)',
            flexWrap: 'wrap',
          }}
          aria-label="Footer navigation"
        >
          <Link
            href="/apps"
            className="link-underline"
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-inverse-secondary)',
              textDecoration: 'none',
            }}
          >
            Explore apps
          </Link>
          <Link
            href="/planners"
            className="link-underline"
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-inverse-secondary)',
              textDecoration: 'none',
            }}
          >
            For planners
          </Link>
          <Link
            href="/#contact"
            className="link-underline"
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-inverse-secondary)',
              textDecoration: 'none',
            }}
          >
            Book your app
          </Link>
        </nav>

        <p
          style={{
            fontSize: 'var(--text-tiny)',
            color: 'var(--color-text-muted)',
            margin: 0,
            borderTop: '1px solid var(--color-border-dark)',
            paddingTop: 'var(--space-6)',
          }}
        >
          © 2026 Wepho. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
