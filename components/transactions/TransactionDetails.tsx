import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Transaction } from '../../utils/types'
import { COLOR_MAPPER } from '../../utils/constants'
import { formatDate } from '../../utils/time'
import {
  getReadableTransactionType,
  formatTransactionAmount,
  getTransactionStatusColor,
  getReadableTransactionCurrency,
} from '../../utils/transaction'
import SimpleRow from '../common/SimpleRow'

const TransactionDetails = (props: { transaction: Transaction }) => {
  const { transaction } = props

  return (
    <View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{getReadableTransactionType(transaction.type)}</Text>
        <Text style={styles.summaryValue}>{formatTransactionAmount(transaction)}</Text>
        <Ionicons name="document-text-outline" size={20} color={COLOR_MAPPER.NEUTRAL_100} style={styles.summaryIcon} />
      </View>

      <View style={styles.detailsCard}>
        <SimpleRow label="Wallet" value={getReadableTransactionCurrency(transaction.currency_id)} />
        <SimpleRow label="Transaction type" value={getReadableTransactionType(transaction.type)} />
        <SimpleRow label="Payer name" value="Admin" />
        <SimpleRow label="Status" value={transaction.status} valueColor={getTransactionStatusColor(transaction.status)} />
        <SimpleRow label="Transaction number" value="#23849283" />
        <SimpleRow label="Payment date" value={formatDate(transaction.created_at)} />
        <View style={styles.divider} />
        <SimpleRow label="Details" value={transaction.reason || '/'} />
      </View>
    </View>
  )
}

export default TransactionDetails

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: COLOR_MAPPER.GREY_1000,
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    marginBottom: 20,
  },
  summaryLabel: {
    color: COLOR_MAPPER.NEUTRAL_100,
    fontSize: 14,
    marginBottom: 16,
  },
  summaryValue: {
    color: COLOR_MAPPER.NEUTRAL_100,
    fontSize: 20,
    fontWeight: '700',
  },
  summaryIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  detailsCard: {
    backgroundColor: COLOR_MAPPER.GREY_1000,
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  divider: {
    height: 1,
    backgroundColor: COLOR_MAPPER.GREY_900,
    marginVertical: 12,
  },
})
