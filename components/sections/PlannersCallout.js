import Link from 'next/link'
import Container from '@/components/layout/Container'

export default function PlannersCallout() {
  return (
    <section
      style={{
        background: 'var(--color-accent-light)',
        paddingTop: 'var(--space-6)',
        paddingBottom: 'var(--space-6)',
      }}
    >
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}
      >
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
              fontSize: 'var(--text-body)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-1)',
            }}
          >
            Are you a wedding planner?
          </strong>
          Recommend something extraordinary — we handle everything, your couples credit you.
        </p>
        <Link
          href="/planners"
          style={{
            display: 'inline-block',
            background: 'var(--color-accent)',
            color: 'var(--color-text-inverse)',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 600,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            padding: 'var(--space-2) var(--space-5)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          How it works for planners →
        </Link>
      </Container>
    </section>
  )
}
