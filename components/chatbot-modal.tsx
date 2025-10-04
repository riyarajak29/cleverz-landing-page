"use client"

import type React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-context"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatbotModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subject?: string
  docked?: boolean
}

export function ChatbotModal({ open, onOpenChange, subject, docked = false }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const { chatQuestions, incrementChatCount, setShowAuthModal, user } = useAuth()
  const isGuest = !user

  useEffect(() => {
    if (!open) {
      setMessages([])
      setInput("")
    } else {
      setMessages([
        {
          role: "assistant",
          content: `Hello! I'm your AI tutor${subject ? ` for ${subject}` : ""}. ${
            isGuest ? "You have 3 free questions before signing in." : "You're signed in — enjoy unlimited questions."
          }`,
        },
      ])
    }
  }, [open, subject, isGuest])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    if (isGuest && chatQuestions >= 3) {
      setShowAuthModal(true)
      return
    }

    const userMessage = input.trim()
    setInput("")
    setLoading(true)
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    setTimeout(() => {
      const responses = [
        "Great question! Let me explain this concept step by step...",
        "That's an important topic. Here's how you can approach it...",
        "I understand your confusion. Let's break this down together...",
        "Excellent! This is a fundamental concept in JEE preparation...",
      ]

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            responses[Math.floor(Math.random() * responses.length)] +
            " [This is a demo response. Actual AI integration will provide detailed explanations with formulas and step-by-step solutions.]",
        },
      ])
      if (isGuest) incrementChatCount()
      setLoading(false)
    }, 1000)
  }

  const remainingQuestions = isGuest ? Math.max(0, 3 - chatQuestions) : Number.POSITIVE_INFINITY

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={
            docked
              ? "sm:max-w-md w-full md:w-[420px] h-[70vh] md:h-[520px] flex flex-col p-0 fixed bottom-4 right-4 m-0 rounded-xl"
              : "sm:max-w-2xl h-[600px] flex flex-col p-0"
          }
        >
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="size-5 text-primary" />
                </div>
                <div>
                  <DialogTitle>AI Tutor</DialogTitle>
                  <DialogDescription>{subject ? `${subject} Assistant` : "Ask me anything"}</DialogDescription>
                </div>
              </div>
              <Badge variant={isGuest && remainingQuestions > 0 ? "secondary" : isGuest ? "destructive" : "secondary"}>
                {isGuest ? `${remainingQuestions} questions left` : "Unlimited"}
              </Badge>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4 py-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="size-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-4 py-3 max-w-[80%] ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="size-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <div className="size-2 rounded-full bg-foreground/40 animate-bounce" />
                      <div className="size-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.2s]" />
                      <div className="size-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {isGuest && chatQuestions >= 3 && (
            <div className="px-6 py-3 bg-destructive/10 border-t border-destructive/20">
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="size-4" />
                <span>You've reached the free question limit. Sign in to continue learning!</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isGuest && chatQuestions >= 3 ? "Sign in to ask more questions..." : "Ask your question..."
                }
                disabled={(isGuest && chatQuestions >= 3) || loading}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={(isGuest && chatQuestions >= 3) || loading || !input.trim()}>
                <Send className="size-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
