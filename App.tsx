import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './context/auth-context'
import AuthorizationNavigator from './navigators/AuthorizationNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

export const queryClient = new QueryClient()

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthProvider>
            <BottomSheetModalProvider>
              <AuthorizationNavigator />
            </BottomSheetModalProvider>
          </AuthProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

export default App
