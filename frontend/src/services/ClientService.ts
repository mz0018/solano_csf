import type { FeedbackFormRequest, FeedbackFormResponse } from '../types/ClientFeedbackTypes';

export const submitClientFeedbackService = async (feedbackFormRequest: FeedbackFormRequest): Promise<FeedbackFormResponse> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/queues/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedbackFormRequest)
        })

        if (!res.ok) {
            throw new Error('Failed to submit client feedback on service.')
        }
        
        return res.json();
    } catch (err) {
        console.error('Failed to submit client feedback on service. ', err);
        throw err;
    }
}