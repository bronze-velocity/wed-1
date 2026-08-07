import ContactForm from '../ui/ContactForm.js'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'
import Container from '@/components/layout/Container'

export default function FinalCta() {
  return (
    <section
      id="contact"
      className="py-24 md:py-28 lg:py-32"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg-dark)',
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
          Come with an idea or come with nothing but your story. Either way, we'll figure it out together — and handle every technical bit ourselves.
        </p>
        <div style={{ textAlign: 'left' }}>
          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
