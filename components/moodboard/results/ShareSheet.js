'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

function buildInvite({ coupleName, threeWords, url, password }) {
  const lines = []
  if (coupleName) {
    lines.push(`Our wedding app moodboard — ${coupleName}`)
  } else {
    lines.push('Our wedding app moodboard')
  }
  if (threeWords) lines.push(threeWords)
  lines.push('')
  lines.push(`Link: ${url}`)
  if (password) lines.push(`Password: ${password}`)
  lines.push('')
  lines.push('The brief is password-protected — please keep this to yourself.')
  return lines.join('\n')
}

export default function ShareSheet({
  open,
  onClose,
  coupleName,
  threeWords,
  privateUrl,
  socialUrl,
  socialPreviewEnabled,
  password,
  slug,
  onPreviewChange,
}) {
  const [copiedInvite, setCopiedInvite] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedSocial, setCopiedSocial] = useState(false)
  const [previewBusy, setPreviewBusy] = useState(false)
  const [previewError, setPreviewError] = useState('')
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  useEffect(() => {
    if (!open) return
    setCopiedInvite(false)
    setCopiedLink(false)
    setCopiedSocial(false)
    setPreviewError('')
    const prev = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (prev && typeof prev.focus === 'function') prev.focus()
    }
  }, [open, onClose])

  const invite = buildInvite({ coupleName, threeWords, url: privateUrl, password })

  const handleNativeShare = useCallback(async () => {
    if (!canNativeShare) return
    try {
      await navigator.share({
        title: coupleName
          ? `${coupleName}'s wedding app moodboard`
          : 'Our wedding app moodboard',
        text: threeWords || 'A custom wedding reception app moodboard.',
        url: privateUrl,
      })
    } catch {
      // cancellation or share failure — silent
    }
  }, [canNativeShare, coupleName, threeWords, privateUrl])

  const handleSharePublic = useCallback(async () => {
    if (!socialUrl) return
    if (canNativeShare) {
      try {
        await navigator.share({
          title: coupleName
            ? `${coupleName}'s wedding app moodboard`
            : 'Our wedding app moodboard',
          text: threeWords || 'A custom wedding reception app moodboard.',
          url: socialUrl,
        })
        return
      } catch {
        // fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(socialUrl)
      setCopiedSocial(true)
      setTimeout(() => setCopiedSocial(false), 2500)
    } catch {
      // ignore
    }
  }, [canNativeShare, coupleName, threeWords, socialUrl])

  const copyInvite = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(invite)
      setCopiedInvite(true)
      setTimeout(() => setCopiedInvite(false), 2500)
    } catch {
      // ignore
    }
  }, [invite])

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(privateUrl)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    } catch {
      // ignore
    }
  }, [privateUrl])

  const togglePreview = useCallback(
    async (nextEnabled) => {
      if (!slug) return
      setPreviewBusy(true)
      setPreviewError('')
      try {
        const res = await fetch('/api/moodboard/preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, enabled: nextEnabled }),
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          setPreviewError(data.error || 'Could not update.')
          return
        }
        onPreviewChange?.({
          socialPreviewEnabled: Boolean(data.socialPreviewEnabled),
          socialUrl: data.socialUrl || null,
        })
      } catch {
        setPreviewError('Could not update. Try again.')
      } finally {
        setPreviewBusy(false)
      }
    },
    [slug, onPreviewChange]
  )

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="moodboard-sharesheet-title"
      ref={dialogRef}
      className="moodboard-sharesheet-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="moodboard-sharesheet">
        <div className="moodboard-sharesheet-header">
          <h2
            id="moodboard-sharesheet-title"
            style={{
              fontSize: 'var(--text-h4)',
              fontWeight: 800,
              margin: 0,
            }}
          >
            Share your moodboard
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="moodboard-sharesheet-close"
            onClick={() => onClose?.()}
            aria-label="Close share sheet"
          >
            ×
          </button>
        </div>

        <div className="moodboard-sharesheet-preview">
          <p
            style={{
              fontSize: 'var(--text-tiny)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-2)',
            }}
          >
            {coupleName || 'Wedding app moodboard'}
          </p>
          {threeWords && (
            <p
              style={{
                fontFamily: 'var(--font-serif-accent)',
                fontStyle: 'italic',
                fontSize: 'var(--text-h4)',
                color: 'var(--color-accent)',
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {threeWords}
            </p>
          )}
        </div>

        <div className="moodboard-sharesheet-section">
          <h3 className="moodboard-sharesheet-heading">Share privately</h3>
          <p className="moodboard-sharesheet-body">
            Send the full brief to someone you trust. Include the password so they can unlock it.
          </p>
          <div className="moodboard-sharesheet-actions">
            {canNativeShare && (
              <button
                type="button"
                className="btn btn-primary moodboard-sharesheet-btn"
                onClick={handleNativeShare}
              >
                Share privately
              </button>
            )}
            <button
              type="button"
              className="btn btn-secondary moodboard-sharesheet-btn"
              onClick={copyInvite}
            >
              {copiedInvite ? 'Invite copied ✓' : 'Copy private invite'}
            </button>
          </div>
          {password && (
            <p className="moodboard-sharesheet-warning">
              Only send this to people you trust — the invite includes the password.
            </p>
          )}
          {copiedInvite && (
            <p className="moodboard-sharesheet-status" role="status">
              Private invite copied to your clipboard.
            </p>
          )}
        </div>

        <div className="moodboard-sharesheet-section">
          <h3 className="moodboard-sharesheet-heading">Share a public preview</h3>
          <p className="moodboard-sharesheet-body">
            Only the cover, your three words, and broad directions are shown. Your answers stay
            private.
          </p>
          {socialPreviewEnabled ? (
            <>
              <div className="moodboard-sharesheet-linkfield">
                <span>{socialUrl}</span>
              </div>
              <div className="moodboard-sharesheet-actions">
                <button
                  type="button"
                  className="btn btn-primary moodboard-sharesheet-btn"
                  onClick={handleSharePublic}
                >
                  {canNativeShare
                    ? 'Share public preview'
                    : copiedSocial
                    ? 'Preview link copied ✓'
                    : 'Copy preview link'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary moodboard-sharesheet-btn"
                  onClick={() => togglePreview(false)}
                  disabled={previewBusy}
                >
                  {previewBusy ? 'Working…' : 'Turn off public preview'}
                </button>
              </div>
              <p className="moodboard-sharesheet-hint">
                Already-cached previews on social platforms may take time to disappear.
              </p>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-primary moodboard-sharesheet-btn"
                onClick={() => togglePreview(true)}
                disabled={previewBusy || !slug}
              >
                {previewBusy ? 'Creating…' : 'Create social preview'}
              </button>
              <p className="moodboard-sharesheet-hint">
                This cover can be viewed by anyone with the link. Your full answers stay private.
              </p>
            </>
          )}
          {previewError && (
            <p
              style={{
                marginTop: 'var(--space-3)',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-accent)',
              }}
            >
              {previewError}
            </p>
          )}
        </div>

        <div className="moodboard-sharesheet-section moodboard-sharesheet-footer">
          <div className="moodboard-sharesheet-linkfield">
            <span>{privateUrl}</span>
          </div>
          <div className="moodboard-sharesheet-actions">
            <button
              type="button"
              className="btn btn-secondary moodboard-sharesheet-btn"
              onClick={copyLink}
            >
              {copiedLink ? 'Link copied ✓' : 'Copy link'}
            </button>
            <a
              className="btn btn-secondary moodboard-sharesheet-btn"
              href={privateUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open full brief
            </a>
          </div>
          <p className="moodboard-sharesheet-hint">Your full brief stays password protected.</p>
        </div>
      </div>
    </div>
  )
}
