import { useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"

export type ChildService = {
  _id: string
  code: string
  name: string
  status: string
  type: string
}

const getOfficeChildServices = async (): Promise<ChildService[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/admin/child-services`,
    {
      credentials: "include",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch child services")
  }

  return res.json()
}

export const useGetChildServices = () => {
  const queryClient = useQueryClient()

  const getChildServices = useCallback(async () => {
    try {
      const childServices = await queryClient.fetchQuery({
        queryKey: ["office-child-services"],
        queryFn: getOfficeChildServices,
        staleTime: 1000 * 60 * 60,
      })

      return childServices
    } catch (err) {
      console.error("Something went wrong!", err)
    }
  }, [queryClient])

  return { getChildServices }
}