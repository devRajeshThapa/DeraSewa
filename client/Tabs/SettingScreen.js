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
      id: 2,
      title: "About Us",
      link: "AboutUs"
    },
    {
      id: 3,
      title: "Privacy Policy",
      link: "PrivacyPolicy"
    },
    {
      id: 4,
      title: "Terms and Conditions",
      link: "TermCondition"
    },
    {
      id: 5,
      title: "Help and Support",
      link: "HelpSupport"
    },
    {
      id: 6,
      title: "FAQ's",
      link: "FAQ"
    },
    {
      id: 7,
      title: "Rate Us",
      link: ""
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
  },
  itemWrapper: {
    backgroundColor: "#191919",
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  }
})