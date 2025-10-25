import { StyleSheet, View } from 'react-native'
import { COLOR_MAPPER } from '../utils/constants'
import Logo from '../components/common/Logo'
import { SafeAreaView } from 'react-native-safe-area-context'
import BalancePreview from '../components/balance/BalancePreview'
import BalanceTransferActions from '../components/balance/BalanceTransferActions'
import TransactionsListPreview from '../components/transactions/TransactionsListPreview'
import OrderCard from '../components/card/OrderCard'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <BalancePreview />
      <BalanceTransferActions />
      <OrderCard />
      <TransactionsListPreview />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_MAPPER.NEUTRAL_200,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: '100%',
  },
})
