import { useQuery } from '@tanstack/react-query';
import { getTotalServiceRenderedByDateService } from '../../services/HeadOfficeAdminService';

export const useQueryGetServiceRenderedByDateHook = (selectedDateFrom: string, selectedDateTo: string, page: number, limit: number) => {
    return useQuery({
        queryKey: ["rendered-services", selectedDateFrom, selectedDateTo, page],
        queryFn: () => getTotalServiceRenderedByDateService(selectedDateFrom, selectedDateTo, page, limit),
        staleTime: 1000 * 60 * 5,
        enabled: !!selectedDateFrom && !!selectedDateTo,
    });
};