import { useMutation } from '@tanstack/react-query';
import { CSFCustomToaster } from '../../utils/Toaster';
import { generateNewTicketService } from '../../services/HeadOfficeAdminService';
import type { NewTicketRequest } from '../../types/HeadOfficeAdminType';
import { convertToQuickResponseCodeHelper } from '../../helper/convertToQuickResponseCodeHelper';

export const useMutateGenerateTicketHook = () => {

    return useMutation({
        mutationFn: async (request: NewTicketRequest) => {
            const tickets = await generateNewTicketService(request)
            const qrImages = await convertToQuickResponseCodeHelper(tickets)

            return tickets.map((ticket, index) => ({
                ticket,
                qrCode: qrImages[index]
            }))
        },

        onSuccess: () => {
            CSFCustomToaster.success('Generated Ticket')
        },

        onError: (error: Error) => {
            CSFCustomToaster.error(error.message);
        }
    });
}