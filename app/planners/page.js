import Link from 'next/link'
import ContactForm from '../../components/ui/ContactForm.js'
import Container from '@/components/layout/Container'

export const metadata = {
  title: 'For Wedding Planners — Wepho',
  description:
    'Add a custom interactive wedding app to your couples’ day. Zero extra coordination for you — Wepho handles everything.',
  openGraph: {
    title: 'For Wedding Planners — Wepho',
    description:
      'Add a custom interactive wedding app to your couples’ day. Zero extra coordination for you — Wepho handles everything.',
    type: 'website',
  },
}

export default function PlannersPage() {
  return (
    <main>
      <section
        className="section-py"
        style={{
          background: 'var(--color-bg-dark)',
          paddingTop: 'calc(var(--nav-height) + var(--space-16))',
        }}
      >
        <Container style={{ maxWidth: '640px' }}>
          <p
            className="uppercase tracking-widest font-medium mb-4"
            style={{ fontSize: 'var(--text-label)', color: 'var(--color-accent)' }}
          >
            For Wedding Planners
          </p>
          <h1
            style={{
              fontSize: 'var(--text-h1)',
              fontWeight: 700,
              color: 'var(--color-text-inverse)',
              lineHeight: 1.1,
              marginBottom: 'var(--space-6)',
            }}
          >
            Ready to add this to your toolkit?
          </h1>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              color: 'var(--color-text-inverse-secondary)',
              lineHeight: 1.6,
              marginBottom: 'var(--space-8)',
            }}
          >
            Build a moodboard for a couple you&rsquo;re briefing — three minutes,
            no signup. We&rsquo;ll come to the call prepared.
          </p>
          <Link
            href="/moodboard?role=planner"
            className="btn btn-lg btn-primary"
            data-moodboard-cta="planners-hero"
            style={{ marginBottom: 'var(--space-12)' }}
          >
            Start a planner moodboard →
          </Link>
          <p
            style={{
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
              marginTop: 'var(--space-6)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Or write to us directly
          </p>
          <ContactForm />
        </Container>
      </section>
    </main>
  )
}
