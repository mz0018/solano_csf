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
      >
        <span>
          {item.icon}
        </span>

        {!collapsed && (
          <>
            <span>
              {item.name}
            </span>

            <ChevronDown
              size={18}
              className={`${open ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      {!collapsed && open && (
        <div>
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
              className={({ isActive }) => `${isActive ? 'bg-[#dbeafe] text-[#1e3a5f] active' : 'text-[#476581] hover:bg-[#dbeafe] hover:text-[#1e3a5f]'}`}>
                <span>{child.name}</span>
              </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}