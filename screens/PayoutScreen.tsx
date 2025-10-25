import { Animated, ScrollView, StyleSheet, View } from 'react-native'
import { COLOR_MAPPER } from '../utils/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import BalancePreview from '../components/balance/BalancePreview'
import BackButton from '../components/buttons/BackButton'
import { CollapsibleHeader } from '../components/header/CollapsibleHeader'
import { useCollapsibleHeader } from '../hooks/useCollapsibleHeader'
import PayoutForm from '../components/payment-form/PayoutForm'

const PayoutScreen = () => {
  const { scrollY, headerHeight, titleTranslateY, titleTranslateX, titleScale } = useCollapsibleHeader(80)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CollapsibleHeader
          title={'Payout'}
          headerHeight={headerHeight}
          titleTranslateY={titleTranslateY}
          titleTranslateX={titleTranslateX}
          titleScale={titleScale}
        />

        <View style={styles.headerActionsContainer}>
          <BackButton />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollableContent}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}>
          <BalancePreview />
          <PayoutForm />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default PayoutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_MAPPER.NEUTRAL_200,
  },
  content: {
    flex: 1,
    paddingTop: 100,
  },
  logoContainer: {
    width: '100%',
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
  scrollableContent: {
    paddingHorizontal: 20,
  },
})
