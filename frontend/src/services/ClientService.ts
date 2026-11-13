import { CSFCustomToaster } from '../utils/Toaster';
import type { FeedbackFormRequest } from '../types/ClientFeedbackTypes';

export const submitClientFeedbackService = async (feedbackFormRequest: FeedbackFormRequest): Promise<void> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/queues/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedbackFormRequest)
        })

        if (res.ok) {
            CSFCustomToaster.success('Feedback submitted successfully!')
        } else {
            CSFCustomToaster.error('Something went wrong!')
        }
    } catch (err) {
        console.error('Failed to submit client feedback on service. ', err);
        throw err;
    }
}