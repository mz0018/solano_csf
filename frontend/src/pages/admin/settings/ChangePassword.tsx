import { useState } from "react";
import { Input } from "../../../ui/form/Input";
import { useChangePassword } from "../../../hooks/useChangePassword";
import { ErrorText } from "../../../ui/form/ErrorText";
import { AdminButton } from "../../../ui/form/AdminButton";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [currentPasswordError, setCurrentPasswordError] = useState<boolean>(false);
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const changePasswordMutation = useChangePassword();
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPasswordError(false);
    setNewPasswordError(false);
    setConfirmPasswordError(false);
    let valid = true;
    if (!currentPassword) {
      setCurrentPasswordError(true);
      valid = false;
    }
    if (!newPassword || newPassword.length < 8) {
      setNewPasswordError(true);
      valid = false;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true);
      valid = false;
    }
    if (!valid) return;
    changePasswordMutation.mutate({ currentPassword, newPassword });
  };
  const passwordRequirements = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
  };
  const isFormValid =
    currentPassword.trim() !== "" &&
    passwordRequirements.minLength &&
    passwordRequirements.hasUppercase &&
    passwordRequirements.hasLowercase &&
    passwordRequirements.hasNumber &&
    confirmPassword === newPassword;
  const isRateLimited = (changePasswordMutation.error as Error & { status?: number })?.status === 429;
  return (
    <div className="w-full max-w-2xl px-1 @sm:px-2 @lg:px-4">
      <span className="mb-4 block text-sm text-gray-500">
        To help protect your account, password changes are limited to once every 60 days.
      </span>
      <form onSubmit={handleChangePassword} className="w-full max-w-2xl space-y-4">
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <Input
            id="current-password"
            name="currentPassword"
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full min-w-0 rounded-md border border-gray-200 p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
            error={currentPasswordError ? "error" : undefined}
          />
          {currentPasswordError && <ErrorText message="Current password is required" />}
        </div>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <Input
            id="new-password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password (min 8 chars)"
            className="w-full min-w-0 rounded-md border border-gray-200 p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
            error={newPasswordError ? "error" : undefined}
          />
          {newPasswordError && <ErrorText message="Password must be at least 8 characters" />}
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full min-w-0 rounded-md border border-gray-200 p-3 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500"
            error={confirmPasswordError ? "error" : undefined}
          />
          {confirmPasswordError && <ErrorText message="Passwords do not match" />}
        </div>
        <div>
          <ul className="text-xs space-y-1">
            <li className={passwordRequirements.minLength ? "text-green-600" : "text-gray-500"}>
              ✓ At least 8 characters
            </li>
            <li className={passwordRequirements.hasUppercase ? "text-green-600" : "text-gray-500"}>
              ✓ At least one uppercase letter
            </li>
            <li className={passwordRequirements.hasLowercase ? "text-green-600" : "text-gray-500"}>
              ✓ At least one lowercase letter
            </li>
            <li className={passwordRequirements.hasNumber ? "text-green-600" : "text-gray-500"}>
              ✓ At least one number
            </li>
            <li
              className={
                confirmPassword.length > 0 && confirmPassword === newPassword
                  ? "text-green-600"
                  : "text-gray-500"
              }
            >
              ✓ Passwords match
            </li>
          </ul>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="rounded border-gray-300"
          />
          Show passwords
        </label>
        <AdminButton
          type="submit"
          icon="/icons/generate.svg"
          iconAlt="Service"
          disabled={changePasswordMutation.isPending || !isFormValid || isRateLimited}
          className="bg-[#2563EB] text-white hover:bg-[#2563EB]/90 transition-colors font-semibold whitespace-nowrap"
        >
          {changePasswordMutation.isPending ? "Changing..." : "Change Password"}
        </AdminButton>
      </form>
    </div>
  );
};