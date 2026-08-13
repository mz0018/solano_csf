import { Outlet } from 'react-router-dom'
import { User, ChartSpline } from 'lucide-react'
import { DropdownHelper } from '../helper/DropdownHelper'

const tabs = [
  {
    name: 'User Management',
    icon: <User />,
    children: [
    { name: 'Client Password Reset', path: 'user-management/password-reset' },
    { name: 'Add Client Account', path: 'user-management/add-client' },
  ],
    roles: ['super_admin'],
  },
  {
    name: 'Reports',
    icon: <ChartSpline />,
    children: [
      { name: 'System Report', path: 'report/system' },
    ],
    roles: ['super_admin'],
  },
]

export const SuperAdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      <nav className="w-full lg:w-84 flex-shrink-0 space-y-1 bg-white border border-[#e5e7eb] rounded-lg p-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        {tabs.map((item) => (
          <DropdownHelper
            key={item.name}
            item={item}
            collapsed={false}
            setCollapsed={() => {}}
          />
        ))}
      </nav>

      <div className="flex-1 min-w-0 bg-white border border-[#e5e7eb] rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <Outlet />
      </div>
    </div>
  )
}