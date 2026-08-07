import Container from '@/components/layout/Container'

export const metadata = {
  title: 'UI — Pill style explorations',
  robots: { index: false, follow: false },
}

const vibeConfig = {
  'Make them laugh':   { color: 'var(--color-amber)',  bg: 'var(--color-amber-light)' },
  'Make them cry':     { color: 'var(--color-rose)',   bg: 'var(--color-rose-light)' },
  'Get them talking':  { color: 'var(--color-teal)',   bg: 'var(--color-teal-light)' },
  'Create a keepsake': { color: 'var(--color-green)',  bg: 'var(--color-green-light)' },
  'Stop the room':     { color: 'var(--color-accent)', bg: 'var(--color-accent-light)' },
}

const SAMPLE_APP = {
  title: 'The Love Letter Machine',
  description:
    'Guests type a message to the couple on their phones. You approve them. They appear one by one on the big screen, read aloud, with the room watching.',
  vibes: ['Make them cry', 'Stop the room'],
  moments: ['Speeches', 'Dinner'],
  primaryVibe: 'Stop the room',
}

const VIBES = ['All', 'Make them laugh', 'Make them cry', 'Get them talking', 'Create a keepsake', 'Stop the room']
const MOMENTS = ['All', 'Arrival', 'Cocktail Hour', 'Dinner', 'Speeches', 'Dancing']

export default function UiExplorationsPage() {
  return (
    <main style={{ background: 'var(--color-bg)', paddingTop: 'calc(var(--nav-height) + var(--space-12))', paddingBottom: 'var(--space-24)' }}>
      <Container>
        <header style={{ marginBottom: 'var(--space-12)' }}>
          <p style={eyebrow}>Internal · not indexed</p>
          <h1 style={h1}>Pill style explorations</h1>
          <p style={lede}>
            Three alternatives for the filter chips on <code>/apps</code>, the vibe / moment badges inside each app card, and the app-name eyebrow at the top of the <code>/apps/[slug]</code> hero. Each option is self-consistent — pick one option across all three surfaces.
          </p>
        </header>

        <CurrentBaseline />

        <Option
          label="Option A"
          name="Editorial serif — no container"
          rationale="No visible pill. Uppercase serif label with a hairline underline for the eyebrow; card badges become a single tracked-line of tiny caps separated by dot glyphs; filters are text buttons with a bottom-rule when active. Feels like a wedding invitation. Quiet, confident."
        >
          <FiltersA />
          <CardsRow>
            <SampleCard variant="A" />
            <SampleCard variant="A" alt />
          </CardsRow>
          <HeroPreview variant="A" />
        </Option>

        <Option
          label="Option B"
          name="Outline chips + colored dot"
          rationale="Monochrome outlined pills (--radius-md, matches buttons). Vibe color moves into a small filled dot on the left — chip shape stays consistent so color doesn't dominate. Filter chips get a solid ink fill when active; app-name eyebrow becomes a slim outlined tag with a dot in front."
        >
          <FiltersB />
          <CardsRow>
            <SampleCard variant="B" />
            <SampleCard variant="B" alt />
          </CardsRow>
          <HeroPreview variant="B" />
        </Option>

        <Option
          label="Option C"
          name="Soft tinted chips — no border"
          rationale="Borderless soft-tinted chips using the vibe color at low opacity — no ring, no dot. Slightly bigger corner radius (--radius-lg) for a friendlier, more editorial feel. The hero eyebrow becomes a bold uppercase kicker with a small accent bar to its left instead of a pill."
        >
          <FiltersC />
          <CardsRow>
            <SampleCard variant="C" />
            <SampleCard variant="C" alt />
          </CardsRow>
          <HeroPreview variant="C" />
        </Option>
      </Container>
    </main>
  )
}

/* ---------- layout scaffolding ---------- */

const eyebrow = {
  fontSize: 'var(--text-label)',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--color-accent)',
  marginBottom: 'var(--space-4)',
}

const h1 = {
  fontSize: 'var(--text-h1)',
  fontWeight: 800,
  letterSpacing: '-0.02em',
  color: 'var(--color-text-primary)',
  marginBottom: 'var(--space-4)',
}

