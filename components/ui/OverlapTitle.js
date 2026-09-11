import Image from 'next/image'

/**
 * OverlapTitle — display serif title that flows across the edge of a photo.
 * The "Chelsea Tombs" treatment: first line lives in whitespace, the second
 * line crosses onto the top slice of the image.
 *
 * Props:
 *   eyebrow      — small tracked label above the title
 *   lead         — text that sits in whitespace (above/beside the image)
 *   accent       — a single word rendered in the script font
 *   trailing     — text that overlaps onto the image
 *   caption      — quiet paragraph under the title
 *   image        — { src, alt }
 *   align        — 'left' | 'right' (which side the image sits on desktop)
 */
export default function OverlapTitle({
  eyebrow,
  lead,
  accent,
  trailing,
  caption,
  image,
  align = 'right',
  children,
}) {
  const imageRight = align === 'right'
  return (
    <div
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'var(--space-8)',
      }}
      className="overlap-title-root"
    >
      <style>{`
        .overlap-title-root { grid-template-columns: 1fr; }
        @media (min-width: 1024px) {
          .overlap-title-root {
            grid-template-columns: 1.05fr 1fr;
            align-items: end;
            gap: var(--space-16);
          }
          .overlap-title-root[data-align="right"] .overlap-title-copy  { order: 1; }
          .overlap-title-root[data-align="right"] .overlap-title-photo { order: 2; }
          .overlap-title-root[data-align="left"]  .overlap-title-copy  { order: 2; }
          .overlap-title-root[data-align="left"]  .overlap-title-photo { order: 1; }
        }
        .overlap-title-trailing {
          display: block;
          margin-top: 0.05em;
          transform: translateY(0);
        }
        @media (min-width: 1024px) {
          .overlap-title-trailing {
            transform: translateY(0.15em) translateX(4vw);
            white-space: nowrap;
          }
          .overlap-title-root[data-align="left"] .overlap-title-trailing {
            transform: translateY(0.15em) translateX(-4vw);
          }
        }
      `}</style>

      <div className="overlap-title-copy" data-align={align === 'right' ? 'right' : 'left'} style={{ position: 'relative', zIndex: 2 }}>
        {eyebrow ? (
          <p className="eyebrow" style={{ marginBottom: 'var(--space-6)' }}>{eyebrow}</p>
        ) : null}
        <h1
          className="overlap-title"
          style={{
            fontSize: 'var(--text-display)',
            margin: 0,
          }}
        >
          <span style={{ display: 'block' }}>
            {lead}
            {accent ? (
              <>
                {' '}
                <span className="display-script" style={{ fontSize: '1.15em', color: 'var(--color-slate)' }}>
                  {accent}
                </span>
              </>
            ) : null}
          </span>
          {trailing ? (
            <span className="overlap-title-trailing overlap-title--on-photo">
              {trailing}
            </span>
          ) : null}
        </h1>

        {caption ? (
          <p
            style={{
              maxWidth: '46ch',
              marginTop: 'var(--space-8)',
              fontSize: 'var(--text-body-lg)',
              lineHeight: 1.7,
              color: 'var(--color-ink-soft)',
            }}
          >
            {caption}
          </p>
        ) : null}

        {children ? (
          <div style={{ marginTop: 'var(--space-8)' }}>{children}</div>
        ) : null}
      </div>

      <div
        className="overlap-title-photo"
        data-align={imageRight ? 'right' : 'left'}
        style={{
          position: 'relative',
          aspectRatio: '4 / 5',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 0,
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}
