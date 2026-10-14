import { Outlet, NavLink } from 'react-router-dom'
import { User, Shield, Bell, HandCoins } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const tabs = [
  { name: 'Profile Information', path: 'profile', icon: User, roles: ['office_admin', 'hr_admin', 'super_admin', 'head_office_admin'] },
  { name: 'Service Management', path: 'manage-services', icon: HandCoins, roles: ['head_office_admin', 'hr_admin'] },
  { name: 'Security', path: 'security', icon: Shield, roles: ['office_admin', 'hr_admin', 'super_admin', 'head_office_admin'] },
  { name: 'Notifications', path: 'notifications', icon: Bell, roles: ['office_admin', 'hr_admin', 'super_admin', 'head_office_admin'] },
]

export const SettingsLayout = () => {
  const { user } = useAuth()
  const visibleTabs = tabs.filter(({ roles }) => roles.includes(user?.role ?? ''))

  return (
    <>
      <div className="flex w-full flex-col lg:flex-row gap-6 p-6">
        <nav className="w-full lg:w-64 flex-shrink-0 space-y-1 rounded-lg p-2">
          {visibleTabs.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `sidebar-link-child-border text-sm font-medium flex items-center gap-3 px-4 py-2 rounded-md text-md transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#eff6ff] active'
                    : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#1f2937]'
                }`
              }
            >
              <Icon size={20} />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </>
  )
}