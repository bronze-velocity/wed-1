import Container from '@/components/layout/Container'

export default function AppIsThisYou({ app }) {
  const bullets = app.extended?.isThisYou
  if (!bullets || bullets.length === 0) return null

  return (
    <section className="py-20 md:py-28" style={{ background: 'var(--color-bg-subtle)' }}>
      <Container narrow>
        <h2
          className="mb-10 font-bold text-text-primary text-center"
          style={{
            fontSize: 'var(--text-h2)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          Is this you?
        </h2>

        <ul className="flex flex-col gap-6">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-4">
              <svg
                className="mt-1 h-6 w-6 flex-none text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <p
                className="text-text-primary"
                style={{ fontSize: 'var(--text-h4)', lineHeight: 1.4 }}
              >
                {bullet}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
