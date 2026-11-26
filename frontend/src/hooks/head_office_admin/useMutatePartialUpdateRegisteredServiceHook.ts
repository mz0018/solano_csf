import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { CSFCustomToaster } from '../../utils/Toaster';
import { updateRegisteredOfficeServiceService } from '../../services/HeadOfficeAdminService';

import type { UpdatePartialServiceRequest } from '../../types/HeadOfficeAdminType';

export const useMutatePartialUpdateRegisteredServiceHook = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: UpdatePartialServiceRequest) => updateRegisteredOfficeServiceService(request),

        onSuccess: (data) => {
            
            if (!data) {
                return;
            }

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