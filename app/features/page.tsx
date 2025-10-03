import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FeaturesGrid } from "@/components/features-grid"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <FeaturesGrid />
      </main>
      <Footer />
    </div>
  )
}
