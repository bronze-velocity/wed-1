import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/layout/Container'
import ContactLink from '@/components/ui/ContactLink'
import AutoPlayPhone from '@/components/demo/AutoPlayPhone'
import { apps } from '@/data/apps'

export default function HomeHero() {
  const appCount = apps.length
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-ink)',
        minHeight: 'min(92vh, 900px)',
        color: 'var(--color-text-inverse)',
        paddingTop: 'calc(var(--nav-height) + var(--space-16))',
        paddingBottom: 'var(--space-32)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/dancing/hero-bg-1.jpg"
          alt="Guests dancing under string lights during the reception"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--scrim-medium)' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(31,29,27,0.15) 40%, rgba(31,29,27,0.85) 100%)',
          }}
        />
      </div>

      <Container
        editorial
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '68vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 'var(--space-10)',
        }}
      >
        <p
          className="eyebrow"
          style={{ color: 'rgba(251,247,239,0.75)' }}
        >
          Custom Wedding Experience Studio
        </p>

        <h1
          className="display-serif"
          style={{
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'rgba(251,247,239,0.98)',
            margin: 0,
            maxWidth: '18ch',
            textShadow: '0 1px 24px rgba(31,29,27,0.35)',
          }}
        >
          A wedding app built for one couple.{' '}
          <span className="display-italic" style={{ fontWeight: 400 }}>Yours.</span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-body-lg)',
            lineHeight: 1.7,
            color: 'rgba(251,247,239,0.85)',
            maxWidth: '52ch',
            margin: 0,
          }}
        >
          Bring us an idea, or pick one of ours. We build it from scratch for your wedding. The phones don't distract, they add to the experience. And even grandma gets it.          $2,000 for something no one else has.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
          <Link
            href="/moodboard"
            className="btn btn-lg"
            data-moodboard-cta="hero"
            style={{
              background: 'var(--color-bone)',
              color: 'var(--color-ink-cool)',
            }}
          >
            Build your moodboard
          </Link>
          <Link
            href="/apps"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-eyebrow)',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(251,247,239,0.95)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(251,247,239,0.6)',
              paddingBottom: 4,
            }}
          >
            See the {appCount} we've built →
          </Link>
        </div>

        <p
          style={{
            marginTop: 'var(--space-2)',
            fontSize: 'var(--text-body-sm)',
            color: 'rgba(251,247,239,0.6)',
            fontFamily: 'var(--font-body)',
          }}
        >
          3 minutes, no signup — or{' '}
          <ContactLink
            className="link-underline"
            style={{ color: 'rgba(251,247,239,0.9)', fontWeight: 500 }}
          >
            talk to a human
          </ContactLink>
          .
        </p>
      </Container>

      <div
        aria-hidden="true"
        className="hero-phone"
        style={{
          position: 'absolute',
          top: '50%',
          right: 'clamp(var(--space-8), 6vw, var(--space-24))',
          transform: 'translateY(-50%) rotate(3deg)',
          zIndex: 1,
          width: 280,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.5))',
        }}
      >
        <AutoPlayPhone
          message={"We stayed up till 2am the night we met, talking about everything and nothing. I knew by the time the sun came up."}
          senderName="Priya"
          to="both"
        />
      </div>
      <style jsx>{`
        .hero-phone { display: none; }
        @media (min-width: 1024px) { .hero-phone { display: block; } }
      `}</style>
    </section>
  )
}
