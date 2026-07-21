import Link from 'next/link'
import Container from '@/components/layout/Container'

export default function PlannersCallout() {
  return (
    <section
      style={{
        background: 'var(--color-bg-subtle)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: 'var(--space-8)',
        paddingBottom: 'var(--space-8)',
      }}
    >
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            flex: '1 1 380px',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              flexShrink: 0,
              alignSelf: 'stretch',
              width: '3px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-accent)',
            }}
          />
          <p
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 1.5,
              color: 'var(--color-text-secondary)',
            }}
          >
            <strong
              style={{
                display: 'block',
                fontSize: 'var(--text-h4)',
                fontWeight: 700,
                letterSpacing: '-0.015em',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-1)',
              }}
            >
              Are you a wedding planner?
            </strong>
            Recommend something extraordinary — we handle everything, your couples credit you.
          </p>
        </div>
        <Link
          href="/planners"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-accent)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontWeight: 600,
          }}
          className="link-underline"
        >
          See how Wepho works for planners →
        </Link>
      </Container>
    </section>
  )
}
