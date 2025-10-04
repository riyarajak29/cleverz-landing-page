"use client"

import RequireAuth from "@/components/require-auth"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Atom, FlaskConical, SquareDot as SquareRoot } from "lucide-react"
import { useRouter } from "next/navigation"

const subjects = [
  { key: "physics", label: "Physics", icon: Atom, progress: 48 },
  { key: "chemistry", label: "Chemistry", icon: FlaskConical, progress: 62 },
  { key: "mathematics", label: "Mathematics", icon: SquareRoot, progress: 58 },
]

export default function SubjectsPage() {
  const router = useRouter()
  return (
    <RequireAuth>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon size={16} /> {s.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{s.progress}% complete</CardContent>
              <CardFooter>
                <Button onClick={() => router.push(`/subjects/${s.key}`)}>View Topics</Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </RequireAuth>
  )
}
