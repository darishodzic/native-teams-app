import { useContext } from 'react'
import { AppContext } from '../../context/app-context'

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAPp must be used inside AuthProvider')
  return ctx
}
