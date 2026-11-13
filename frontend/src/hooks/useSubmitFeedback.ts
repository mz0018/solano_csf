import { useState } from "react";
import { CSFCustomToaster } from "../utils/Toaster";
import type { FeedbackFormRequest } from "../types/ClientFeedbackTypes";

export const useSubmitFeedback = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (formData: FeedbackFormRequest) => {
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
          }

        } catch (err) {
          console.error('Something went wrong: ', err)
        } finally {
          setIsLoading(false)
        }
    };

    return { handleSubmit, isLoading };
};