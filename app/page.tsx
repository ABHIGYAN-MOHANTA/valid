"use client"

import { useState, useRef, useEffect } from "react"
import { ValidatorForm } from "@/components/validator-form"
import { ResultsDisplay } from "@/components/results-display"
import { Header } from "@/components/header"

export default function Home() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const resultsRef = useRef(null)

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [results])

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-slate-50 dark:to-slate-950">
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {!results ? (
          <ValidatorForm onSubmit={handleSubmit} loading={loading} />
        ) : (
          <div ref={resultsRef}>
            <ResultsDisplay results={results} onReset={() => setResults(null)} />
          </div>
        )}
      </div>
    </main>
  )
}
