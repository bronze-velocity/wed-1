import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
        <p
          style={{
            fontSize: 'var(--text-label)',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 'var(--space-4)',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontSize: 'var(--text-h1)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 'var(--space-4)',
          }}
        >
          This page doesn&rsquo;t exist (yet)
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-8)',
          }}
        >
          But 12 wedding apps do.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/apps"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-text-inverse)',
              padding: '12px 28px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 'var(--text-body)',
            }}
          >
            Explore all 12 apps →
          </Link>
          <Link
            href="/"
            style={{
              border: '1px solid var(--color-border-strong)',
              color: 'var(--color-text-primary)',
              padding: '12px 28px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 'var(--text-body)',
            }}
          >
            Go home →
          </Link>
        </div>
      </div>
    </main>
  )
}
