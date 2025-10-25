import React, { forwardRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { TransactionFilters, TransactionStatus, TransactionType } from '../../utils/types'
import Checkbox from '../common/Checkbox'
import DatePicker from '../common/DatePicker'
import { COLOR_MAPPER, STATUSES, TRANSACTION_TYPES } from '../../utils/constants'
import { Button } from '../buttons/Button'

type FilterBottomSheetProps = {
  onApply: (filters: TransactionFilters) => void
  onClear: () => void
}

const TransactionFilterBottomSheet = forwardRef<BottomSheetModal, FilterBottomSheetProps>(({ onApply, onClear }, ref) => {
  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus>()
  const [selectedType, setSelectedType] = useState<TransactionType>()
  const [dateFrom, setDateFrom] = useState<Date | null>(null)
  const [dateTo, setDateTo] = useState<Date | null>(null)

  const handleApply = () => {
    const filters: TransactionFilters = {}
    if (selectedStatus) {
      filters.status = selectedStatus
    }
    if (selectedType) {
      filters.type = selectedType
    }
    if (dateFrom) {
      filters.date_from = dateFrom.toISOString().split('T')[0]
    }
    if (dateTo) {
      filters.date_to = dateTo.toISOString().split('T')[0]
    }

    onApply(filters)

    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.dismiss()
    }
  }

  const handleClear = () => {
    setSelectedStatus(undefined)
    setSelectedType(undefined)
    setDateFrom(null)
    setDateTo(null)
    onClear()
  }

  const handleClose = () => {
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.dismiss()
    }
  }

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={['90%']}
      enablePanDownToClose
      backgroundStyle={styles.bottomSheetBackground}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Filter</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <BottomSheetScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date range</Text>
            <DatePicker
              label="Select start date"
              date={dateFrom}
              onChange={(d) => {
                setDateFrom(d)
                if (dateTo && d > dateTo) setDateTo(null)
              }}
              maximumDate={new Date()}
            />

            {dateFrom && (
              <View style={{ marginTop: 8 }}>
                <DatePicker
                  label="Select end date"
                  date={dateTo}
                  onChange={(d) => d >= dateFrom && setDateTo(d)}
                  minimumDate={dateFrom}
                  maximumDate={new Date()}
                />
              </View>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status</Text>
            {STATUSES.map((status) => (
              <Checkbox
                key={status.value}
                label={status.label}
                value={status.value}
                selected={selectedStatus === status.value}
                onPress={(value) => setSelectedStatus(value as TransactionStatus)}
              />
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transaction category</Text>
            {TRANSACTION_TYPES.map((type) => (
              <Checkbox
                key={type.value}
                label={type.label}
                value={type.value}
                selected={selectedType === type.value}
                onPress={(value) => setSelectedType(value as TransactionType)}
              />
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            <Button label="Apply" onPress={handleApply} />
            <Button label="Clear all" onPress={handleClear} variant="outline" />
          </View>
        </BottomSheetScrollView>
      </View>
    </BottomSheetModal>
  )
})

export default TransactionFilterBottomSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_MAPPER.GREY_1000,
  },
  bottomSheetBackground: {
    backgroundColor: COLOR_MAPPER.GREY_1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR_MAPPER.NEUTRAL_100,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 24,
    color: COLOR_MAPPER.NEUTRAL_100,
    fontWeight: '300',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 24,
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR_MAPPER.NEUTRAL_100,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: COLOR_MAPPER.GREY_500,
    marginVertical: 8,
  },
  buttonsContainer: {
    paddingBottom: 100,
    paddingTop: 16,
    gap: 6,
  },
})
