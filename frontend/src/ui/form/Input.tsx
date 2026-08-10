import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string
}

export const Input = ({ className = '', error, ...props }: InputProps) => {
    return (
        <input
            {...props}
            className={`rounded-lg border border-[var(--theme-border)] bg-transparent text-[var(--theme-text)] focus:outline-none
            ${error ? 'border-red-500 text-red-500' : ''}
            ${className}`}
        />
    )
}