import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useSocket } from "../../../hooks/useSocket"
import { useGetNotifications } from "../../../hooks/useGetNotifications"
import { CSFCustomToaster } from "../../../utils/Toaster"

const NotificationSettings = () => {
  const { data, isLoading, isError } = useGetNotifications()
  const queryClient = useQueryClient()
  const { socketRef, isConnected } = useSocket()

  useEffect(() => {
    if (!isConnected) return

    const socket = socketRef.current
    if (!socket) return

    const handler = (data: { message: string }) => {
      CSFCustomToaster.success(data.message)

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      })
    }

    socket.on("password:reset", handler)

    return () => {
      socket.off("password:reset", handler)
    }
  }, [isConnected, queryClient, socketRef])

  if (isLoading) {
    return <p>Loading notifications...</p>
  }

  if (isError) {
    return <p>Failed to load notifications.</p>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Notification Settings</h2>

      {data?.notifications.map((notification) => (
        <div
          key={notification._id}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-sm">-</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">
              {notification.content}
            </p>

            <small className="text-xs text-gray-500">
              {new Date(notification.createdAt).toLocaleString()}
            </small>
          </div>
        </div>
      ))}

      {data?.notifications.length === 0 && (
        <p className="text-gray-600">No notifications yet.</p>
      )}
    </div>
  )
}

export default NotificationSettings
