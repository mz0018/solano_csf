import { Outlet, NavLink } from 'react-router-dom'
import { User, Shield, Bell } from 'lucide-react'

const tabs = [
  { name: 'Profile Information', path: 'profile', icon: User },
  { name: 'Security', path: 'security', icon: Shield },
  { name: 'Notifications', path: 'notifications', icon: Bell },
]

export const SettingsLayout = () => (
  <div className="flex flex-col lg:flex-row gap-6 p-6">
    <nav className="w-full lg:w-56 flex-shrink-0 space-y-1 rounded-lg p-2">
      {tabs.map(({ name, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `sidebar-link-border font-medium flex items-center gap-3 px-4 py-2 rounded-md text-md transition-colors duration-150 ${
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
    <div className="flex-1 min-w-0 bg-white p-6 shadow-[-3px_0_3px_-3px_rgba(0,0,0,0.15)]">
      <Outlet />
    </div>
  </div>
)