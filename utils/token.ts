import * as SecureStore from 'expo-secure-store'

export const saveAuthToken = async (token: string, expire: string) => {
  try {
    await SecureStore.setItem('access_token', token)
    await SecureStore.setItem('access_token_expire', expire)
  } catch (err) {
    console.error(`saving token error failed:${err}`)
  }
}

export const getAuthToken = async (): Promise<{ token: string | null; expire: string | null } | undefined> => {
  try {
    const token = await SecureStore.getItemAsync('access_token')
    const expire = await SecureStore.getItemAsync('access_token_expire')
    return {
      token,
      expire,
    }
  } catch (err) {
    console.error(`loading token error failed:${err}`)
  }
}

export const deleteAuthToken = async () => {
  try {
    await SecureStore.deleteItemAsync('access_token')
    await SecureStore.deleteItemAsync('access_token_expire')
  } catch (err) {
    console.error(`saving token error failed:${err}`)
  }
}

export const checkIsTokenExpireValid = (expire: string) => {
  return new Date(expire) > new Date()
}
