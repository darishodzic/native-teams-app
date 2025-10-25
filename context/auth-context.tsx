import React, { createContext, useState, useEffect } from 'react'
import { checkIsTokenExpireValid, deleteAuthToken, getAuthToken, saveAuthToken } from '../utils/token'
import { queryClient } from '../App'

type AuthContextType = {
  token: string | null
  expiresAt: string | null
  login: (token: string, expiresAt: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [expiresAt, setExpiresAt] = useState<string | null>(null)

  useEffect(() => {
    const loadAuth = async () => {
      const auth = await getAuthToken()
      const storedToken = auth?.token
      const storedExpire = auth?.expire

      if (storedToken && storedExpire && checkIsTokenExpireValid(storedExpire)) {
        setToken(storedToken)
        setExpiresAt(storedExpire)
      } else {
        await logout()
      }
    }
    loadAuth()
  }, [])

  const login = async (newToken: string, newExpire: string) => {
    await saveAuthToken(newToken, newExpire)

    setToken(newToken)
    setExpiresAt(newExpire)
  }

  const logout = async () => {
    await deleteAuthToken()

    setToken(null)
    setExpiresAt(null)
    queryClient.clear()
  }

  const isAuthenticated = !!token && !!expiresAt && checkIsTokenExpireValid(expiresAt)

  return <AuthContext.Provider value={{ token, expiresAt, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>
}
