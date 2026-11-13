import { Outlet, Navigate } from 'react-router-dom'
import { useAuthorize } from '../hooks/useAuthorize'
import { Loader } from '../components/Loader'

const ProtectedRoutes = () => {
  const { user, loading } = useAuthorize()

  if (loading) return <Loader />
  return user ? <Outlet /> : <Navigate to="/signin" replace />
}

export default ProtectedRoutes