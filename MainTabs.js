import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CreateListingScreen from './screens/CreateListingScreen'
import ProfileScreen from './screens/ProfileScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Listings"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Listings') {
            iconName = focused ? 'add-circle' : 'add-circle-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tab.Screen component={CreateListingScreen} name="Listings" />
      <Tab.Screen component={ProfileScreen} name="Profile" />
    </Tab.Navigator>
  )
}

export default MainTabs
