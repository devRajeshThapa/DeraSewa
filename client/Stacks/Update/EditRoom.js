import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect, useId } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { IP_ADDRESS, SERVER_PORT } from '@env'

import GetLocation from 'react-native-get-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditRoom = ({ navigation }) => {

  let navTitle = "EDIT ROOM INFO"


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
  let [description, setDescription] = useState("");
  let [roomPictures, setRoomPictures] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("")

  useEffect(()=>{

    let getData = async () => {
        let roomID = await AsyncStorage.getItem('roomID')
        let response = await fetch(`https://derasewa.onrender.com/get-room/${roomID}`, "GET");
        let data = await response.json();
        
        setLocalLatitude(data.roomCoordinate[0])
        setLocalLongitude(data.roomCoordinate[1])
        setRoomCoordinate(data.roomCoordinate);
        setAddress(data.address);
        setFloorNumber(data.floorNumber);
        setBedRoom(data.bedRoom);
        setPrice(data.price)
        setDescription(data.description);
        setRoomPictures(data.roomPictures);
        setPhoneNumber(data.phoneNumber)

        if(data.flat === true){
            setFlat(true);
        }else{
            setApartment(true);
        }

        if(data.bathRoom){
            setBathRoom(true);
        }
        if(data.kitchen){
            setKitchen(true);
        }
        if(data.parking){
            setParking(true);
        }
      }
  
      getData();

  }, [])

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

  let EditRoom = async () => {

    let userID = await AsyncStorage.getItem('userID');
    let roomID = await AsyncStorage.getItem('roomID');

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
      description: description,
      roomPictures: roomPictures,
      phoneNumber: phoneNumber
    }


    await fetch(`https://derasewa.onrender.com/edit-room/${roomID}`, {
      method: 'PATCH',
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
            <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}><FontAwesome6 name="map-location-dot" style={{fontSize: 20}} /> Drag and drop the mark</Text>
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
            <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}><FontAwesome6 name="location-dot" style={{fontSize: 20}} /> Room address</Text>
            <TextInput style={styles.input} placeholder='e.g: Maitidevi, Kathmandu' placeholderTextColor={"white"} value={address} onChangeText={(value) => { setAddress(value); setError("") }} autoCorrect={false} />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
              <View style={{ display: "flex", flexDirection: "row", gap: 5, justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", gap: 5, alignItems: "center" }}>
                <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15, }}>※ Flat</Text>
                <TouchableOpacity style={styles.radioOuter} onPress={() => { setFlat(true); setApartment(false); setError("") }} >
                  {flat ? <View style={styles.radioInner}></View> : null}
                </TouchableOpacity>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 5, justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", gap: 5, alignItems: "center" }}>
                <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}>※ Apartment</Text>
                <TouchableOpacity style={styles.radioOuter} onPress={() => { setApartment(true); setFlat(false); setError("") }}>
                  {apartment ? <View style={styles.radioInner}></View> : null}
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}>※ Floor number</Text>
            <TextInput style={styles.input} placeholder='e.g: 3' placeholderTextColor={"white"} value={`${floorNumber}`} onChangeText={(value) => { setFloorNumber(value); setError("") }} keyboardType='numeric'  />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}>※ Number of bedroom</Text>
            <TextInput style={styles.input} placeholder='e.g: 1' placeholderTextColor={"white"} value={`${bedRoom}`} onChangeText={(value) => { setBedRoom(value); setError("") }} keyboardType='numeric'  />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10, display: "flex", flexDirection: "row", gap: 5, alignItems: "center"}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}><FontAwesome6 name="bath" style={{fontSize: 20}} /> Bathroom</Text>
            <TouchableOpacity style={styles.radioOuter} onPress={() => { bathRoom == true ? setBathRoom(false) : setBathRoom(true); setError("") }} >
              {bathRoom ? <View style={styles.radioInner}></View> : null}
            </TouchableOpacity>
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10, display: "flex", flexDirection: "row", gap: 5, alignItems: "center"}}>
          <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}><FontAwesome6 name="kitchen-set" style={{fontSize: 20}} /> Kitchen</Text>
          <TouchableOpacity style={styles.radioOuter} onPress={() => { kitchen == true ? setKitchen(false) : setKitchen(true); setError("") }} >
            {kitchen ? <View style={styles.radioInner}></View> : null}
          </TouchableOpacity>
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10, display: "flex", flexDirection: "row", gap: 5, alignItems: "center"}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}><FontAwesome6 name="car-side" style={{fontSize: 20}} /> Parking</Text>
            <TouchableOpacity style={styles.radioOuter} onPress={() => { parking == true ? setParking(false) : setParking(true); setError("") }} >
              {parking ? <View style={styles.radioInner}></View> : null}
            </TouchableOpacity>
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}>※ Price (NEPALI RUPEES PER MONTH )</Text>
            <TextInput style={styles.input} placeholder='e.g: 20000' placeholderTextColor={"white"} value={price} onChangeText={(value) => { setPrice(value); setError("") }} keyboardType='numeric'  />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}>※ Phone Number</Text>
            <TextInput style={styles.input} placeholder='' placeholderTextColor={"white"} value={phoneNumber} onChangeText={(value) => { setPhoneNumber(value); setError("") }} keyboardType='numeric'  />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}><FontAwesome6 name="scroll" style={{fontSize: 20}} /> Description (OPTIONAL)</Text>
            <TextInput style={styles.descriptionInput} placeholder={`e.g: "Rooftop terrace," "Elegant wooden floors," or "Modern kitchen." ${"\n"}${"\n"}Highlight unique features to make your space stand out.`} placeholderTextColor={"white"} multiline autoCorrect={false} value={description} onChangeText={(value) => { setDescription(value) }} />
          </View>

          <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
            <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}>※ Room Pictures</Text>
            <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 10, }} onPress={() => { openGallery(); setError("") }}>
            <FontAwesome6 name="image" style={{fontSize: 18, color: "white"}} />
              <Text style={{ color: "white", fontFamily: "Poppins-Medium" }}>Open Gallery</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => { EditRoom() }}>
            <View style={styles.hostButton}>
              <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>SAVE CHANGES</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default EditRoom;

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
  },
  navTitle: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: 25
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
    height: 45,
    color: "white",
    padding: 10,
    fontFamily: "Poppins-Light"
  },
  descriptionInput: {
    backgroundColor: "transparent",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#505050",
    height: 120,
    color: "white",
    padding: 10,
    fontFamily: "Poppins-Light",
    textAlignVertical: "top"
  },
  hostButton: {
    backgroundColor: "white",
    padding: 12,
    display: "flex",
    alignItems: "center",
    borderRadius: 10
  },
  radioOuter: {
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 10,
    height: 13,
    width: 13,
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