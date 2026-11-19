import { useQuery } from '@tanstack/react-query';
import { getUserProfileInformationService } from '../../services/OfficeAdminService';

export const useQueryGetUserProfileHook = () => {
    return useQuery({
        queryKey: ["user-profile"],
        queryFn: getUserProfileInformationService,
        staleTime: 1000 * 60 * 5,
    });
};