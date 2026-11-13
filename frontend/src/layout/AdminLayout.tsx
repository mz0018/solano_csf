
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarUI } from '../ui/SidebarUI'
import { useAuthorize } from '../hooks/useAuthorize'
import { AdminNavbar } from '../components/Navbar/AdminNavbar'

const AdminLayout = () => {
  const { user } = useAuthorize()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-collapsed')
      if (saved !== null) return JSON.parse(saved)
      return window.innerWidth < 1024
    }
    return false
  })

  const navLinks = [
    {
      name: 'Overview',
      path: '/admin/overview',
      icon: '/icons/overview.svg',
      roles: ['super_admin'],
      section: 'General',
    },
    {
      name: 'Dashboard',
      path: '/admin/queue/dashboard',
      icon: '/icons/colored-dashboard.svg',
      roles: ['office_admin', 'hr_admin', 'head_office_admin'],
      section: 'General',
    },
    {
      name: 'Live Monitoring',
      path: '/admin/queue/monitor',
      icon: '/icons/colored-monitor.svg',
      roles: ['office_admin', 'hr_admin', 'head_office_admin'],
      section: 'General',
    },
    {
      name: 'Total Service Rendered',
      path: '/admin/queue/service/rendered',
      icon: '/icons/colored-hand.svg',
      roles: ['head_office_admin', 'hr_admin'],
      section: 'Reports',
    },
    {
      name: 'Reports',
      icon: '/icons/colored-reports.svg',
      roles: ['hr_admin', 'super_admin'],
      section: 'Reports',
      children: [
        {
          name: 'Queue Statistics',
          path: '/admin/queue/statistics',
          roles: ['hr_admin', 'super_admin'],
        },
        {
          name: 'Review Office Feedback',
          path: '/admin/queue/offices/feedbacks',
          roles: ['hr_admin', 'super_admin'],
        },
      ],
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: '/icons/colored-settings.svg',
      roles: [
        'office_admin',
        'hr_admin',
        'super_admin',
        'head_office_admin',
      ],
      section: 'Others',
    },
  ]

  const filteredNavLinks = navLinks.filter((link) =>
    link.roles.includes(user?.role ?? '')
  )

  return (
    <div
      id="admin-theme"
      className="flex h-screen min-h-0 bg-gray-100"
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        transform: 'none',
      }}
    >
      <style>{`
        #admin-theme span { color: inherit !important; }
        #admin-theme aside button:hover,
        #admin-theme aside a:hover {
          transform: none !important;
        }
      `}</style>

      <div className="flex h-full min-h-0 w-full flex-col">
        <AdminNavbar
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() =>
            setSidebarCollapsed((collapsed: boolean) => !collapsed)
          }
        />

        <div className="flex min-h-0 min-w-0 flex-1 pl-16 lg:pl-0">
          <SidebarUI
            navLinks={filteredNavLinks}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />

          <main
            className="min-h-0 flex-1 overflow-y-auto bg-slate-100 p-6"
            style={{
              backgroundImage:
                "linear-gradient(rgba(241, 245, 249, 0.88), rgba(241, 245, 249, 0.88)), url('/img/solano_logo_optimized_bg_remove.png')",
              backgroundPosition: "center, right 30px bottom 30px",
              backgroundRepeat: "no-repeat, no-repeat",
              backgroundSize: "100% 100%, min(25rem, 65vw)",
              backgroundAttachment: "fixed, fixed",
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
