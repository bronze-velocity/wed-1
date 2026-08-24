import Container from '@/components/layout/Container'

function stripMarkdown(text) {
  return text.replace(/\*/g, '')
}

function buildJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripMarkdown(a),
      },
    })),
  }
}

export default function FaqList({
  items = [],
  eyebrow = 'Questions',
  heading = 'Common questions',
  subheading,
  background = 'var(--color-bg)',
  jsonLd = true,
  narrow = true,
}) {
  if (!items || items.length === 0) return null

  return (
    <section className="section-py" style={{ background }}>
      <Container narrow={narrow}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          {eyebrow && (
            <p
              style={{
                fontSize: 'var(--text-label)',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-4)',
              }}
            >
              {eyebrow}
            </p>
          )}
          <h2
            style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--color-text-primary)',
            }}
          >
            {heading}
          </h2>
          {subheading && (
            <p
              className="mx-auto"
              style={{
                marginTop: 'var(--space-4)',
                fontSize: 'var(--text-body-lg)',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                maxWidth: '640px',
              }}
            >
              {subheading}
            </p>
          )}
        </div>

        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {items.map(({ q, a }, i) => (
            <li key={i}>
              <details
                className="faq-item"
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5) var(--space-6)',
                }}
              >
                <summary
                  style={{
                    listStyle: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 'var(--space-4)',
                    fontSize: 'var(--text-body-lg)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.4,
                  }}
                >
                  <span>{q}</span>
                  <span
                    aria-hidden="true"
                    className="faq-icon"
                    style={{
                      flex: '0 0 auto',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--color-accent-light)',
                      color: 'var(--color-accent)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <p
                  style={{
                    marginTop: 'var(--space-4)',
                    fontSize: 'var(--text-body)',
                    lineHeight: 1.7,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {stripMarkdown(a)}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </Container>

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(items)),
          }}
        />
      )}
    </section>
  )
}
