import type { 
    TicketTrackerRequest,
    TicketTrackerResponse
} from '../types/SuperAdminTypes'

// export const getSuperAdminClientService = async (clientId: string): Promise<SuperAdminClientResponse> => {
//     try {
//         const res = await fetch(
//             `${import.meta.env.VITE_API_URL}/api/superadmin/clients/${clientId}`,
//             { credentials: "include" }
//         )

//         if (!res.ok) {
//             throw new Error((await res.json()).message || "Failed to retrieve super admin clients response services");
//         }

//         return res.json();
//     } catch (err) {
//         console.error('Failed to retrieve super admin clients on service.', err);
//         throw err;
//     }
// }

export const getSuperAdminTicketTrackerService = async (request: TicketTrackerRequest): Promise<TicketTrackerResponse> => {
    try {
        const params = new URLSearchParams({ 
            officeCode: request.officeCode, 
            dateFrom: request.dateFrom, 
            page: String(request.page), 
            limit: String(request.limit) 
        });

        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/superadmin/ticket-tracker?${params}`,
            { credentials: "include" }
        );

        if (!res.ok) {
            throw new Error((await res.json()).message || "Failed to retrieve ticket tracker response services");
        }

        return res.json();
    } catch (err) {
        console.error('Failed to retrieve ticket tracker on service.', err);
        throw err;
    }
}