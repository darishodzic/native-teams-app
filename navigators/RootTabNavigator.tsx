import React from 'react'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SettingsScreen from '../screens/SettingsScreen'
import CardsScreen from '../screens/CardsScreen'
import HomeStackNavigator from './HomeStackNavigator'
import { RootTabParamList } from '../utils/types'
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native'
import { Image } from 'expo-image'
import { COLOR_MAPPER } from '../utils/constants'

const Tab = createBottomTabNavigator<RootTabParamList>()

const TAB_ICONS: Record<keyof RootTabParamList, any> = {
  HomeStack: require('../assets/Wallet.svg'),
  Cards: require('../assets/CreditCard.svg'),
  Settings: require('../assets/Settings.svg'),
}

const getTabBarVisibility = (route: RouteProp<Record<string, object | undefined>, string>) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'

  if (['Transactions', 'TransactionDetails', 'Payout'].includes(routeName)) {
    return 'none'
  }

  return 'flex'
}

const screenOptions = ({
  route,
}: {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>
}): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarLabelStyle: {
    color: COLOR_MAPPER.GREY_500,
    marginTop: 6,
  },
  tabBarStyle: {
    display: getTabBarVisibility(route),
    backgroundColor: COLOR_MAPPER.GREY_900,
    elevation: 5,
  },
  tabBarIcon: ({ focused, size }: any) => (
    <Image source={TAB_ICONS[route.name]} style={{ width: size, height: size, tintColor: focused ? '#007AFF' : '#999' }} />
  ),
})

const RootTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="HomeStack" screenOptions={screenOptions}>
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
      <Tab.Screen name="Cards" component={CardsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}
export default RootTabNavigator
