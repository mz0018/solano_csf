import { useQuery } from "@tanstack/react-query";

type Office = {
    code: string;
    name: string;
}

const getOffices = async (): Promise<Office[]> => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/offices`,
        { credentials: 'include' }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch offices')
    }

    return res.json();
};

const ONE_HOUR = 1000 * 60 * 60;

export const useGetOffices = () => {
    return useQuery({
        queryKey: ['offices'],
        queryFn: getOffices,
        staleTime: ONE_HOUR,
        gcTime: ONE_HOUR,
    })
}