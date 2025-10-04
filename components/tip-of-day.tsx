"use client"

const TIPS = [
  "Space practice: revisit tough problems after short breaks.",
  "Focus on accuracy before speed; precision compounds.",
  "Summarize each topic in 5 bullet points to cement memory.",
  "Teach someone else—explaining exposes gaps quickly.",
  "Timebox practice sets: 25-minute sprints, 5-minute breaks.",
  "Keep an error log and revisit it weekly.",
  "Alternate subjects to avoid mental fatigue.",
]

function dayOfYear(d = new Date()) {
  const start = new Date(d.getFullYear(), 0, 0)
  const diff = d.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export function TipOfDay() {
  const index = dayOfYear() % TIPS.length
  return <span className="text-sm text-muted-foreground">{TIPS[index]}</span>
}
