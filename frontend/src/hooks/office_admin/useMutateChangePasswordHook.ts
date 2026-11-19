import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CSFCustomToaster } from '../../utils/Toaster';
import { updateUserPasswordService } from '../../services/OfficeAdminService';

export const useMutateChangePasswordHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUserPasswordService,

        onSuccess: (data) => {
            CSFCustomToaster.success(data.message);

            queryClient.invalidateQueries({ queryKey: ['user-profile'] });

            setTimeout(() => {
                window.location.href = '/signin';
            }, 1500);
            
        },

        onError: (error: Error) => {
            CSFCustomToaster.error(error.message);
        }

    });
}