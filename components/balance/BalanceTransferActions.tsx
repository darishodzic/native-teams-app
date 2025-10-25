import { View, StyleSheet } from 'react-native'
import ActionButton from '../buttons/ActionButton'
import { useNavigation } from '@react-navigation/native'
import { NavigationProp } from '../../utils/types'

const BalanceTransferActions = () => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View style={styles.container}>
      <ActionButton icon={require('../../assets/Plus.svg')} label="Add" onPress={() => navigation.navigate('AddFunds')} />
      <ActionButton icon={require('../../assets/Send.svg')} label="Send" onPress={() => navigation.navigate('Payout')} />
      <ActionButton icon={require('../../assets/Bank.svg')} label="Details" />
    </View>
  )
}

export default BalanceTransferActions

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
  },
})
