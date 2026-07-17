import ContactForm from '../ui/ContactForm.js'

export default function AppBookIt({ app }) {
  return (
    <section
      style={{
        background: 'var(--color-bg-dark)',
        padding: 'var(--space-32) var(--space-8)',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
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
      </div>
    </section>
  )
}
