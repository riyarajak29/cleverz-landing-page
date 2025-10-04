"use client"

import RequireAuth from "@/components/require-auth"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const QUESTIONS = [
  { q: "Which of the following is a vector?", options: ["Speed", "Distance", "Displacement", "Work"], a: 2 },
  { q: "The SI unit of force is:", options: ["Newton", "Joule", "Watt", "Pascal"], a: 0 },
]

export default function QuizPage() {
  const [i, setI] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const done = i >= QUESTIONS.length

  return (
    <RequireAuth>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Quick Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {!done ? (
            <>
              <div className="text-sm">{QUESTIONS[i].q}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                {QUESTIONS[i].options.map((opt, idx) => (
                  <Button
                    key={idx}
                    variant={choice === idx ? "default" : "outline"}
                    onClick={() => setChoice(idx)}
                    className="justify-start"
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-sm">Great job! You’ve completed the quiz.</div>
          )}
        </CardContent>
        <CardFooter className="justify-end">
          {!done ? (
            <Button
              onClick={() => {
                setI(i + 1)
                setChoice(null)
              }}
              disabled={choice === null}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => {
                setI(0)
                setChoice(null)
              }}
            >
              Restart
            </Button>
          )}
        </CardFooter>
      </Card>
    </RequireAuth>
  )
}
