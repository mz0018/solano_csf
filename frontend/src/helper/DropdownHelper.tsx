import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type NavItem = {
  name: string
  path?: string
  children?: NavItem[]
  icon?: React.ReactNode
}

type Props = {
  item: NavItem
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export const DropdownHelper = ({ item, collapsed, setCollapsed }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => {
          if (collapsed) {
            setCollapsed(false)
            return
          }

          setOpen(prev => !prev)
        }}
        title={collapsed ? item.name : undefined}
        aria-expanded={!collapsed && open}
        className={`flex min-h-10 w-full items-center rounded-md text-left text-sm font-medium ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'} ${open ? 'bg-slate-50 text-[#628dec]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#628dec]'}`}
      >
        <span className="shrink-0 text-slate-400">
          {item.icon}
        </span>

        {!collapsed && (
          <>
            <span className="min-w-0 flex-1 truncate">
              {item.name}
            </span>

            <ChevronDown
              size={16}
              className={`shrink-0 duration-150 ${open ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      {!collapsed && open && (
        <div className="ml-5 mt-1 space-y-1 border-l border-slate-200 pl-3">
          {item.children?.map((child) => (
            <NavLink
              key={child.path}
              to={child.path || '#'}
              end
              onClick={() => {
                if (window.innerWidth < 768) {
                  setCollapsed(true)
                }
              }}
              className={({ isActive }) => `flex min-h-9 items-center rounded-md px-3 text-sm ${isActive ? 'bg-[#628dec] font-medium text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-[#628dec]'}`}>
                <span className="truncate">{child.name}</span>
              </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}