// components/common/Button.tsx
import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { COLOR_MAPPER } from '../../utils/constants'

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  label: string
  variant?: 'filled' | 'outline'
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { label, variant = 'filled', style, ...rest } = props
  return (
    <TouchableOpacity
      style={[styles.base, variant === 'filled' ? styles.filled : styles.outline, style as ViewStyle]}
      activeOpacity={0.8}
      {...rest}>
      <Text style={[styles.text, variant === 'filled' ? styles.textFilled : styles.textOutline]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  filled: {
    backgroundColor: COLOR_MAPPER.NEUTRAL_100,
  },
  outline: {
    borderWidth: 1,
    borderColor: COLOR_MAPPER.NEUTRAL_100,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textFilled: {
    color: COLOR_MAPPER.NEUTRAL_200,
  },
  textOutline: {
    color: COLOR_MAPPER.NEUTRAL_100,
  },
})
