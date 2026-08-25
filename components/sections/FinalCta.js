import Link from 'next/link'
import ContactForm from '../ui/ContactForm.js'
import PhotoBackdrop from '@/components/ui/PhotoBackdrop'
import Container from '@/components/layout/Container'
import MagneticButton from '@/components/ui/MagneticButton'
import AmbientPetals from '@/components/ui/AmbientPetals'

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

      <AmbientPetals />

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
            marginBottom: 'var(--space-10)',
            lineHeight: 1.6,
          }}
        >
          Three minutes, no signup — see what your night could feel like.
        </p>
        <MagneticButton style={{ marginBottom: 'var(--space-10)' }}>
          <Link
            href="/moodboard"
            className="btn btn-lg btn-primary cta-breathe"
            data-moodboard-cta="final"
          >
            Build your moodboard →
          </Link>
        </MagneticButton>
        <p
          style={{
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 600,
            marginTop: 'var(--space-12)',
            marginBottom: 'var(--space-6)',
          }}
        >
          Or write to us directly
        </p>
        <div style={{ textAlign: 'left' }}>
          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
