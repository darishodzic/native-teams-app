import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationProp } from '../../utils/types'

const BackButton = () => {
  const navigation = useNavigation<NavigationProp>()

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
      <Image source={require('../../assets/Back.svg')} style={styles.icon} alt="<" />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
})
