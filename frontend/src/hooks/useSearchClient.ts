import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"

type Client = {
    _id: string
    firstName: string
}

const searchClients = async (search: string): Promise<Client[]> => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/superadmin/clients?search=${encodeURIComponent(search)}`,
        {
            credentials: "include",
        }
    )

    if (!response.ok) {
        throw new Error("Failed to search clients")
    }

    return response.json()
}

export const useSearchClient = () => {
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim())
        }, 400)

        return () => {
            clearTimeout(timer)
        }
    }, [search])

    const {
        data: results = [],
        isLoading,
        isFetching,
        error,
    } = useQuery({
        queryKey: ["clients", "search", debouncedSearch],
        queryFn: () => searchClients(debouncedSearch),
        enabled: debouncedSearch.length > 0,
        staleTime: 30_000,
    })

    return {
        search,
        setSearch,
        results,
        isLoading,
        isFetching,
        error,
    }
}
