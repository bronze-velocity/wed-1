import Container from '@/components/layout/Container'

export default function PaperReframe() {
  return (
    <section
      className="section-py"
      style={{
        background: 'var(--color-bg-subtle)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Container
        style={{
          maxWidth: '760px',
          textAlign: 'center',
        }}
      >
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
          The rule behind the six rules
        </p>
        <h2
          style={{
            fontSize: 'var(--text-h2)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          We&rsquo;re the only app studio that will talk you out of an app.
        </h2>
        <p
          style={{
            fontSize: 'var(--text-body-lg)',
            lineHeight: 1.65,
            color: 'var(--color-text-secondary)',
          }}
        >
          There are 100 wedding traditions that already work. Prediction jars. Dedication slips.
          The advice book on the sweetheart table. If your idea is already served well by paper,
          we&rsquo;ll say so and send you to a good stationer. We build the ones where the app
          is doing something a jar structurally can&rsquo;t — like putting every guest&rsquo;s
          prediction on the big screen the second they hit send, after your maid of honor
          quietly filters the too-spicy ones.
        </p>
      </Container>
    </section>
  )
}
