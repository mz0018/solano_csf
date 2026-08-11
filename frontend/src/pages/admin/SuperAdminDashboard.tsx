import { useAuth } from '../../context/AuthContext'
import { AdminResponsiveContainer } from '../../ui/form/AdminResponsiveContainer'

const SuperAdminDashboard = () => {
  const { user } = useAuth()

  return (
    <AdminResponsiveContainer>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Super Admin Dashboard</h1>
          <p className="text-sm text-[#6b7280]">
            Welcome back, {user?.userName}. This is your system overview page for super admin access.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-5 shadow-sm">
            <h2 className="text-lg font-medium">System Status</h2>
            <p className="mt-2 text-sm text-[#6b7280]">Review current system health, admin activity, and configuration alerts.</p>
          </div>

          <div className="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-5 shadow-sm">
            <h2 className="text-lg font-medium">User Access</h2>
            <p className="mt-2 text-sm text-[#6b7280]">Manage super admin-level users and monitor role-based access across the portal.</p>
          </div>

          <div className="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-5 shadow-sm">
            <h2 className="text-lg font-medium">Reports</h2>
            <p className="mt-2 text-sm text-[#6b7280]">View high-level reports and export information for senior administration.</p>
          </div>

          <div className="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-5 shadow-sm">
            <h2 className="text-lg font-medium">Settings</h2>
            <p className="mt-2 text-sm text-[#6b7280]">Configure global system settings and monitor configuration changes.</p>
          </div>
        </div>
      </div>
    </AdminResponsiveContainer>
  )
}

export default SuperAdminDashboard
