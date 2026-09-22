type UseRenderedServicesProps = {
    selectedDateFrom: string;
    selectedDateTo: string;
};

export const useRenderedServices = () => {
    const handleGetRenderedServiceByDate = async ({
        selectedDateFrom,
        selectedDateTo,
    }: UseRenderedServicesProps) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/rendered/service?dateFrom=${selectedDateFrom}&dateTo=${selectedDateTo}`,
                {
                    credentials: "include",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch rendered services");
            }

            return await res.json();
        } catch (err) {
            console.error("Something went wrong:", err);
        }
    };

    return { handleGetRenderedServiceByDate };
};