const lede = {
  fontSize: 'var(--text-body-lg)',
  lineHeight: 1.6,
  color: 'var(--color-text-secondary)',
  maxWidth: '720px',
}

function Option({ label, name, rationale, children }) {
  return (
    <section
      style={{
        marginTop: 'var(--space-16)',
        padding: 'var(--space-8)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--color-bg)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <p style={{ ...eyebrow, marginBottom: 'var(--space-2)' }}>{label}</p>
        <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
          {name}
        </h2>
        <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.6, color: 'var(--color-text-secondary)', maxWidth: '720px' }}>
          {rationale}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>{children}</div>
    </section>
  )
}

function CardsRow({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
      {children}
    </div>
  )
}

function SubLabel({ children }) {
  return (
    <p style={{ fontSize: 'var(--text-label)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
      {children}
    </p>
  )
}

/* ---------- baseline (what exists today) ---------- */

function CurrentBaseline() {
  const v = vibeConfig[SAMPLE_APP.primaryVibe]
  return (
    <section
      style={{
        marginTop: 'var(--space-8)',
        padding: 'var(--space-8)',
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--color-bg-subtle)',
      }}
    >
      <SubLabel>Baseline · today</SubLabel>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        {VIBES.map((x, i) => (
          <button
            key={x}
            style={{
              background: i === 5 ? 'var(--color-text-primary)' : 'var(--color-bg)',
              color: i === 5 ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
              border: '1.5px solid',
              borderColor: i === 5 ? 'var(--color-text-primary)' : 'var(--color-border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: 'var(--text-body-sm)',
              lineHeight: 1,
            }}
          >
            {x}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        {SAMPLE_APP.vibes.map((x) => {
          const cfg = vibeConfig[x]
          return (
            <span key={x} style={{ background: cfg.bg, color: cfg.color, borderRadius: 'var(--radius-md)', padding: '3px 10px', fontSize: 'var(--text-tiny)', fontWeight: 600 }}>{x}</span>
          )
        })}
        {SAMPLE_APP.moments.map((x) => (
          <span key={x} style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-secondary)', borderRadius: 'var(--radius-md)', padding: '3px 10px', fontSize: 'var(--text-tiny)', fontWeight: 600, border: '1px solid var(--color-border)' }}>{x}</span>
        ))}
      </div>

      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: 'var(--radius-full)',
          padding: '6px 16px',
          fontSize: 'var(--text-tiny)',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          background: `color-mix(in srgb, ${v.color} 22%, transparent)`,
          color: v.color,
        }}
      >
        {SAMPLE_APP.title}
      </span>
    </section>
  )
}

/* ==========================================================
   Option A — Editorial serif, no container
   ========================================================== */

const SERIF = "var(--font-serif-accent, Georgia, serif)"

function FiltersA() {
  return (
    <div>
      <SubLabel>Filters — /apps</SubLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)', alignItems: 'baseline' }}>
        {VIBES.map((x, i) => {
          const active = i === 2
          return (
            <button
              key={x}
              style={{
                background: 'transparent',
                border: 0,
                padding: 0,
                paddingBottom: '4px',
                fontFamily: SERIF,
                fontSize: 'var(--text-body-sm)',
                fontWeight: 500,
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                borderBottom: active ? '1.5px solid var(--color-text-primary)' : '1.5px solid transparent',
                cursor: 'pointer',
              }}
            >
              {x}
            </button>
          )
        })}
      </div>
      <div style={{ height: 'var(--space-3)' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)', alignItems: 'baseline' }}>
        {MOMENTS.map((x, i) => {
          const active = i === 4
          return (
            <button
              key={x}
              style={{
                background: 'transparent',
                border: 0,
                padding: 0,
                paddingBottom: '4px',
                fontFamily: SERIF,
                fontSize: 'var(--text-body-sm)',
                fontWeight: 500,
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                color: active ? 'var(--color-accent)' : 'var(--color-text-muted)',
                borderBottom: active ? '1.5px solid var(--color-accent)' : '1.5px solid transparent',
                cursor: 'pointer',
              }}
            >
              {x}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ==========================================================
   Option B — Outline chips + colored dot
   ========================================================== */

function FiltersB() {
  return (
    <div>
      <SubLabel>Filters — /apps</SubLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
        {VIBES.map((x, i) => {
          const active = i === 2
          return (
            <button
              key={x}
              style={{
                background: active ? 'var(--color-text-primary)' : 'transparent',
                color: active ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
                border: '1px solid',
                borderColor: active ? 'var(--color-text-primary)' : 'var(--color-border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '7px 14px',
                fontWeight: 600,
                fontSize: 'var(--text-body-sm)',
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              {x}
            </button>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {MOMENTS.map((x, i) => {
          const active = i === 4
          return (
            <button
              key={x}
              style={{
                background: active ? 'var(--color-accent)' : 'transparent',
                color: active ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
                border: '1px solid',
                borderColor: active ? 'var(--color-accent)' : 'var(--color-border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '7px 14px',
                fontWeight: 600,
                fontSize: 'var(--text-body-sm)',
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              {x}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ==========================================================
   Option C — Soft tinted chips, no border
   ========================================================== */

function FiltersC() {
  return (
    <div>
      <SubLabel>Filters — /apps</SubLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
        {VIBES.map((x, i) => {
          const active = i === 2
          return (
            <button
              key={x}
              style={{
                background: active ? 'var(--color-text-primary)' : 'var(--color-bg-subtle)',
                color: active ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
                border: 0,
                borderRadius: 'var(--radius-lg)',
                padding: '8px 16px',
                fontWeight: 600,
                fontSize: 'var(--text-body-sm)',
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              {x}
            </button>
          )
        })}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
        {MOMENTS.map((x, i) => {
          const active = i === 4
          return (
            <button
              key={x}
              style={{
                background: active ? 'var(--color-accent-light)' : 'var(--color-bg-subtle)',
                color: active ? 'var(--color-accent-dark)' : 'var(--color-text-primary)',
                border: 0,
                borderRadius: 'var(--radius-lg)',
                padding: '8px 16px',
                fontWeight: 600,
                fontSize: 'var(--text-body-sm)',
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              {x}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ==========================================================
   Sample cards for each variant
   ========================================================== */

const CARD_ALT = {
  title: 'Who Said It?',
  description: 'Live trivia where every quote is something one of them actually said. Guests guess — the couple keeps score from the head table.',
  vibes: ['Make them laugh', 'Get them talking'],
  moments: ['Dinner'],
}

function SampleCard({ variant, alt }) {
  const data = alt ? CARD_ALT : SAMPLE_APP
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-sm)',
        height: '100%',
      }}
    >
      {variant === 'A' && <BadgesA vibes={data.vibes} moments={data.moments} />}
      {variant === 'B' && <BadgesB vibes={data.vibes} moments={data.moments} />}
      {variant === 'C' && <BadgesC vibes={data.vibes} moments={data.moments} />}

      <h3 style={{ fontSize: 'var(--text-h4)', fontWeight: 700, lineHeight: 1.3, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>{data.title}</h3>
      <p style={{ fontSize: 'var(--text-body-sm)', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>{data.description}</p>
      <span style={{ marginTop: 'auto', fontSize: 'var(--text-body-sm)', fontWeight: 600, color: 'var(--color-accent)' }}>See how it works →</span>
    </div>
  )
}

/* ---- Badges A: editorial caps separated by dots ---- */
function BadgesA({ vibes, moments }) {
  const items = [...vibes.map((v) => ({ t: v, c: vibeConfig[v].color })), ...moments.map((m) => ({ t: m, c: 'var(--color-text-muted)' }))]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0 var(--space-2)', marginBottom: 'var(--space-4)' }}>
      {items.map((it, i) => (
        <span key={it.t} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {i > 0 && <span style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}>·</span>}
          <span style={{ fontSize: 'var(--text-tiny)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: it.c }}>{it.t}</span>
        </span>
      ))}
    </div>
  )
}

/* ---- Badges B: outline chips + colored dot ---- */
function BadgesB({ vibes, moments }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
      {vibes.map((v) => {
        const cfg = vibeConfig[v]
        return (
          <span
            key={v}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'var(--color-bg)', color: 'var(--color-text-primary)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-md)', padding: '3px 10px 3px 8px',
              fontSize: 'var(--text-tiny)', fontWeight: 600, lineHeight: 1.4,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 'var(--radius-full)', background: cfg.color, display: 'inline-block' }} />
            {v}
          </span>
        )
      })}
      {moments.map((m) => (
        <span
          key={m}
          style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'var(--color-bg)', color: 'var(--color-text-muted)',
            border: '1px dashed var(--color-border-strong)',
            borderRadius: 'var(--radius-md)', padding: '3px 10px',
            fontSize: 'var(--text-tiny)', fontWeight: 600, lineHeight: 1.4,
          }}
        >
          {m}
        </span>
      ))}
    </div>
  )
}

/* ---- Badges C: soft tinted no-border chips ---- */
function BadgesC({ vibes, moments }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
      {vibes.map((v) => {
        const cfg = vibeConfig[v]
        return (
          <span
            key={v}
            style={{
              background: cfg.bg, color: cfg.color,
              borderRadius: 'var(--radius-lg)', padding: '4px 12px',
              fontSize: 'var(--text-tiny)', fontWeight: 700, lineHeight: 1.4,
            }}
          >
            {v}
          </span>
        )
      })}
      {moments.map((m) => (
        <span
          key={m}
          style={{
            background: 'var(--color-bg-subtle)', color: 'var(--color-text-secondary)',
            borderRadius: 'var(--radius-lg)', padding: '4px 12px',
            fontSize: 'var(--text-tiny)', fontWeight: 700, lineHeight: 1.4,
          }}
        >
          {m}
        </span>
      ))}
    </div>
  )
}

/* ==========================================================
   Hero eyebrow preview — the "app name" pill in /apps/[slug]
   ========================================================== */

function HeroPreview({ variant }) {
  return (
    <div>
      <SubLabel>Hero eyebrow — /apps/[slug]</SubLabel>
      <div
        style={{
          borderRadius: 'var(--radius-2xl)',
          padding: 'var(--space-10)',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1e4f 60%, #4a2a6b 100%)',
          color: 'var(--color-text-inverse)',
        }}
      >
        {variant === 'A' && <EyebrowA />}
        {variant === 'B' && <EyebrowB />}
        {variant === 'C' && <EyebrowC />}

        <h1
          style={{
            fontSize: 'var(--text-h1)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            marginBottom: 'var(--space-4)',
            maxWidth: '32rem',
          }}
        >
          Every message on the wall is one your guests actually wrote tonight.
        </h1>
        <p style={{ fontSize: 'var(--text-body-lg)', lineHeight: 1.6, color: 'var(--color-text-inverse-secondary)', maxWidth: '32rem' }}>
          {SAMPLE_APP.description}
        </p>
      </div>
    </div>
  )
}

function EyebrowA() {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', marginBottom: 'var(--space-6)' }}>
      <span
        style={{
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontSize: 'var(--text-body)',
          letterSpacing: '0.04em',
          color: 'var(--color-text-inverse)',
          paddingBottom: '6px',
          borderBottom: '1px solid rgba(255,255,255,0.4)',
        }}
      >
        {SAMPLE_APP.title}
      </span>
    </div>
  )
}

function EyebrowB() {
  const v = vibeConfig[SAMPLE_APP.primaryVibe]
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        border: '1px solid rgba(255,255,255,0.35)',
        borderRadius: 'var(--radius-md)',
        padding: '6px 14px',
        fontSize: 'var(--text-tiny)', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--color-text-inverse)',
        marginBottom: 'var(--space-6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 'var(--radius-full)', background: v.color, display: 'inline-block' }} />
      {SAMPLE_APP.title}
    </span>
  )
}

function EyebrowC() {
  const v = vibeConfig[SAMPLE_APP.primaryVibe]
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
      <span style={{ width: '3px', height: '18px', background: v.color, borderRadius: 'var(--radius-full)', display: 'inline-block' }} />
      <span
        style={{
          fontSize: 'var(--text-label)',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-text-inverse)',
        }}
      >
        {SAMPLE_APP.title}
      </span>
    </div>
  )
}
