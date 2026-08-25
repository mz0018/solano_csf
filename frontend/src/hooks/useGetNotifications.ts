import { useQuery } from "@tanstack/react-query";

export type Notification = {
  _id: string;
  type: string;
  content: string;
  createdAt: string;
};

type NotificationsResponse = {
  notifications: Notification[];
};

const getNotifications = async (): Promise<NotificationsResponse> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/notifications`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return res.json();
};

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: 1000 * 60 * 5,
  });
};