"use client"
import { ThemeToggle } from "./theme-toggle"
export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-2 print:hidden">
            <h1 className="text-4xl font-bold text-foreground">Valid</h1>
            <p className="text-muted-foreground text-lg">Validate your saas idea with intelligent analysis</p>
          </div>
          {/* Theme toggle stays visible, including during print */}
          <div className="ml-auto print:hidden">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
