import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { VerifiedQueue, FeedbackContextType, FeedbackFormData } from './feedbackTypes'

const FeedbackContext = createContext<FeedbackContextType | null>(null)

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [verified, setVerifiedState] = useState<VerifiedQueue | null>(null)
  const [formData, setFormData] = useState<Partial<FeedbackFormData>>({})

  const setVerified = (data: VerifiedQueue) => setVerifiedState(data)
  const updateFormData = (partial: Record<string, unknown>) =>
    setFormData((prev) => ({ ...prev, ...partial }))
  const reset = () => {
    setVerifiedState(null)
    setFormData({})
  }

  return (
    <FeedbackContext.Provider value={{ verified, setVerified, reset, formData, updateFormData }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export const useFeedback = () => {
  const context = useContext(FeedbackContext)
  if (!context) throw new Error('useFeedback must be used within a FeedbackProvider')
  return context
}