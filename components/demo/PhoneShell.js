'use client'

import { IPHONE } from './deviceSpec'

// Shared iPhone-shaped device chrome: notch, a fixed-ratio screen that
// scrolls internally like a real phone, and the home indicator. Callers pass
// the screen content as children and own its inner padding.
export default function PhoneShell({ children, screenBg = 'var(--color-bg)' }) {
  return (
    <div
      style={{
        width: IPHONE.width,
        aspectRatio: IPHONE.aspectRatio,
        background: IPHONE.frameBg,
        borderRadius: IPHONE.radius,
        border: IPHONE.bezel,
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Notch */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 14,
        paddingBottom: 10,
      }}>
        <div style={{
          width: IPHONE.notch.width,
          height: IPHONE.notch.height,
          background: '#111',
          borderRadius: 'var(--radius-lg)',
        }} />
      </div>

      {/* Screen */}
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        background: screenBg,
        margin: '0 4px',
      }}>
        {children}
      </div>

      {/* Home indicator */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 0 14px',
      }}>
        <div style={{
          width: IPHONE.homeIndicator.width,
          height: IPHONE.homeIndicator.height,
          background: '#3A3A3A',
          borderRadius: 'var(--radius-sm)',
        }} />
      </div>
    </div>
  )
}
