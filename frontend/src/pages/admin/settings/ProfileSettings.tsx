import {
  Building2,
  CircleUserRound,
} from "lucide-react";

import { useGetUserProfile } from "../../../hooks/useGetUserProfile";
import { ErrorText } from "../../../ui/form/ErrorText";
import { InlineLoader } from "../../../components/Loader";

const ProfileSettings = () => {
  const { data, isLoading, isError, error } = useGetUserProfile();

  if (isLoading) return <InlineLoader />;

  if (isError) {
    return <ErrorText message={(error as Error).message} />;
  }

  const user = data?.user;

  const role =
    user?.role === "hr_admin"
      ? "Human Resource Management"
      : user?.role === "office_admin"
        ? "Office Administrator"
        : user?.role === "head_office_admin"
          ? "Head Office Administrator"
          : user?.role === "super_admin"
            ? "Super Administrator"
            : "-";

  return (
    <div className="w-full max-w-3xl space-y-6">
      <div className="mb-4 border-b border-gray-300 py-3">
          <h1 className="text-xl font-semibold text-gray-900">
              Profile Information
          </h1>

          <p className="mt-1 text-sm text-gray-500">
              View your account information and administrator details.
          </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden bg-white shadow-sm">

        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b border-gray-200 bg-gray-50 px-6 py-5">

          {/* Name */}
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold capitalize text-gray-900">
              {user?.firstName || "-"} {user?.lastName || ""}
            </h2>

            <p className="mt-0.5 text-sm text-gray-500">
              @{user?.userName || "-"}
            </p>
          </div>

          {/* Status */}
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
          </div>
        </div>

        {/* Account Information */}
        <div className="px-6 py-6">

          <div className="mb-5 flex items-center gap-2">
            <CircleUserRound size={18} className="text-gray-500" />

            <h3 className="text-sm font-semibold text-gray-800">
              Account Information
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* First Name */}
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                First Name
              </span>

              <p className="mt-1 capitalize text-sm font-medium text-gray-800">
                {user?.firstName || "-"}
              </p>
            </div>

            {/* Last Name */}
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Last Name
              </span>

              <p className="mt-1 capitalize text-sm font-medium text-gray-800">
                {user?.lastName || "-"}
              </p>
            </div>

            {/* Username */}
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Username
              </span>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {user?.userName || "-"}
              </p>
            </div>

            {/* Role */}
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Role
              </span>

              <p className="mt-1 text-sm font-medium text-gray-800">
                {role}
              </p>
            </div>

            {/* Office Code */}
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 sm:col-span-2">
              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Office Code
              </span>

              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-800">
                <Building2 size={15} className="text-gray-400" />
                {user?.officeCode || "-"}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
