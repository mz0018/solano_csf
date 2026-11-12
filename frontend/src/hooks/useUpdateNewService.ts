import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type ServiceStatus = "active" | "inactive";

export const useUpdateNewService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrorsUpdate, setHasErrorsUpdate] = useState<string | null>(null);
  const [isRateLimitedUpdate, setIsRateLimitedUpdate] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const updateServiceStatus = async (serviceId: string, status: ServiceStatus) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/services/${serviceId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );
      const result = await response.json().catch(() => ({}));

      if (response.status === 429) {
				setIsRateLimitedUpdate(true)
				setHasErrorsUpdate("Too many request. Please wait and try again later.");
        throw new Error("Too many request. Please wait and try again later.");
			}

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to update the service.");
      }

      await queryClient.invalidateQueries({ queryKey: ["office-services"] });
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, updateServiceStatus, hasErrorsUpdate, setHasErrorsUpdate, isRateLimitedUpdate };
};