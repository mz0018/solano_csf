import { createContext, useContext } from 'react'
import type { FeedbackContextType } from '../types/ClientFeedbackTypes'

export const FeedbackContext = createContext<FeedbackContextType | null>(null)

export const useFeedback = () => {
  const context = useContext(FeedbackContext)

  if (!context) {
    throw new Error('Feedback must be used within a Feedback Provider!')
  }

  return context
}