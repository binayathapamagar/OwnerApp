import { View, Text } from 'react-native'
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
      setVideos(data)
    } catch (err) {
      setError(err.message)
      Alert.alert('Error', err.message)
    }
  }

  //Views

  return (
    <View>
      <Text>CreateListingScreen</Text>
    </View>
  )
}
export default CreateListingScreen
