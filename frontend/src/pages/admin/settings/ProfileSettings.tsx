import { useGetUserProfile } from "../../../hooks/useGetUserProfile";
import { ErrorText } from "../../../ui/form/ErrorText";
import { InlineLoader } from "../../../components/Loader";

const ProfileSettings = () => {
  const { data, isLoading, isError, error } = useGetUserProfile();

  if (isLoading) return <InlineLoader />;
  if (isError) return <ErrorText message={(error as Error).message} />;

  const user = data?.user;

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Profile Information</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">First Name</label>
            <p className="font-medium capitalize">{user?.firstName || '-'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Last Name</label>
            <p className="font-medium capitalize">{user?.lastName || '-'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Username</label>
            <p className="font-medium">{user?.userName || '-'}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Role</label>
            <p className="font-medium capitalize">
              {user?.role
              ? user.role === "hr_admin"
                ? "Human Resource Management"
                : "Office Administrator"
              : "-"}
            </p>
          </div>
          <div className="col-span-2">
            <label className="text-sm text-gray-500">Office Code</label>
            <p className="font-medium">{user?.officeCode || '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings