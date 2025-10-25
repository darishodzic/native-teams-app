import { View, Text, StyleSheet } from 'react-native'
import { COLOR_MAPPER } from '../../utils/constants'

type SimpleRowProps = {
  label: string
  value: string
  valueColor?: string
}

const SimpleRow = (props: SimpleRowProps) => {
  const { label, value, valueColor } = props

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: valueColor || COLOR_MAPPER.NEUTRAL_100 }]}>{value}</Text>
    </View>
  )
}

export default SimpleRow

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: COLOR_MAPPER.GREY_200,
    fontSize: 13,
  },
  value: {
    color: COLOR_MAPPER.NEUTRAL_100,
    fontSize: 14,
    fontWeight: '600',
  },
})
