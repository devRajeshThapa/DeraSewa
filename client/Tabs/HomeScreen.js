import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IP_ADDRESS } from '@env'
import { Dimensions } from 'react-native';

import { faSliders } from '@fortawesome/free-solid-svg-icons/faSliders'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const HomeScreen = ({ navigation }) => {

  let [data, setData] = useState("")

  useEffect(() => {
    let getData = async () => {
      let res = await fetch(`${IP_ADDRESS}/get-rooms`, "GET");
      let data = await res.json();
      setData(data)
    }

    setInterval(() => {
      getData();
    }, 1000)
  }, [])

  let roomClick = async (roomID) => {
    await AsyncStorage.setItem('roomID', roomID);
    navigation.navigate("Room");
  }


  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput style={styles.input} placeholder='Provide address' placeholderTextColor={"white"} />
        <TouchableOpacity style={{ backgroundColor: "white", width: "15%", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FontAwesome6 name="sliders" style={{fontSize: 22, color: "black"}} />
        </TouchableOpacity>
      </View>
      {data ?
        <ScrollView>
          <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 20, marginBottom: 10 }}>AVAILABLE ROOMS</Text>
          {data.map((item) => {
            return (
              <View style={styles.roomWrapper} key={item._id}>
                <ScrollView horizontal={true} style={{ borderRadius: 10, display: "flex", gap: 10 }}>
                  {
                    item.roomPictures.map((url) => {
                      return (
                        <Image style={{ height: 200, width: Dimensions.get('window').width - 90, borderRadius: 10, marginRight: 10 }} source={{ uri: url }} />
                      )
                    })
                  }
                </ScrollView>
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
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
        :
        null
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
    felx: 1
  },
  input: {
    backgroundColor: "transparent",
    width: "83%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#303030",
    height: 60,
    color: "white",
    padding: 10,
    fontFamily: "Poppins-Light"
  },
  searchSection: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
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