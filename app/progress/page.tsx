"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProgressDashboard } from "@/components/progress-dashboard"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { useEffect, useState } from "react"

export default function ProgressPage() {
  const { user, setShowAuthModal } = useAuth()
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    if (user) {
      // Fetch user progress from backend or local storage
      fetch(`/api/progress?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setProgress(data))
    }
  }, [user])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {!user ? (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <div className="max-w-xl mx-auto space-y-6">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-2">
                <Lock className="size-7 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Progress is locked</h1>
              <p className="text-muted-foreground">
                Sign in to access your streaks, points, badges, and personalized analytics.
              </p>
              <div className="pt-2">
                <Button onClick={() => setShowAuthModal(true)}>Sign in to continue</Button>
              </div>
            </div>
          </section>
        ) : (
          <ProgressDashboard progress={progress} />
        )}
      </main>
      <Footer />
    </div>
  )
}
