"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

function secondsUntilMidnight() {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return Math.max(0, Math.floor((tomorrow.getTime() - now.getTime()) / 1000))
}

export function QOTDModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const [selected, setSelected] = React.useState<string | null>(null)
  const [submitted, setSubmitted] = React.useState(false)
  const [remaining, setRemaining] = React.useState(secondsUntilMidnight())

  React.useEffect(() => {
    const id = setInterval(() => setRemaining((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const correct = "B"
  const hrs = Math.floor(remaining / 3600)
  const mins = Math.floor((remaining % 3600) / 60)
  const secs = remaining % 60

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Question of the Day</DialogTitle>
          <div className="text-xs text-muted-foreground">
            Next question in {hrs}h {mins}m {secs}s
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm">
            A particle moves in a circle with constant speed. Which vector is always directed towards the center?
          </div>
          <RadioGroup value={selected ?? ""} onValueChange={setSelected} className="grid gap-2">
            {["A. Velocity", "B. Acceleration", "C. Displacement", "D. Momentum"].map((opt) => {
              const val = opt[0]!
              return (
                <div key={val} className="flex items-center gap-2 rounded-md border p-2">
                  <RadioGroupItem id={`q-${val}`} value={val} />
                  <Label htmlFor={`q-${val}`} className="text-sm cursor-pointer">
                    {opt}
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
          {submitted && (
            <div
              className={`text-sm ${selected === correct ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {selected === correct ? "Correct!" : `Incorrect. Correct answer: ${correct}`}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button disabled={!selected} onClick={() => setSubmitted(true)}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
