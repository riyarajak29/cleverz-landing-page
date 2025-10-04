import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-context"
import { Suspense } from "react"
import { AuthModal } from "@/components/auth-modal"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cleverz - AI-Powered JEE Preparation Platform",
  description: "Conquer Physics, Chemistry & Math with Always-On AI Guidance. Get instant answers to every question.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <AuthProvider>
              {children}
              <AuthModal />
            </AuthProvider>
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
