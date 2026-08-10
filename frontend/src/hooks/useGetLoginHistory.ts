import { useQuery } from "@tanstack/react-query";

export type LoginHistoryEntry = {
  ip: string;
  userAgent: string;
  loginAt: string;
  success: boolean;
};

type LoginHistoryResponse = {
  history: LoginHistoryEntry[];
  total: number;
  totalPages: number;
  page: number;
};

export const useGetLoginHistory = (page: number = 1, limit: number = 5) => {
  return useQuery<LoginHistoryResponse>({
    queryKey: ['login-history', page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login-history?${params}`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch login history');
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
};