import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

const LoginScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{color: "white"}}>Hi, Welcome back to DeraSewa</Text>
      <Text style={{color: "white"}}>Please Register your Account to continue</Text>

      <View style={styles.contentWrapper}>
        <View style={styles.nameInputFeild}>
          <TextInput style={styles.nameInput}/>
          <TextInput style={styles.nameInput}/>
        </View>
        <TextInput style={styles.input}/>
        <TextInput style={styles.input}/>
        <TextInput style={styles.input}/>
        <Text style={{color: "white"}}>Add your profile picture</Text>
        <View style={styles.loginButton}>
          <Text>LOGIN</Text>
        </View>
        <Text style={{color: "white"}}>Forgot Password?</Text>
        <Text style={{color: "white"}}>Dont have Account? <Text onPress={()=>{props.navigation.navigate("Register")}}>Register</Text></Text>
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
    padding: 10
  },
  contentWrapper: {
    display: "flex",
    gap: 10,
    width: "100%"
  },
  nameInput: {
    backgroundColor: "white",
    width: "50%"
  },
  input: {
    backgroundColor: "white",
    width: "100%"
  },
  nameInputFeild: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  loginButton: {
    backgroundColor: "white",
    color: "black",
    padding: 20,
    display: "flex",
    alignItems: "center",
  }
});