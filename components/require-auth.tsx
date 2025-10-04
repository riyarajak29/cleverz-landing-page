"use client"

import type { ReactNode } from "react"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "./auth-context"

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, setShowAuthModal } = useAuth()

  if (!user) {
    return (
      <main className="container mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Sign in required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Please sign in to access this section. You can continue with Google or complete a quick OTP verification.
            </p>
            <Button onClick={() => setShowAuthModal(true)}>Sign in</Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return <>{children}</>
}
