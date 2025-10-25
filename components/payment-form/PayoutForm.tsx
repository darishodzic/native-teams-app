import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { COLOR_MAPPER, Providers } from '../../utils/constants'
import Select from '../common/Select'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../utils/api'
import { NavigationProp, PayoutParams } from '../../utils/types'
import { Button } from '../buttons/Button'
import queryKeys from '../../utils/query-keys'
import { useNavigation } from '@react-navigation/native'
import { useAppContext } from '../../hooks/context/useAppContext'

const PayoutForm = () => {
  const { selectedBalance } = useAppContext()
  const queryClient = useQueryClient()
  const navigation = useNavigation<NavigationProp>()

  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [provider, setProvider] = useState<'bank' | 'card'>('card')
  const [bankId, setBankId] = useState<number | null>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PayoutParams) => api.payout(data),
    onSuccess: () => {
      Alert.alert('Successfully withdrawn')
      queryClient.invalidateQueries({ queryKey: queryKeys.getBalances() })
      queryClient.invalidateQueries({ queryKey: queryKeys.getAllTransactions() })
      navigation.replace('Transactions')
    },
    onError: (error: any) => {
      Alert.alert('Payout failed', error.message)
    },
  })

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      return Alert.alert('Validation Error', 'Please enter a valid amount')
    }

    if (parseFloat(amount) > parseFloat(selectedBalance?.available_balance ?? '0')) {
      return Alert.alert('Validation Error', 'No available money, change amount')
    }

    if (provider === 'bank' && !bankId) {
      return Alert.alert('Validation Error', 'Please select a bank account')
    }

    if (!selectedBalance?.id) {
      return Alert.alert('Validation Error', 'Please select a balance')
    }

    mutate({
      wallet_id: selectedBalance.id,
      provider,
      amount: parseFloat(amount),
      currency_id: selectedBalance.currency_id,
      bank_id: bankId,
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLOR_MAPPER.NEUTRAL_100}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.label}>Note</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={COLOR_MAPPER.NEUTRAL_100}
        placeholder="Enter note"
        value={note}
        onChangeText={setNote}
      />

      <Text style={styles.label}>Provider</Text>
      <Select value={provider} items={Providers} onChange={(val: any) => setProvider(val)} />

      {provider === 'bank' && (
        <>
          <Text style={styles.label}>Bank Id</Text>

          <TextInput
            style={styles.input}
            placeholderTextColor={COLOR_MAPPER.NEUTRAL_100}
            placeholder="Enter BANK id"
            keyboardType="numeric"
            value={bankId?.toString()}
            onChangeText={(text) => {
              const numericValue = Number(text.replace(/[^0-9.]/g, ''))
              setBankId(numericValue)
            }}
          />
        </>
      )}

      <Button label="Withdraw" disabled={isPending} onPress={handleSubmit} />
    </View>
  )
}

export default PayoutForm

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: COLOR_MAPPER.GREY_500,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: COLOR_MAPPER.GREY_200,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLOR_MAPPER.NEUTRAL_100,
  },
  selectBank: {
    height: 44,
    borderWidth: 1,
    borderColor: COLOR_MAPPER.GREY_200,
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
})
