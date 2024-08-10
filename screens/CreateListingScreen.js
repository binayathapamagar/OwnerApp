import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import ApiController from '../controllers/ApiController'

const CreateListingScreen = () => {
  //Hooks

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  //Functions

  const fetchData = async () => {
    console.log(`fetchVehicleData called...`)
    try {
      const api = ApiController.getInstance()
      const data = await api.fetchVehiclesList(setLoading)
    } catch (err) {
      Alert.alert('Error', err.message)
    }
  }

  //Views

  return (
    <View>
      <Text>CreateListingScreen</Text>
      {loading && <ActivityIndicator size="large" color="black" />}
    </View>
  )
}

const styles = StyleSheet.create({})

export default CreateListingScreen
