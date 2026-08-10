import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface AuthUser {
  id: string
  userName: string
  role: string
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  verifyAuth: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const queryClient = useQueryClient()

  const verifyAuth = async () => {

    if (!document.cookie.includes('authToken=')) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/verify`, { credentials: 'include' })

      if (res.ok) {
        const data = await res.json()
        setUser({
          id: data.user.id,
          userName: data.user.userName,
          role: data.user.role
        })
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    verifyAuth()
  }, [])

  const logoutAlerted = useRef(false)
  
  useEffect(() => {
    if (!user) return
    const interval = setInterval(async () => {
      if (!document.cookie.includes('authToken=')) {
        if (!logoutAlerted.current) {
          logoutAlerted.current = true
          alert("you've been logout")
          queryClient.clear()
          setUser(null)
          window.location.href = '/signin'
        }
        return
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/verify`, { credentials: 'include' })
        if (!res.ok && !logoutAlerted.current) {
          logoutAlerted.current = true
          alert("you've been logout")
          queryClient.clear()
          setUser(null)
          window.location.href = '/signin'
        }
      } catch {
        if (!logoutAlerted.current) {
          logoutAlerted.current = true
          alert("you've been logout")
          queryClient.clear()
          setUser(null)
          window.location.href = '/signin'
        }
      }
    }, 30_000)
    return () => {
      clearInterval(interval)
      logoutAlerted.current = false
    }
  }, [user])

  const signOut = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/users/signout`, { method: 'POST' })
    queryClient.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, verifyAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}