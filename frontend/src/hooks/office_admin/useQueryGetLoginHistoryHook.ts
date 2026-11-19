import { useQuery } from '@tanstack/react-query';
import { getUserLoginHistoryService } from '../../services/OfficeAdminService';

export const useQueryGetLoginHistory = (page: number = 1, limit: number = 5) => {

    return useQuery({
        queryKey: ['login-history', page, limit],
        queryFn: () => getUserLoginHistoryService(page, limit),
        staleTime: 1000 * 60 * 5,
    });
}