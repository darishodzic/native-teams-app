import React from 'react'
import HomeScreen from '../screens/HomeScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TransactionsScreen from '../screens/TransactionsScreen'
import TransactionDetailsScreen from '../screens/TransactionDetailsScreen'
import { HomeStackParamList } from '../utils/types'
import PayoutScreen from '../screens/PayoutScreen'
import AddFundsScreen from '../screens/AddFundsScreen'

const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
      <Stack.Screen name="Payout" component={PayoutScreen} />
      <Stack.Screen name="AddFunds" component={AddFundsScreen} />
    </Stack.Navigator>
  )
}
export default HomeStackNavigator
