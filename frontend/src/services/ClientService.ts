import type { 
    FeedbackFormRequest, 
    FeedbackFormResponse,
    TicketVerificationResponse,
} from '../types/ClientFeedbackTypes';

export const submitClientFeedbackService = async (feedbackFormRequest: FeedbackFormRequest): Promise<FeedbackFormResponse> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/queues/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedbackFormRequest)
        })

        if (!res.ok) {
            throw new Error((await res.json()).message || 'Failed to submit client feedback on service.')
        }
        
        return res.json();
    } catch (err) {
        console.error('Failed to submit client feedback on service. ', err);
        throw err;
    }
}

export const verifyQueueTicketService = async (code: string): Promise<TicketVerificationResponse> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/queues/verify?code=${encodeURIComponent(code.trim())}`)

        if (!res.ok) {
            throw new Error((await res.json()).message || 'Failed to verify queue ticket on service.')
        }

        return res.json();
    } catch (err) {
        console.error('Failed to verify queue ticket on service.', err);
        throw err;
    }
}