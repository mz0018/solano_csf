import { useQuery } from '@tanstack/react-query';
import { getServicesByOfficeService } from '../../services/HeadOfficeAdminService';

export const useQueryGetListOfServicesByOfficeHook = () => {
    return useQuery({
        queryKey: ["office-services"],
        queryFn: getServicesByOfficeService,
        staleTime: 0,
    });
};