import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Target, TrendingUp, Users, Clock, Award, Zap, BookOpen } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Tutoring",
    description: "Get instant, detailed explanations for every question with step-by-step solutions",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description: "Adaptive study plans that focus on your weak areas and optimize your preparation",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Track your improvement with detailed insights and performance metrics",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Users,
    title: "Competitive Learning",
    description: "Join leaderboards and challenge peers to stay motivated",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Study anytime, anywhere with round-the-clock AI support",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Award,
    title: "Gamified Experience",
    description: "Earn badges, maintain streaks, and unlock achievements as you learn",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Zap,
    title: "Quick Revisions",
    description: "5-minute mini-sessions for quick concept reviews before exams",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Content",
    description: "Complete JEE syllabus coverage with practice problems and mock tests",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
]

export function FeaturesGrid() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Everything You Need to Succeed</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Comprehensive AI-driven features designed to accelerate your JEE preparation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="group transition-all hover:scale-105 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`size-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
