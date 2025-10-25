import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { COLOR_MAPPER } from '../../utils/constants'

interface CheckboxItemProps {
  label: string
  value: string
  selected: boolean
  onPress: (value: string) => void
}

const CheckboxItem = (props: CheckboxItemProps) => {
  const { label, value, selected, onPress } = props
  return (
    <TouchableOpacity
      key={value}
      style={[styles.checkboxItem, selected && styles.checkboxItemActive]}
      onPress={() => onPress(value)}
      activeOpacity={0.7}>
      <Text style={[styles.checkboxLabel, selected && styles.checkboxLabelActive]}>{label}</Text>
      <View style={[styles.checkbox, selected && styles.checkboxChecked]}>
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  )
}

export default CheckboxItem

const styles = StyleSheet.create({
  checkboxItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  checkboxItemActive: {
    backgroundColor: COLOR_MAPPER.GREY_900,
  },
  checkboxLabel: {
    fontSize: 17,
    color: COLOR_MAPPER.NEUTRAL_100,
    fontWeight: '400',
  },
  checkboxLabelActive: {
    fontWeight: '600',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLOR_MAPPER.NEUTRAL_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLOR_MAPPER.PINK_400,
    borderColor: COLOR_MAPPER.PINK_400,
  },
  checkmark: {
    color: COLOR_MAPPER.NEUTRAL_100,
    fontSize: 16,
    fontWeight: 'bold',
  },
})
