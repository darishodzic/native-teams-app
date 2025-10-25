import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationProp, Transaction } from '../../utils/types'
import { COLOR_MAPPER } from '../../utils/constants'
import { formatDate } from '../../utils/time'
import { useNavigation } from '@react-navigation/native'
import { formatTransactionAmount, getTransactionStatusColor } from '../../utils/transaction'

interface TransactionCardProps {
  transaction: Transaction
}

const TransactionCard = (props: TransactionCardProps) => {
  const { transaction } = props

  const navigation = useNavigation<NavigationProp>()

  const handleCardPress = () => {
    navigation.navigate('TransactionDetails', { transaction })
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <View style={styles.row}>
        <Text style={styles.reason}>{transaction.reason}</Text>
        <Text style={styles.amount}>{formatTransactionAmount(transaction)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>{formatDate(transaction.created_at)}</Text>
        <Text style={[styles.status, { color: getTransactionStatusColor(transaction.status) }]}>
          {transaction.status.toUpperCase()}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default TransactionCard

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reason: {
    fontSize: 16,
    color: COLOR_MAPPER.NEUTRAL_100,
  },
  amount: {
    fontSize: 16,
    color: COLOR_MAPPER.NEUTRAL_100,
  },

  date: {
    fontSize: 14,
    color: COLOR_MAPPER.GREY_100,
  },
  status: {
    fontSize: 14,
    color: COLOR_MAPPER.GREY_100,
  },
})
