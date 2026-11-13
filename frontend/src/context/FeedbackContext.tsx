import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { FeedbackFormRequest, FeedbackVerifiedQueue, FeedbackContextType } from '../types/ClientFeedbackTypes'

const FeedbackContext = createContext<FeedbackContextType | null>(null)

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [verified, setVerifiedState] = useState<FeedbackVerifiedQueue | null>(null)
  const [formData, setFormData] = useState<Partial<FeedbackFormRequest>>({})

  const setVerified = (data: FeedbackVerifiedQueue) => setVerifiedState(data)
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