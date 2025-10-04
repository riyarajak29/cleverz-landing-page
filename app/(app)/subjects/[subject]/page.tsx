"use client"

import { useParams } from "next/navigation"
import RequireAuth from "@/components/require-auth"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { useState } from "react"
import { ChatbotModal } from "@/components/chatbot-modal"

const sampleTopics = [
  { name: "Mechanics", completion: 45, questions: 210, difficulty: "Medium" },
  { name: "Kinematics", completion: 62, questions: 180, difficulty: "Easy" },
  { name: "Thermodynamics", completion: 38, questions: 150, difficulty: "Hard" },
]

export default function SubjectTopicsPage() {
  const { subject } = useParams<{ subject: string }>()
  const [ask, setAsk] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  return (
    <RequireAuth>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold capitalize">{subject}</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleTopics.map((t) => (
          <Card key={t.name} className="group relative">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{t.name}</span>
                <button
                  className="opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:text-foreground"
                  onClick={() => setAsk(t.name)}
                  aria-label={`Ask chatbot about ${t.name}`}
                >
                  <MessageSquare size={16} />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div>Completion: {t.completion}%</div>
              <div>Questions: {t.questions}</div>
              <div>Difficulty: {t.difficulty}</div>
            </CardContent>
            <CardFooter>
              <Button>Practice Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ChatbotModal open={!!ask} onOpenChange={(o) => !o && setAsk(null)} subject={ask ?? undefined} docked />
    </RequireAuth>
  )
}
