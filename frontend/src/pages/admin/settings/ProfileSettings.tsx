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
    <div className="@container rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4 bg-gradient-to-l from-blue-50 to-white">

      {/* Header */}
      <div className="mb-4 border-b border-gray-300 py-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="min-w-0 text-2xl font-bold text-[#003566] lg:text-3xl">
              Profile Information
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-relaxed tracking-wide text-[#000814] sm:text-base md:text-md">
              View your personal information, account details, and assigned administrative role.
            </p>
          </div>
        </div>
      </div>

      {/* Two Columns */}
      <div className="grid min-w-0 grid-cols-1 gap-4 @lg:grid-cols-[30%_minmax(0,1fr)]">

        {/* Profile */}
        <div className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 lg:p-6">

          <div className="mb-2 flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-8 border-[#FFC300] bg-[#628dec] p-2 text-6xl font-bold text-white sm:h-36 sm:w-36 sm:text-7xl">
            {user?.firstName?.charAt(0).toUpperCase() || "-"}
          </div>

          <small className="text-center text-base font-semibold capitalize leading-none text-slate-500 sm:text-lg lg:text-xl">
            {user?.firstName || "-"} {user?.lastName || ""}
          </small>

          <small className="inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-xs font-light text-[#628dec] sm:text-sm">
            {role}
          </small>

        </div>

        {/* Account Details */}
        <div className="@container min-w-0 w-full rounded-xl border border-gray-200 bg-white p-3 text-left sm:p-4 lg:p-5">

          <div className="grid min-w-0 grid-cols-1 items-start gap-3 @lg:grid-cols-2 sm:gap-4">

            {/* First Name */}
            <div className="flex min-w-0 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3 sm:p-4">
                <div className="rounded-full border-2 border-[#FFC300] p-2">
                  <img
                    src="/icons/profile.svg"
                    alt=""
                    className="h-6 w-6 shrink-0"
                  />
                </div>

                <div className="flex min-w-0 flex-col">
                    <small className="text-sm text-[#003566]">
                        First Name
                    </small>

                    <div className="mt-0.5 break-words text-base font-semibold capitalize text-[#003566] sm:text-lg">
                        {user?.firstName || "-"}
                    </div>
                </div>
            </div>

            {/* Last Name */}
            <div className="flex min-w-0 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3 sm:p-4">
                <div className="rounded-full border-2 border-[#FFC300] p-2">
                  <img
                    src="/icons/profile.svg"
                    alt=""
                    className="h-6 w-6 shrink-0"
                  />
                </div>

                <div className="flex min-w-0 flex-col">
                    <small className="text-sm text-[#003566]">
                        Last Name
                    </small>

                    <div className="mt-0.5 break-words text-base font-semibold capitalize text-[#003566] sm:text-lg">
                        {user?.lastName || "-"}
                    </div>
                </div>
            </div>

            {/* Office Code */}
            <div className="flex min-w-0 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3 sm:p-4">
                <div className="rounded-full border-2 border-[#FFC300] p-2">
                  <img
                    src="/icons/service-management.svg"
                    alt=""
                    className="h-6 w-6 shrink-0"
                  />
                </div>

                <div className="flex min-w-0 flex-col">
                    <small className="text-sm text-[#003566]">
                        Office Code
                    </small>

                    <div className="mt-0.5 break-words text-base font-semibold capitalize text-[#003566] sm:text-lg">
                        {user?.officeCode || "-"}
                    </div>
                </div>
            </div>

            {/* User ID / Username */}
            <div className="col-span-1 flex min-w-0 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3 @lg:col-span-2 sm:p-4">
                <div className="rounded-full border-2 border-[#FFC300] p-2">
                  <img
                    src="/icons/user.svg"
                    alt=""
                    className="h-6 w-6 shrink-0"
                  />
                </div>

                <div className="flex min-w-0 flex-col">
                    <small className="text-sm text-[#003566]">
                        User ID / Username
                    </small>

                    <div className="mt-0.5 w-full break-all text-base font-semibold text-[#003566] sm:text-lg">
                        {`${user?.id || "-"} - ${user?.userName || "-"}`}
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfileSettings;
