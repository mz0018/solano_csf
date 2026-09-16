import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../ui/form/Buttons'
import { LogOut } from 'lucide-react'

type BtnSignoutProps = {
    collapsed?: boolean
}

export const BtnSignout = ({ collapsed = false }: BtnSignoutProps) => {
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const handleSignOut = async () => {
        if (!confirm('Are you sure you want to log out?')) return

        await signOut()
        navigate('/signin', { replace: true })
    }

    return (
        <Button
            className={`sidebar-item sidebar-link-border w-full text-[#476581] bg-transparent hover:bg-[#dbeafe] hover:text-[#1e3a5f] ${
                collapsed ? 'justify-center' : 'justify-start'
            }`}
            onClick={handleSignOut}
        >
            <LogOut size={20} />
            {!collapsed && 'Log out'}
        </Button>
    )
}
