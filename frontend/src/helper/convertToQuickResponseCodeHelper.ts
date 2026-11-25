import QRCode from 'qrcode'
import type { NewTicketResponse } from '../types/HeadOfficeAdminType'

export const convertToQuickResponseCodeHelper = async (data: NewTicketResponse[]) => {

    const websiteUrl = import.meta.env.VITE_WEBSITE_URL

    const qrCodes = await Promise.all(data.map(async (ticket) => {
        
            const qrUrl = `${websiteUrl}/create-feedback?code=${ticket.code}`
            return await QRCode.toDataURL(qrUrl)

        })
    );

    return qrCodes
}