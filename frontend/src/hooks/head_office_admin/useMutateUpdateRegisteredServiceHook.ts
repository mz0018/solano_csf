import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { CSFCustomToaster } from '../../utils/Toaster';
import { updateRegisteredOfficeServiceStatusService } from '../../services/HeadOfficeAdminService';

import type { UpdateServiceRequest } from '../../types/HeadOfficeAdminType';

export const useMutateUpdateRegisteredServiceHook = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UpdateServiceRequest) => updateRegisteredOfficeServiceStatusService(request),

        onSuccess: (data) => {
            CSFCustomToaster.success(data.message)

            queryClient.invalidateQueries({
                queryKey: ['office-services']
            })
        },

        onError: (error: Error) => {
            CSFCustomToaster.error(error.message)
        }
    });
}