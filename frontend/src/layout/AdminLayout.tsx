import { Outlet } from 'react-router-dom'
import { SidebarUI } from '../ui/SidebarUI'
import { MainLayoutUI } from '../ui/MainLayoutUI'
import { Radio, Settings2, Files, BrickWallShield, HandCoins } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { AdminNavbar } from '../components/Navbar/AdminNavbar'

const AdminLayout = () => {

  const { user } = useAuth()

  const navLinks = [
    { name: 'Overview', path: '/admin/overview', icon: <Radio size={20} />, roles: ['super_admin'] },
    { name: 'Dashboard', path: '/admin/queue/dashboard', icon: <BrickWallShield size={20} />, roles: ['office_admin', 'hr_admin', 'head_office_admin'] },
    { name: 'Live Monitoring', path: '/admin/queue/monitor', icon: <Radio size={20} />, roles: ['office_admin', 'hr_admin', 'head_office_admin'] },
    { name: 'Total Service Rendered', path: '/admin/queue/service/rendered', icon: <HandCoins size={20} />, roles: ['head_office_admin'] },
    {
      name: 'Reports',
      icon: <Files size={20} />,
      roles: ['hr_admin', 'super_admin'],
      children: [
        { name: 'Queue Statistics', path: '/admin/queue/statistics', roles: ['hr_admin', 'super_admin'] },
        { name: 'Review Office Feedback', path: '/admin/queue/offices/feedbacks', roles: ['hr_admin', 'super_admin'] },
      ]
    },
    { name: 'Settings', path: '/admin/settings', icon: <Settings2 size={20} />, roles: ['office_admin', 'hr_admin', 'super_admin', 'head_office_admin'] }
  ]

  const filteredNavLinks = navLinks.filter((link) =>
    link.roles.includes(user?.role ?? '')
  )

  return (
    <div id="admin-theme" className="h-screen bg-gray-100 lg:flex" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', transform: 'none' }}>
      <style>{`
        #admin-theme span { color: inherit !important; }
        #admin-theme aside button:hover, #admin-theme aside a:hover { transform: none !important; }
      `}</style>


      <div className="flex w-full">
        <SidebarUI navLinks={filteredNavLinks} user={user} />

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminNavbar />

          <main className="flex-1 overflow-y-auto p-6">
            <MainLayoutUI>
              <Outlet />
            </MainLayoutUI>
          </main>
        </div>
      </div>

    </div>
  )
}

export default AdminLayout