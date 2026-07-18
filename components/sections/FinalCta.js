import ContactForm from '../ui/ContactForm.js'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'
import Container from '@/components/layout/Container'

export default function FinalCta() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-dark)',
        paddingTop: 'var(--space-32)',
        paddingBottom: 'var(--space-32)',
      }}
    >
      <PhotoBackdrop
        src="/images/post/sendoff-1.jpg"
        alt="The couple leaving through a crowd of guests at night, sparklers lit"
        strength="heavy"
      />

      <Container
        style={{
          maxWidth: '640px',
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
          Tell us about your wedding.
        </h2>
        <p
          style={{
            fontSize: 'var(--text-body-lg)',
            color: 'var(--color-text-inverse-secondary)',
            marginBottom: 'var(--space-12)',
            lineHeight: 1.6,
          }}
        >
          We take 4 weddings a month — because building something that feels like yours
          takes time. Bring an idea, or bring us your story and we&rsquo;ll suggest one.
          Either way, you don&rsquo;t lift a technical finger.
        </p>
        <div style={{ textAlign: 'left' }}>
          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
