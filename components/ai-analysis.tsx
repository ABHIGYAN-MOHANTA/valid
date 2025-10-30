"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Section = {
  title: string
  content: string
}

function extractSections(insights: string): Section[] {
  const lines = insights.split(/\r?\n/)
  const sections: Section[] = []
  let current: Section | null = null

  const headingRegex = /^\*\*?\s*(\d+\.|Final Advice|Key takeaway|Go-To-Market|Strongest Competitive Advantages|Critical Vulnerabilities).*?\*\*?/i

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      if (current) current.content += "\n"
      continue
    }
    // Accept either bold-style headings or markdown '##' headings
    if (headingRegex.test(line) || /^##\s*/.test(line)) {
      if (current) sections.push(current)
      const cleanTitle = line
        .replace(/^##\s*/, '')
        .replace(/^\*\*/,'')
        .replace(/\*\*$/,'')
        .replace(/^\*\s*/, '')
      current = { title: cleanTitle, content: "" }
    } else {
      if (!current) {
        current = { title: "Overview", content: line + "\n" }
      } else {
        current.content += line + "\n"
      }
    }
  }
  if (current) sections.push(current)
  return sections
}

export function AiAnalysis({ insights }: { insights: string }) {
  const sections = extractSections(insights)

  // Derive badges from content cues
  const badges: string[] = []
  if (/Refinement Needed/i.test(insights)) badges.push("Refinement Needed")
  if (/Proceed with Caution/i.test(insights)) badges.push("Proceed with Caution")
  if (/Niche Focus/i.test(insights)) badges.push("Niche Focus")
  if (/Do NOT build/i.test(insights)) badges.push("Validation First")

  return (
    <div className="space-y-6">
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <Badge key={b} className="text-xs border-border/50 bg-muted/30 text-foreground">
              {b}
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {sections.map((s, idx) => (
          <Card key={idx} className="p-5 border-border/50 bg-card/50">
            <h3 className="text-lg font-semibold mb-3 text-foreground">
              {s.title.replace(/^\*\*/g, '').replace(/\*\*$/g, '')}
            </h3>
            <Separator className="my-3" />
            <div className="space-y-2 text-sm leading-6 text-foreground">
              {s.content
                .split(/\n+/)
                .filter(Boolean)
                .map((line, i) => {
                  // Bullet points
                  if (/^[-*]\s/.test(line)) {
                    return (
                      <div key={i} className="flex gap-2 items-start">
                        <div className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <p className="whitespace-pre-wrap">{line.replace(/^[-*]\s/, '')}</p>
                      </div>
                    )
                  }
                  // Key takeaway callout
                  if (/^\*\*?Key takeaway\:?/i.test(line)) {
                    return (
                      <div key={i} className="rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-amber-200">
                        {line.replace(/^\*\*?Key takeaway\:?\s*/i, "Key takeaway: ")}
                      </div>
                    )
                  }
                  // Experiments timeline-ish style
                  if (/^(\*\*)?Experiment\s*\d+/i.test(line)) {
                    return (
                      <div key={i} className="relative pl-6">
                        <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary" />
                        <p className="font-medium">{line.replace(/^\*\*/, '').replace(/\*\*$/, '')}</p>
                      </div>
                    )
                  }
                  // Default paragraph
                  return (
                    <p key={i} className="whitespace-pre-wrap">
                      {line}
                    </p>
                  )
                })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AiAnalysis


