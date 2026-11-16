import { useEffect } from 'react';
import { useSocket } from '../useSocket';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getReportStatisticService } from '../../services/OfficeAdminService';

export const useQueryGetActiveQueueHook = (page: number = 1, statusFilter: string = "") => {

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
    queryFn: () => getReportStatisticService(page, statusFilter),
    staleTime: 1000 * 60 * 5,
  });
};