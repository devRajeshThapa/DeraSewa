import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IP_ADDRESS, SERVER_PORT } from '@env'

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const AccountInfoScreen = ({ navigation }) => {

  let navTitle = "ACCOUNT INFO";

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [password, setPassword] = useState("");
  let [profilePicture, setProfilePicture] = useState("");
  let [passHidden, setPassHidden] = useState(true);
  let [hiddenPass, setHiddenPass] = useState("")

  useEffect(() => {

    let fetchData = async () => {
      let userID = await AsyncStorage.getItem('userID');
      let response = await fetch(`https://derasewa.onrender.com/get-user/${userID}`);
      let data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setPassword(data.password);
      setProfilePicture(data.profilePicture);

      let passLen = data.password.length;
      let star = "*";
      pass = star.padStart(passLen,"*");
      setHiddenPass(pass)
    }

    fetchData();
  });

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.navTitle}>{navTitle}</Text>
      </View>
      <ScrollView>
        {profilePicture ? <Image style={{ width: 85, height: 85, borderRadius: 100, borderColor: "#202020", borderWidth: 1, alignSelf: "left" }} source={{ uri: profilePicture }} /> : <Image style={{ width: 85, height: 85, borderRadius: 100 }} source={require("../assets/images/default_profile.jpg")} />}
        <View style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <View style={styles.nameFeild}>
            <View>
              <Text style={styles.title}>Full Name</Text>
              <Text style={styles.value}>{firstName + " " + lastName}</Text>
            </View>
          </View>
          <View style={{ backgroundColor: "#202020", padding: 10, borderRadius: 10 }}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <View style={{ backgroundColor: "#202020", padding: 10, borderRadius: 10 }}>
            <Text style={styles.title}>Phone Number</Text>
            <Text style={styles.value}>{phoneNumber}</Text>
          </View>
          <View style={{ backgroundColor: "#202020", padding: 10, borderRadius: 10, position: "relative", display: "flex", justifyContent: "flex-end" }}>
            {
              passHidden ?
                <TouchableOpacity onPress={() => { setPassHidden(false) }} style={{ position: "absolute", alignSelf: "flex-end", paddingBottom: 15, paddingRight: 15, zIndex: 4 }} >
                  <FontAwesome6 name="eye-slash" style={{ fontSize: 15, color: "white" }} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => { setPassHidden(true) }} style={{ position: "absolute", alignSelf: "flex-end", paddingBottom: 15, paddingRight: 15, zIndex: 4 }} >
                  <FontAwesome6 name="eye" style={{ fontSize: 15, color: "white" }} />
                </TouchableOpacity>
            }
            <Text style={styles.title}>Password</Text>
            {
              passHidden?
              <Text style={styles.value}>{hiddenPass}</Text>
              :
              <Text style={styles.value}>{password}</Text>
            }
          </View>
        </View>
        <View style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <TouchableOpacity onPress={() => { navigation.navigate("EditProfile") }}>
            <View style={styles.button}>
              <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>UPDATE INFO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate("DeleteAccount") }}>
            <View style={styles.deleteButton}>
              <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}>DELETE ACCOUNT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default AccountInfoScreen;

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
    paddingBottom: 10
  },
  navTitle: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 25
  },
  button: {
    backgroundColor: "white",
    padding: 12,
    display: "flex",
    alignItems: "center",
    borderRadius: 10
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 12,
    display: "flex",
    alignItems: "center",
    borderRadius: 10
  },
  contentWrapper: {
    display: "flex",
    gap: 20,
    width: "100%"
  },
  input: {
    backgroundColor: "#191919",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#161616",
    height: 60,
    color: "white",
    padding: 10,
    fontFamily: "Poppins-Bold"
  },
  nameFeild: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#202020",
    borderRadius: 10
  },
  title: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 15
  },
  value: {
    color: "white",
    fontFamily: "Poppins-Light",
    fontSize: 15
  }
})