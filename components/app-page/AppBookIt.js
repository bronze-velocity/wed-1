import ContactForm from '../ui/ContactForm.js'
import Container from '@/components/layout/Container'

export default function AppBookIt({ app }) {
  return (
    <section
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
            marginBottom: 'var(--space-10)',
            lineHeight: 1.6,
          }}
        >
          We take 4 weddings per month. That&apos;s the number where we can build
          something worth $2,000.
        </p>
        <ContactForm appName={app?.title} />
      </Container>
    </section>
  )
}
