import { NavLink } from 'react-router-dom'
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
  icon?: string
  roles: string[]
  section?: string
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
    <aside className={`flex h-screen min-h-0 shrink-0 flex-col border-r border-slate-200 ${collapsed ? 'w-16' : 'w-80'}`}>

      <>
        <div className={`flex h-24 shrink-0 items-center py-3 ${collapsed ? 'justify-center' : 'justify-between gap-3'}`}>
          {/* User Initial Avatar */}
          <div
            className={`${collapsed ? 'hidden' : 'h-18 min-w-0 flex-1 px-4 overflow-hidden'}`}>
            <img
              // src={ '/img/csf-remove-light.png'}
              src={ '/img/csf-orig-optimized.png'}
              alt={user?.userName || 'User'}
              className="h-9 m-4 object-contain"
            />
          </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="inline-flex m-2 h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-[#628dec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        >
          <PanelLeft size={18}/>
        </button>
        </div>
      </>

      <nav className={`flex-1 space-y-1 overflow-y-auto py-2 ${collapsed ? 'px-2' : 'px-5'}`}>
        {navLinks.map((item, index) => (
          <div key={item.path ?? item.name}>
            {!collapsed && item.section && item.section !== navLinks[index - 1]?.section && (
              <h2 className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {item.section}
              </h2>
            )}
            {item.children ? (
              <DropdownHelper
                item={item}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              />
            ) : (
              <NavLink
                to={item.path || '#'}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) => `flex min-h-10 items-center rounded-md text-sm font-medium ${collapsed ? 'h-10 justify-center p-0' : 'gap-3 p-5'} ${isActive ? collapsed ? 'text-[#628dec]' : 'bg-[#628dec] text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-[#628dec]'}`}>
                {({ isActive }) => (
                  <>
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt=""
                        className={`h-5 w-5 shrink-0 ${isActive && !collapsed ? 'brightness-0 invert' : ''}`}
                      />
                    )}

                    <span className={`${collapsed ? 'hidden' : 'truncate'}`}>
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}