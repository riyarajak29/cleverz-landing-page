"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Home, User, BarChartBig as ChartBar, BookOpen, Calendar, Settings, LogOut } from "lucide-react"

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/progress", label: "Progress", icon: ChartBar },
  { href: "/subjects", label: "Subjects", icon: BookOpen },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/settings", label: "Settings", icon: Settings },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="hidden md:flex flex-col border-r p-4 gap-2">
        <div className="mb-2 text-lg font-semibold">Cleverz</div>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted",
                  active && "bg-muted",
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex flex-col">
        <header className="flex items-center justify-between border-b px-4 py-3">
          <div className="md:hidden">
            <div className="text-lg font-semibold">Cleverz</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm">{user?.name || "Student"}</div>
            <Avatar className="h-8 w-8">
              <AvatarFallback>{(user?.name?.[0] || "S").toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                logout()
                router.push("/")
              }}
            >
              <LogOut size={16} />
            </Button>
          </div>
        </header>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
