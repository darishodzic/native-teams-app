import axios from 'axios'
import { GetBalancesResponse, GetTransactionsResponse, LoginResponse, PayoutParams } from './types'
import { getAuthToken } from './token'
import { Platform } from 'react-native'

let baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000'

if (process.env.EXPO_PUBLIC_API_URL) {
  baseURL = process.env.EXPO_PUBLIC_API_URL
}

const api = axios.create({
  baseURL: baseURL,
})

api.interceptors.request.use(async (config) => {
  const auth = await getAuthToken()

  config.headers['authorization'] = `Bearer ${auth?.token}`

  return config
})

const login = async (email: string, password: string) => {
  try {
    const { data }: { data: LoginResponse } = await api.post('/auth/login/', { email, password })
    return data
  } catch (err: any) {
    console.log('err POST /auth/login/', err)
    throw err
  }
}

const getBalances = async () => {
  try {
    const { data }: { data: GetBalancesResponse } = await api.get('/balances/')

    return data
  } catch (err: any) {
    console.log('err GET /balances/', err)
    throw err
  }
}

const getTransactions = async (params?: {
  page?: number
  per_page?: number
  wallet_id?: number
  type?: string
  status?: string
  date_from?: string
  date_to?: string
  search?: string
}) => {
  try {
    const { data }: { data: GetTransactionsResponse } = await api.get('/transactions', { params })
    return data
  } catch (err: any) {
    console.log('err GET /transactions', err)
    throw err
  }
}

const payout = async (params: PayoutParams) => {
  try {
    const { data } = await api.post('/payouts', params)
    return data
  } catch (err: any) {
    console.log('err POST /payouts', err.response?.data || err.message)
    throw err
  }
}

export default {
  login,
  getBalances,
  getTransactions,
  payout,
}
