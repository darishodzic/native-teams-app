import { Image, ImageProps } from 'expo-image'

const Logo = (props: ImageProps) => {
  return <Image source={require('../../assets/NativeTeamsIcon.svg')} style={{ width: 32, height: 32 }} alt="NT" {...props} />
}

export default Logo
