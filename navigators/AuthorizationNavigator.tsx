import React from 'react'
import RootTabNavigator from './RootTabNavigator'
import LoginScreen from '../screens/LoginScreen'
import { AppProvider } from '../context/app-context'
import { useAuthContext } from '../hooks/context/useAuthContext'

const AuthorizationNavigator = () => {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return (
    <AppProvider>
      <RootTabNavigator />
    </AppProvider>
  )
}

export default AuthorizationNavigator
