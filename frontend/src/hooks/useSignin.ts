import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getRoleBasedNavigationPath } from '../utils/getRoleBasedNavigationPath'

export const useSignin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [status, setStatus] = useState<{
        rateLimit?: boolean
    }>({})
    const [hasError, setHasError] = useState<{
        userName?: string
        password?: string
        general?: string
    }>({})

    const { verifyAuth } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const newErrors: { userName?: string; password?: string } = {}

        if (!userName.trim()) {
            newErrors.userName = "Username is required."
        }

        if (!password.trim()) {
            newErrors.password = "Password is required."
        }

        if (Object.keys(newErrors).length > 0) {
            setHasError(newErrors)
            setIsLoading(false)
            return
        }
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ userName, password })
            })

            if (res.ok) {
                const data = await res.json()
                await verifyAuth()
                
                // Navigate based on user role
                const path = getRoleBasedNavigationPath(data.role)
                navigate(path)
            } else {
                if (res.status === 401) {
                    setHasError({ general: "Invalid credentials. Please try again." })
                } else if (res.status === 429) {
                    setHasError({ general: "Too many requests. Please try again later." })
                    setStatus({ rateLimit: true })
                } else {
                    setHasError({ general: "An error occurred during sign-in. Please try again later." })
                }
            }

        } catch (error) {
            setHasError({ general: 'Something went wrong. Please try again later.' })
            console.error("Signin failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return { handleSubmit, isLoading, setUserName, userName, setPassword, password, hasError, status }

}