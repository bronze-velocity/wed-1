import Link from 'next/link'
import Container from '@/components/layout/Container'

export default function PlannersCallout() {
  return (
    <section
      style={{
        background: 'var(--color-bg-subtle)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: 'var(--space-6)',
        paddingBottom: 'var(--space-6)',
      }}
    >
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <strong style={{ color: 'var(--color-text-primary)' }}>
            Are you a wedding planner?
          </strong>{' '}
          Recommend something extraordinary — we handle everything, your couples credit you.
        </p>
        <Link
          href="/planners"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-accent)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontWeight: 500,
          }}
          className="link-underline"
        >
          See how Wepho works for planners →
        </Link>
      </Container>
    </section>
  )
}
