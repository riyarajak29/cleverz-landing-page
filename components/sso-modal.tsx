"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Chrome } from "lucide-react"

interface SSOModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SSOModal({ open, onOpenChange }: SSOModalProps) {
  const handleGoogleSignIn = () => {
    // Placeholder for Google OAuth integration
    console.log("[v0] Google Sign-In triggered - integrate with Supabase OAuth")
    alert("Google Sign-In will be integrated with Supabase OAuth. This is a demo placeholder.")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Continue Learning</DialogTitle>
          <DialogDescription className="text-center">
            Sign in with Google to unlock unlimited questions and track your progress
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button className="w-full h-12 text-base gap-3" onClick={handleGoogleSignIn}>
            <Chrome className="size-5" />
            Continue with Google
          </Button>

          <div className="text-xs text-center text-muted-foreground space-y-1">
            <p>By continuing, you agree to our Terms of Service</p>
            <p>and Privacy Policy</p>
          </div>
        </div>

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
