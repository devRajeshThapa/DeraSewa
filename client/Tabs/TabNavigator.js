import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingScreen from './SettingScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {

  let logout = async () => {

    let userID = await AsyncStorage.getItem('userID');
    let validUser = await AsyncStorage.getItem('validUser');

    await AsyncStorage.removeItem('userID');
    await AsyncStorage.removeItem('validUser');

    navigation.navigate("Login");
  }

  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        title: "DERASEWA",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 30,
          fontFamily: "Poppins-Bold"
        }
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        title: "PROFILE",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 30,
          fontFamily: "Poppins-Bold"
        }
      }} />
      <Tab.Screen name="Setting" component={SettingScreen} options={{
        title: "SETTING",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 30,
          fontFamily: "Poppins-Bold"
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={logout}
            style={styles.logoutButton}
          >
            <Text style={{ color: "black", fontFamily: "Poppins-Light" }}>Logout</Text>
          </TouchableOpacity>
        )
      }} />
    </Tab.Navigator>
  )
}

export default TabNavigator;

let styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "white",
    padding: 10,
    marginRight: 10,
    borderRadius: 10
  }
});

