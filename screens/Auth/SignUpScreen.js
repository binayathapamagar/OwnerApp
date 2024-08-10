import React, { useState } from 'react'
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

import Toast from 'react-native-toast-message'
import FirebaseAuthController from '../../controllers/FirebaseAuthController'

const SignUpScreen = ({ navigation }) => {
  const firebaseAuthController = FirebaseAuthController.getInstance()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const validateName = (name) => {
    return name.trim().length > 0
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phoneNumber)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const onSignUpClicked = async () => {
    if (!validateFields()) {
      return
    }

    console.log('onSignUpClicked function: creating a new account...')

    const result = await firebaseAuthController.signUserUpWith(
      email,
      password,
      setLoading
    )

    if (!result.success) {
      Alert.alert('Error', result.message)
    } else {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Success!',
        text2: 'Signed up successfully.',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      })
      navigation.goBack()
      clearFields()
    }
  }

  const validateFields = () => {
    if (!validateName(firstName)) {
      Alert.alert('Validation Error', 'First Name is required')
      return false
    }

    if (!validateName(lastName)) {
      Alert.alert('Validation Error', 'Last Name is required')
      return false
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address')
      return false
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert(
        'Validation Error',
        'Please enter a valid 10-digit Phone Number'
      )
      return false
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long'
      )
      return false
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match')
      return false
    }

    return true
  }

  const clearFields = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhoneNumber('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Join Us!</Text>

        <Text style={styles.description}>
          Sign up to rent out your car and start earning today.
        </Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Pressable style={styles.buttonStyle} onPress={onSignUpClicked}>
          <Text style={styles.buttonTextStyle}>Sign Up</Text>
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

export default SignUpScreen
