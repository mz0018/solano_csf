import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../ui/form/Buttons'
import { LogOut } from 'lucide-react'
import { ClipLoader } from 'react-spinners'
import { useAuthorize } from '../../hooks/useAuthorize'

type BtnSignoutProps = {
    collapsed?: boolean
}

export const BtnSignout = ({ collapsed = false }: BtnSignoutProps) => {
    const { signOut } = useAuthorize()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleSignOut = async () => {
        if (!confirm('Are you sure you want to log out?')) return

        setIsLoggingOut(true)

        try {
            await signOut()
            navigate('/signin', { replace: true })
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <Button
            className={`sidebar-item sidebar-link-border w-full text-[#476581] bg-transparent hover:bg-[#dbeafe] hover:text-[#1e3a5f] ${
                collapsed ? 'justify-center' : 'justify-start'
            }`}
            onClick={handleSignOut}
            disabled={isLoggingOut}
            aria-label={collapsed ? 'Log out' : undefined}
        >
            {isLoggingOut ? <ClipLoader size={20} color="currentColor" /> : <LogOut size={20} />}
            {!collapsed && (isLoggingOut ? 'Logging out...' : 'Log out')}
        </Button>
    )
}
