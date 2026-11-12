import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Service } from "./useGetServices";

type ServiceChanges = Partial<Pick<Service, "name" | "type">>;

export const useServicePartialUpdate = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasErrors, setHasErrors] = useState<string | null>(null);
	const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const updateService = async (service: Service, edited: ServiceChanges) => {
		const updates: ServiceChanges = {};
		if (edited.name !== service.name) updates.name = edited.name;
		if (edited.type !== service.type) updates.type = edited.type;
		if (Object.keys(updates).length === 0) return null;

		setIsLoading(true);
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/admin/services/update/${service._id}`,
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify(updates),
				}
			);
			const result = await response.json();

			if (response.status === 429) {
				setIsRateLimited(true)
				setHasErrors("Too many request. Please wait and try again later.");
				return null;
			}

			if (!response.ok || !result.success) {
				throw new Error(result.message || "Unable to update the service.");
			}

			await queryClient.invalidateQueries({ queryKey: ["office-services"] });
			return { updates, message: result.message };
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, updateService, hasErrors, setHasErrors, isRateLimited };
};
