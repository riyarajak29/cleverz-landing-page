"use client"

import type React from "react"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type User = {
  id: string
  username: string
  email: string
  mobile: string
  avatar?: string
  bio?: string
  isPremium?: boolean
} | null

type AuthContextType = {
  user: User
  login: (userData: NonNullable<User>) => void
  logout: () => void
  showAuthModal: boolean
  setShowAuthModal: (v: boolean) => void
  chatQuestions: number
  incrementChatCount: () => void
  resetChatCount: () => void
  isVerified: boolean
  setIsVerified: (v: boolean) => void
  updateUser: (patch: Partial<NonNullable<User>>) => void
  upgradeToPremium: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  showAuthModal: false,
  setShowAuthModal: () => {},
  chatQuestions: 0,
  incrementChatCount: () => {},
  resetChatCount: () => {},
  isVerified: false,
  setIsVerified: () => {},
  updateUser: () => {},
  upgradeToPremium: () => {},
})

const STORAGE_KEYS = {
  user: "cleverz_user",
  chat: "cleverz_chat_count",
  verified: "cleverz_is_verified",
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [chatQuestions, setChatQuestions] = useState(0)
  const [isVerified, setIsVerified] = useState(false)

  // hydrate from localStorage
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(STORAGE_KEYS.user)
      const rawChat = localStorage.getItem(STORAGE_KEYS.chat)
      const rawVerified = localStorage.getItem(STORAGE_KEYS.verified)
      if (rawUser) setUser(JSON.parse(rawUser))
      if (rawChat) setChatQuestions(Number.parseInt(rawChat, 10) || 0)
      if (rawVerified) setIsVerified(rawVerified === "true")
    } catch {}
  }, [])

  // persist changes
  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
      else localStorage.removeItem(STORAGE_KEYS.user)
    } catch {}
  }, [user])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.chat, String(chatQuestions))
    } catch {}
  }, [chatQuestions])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.verified, String(isVerified))
    } catch {}
  }, [isVerified])

  const login = (userData: NonNullable<User>) => {
    setUser(userData)
    setShowAuthModal(false)
  }

  const logout = () => {
    setUser(null)
    setIsVerified(false)
    setChatQuestions(0)
    try {
      localStorage.removeItem(STORAGE_KEYS.user)
      localStorage.removeItem(STORAGE_KEYS.chat)
      localStorage.removeItem(STORAGE_KEYS.verified)
    } catch {}
  }

  const updateUser = (patch: Partial<NonNullable<User>>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev))
  }

  const incrementChatCount = () => {
    setChatQuestions((c) => c + 1)
  }

  const resetChatCount = () => setChatQuestions(0)

  const upgradeToPremium = () => {
    setUser((prev) => (prev ? { ...prev, isPremium: true } : prev))
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      showAuthModal,
      setShowAuthModal,
      chatQuestions,
      incrementChatCount,
      resetChatCount,
      isVerified,
      setIsVerified,
      updateUser,
      upgradeToPremium,
    }),
    [user, showAuthModal, chatQuestions, isVerified],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
