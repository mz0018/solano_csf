import { NavLink } from 'react-router-dom'
import { DropdownHelper } from '../helper/DropdownHelper'
import { useEffect } from 'react'

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
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export const SidebarUI = ({ navLinks, collapsed, setCollapsed }: SidebarUIProps) => {
  useEffect(() => {
    const checkIfShouldCollapse = () => {

      if (window.innerWidth < 1024) {
        setCollapsed(true)
      }
      
    };
    
    checkIfShouldCollapse();
    
    window.addEventListener('resize', checkIfShouldCollapse);
    
    return () => window.removeEventListener('resize', checkIfShouldCollapse);
  }, [setCollapsed]);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed))
  }, [collapsed])

  return (
    <>
      {!collapsed && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setCollapsed(true)}
          className="fixed inset-x-0 top-24 bottom-0 z-30 bg-slate-900/20 lg:hidden"
        />
      )}

      <aside className={`fixed top-24 bottom-0 left-0 z-40 pt-5 flex min-h-0 shrink-0 flex-col border-r border-slate-200 bg-white lg:static lg:z-auto lg:h-full ${collapsed ? 'w-16' : 'w-80'}`}>
      <nav className={`min-h-0 flex-1 space-y-1 overflow-y-auto py-2 ${collapsed ? 'px-2' : 'px-5'}`}>
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
                className={({ isActive }) => `flex min-h-10 items-center rounded-md text-sm font-medium transition-colors duration-150 ${collapsed ? 'h-10 justify-center p-0' : 'gap-3 p-5'} ${isActive ? collapsed ? 'text-[#003566]' : 'bg-[#003566] text-white' : 'text-slate-600 hover:bg-slate-200 hover:text-[#003566]'}`}>
                {({ isActive }) => (
                  <>
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt=""
                        className={`h-7 w-7 shrink-0 ${isActive && !collapsed ? 'brightness-0 invert' : ''}`}
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
    </>
  )
}