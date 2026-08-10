import { Button } from "../../ui/form/Buttons";

interface PasswordAssistanceModalProps {
  open: boolean;
  onClose: () => void;
}

export const PasswordAssistanceModal = ({ open, onClose }: PasswordAssistanceModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-[var(--theme-nav-bg)]/95 border border-[var(--theme-border)] p-6 shadow-xl">
        
        <h2 className="text-xl font-semibold text-[var(--theme-text)]">
          Password Assistance
        </h2>

        <p className="mt-4 text-[var(--theme-text)]/70">
          If you've forgotten your password, please contact your system administrator
          to have your password reset.
        </p>

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