import { NavLink } from 'react-router-dom'
import { BtnSignout } from '../components/buttons/BtnSignout'
import { DropdownHelper } from '../helper/DropdownHelper'
import { useState, useEffect } from 'react'
import { PanelLeft } from 'lucide-react'

interface User {
  id: string;
  userName: string;
  role: string;
}

type NavItem = {
  name: string
  path?: string
  children?: NavItem[]
  icon?: React.ReactNode
  roles: string[]
}

type SidebarUIProps = {
  navLinks: NavItem[]
  user: User | null
}

export const SidebarUI = ({ navLinks, user }: SidebarUIProps) => {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
  const checkIfShouldCollapse = () => {
      setCollapsed(window.innerWidth < 768)
    };
    
    checkIfShouldCollapse();
    
    window.addEventListener('resize', checkIfShouldCollapse);
    
    return () => window.removeEventListener('resize', checkIfShouldCollapse);
  }, []);

  return (
    <aside
     className={`
        fixed lg:static
        h-full
        bg-[#f9fafb] text-[#1f2937]
        flex flex-col
        z-50
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-80'}
        translate-x-0
        border-r border-[#e5e7eb]
      `}
    >
      <div className="p-4 flex justify-between items-center border-b border-[#e5e7eb]">
        <div className={`${collapsed ? 'hidden' : 'flex flex-col leading-tight'}`}>
          <p className="font-semibold text-md text-[#1f2937] uppercase">
            {user?.userName}
          </p>

          <span className="text-md text-[#6b7280]">
            {user?.role === "hr_admin" ? 'Human Resource' : 'Office Admin'}
          </span>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer flex items-center justify-center p-2 rounded-sm text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#1f2937] transition-colors duration-150"
        >
          <PanelLeft size={20}/>
        </button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navLinks.map((item) =>
          item.children ? (
            <DropdownHelper
              key={item.name}
              item={item}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          ) : (
            <NavLink
              key={item.path}
              to={item.path || '#'}
              className={({ isActive }) =>
                `font-medium sidebar-link-border flex items-center gap-3 px-4 py-2 rounded-sm text-md transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#eff6ff] active'
                    : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#1f2937]'
                }`
              }
            >
              <span>{item.icon}</span>

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          )
        )}
      </nav>

      <div className={`p-4 border-t border-[#e5e7eb] ${collapsed ? 'px-2' : ''}`}>
        <BtnSignout collapsed={collapsed} />
      </div>

    </aside>
  )
}