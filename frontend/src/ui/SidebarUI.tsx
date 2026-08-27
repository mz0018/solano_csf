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
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-collapsed')
      if (saved !== null) return JSON.parse(saved)
      return window.innerWidth < 768
    }
    return false
  })

  useEffect(() => {
    const checkIfShouldCollapse = () => {

      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
      
    };
    
    checkIfShouldCollapse();
    
    window.addEventListener('resize', checkIfShouldCollapse);
    
    return () => window.removeEventListener('resize', checkIfShouldCollapse);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed))
  }, [collapsed])

  return (
    <aside
     className={`
        fixed lg:static
        h-full
        sidebar-surface text-[#1f2937]
        flex flex-col
        z-50
        transition-all duration-300
        ${collapsed ? 'w-16' : 'w-80'}
        translate-x-0
        border-r border-[#cbd5e1]
      `}
    >
      <div className="p-4 flex justify-between items-center border-b border-[#cbd5e1]">
        <div
          className={`
            flex flex-col leading-tight
            overflow-hidden
            whitespace-nowrap
            transition-all duration-300 ease-in-out
            ${
              collapsed
                ? 'w-0 max-w-0 opacity-0 -translate-x-2'
                : 'w-auto max-w-[220px] opacity-100 translate-x-0'
            }
          `}
        >
          <p className="font-semibold text-md text-[#1f2937] uppercase">
            {user?.userName}
          </p>

          <span className="text-md text-[#6b7280]">
            {user?.role === "hr_admin"
              ? 'Human Resource'
              : user?.role === 'super_admin'
              ? 'Super Admin'
              : 'Office Admin'}
          </span>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer flex items-center justify-center p-2 rounded-sm text-[#476581] hover:bg-[#dbeafe] hover:text-[#1e3a5f] transition-colors duration-150"
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
                `sidebar-item sidebar-link-border flex items-center gap-3 px-4 py-2 rounded-sm transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#dbeafe] text-[#1e3a5f] active'
                    : 'text-[#476581] hover:bg-[#dbeafe] hover:text-[#1e3a5f]'
                }`
              }
            >
              <span>{item.icon}</span>

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          )
        )}
      </nav>

      <div className={`p-4 border-t border-[#cbd5e1] ${collapsed ? 'px-2' : ''}`}>
        <BtnSignout collapsed={collapsed} />
      </div>

    </aside>
  )
}