import { useState } from 'react';
import { submitClientFeedbackService } from '../services/ClientService';
import type { FeedbackFormRequest } from '../types/ClientFeedbackTypes';

export const useClientHook = () => {

    const [isSubmittingFeedback, setSubmittingFeedback] = useState<boolean>(false);

    const submitClientFeedbackHook = async (feedbackFormRequest: FeedbackFormRequest) => {
        setSubmittingFeedback(true);
        try {
            await submitClientFeedbackService(feedbackFormRequest);
        } catch (err) {
            console.error('Failed to submit client feedback on hook. ', err);
            throw err;
        } finally {
            setSubmittingFeedback(false);
        }
    }

    return { isSubmittingFeedback, submitClientFeedbackHook }
}