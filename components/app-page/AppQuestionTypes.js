import Container from '@/components/layout/Container'

export default function AppQuestionTypes({ app }) {
  const tiles = app?.extended?.questionTypes
  if (!tiles || tiles.length === 0) return null

  const regular = tiles.filter((t) => !t.locked)
  const spicy = tiles.filter((t) => t.locked)

  return (
    <section
      className="py-20 md:py-28"
      style={{ background: 'var(--color-bg)' }}
    >
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent"
            aria-hidden="true"
          >
            The format range
          </p>
          <h2
            className="mb-6 font-bold text-text-primary"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Every kind of thing you&rsquo;ve ever said to each other
          </h2>
          <p
            className="mx-auto text-text-secondary"
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              maxWidth: '640px',
            }}
          >
            Same two-tap guess, different content underneath.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ gap: 'var(--space-5)', marginBottom: 'var(--space-5)' }}
        >
          {regular.map((tile) => (
            <div
              key={tile.title}
              style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
              }}
            >
              <PhoneMockup title={tile.title} />
              <h3
                className="font-semibold text-text-primary"
                style={{
                  fontSize: 'var(--text-h4)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                  marginTop: 'var(--space-6)',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {tile.title}
              </h3>
              <p
                className="text-text-secondary"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.6 }}
              >
                {tile.description}
              </p>
            </div>
          ))}
        </div>

        {spicy.map((tile) => (
          <div
            key={tile.title}
            style={{
              background: 'var(--color-bg-subtle)',
              border: '2px dashed var(--color-border-strong)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              display: 'flex',
              gap: 'var(--space-6)',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                fontSize: '2rem',
                lineHeight: 1,
                flex: 'none',
                width: '3rem',
                height: '3rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-hidden="true"
            >
              🔒
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <h3
                className="font-semibold text-text-primary"
                style={{
                  fontSize: 'var(--text-h4)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.2,
                  marginBottom: 'var(--space-2)',
                }}
              >
                {tile.title}
              </h3>
              <p
                className="text-text-secondary"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.6 }}
              >
                {tile.description}
              </p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}

function PhoneMockup({ title }) {
  return (
    <div
      style={{
        background: 'var(--color-bg-dark)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        aspectRatio: '16 / 9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          fontSize: 'var(--text-tiny)',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        {title}
      </p>
    </div>
  )
}
