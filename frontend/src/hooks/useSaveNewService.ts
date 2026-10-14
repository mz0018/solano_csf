import { useState } from "react";

export type ServiceType = "external" | "internal" | "";

type ServiceData = {
  serviceName: string;
  serviceType: ServiceType;
};

// Keep validation rules in one place so handleSubmit stays easy to read.
const getValidationError = (data: ServiceData): string => {
  if (!data.serviceName.trim()) return "Service name is required.";
  if (!data.serviceType) return "Please select a service type.";
  return "";
};

export const useSaveNewService = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);

  const resetInputs = () => {
    setServiceName("");
    setServiceType("");
  };

  const handleSubmit = async (data: ServiceData) => {
    const validationError = getValidationError(data);

    if (validationError) {
      setHasError(validationError);
      return null;
    }

    setHasError("");
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
        setIsRateLimited(true);
        setHasError("Too many request. Please wait and try again later.");
        return null;
      }

      if (!response.ok || !result.success) {
        setHasError(result.message || "Unable to save the service.");
        return null;
      }

      resetInputs();
      return result;
    } catch (error) {
      console.error("Something went wrong:", error);
      setHasError("Unable to save the service.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    hasError,
    handleSubmit,
    serviceName,
    serviceType,
    setServiceName,
    setServiceType,
    isRateLimited,
  };
};