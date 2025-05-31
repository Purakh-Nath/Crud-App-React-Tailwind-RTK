"use client"
import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768 // Example: Tailwind's `md` breakpoint (tablets and below)

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Ensure window is defined (for SSR/Node.js environments)
    if (typeof window === "undefined") {
      return
    }

    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check
    checkDevice()

    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return isMobile
}
