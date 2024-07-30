import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import FirebaseAuthController from '../controllers/FirebaseAuthController'

const SignInScreen = ({ navigation }) => {
  //Properties
  const firebaseAuthController = FirebaseAuthController.getInstance()

  // Hooks
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const onSignInClicked = async () => {
    console.log(`onSignInClicked function called....`)

    if (!fieldsValidationSuccess()) {
      return
    }

    // Proceed with Firebase sign-in
    const result = await firebaseAuthController.signUserInWith(
      email,
      password,
      setLoading
    )

    if (!result.success) {
      Alert.alert(result.message)
    } else {
      clearFields()
    }
  }

  const fieldsValidationSuccess = () => {
    if (!email) {
      Alert.alert('Validation Error', 'Email is required')
      return false
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address')
      return false
    }

    if (!password) {
      Alert.alert('Validation Error', 'Password is required')
      return false
    }

    if (password.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long'
      )
      return false
    }

    return true
  }

  const clearFields = () => {
    setEmail('')
    setPassword('')
  }

  // View
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Welcome Back!</Text>

        <Text style={styles.description}>
          Sign in to continue and access all your personalized features.
        </Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Username"
          textContentType="email"
          autoCapitalize="none"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Password"
          textContentType="password"
          autoCapitalize="none"
          returnKeyType="done"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.buttonStyle} onPress={onSignInClicked}>
          <Text style={styles.buttonTextStyle}>Sign In</Text>
        </Pressable>
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    marginTop: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    color: '#666',
  },
  inputStyle: {
    height: 50,
    padding: 10,
    marginVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    height: 50,
    marginVertical: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  loadingContainer: {
    width: 75,
    height: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
})

export default SignInScreen
