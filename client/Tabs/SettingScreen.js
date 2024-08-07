import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

const SettingScreen = ({navigation}) => {

  let list = [
    {
      id: 1,
      title: "Account Information",
      link: "Account"
    },
    {
      id: 5,
      title: "About Us",
      link: "About contact"
    },
    {
      id: 6,
      title: "Policies",
      link: "privacy policy, cookie, session"
    },
    {
      id: 7,
      title: "Payment and Referral system",
      link: "privacy policy, cookie, session"
    },
    {
      id: 8,
      title: "Referral Code",
      link: "Referral"
    },
    {
      id: 10,
      title: "FAQ's",
      link: "FAQ"
    },
    {
      id: 12,
      title: "Report",
      link: ""
    },
    {
      id: 14,
      title: "Rate Us",
      link: "Rate"
    }
  ]

  return (
    <View style={styles.container}>
      {list.map((item)=>{
        <View>
          <Text style={{color: "white"}}>{item.title}</Text>
        </View>
      })}
      <FlatList
        data={list}
        renderItem={({item}) => <TouchableOpacity style={styles.itemWrapper} onPress={()=>{navigation.navigate(item.link)}} ><Text style={{color: "white", fontFamily: "Poppins-Bold", fontSize: 15}}>{item.title}</Text></TouchableOpacity> }
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default SettingScreen;

let styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    padding: 10,
    display: "flex",
    gap: 20
  },
  itemWrapper: {
    backgroundColor: "#191919",
    width: "100%",
    padding: 13,
    marginBottom: 10,
    borderRadius: 10,
  }
})