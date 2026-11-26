import { useQuery } from '@tanstack/react-query'
import { getSuperAdminTicketTrackerService } from '../../services/SuperAdminService';

import type { TicketTrackerRequest } from '../../types/SuperAdminTypes';

export const useQueryGetSuperAdminTicketTrackerHook = (request: TicketTrackerRequest) => {
    return useQuery({
        queryKey: ["ticket-tracker", request.officeCode, request.dateFrom, request.page, request.limit],
        queryFn: () => getSuperAdminTicketTrackerService(request),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!request.officeCode && !!request.dateFrom,
    });
}