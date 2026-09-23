import { useQueryClient } from "@tanstack/react-query";

type UseRenderedServicesProps = {
    selectedDateFrom: string;
    selectedDateTo: string;
    page: number;
    limit: number;
};

export const useRenderedServices = () => {

    const queryClient = useQueryClient();

    const handleGetRenderedServiceByDate = async ({ selectedDateFrom, selectedDateTo, page, limit }: UseRenderedServicesProps) => {
        try {
            const renderedServices = await queryClient.fetchQuery({
                queryKey: [
                    "rendered-services",
                    selectedDateFrom,
                    selectedDateTo,
                    page,
                ],
                queryFn: async () => {
                    const params = new URLSearchParams({ dateFrom: selectedDateFrom, dateTo: selectedDateTo, page: page.toString(), limit: limit.toString() })
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/rendered/service?${params.toString()}`, { credentials: "include" })
                    if (!res.ok) throw new Error("Failed to fetch rendered services")
                    return await res.json()
                },
                staleTime: 1000 * 60 * 5,
            });
            return renderedServices;
        } catch (err) {
            console.error("Something went wrong:", err);
        }
    };

    return { handleGetRenderedServiceByDate };

};
