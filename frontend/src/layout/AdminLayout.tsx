import { Outlet } from 'react-router-dom'
import { SidebarUI } from '../ui/SidebarUI'
import { MainLayoutUI } from '../ui/MainLayoutUI'
import { Radio, Settings2, Files } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const AdminLayout = () => {

  const { user } = useAuth()

  const navLinks = [
    { name: 'Live Monitoring', path: '/admin/queue/monitor', icon: <Radio size={20} />, roles: ['office_admin', 'hr_admin'] },
    {
      name: 'Reports',
      icon: <Files size={20} />,
      roles: ['hr_admin'],
      children: [
        { name: 'Queue Statistics', path: '/admin/queue/statistics', roles: ['hr_admin'] },
        { name: 'Review Office Feedback', path: '/admin/queue/offices/feedbacks', roles: ['hr_admin'] },
      ]
    },
    { name: 'Settings', path: '/admin/settings', icon: <Settings2 size={20} />, roles: ['office_admin', 'hr_admin'] }
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

      <SidebarUI navLinks={filteredNavLinks} user={user} />

      <main className="flex-1 p-6 w-full border-l border-gray-200" style={{ overflowY: 'auto' }}>
        <MainLayoutUI>
          <Outlet />
        </MainLayoutUI>
      </main>

    </div>
  )
}

export default AdminLayout