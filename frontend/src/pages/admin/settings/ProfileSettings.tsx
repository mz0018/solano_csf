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
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        {/* Mobile Header */}
        <div>
          <h1 className="mb-3 text-base font-semibold text-slate-500 sm:text-lg lg:text-xl">Account Settings</h1>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile */}
            <div className="p-4 flex flex-col items-center justify-center gap-1">
                <div className="bg-[#628dec] border-7/20 border-green-500 mb-2 w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {user?.firstName?.charAt(0).toUpperCase() || "-"}
                </div>

                <small className="text-slate-500 text-base sm:text-lg lg:text-xl capitalize font-semibold text-center leading-none">
                    {user?.firstName || "-"} {user?.lastName || ""}
                </small>

                <small className="inline-flex max-w-full items-center rounded-full border border-slate-200 px-3 py-1.5  font-light text-[#628dec] sm:text-sm">
                    {role}
                </small>
            </div>

            {/* Account Details */}
            <div className="grid grid-cols-3 gap-4 p-4 text-left items-start">
                <div className="flex flex-col items-start">
                    <small>First Name</small>
                    <div className="capitalize text-slate-500">{user?.firstName || "-"}</div>
                </div>

                <div className="flex flex-col items-start">
                    <small>Last Name</small>
                    <div className="capitalize text-slate-500">{user?.lastName || "-"}</div>
                </div>

                <div className="flex flex-col items-start">
                    <small>Office Code</small>
                    <div className="capitalize text-slate-500">{user?.officeCode || "-"}</div>
                </div>

                <div className="col-start-1 col-end-4 flex flex-col items-start">
                    <small>User ID / Username</small>
                    <div className="capitalize">
                        {`${user?.id || "-"} - ${user?.userName || "-"}`}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
