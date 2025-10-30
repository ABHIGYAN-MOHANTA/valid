"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-md border border-border/50 bg-card/60 px-3 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-card/80"
    >
      <span className="h-4 w-4 inline-block">
        {isDark ? (
          // sun icon
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 18a6 6 0 110-12 6 6 0 010 12zm0-16a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM3 11a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm16 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM5.636 5.636a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM16.243 16.243a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM5.636 18.364a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM16.243 7.757a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0z"/></svg>
        ) : (
          // moon icon
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        )}
      </span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  )
}


