'use client'

import { useState } from 'react'
import FreeformField from './FreeformField'

export default function OptionalFreeform({ triggerLabel, label, hint, value, onChange }) {
  const [open, setOpen] = useState(Boolean(value))

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          background: 'none',
          border: 'none',
          padding: 0,
          fontFamily: 'inherit',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 600,
          color: 'var(--color-accent)',
          cursor: 'pointer',
        }}
      >
        <span aria-hidden="true">＋</span>
        {triggerLabel}
      </button>
    )
  }

  return <FreeformField label={label} hint={hint} value={value} onChange={onChange} />
}
