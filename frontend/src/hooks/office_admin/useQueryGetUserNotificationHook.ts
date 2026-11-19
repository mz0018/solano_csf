import { useQuery } from '@tanstack/react-query';
import { getUserNotificationService } from '../../services/OfficeAdminService';

export const useQueryGetUserNotificationHook = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: getUserNotificationService,
        staleTime: 1000 * 60 * 5,
    });
}