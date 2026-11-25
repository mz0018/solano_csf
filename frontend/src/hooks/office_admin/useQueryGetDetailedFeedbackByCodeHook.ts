import { useQuery } from '@tanstack/react-query'
import { getDetailedFeedbackByCodeService } from '../../services/OfficeAdminService';

export const useQueryGetDetailedFeedbackByCodeHook = (code: string) => {
    return useQuery({
        queryKey: ["detailed-feedback", code],
        queryFn: () => getDetailedFeedbackByCodeService(code),
        staleTime: 1000 * 60 * 5,
        enabled: !!code,
    });
}