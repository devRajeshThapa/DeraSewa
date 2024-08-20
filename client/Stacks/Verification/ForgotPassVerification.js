import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IP_ADDRESS, SERVER_PORT } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassVerification = ({ route, navigation }) => {

  let [error, setError] = useState();
  let [OTP, setOTP] = useState();
  let [success, setSuccess] = useState(false)
  let [resend, setResend] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setResend(true);
    }, 15000)
  }, [resend])

  let navTitle = "VERIFICATION";

  let { email, password } = route.params;

  let genOTP = async () => {
    await fetch(`https://derasewa.onrender.com/gen-otp-forgot-pass/${email}`)
  }

  useEffect(() => {
    let genOTP = async () => {
      await fetch(`https://derasewa.onrender.com/gen-otp-forgot-pass/${email}`)
    }

    genOTP()
  }, []);

  let changePass = async () => {

    let data = {
      password: password,
      OTP: OTP
  }

  await fetch(`https://derasewa.onrender.com/change-pass/${email}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
      .then(res => res.json())
      .then(async (data) => {
          if (data.success) {
            setError("");
            setSuccess(true)
            setOTP("")
            setError(data.success)
            setTimeout(()=>{
              navigation.navigate("Login")
            }, 2000)
          } else {
              setError("");
              setError(data.error)
          }
      })
      .catch(() => { console.log("Something went wrong") })
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.navTitle}>{navTitle}</Text>
      </View>
      {error && <View style={[styles.errorWrapper, success && styles.successWrapper]}><Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 15 }}>{error}</Text></View>}
      <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 15 }}>※ Please enter the OTP sent on your email</Text>
      <TextInput style={styles.input} placeholder='Enter your OTP here' placeholderTextColor={"white"} onChangeText={(value) => { setOTP(value); setError("") }} />
      <TouchableOpacity onPress={() => { changePass() }}>
        <View style={styles.verifyButton}>
          <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>VERIFY</Text>
        </View>
      </TouchableOpacity>
      <Text style={{ color: "white", fontFamily: "Poppins-Light", alignSelf: "center", marginTop: 5 }}>Didn't got OTP? 
        {
          resend?
            <Text style={{ color: "#88ff00", alignSelf: "center" }} onPress={() => { genOTP(); setResend(false);}}> Resend</Text>
          :
          <Text style={{ color: "gray", alignSelf: "center" }}> Resend</Text>
        }
      </Text>
    </View>
  )
}

export default ForgotPassVerification;

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
  successWrapper: {
    width: "100%",
    backgroundColor: "#198450",
    padding: 10,
    maxHeight: 65,
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
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