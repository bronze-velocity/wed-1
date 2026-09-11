import Image from 'next/image'

/**
 * EditorialBand — full-bleed photo section for story beats.
 * Breaks out of Container: single large photo, quiet caption + eyebrow floated
 * bottom-left, no text overlay unless intentional.
 *
 * Props:
 *   image     — { src, alt }
 *   eyebrow   — small tracked label
 *   caption   — one short line under the eyebrow
 *   height    — CSS height (default 78vh)
 *   scrim     — 'none' | 'light' | 'medium' | 'heavy'
 *   children  — optional overlay content (rendered inside a padded inner container)
 *   align     — 'bottom-left' (default) | 'center' | 'bottom-right'
 */
export default function EditorialBand({
  image,
  eyebrow,
  caption,
  height = '78vh',
  scrim = 'none',
  align = 'bottom-left',
  children,
}) {
  const scrimBg =
    scrim === 'light'  ? 'var(--scrim-light)'  :
    scrim === 'medium' ? 'var(--scrim-medium)' :
    scrim === 'heavy'  ? 'var(--scrim-heavy)'  :
    'none'

  const [vertical, horizontal] =
    align === 'center'       ? ['center', 'center'] :
    align === 'bottom-right' ? ['flex-end', 'flex-end'] :
    ['flex-end', 'flex-start']

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        height,
        minHeight: 480,
        overflow: 'hidden',
        background: 'var(--color-ink)',
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
      />
      {scrimBg !== 'none' && (
        <div style={{ position: 'absolute', inset: 0, background: scrimBg, pointerEvents: 'none' }} />
      )}
      {(eyebrow || caption || children) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: vertical,
            justifyContent: horizontal,
            padding: 'clamp(24px, 5vw, 72px)',
            color: 'var(--color-text-inverse)',
            pointerEvents: 'none',
          }}
        >
          <div style={{ maxWidth: 620, pointerEvents: 'auto' }}>
            {eyebrow ? (
              <p className="eyebrow" style={{ color: 'rgba(251,247,239,0.8)', marginBottom: 'var(--space-3)' }}>
                {eyebrow}
              </p>
            ) : null}
            {caption ? (
              <p
                className="display-italic"
                style={{ fontSize: 'var(--text-h2)', color: 'rgba(251,247,239,0.96)', margin: 0 }}
              >
                {caption}
              </p>
            ) : null}
            {children}
          </div>
        </div>
      )}
    </section>
  )
}
