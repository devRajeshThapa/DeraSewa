import { View, Text } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingScreen from './SettingScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={HomeScreen} options={{title: "DERASEWA",}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{title: "PROFILE"}}/>
      <Tab.Screen name="Setting" component={SettingScreen} options={{title: "SETTING"}}/>
    </Tab.Navigator>
  )
}

export default TabNavigator

