import ContactForm from '../ui/ContactForm.js'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'

export default function FinalCta() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-dark)',
        padding: 'var(--space-32) var(--space-8)',
      }}
    >
      <PhotoBackdrop
        src="/images/post/sendoff-1.jpg"
        alt="The couple leaving through a crowd of guests at night, sparklers lit"
        strength="heavy"
      />

      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: 'var(--text-h1)',
            fontWeight: 700,
            color: 'var(--color-text-inverse)',
            marginBottom: 'var(--space-6)',
            lineHeight: 1.1,
          }}
        >
          Ready to make this yours?
        </h2>
        <p
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--color-text-inverse-secondary)',
            marginBottom: 'var(--space-12)',
            lineHeight: 1.6,
          }}
        >
          We take 4 weddings per month. That&apos;s the number where we can build
          something worth $2,000.
        </p>
        <div style={{ textAlign: 'left' }}>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
