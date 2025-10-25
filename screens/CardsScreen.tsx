import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR_MAPPER } from '../utils/constants'
import SimpleRow from '../components/common/SimpleRow'

const CardsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Some random Info</Text>

      <View style={styles.detailsCard}>
        <SimpleRow label="Bank Fee" value={'2%'} />
        <SimpleRow label="Card Fee" value={'2%'} />
        <SimpleRow label="Limit per day" value={'12333'} />
        <SimpleRow label="Limit per week" value={'999999'} />
      </View>
    </View>
  )
}

export default CardsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_MAPPER.NEUTRAL_200,
    padding: 20,
    paddingTop: 100,
    gap: 30,
  },
  title: {
    color: COLOR_MAPPER.NEUTRAL_100,
    fontSize: 24,
  },
  detailsCard: {
    backgroundColor: COLOR_MAPPER.GREY_1000,
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
})
