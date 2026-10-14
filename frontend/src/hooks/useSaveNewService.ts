import { useState } from "react";

export type ServiceType = "external" | "internal" | "";

type ServiceData = {
  serviceName: string;
  serviceType: ServiceType;
};

export const useSaveNewService = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<string>("");
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false)

  const clearInputs = () => {
    setServiceName("");
    setServiceType("");
  };

  const handleSubmit = async (data: ServiceData) => {
    setHasError("");

    if (!data.serviceName.trim()) {
      setHasError("Service name is required.");
      return;
    }

    if (!data.serviceType) {
      setHasError("Please select a service type.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          serviceName: data.serviceName.trim(),
          serviceType: data.serviceType,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.status === 429) {
        setIsRateLimited(true)
        setHasError("Too many request. Please wait and try again later.");
        return null;
      }

      if (!response.ok || !result.success) {
        setHasError(result.message || "Unable to save the service.");
        return null;
      }

      clearInputs();
      return result;
      
    } catch (err) {
      console.error("Something went wrong:", err);
      setHasError("Unable to save the service.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, hasError, handleSubmit, serviceName, serviceType, setServiceName, setServiceType, isRateLimited };
};

