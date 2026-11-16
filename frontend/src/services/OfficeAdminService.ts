import type { ActiveQueueResponse } from '../types/OfficeAdminType';

export const getReportStatisticService = async (page: number = 1, statusFilter: string = ""): Promise<ActiveQueueResponse> => {

    const params = new URLSearchParams({
        page: String(page),
        limit: String(10),
    });

    if (statusFilter) {
        params.set("status", statusFilter);
    }

    try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/active-queue?${params}`,
                {
                credentials: "include",
                }
            );
    
            if (!res.ok) {
                throw new Error('Failed to fetch report statistics on service.')
            }

            return res.json();
        } catch (err) {
            console.error('Failed to fetch report statistics on service. ', err);
            throw err;
        }
}