import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CSFCustomToaster } from "../utils/Toaster";

interface ApiError extends Error {
  status: number;
}

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        const error = new Error(data.message || 'Failed to change password') as ApiError;
        error.status = res.status;
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      CSFCustomToaster.success('Password changed. Please log in again.');
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      setTimeout(() => {
        window.location.href = '/signin';
      }, 1500);
    },
    onError: (error: Error) => {
      CSFCustomToaster.error(error.message);
    }
  });
};