import Link from 'next/link'
import ParallaxHeroBackdrop from '@/components/ui/ParallaxHeroBackdrop'

export default function HomeHero() {
  return (
    <section
      className="px-6 md:px-10"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--gradient-hero)',
        paddingTop: 'calc(var(--nav-height) + var(--space-16))',
        paddingBottom: 'var(--space-24)',
      }}
    >
      <ParallaxHeroBackdrop
        src="/images/dancing/hero-bg-1.jpg"
        alt="Guests dancing under string lights during the reception"
        strength="wash"
      />

      <div
        className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 items-center"
        style={{ maxWidth: 'var(--container-max)', gap: 'var(--space-16)', position: 'relative', zIndex: 1 }}
      >
        <div>
          <p
            className="card-enter"
            style={{
              '--stagger-i': 0,
              fontSize: 'var(--text-label)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-5)',
            }}
          >
            Custom Wedding Experience Studio
          </p>

          <h1
            className="card-enter"
            style={{
              '--stagger-i': 1,
              fontSize: 'var(--text-display)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
            }}
          >
            A wedding app built around who you actually are.
          </h1>

          <p
            className="card-enter"
            style={{
              '--stagger-i': 2,
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-10)',
              maxWidth: '480px',
            }}
          >
            Not a template. Not Kahoot. Built for your wedding, from scratch. Price $1,000-2,000
          </p>

          <div
            className="card-enter"
            style={{ '--stagger-i': 3, display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}
          >
            <Link href="/apps" className="btn btn-lg btn-primary">
              Explore 20 example apps →
            </Link>
            <Link href="/#contact" className="btn btn-lg btn-secondary">
              Book your app
            </Link>
          </div>
        </div>

        <div
          className="card-enter"
          style={{ '--stagger-i': 4, display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{
              width: 280,
              background: '#1A1A1A',
              borderRadius: 44,
              border: '2px solid #2E2E2E',
              boxShadow: 'var(--shadow-xl)',
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 14, paddingBottom: 10 }}>
              <div style={{ width: 88, height: 22, background: '#111', borderRadius: 12 }} />
            </div>

            <div
              style={{
                background: 'var(--color-bg)',
                margin: '0 4px',
                padding: '20px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--text-h4)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                Leave them a message
              </h3>

              <div>
                <p style={{ fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--color-text-secondary)', margin: '0 0 7px' }}>
                  To:
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['Both', 'Her', 'Him'].map((label, i) => (
                    <span
                      key={label}
                      style={{
                        padding: '5px 13px',
                        borderRadius: 'var(--radius-full)',
                        border: '1.5px solid',
                        borderColor: i === 0 ? 'var(--color-accent)' : 'var(--color-border-strong)',
                        background: i === 0 ? 'var(--color-accent)' : 'transparent',
                        color: i === 0 ? '#fff' : 'var(--color-text-secondary)',
                        fontSize: 'var(--text-body-sm)',
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: '10px 11px',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-bg-subtle)',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.55,
                  minHeight: 96,
                }}
              >
                We stayed up till 2am the night we met, talking about everything and nothing. I knew by the time the sun came up.
              </div>

              <div
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                Send it →
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 14px' }}>
              <div style={{ width: 100, height: 4, background: '#3A3A3A', borderRadius: 4 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
