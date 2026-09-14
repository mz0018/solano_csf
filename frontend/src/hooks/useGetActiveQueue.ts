import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSocket } from "./useSocket";

type ActiveQueue = {
  _id: string;
  code: string;
  status: string;
};

type ActiveQueueResponse = {
  queue: ActiveQueue[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  date: string;
  status: {
    expired: number;
    pending: number;
    used: number;
  };
};

const getActiveQueueByDate = async (
  page: number,
  statusFilter: string = ""
): Promise<ActiveQueueResponse> => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", "10");

  if (statusFilter) {
    params.append("status", statusFilter);
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/admin/active-queue?${params.toString()}`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch active queue");
  }

  return res.json();
};

export const useGetActiveQueue = (
  page: number = 1,
  statusFilter: string = ""
) => {
  const queryClient = useQueryClient();
  const { socketRef, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected) return;

    const socket = socketRef.current;
    if (!socket) return;

    const handler = () => {
      queryClient.invalidateQueries({
        queryKey: ["active-queue"],
      });
    };

    socket.on("ticket:created", handler);
    socket.on("ticket:used", handler);

    return () => {
      socket.off("ticket:created", handler);
      socket.off("ticket:used", handler);
    };
  }, [isConnected, queryClient, socketRef]);

  return useQuery({
    queryKey: ["active-queue", page, statusFilter],
    queryFn: () => getActiveQueueByDate(page, statusFilter),
    staleTime: 1000 * 60 * 5,
  });
};
