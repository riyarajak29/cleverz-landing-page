"use client"

import RequireAuth from "@/components/require-auth"
import { useMemo, useState } from "react"
import { getMonthMatrix, prettyDate } from "@/lib/day"
import { Card } from "@/components/ui/card"

export default function CalendarPage() {
  const matrix = useMemo(() => getMonthMatrix(new Date()), [])
  const [selected, setSelected] = useState<Date | null>(new Date())

  function statusForDate(d: Date) {
    const day = d.getDate()
    if (day % 7 === 0) return "missed"
    if (day % 3 === 0) return "partial"
    if (day <= new Date().getDate()) return "achieved"
    return "future"
  }

  return (
    <RequireAuth>
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <Card className="p-4">
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {matrix.map((week, wi) =>
              week.map((d, di) => {
                if (!d) return <div key={`${wi}-${di}`} />
                const s = statusForDate(d)
                const color =
                  s === "achieved"
                    ? "bg-emerald-500"
                    : s === "partial"
                      ? "bg-amber-500"
                      : s === "missed"
                        ? "bg-rose-500"
                        : "bg-muted"
                return (
                  <button
                    key={`${wi}-${di}`}
                    onClick={() => setSelected(d)}
                    className="grid place-items-center rounded border py-3 text-xs"
                  >
                    <span>{d.getDate()}</span>
                    <span className={`mt-1 inline-block h-2 w-2 rounded-full ${color}`} />
                  </button>
                )
              }),
            )}
          </div>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="font-medium">Details</div>
          <div className="text-sm text-muted-foreground">{selected ? prettyDate(selected) : "Pick a date"}</div>
          <div className="text-sm">Questions solved: 24</div>
          <div className="text-sm">Study time: 1h 10m</div>
          <div className="text-sm">Topics covered: 3</div>
          <div className="text-sm">Accuracy: 72%</div>
        </Card>
      </div>
    </RequireAuth>
  )
}
