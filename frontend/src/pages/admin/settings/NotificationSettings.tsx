import { useEffect } from "react";
import { Bell } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { useSocket } from "../../../hooks/useSocket";
import { useGetNotifications } from "../../../hooks/useGetNotifications";
import { CSFCustomToaster } from "../../../utils/Toaster";

const NotificationSettings = () => {
  const { data, isLoading, isError } = useGetNotifications();
  const queryClient = useQueryClient();
  const { socketRef, isConnected } = useSocket();

  useEffect(() => {
    if (!isConnected) return;

    const socket = socketRef.current;
    if (!socket) return;

    const handler = (data: { message: string }) => {
      CSFCustomToaster.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    };

    socket.on("password:reset", handler);

    return () => {
      socket.off("password:reset", handler);
    };
  }, [isConnected, queryClient, socketRef]);

  if (isLoading) {
    return <p>Loading notifications...</p>;
  }

  if (isError) {
    return <p>Failed to load notifications.</p>;
  }

  const notifications = data?.notifications ?? [];

  return (
    <div className="w-full max-w-3xl space-y-6">

      {/* Page Header */}
      <div className="mb-4 border-b border-gray-300 py-3">
        <h1 className="text-xl font-semibold text-gray-900">
          Notification Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your recent account notifications and activity updates.
        </p>
      </div>

      {/* Notifications */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
              <Bell size={17} className="text-blue-600" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {notification.content}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
            <Bell
              size={24}
              className="mx-auto text-gray-400"
            />

            <p className="mt-2 text-sm font-medium text-gray-700">
              No notifications yet
            </p>

            <p className="mt-1 text-xs text-gray-500">
              You'll see account updates and important activity here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;
