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
import DeleteRoom from './Stacks/DeleteRoom';
import HostRoomScreen from './Stacks/HostRoomScreen';
import RoomScreen from './Stacks/RoomScreen';
import ReferralScreen from './Stacks/ReferralScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
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
          name="DeleteRoom"
          component={DeleteRoom}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HostRoom"
          component={HostRoomScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Room"
          component={RoomScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Referral"
          component={ReferralScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App