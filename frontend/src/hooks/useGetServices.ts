import { useQueryClient } from "@tanstack/react-query"

export type Service = {
  code: string
  name: string
}

const getOfficeServices = async (): Promise<Service[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/admin/services`,
    {
      credentials: "include",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch services")
  }

  return res.json()
}

export const useGetServices = () => {
  const queryClient = useQueryClient()

  const getOfficeService = async () => {
    try {
      const services = await queryClient.fetchQuery({
        queryKey: ["office-services"],
        queryFn: getOfficeServices,
        staleTime: 1000 * 60 * 60,
      })

      console.log("Services:", services)

      return services
    } catch (err) {
      console.error("Something went wrong!", err)
    }
  }

  return { getOfficeService }
}