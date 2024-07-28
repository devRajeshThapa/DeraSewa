import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP_ADDRESS } from '@env'

const ProfileScreen = ({ navigation }) => {

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    let fetchData = async () => {
      let userID = await AsyncStorage.getItem('userID');
      let response = await fetch(`${IP_ADDRESS}/get-user/${userID}`);
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
        {profilePicture ? <Image style={{ width: 100, height: 100, borderRadius: 100, borderColor: "#88ff00", borderWidth: 1 }} source={{ uri: profilePicture }} /> : <Text style={{ color: "white" }}>Fetching profile picture...</Text>}
        <View>
          {(firstName && lastName) ? <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 20 }}>{firstName + " " + lastName}</Text> : <Text style={{ color: "white" }}>Fetching user name...</Text>}
          <TouchableOpacity onPress={() => { openAccount() }}>
            <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", color: "blue", textDecorationLine: "underline" }}>Account Information</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.hostRoomButtonWrapper} onPress={()=>{navigation.navigate("HostRoom")}}>
        <Text style={{color: "black", fontFamily: "Poppins-Bold", fontSize: 15}}>HOST ROOM</Text>
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
    backgroundColor: "#191919",
    gap: 20,
    padding: 10,
    borderRadius: 10
  },
  hostRoomButtonWrapper: {
    backgroundColor: "white",
    padding: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-start"
  }
})