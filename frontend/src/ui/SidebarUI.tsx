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
    <aside className={`bg-gray-700 ${collapsed ? 'w-16' : 'w-80'}`}>

      <>
        <div className='bg-red-500'>
          {/* User Initial Avatar */}
          <div
            className={`${collapsed ? 'w-0 opacity-0 scale-75 -ml-3' : 'w-10 opacity-100 scale-100 ml-0'}`}>
            <img
              src={ '/img/logo.png'}
              alt={user?.userName || 'User'}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Information */}
          <div
            className={`${collapsed ? 'w-0 max-w-0 opacity-0 -translate-x-2' : 'w-[180px] max-w-[180px] opacity-100 translate-x-0'}`}
          >
            <div>
              <h1>
                Client Satisfactory
              </h1>
              <span>
                Feedback System
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
        >
          <PanelLeft size={20}/>
        </button>
      </>

      <nav className="bg-blue-500 flex-1 p-2 space-y-2 overflow-hidden">
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
              className={({ isActive }) => `${collapsed? 'w-full justify-center px-0' : 'w-full px-4 gap-3'} ${isActive ? 'bg-[#dbeafe] text-[#1e3a5f] active' : 'text-[#476581] hover:bg-[#dbeafe] hover:text-[#1e3a5f] p-5'}`}>
              {({ isActive }) => (
                <>
                  {/* Fixed icon container */}
                  <span
                    className={`${isActive ? 'text-[#1e3a5f]' : 'text-[#476581]'}`}
                  >
                    {item.icon}
                  </span>

                  {/* Animated label */}
                  <span
                    className={`${collapsed ? 'w-0 max-w-0 opacity-0 -translate-x-2' : 'w-auto max-w-[200px] opacity-100 translate-x-0'}`}>
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