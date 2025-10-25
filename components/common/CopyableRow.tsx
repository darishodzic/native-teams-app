import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { Ionicons } from '@expo/vector-icons'
import { COLOR_MAPPER } from '../../utils/constants'

type CopyableDetailRowProps = {
  label: string
  value: string | number
}

export const CopyableDetailRow = (props: CopyableDetailRowProps) => {
  const { label, value } = props
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await Clipboard.setStringAsync(String(value))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      <TouchableOpacity onPress={handleCopy} disabled={copied} style={styles.iconButton}>
        <Ionicons
          name={copied ? 'checkmark-circle' : 'copy-outline'}
          size={20}
          color={copied ? COLOR_MAPPER.GREEN_400 : COLOR_MAPPER.NEUTRAL_100}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: COLOR_MAPPER.GREY_500,
    fontSize: 14,
  },
  value: {
    color: COLOR_MAPPER.GREY_200,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  iconButton: {
    marginLeft: 12,
    padding: 4,
  },
})
