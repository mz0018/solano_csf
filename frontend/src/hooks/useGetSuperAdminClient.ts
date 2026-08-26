import { useQuery } from "@tanstack/react-query"

export type SuperAdminClient = {
    _id: string
    firstName: string
    lastName: string
    userName: string
    officeCode: string
    role: string
    createdAt: string
}

const getSuperAdminClient = async (clientId: string): Promise<SuperAdminClient> => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/superadmin/clients/${clientId}`,
        { credentials: "include" }
    )

    if (!response.ok) {
        throw new Error("Failed to fetch client")
    }

    return response.json()
}

export const useGetSuperAdminClient = (clientId: string, enabled: boolean) => {
    return useQuery({
        queryKey: ["superadmin-client", clientId],
        queryFn: () => getSuperAdminClient(clientId),
        enabled: enabled && !!clientId,
        staleTime: 1000 * 60 * 5,
    })
}