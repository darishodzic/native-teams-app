import { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
