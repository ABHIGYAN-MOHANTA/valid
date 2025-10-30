"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScoreGauge } from "./score-gauge"
import { AiAnalysis } from "./ai-analysis"

type SectionScore = { score: number; max: number }
type ScoresRecord = Record<string, SectionScore>
type Results = {
  scores: ScoresRecord
  totalScore: number
  zone: string
  insights: string
}

export function ResultsDisplay({ results, onReset }: { results: Results; onReset: () => void }) {
  const { scores, totalScore, zone, insights } = results

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case "Launch Ready":
        return "text-green-600 dark:text-green-400"
      case "Refinement Needed":
        return "text-amber-600 dark:text-amber-400"
      case "Major Rework":
        return "text-orange-600 dark:text-orange-400"
      case "Not Viable":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-foreground"
    }
  }

  const getZoneBg = (zone: string) => {
    switch (zone) {
      case "Launch Ready":
        return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
      case "Refinement Needed":
        return "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800"
      case "Major Rework":
        return "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800"
      case "Not Viable":
        return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
      default:
        return "bg-card border-border"
    }
  }

  return (
    <div className="space-y-8">
      {/* Score Summary */}
      <Card className="p-8 border-border/50 bg-card/50 backdrop-blur print-avoid-break">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-foreground">Your Valid Score</h2>
            <p className="text-muted-foreground mb-6">Comprehensive viability assessment across all dimensions</p>
            <div className={`p-6 rounded-lg border-2 ${getZoneBg(zone)}`}>
              <div className="text-5xl font-bold mb-2">
                <span className={getZoneColor(zone)}>{totalScore}</span>
                <span className="text-2xl text-muted-foreground">/80</span>
              </div>
              <p className={`text-xl font-semibold ${getZoneColor(zone)}`}>{zone}</p>
            </div>
          </div>
          <ScoreGauge score={totalScore} />
        </div>
      </Card>

      {/* Section Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(scores).map(([section, data]) => (
          <Card key={section} className="p-6 border-border/50 bg-card/50 backdrop-blur print-avoid-break">
            <h3 className="font-semibold text-foreground mb-3 capitalize">
              {section.replace(/([A-Z])/g, " $1").trim()}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Score</span>
                <span className="text-2xl font-bold text-primary">
                  {data.score}/{data.max}
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(data.score / data.max) * 100}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card className="p-8 border-border/50 bg-card/50 backdrop-blur print-avoid-break">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">AI Analysis</h2>
        <AiAnalysis insights={insights} />
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col items-stretch gap-3 pt-4 print:hidden sm:flex-row sm:justify-center">
        <Button
          onClick={() => typeof window !== "undefined" && window.print()}
          className="w-full sm:w-auto px-8 py-6 text-lg font-semibold"
        >
          Export as PDF
        </Button>
        <Button onClick={onReset} variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg font-semibold bg-transparent">
          Evaluate Another Concept
        </Button>
      </div>
    </div>
  )
}
