'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ContactLink({ onClick, children, ...props }) {
  const pathname = usePathname()

  function handleClick(e) {
    if (onClick) onClick(e)
    if (pathname === '/') {
      e.preventDefault()
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (window.location.hash !== '#contact') {
        history.replaceState(null, '', '/#contact')
      }
    }
  }

  return (
    <Link {...props} href="/#contact" onClick={handleClick}>
      {children}
    </Link>
  )
}
