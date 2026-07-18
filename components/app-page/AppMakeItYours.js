import Container from '@/components/layout/Container'

const GENERIC_INTRO =
  "This is one starting point. Because we build every Wepho app from scratch for one couple, every element on this page is negotiable — content, flow, mechanics, big-screen design. Bring us your version."

const GENERIC_TAGLINE =
  "This template exists because it works. Yours won't look exactly like it. That's the point."

export default function AppMakeItYours({ app }) {
  const data = app?.extended?.makeItYours
  const intro = data?.intro || GENERIC_INTRO
  const swaps = data?.swaps || []
  const examples = data?.examples || []
  const tagline = data?.tagline || GENERIC_TAGLINE

  return (
    <section
      className="py-20 md:py-28"
      style={{ background: 'var(--color-bg-subtle)' }}
    >
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent"
            aria-hidden="true"
          >
            The custom pillar
          </p>
          <h2
            className="mb-6 font-bold text-text-primary"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Make it yours
          </h2>
          <p
            className="mx-auto text-text-secondary"
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              maxWidth: '640px',
            }}
          >
            {intro}
          </p>
        </div>

        {swaps.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: 'var(--space-5)', marginBottom: 'var(--space-10)' }}
          >
            {swaps.map((swap) => (
              <div
                key={swap.title}
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-7)',
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--text-label)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {swap.title}
                </p>
                <p
                  className="text-text-primary"
                  style={{ fontSize: 'var(--text-body)', lineHeight: 1.6 }}
                >
                  {swap.detail}
                </p>
              </div>
            ))}
          </div>
        )}

        {examples.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 'var(--space-5)', marginBottom: 'var(--space-10)' }}
          >
            {examples.map((example, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-bg)',
                  borderLeft: '3px solid var(--color-accent)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-6) var(--space-7)',
                }}
              >
                <p
                  className="text-text-primary"
                  style={{
                    fontSize: 'var(--text-body)',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}
                >
                  {example}
                </p>
              </div>
            ))}
          </div>
        )}

        <p
          className="mx-auto text-text-secondary text-center"
          style={{
            fontSize: 'var(--text-body-lg)',
            lineHeight: 1.5,
            maxWidth: '640px',
            fontWeight: 500,
          }}
        >
          {tagline}
        </p>
      </Container>
    </section>
  )
}
