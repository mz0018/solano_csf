import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const tabs = [
  { name: 'Profile Information', path: 'profile', icon: '/icons/user.svg', roles: ['office_admin', 'hr_admin', 'super_admin', 'head_office_admin'] },
  { name: 'Service Management', path: 'manage-services', icon: '/icons/service-management.svg', roles: ['head_office_admin', 'hr_admin'] },
  { name: 'Security', path: 'security', icon: '/icons/security.svg', roles: ['office_admin', 'hr_admin', 'super_admin', 'head_office_admin'] },
  { name: 'Notifications', path: 'notifications', icon: '/icons/notifications.svg', roles: ['office_admin', 'hr_admin', 'super_admin', 'head_office_admin'] },
]

export const SettingsLayout = () => {
  const { user } = useAuth()
  const visibleTabs = tabs.filter(({ roles }) => roles.includes(user?.role ?? ''))

  return (
    <div className="flex w-full flex-col gap-6 p-6 lg:flex-row">
      <nav className="flex w-full shrink-0 flex-col space-y-1 py-2 lg:w-80">
        {visibleTabs.map(({ name, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex min-h-10 items-center gap-3 rounded-md p-5 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-[#628dec] text-white'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#628dec]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={icon}
                  alt=""
                  className={`h-5 w-5 shrink-0 ${isActive ? 'brightness-0 invert' : ''}`}
                />
                <span>{name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  )
}