"use client"

import { Flame } from "lucide-react"

export function StreakWidget({ streak = 3 }: { streak?: number }) {
  return (
    <div className="flex items-center gap-2 rounded-md border p-3">
      <Flame className="size-5 text-(--primary)" aria-hidden />
      <div>
        <div className="text-sm font-semibold">{streak}-day streak</div>
        <div className="text-xs text-muted-foreground">Solve at least 1 question daily to keep it alive</div>
      </div>
    </div>
  )
}
