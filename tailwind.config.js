/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        container: 'var(--container-max)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        pill: 'var(--radius-full)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glow: 'var(--shadow-glow)',
        'glow-accent': 'var(--shadow-glow-accent)',
      },
      colors: {
        accent:           'var(--color-accent)',
        'accent-hover':   'var(--color-accent-hover)',
        'accent-light':   'var(--color-accent-light)',
        'accent-dark':    'var(--color-accent-dark)',
        bg:               'var(--color-bg)',
        'bg-subtle':      'var(--color-bg-subtle)',
        'bg-dark':        'var(--color-bg-dark)',
        'bg-dark-subtle': 'var(--color-bg-dark-subtle)',
        'text-primary':   'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted':     'var(--color-text-muted)',
        'text-inverse':   'var(--color-text-inverse)',
        border:           'var(--color-border)',
        'border-strong':  'var(--color-border-strong)',
        'border-dark':    'var(--color-border-dark)',
        rose:             'var(--color-rose)',
        amber:            'var(--color-amber)',
        teal:             'var(--color-teal)',
        green:            'var(--color-green)',
        coral:            'var(--color-coral)',
      },
    },
  },
  plugins: [],
}
