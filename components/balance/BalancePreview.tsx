import { ActivityIndicator, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useCallback, useMemo, useRef } from 'react'
import { COLOR_MAPPER } from '../../utils/constants'
import Select from '../common/Select'
import { useBalancesQuery } from '../../hooks/query/useBalancesQuery'
import { Image } from 'expo-image'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { getReadableTransactionCurrency } from '../../utils/transaction'
import BalanceDetailsBottomSheet from '../bottomSheet/BalanceDetailsBottomSheet'
import { useAppContext } from '../../hooks/context/useAppContext'

const BalancePreview = () => {
  const { setSelectedBalance, selectedBalance } = useAppContext()

  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const { data, isLoading, error } = useBalancesQuery((res) => {
    if (res?.data?.length && !selectedBalance) {
      setSelectedBalance(res.data[0])
    } else if (selectedBalance) {
      const updatedBalance = res?.data?.find((b) => b.id === selectedBalance.id)
      if (updatedBalance) {
        setSelectedBalance(updatedBalance)
      }
    }
  })

  const balances = data?.data

  const availableCurrencies = useMemo(
    () => balances?.map((b) => ({ value: b.currency_id, label: getReadableTransactionCurrency(b.currency_id) })),
    [data],
  )

  const handleCurrencyChange = useCallback(
    (currencyId: any) => {
      const balance = balances?.find((b) => b.currency_id === currencyId)
      if (balance) {
        setSelectedBalance(balance)
      }
    },
    [data],
  )

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }
  if (!balances?.length || !selectedBalance) {
    return <Text>There is no balance</Text>
  }

  if (error) {
    return <Text>Failed to load balance</Text>
  }

  const currency = getReadableTransactionCurrency(selectedBalance.currency_id)

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.currencyInfoContainer} onPress={() => bottomSheetRef.current?.present()}>
          <Text style={styles.currencyInfoLabel}>{currency} balance</Text>
          <Image source={require('../../assets/Info.svg')} style={styles.infoIcon} alt="I" />
        </TouchableOpacity>
        <Text style={styles.balanceLabel}>
          {selectedBalance.current_balance} {currency}
        </Text>
        <Select value={selectedBalance.currency_id} items={availableCurrencies ?? []} onChange={handleCurrencyChange} />
      </View>
      <BalanceDetailsBottomSheet bottomSheetRef={bottomSheetRef} balance={selectedBalance} />
    </>
  )
}

export default BalancePreview

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  currencyInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  currencyInfoLabel: {
    color: COLOR_MAPPER.GREY_500,
    fontSize: 16,
  },
  infoIcon: {
    width: 16,
    height: 16,
  },
  balanceLabel: {
    color: COLOR_MAPPER.GREY_50,
    fontSize: 28,
  },
})
