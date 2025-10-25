import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { COLOR_MAPPER } from '../../utils/constants'

type DatePickerProps = {
  label: string
  date: Date | null
  onChange: (date: Date) => void
  minimumDate?: Date
  maximumDate?: Date
}

const DatePicker = (props: DatePickerProps) => {
  const { label, date, onChange, minimumDate, maximumDate } = props
  const [showPicker, setShowPicker] = useState(false)
  const [tempDate, setTempDate] = useState(date || new Date())

  const formattedDate = date
    ? `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
    : label

  const handlePress = () => {
    setTempDate(date || new Date())
    setShowPicker(true)
  }

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false)
      if (selectedDate && event.type === 'set') {
        onChange(selectedDate)
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate)
      }
    }
  }

  const handleCancel = () => setShowPicker(false)

  const handleConfirm = () => {
    onChange(tempDate)
    setShowPicker(false)
  }

  return (
    <View>
      <TouchableOpacity style={styles.dateInputContainer} onPress={handlePress}>
        <Text style={styles.dateInputText}>{formattedDate}</Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </TouchableOpacity>

      {showPicker && Platform.OS === 'ios' && (
        <View style={styles.iosContainer} onStartShouldSetResponder={() => true}>
          <View style={styles.iosHeader}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.iosButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.iosTitle}>{label}</Text>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={[styles.iosButton, styles.iosConfirm]}>Done</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            onChange={handleChange}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            textColor={COLOR_MAPPER.NEUTRAL_100}
          />
        </View>
      )}

      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLOR_MAPPER.GREY_500,
    paddingHorizontal: 16,
    height: 52,
  },
  dateInputText: {
    flex: 1,
    fontSize: 16,
    color: COLOR_MAPPER.GREY_500,
  },
  calendarIcon: {
    fontSize: 20,
    marginLeft: 8,
  },
  iosContainer: {
    backgroundColor: COLOR_MAPPER.GREY_900,
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
  },
  iosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_MAPPER.GREY_500,
  },
  iosTitle: {
    color: COLOR_MAPPER.NEUTRAL_100,
    fontSize: 16,
    fontWeight: '600',
  },
  iosButton: {
    fontSize: 16,
    color: COLOR_MAPPER.NEUTRAL_100,
  },
  iosConfirm: {
    fontWeight: '600',
  },
})
