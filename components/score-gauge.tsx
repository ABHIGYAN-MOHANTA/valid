"use client"

export function ScoreGauge({ score }) {
  const percentage = (score / 80) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getColor = (score) => {
    if (score >= 65) return "#16a34a"
    if (score >= 45) return "#d97706"
    if (score >= 30) return "#ea580c"
    return "#dc2626"
  }

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={getColor(score)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{percentage.toFixed(0)}%</div>
            <div className="text-xs text-muted-foreground">Viability</div>
          </div>
        </div>
      </div>
    </div>
  )
}
