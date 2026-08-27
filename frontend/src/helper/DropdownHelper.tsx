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
        className="sidebar-item sidebar-link-border relative w-full flex items-center gap-3 px-4 py-2 rounded-sm text-[#476581] hover:bg-[#dbeafe] hover:text-[#1e3a5f] transition-colors duration-150 focus:ring-0 focus:outline-none"
      >
        <span className="shrink-0">
          {item.icon}
        </span>

        {!collapsed && (
          <>
            <span className="whitespace-nowrap">
              {item.name}
            </span>

            <ChevronDown
              size={18}
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-150 ${
                open ? 'rotate-180' : ''
              }`}
            />
          </>
        )}
      </button>

      {!collapsed && open && (
        <div className="ml-5 space-y-1">
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
              className={({ isActive }) =>
                `sidebar-item sidebar-link-border flex items-center gap-2 pl-6 pr-4 py-2 rounded-sm transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#dbeafe] text-[#1e3a5f] active'
                    : 'text-[#476581] hover:bg-[#dbeafe] hover:text-[#1e3a5f]'
                }`
              }
              >
                <span className="text-[0.5rem] text-[#9ca3af]">●</span>
                <span className="whitespace-nowrap">{child.name}</span>
              </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}