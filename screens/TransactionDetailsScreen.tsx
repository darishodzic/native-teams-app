import React from 'react'
import { View, StyleSheet, ScrollView, Animated, Alert } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Button } from '../components/buttons/Button'
import { HomeStackParamList } from '../utils/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCollapsibleHeader } from '../hooks/useCollapsibleHeader'
import { CollapsibleHeader } from '../components/header/CollapsibleHeader'
import { COLOR_MAPPER } from '../utils/constants'
import BackButton from '../components/buttons/BackButton'
import TransactionDetails from '../components/transactions/TransactionDetails'

const TransactionDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'TransactionDetails'>>()
  const { transaction } = route.params

  const { scrollY, headerHeight, titleTranslateY, titleTranslateX, titleScale } = useCollapsibleHeader(210)

  const handleReceiptDownload = () => {
    Alert.alert('Downloaded!')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CollapsibleHeader
          title={'Transaction details'}
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
          <View>
            <TransactionDetails transaction={transaction} />
            <View style={styles.buttonContainer}>
              <Button label="Download receipt" variant="outline" onPress={handleReceiptDownload} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default TransactionDetailsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_MAPPER.NEUTRAL_200,
    flex: 1,
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
  scrollableContent: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 24,
  },
})
