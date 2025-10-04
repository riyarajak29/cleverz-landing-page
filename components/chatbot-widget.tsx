"use client"

import { useState } from "react"
import { useAuth } from "./auth-context"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Msg = { role: "user" | "bot"; text: string }

export default function ChatbotWidget() {
  const { isVerified, openAuth } = useAuth()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! I’m Cleverz Bot. Ask me anything about JEE prep." },
  ])

  const onToggle = () => {
    if (!open) {
      // must be logged in
      if (!isVerified) {
        openAuth("login")
        return
      }
    }
    setOpen(!open)
  }

  const onSend = () => {
    if (!input.trim()) return
    const q = input.trim()
    setMessages((m) => [...m, { role: "user", text: q }])
    setInput("")
    // mock response
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "This is a mock answer. After integrating models, I’ll answer precisely." },
      ])
    }, 300)
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-40 w-80 rounded-xl border border-border bg-background shadow-lg">
          <div className="flex items-center justify-between p-3 border-b">
            <span className="font-medium">Cleverz Chat</span>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          <div className="h-64 overflow-y-auto space-y-2 p-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : ""}>
                <div
                  className={`inline-block rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 p-3 border-t">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              onKeyDown={(e) => e.key === "Enter" && onSend()}
            />
            <Button onClick={onSend} size="icon">
              <Send size={16} />
            </Button>
          </div>
        </div>
      )}

      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand-accent)] text-white shadow-lg hover:opacity-90"
        aria-label="Open chatbot"
      >
        <MessageCircle />
      </button>
    </>
  )
}
