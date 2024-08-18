import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP_ADDRESS, SERVER_PORT } from '@env'

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ProfileScreen = ({ navigation }) => {

  let deleteRoom = async (roomID) => {
    await AsyncStorage.removeItem('roomID')
    await AsyncStorage.setItem('roomID', roomID);
    navigation.navigate("DeleteRoom");
  }

  let EditRoom = async (roomID) => {
    await AsyncStorage.removeItem('roomID')
    await AsyncStorage.setItem('roomID', roomID);
    navigation.navigate("EditRoom");
  }

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [profilePicture, setProfilePicture] = useState("");
  let [data, setData] = useState("");
  let [deraCoin, setDeraCoin] = useState("")

  useEffect(() => {
    let fetchData = async () => {
      let userID = await AsyncStorage.getItem('userID');
      let response = await fetch(`https://derasewa.onrender.com/get-user/${userID}`);
      let data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setProfilePicture(data.profilePicture);
      setDeraCoin(data.deraCoin)
    }

    fetchData();

  })

  useEffect(() => {
    let getData = async () => {
      let hosterID = await AsyncStorage.getItem('userID')
      let res = await fetch(`https://derasewa.onrender.com/get-hoster-rooms/${hosterID}`, "GET");
      let data = await res.json();
      setData(data);
    }

    getData();
  })

  let roomClick = async (roomID) => {
    await AsyncStorage.removeItem('roomID')
    await AsyncStorage.setItem('roomID', roomID);
    navigation.navigate("Room");
  }

  let openAccount = () => {
    navigation.navigate("Account")
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ display: "flex", gap: 10 }}>
          <View style={styles.infoWrappper}>
            {profilePicture ? <Image style={{ width: 85, height: 85, borderRadius: 100 }} source={{ uri: profilePicture }} /> : <Image style={{ width: 85, height: 85, borderRadius: 100 }} source={require("../assets/images/default_profile.jpg")} /> }
            <View>
              {(firstName && lastName) ?
                <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 18 }}>{firstName + " " + lastName}</Text>
                :
                <Text style={{ color: "white" }}>Fetching user name...</Text>}
              <TouchableOpacity onPress={() => { openAccount() }}>
                <Text style={{ fontFamily: "Poppins-SemiBold", color: "#88ff00", textDecorationLine: "underline", fontSize: 13 }}>Account Information</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.hostRoomButtonWrapper} onPress={() => { navigation.navigate("HostRoom") }}>
            <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>HOST ROOM</Text>
          </TouchableOpacity>
          <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 18, }}>※ ROOMS THAT YOU HAVE HOSTED</Text>
          {(data.length != 0) ?
            <View>
              {data.map((item) => {
                return (
                  <View style={styles.roomWrapper} key={item._id}>
                    <View style={{ overflow: "hidden", borderRadius: 10 }}>
                      <ScrollView horizontal={true} style={{ display: "flex", gap: 10 }}>
                        {
                          item.roomPictures.map((url) => {
                            return (
                              <Image style={{ height: 200, width: Dimensions.get('window').width - 90, borderRadius: 10, marginRight: 10 }} source={{ uri: url }} key={url} />
                            )
                          })
                        }
                      </ScrollView>
                    </View>
                    <TouchableOpacity onPress={() => { roomClick(item._id); }}>
                      <View style={{ display: "flex", gap: 5 }} >
                        {(item.flat === true) ? <Text style={styles.topDetailBox}>Floor</Text> : null}
                        {(item.apartment === true) ? <Text style={styles.topDetailBox}>Apartment</Text> : null}
                        <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }} ><FontAwesome6 name="location-dot" style={{ fontSize: 15 }} /> {item.address}</Text>
                        <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 15 }}>{"Rs." + " " + item.price + "/Month"}</Text>
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                          {(item.bathRoom === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="bath" style={{ fontSize: 15 }} /> Bathroom</Text> : null}
                          {(item.kitchen === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="kitchen-set" style={{ fontSize: 15 }} /> Kitchen</Text> : null}
                          {(item.parking === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="car-side" style={{ fontSize: 15 }} /> Parking</Text> : null}
                        </View>
                        <View></View>
                        <View></View>
                        <TouchableOpacity style={{ backgroundColor: "white", padding: 8, borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => { EditRoom(item._id) }}>
                          <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>EDIT ROOM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "red", padding: 8, borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => { deleteRoom(item._id) }}>
                          <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>DELETE ROOM</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
            :
            <View>
              <View style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column", height: 380 }}>
                <Image style={{ height: 250, width: "100%", borderRadius: 10, }} source={require("../assets/images/not_found.png")} />
                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                  <FontAwesome6 name="triangle-exclamation" style={{ fontSize: 15, color: "white" }} />
                  <Text style={{ color: "white", fontFamily: "Poppins-Light", }}>Seems like you did not hosted any room!</Text>
                </View>
              </View>
            </View>
          }
        </View>
      </ScrollView>
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
  },
  infoWrappper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#191919",
    justifyContent: "space-around",
    padding: 10,
    borderRadius: 10,
    position: "relative"
  },
  hostRoomButtonWrapper: {
    backgroundColor: "white",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "flex-start"
  },
  roomWrapper: {
    backgroundColor: "#191919",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    gap: 10
  },
  topDetailBox: {
    color: "#88ff00",
    fontFamily: "Poppins-Light",
    borderWidth: 1,
    borderColor: "#88ff00",
    alignSelf: "flex-start",
    paddingTop: 4,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  bottomDetailBox: {
    color: "white",
    fontFamily: "Poppins-Light",
    borderWidth: 1,
    borderColor: "white",
    alignSelf: "flex-start",
    paddingTop: 4,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
})