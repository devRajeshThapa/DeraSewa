import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus'

const LoginScreen = ({ navigation }) => {

  let navTitle = "LOGIN";

  let [phoneNumber, setPhoneNumber] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");

  let uploadForm = async () => {

    let data = {
      phoneNumber: phoneNumber,
      password: password,
    }

    await fetch('http://192.168.1.64:8000/login-user', {
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
        }else{
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

  let userAuth = async()=>{
    let userID = await AsyncStorage.getItem('userID');
    let validUser = await AsyncStorage.getItem('validUser');

    if(validUser && userID){
      navigation.navigate("Tab");
    }
  }

  userAuth()

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.navTitle}>{navTitle}</Text>
      </View>
      <View>
        <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 25 }}>Hi, Welcome to back DeraSewa</Text>
        <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 15 }}>Please Login your Account to continue</Text>
      </View>

      {error && <View style={styles.errorWrapper}><Text style={{color: "white", fontFamily: "Poppins-Light", fontSize: 15}}>{error}</Text></View>}

      <View style={styles.contentWrapper}>
        <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="white" onChangeText={(value) => { setPhoneNumber(value); setError("") }} />
        <TextInput style={styles.input} placeholder='Password' placeholderTextColor="white" secureTextEntry onChangeText={(value) => { setPassword(value); setError("") }} />
        <TouchableOpacity onPress={() => { uploadForm() }}>
          <View style={styles.loginButton}>
            <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>LOGIN</Text>
          </View>
        </TouchableOpacity>
        <View style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Text style={{ color: "red", fontFamily: "Poppins-Light" }}>Forgot Password?</Text>
          <Text style={{ color: "white", fontFamily: "Poppins-Light" }}>Don't have Account? <Text style={{ fontStyle: "italic", textDecorationLine: "underline" }} onPress={() => { navigation.navigate("Register") }}>Register</Text></Text>
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
    gap: 20,
    flex: 1
  },
  nav: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10
  },
  navTitle: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 30
  },
  errorWrapper: {
    width: "100%",
    backgroundColor: "red",
    padding: 10,
    height: 50,
    display: "flex",
    justifyContent: "center",
    borderRadius: 10
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
    borderColor: "#5C5C5C",
    height: 60,
    color: "white",
    padding: 10,
    fontFamily: "Poppins-Light"
  },
  loginButton: {
    backgroundColor: "white",
    padding: 18,
    display: "flex",
    alignItems: "center",
    borderRadius: 10
  }
});