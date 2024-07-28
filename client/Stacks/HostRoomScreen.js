import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect, useId } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import HomeScreen from '../Tabs/HomeScreen';
import { IP_ADDRESS } from '@env'

import GetLocation from 'react-native-get-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileScreen from '../Tabs/ProfileScreen';

const HostRoomScreen = ({ navigation }) => {

  let navTitle = "HOST ROOM"


  let [error, setError] = useState("")
  let [localLatitude, setLocalLatitude] = useState("")
  let [localLongitude, setLocalLongitude] = useState("")
  let [roomCoordinate, setRoomCoordinate] = useState("")
  let [address, setAddress] = useState("")
  let [flat, setFlat] = useState(false);
  let [apartment, setApartment] = useState(false);
  let [floorNumber, setFloorNumber] = useState("");
  let [bedRoom, setBedRoom] = useState("");
  let [bathRoom, setBathRoom] = useState(false);
  let [kitchen, setKitchen] = useState(false);
  let [parking, setParking] = useState(false);
  let [price, setPrice] = useState("");
  let [discription, setDiscription] = useState("");
  let [roomPictures, setRoomPictures] = useState("");

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  })
    .then(location => {

      setLocalLatitude(location.latitude)
      setLocalLongitude(location.longitude)
    })
    .catch(error => {
      const { code, message } = error;
      //console.warn(code, message);
    })

  let imagesURl = [];

  let openGallery = async () => {
    await ImagePicker.openPicker({
      width: 600,
      height: 600,
      multiple: true,
      cropping: true,
      includeBase64: true,
      mediaType: 'photo'
    }).then(res => {

      res.map((image) => {
        let data = `data:${image.mime};base64,${image.data}`;
        imagesURl.push(data);
      })
      setRoomPictures(imagesURl);
    });
  }

  let hostRoom = async () => {

    let userID = await AsyncStorage.getItem('userID');

    let data = {
      userID: userID,
      roomCoordinate: roomCoordinate,
      address: address,
      flat: flat,
      apartment: apartment,
      floorNumber: floorNumber,
      bedRoom: bedRoom,
      bathRoom: bathRoom,
      kitchen: kitchen,
      parking: parking,
      price: price,
      discription: discription,
      roomPictures: roomPictures

    }


    await fetch(`${IP_ADDRESS}/host-room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setError("")
          setError(data.success)
        } else {
          setError("")
          setError(data.error)
        }
      })
  }

  let mapStyle = {
    borderRadius: 10
  }


  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.navTitle}>{navTitle}</Text>
      </View>

      {error && <View style={styles.errorWrapper}><Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 15 }}>{error}</Text></View>}

      <ScrollView>
        <View style={{ display: "flex", gap: 20, paddingTop: 10, paddingBottom: 10 }}>
          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 18 }}><FontAwesome6 name="square-caret-right" style={{fontSize: 20}} /> Drag and drop the mark</Text>
            <View style={styles.mapWrapper}>
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                customMapStyle={mapStyle}
                region={{
                  latitude: Number(localLatitude),
                  longitude: Number(localLongitude),
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              >
                <Marker
                  draggable
                  coordinate={
                    {
                      latitude: Number(localLatitude),
                      longitude: Number(localLongitude)
                    }
                  }
                  onDragEnd={(e) => { setRoomCoordinate([e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude]); setError("") }}
                  title={"Property Location"}
                />
              </MapView>
            </View>
          </View>
          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 18 }}><FontAwesome6 name="square-caret-right" style={{fontSize: 20}} /> Room address</Text>
            <TextInput style={styles.input} placeholder='Maitidevi, Kathmandu' placeholderTextColor={"white"} onChangeText={(value) => { setAddress(value); setError("") }} />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <TouchableOpacity style={styles.radioOuter} onPress={() => { setFlat(true); setApartment(false); setError("") }} >
                  {flat ? <View style={styles.radioInner}></View> : null}
                </TouchableOpacity>
                <Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 13 }}>Flat</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <TouchableOpacity style={styles.radioOuter} onPress={() => { setApartment(true); setFlat(false); setError("") }}>
                  {apartment ? <View style={styles.radioInner}></View> : null}
                </TouchableOpacity>
                <Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 13 }}>Apartment</Text>
              </View>
            </View>

          </View>
          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 18 }}><FontAwesome6 name="square-caret-right" style={{fontSize: 20}} /> Floor number</Text>
            <TextInput style={styles.input} placeholder='' placeholderTextColor={"white"} onChangeText={(value) => { setFloorNumber(value); setError("") }} />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 18 }}><FontAwesome6 name="square-caret-right" style={{fontSize: 20}} /> Bedroom Number</Text>
            <TextInput style={styles.input} placeholder='' placeholderTextColor={"white"} onChangeText={(value) => { setBedRoom(value); setError("") }} />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 18 }}><FontAwesome6 name="square-caret-right" style={{fontSize: 20}} /> Bathroom</Text>
            <TouchableOpacity style={styles.radioOuter} onPress={() => { bathRoom == true ? setBathRoom(false) : setBathRoom(true); setError("") }} >
              {bathRoom ? <View style={styles.radioInner}></View> : null}
            </TouchableOpacity>
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
          <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 18 }}><FontAwesome6 name="square-caret-right" style={{fontSize: 20}} /> Kitchen</Text>
          <TouchableOpacity style={styles.radioOuter} onPress={() => { kitchen == true ? setKitchen(false) : setKitchen(true); setError("") }} >
            {kitchen ? <View style={styles.radioInner}></View> : null}
          </TouchableOpacity>
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 18 }}><FontAwesome6 name="square-caret-right" style={{fontSize: 20}} /> Parking</Text>
            <TouchableOpacity style={styles.radioOuter} onPress={() => { parking == true ? setParking(false) : setParking(true); setError("") }} >
              {parking ? <View style={styles.radioInner}></View> : null}
            </TouchableOpacity>
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 18 }}><FontAwesome6 name="square-caret-right" style={{fontSize: 20}} /> Price</Text>
            <TextInput style={styles.input} placeholder='' placeholderTextColor={"white"} onChangeText={(value) => { setPrice(value); setError("") }} />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 18 }}><FontAwesome6 name="square-caret-right" style={{fontSize: 20}} /> Discription (Optional)</Text>
            <TextInput style={styles.discriptionInput} placeholder='One of the best cost effective room in Maitidevi, Kathmandu' placeholderTextColor={"white"} multiline autoCorrect={false} onChangeText={(value) => { setDiscription(value) }} />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Medium", fontSize: 18 }}><FontAwesome6 name="square-caret-right" style={{fontSize: 20}} /> Room Pictures</Text>
            <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }} onPress={() => { openGallery(); setError("") }}>
            <FontAwesome6 name="circle-plus" style={{fontSize: 15, color: "white"}} />
              <Text style={{ color: "white", fontFamily: "Poppins-Medium" }}>Open Gallery</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => { hostRoom() }}>
            <View style={styles.hostButton}>
              <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>HOST ROOM</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default HostRoomScreen;

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
    fontSize: 30
  },
  errorWrapper: {
    width: "100%",
    backgroundColor: "red",
    padding: 10,
    maxHeight: 65,
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
    borderColor: "#505050",
    height: 50,
    color: "white",
    padding: 10,
    fontFamily: "Poppins-Light"
  },
  discriptionInput: {
    backgroundColor: "transparent",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#303030",
    height: 100,
    color: "white",
    padding: 10,
    fontFamily: "Poppins-Light",
    textAlignVertical: "top"
  },
  hostButton: {
    backgroundColor: "white",
    padding: 15,
    display: "flex",
    alignItems: "center",
    borderRadius: 10
  },
  radioOuter: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    height: 15,
    width: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    height: "70%",
    width: "70%",
    backgroundColor: "white",
    borderRadius: 100
  },
  mapWrapper: {
    height: 250,
    width: "100%",
    borderRadius: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%"
  },
})