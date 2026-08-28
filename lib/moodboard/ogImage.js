const MAX_NAME_LEN = 42
const MAX_WORDS_LEN = 60

function truncateByWords(text, max) {
  if (!text) return ''
  const clean = text.trim()
  if (clean.length <= max) return clean
  const words = clean.split(/\s+/)
  const out = []
  let len = 0
  for (const w of words) {
    if (len + w.length + (out.length ? 1 : 0) > max) break
    out.push(w)
    len += w.length + (out.length ? 1 : 0)
  }
  return (out.join(' ') || clean.slice(0, max)) + '…'
}

export function renderMoodboardOgImage({ coupleName, threeWords }) {
  const safeName = truncateByWords(coupleName || '', MAX_NAME_LEN)
  const safeWords = truncateByWords(threeWords || 'Warm. Personal. Alive.', MAX_WORDS_LEN)
  const displayName = safeName || 'A wedding app moodboard'

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '84px',
        background: 'linear-gradient(160deg, #F7F4FF 0%, #FFFFFF 45%, #F0F9FF 100%)',
        fontFamily: 'sans-serif',
        color: '#111111',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: '#6B5CE7',
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: '#6B6B6B',
          }}
        >
          Wepho · Wedding app moodboard
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 1000 }}>
        <div style={{ fontSize: 44, color: '#3D2DB5', fontWeight: 700, lineHeight: 1.1 }}>
          {displayName}
        </div>
        <div
          style={{
            fontSize: 110,
            lineHeight: 1.02,
            fontStyle: 'italic',
            fontWeight: 700,
            color: '#111111',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {safeWords}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 22,
          color: '#6B6B6B',
        }}
      >
        <span>Custom wedding apps by Wepho</span>
        <span style={{ color: '#111111', fontWeight: 700 }}>wepho.com</span>
      </div>
    </div>
  )
}
