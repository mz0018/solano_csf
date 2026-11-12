
import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode
  iconAlt?: string
  iconClassName?: string
}

export const AdminButton = ({
  className = '',
  children,
  icon,
  iconAlt = '',
  iconClassName = 'h-5 w-5 shrink-0',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`cursor-pointer px-4 py-4 rounded-md flex items-center justify-center gap-2 ${className}`}
    >
      {typeof icon === 'string' ? (
        <img src={icon} alt={iconAlt} className={iconClassName} />
      ) : (
        icon
      )}
      {children}
    </button>
  )
}
