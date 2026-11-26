import { useQuery } from '@tanstack/react-query'
import { getOfficeListService } from '../../services/HumanResourceAdminService';

export const useQueryGetOfficeListHook = () => {
    return useQuery({
        queryKey: ['offices'],
        queryFn: getOfficeListService,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
    });
}