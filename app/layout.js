import './globals.css'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'

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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[family-name:var(--font-sans)]">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
