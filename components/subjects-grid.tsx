"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Atom, Flag as Flask, Calculator, BookOpen, Brain } from "lucide-react"
import { useState } from "react"
import { ChatbotModal } from "@/components/chatbot-modal"

const subjects = [
  {
    id: "physics",
    name: "Physics",
    icon: Atom,
    description: "Master mechanics, thermodynamics, optics, and modern physics",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: Flask,
    description: "Excel in organic, inorganic, and physical chemistry",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "math",
    name: "Mathematics",
    icon: Calculator,
    description: "Conquer calculus, algebra, trigonometry, and more",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

export function SubjectsGrid() {
  const [chatOpen, setChatOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<string>("")

  const handleOpenChat = (subjectId: string) => {
    setSelectedSubject(subjectId)
    setChatOpen(true)
  }

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Choose Your Subject</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Select a subject to start learning with AI-powered guidance or test your knowledge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {subjects.map((subject) => {
              const Icon = subject.icon
              return (
                <Card key={subject.id} className="group transition-all hover:scale-105 hover:shadow-lg">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${subject.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`size-6 ${subject.color}`} />
                    </div>
                    <CardTitle className="text-xl">{subject.name}</CardTitle>
                    <CardDescription className="leading-relaxed">{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full group/btn" onClick={() => handleOpenChat(subject.id)}>
                      <Brain className="size-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Start Learning
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <BookOpen className="size-4 mr-2" />
                      Take Quiz
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center pt-8">
            <p className="text-sm text-muted-foreground">
              All subjects include comprehensive study materials, practice problems, and instant AI support
            </p>
          </div>
        </div>
      </section>

      <ChatbotModal open={chatOpen} onOpenChange={setChatOpen} subject={selectedSubject} />
    </>
  )
}
