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
    <aside className={`flex h-screen min-h-0 shrink-0 flex-col border-r border-slate-200 bg-white ${collapsed ? 'w-16' : 'w-80'}`}>

      <>
        <div className={`flex h-20 shrink-0 items-center border-b border-slate-100 px-3 ${collapsed ? 'justify-center' : 'gap-3'}`}>
          {/* User Initial Avatar */}
          <div
            className={`${collapsed ? 'hidden' : 'h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#628dec] p-2'}`}>
            <img
              src={ '/img/logo.png'}
              alt={user?.userName || 'User'}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Information */}
          <div
            className={`${collapsed ? 'hidden' : 'min-w-0 flex-1'}`}
          >
            <div>
              <h1 className="truncate text-3xl font-bold font-sans tracking-tight text-[#628dec]">
                CSF
              </h1>
            </div>
          </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <PanelLeft size={18}/>
        </button>
        </div>
      </>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
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
              title={collapsed ? item.name : undefined}
              className={({ isActive }) => `flex min-h-10 items-center rounded-md text-sm font-medium ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'} ${isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-700'}`}>
              {({ isActive }) => (
                <>
                  <span className={`shrink-0 ${isActive ? 'text-blue-700' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>

                  <span className={`${collapsed ? 'hidden' : 'truncate'}`}>
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  )
}