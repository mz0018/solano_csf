import { useState } from "react";
import { CSFCustomToaster } from "../utils/Toaster";
import type { FeedbackFormData } from "../context/feedbackTypes";

export const useSubmitFeedback = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (formData: FeedbackFormData) => {
        setIsLoading(true)
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/queues/feedback`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
          })

          if (res.ok) {
              CSFCustomToaster.success('Feedback submitted successfully!')
          } else {
              CSFCustomToaster.error('Something went wrong!')
              // if (res.status === 401) {
              //     setHasError({ general: "Invalid credentials. Please try again." })
              // } else if (res.status === 429) {
              //     setHasError({ general: "Too many requests. Please try again later." })
              //     setStatus({ rateLimit: true })
              // } else {
              //     setHasError({ general: "An error occurred during sign-in. Please try again later." })
              // }
          }

        } catch (err) {
          console.error('Something went wrong: ', err)
        } finally {
          setIsLoading(false)
        }
    };

    return { handleSubmit, isLoading };
};