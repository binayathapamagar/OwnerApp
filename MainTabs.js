import React from 'react'
import { Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CreateListingScreen from './screens/CreateListingScreen'

const Tab = createBottomTabNavigator()

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Create a Listing"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Create a Listing') {
            iconName = focused ? 'add-to-list' : 'add-to-list-outline'
          }
          // Replace this with the actual Icon component
          return <Text>{iconName}</Text>
        },
      })}
    >
      <Tab.Screen component={CreateListingScreen} name="Create a Listing" />
    </Tab.Navigator>
  )
}

export default MainTabs
