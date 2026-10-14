import { useState } from "react";

export type ServiceType = "external" | "internal" | "";

type ServiceData = {
  serviceName: string;
  serviceType: ServiceType;
};

export const useSaveNewService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

  const handleSubmit = (data: ServiceData) => {
    setHasError("");

    if (!data.serviceName.trim()) {
      setHasError("Service name is required.");
      return;
    }

    if (!data.serviceType) {
      setHasError("Please select a service type.");
      return;
    }

    try {
      console.log("Data:", data);
    } catch (err) {
      console.error("Something went wrong:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, hasError, handleSubmit };
};