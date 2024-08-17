import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingScreen from './SettingScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {

  let logout = async () => {

    await AsyncStorage.removeItem('userID');
    await AsyncStorage.removeItem('validUser');

    navigation.navigate("Login");
  }

  return (
    <Tab.Navigator initialRouteName='Home'
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0
        },
        tabBarActiveTintColor: "#88ff00",
        tabBarInactiveTintColor: "white",
        
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        title: "DERASEWA",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 25,
          fontFamily: "Poppins-Bold"
        },
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="home" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        title: "PROFILE",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 25,
          fontFamily: "Poppins-Bold"
        },
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={size} color={color} />
        ),
      }} />
      <Tab.Screen name="Setting" component={SettingScreen} options={{
        title: "SETTING",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 25,
          fontFamily: "Poppins-Bold"
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={()=>{logout()}}
            style={styles.logoutButton}
          >
            <Text style={{ color: "black", fontFamily: "Poppins-Bold" }}>LOGOUT</Text>
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="gear" size={size} color={color} />
        ),
      }} />
    </Tab.Navigator>
  )
}

export default TabNavigator;

let styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "white",
    padding: 8,
    marginRight: 10,
    borderRadius: 10
  }
});

