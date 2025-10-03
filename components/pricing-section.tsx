"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for trying out Cleverz",
    features: [
      "3 AI tutor questions per session",
      "Basic progress tracking",
      "Access to study materials",
      "Daily question of the day",
    ],
    cta: "Get Started",
    variant: "outline" as const,
  },
  {
    name: "Standard",
    price: "₹999",
    period: "per month",
    description: "Best for serious JEE preparation",
    features: [
      "Unlimited AI tutor questions",
      "Complete progress analytics",
      "All mock tests & quizzes",
      "Leaderboard access",
      "Subject-wise tracking",
      "Email support",
    ],
    cta: "Start Learning",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "Premium",
    price: "₹1,999",
    period: "per month",
    description: "For students who want everything",
    features: [
      "Everything in Standard",
      "Priority 24/7 support",
      "Personalized study plans",
      "One-on-one doubt sessions",
      "Exclusive video content",
      "Performance reports",
      "Early access to new features",
    ],
    cta: "Go Premium",
    variant: "outline" as const,
  },
]

export function PricingSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Start free, upgrade when you need more. All plans include access to our AI tutor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative transition-all hover:scale-105 ${
                plan.popular ? "border-primary shadow-lg scale-105" : ""
              }`}
            >
              {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="pt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">/{plan.period}</span>
                </div>
                <CardDescription className="pt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="size-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.variant} className="w-full transition-transform hover:scale-105" size="lg">
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center pt-8">
          <p className="text-sm text-muted-foreground">
            All paid plans include a 7-day money-back guarantee. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
