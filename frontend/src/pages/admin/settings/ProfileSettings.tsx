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
    <>
    <div className="w-full">
        {/* Mobile Header */}
        <div className="mb-4 border-b border-gray-300 py-3 lg:hidden">
            <h1 className="text-lg font-semibold text-[#628dec]">
                Profile Information
            </h1>

            <p className="mt-1 text-sm leading-relaxed text-gray-900">
                View your account information and administrator details.
            </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden">
            {/* Profile Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
                {/* Name */}
                <div className="min-w-0 flex-1">
                    <h2 className="truncate text-base font-semibold capitalize text-gray-900 sm:text-lg">
                        {user?.firstName || "-"} {user?.lastName || ""}
                    </h2>

                    <p className="mt-0.5 truncate text-sm text-gray-500">
                        @{user?.userName || "-"}
                    </p>
                </div>

                {/* Status */}
                <div className="ml-auto shrink-0">
                    <span
                        className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 sm:px-3"
                        title="Active"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Active
                    </span>
                </div>
            </div>

            {/* Account Information */}
            <div className="px-4 py-5 sm:px-6 sm:py-6">
                <div className="mb-4 flex items-center gap-2 sm:mb-5">
                    <CircleUserRound
                        size={18}
                        className="shrink-0 text-gray-500"
                    />

                    <h3 className="text-sm font-semibold text-gray-800">
                        Account Information
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    {/* First Name */}
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-3 sm:px-4">
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            First Name
                        </span>

                        <p className="mt-1 break-words text-sm font-medium capitalize text-gray-800">
                            {user?.firstName || "-"}
                        </p>
                    </div>

                    {/* Last Name */}
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-3 sm:px-4">
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Last Name
                        </span>

                        <p className="mt-1 break-words text-sm font-medium capitalize text-gray-800">
                            {user?.lastName || "-"}
                        </p>
                    </div>

                    {/* Username */}
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-3 sm:px-4">
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Username
                        </span>

                        <p className="mt-1 break-words text-sm font-medium text-gray-800">
                            {user?.userName || "-"}
                        </p>
                    </div>

                    {/* Role */}
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-3 sm:px-4">
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Role
                        </span>

                        <p className="mt-1 break-words text-sm font-medium text-gray-800">
                            {role}
                        </p>
                    </div>

                    {/* Office Code */}
                    <div className="min-w-0 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-3 sm:col-span-2 sm:px-4">
                        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Office Code
                        </span>

                        <p className="mt-1 flex flex-wrap items-center gap-2 break-words text-sm font-medium text-gray-800">
                            <Building2
                                size={15}
                                className="shrink-0 text-gray-400"
                            />
                            <span className="break-all">
                                {user?.officeCode || "-"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  );
};

export default ProfileSettings;