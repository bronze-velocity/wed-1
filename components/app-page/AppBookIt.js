import Link from 'next/link'
import ContactForm from '../ui/ContactForm.js'
import Container from '@/components/layout/Container'

export default function AppBookIt({ app }) {
  const seedHref = app?.slug ? `/moodboard?seed=${app.slug}` : '/moodboard'
  return (
    <section
      id="book-it"
      className="py-24 md:py-32"
      style={{ background: 'var(--color-bg-dark)' }}
    >
      <Container style={{ maxWidth: '640px' }}>
        <h2
          style={{
            fontSize: 'var(--text-h1)',
            fontWeight: 700,
            color: 'var(--color-text-inverse)',
            marginBottom: 'var(--space-4)',
            lineHeight: 1.1,
          }}
        >
          Ready to make this yours?
        </h2>
        <p
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--color-text-inverse-secondary)',
            marginBottom: 'var(--space-8)',
            lineHeight: 1.6,
          }}
        >
          Build a moodboard around <em>{app?.title || 'this app'}</em> — three minutes,
          no signup. We&rsquo;ll shape it to your night before we ever email.
        </p>
        <Link
          href={seedHref}
          className="btn btn-lg btn-primary"
          data-moodboard-cta="app-book-it"
          style={{ marginBottom: 'var(--space-12)' }}
        >
          Start your moodboard →
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
        <ContactForm appName={app?.title} />
      </Container>
    </section>
  )
}
