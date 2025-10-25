import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { COLOR_MAPPER, Providers } from '../../utils/constants'
import Select from '../common/Select'
import { Button } from '../buttons/Button'

const AddFundsForm = () => {
  const [amount, setAmount] = useState('')
  const [provider, setProvider] = useState<'bank' | 'card'>('card')

  const handleSubmit = () => {
    Alert.alert('Added funds')
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

      <Text style={styles.label}>Provider</Text>
      <Select value={provider} items={Providers} onChange={(val: any) => setProvider(val)} />

      <Button label="Add fund" onPress={handleSubmit} />
    </View>
  )
}

export default AddFundsForm

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
})
