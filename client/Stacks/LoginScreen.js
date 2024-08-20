import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { IP_ADDRESS, SERVER_PORT } from '@env'

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const LoginScreen = ({ navigation }) => {

  let navTitle = "LOGIN";

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [passHidden, setPassHidden] = useState(true)

  let userAuth = async () => {
    let userID = await AsyncStorage.getItem('userID');
    let validUser = await AsyncStorage.getItem('validUser');

    if (validUser && userID) {
      navigation.navigate("Tab");
    }
  }

  userAuth()

  let uploadForm = async () => {

    let data = {
      email: email,
      password: password,
    }

    await fetch(`https://derasewa.onrender.com/login-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(async (data) => {
        if (data.userID) {
          await AsyncStorage.removeItem('userID')
          await AsyncStorage.removeItem('validUser')
          await AsyncStorage.setItem('userID', data.userID);
          await AsyncStorage.setItem('validUser', "true");
        } else {
          setError("");
          setError(data.error);
        }
      })
      .then(async () => {
        let validUser = await AsyncStorage.getItem('validUser');

        if (validUser === "true") {
          navigation.navigate("Tab");
        }
      })
      .catch(() => { console.log("Something went wrong") })
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.navTitle}>{navTitle}</Text>
      </View>
      <View>
        <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 20 }}>Hi, Welcome back to DeraSewa</Text>
        <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 15 }}>Please login your account to continue</Text>
      </View>

      {error && <View style={styles.errorWrapper}><Text style={{ color: "white", fontFamily: "Poppins-Regular", fontSize: 15 }}>{error}</Text></View>}

      <View style={styles.contentWrapper}>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="white" onChangeText={(value) => { setEmail(value); setError("") }} autoCorrect={false} />
        <View style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          {
            passHidden ?
              <TouchableOpacity onPress={() => { setPassHidden(false) }} style={{ position: "absolute", alignSelf: "flex-end", paddingRight: 15, zIndex: 4 }} >
                <FontAwesome6 name="eye-slash" style={{ fontSize: 15, color: "white" }} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { setPassHidden(true) }} style={{ position: "absolute", alignSelf: "flex-end", paddingRight: 15, zIndex: 4 }} >
                <FontAwesome6 name="eye" style={{ fontSize: 15, color: "white" }} />
              </TouchableOpacity>
          }
          {
            passHidden ?
              <TextInput style={styles.input} placeholder='Password' value={password} placeholderTextColor="white" secureTextEntry onChangeText={(value) => { setPassword(value); setError("") }} autoCorrect={false} />
              :
              <TextInput style={styles.input} placeholder='Password' value={password} placeholderTextColor="white" onChangeText={(value) => { setPassword(value); setError("") }} autoCorrect={false} />
          }
        </View>
        <TouchableOpacity onPress={() => { uploadForm() }}>
          <View style={styles.loginButton}>
            <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>LOGIN</Text>
          </View>
        </TouchableOpacity>
        <View style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Text style={{ color: "red", fontFamily: "Poppins-Light" }} onPress={()=>{navigation.navigate("ForgotPass")}}>Forgot Password?</Text>
          <Text style={{ color: "white", fontFamily: "Poppins-Light" }}>Don't have Account? <Text style={{ color: "#88ff00", textDecorationLine: "underline" }} onPress={() => { navigation.navigate("Register") }}>Register</Text></Text>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen;

let styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    display: "flex",
    gap: 5,
    flex: 1
  },
  nav: {
    width: "100%",
    paddingTop: 5,
  },
  navTitle: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 30,
  },
  errorWrapper: {
    width: "100%",
    backgroundColor: "red",
    padding: 10,
    maxHeight: 65,
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 5
  },
  contentWrapper: {
    display: "flex",
    gap: 20,
    width: "100%"
  },
  input: {
    backgroundColor: "transparent",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#262626",
    height: 52,
    color: "white",
    padding: 10,
    fontFamily: "Poppins-Light"
  },
  loginButton: {
    backgroundColor: "white",
    padding: 12,
    display: "flex",
    alignItems: "center",
    borderRadius: 10
  }
});