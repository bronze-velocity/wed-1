import { Suspense } from 'react'
import './globals.css'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/consent/CookieBanner'
import MoodboardPill from '@/components/ui/MoodboardPill'
import PostHogProvider from '@/components/analytics/PostHogProvider'

export const metadata = {
  title: {
    default: 'Wepho',
    template: '%s — Wepho',
  },
  description: 'Custom wedding experience apps built for your guests.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Cabin:wght@400;500;600;700&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[family-name:var(--font-body)]">
        <NavBar />
        {children}
        <Footer />
        <MoodboardPill />
        <CookieBanner />
        <Suspense fallback={null}>
          <PostHogProvider />
        </Suspense>
      </body>
    </html>
  )
}
