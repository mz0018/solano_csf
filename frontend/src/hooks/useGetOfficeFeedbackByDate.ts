import { useQuery } from "@tanstack/react-query";

// type OfficeFeedbackParams = {
//     officeCode: string;
//     month: string;
//     year: string;
//     page?: number;
//     limit?: number;
// }

const getOfficeFeedbacks = async (
    officeCode: string,
    month: string,
    year: string,
    page: number,
    limit: number
) => {

    const params = new URLSearchParams({ officeCode, month, year, page: String(page), limit: String(limit) });

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/office-feedbacks?${params}`,
        { credentials: "include" }
    )

    if (!res.ok) {
        throw new Error("Failed to fetch office feedbacks");
    }

    return res.json();
};

export const useGetOfficeFeedbackByDate = (
  officeCode: string,
  month: string,
  year: string,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["office-feedback", officeCode, month, year, page, limit],
    queryFn: () => getOfficeFeedbacks(officeCode, month, year, page, limit),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!officeCode && !!month && !!year
  })
}