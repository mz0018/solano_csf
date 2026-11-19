import type { TotalServiceRenderedResponse } from '../types/HeadOfficeAdminType';

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