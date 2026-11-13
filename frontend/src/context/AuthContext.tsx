import type { ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import type { AuthorizeUser } from '../types/AuthorizeTypes'
import { AuthorizeContext } from '../hooks/useAuthorize'


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthorizeUser | null>(null)
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
          role: data.user.role,
          officeCode: data.user.officeCode
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
    await fetch(`${import.meta.env.VITE_API_URL}/api/users/signout`, { 
        method: 'POST', 
        credentials: 'include' 
    })

    queryClient.clear()
    setUser(null)
  }

  return (
    <AuthorizeContext.Provider value={{ user, loading, verifyAuth, signOut }}>
      {children}
    </AuthorizeContext.Provider>
  )
}