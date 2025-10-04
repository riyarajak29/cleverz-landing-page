"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SubjectsSidebar, getTopicsFor, type SubjectKey } from "@/components/subjects-sidebar"
import { TopicCard, type TopicInfo } from "@/components/topic-card"
import { CircularProgress } from "@/components/circular-progress"
import { Heatmap } from "@/components/heatmap"
import { StreakWidget } from "@/components/streak-widget"
import { TipOfDay } from "@/components/tip-of-day"
import { QOTDModal } from "@/components/qotd-modal"
import { PracticeModal } from "@/components/practice-modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { useMemo, useState } from "react"

export default function SubjectsPage() {
  const { user, setShowAuthModal } = useAuth()
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey>("Physics")
  const [qotdOpen, setQotdOpen] = useState(false)
  const [practiceOpen, setPracticeOpen] = useState(false)
  const [practiceTopic, setPracticeTopic] = useState<string | null>(null)

  const plan: "free" | "premium" = (user as any)?.plan === "premium" ? "premium" : "free"

  const topics: TopicInfo[] = useMemo(() => {
    const base = getTopicsFor(selectedSubject)
    return base.map((t, idx) => {
      const h = Array.from(t.name).reduce((acc, c) => acc + c.charCodeAt(0), 0)
      const completion = (h % 71) + 20 // 20..90
      const mod = (h + idx) % 3
      const difficulty = mod === 0 ? "Easy" : mod === 1 ? "Medium" : "Hard"
      return { name: t.name, completion, difficulty }
    })
  }, [selectedSubject])

  const subjectProgress = Math.round(topics.reduce((sum, t) => sum + t.completion, 0) / Math.max(1, topics.length))

  const heatmapData = useMemo(() => {
    const days = 56
    const arr: number[] = []
    let seed = 17 * subjectProgress
    for (let i = 0; i < days; i++) {
      seed = (seed * 48271) % 0x7fffffff
      arr.push((seed % 6) as number)
    }
    return arr
  }, [subjectProgress])

  function onPractice(topic: TopicInfo) {
    setPracticeTopic(topic.name)
    setPracticeOpen(true)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="max-w-xl mx-auto space-y-6">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-2">
                <Lock className="size-7 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Subjects are locked</h1>
              <p className="text-muted-foreground">Sign in to choose a subject and start learning with the AI tutor.</p>
              <div className="pt-2">
                <Button onClick={() => setShowAuthModal(true)}>Sign in to continue</Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="container mx-auto flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-balance">{selectedSubject}</h1>
            <TipOfDay />
          </div>
          <div className="flex items-center gap-3">
            <StreakWidget streak={3} />
            <Button variant="outline" onClick={() => setQotdOpen(true)}>
              Answer QOTD
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={(user as any)?.avatarUrl || ""} alt="User avatar" />
                <AvatarFallback>{(user?.name?.[0] || "U").toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user?.name ?? "You"}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[260px,1fr] lg:grid-cols-[288px,1fr] gap-8">
          <SubjectsSidebar selectedSubject={selectedSubject} onSelect={(sub) => setSelectedSubject(sub)} />

          <section className="space-y-8">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-4">
                <CircularProgress value={subjectProgress} label="Subject" />
                <div className="text-sm text-muted-foreground max-w-xs">
                  Your average completion across topics in {selectedSubject}. Keep momentum going!
                </div>
              </div>
              <div className="ml-auto">
                <Heatmap data={heatmapData} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Topics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topics.map((t) => (
                  <TopicCard key={t.name} topic={t} onPractice={onPractice} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      <QOTDModal open={qotdOpen} onOpenChange={setQotdOpen} />
      <PracticeModal open={practiceOpen} onOpenChange={setPracticeOpen} topic={practiceTopic} plan={plan} />
    </div>
  )
}
