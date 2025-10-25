import { CurrencyNames } from './constants'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type HomeStackParamList = {
  Home: undefined
  Transactions: undefined
  TransactionDetails: { transaction: Transaction }
  Payout: undefined
  AddFunds: undefined
}

export type RootTabParamList = {
  HomeStack: undefined
  Cards: undefined
  Settings: undefined
}

export type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<RootTabParamList>
>

export type LoginResponse = {
  auth: {
    access_token: string
    access_token_expire: string
    refresh_token: string
    refresh_token_expire: string
  }
  tfa: {
    enabled: boolean
    type: string | null
  }
}

export type Balance = {
  id: number
  user_id: string
  currency_id: keyof typeof CurrencyNames
  reference_number: string
  available_balance: string
  current_balance: string
  reserved_balance: string
}

export type GetBalancesResponse = {
  data: Balance[]
  message: string[]
  status: number
  type: string
}

export type TransactionStatus = 'completed' | 'pending' | 'failed'
export type TransactionType = 'top-up' | 'withdrawal'

export type Transaction = {
  wallet_id: number
  type: TransactionType
  status: TransactionStatus
  reason: string
  amount: number
  currency_id: keyof typeof CurrencyNames
  created_at: string
}

export type PaginatedTransactions = {
  current_page: number
  per_page: number
  total: number
  last_page: number
  has_more: boolean
  items: Transaction[]
}

export type GetTransactionsResponse = {
  data: PaginatedTransactions
  message: string
  status: number
  type: string
}

export type TransactionFilters = {
  wallet_id?: number
  type?: TransactionType
  status?: TransactionStatus
  currency_id?: number
  date_from?: string
  date_to?: string
  search?: string
  per_page?: number
}

export type PayoutParams = {
  wallet_id: number
  provider: 'bank' | 'card'
  amount: number
  currency_id: number
  bank_id?: number | null
  note?: string
}
