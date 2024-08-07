import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IP_ADDRESS } from '@env'

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ProfileScreen = ({ navigation }) => {

  let deleteRoom = async(roomID)=>{
    await AsyncStorage.removeItem('roomID')
    await AsyncStorage.setItem('roomID', roomID);
    navigation.navigate("DeleteRoom")
  }

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [profilePicture, setProfilePicture] = useState("");
  let [data, setData] = useState("");
  let [deraCoin, setDeraCoin] = useState("")

  useEffect(() => {
    let fetchData = async () => {
      let userID = await AsyncStorage.getItem('userID');
      let response = await fetch(`${IP_ADDRESS}/get-user/${userID}`);
      let data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setProfilePicture(data.profilePicture);
      setDeraCoin(data.deraCoin)
    }

    fetchData();

  }, [])

  useEffect(() => {
    let getData = async () => {
      let hosterID = await AsyncStorage.getItem('userID')
      let res = await fetch(`${IP_ADDRESS}/get-hoster-rooms/${hosterID}`, "GET");
      let data = await res.json();
      setData(data);
    }

    getData();
  }, [])

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
            {profilePicture ? <Image style={{ width: 100, height: 100, borderRadius: 100, borderColor: "#88ff00", borderWidth: 1 }} source={{ uri: profilePicture }} /> : <Text style={{ color: "white" }}>Fetching profile picture...</Text>}
            <View>
              {(firstName && lastName) ? <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 20 }}>{firstName + " " + lastName}</Text> : <Text style={{ color: "white" }}>Fetching user name...</Text>}
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <FontAwesome6 name="coins" style={{ fontSize: 15, color: "white" }} />
                <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", }}>{deraCoin}</Text>
              </View>
              <TouchableOpacity onPress={() => { openAccount() }}>
                <Text style={{ fontFamily: "Poppins-SemiBold", color: "#03a9fc", textDecorationLine: "underline" }}>Account Information</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.hostRoomButtonWrapper} onPress={() => { navigation.navigate("HostRoom") }}>
            <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>HOST ROOM</Text>
          </TouchableOpacity>
          <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 20, marginBottom: 10 }}>ROOMS THAT YOU HAVE HOSTED</Text>
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
                              <Image style={{ height: 200, width: Dimensions.get('window').width - 90, borderRadius: 10, marginRight: 10 }} source={{ uri: url }} />
                            )
                          })
                        }
                      </ScrollView>
                    </View>
                    <TouchableOpacity onPress={() => { roomClick(item._id); }}>
                      <View style={{ display: "flex", gap: 5 }} >
                        {(item.flat === true) ? <Text style={styles.topDetailBox}>Floor</Text> : null}
                        {(item.apartment === true) ? <Text style={styles.topDetailBox}>Apartment</Text> : null}
                        <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 18 }} ><FontAwesome6 name="location-dot" style={{ fontSize: 16 }} /> {item.address}</Text>
                        <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 15 }}><FontAwesome6 name="money-bill-wave" style={{ fontSize: 20 }} /> {"RS" + " " + item.price}</Text>
                        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                          {(item.bathRoom === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="bath" style={{ fontSize: 15 }} /> Bathroom</Text> : null}
                          {(item.kitchen === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="kitchen-set" style={{ fontSize: 15 }} /> Kitchen</Text> : null}
                          {(item.parking === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="car-side" style={{ fontSize: 15 }} /> Parking</Text> : null}
                        </View>
                        <View></View>
                        <View></View>
                        <TouchableOpacity style={{ backgroundColor: "#88ff00", padding: 10, borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>EDIT ROOM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "red", padding: 10, borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }} onPress={() => { deleteRoom(item._id) }}>
                          <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>DELETE ROOM</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
            :
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <FontAwesome6 name="triangle-exclamation" style={{ fontSize: 15, color: "white" }} />
              <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", }}>Seems like you did not hosted any room!</Text>
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
  },
  roomWrapper: {
    backgroundColor: "#191919",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    gap: 10
  },
  topDetailBox: {
    color: "#88ff00",
    fontFamily: "Poppins-Light",
    borderWidth: 1, borderColor: "#88ff00",
    alignSelf: "flex-start",
    padding: 5,
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
    padding: 5,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
})