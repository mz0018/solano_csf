import { useQuery } from '@tanstack/react-query';
import { getFeedbackByOfficeAndDateRangeService } from '../../services/HumanResourceAdminService';

import type { FeedbackByOfficeAndDateRangeRequest } from '../../types/HumanResourceTypes';

export const useQueryGetFeedbackByOfficeAndDateRangeHook = (request: FeedbackByOfficeAndDateRangeRequest) => {
    return useQuery({
        queryKey: ["office-feedback", request.officeCode, request.month, request.year, request.page, request.limit],
        queryFn: () => getFeedbackByOfficeAndDateRangeService(request),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!request.officeCode && !!request.month && !!request.year
    });
}