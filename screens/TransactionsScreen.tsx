import React, { useRef, useState } from 'react'
import { Animated, StyleSheet, View, TouchableOpacity } from 'react-native'
import { CollapsibleHeader } from '../components/header/CollapsibleHeader'
import TransactionsList from '../components/transactions/TransactionsList'
import BackButton from '../components/buttons/BackButton'
import { useCollapsibleHeader } from '../hooks/useCollapsibleHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR_MAPPER } from '../utils/constants'
import { Image } from 'expo-image'
import TransactionFilterBottomSheet from '../components/bottomSheet/TransactionFilterBottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { TransactionFilters } from '../utils/types'

const TransactionsScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [filters, setFilters] = useState<TransactionFilters>({})

  const { scrollY, headerHeight, titleTranslateY, titleTranslateX, titleScale } = useCollapsibleHeader()

  const handleOpenFilter = () => {
    bottomSheetRef.current?.present()
  }

  const handleApplyFilters = (newFilters: TransactionFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({})
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <CollapsibleHeader
            title={'Transactions'}
            headerHeight={headerHeight}
            titleTranslateY={titleTranslateY}
            titleTranslateX={titleTranslateX}
            titleScale={titleScale}
          />

          <View style={styles.headerActionsContainer}>
            <BackButton />
            <TouchableOpacity activeOpacity={0.7} onPress={handleOpenFilter}>
              <Image source={require('../assets/Filter.svg')} style={styles.filterIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            <TransactionsList
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
              filters={filters}
            />
          </View>
        </View>
      </SafeAreaView>

      <TransactionFilterBottomSheet ref={bottomSheetRef} onApply={handleApplyFilters} onClear={handleClearFilters} />
    </>
  )
}

export default TransactionsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_MAPPER.NEUTRAL_200,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 100,
  },
  listContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
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
  filterIcon: {
    width: 24,
    height: 24,
  },
})
