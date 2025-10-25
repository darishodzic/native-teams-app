import React, { useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { Ionicons } from '@expo/vector-icons'
import { COLOR_MAPPER } from '../../utils/constants'
import { Balance } from '../../utils/types'
import { Button } from '../buttons/Button'
import { getReadableTransactionCurrency } from '../../utils/transaction'
import { CopyableDetailRow } from '../common/CopyableRow'

interface BalanceDetailsBottomSheetProps {
  balance: Balance
  bottomSheetRef: React.RefObject<BottomSheetModal | null>
}

const BalanceDetailsBottomSheet = (props: BalanceDetailsBottomSheetProps) => {
  const { balance, bottomSheetRef } = props

  const handleShare = useCallback(() => {
    const message = `Bank Details:
Account name: Native Teams Limited
Currency: ${getReadableTransactionCurrency(balance.currency_id)}
Account number: ${balance.reference_number}
Available balance: ${balance.available_balance}`

    Share.share({ message })
  }, [balance])

  return (
    <BottomSheetModal ref={bottomSheetRef} snapPoints={['50%']} backgroundStyle={styles.background} index={1}>
      <BottomSheetView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Bank details</Text>
          <TouchableOpacity onPress={() => bottomSheetRef?.current?.dismiss()}>
            <Ionicons name="close" size={24} color={COLOR_MAPPER.NEUTRAL_100} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <CopyableDetailRow label="Account name" value="Native Teams Limited" />
          <CopyableDetailRow label="Currency" value={getReadableTransactionCurrency(balance.currency_id)} />
          <CopyableDetailRow label="Account number" value={balance.reference_number} />
          <CopyableDetailRow label="Available balance" value={balance.available_balance} />
        </View>

        <Button label="Share" onPress={handleShare} variant="outline" />
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default BalanceDetailsBottomSheet

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLOR_MAPPER.GREY_1000,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 6,
    borderBottomWidth: 0.5,
    borderColor: COLOR_MAPPER.NEUTRAL_100,
  },
  title: {
    color: COLOR_MAPPER.NEUTRAL_100,
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
})
