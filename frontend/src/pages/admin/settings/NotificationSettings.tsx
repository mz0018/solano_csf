import { useEffect, useState } from "react"
import { useSocket } from "../../../hooks/useSocket"
import { CSFCustomToaster } from "../../../utils/Toaster"

const NotificationSettings = () => {
  const { socketRef, isConnected } = useSocket()
  const [showResetMessage, setShowResetMessage] = useState(false)

  useEffect(() => {
    if (!isConnected) return

    const socket = socketRef.current
    if (!socket) return

    const handler = (data: { message: string }) => {
      CSFCustomToaster.success(data.message)
      setShowResetMessage(true)
    }

    socket.on("password:reset", handler)

    return () => {
      socket.off("password:reset", handler)
    }
  }, [isConnected, socketRef])

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Notification Settings</h2>
      
      {showResetMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          Password changed please sign in again.
        </div>
      )}

      <p className="text-gray-600">
        You'll receive notifications here when your password is reset by an administrator.
      </p>
    </div>
  )
}

export default NotificationSettings