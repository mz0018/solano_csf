import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

export const LinkUI = ({ className = '', ...props }: LinkProps) => {
    return (
        <Link
            {...props}
            className={`inline-block text-underline text-blue-500 hover:text-blue-700 w-1/2 text-center ${className}`}
        />
    )
}  