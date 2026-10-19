import { useQuery } from "@tanstack/react-query";

type HumanResourceResponse = {
    _id: string;
    firstName: string;
    lastName: string;
    status: string;
    role: string;
};

const getHumanResourceEmployees =
    async (): Promise<HumanResourceResponse[]> => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/admin/users/hr-employee`,
            {
                credentials: "include",
            }
        );

        if (!res.ok) {
            throw new Error(
                "Failed to fetch human resource employees"
            );
        }

        return res.json();
    };

export const useGetUsers = () => {
    return useQuery({
        queryKey: ["hr_employees"],
        queryFn: getHumanResourceEmployees,
        staleTime: 1000 * 60 * 5,
    });
};