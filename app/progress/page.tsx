import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProgressDashboard } from "@/components/progress-dashboard"

export default function ProgressPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <ProgressDashboard />
      </main>
      <Footer />
    </div>
  )
}
