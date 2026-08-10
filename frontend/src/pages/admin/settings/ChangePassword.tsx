import { useState } from "react";
import { Input } from "../../../ui/form/Input";
import { useChangePassword } from "../../../hooks/useChangePassword";
import { ErrorText } from "../../../ui/form/ErrorText";
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
    <>
      <span className="text-sm text-gray-500 mb-4">
        To help protect your account, password changes are limited to once every 60 days.
      </span>
      <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full text-black"
            error={currentPasswordError ? "error" : undefined}
          />
          {currentPasswordError && <ErrorText message="Current password is required" />}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password (min 8 chars)"
            className="w-full text-black"
            error={newPasswordError ? "error" : undefined}
          />
          {newPasswordError && <ErrorText message="Password must be at least 8 characters" />}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <Input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full text-black"
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
        <button
          type="submit"
          disabled={changePasswordMutation.isPending || !isFormValid || isRateLimited}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {changePasswordMutation.isPending ? "Changing..." : "Change Password"}
        </button>
      </form>
    </>
  );
};