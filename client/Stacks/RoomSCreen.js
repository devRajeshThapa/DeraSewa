import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IP_ADDRESS, SERVER_PORT } from '@env'
import { Dimensions, Linking, Alert, Platform } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


const RoomScreen = ({ navigation }) => {

  let navTitle = "ROOM";

  let [data, setData] = useState("")
  let [hosterNumber, setHosterNumber] = useState("")
  let [hosterFirstName, setHosterFirstName] = useState("")
  let [hosterLastName, setHosterLastName] = useState("")
  let [hosterPicture, setHosterPicture] = useState("")

  useEffect(() => {
    let getData = async () => {
      let roomID = await AsyncStorage.getItem('roomID')
      let response = await fetch(`https://derasewa.onrender.com/get-room/${roomID}`, "GET");
      let data = await response.json();
      setData(data)
      setHosterNumber(data.phoneNumber)
      let userResponse = await fetch(`https://derasewa.onrender.com/get-user/${data.userID}`);
      let userData = await userResponse.json();
      setHosterFirstName(userData.firstName)
      setHosterLastName(userData.lastName)
      setHosterPicture(userData.profilePicture)
    }

    getData();
  }, [])


  let callHoster = () => {
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${hosterNumber}`;
    }
    else {
      phoneNumber = `tel:${hosterNumber}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        //if (!supported) {
        //Alert.alert('Phone number is not available');
        //} else {
        //return Linking.openURL(phoneNumber);
        //}
        return Linking.openURL(phoneNumber);
      })
    //.catch(err => console.log(err));
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.navTitle}>{navTitle}</Text>
      </View>
      {data ?
        <ScrollView>
          {
            <View style={{ display: "flex", gap: 10 }} key={data._id}>

              <View style={styles.roomImageWrapper}>
                <ScrollView horizontal={true} style={{ borderRadius: 10, display: "flex", gap: 10 }}>
                  {
                    data.roomPictures.map((url) => {
                      return (
                        <Image style={{ height: 200, width: Dimensions.get('window').width - 90, borderRadius: 10, marginRight: 10 }} source={{ uri: url }} key={url} />
                      )
                    })
                  }
                </ScrollView>
              </View>
              <View style={styles.roomDetailWrapper} >
                {(data.flat === true) ? <Text style={styles.topDetailBox}>Floor</Text> : null}
                {(data.apartment === true) ? <Text style={styles.topDetailBox}>Apartment</Text> : null}
                <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }} ><FontAwesome6 name="location-dot" style={{ fontSize: 15 }} /> {data.address}</Text>
                <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 15 }}>{"Rs." + " " + data.price + "/Month"}</Text>
                <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {(data.bathRoom === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="bath" style={{ fontSize: 15 }} /> Bathroom</Text> : null}
                  {(data.kitchen === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="kitchen-set" style={{ fontSize: 15 }} /> Kitchen</Text> : null}
                  {(data.parking === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="car-side" style={{ fontSize: 15 }} /> Parking</Text> : null}
                </View>
              </View>
              {
                (data.description !== "") ?
                  < View style={styles.roomdescriptionWrapper}>
                    <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}><FontAwesome6 name="scroll" style={{ fontSize: 20 }} /> Description</Text>
                    <Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 15 }}>{data.description}</Text>
                  </View>
                  :
                  null
              }
              <View style={{ padding: 15, backgroundColor: "#202020", borderRadius: 10 }}>
                <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}><FontAwesome6 name="map-location-dot" style={{ fontSize: 20 }} /> Location</Text>
                <View style={styles.mapWrapper}>
                  <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                      latitude: data.roomCoordinate[0],
                      longitude: data.roomCoordinate[1],
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.0121,
                    }}
                  >
                    <Marker
                      coordinate={
                        {
                          latitude: data.roomCoordinate[0],
                          longitude: data.roomCoordinate[1]
                        }
                      }
                      title={"Property Location"}
                    />
                  </MapView>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#202020", padding: 15, borderRadius: 10 }}>
                <Text style={{ color: "white", fontFamily: "Poppins-Bold" }}><FontAwesome6 name="building-user" style={{ fontSize: 15 }} /> Hosted By</Text>
                <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                  {
                    hosterPicture ?
                      <Image style={{ height: 40, width: 40, borderRadius: 50 }} source={{ uri: hosterPicture }} />
                      :
                      <Image style={{ width: 40, height: 40, borderRadius: 50 }} source={require("../assets/images/default_profile.jpg")} />
                  }
                  <Text style={{ color: "white", fontFamily: "Poppins-Light" }}>{hosterFirstName + " " + hosterLastName}</Text>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#202020", padding: 15, borderRadius: 10 }}>
                <Text style={{ color: "white", fontFamily: "Poppins-Bold" }}><FontAwesome6 name="calendar-days" style={{ fontSize: 15 }} /> Property listed on</Text>
                <Text style={{ color: "white", fontFamily: "Poppins-Light" }}>
                  {data.updatedAt.replaceAll("-", "/").split("T")[0]}
                </Text>
              </View>
              <TouchableOpacity style={{ backgroundColor: "white", padding: 12, borderRadius: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }} onPress={() => { callHoster() }}>
                <FontAwesome6 name="phone" style={{ fontSize: 20, color: "black" }} />
                <Text style={{ color: "black", fontFamily: "Poppins-Bold" }}>CALL HOSTER</Text>
              </TouchableOpacity>
            </View>
          }
        </ScrollView>
        :
        <ScrollView>
          {
            <View style={{ display: "flex", gap: 10 }}>

              <View style={styles.roomImageWrapper}>
                <ContentLoader viewBox="0 0" width={"100%"} height={"200"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                  <Rect x="0" y="0" rx="5" ry="5" width="100%" height="200" />
                </ContentLoader>
              </View>
              <View style={styles.roomDetailWrapper} >
                <ContentLoader viewBox="0 0" width={"100%"} height={"25"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                  <Rect x="0" y="0" rx="5" ry="5" width="50" height="20" />
                </ContentLoader>
                <ContentLoader viewBox="0 0" width={"100%"} height={"25"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                  <Rect x="0" y="0" rx="5" ry="5" width="130" height="20" />
                </ContentLoader>
                <ContentLoader viewBox="0 0" width={"100%"} height={"25"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                  <Rect x="0" y="0" rx="5" ry="5" width="100" height="20" />
                </ContentLoader>
                <ContentLoader viewBox="0 0" width={"100%"} height={"25"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                  <Rect x="0" y="0" rx="5" ry="5" width="60" height="20" />
                </ContentLoader>
              </View>

              < View style={styles.roomdescriptionWrapper}>
                <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}><FontAwesome6 name="scroll" style={{ fontSize: 20 }} /> Description</Text>
                <ContentLoader viewBox="0 0" width={"100%"} height={"25"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                  <Rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />
                </ContentLoader>
                <ContentLoader viewBox="0 0" width={"100%"} height={"25"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                  <Rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />
                </ContentLoader>
                <ContentLoader viewBox="0 0" width={"100%"} height={"25"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                  <Rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />
                </ContentLoader>
              </View>
              <View style={{ padding: 15, backgroundColor: "#202020", borderRadius: 10 }}>
                <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}><FontAwesome6 name="map-location-dot" style={{ fontSize: 20 }} /> Location</Text>
                <View style={styles.mapWrapper}>
                  <ContentLoader viewBox="0 0" width={"100%"} height={"250"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                    <Rect x="0" y="0" rx="5" ry="5" width="100%" height="250" />
                  </ContentLoader>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#202020", padding: 15, borderRadius: 10 }}>
                <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
                  {
                    hosterPicture ?
                      <Image style={{ height: 40, width: 40, borderRadius: 50 }} source={{ uri: hosterPicture }} />
                      :
                      <Image style={{ width: 40, height: 40, borderRadius: 50 }} source={require("../assets/images/default_profile.jpg")} />
                  }
                  <ContentLoader viewBox="0 0" width={"100%"} height={"25"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                    <Rect x="0" y="0" rx="5" ry="5" width="75%" height="20" />
                  </ContentLoader>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#202020", padding: 15, borderRadius: 10 }}>
                <ContentLoader viewBox="0 0" width={"100%"} height={"25"} speed={1} backgroundColor='#d9d9d9' foregroundColor='#202020'>
                  <Rect x="0" y="0" rx="5" ry="5" width="100%" height="20" />
                </ContentLoader>
              </View>
              <TouchableOpacity style={{ backgroundColor: "white", padding: 12, borderRadius: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <FontAwesome6 name="phone" style={{ fontSize: 20, color: "black" }} />
                <Text style={{ color: "black", fontFamily: "Poppins-Bold" }}>CALL HOSTER</Text>
              </TouchableOpacity>
            </View>
          }
        </ScrollView>
      }
    </View >
  )
}

export default RoomScreen;

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
    paddingTop: 10,
    paddingBottom: 10
  },
  navTitle: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 25
  },
  roomImageWrapper: {
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
  },
  roomDetailWrapper: {
    display: "flex",
    gap: 5,
    backgroundColor: "#191919",
    padding: 15,
    borderRadius: 10,
  },
  roomdescriptionWrapper: {
    display: "flex",
    gap: 5,
    backgroundColor: "#191919",
    padding: 15,
    borderRadius: 10,
  },
  mapWrapper: {
    height: 250,
    width: "100%",
    objectFit: "cover",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: "center",
    alignSelf: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%"
  },
})