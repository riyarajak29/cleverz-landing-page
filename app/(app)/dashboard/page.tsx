"use client"

import RequireAuth from "@/components/require-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Atom, FlaskConical, SquareDot as SquareRoot, Clock, Flame, CheckCircle2, Target } from "lucide-react"
import { useMemo } from "react"
import { getDayOfYear } from "@/lib/day"
import { QOTD } from "@/data/qotd"
import { TIPS } from "@/data/tips"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()
  const index = useMemo(() => getDayOfYear(new Date()), [])
  const question = QOTD[index % QOTD.length]
  const tip = TIPS[index % TIPS.length]

  return (
    <RequireAuth>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-r from-[var(--brand)] to-[var(--brand-accent)] text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Welcome back{user?.username ? `, ${user.username}` : "!"}</CardTitle>
            <div className="size-9 rounded-full bg-white/20 grid place-items-center overflow-hidden">
              {user?.avatar ? (
                // note: Next.js permits img tags; Image also works if available
                <img src={user.avatar || "/placeholder.svg"} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs font-medium uppercase">{user?.username?.slice(0, 2) || "U"}</span>
              )}
            </div>
          </CardHeader>
          <CardContent className="text-sm opacity-90">Keep up the momentum. Your goals are within reach.</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-sm text-muted-foreground">56% complete</div>
            <Progress value={56} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Atom size={16} /> Physics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={48} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical size={16} /> Chemistry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={62} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SquareRoot size={16} /> Mathematics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={58} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Question of the Day</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">{question.q}</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {question.options.map((opt, i) => (
                <Button key={i} variant="outline" className="justify-start bg-transparent">
                  {opt}
                </Button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">New QOTD in ~24 hours</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tip of the Day</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">{tip}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} /> Today: 1h 20m
            </div>
            <div className="flex items-center gap-2">
              <Flame size={16} /> Streak: 4 days
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} /> Solved: 32
            </div>
            <div className="flex items-center gap-2">
              <Target size={16} /> Accuracy: 74%
            </div>
          </CardContent>
        </Card>
      </div>
    </RequireAuth>
  )
}
