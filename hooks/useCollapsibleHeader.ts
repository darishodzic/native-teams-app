import { useRef } from 'react'
import { Animated, Dimensions } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export interface CollapsibleHeaderHook {
  scrollY: Animated.Value
  headerHeight: Animated.AnimatedInterpolation<number>
  titleTranslateY: Animated.AnimatedInterpolation<number>
  titleTranslateX: Animated.AnimatedInterpolation<number>
  titleScale: Animated.AnimatedInterpolation<number>
}

export const useCollapsibleHeader = (
  textWidth: number = 150,
  maxHeight: number = 90,
  minHeight: number = 50,
): CollapsibleHeaderHook => {
  const scrollY = useRef(new Animated.Value(0)).current

  const headerHeight = scrollY.interpolate({
    inputRange: [0, maxHeight - minHeight],
    outputRange: [maxHeight, minHeight],
    extrapolate: 'clamp',
  })

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, maxHeight - minHeight],
    outputRange: [0, -maxHeight / 2 + minHeight / 2],
    extrapolate: 'clamp',
  })

  const centerX = (SCREEN_WIDTH - textWidth) / 2

  const titleTranslateX = scrollY.interpolate({
    inputRange: [0, maxHeight - minHeight],
    outputRange: [20, centerX],
    extrapolate: 'clamp',
  })

  const titleScale = scrollY.interpolate({
    inputRange: [0, maxHeight - minHeight],
    outputRange: [1, 0.65],
    extrapolate: 'clamp',
  })

  return { scrollY, headerHeight, titleTranslateY, titleTranslateX, titleScale }
}
