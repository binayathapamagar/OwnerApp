import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import FirebaseAuthController from '../controllers/FirebaseAuthController'
import Toast from 'react-native-toast-message'

const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const authController = FirebaseAuthController.getInstance()

  const handleLogout = async () => {
    const result = await authController.performLogout(setLoading)
    if (result.success) {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Success!',
        text2: 'Logout successful.',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 40,
      })

      navigation.reset({
        index: 0,
        routes: [{ name: 'Sign In' }],
      })
    } else {
      Alert.alert('Logout Failed', result.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Button title="Logout" onPress={handleLogout} disabled={loading} />

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
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
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

export default ProfileScreen
