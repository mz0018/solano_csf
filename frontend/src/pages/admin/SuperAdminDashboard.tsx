import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { AdminResponsiveContainer } from '../../ui/form/AdminResponsiveContainer'
import { SuperAdminClientChangePasswordModal } from '../../components/Modals/SuperAdminClientChangePasswordModal'

const SuperAdminDashboard = () => {
  const { user } = useAuth()

  const [showPasswordReset, setShowPasswordReset] = useState<boolean>(false)

  return (
    <>
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
          <button type="button" onClick={() => setShowPasswordReset(true)} className="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-5 text-left shadow-sm transition hover:border-blue-300 hover:bg-blue-50" > 
            <h2 className="text-lg font-medium"> Password Reset for Client </h2> <p className="mt-2 text-sm text-[#6b7280]"> Reset a client's password. </p> </button>
        </div>
      </div>
    </AdminResponsiveContainer>
    <SuperAdminClientChangePasswordModal 
      passwordModalOpen={showPasswordReset}
      setPasswordModalOpen={setShowPasswordReset}
    />
    </>
  )
}

export default SuperAdminDashboard
