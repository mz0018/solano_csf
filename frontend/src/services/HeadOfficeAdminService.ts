import type { 
    TotalServiceRenderedResponse, 
    ListOfServicesResponse,
    NewTicketRequest,
    NewTicketResponse,
    NewServiceRequest,
    UpdateServiceRequest
} from '../types/HeadOfficeAdminType';

export const getTotalServiceRenderedByDateService = async (selectedDateFrom: string, selectedDateTo: string, page: number, limit: number): Promise<TotalServiceRenderedResponse> => {
    try {
        const params = new URLSearchParams({ 
            dateFrom: String(selectedDateFrom),
            dateTo: String(selectedDateTo), 
            page: String(page), 
            limit: String(limit) 
        });

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/rendered/service?${params}`, 
            { credentials: "include" }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch rendered services");
        }

        return res.json();
    } catch (err) {
        console.error('Failed to fetch service rendered by date on service.', err);
        throw err;
    }
}

export const getServicesByOfficeService = async (): Promise<ListOfServicesResponse[]> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/services`,
            { credentials: "include" }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch list of services by office response services");
        };

        return res.json();
    } catch (err) {
        console.error('Failed to fetch service rendered by date on service.', err);
        throw err;
    }
}

export const getChildServicesByParentService = async (): Promise<ListOfServicesResponse[]> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/child-services`,
            { credentials: "include" }
        )

        if (!res.ok) {
            throw new Error("Failed to fetch list of child services by parent response services")
        }

        return res.json();
    } catch (err) {
        console.error('Failed to fetch child services by parent on service.', err);
        throw err;
    }
}

export const generateNewTicketService = async (newTicketRequest: NewTicketRequest): Promise<NewTicketResponse[]> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/generate-ticket`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(newTicketRequest)
            }
        );

        if (!res.ok) {
            throw new Error("Failed to generate new ticket response services")
        }
      
        const data: { ticket: NewTicketResponse[] } = await res.json();
        return data.ticket;
    } catch (err) {
        console.error('Failed to generate new ticket on service.', err);
        throw err;
    }
}

export const registerNewOfficeServiceService = async (newServiceRequest: NewServiceRequest) => {
    try { 
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/services`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    serviceName: newServiceRequest.serviceName.trim(),
                    serviceType: newServiceRequest.serviceType,
                }),
            }
        );

        if (!res.ok) {
            throw new Error((await res.json()).message || "Failed to register new service response services")
        }

        return res.json();
    } catch (err) {
        console.error('Failed to register new service on service', err);
        throw err;
    }
}

export const updateRegisteredOfficeServiceStatusService = async (updateServiceRequest: UpdateServiceRequest) => {
    try { 
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/admin/services/${updateServiceRequest.serviceId}/status`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ 
                    serviceStatus: updateServiceRequest.serviceStatus
                }),
            }
        );

        if (!res.ok) {
            throw new Error((await res.json()).message || "Failed to update service response services")
        }

        return res.json();
    } catch (err) {
        console.error('Failed to update service on service', err);
        throw err;
    }
}