'use client'

import { useState } from 'react'
import CookieSettings from './CookieSettings'

export default function CookiePreferencesLink({ style, className }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          font: 'inherit',
          textAlign: 'left',
          ...style,
        }}
      >
        Cookie preferences
      </button>
      {open && (
        <CookieSettings onClose={() => setOpen(false)} />
      )}
    </>
  )
}
