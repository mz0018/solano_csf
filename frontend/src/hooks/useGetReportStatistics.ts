import { useQuery } from "@tanstack/react-query";
import type { FeedbackItem } from "../components/buttons/BtnGenerateReport";

type ReportStatistics = {
    totalFeedbacks: number;
    feedbacks: FeedbackItem[];
    office: { code: string; name: string };
    dateFrom: string;
    dateTo: string;
};

const getReportStatistics = async (
    officeCode: string,
    dateFrom: string,
    dateTo: string
): Promise<ReportStatistics> => {
    const params = new URLSearchParams({ officeCode, dateFrom, dateTo });
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/report-statistics?${params}`,
        { credentials: "include" }
    );

    if (!res.ok) throw new Error("Failed to fetch report statistics");
    return res.json();
};
export const useGetReportStatistics = (
    officeCode: string,
    dateFrom: string,
    dateTo: string
) => {
    return useQuery({
        queryKey: ["report-statistics", officeCode, dateFrom, dateTo],
        queryFn: () => getReportStatistics(officeCode, dateFrom, dateTo),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: !!officeCode && !!dateFrom && !!dateTo,
    });
};