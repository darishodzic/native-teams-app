import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image, ImageSource } from 'expo-image'
import { COLOR_MAPPER } from '../../utils/constants'

type ActionButtonProps = {
  label?: string
  icon: ImageSource
  onPress?: () => void
}

const ActionButton = (props: ActionButtonProps) => {
  const { label, icon, onPress } = props
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.button}>
        <Image source={icon} style={styles.icon} alt="I" />
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  )
}

export default ActionButton

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_MAPPER.PINK_400,
    width: 48,
    height: 48,
    borderRadius: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 14,
    color: COLOR_MAPPER.GREY_100,
  },
})
