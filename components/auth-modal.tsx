"use client"

import type React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Chrome, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from "./auth-context"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, setIsVerified, resetChatCount } = useAuth()
  const [step, setStep] = useState<"form" | "otp">("form")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  })
  const [otp, setOtp] = useState("")

  const router = useRouter()

  const isFormValid = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    const mobileOk = /^\d{10}$/.test(form.mobile)
    const passwordOk =
      form.password.length >= 8 &&
      /[A-Z]/.test(form.password) &&
      /\d/.test(form.password) &&
      /[^A-Za-z0-9]/.test(form.password)
    const usernameOk = form.username.trim().length >= 3
    return emailOk && mobileOk && passwordOk && usernameOk
  }, [form])

  const handleGoogleSignIn = () => {
    login({
      id: crypto.randomUUID(),
      username: "demo_student",
      email: "student@example.com",
      mobile: "9999999999",
      avatar: "/student-avatar-placeholder.jpg",
      bio: "Future JEE topper 🚀",
      isPremium: false,
    })
    setIsVerified(true)
    resetChatCount()
    router.push("/dashboard")
  }

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!isFormValid) {
      setError("Please fill all fields correctly.")
      return
    }
    login({
      id: crypto.randomUUID(),
      username: form.username.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      avatar: "/student-avatar-placeholder.jpg",
      bio: "",
      isPremium: false,
    })
    setIsVerified(true)
    resetChatCount()
    setShowAuthModal(false)
    router.push("/dashboard")
  }

  const onSubmitOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (otp.trim() !== "123456") {
        setError("Invalid OTP. Try 123456.")
        return
      }
      login({
        id: crypto.randomUUID(),
        username: form.username.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        avatar: "/student-avatar-placeholder.jpg",
        bio: "",
        isPremium: false,
      })
      setIsVerified(true)
      resetChatCount()
      setShowAuthModal(false)
      router.push("/dashboard")
    }, 800)
  }

  return (
    <Dialog
      open={showAuthModal}
      onOpenChange={(open) => {
        setShowAuthModal(open)
        if (!open) {
          setStep("form")
          setError(null)
          setOtp("")
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Sign in to Cleverz</DialogTitle>
          <DialogDescription className="text-center">
            Unlock unlimited chatbot, track progress, and personalize your prep.
          </DialogDescription>
        </DialogHeader>

        {step === "form" ? (
          <form className="space-y-3" onSubmit={onSubmitForm}>
            <Input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            />
            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
            <Input
              placeholder="Mobile (10 digits)"
              inputMode="numeric"
              value={form.mobile}
              onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
            />
            <Input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full h-11" disabled={!isFormValid}>
              Continue
            </Button>
            <div className="relative my-2 text-center text-xs text-muted-foreground">or</div>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 gap-2 bg-transparent"
              onClick={handleGoogleSignIn}
            >
              <Chrome className="size-4" />
              Continue with Google (mock)
            </Button>
            <div className="text-xs text-center text-muted-foreground space-y-1">
              <p>By continuing, you agree to our Terms</p>
              <p>and Privacy Policy</p>
            </div>
          </form>
        ) : (
          <form className="space-y-3" onSubmit={onSubmitOtp}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              <p className="text-sm">We sent a 6-digit OTP to your mobile/email. Use 123456 for demo.</p>
            </div>
            <Input placeholder="Enter OTP" inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value)} />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Continue"}
            </Button>
          </form>
        )}

        <div className="bg-muted rounded-lg p-4 text-sm space-y-2">
          <p className="font-semibold">What you'll get:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>✓ Unlimited AI tutor questions</li>
            <li>✓ Progress tracking & analytics</li>
            <li>✓ Personalized study recommendations</li>
            <li>✓ Join the leaderboard</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
