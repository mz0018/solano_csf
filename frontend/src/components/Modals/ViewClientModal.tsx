import { ModalUI } from "../../ui/form/ModalUI"
import { Button } from "../../ui/form/Buttons"
import { useGetSuperAdminClient } from "../../hooks/useGetSuperAdminClient"

interface ViewClientModalProps {
  open: boolean
  onClose: () => void
  selectedClientId: string
}

export const ViewClientModal = ({
  open,
  onClose,
  selectedClientId,
}: ViewClientModalProps) => {
  const { data: client, isLoading, error } = useGetSuperAdminClient(
    selectedClientId,
    open
  )

  const handleResetPassword = async (clientId: string) => {
    if (!confirm("Are you sure you want to reset this client's password?")) {
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/superadmin/password/reset/${clientId}`,
        {
          method: "POST",
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to reset password")
      }

      alert("Password reset successfully. Default password: 12345678")
    } catch (err) {
      alert((err as Error).message)
    }
  }

  return (
    <ModalUI
      isOpen={open}
      onClose={onClose}
      title="Client Details"
    >
      <div className="w-full overflow-hidden rounded-sm border border-gray-200 bg-white">
        {isLoading ? (
          <div className="p-4">
            <p className="text-sm text-gray-500">Loading client...</p>
          </div>
        ) : error ? (
          <div className="p-4">
            <p className="text-sm text-red-500">
              {(error as Error).message}
            </p>
          </div>
        ) : client ? (
          <>
            {/* Client Information */}
            <div className="border-b border-gray-200 px-3 py-3 sm:px-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                <div className="min-w-0">
                  <p className="tracking-wider text-[10px] text-gray-400 uppercase sm:text-xs">
                    Name:
                  </p>
                  <p className="break-words text-xs font-medium sm:text-sm">
                    {client.firstName} {client.lastName}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="tracking-wider text-[10px] text-gray-400 uppercase sm:text-xs">
                    Username:
                  </p>
                  <p className="break-words text-xs font-medium sm:text-sm">
                    {client.userName}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="tracking-wider text-[10px] text-gray-400 uppercase sm:text-xs">
                    Office:
                  </p>
                  <p className="break-words text-xs font-medium sm:text-sm">
                    {client.officeCode}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="tracking-wider text-[10px] text-gray-400 uppercase sm:text-xs">
                    Role:
                  </p>
                  <p className="break-words text-xs font-medium sm:text-sm">
                    {client.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Password Actions */}
            <div className="px-3 py-3 sm:px-4">
              <div className="flex flex-col gap-3 rounded-md border border-gray-200 bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-700 sm:text-sm">
                    Password
                  </p>
                  <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs">
                    Reset this client's password to the default password.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={() => handleResetPassword(selectedClientId)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-[#628dec] bg-white px-3 py-2 text-xs font-medium text-[#628dec] transition hover:bg-[#628dec] hover:text-white sm:text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-1.5 0h12a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5Z"
                    />
                  </svg>
                  Reset Password
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </ModalUI>
  )
}
