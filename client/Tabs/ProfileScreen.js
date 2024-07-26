import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = ({ navigation }) => {

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    let fetchData = async () => {
      let userID = await AsyncStorage.getItem('userID');
      let response = await fetch(`http://192.168.1.64:8000/get-user/${userID}`);
      let data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setProfilePicture(data.profilePicture);
    }

    setInterval(() => {
      fetchData();
    }, 1000)

  })

  let openAccount = () => {
    navigation.navigate("Account")
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoWrappper}>
        {profilePicture ? <Image style={{ width: 100, height: 100, borderWidth: 1, borderRadius: 100, borderColor: "black", borderWidth: 5 }} source={{ uri: profilePicture }} /> : <Text style={{ color: "white" }}>Fetching profile picture...</Text>}
        <View>
          {(firstName && lastName) ? <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 20 }}>{firstName + " " + lastName}</Text> : <Text style={{ color: "white" }}>Fetching user name...</Text>}
          <TouchableOpacity onPress={() => { openAccount() }}>
            <Text style={{ color: "white", fontFamily: "Poppins-Light", color: "blue" }}>Account Information</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.hostRoomButtonWrapper} onPress={()=>{navigation.navigate("HostRoom")}}>
        <Text style={{color: "black", fontFamily: "Poppins-Bold", fontSize: 18}}>HOST ROOM</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen;

let styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    display: "flex",
    gap: 20
  },
  infoWrappper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#202020",
    gap: 20,
    padding: 10,
    borderRadius: 10
  },
  hostRoomButtonWrapper: {
    backgroundColor: "white",
    width: "30%",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  }
})