import type { 
    FeedbackByOfficeAndDateRangeRequest,
    FeedbackByOfficeAndDateRangeResponse,
} from '../types/HumanResourceTypes';

export const getFeedbackByOfficeAndDateRangeService = async (request: FeedbackByOfficeAndDateRangeRequest): Promise<FeedbackByOfficeAndDateRangeResponse> => {
    try {
        const params = new URLSearchParams({
            officeCode: request.officeCode,
            month: request.month,
            year: request.year,
            page: String(request.page),
            limit: String(request.limit)
        });

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/office-feedbacks?${params}`,
            { credentials: "include" }
        )

        if (!res.ok) {
            throw new Error((await res.json()).message || 'Failed to retrieve office feedback response on service.')
        }
        
        return res.json();
    } catch (err) {
        console.error('Failed to retrieve office feedback on service. ', err);
        throw err;
    }
}