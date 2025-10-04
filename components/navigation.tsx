"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { BookOpen, Menu, X, LogOut } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-context"
import Image from "next/image"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/progress", label: "Progress" },
  { href: "/subjects", label: "Subjects" },
  { href: "/features", label: "Features" },
  { href: "/faq", label: "FAQ" },
  { href: "/pricing", label: "Pricing" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout, setShowAuthModal } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="size-6 text-primary" />
            <span className="text-balance">Cleverz</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {!user ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
                  Log in
                </Button>
                <Button
                  size="sm"
                  className="transition-transform hover:scale-105"
                  onClick={() => setShowAuthModal(true)}
                >
                  Start Learning
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 pr-1">
                  {user.avatar ? (
                    <Image
                      src={user.avatar || "/placeholder.svg"}
                      alt={`${user.username} avatar`}
                      width={28}
                      height={28}
                      className="rounded-full border"
                    />
                  ) : (
                    <div className="size-7 rounded-full border bg-muted grid place-items-center">
                      <span className="text-[10px] font-medium uppercase">{(user.username || "U").slice(0, 2)}</span>
                    </div>
                  )}
                  <span className="text-sm text-muted-foreground">{user.username}</span>
                </div>
                <Button variant="outline" size="sm" onClick={logout} className="gap-2 bg-transparent">
                  <LogOut className="size-4" />
                  Log out
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-in slide-in-from-top-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t">
              {!user ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowAuthModal(true)
                      setMobileMenuOpen(false)
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowAuthModal(true)
                      setMobileMenuOpen(false)
                    }}
                  >
                    Start Learning
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                >
                  Log out
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
