import { View, Text } from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './Stacks/LoginScreen';
import RegisterScreen from './Stacks/RegisterScreen';
import TabNavigator from './Tabs/TabNavigator'
import { NativeScreen } from 'react-native-screens';
import AccountInfoScreen from './Stacks/AccountInfoScreen';
import DeleteAccount from './Stacks/DeleteAccount';
import UserAuth from './Stacks/UserAuth';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='UserAuth'>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Account"
          component={AccountInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserAuth"
          component={UserAuth}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App