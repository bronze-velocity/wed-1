'use client'

import { useId, useRef, useEffect, useState } from 'react'

export default function FreeformField({
  label,
  hint,
  value = '',
  onChange,
  onSkip,
}) {
  const [focused, setFocused] = useState(false)
  const id = useId()
  const ref = useRef(null)

  const floated = focused || value.length > 0
  const showCounter = value.length >= 200

  useEffect(() => {
    if (ref.current && value) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [])

  function handleChange(e) {
    onChange(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <div>
      <div
        onClick={() => ref.current?.focus()}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-bg-subtle)',
          border: `1.5px solid ${focused ? 'var(--color-accent)' : 'transparent'}`,
          paddingTop: floated ? 'var(--space-6)' : 'var(--space-4)',
          paddingBottom: 'var(--space-4)',
          paddingLeft: 'var(--space-4)',
          paddingRight: 'var(--space-4)',
          cursor: 'text',
          transition: 'border-color 200ms ease, padding-top 200ms ease',
        }}
      >
        <label
          htmlFor={id}
          style={{
            position: 'absolute',
            left: 'var(--space-4)',
            top: floated ? 'var(--space-2)' : 'var(--space-4)',
            fontSize: floated ? 'var(--text-tiny)' : 'var(--text-body)',
            fontWeight: 600,
            color: focused ? 'var(--color-accent)' : 'var(--color-text-muted)',
            pointerEvents: 'none',
            lineHeight: 1.2,
            transition: 'top 200ms ease, font-size 200ms ease, color 200ms ease',
          }}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={hint}
          rows={1}
          className="moodboard-field"
          style={{
            display: 'block',
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: 16,
            fontFamily: 'inherit',
            color: 'var(--color-text-primary)',
            lineHeight: 1.6,
            overflow: 'hidden',
            minHeight: 28,
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'var(--space-2)',
          paddingInline: 'var(--space-1)',
          minHeight: 20,
        }}
      >
        {onSkip ? (
          <button
            type="button"
            onClick={onSkip}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Skip
          </button>
        ) : (
          <span />
        )}
        {showCounter && (
          <span style={{ fontSize: 'var(--text-tiny)', color: 'var(--color-accent)' }}>
            {value.length}
          </span>
        )}
      </div>
    </div>
  )
}
