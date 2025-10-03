import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/pricing-section"

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
