import { useMutation } from '@tanstack/react-query';
import { CSFCustomToaster } from '../../utils/Toaster';
import { registerNewOfficeServiceService } from '../../services/HeadOfficeAdminService';

import type { NewServiceRequest } from '../../types/HeadOfficeAdminType';

export const useMutateSaveNewServiceHook = () => {

    return useMutation({
        mutationFn: (request: NewServiceRequest) => registerNewOfficeServiceService(request),

        onSuccess: (data) => {
            CSFCustomToaster.success(data.message)
        },

        onError: (error: Error) => {
            CSFCustomToaster.error(error.message)
        }
    });
}