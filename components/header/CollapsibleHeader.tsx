import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { COLOR_MAPPER } from '../../utils/constants'

interface CollapsibleHeaderProps {
  title: string
  headerHeight: Animated.AnimatedInterpolation<number>
  titleTranslateY: Animated.AnimatedInterpolation<number>
  titleTranslateX: Animated.AnimatedInterpolation<number>
  titleScale: Animated.AnimatedInterpolation<number>
}

export const CollapsibleHeader = (props: CollapsibleHeaderProps) => {
  const { title, headerHeight, titleTranslateY, titleTranslateX, titleScale } = props

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.Text
        style={[
          styles.title,
          {
            transform: [{ translateY: titleTranslateY }, { translateX: titleTranslateX }, { scale: titleScale }],
          },
        ]}>
        {title}
      </Animated.Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    paddingBottom: 12,
    zIndex: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    color: COLOR_MAPPER.NEUTRAL_100,
  },
})
