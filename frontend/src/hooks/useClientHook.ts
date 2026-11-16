import { useState } from 'react';
import { CSFCustomToaster } from '../utils/Toaster';
import { submitClientFeedbackService } from '../services/ClientService';
import type { FeedbackFormRequest } from '../types/ClientFeedbackTypes';

export const useClientHook = () => {

    const [isSubmittingFeedback, setSubmittingFeedback] = useState<boolean>(false);

    const submitClientFeedbackHook = async (feedbackFormRequest: FeedbackFormRequest) => {
        setSubmittingFeedback(true);
        try {
            const response = await submitClientFeedbackService(feedbackFormRequest);
            CSFCustomToaster.success(`Feedback submitted Queue: ${response.queueNumber}`);
        } catch (err) {
            console.error('Failed to submit client feedback on hook. ', err);
            throw err;
        } finally {
            setSubmittingFeedback(false);
        }
    }

    return { isSubmittingFeedback, submitClientFeedbackHook }
}