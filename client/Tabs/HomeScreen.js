import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons/faSliders'

const HomeScreen = () => {

  let [data, setData] = useState("")

  useEffect(() => {
    let getData = async () => {
      let res = await fetch("http://192.168.1.64:8000/get-rooms", "GET");
      let data = await res.json();

      setData(data)
    }

    setInterval(()=>{
      getData();
    }, 1000)
  })


  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput style={styles.input} placeholder='Provide address' placeholderTextColor={"white"} />
        <TouchableOpacity style={{ backgroundColor: "white", width: "15%", borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FontAwesomeIcon icon={faSliders} style={{ color: "black" }} />
        </TouchableOpacity>
      </View>
      {data ?
        <ScrollView>
          <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 20, marginBottom: 10 }}>AVAILABLE ROOMS</Text>
          {data.map((item) => {
            return (
              <View style={styles.roomWrapper}>
                <ScrollView>

                  {
                    item.roomPictures.map((e) => {
                      <Image
                        key={item._id}
                        style={{ width: "100%", height: "50%" }}
                        resizeMode="streach"
                        source={{ uri: e }}
                      />
                    })

                  }
                </ScrollView>
                <View style={{display: "flex", gap: 10}}>
                  {(item.flat === true) ? <Text style={{ color: "#88ff00", fontFamily: "Poppins-Light", borderWidth: 1, borderColor: "#88ff00", alignSelf: "flex-start", padding: 5, borderRadius: 10, paddingLeft: 10, paddingRight: 10}}>Floor</Text> : null}
                  {(item.apartment === true) ? <Text style={{ color: "white" }}>Apartment</Text> : null}
                  <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 18 }} key={item._id}>{item.address}</Text>
                  <Text style={{ color: "white", fontFamily: "POppins-semiBold", fontSize: 18 }}>{"RS" + " " + item.price}</Text>
                  <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                    {(item.bathRoom === true) ? <Text style={{ color: "white", fontFamily: "Poppins-Light", borderWidth: 1, borderColor: "white", alignSelf: "flex-start", padding: 5, borderRadius: 10, paddingLeft: 10, paddingRight: 10 }}>Bathroom</Text> : null}
                    {(item.kitchen === true) ? <Text style={{ color: "white", fontFamily: "Poppins-Light", borderWidth: 1, borderColor: "white", alignSelf: "flex-start", padding: 5, borderRadius: 10, paddingLeft: 10, paddingRight: 10 }}>Kitchen</Text> : null}
                    {(item.parking === true) ? <Text style={{ color: "white", fontFamily: "Poppins-Light", borderWidth: 1, borderColor: "white", alignSelf: "flex-start", padding: 5, borderRadius: 10, paddingLeft: 10, paddingRight: 10 }}>Parking</Text> : null}
                  </View>
                </View>
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
    borderColor: "#5C5C5C",
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
    backgroundColor: "#202020",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    gap: 10
  }
})