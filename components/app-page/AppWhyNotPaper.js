import Container from '@/components/layout/Container'

const DEFAULT = {
  paper:
    'A stack of pre-printed cards, a decorated jar, or a good MC with a microphone. The traditions this app draws from are older than any of us and they mostly still work.',
  app: 'This app leans on things paper structurally cannot do — live big-screen reveals, real-time voting or aggregation, scheduled delivery years into the future, automatic curation into a keepsake, or bridging distance to guests who couldn’t fly in. The specific capabilities this one uses appear on the app’s scene above.',
  verdict:
    'If your idea is already served well by paper, we’ll tell you and send you to a good stationer. We only build the app when there’s a mechanic the analog version genuinely cannot copy — usually because the payoff needs to reach you decades after the wedding is over.',
}

export default function AppWhyNotPaper({ app }) {
  const custom = app?.extended?.whyNotPaper
  const paper = custom?.paper ?? DEFAULT.paper
  const appText = custom?.app ?? DEFAULT.app
  const verdict = custom?.verdict ?? DEFAULT.verdict

  return (
    <section
      className="py-20 md:py-28"
      style={{ background: 'var(--color-bg)' }}
    >
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
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
            The honest question
          </p>
          <h2
            className="font-bold text-text-primary"
            style={{
              fontSize: 'var(--text-h2)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: 'var(--space-4)',
            }}
          >
            Why not paper?
          </h2>
          <p
            style={{
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            There&rsquo;s an analog version of nearly every wedding tradition. Here&rsquo;s
            what an app does for <em>{app?.title || 'this one'}</em> that a stack of cards can&rsquo;t.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 'var(--space-5)' }}
        >
          {[
            { label: 'The paper version', body: paper },
            { label: 'What the app adds', body: appText },
            { label: 'Our honest take', body: verdict },
          ].map((panel) => (
            <div
              key={panel.label}
              style={{
                background: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
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
                {panel.label}
              </p>
              <p
                style={{
                  fontSize: 'var(--text-body)',
                  lineHeight: 1.65,
                  color: 'var(--color-text-primary)',
                }}
              >
                {panel.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
