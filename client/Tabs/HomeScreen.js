import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IP_ADDRESS, SERVER_PORT } from '@env'
import { Dimensions } from 'react-native';

import { faSliders } from '@fortawesome/free-solid-svg-icons/faSliders'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const HomeScreen = ({ navigation }) => {

  let [filterValue, setFilterValue] = useState("")
  let [filteredData, setFilteredData] = useState("")
  let [flat, setFlat] = useState(false);
  let [apartment, setApartment] = useState(false)
  let [filterBox, setFilterBox] = useState(false)

  useEffect(() => {
    let getData = async () => {
      let userID = await AsyncStorage.getItem("userID")
      let res = await fetch(`${IP_ADDRESS}:${SERVER_PORT}/get-rooms/${userID}`, "GET");
      let data = await res.json();
      let filteredDataArray = await data.filter((item) => {
        return item.address.toUpperCase().includes(filterValue.toUpperCase());
      });

      setFilteredData(filteredDataArray)
    }

    getData();
  }, [filteredData])

  let roomClick = async (roomID) => {
    await AsyncStorage.removeItem('roomID')
    await AsyncStorage.setItem('roomID', roomID);
    navigation.navigate("Room");
  }


  return (
    <View style={styles.container}>

      <View style={styles.searchSection}>
        <TextInput style={styles.input} placeholder='Search room via address' placeholderTextColor={"white"} onChangeText={(value) => { setFilterValue(value); }} />
      </View>
      {(filteredData.length > 0) ?
        <ScrollView>
          <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 18, marginBottom: 10 }}>※ AVAILABLE ROOMS</Text>
          {filteredData.map((item) => {
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
                    {(item.flat === true) ? <Text style={styles.topDetailBox}>Flat</Text> : null}
                    {(item.apartment === true) ? <Text style={styles.topDetailBox}>Apartment</Text> : null}
                    <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }} ><FontAwesome6 name="location-dot" style={{ fontSize: 16 }} /> {item.address}</Text>
                    <Text style={{ color: "white", fontFamily: "Poppins-Regular", fontSize: 15 }}>{"Rs." + " " + item.price + "/Month"}</Text>
                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                      {(item.bathRoom === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="bath" style={{ fontSize: 15 }} /> Bathroom</Text> : null}
                      {(item.kitchen === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="kitchen-set" style={{ fontSize: 15 }} /> Kitchen</Text> : null}
                      {(item.parking === true) ? <Text style={styles.bottomDetailBox}><FontAwesome6 name="car-side" style={{ fontSize: 15 }} /> Parking</Text> : null}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
        :
        <View>
          <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 18, marginBottom: 10 }}>※ AVAILABLE ROOMS</Text>
          <View style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column", height: 400 }}>
            <Image style={{ height: 250, width: "100%", borderRadius: 10, }} source={require("../assets/images/not_found.png")} />
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <FontAwesome6 name="triangle-exclamation" style={{ fontSize: 15, color: "white" }} />
              <Text style={{ color: "white", fontFamily: "Poppins-Light", }}>No rooms are available!</Text>
            </View>
          </View>
        </View>
      }
    </View>
  )
}

export default HomeScreen

let styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    display: "flex",
    gap: 20,
    felx: 1,
    position: "relative"
  },
  input: {
    backgroundColor: "transparent",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#303030",
    height: 52,
    color: "white",
    padding: 10,
    fontFamily: "Poppins-Light"
  },
  searchSection: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
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
    paddingRight: 10,
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
  filterBox: {
    position: "absolute",
    backgroundColor: "#191919",
    width: "100%",
    zIndex: 10,
    alignSelf: "center",
    top: 65,
    borderRadius: 10,
    padding: 10,
    display: "flex",
    gap: 10,
    borderWidth: 1,
    borderColor: "#909090"
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
})