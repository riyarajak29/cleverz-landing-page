import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SubjectsGrid } from "@/components/subjects-grid"

export default function SubjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <SubjectsGrid />
      </main>
      <Footer />
    </div>
  )
}
