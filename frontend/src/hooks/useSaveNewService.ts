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
  const [hasError, setHasError] = useState("");

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

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        setHasError(result.message || "Unable to save the service.");
      }

      clearInputs();
      
    } catch (err) {
      console.error("Something went wrong:", err);
      setHasError("Unable to save the service.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, hasError, handleSubmit, serviceName, serviceType, setServiceName, setServiceType };
};