'use client'

import { useState } from 'react'

const APP_OPTIONS = [
  'Not sure yet',
  'Live "How Well Do You Know Us?" Trivia',
  'Venue Scavenger Hunt with Their Love Story',
  'Anniversary Time Capsule',
  'Guest Bucket List Builder',
  'Table-Specific Conversation Starter Cards',
  'The Prediction Vault',
  'Guest Memory Map',
  'The Live Roast Board',
  "The Couple's Unpopular Opinions Icebreaker",
  'The First Dance Reveal Ballot',
  'Custom Wedding Bingo',
  'The Guest Advice Oracle',
  'The Relationship Origin Story Exhibit',
  'Design Our Future Home Map',
  'The Collaborative Soundtrack',
  'The Unprompted Love Letter Machine',
  'Wedding Day Emotion Pulse',
  'Table-to-Table Secret Relay',
  'The Personalized Cocktail Quiz',
  'The Parallel Universe Game',
]

const CUSTOM_OPTION = 'I have my own idea'

export default function ContactForm({ appName }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weddingDate: '',
    appInterest: appName || 'Not sure yet',
    customIdea: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function validate() {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address'
    }
    if (!formData.message.trim()) errs.message = 'Message is required'
    if (formData.appInterest === CUSTOM_OPTION && !formData.customIdea.trim()) {
      errs.customIdea = 'Tell us your idea'
    }
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStatus('loading')
    const payload = {
      ...formData,
      appInterest:
        formData.appInterest === CUSTOM_OPTION
          ? `Custom idea: ${formData.customIdea.trim()}`
          : formData.appInterest,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <p
          className="font-bold mb-2"
          style={{ fontSize: 'var(--text-h3)', color: 'var(--color-text-inverse)' }}
        >
          We&apos;ll be in touch within 48 hours.
        </p>
        <p style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-inverse-secondary)' }}>
          — The Wepho team
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col"
      style={{ gap: 'var(--space-5)' }}
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ gap: 'var(--space-5)' }}
      >
        <FormField label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={fieldInputClass(!!errors.name)}
          />
        </FormField>
        <FormField label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={fieldInputClass(!!errors.email)}
          />
        </FormField>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ gap: 'var(--space-5)' }}
      >
        <FormField label="Wedding date" optional>
          <input
            id="weddingDate"
            name="weddingDate"
            type="date"
            value={formData.weddingDate}
            onChange={handleChange}
            className={fieldInputClass(false)}
          />
        </FormField>
        <FormField label="Which app?">
          <select
            id="appInterest"
            name="appInterest"
            value={formData.appInterest}
            onChange={handleChange}
            className={fieldInputClass(false)}
          >
            {APP_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
            <option value={CUSTOM_OPTION}>{CUSTOM_OPTION}</option>
          </select>
        </FormField>
      </div>

      {formData.appInterest === CUSTOM_OPTION && (
        <FormField label="Your idea" error={errors.customIdea}>
          <input
            id="customIdea"
            name="customIdea"
            type="text"
            value={formData.customIdea}
            onChange={handleChange}
            placeholder="Describe the app you're imagining"
            className={fieldInputClass(!!errors.customIdea)}
          />
        </FormField>
      )}

      <FormField label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your wedding — date, venue, what you're imagining."
          rows={4}
          className={fieldInputClass(!!errors.message)}
        />
      </FormField>

      {status === 'error' && (
        <p className="text-rose" style={{ fontSize: 'var(--text-body-sm)' }}>
          Something went wrong. Try again or{' '}
          <a href="mailto:hello@wepho.com" className="underline">
            email us directly
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 w-full flex items-center justify-center gap-3 font-semibold text-white transition-colors duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          background: 'var(--color-accent)',
          padding: 'var(--space-4) var(--space-6)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--text-body-lg)',
        }}
      >
        {status === 'loading' ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Sending…
          </>
        ) : (
          'Book your app →'
        )}
      </button>
    </form>
  )
}

function FormField({ label, children, error, optional }) {
  return (
    <div>
      <label
        className="block mb-2 uppercase tracking-wide font-medium"
        style={{ fontSize: 'var(--text-label)', color: 'var(--color-text-inverse-secondary)' }}
      >
        {label}
        {optional && (
          <span
            className="normal-case ml-1"
            style={{ color: 'var(--color-text-muted)', textTransform: 'none' }}
          >
            (optional)
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-rose" style={{ fontSize: 'var(--text-tiny)' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function fieldInputClass(hasError) {
  return hasError ? 'contact-field contact-field--error' : 'contact-field'
}
