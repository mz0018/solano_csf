import { useState } from 'react'
import { useFeedback } from '../context/FeedbackContext'

export const useVerifyQueue = () => {
  const { formData } = useFeedback();

  const [code, setCode] = useState(formData.queueNumber || "");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    exists: boolean; officeCode?: string; selectedService?: string; services?: { code: string; name: string }[]
  } | null>(null)

  const verify = async () => {

    if (!code.trim()) { 
        setError('Please enter a queue number');
        return
    }

    setIsLoading(true);
    setError(null)
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/queues/verify?code=${encodeURIComponent(code.trim())}`)

      const data = await res.json()

      if (res.status === 429) {
        setIsRateLimited(true)
      }
      
      if (res.ok) {
        setResult(data);
        return data 
      }
      else setError(data.message || 'Something went wrong')
    } catch (err) {
      setError('Network error'); console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return { code, setCode, isLoading, error, result, verify, isRateLimited }
}