import { View, Text } from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './Stacks/LoginScreen';
import RegisterScreen from './Stacks/RegisterScreen';
import TabNavigator from './Tabs/TabNavigator'
import { NativeScreen } from 'react-native-screens';
import AccountInfoScreen from './Stacks/AccountInfoScreen';
import DeleteAccount from './Stacks/Delete/DeleteAccount';
import DeleteRoom from './Stacks/Delete/DeleteRoom';
import HostRoomScreen from './Stacks/HostRoomScreen';
import RoomScreen from './Stacks/RoomScreen';

import AboutUsScreen from './Stacks/Setting/AboutUsScreen';
import PrivacyPolicyScreen from './Stacks/Setting/PrivacyPolicyScreen';
import TermConditionScreen from './Stacks/Setting/TermConditionScreen';
import HelpSupportScreen from './Stacks/Setting/HelpSupportScreen';
import FAQScreen from './Stacks/Setting/FAQScreen';
import EditRoom from './Stacks/Update/EditRoom';
import RegisterVerification from './Stacks/Verification/RegisterVerification';
import EditProfile from './Stacks/Update/EditProfile';
import ForgotPass from './Stacks/Update/ForgotPass';
import ForgotPassVerification from './Stacks/Verification/ForgotPassVerification'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Tab'>
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
          name="RegisterVerification"
          component={RegisterVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassVerification"
          component={ForgotPassVerification}
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
          name="EditRoom"
          component={EditRoom}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermCondition"
          component={TermConditionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HelpSupport"
          component={HelpSupportScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPass"
          component={ForgotPass}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App