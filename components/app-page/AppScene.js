export default function AppScene({ app }) {
  if (!app.scene) return null

  return (
    <section className="bg-bg-subtle py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p
          className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent"
          aria-hidden="true"
        >
          Picture this
        </p>
        <p
          style={{
            fontSize: 'var(--text-h3)',
            lineHeight: '1.65',
            color: 'var(--color-text-primary)',
            fontWeight: '400',
          }}
        >
          {app.scene}
        </p>
      </div>
    </section>
  )
}
