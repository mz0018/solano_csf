import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonLoadMore = ({ className = '', ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={`cursor-pointer p-4 rounded-sm border border-gray-200 ${className}`} 
        />
    )
}