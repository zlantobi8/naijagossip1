// components/RouteProgress.tsx
"use client"

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function RouteProgress() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.start()

    // Simulate loading for visual purposes
    const timeout = setTimeout(() => {
      NProgress.done()
    }, 300) // You can customize this

    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
