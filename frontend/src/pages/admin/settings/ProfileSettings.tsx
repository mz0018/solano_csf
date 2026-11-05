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
    <div className="@container rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4">

      {/* Two Columns */}
      <div className="grid min-w-0 grid-cols-1 gap-4 @lg:grid-cols-[30%_minmax(0,1fr)]">

        {/* Profile */}
        <div className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl border border-gray-200 bg-gray-50/50 p-4 sm:p-5 lg:p-6">

          <div className="mb-2 flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-8 border-green-400 bg-[#628dec] p-2 text-6xl font-bold text-white sm:h-36 sm:w-36 sm:text-7xl">
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
            <div className="flex min-w-0 flex-col items-start rounded-lg border border-gray-200 bg-gray-50/50 p-3 sm:p-4">
              <small className="flex items-center gap-2 text-[#628dec]">
                <img src="/icons/profile.svg" alt="" className="h-4 w-4 shrink-0" />
                First Name
              </small>
              <div className="mt-1 break-words text-base font-semibold capitalize text-slate-500 sm:text-lg">
                {user?.firstName || "-"}
              </div>
            </div>

            {/* Last Name */}
            <div className="flex min-w-0 flex-col items-start rounded-lg border border-gray-200 bg-gray-50/50 p-3 sm:p-4">
              <small className="flex items-center gap-2 text-[#628dec]">
                <img src="/icons/profile.svg" alt="" className="h-4 w-4 shrink-0" />
                Last Name
              </small>
              <div className="mt-1 break-words text-base font-semibold capitalize text-slate-500 sm:text-lg">
                {user?.lastName || "-"}
              </div>
            </div>

            {/* Office Code */}
            <div className="flex min-w-0 flex-col items-start rounded-lg border border-gray-200 bg-gray-50/50 p-3 sm:p-4">
              <small className="flex items-center gap-2 text-[#628dec]">
                <img src="/icons/service-management.svg" alt="" className="h-4 w-4 shrink-0" />
                Office Code
              </small>
              <div className="mt-1 break-words text-base font-semibold text-slate-500 sm:text-lg">
                {user?.officeCode || "-"}
              </div>
            </div>

            {/* User ID / Username */}
            <div className="col-span-1 flex min-w-0 flex-col items-start rounded-lg border border-gray-200 bg-gray-50/50 p-3 @lg:col-span-2 sm:p-4">
              <small className="flex items-center gap-2 text-[#628dec]">
                <img src="/icons/user.svg" alt="" className="h-4 w-4 shrink-0" />
                User ID / Username
              </small>
              <div className="mt-1 w-full break-all text-base font-semibold text-slate-500 sm:text-lg">
                {`${user?.id || "-"} - ${user?.userName || "-"}`}
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
