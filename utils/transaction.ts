import { COLOR_MAPPER, CurrencyNames } from './constants'
import { Transaction, TransactionStatus, TransactionType } from './types'

export const getTransactionStatusColor = (status: TransactionStatus): string => {
  switch (status) {
    case 'completed':
      return COLOR_MAPPER.GREEN_400
    case 'failed':
      return COLOR_MAPPER.RED_400
    default:
      return COLOR_MAPPER.GREY_100
  }
}

export const formatTransactionAmount = (transaction: Transaction): string => {
  const sign = transaction.type === 'top-up' ? '+' : '-'
  const currency = CurrencyNames[transaction.currency_id]
  const amount = Math.abs(transaction.amount).toFixed(2)

  return `${sign} ${amount} ${currency}`
}

export const getReadableTransactionType = (type: TransactionType) => {
  return type === 'top-up' ? 'Income' : 'Expense'
}

export const getReadableTransactionCurrency = (currencyId: number) => {
  return CurrencyNames[currencyId as keyof typeof CurrencyNames]
}
