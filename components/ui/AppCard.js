import Link from 'next/link'

const vibeConfig = {
  'Make them laugh':   { textClass: 'text-amber',  bg: 'color-mix(in srgb, var(--color-amber)  14%, transparent)' },
  'Make them cry':     { textClass: 'text-rose',   bg: 'color-mix(in srgb, var(--color-rose)   14%, transparent)' },
  'Get them talking':  { textClass: 'text-teal',   bg: 'color-mix(in srgb, var(--color-teal)   14%, transparent)' },
  'Create a keepsake': { textClass: 'text-green',  bg: 'color-mix(in srgb, var(--color-green)  14%, transparent)' },
  'Stop the room':     { textClass: 'text-accent', bg: 'color-mix(in srgb, var(--color-accent) 14%, transparent)' },
}

export default function AppCard({ app }) {
  const primaryVibe = app.alt1_vibe?.[0]
  const primaryMoment = app.alt2_moment?.[0]
  const vibe = vibeConfig[primaryVibe]

  return (
    <Link
      href={`/apps/${app.slug}`}
      className="group block rounded-xl border border-border bg-bg p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {primaryVibe && vibe && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${vibe.textClass}`}
            style={{ backgroundColor: vibe.bg }}
          >
            {primaryVibe}
          </span>
        )}
        {primaryMoment && (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-bg-subtle text-text-secondary">
            {primaryMoment}
          </span>
        )}
        {app.isDemo && (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent-light text-accent">
            Featured demo
          </span>
        )}
      </div>

      <h3 className="text-text-primary text-xl font-semibold leading-snug mb-2 line-clamp-2">
        {app.title}
      </h3>

      <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
        {app.description}
      </p>

      <span className="mt-4 inline-block text-sm font-medium text-accent group-hover:underline">
        See how it works →
      </span>
    </Link>
  )
}
