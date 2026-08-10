import React from 'react'

type FormProps = React.FormHTMLAttributes<HTMLFormElement>

export const Form = ({ className = '', ...props }: FormProps) => {
    return (
        <form 
            {...props}
            className={`flex flex-col gap-2 max-w-lg w-full ${className}`}
        />
    )
}