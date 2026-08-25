import { Button } from "../../ui/form/Buttons";

interface ViewClientModalProps {
  open: boolean;
  onClose: () => void;
  selectedClientId: string
}

export const ViewClientModal = ({ open, onClose, selectedClientId }: ViewClientModalProps) => {
  if (!open) return null;

    const handleResetPassword = async (clientId: string) => {
        if (!confirm("Are you sure you want to reset this client's password?")) return
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/superadmin/password/reset/${clientId}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            )
            if (!response.ok) throw new Error("Failed to reset password")
            alert("Password reset successfully. Default password: 12345678")
        } catch (err) {
            alert((err as Error).message)
        }
    }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-md bg-white p-6 border border-[#e5e7eb]">
        
        <h2 className="text-xl font-semibold">
          View Client
        </h2>

        <Button 
            className="bg-red-500 hover:bg-red-600 text-white" 
            onClick={() => handleResetPassword(selectedClientId)}
        >
            Reset Password
        </Button>

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-[#628dec] mt-6 px-6 py-3 font-semibold text-gray-200 transition hover:opacity-90"
          >
            Close
          </Button>
        </div>

      </div>
    </div>
  );
};