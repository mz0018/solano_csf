import { useQueryClient } from "@tanstack/react-query";

type UseRenderedServicesProps = {
    selectedDateFrom: string;
    selectedDateTo: string;
};

export const useRenderedServices = () => {

    const queryClient = useQueryClient();

    const handleGetRenderedServiceByDate = async ({ selectedDateFrom, selectedDateTo }: UseRenderedServicesProps) => {
        try {
            const renderedServices = await queryClient.fetchQuery({
                queryKey: [
                    "rendered-services",
                    selectedDateFrom,
                    selectedDateTo,
                ],
                queryFn: async () => {
                    const res = await fetch(
                        `${import.meta.env.VITE_API_URL}/api/admin/rendered/service?dateFrom=${selectedDateFrom}&dateTo=${selectedDateTo}`,
                        {
                            credentials: "include",
                        }
                    );

                    if (!res.ok) {
                        throw new Error(
                            "Failed to fetch rendered services"
                        );
                    }

                    return await res.json();
                },
                staleTime: 1000 * 60 * 5,
            });

            console.log(renderedServices)
            return renderedServices;
        } catch (err) {
            console.error("Something went wrong:", err);
        }
    };

    return { handleGetRenderedServiceByDate };

};
