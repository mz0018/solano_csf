import { useQuery } from "@tanstack/react-query";

const getDetailedFeedbackByCode = async (code: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/feedback/${code}`,
        { credentials: "include" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch detailed feedback");
    }

    const data = await res.json();
    return data;
};

export const useGetDetailedFeedback = (code: string) => {
    return useQuery({
        queryKey: ["detailed-feedback", code],
        queryFn: () => getDetailedFeedbackByCode(code),
        staleTime: 1000 * 60 * 5,
        enabled: !!code,
    });
};