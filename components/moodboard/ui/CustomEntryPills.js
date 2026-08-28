'use client'

import { useEffect, useRef, useState } from 'react'

function PencilIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

function nextCustomId(entries, prefix) {
  const used = new Set(entries.map((e) => e.id))
  let n = 1
  while (used.has(`${prefix}-${n}`)) n++
  return `${prefix}-${n}`
}

export default function CustomEntryPills({
  entries = [],
  onChange,
  placeholder,
  max = 2,
  charCap = 80,
  idPrefix,
  addCapReached = false,
  eyebrow = 'your words',
  addLabel = 'Add your own',
}) {
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState('')
  const [adding, setAdding] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if ((adding || editingId) && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
    }
  }, [adding, editingId])

  const atMax = entries.length >= max
  const canAdd = !atMax && !addCapReached

  function startAdding() {
    if (!canAdd) return
    setDraft('')
    setEditingId(null)
    setAdding(true)
  }

  function startEditing(entry) {
    setDraft(entry.text)
    setAdding(false)
    setEditingId(entry.id)
  }

  function cancelEditor() {
    setAdding(false)
    setEditingId(null)
    setDraft('')
  }

  function commitEditor() {
    const text = draft.trim().slice(0, charCap)
    if (!text) {
      cancelEditor()
      return
    }
    if (editingId) {
      const next = entries.map((e) => (e.id === editingId ? { ...e, text } : e))
      onChange(next)
    } else {
      const id = nextCustomId(entries, idPrefix)
      onChange([...entries, { id, text }])
    }
    cancelEditor()
  }

  function removeEntry(id) {
    onChange(entries.filter((e) => e.id !== id))
    if (editingId === id) cancelEditor()
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      commitEditor()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancelEditor()
    }
  }

  const editorOpen = adding || editingId != null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      {entries.length > 0 && (
        <p
          aria-hidden="true"
          style={{
            fontSize: 'var(--text-tiny)',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            margin: 0,
          }}
        >
          {eyebrow}
        </p>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          alignItems: 'center',
        }}
      >
        {entries.map((entry) => {
          const isEditing = editingId === entry.id
          if (isEditing) {
            return (
              <input
                key={entry.id}
                ref={inputRef}
                type="text"
                value={draft}
                maxLength={charCap}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commitEditor}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                aria-label="Edit your entry"
                style={{
                  minWidth: 180,
                  flex: '1 1 220px',
                  fontFamily: 'inherit',
                  fontSize: 'var(--text-body-sm)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--color-accent)',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text-primary)',
                  outline: 'none',
                }}
              />
            )
          }
          return (
            <span
              key={entry.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: '8px 6px 8px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px dashed var(--color-accent)',
                background: 'var(--color-accent-light)',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--text-body-sm)',
                fontWeight: 600,
                lineHeight: 1.3,
                maxWidth: '100%',
              }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 240 }}>
                {entry.text}
              </span>
              <button
                type="button"
                onClick={() => startEditing(entry)}
                aria-label={`Edit "${entry.text}"`}
                title="Edit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 22,
                  height: 22,
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--color-accent)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                <PencilIcon />
              </button>
              <button
                type="button"
                onClick={() => removeEntry(entry.id)}
                aria-label={`Remove "${entry.text}"`}
                title="Remove"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 22,
                  height: 22,
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                <CloseIcon />
              </button>
            </span>
          )
        })}

        {adding && (
          <input
            ref={inputRef}
            type="text"
            value={draft}
            maxLength={charCap}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEditor}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Add your own"
            style={{
              minWidth: 220,
              flex: '1 1 260px',
              fontFamily: 'inherit',
              fontSize: 'var(--text-body-sm)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--color-accent)',
              background: 'var(--color-bg)',
              color: 'var(--color-text-primary)',
              outline: 'none',
            }}
          />
        )}

        {!editorOpen && (
          <button
            type="button"
            onClick={startAdding}
            disabled={!canAdd}
            aria-label={addLabel}
            title={
              !canAdd && addCapReached
                ? 'You have reached this step’s selection cap. Remove one to add your own.'
                : atMax
                ? `Up to ${max} of your own per step. Edit or remove one to add another.`
                : addLabel
            }
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px dashed var(--color-border)',
              background: 'transparent',
              color: canAdd ? 'var(--color-accent)' : 'var(--color-text-muted)',
              fontFamily: 'inherit',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 600,
              cursor: canAdd ? 'pointer' : 'not-allowed',
              opacity: canAdd ? 1 : 0.6,
            }}
          >
            <span aria-hidden="true">＋</span>
            {addLabel}
          </button>
        )}
      </div>
    </div>
  )
}
