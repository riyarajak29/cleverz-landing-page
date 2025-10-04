"use client"

import RequireAuth from "@/components/require-auth"
import { useAuth } from "@/components/auth-context"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useRef, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuth()
  const router = useRouter()
  const [name, setName] = useState(user?.username || "Student")
  const [email, setEmail] = useState(user?.email || "student@example.com")
  const [goal, setGoal] = useState(2)
  const [notifications, setNotifications] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [bio, setBio] = useState(user?.bio || "")
  const fileRef = useRef<HTMLInputElement | null>(null)

  const onPickAvatar = () => fileRef.current?.click()
  const onAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result || "")
      updateUser({ avatar: dataUrl })
    }
    reader.readAsDataURL(file)
  }

  return (
    <RequireAuth>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full overflow-hidden border bg-muted grid place-items-center">
                {user?.avatar ? (
                  <img src={user.avatar || "/placeholder.svg"} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-sm font-medium uppercase">{user?.username?.slice(0, 2) || "U"}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onPickAvatar} className="bg-transparent">
                  Upload Avatar
                </Button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
                {user?.avatar && (
                  <Button variant="ghost" onClick={() => updateUser({ avatar: undefined })}>
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio..."
              className="min-h-[96px]"
            />
            <div className="flex justify-between">
              <span>Forgot password</span>
              <Button variant="outline" className="bg-transparent" onClick={() => alert("Reset link sent")}>
                Send Reset Link
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  updateUser({ username: name, email, bio })
                }}
              >
                Save Profile
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  logout()
                  router.push("/")
                }}
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Daily study goal (hours)</span>
              <Input
                className="w-20"
                type="number"
                min={0}
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <span>Theme</span>
              <div className="flex gap-2">
                <Button variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")}>
                  Light
                </Button>
                <Button variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")}>
                  Dark
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RequireAuth>
  )
}
