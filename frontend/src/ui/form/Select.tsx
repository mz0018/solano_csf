import { ChevronDown } from 'lucide-react'

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    error?: string
    children: React.ReactNode
    variant?: 'default' | 'admin'
}

export const Select = ({
    className = '',
    error,
    children,
    variant = 'default',
    ...props
}: SelectProps) => {
    const isAdmin = variant === 'admin'

    return (
        <div className="relative">
            <select
                {...props}
                className={
                    isAdmin
                        ? `w-96 px-3 py-2 pr-10 rounded-lg focus:outline-none border appearance-none
                            ${
                                error
                                    ? 'border-red-500 text-red-500'
                                    : 'border-gray-300 text-gray-900 text-sm bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                            }
                            ${className}`
                        : `w-full p-4 pr-10 rounded-sm focus:outline-none border appearance-none bg-transparent
                            ${
                                error
                                    ? 'border-red-500 text-red-500'
                                    : 'border-gray-300 text-gray-500'
                            }
                            ${className}`
                }
            >
                {children}
            </select>

            <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
            />
        </div>
    )
}
