import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IP_ADDRESS, SERVER_PORT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterVarification = ({ route, navigation }) => {

  let [error, setError] = useState();
  let [OTP, setOTP] = useState();
  let [resend, setResend] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setResend(true);
    }, 15000)
  }, [resend])

  let navTitle = "VERIFICATION";

  let { Data } = route.params;

  let genOTP = async () => {
    await fetch(`${IP_ADDRESS}/gen-otp/${Data["email"]}`)
  }

  useEffect(() => {
    let genOTP = async () => {
      await fetch(`${IP_ADDRESS}/gen-otp/${Data["email"]}`)
    }

    genOTP()
  }, []);

  let createUser = async () => {
    if (!OTP) {
      setError("");
      setError("Please enter the OTP!")
    } else {
      await fetch(`${IP_ADDRESS}/get-otp/${Data["email"]}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.OTP == Number(OTP)) {

            let uploadForm = async () => {

              let data = {
                firstName: Data["firstName"],
                lastName: Data["lastName"],
                email: Data["email"],
                phoneNumber: Data["phoneNumber"],
                password: Data["password"],
                profilePicture: Data["profilePicture"],
              }

              await fetch(`${IP_ADDRESS}/create-user`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
                .then((res) => res.json())
                .then(async (data) => {
                  await AsyncStorage.removeItem('userID');
                  await AsyncStorage.removeItem('validUser');

                  await AsyncStorage.setItem('userID', data.userID);
                  await AsyncStorage.setItem('validUser', "true");

                })
                .then(async () => {
                  let validUser = await AsyncStorage.getItem('validUser');

                  if (validUser === "true") {
                    navigation.navigate("Tab")
                  }
                })
                .catch(() => { console.log("Something went wrong") })

            }

            uploadForm();

          } else {
            setError("");
            setError("OTP did not matched!");
          }
        })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.navTitle}>{navTitle}</Text>
      </View>
      <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 15 }}>Please enter the OTP sent on your email</Text>
      {error && <View style={styles.errorWrapper}><Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 15 }}>{error}</Text></View>}
      <TextInput style={styles.input} placeholder='Enter your OTP here' placeholderTextColor={"white"} onChangeText={(value) => { setOTP(value); setError("") }} keyboardType='numeric' />
      <TouchableOpacity onPress={() => { createUser() }}>
        <View style={styles.verifyButton}>
          <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>VERIFY</Text>
        </View>
      </TouchableOpacity>
      <Text style={{ color: "white", fontFamily: "Poppins-Light", alignSelf: "center", marginTop: 5 }}>Didn't got OTP?
        {
          resend ?
            <Text style={{ color: "#88ff00", alignSelf: "center" }} onPress={() => { genOTP(); setResend(false); }}> Resend</Text>
            :
            <Text style={{ color: "gray", alignSelf: "center" }}> Resend</Text>
        }
      </Text>
    </View>
  )
}

export default RegisterVarification;

let styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    display: "flex",
    felx: 1
  },
  nav: {
    width: "100%",
    paddingTop: 5,
    paddingBottom: 5
  },
  navTitle: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 25
  },
  paragraph: {
    color: "white",
    fontFamily: "Poppins-Regular",
    fontSize: 15
  },
  errorWrapper: {
    width: "100%",
    backgroundColor: "red",
    padding: 10,
    maxHeight: 65,
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10
  },
  input: {
    backgroundColor: "transparent",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5C5C5C",
    height: 52,
    color: "white",
    padding: 10,
    fontFamily: "Poppins-Light"
  },
  verifyButton: {
    backgroundColor: "white",
    padding: 12,
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10
  }
})