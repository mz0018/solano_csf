import { useMutation } from '@tanstack/react-query';
import { CSFCustomToaster } from '../../utils/Toaster';
import { verifyQueueTicketService } from '../../services/ClientService';

export const useMutateVerifyQueueTicketHook = () => {

    return useMutation({
        mutationFn: (code: string) => verifyQueueTicketService(code),

        onSuccess: (data) => {
            CSFCustomToaster.success(data.officeCode);
        },

        onError: (error: Error) => {
            CSFCustomToaster.error(error.message);
        }
    });
}