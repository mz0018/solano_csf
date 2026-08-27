import { useQuery } from "@tanstack/react-query";

type TicketTrackerResponse = {
    tickets: Array<{
        _id: string;
        code: string;
        status: string;
        createdAt: string;
        generatedBy: { _id: string; firstName: string; lastName: string; userName: string } | null;
    }>;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    officeCode: string;
    date: string;
};

const getTicketTracker = async (
    officeCode: string,
    dateFrom: string,
    page = 1,
    limit = 10
): Promise<TicketTrackerResponse> => {
    const params = new URLSearchParams({ 
        officeCode, 
        dateFrom, 
        page: String(page), 
        limit: String(limit) 
    });
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/superadmin/ticket-tracker?${params}`,
        { credentials: "include" }
    );
    if (!res.ok) throw new Error("Failed to fetch ticket tracker");
    return res.json();
};

export const useGetTicketTracker = (
    officeCode: string,
    dateFrom: string,
    page = 1,
    limit = 10
) => {
    return useQuery({
        queryKey: ["ticket-tracker", officeCode, dateFrom, page, limit],
        queryFn: () => getTicketTracker(officeCode, dateFrom, page, limit),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!officeCode && !!dateFrom,
    });
};