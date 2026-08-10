import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader } from '../components/Loader'

const ProtectedRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) return <Loader />
  return user ? <Outlet /> : <Navigate to="/signin" replace />
}

export default ProtectedRoutes