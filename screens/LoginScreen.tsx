import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import api from '../utils/api'
import { Button } from '../components/buttons/Button'
import { COLOR_MAPPER } from '../utils/constants'
import { useAuthContext } from '../hooks/context/useAuthContext'

const LoginScreen = () => {
  const { login } = useAuthContext()
  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('password123')

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.login(email, password),
    onSuccess: (data) => {
      const { auth } = data
      login(auth.access_token, auth.access_token_expire)
    },
    onError: (error: any) => {
      Alert.alert('Login failed', error.message)
    },
  })

  const handleLogin = () => {
    mutate()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      {isPending ? <ActivityIndicator size="large" /> : <Button label="Login" onPress={handleLogin} />}
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_MAPPER.NEUTRAL_200,
    justifyContent: 'center',
    padding: 20,
    gap: 30,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    color: COLOR_MAPPER.GREY_200,
    textAlign: 'center',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: COLOR_MAPPER.GREY_200,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLOR_MAPPER.NEUTRAL_100,
  },
})
