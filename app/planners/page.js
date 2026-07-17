import ContactForm from '../../components/ui/ContactForm.js'

export const metadata = {
  title: 'For Wedding Planners — Wepho',
  description:
    'Add a custom interactive wedding app to your couples’ day. Zero extra coordination for you — Wepho handles everything.',
}

export default function PlannersPage() {
  return (
    <main>
      <section
        style={{
          background: 'var(--color-bg-dark)',
          padding: 'var(--space-32) var(--space-8)',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
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
              marginBottom: 'var(--space-10)',
            }}
          >
            Tell us about a couple you&apos;re working with and we&apos;ll reach out within 48
            hours. You mention it — we handle everything else.
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
