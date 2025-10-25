import { View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'

const OrderCard = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/OrderCard.png')} style={styles.image} alt="Order Card" />
    </View>
  )
}

export default OrderCard

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 159,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
