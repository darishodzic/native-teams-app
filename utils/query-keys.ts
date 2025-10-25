import { TransactionFilters } from './types'

const getBalances = () => ['getBalances']

const getTransactions = (filter: TransactionFilters = {}) => {
  const { wallet_id, status, type, date_from, date_to, search, per_page } = filter

  return ['getTransactions', per_page, wallet_id, status, type, date_from, date_to, search] as const
}

const getAllTransactions = (filter: TransactionFilters = {}) => {
  return ['getTransactions'] as const
}
export default {
  getBalances,
  getTransactions,
  getAllTransactions,
}
