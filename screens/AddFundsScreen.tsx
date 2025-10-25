import { StyleSheet, View } from 'react-native'
import { COLOR_MAPPER } from '../utils/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../components/buttons/BackButton'
import AddFundsForm from '../components/payment-form/AddFundsForm'

const AddFundsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerActionsContainer}>
          <BackButton />
        </View>
        <AddFundsForm />
      </View>
    </SafeAreaView>
  )
}

export default AddFundsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_MAPPER.NEUTRAL_200,
  },
  content: {
    flex: 1,
    paddingTop: 100,
  },

  headerActionsContainer: {
    position: 'absolute',
    top: 8,
    left: 0,
    paddingHorizontal: 16,
    width: '100%',
    zIndex: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
})
