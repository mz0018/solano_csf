import { useQuery } from '@tanstack/react-query';
import { getReportStatisticByDateService } from '../../services/OfficeAdminService';

export const useQueryGetReportStatisticsByDateHook = (officeCode: string, dateFrom: string, dateTo: string) => {

    return useQuery({
        queryKey: ["report-statistics", officeCode, dateFrom, dateTo],
        queryFn: () => getReportStatisticByDateService(officeCode, dateFrom, dateTo),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!officeCode && !!dateFrom && !!dateTo,
    });
};