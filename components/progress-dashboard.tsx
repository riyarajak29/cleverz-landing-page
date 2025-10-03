"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Flame, Target, BookOpen, Award, TrendingUp } from "lucide-react"
import useSWR from "swr"

// Mock data fetcher with dynamic values
const fetcher = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        streak: Math.floor(Math.random() * 30) + 10,
        points: Math.floor(Math.random() * 5000) + 2000,
        dailyGoal: 80,
        subjects: [
          { name: "Physics", progress: Math.floor(Math.random() * 40) + 60, color: "text-blue-500" },
          { name: "Chemistry", progress: Math.floor(Math.random() * 40) + 50, color: "text-green-500" },
          { name: "Math", progress: Math.floor(Math.random() * 40) + 55, color: "text-purple-500" },
        ],
        leaderboard: [
          { rank: 1, name: "Arjun Sharma", points: 8950 },
          { rank: 2, name: "Priya Patel", points: 8720 },
          { rank: 3, name: "You", points: Math.floor(Math.random() * 1000) + 7500, isUser: true },
          { rank: 4, name: "Rahul Kumar", points: 7380 },
          { rank: 5, name: "Sneha Singh", points: 7200 },
        ],
        tipOfDay: "Focus on weak areas during your peak energy hours for maximum retention.",
        questionOfDay:
          "A particle moves with constant acceleration. If it travels 100m in 5s, what is its acceleration?",
      })
    }, 500)
  })
}

export function ProgressDashboard() {
  const { data, isLoading } = useSWR("progress", fetcher, {
    refreshInterval: 5000, // Refresh every 5 seconds for demo
  })

  if (isLoading || !data) {
    return (
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Your Progress</h1>
          <Badge variant="secondary" className="gap-1">
            <TrendingUp className="size-3" />
            On Track
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Flame className="size-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold animate-count-up">{data.streak} days</div>
              <p className="text-xs text-muted-foreground mt-1">Keep it going!</p>
            </CardContent>
          </Card>

          <Card className="transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="size-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold animate-count-up">{data.points.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">+127 today</p>
            </CardContent>
          </Card>

          <Card className="transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Daily Goal</CardTitle>
              <Target className="size-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold animate-count-up">{data.dailyGoal}%</div>
              <Progress value={data.dailyGoal} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="size-5" />
                Subject Progress
              </CardTitle>
              <CardDescription>Track your mastery across subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.subjects.map((subject: any) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{subject.name}</span>
                    <span className={`text-sm font-bold ${subject.color}`}>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="size-5" />
                Leaderboard
              </CardTitle>
              <CardDescription>Top performers this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.leaderboard.map((user: any) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      user.isUser ? "bg-primary/10 font-semibold" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center size-8 rounded-full text-sm font-bold ${
                          user.rank === 1
                            ? "bg-yellow-500 text-white"
                            : user.rank === 2
                              ? "bg-gray-400 text-white"
                              : user.rank === 3
                                ? "bg-orange-600 text-white"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.rank}
                      </div>
                      <span className="text-sm">{user.name}</span>
                    </div>
                    <span className="text-sm font-medium">{user.points.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tip of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.tipOfDay}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{data.questionOfDay}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
