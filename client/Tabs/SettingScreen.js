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
      title: "Theme",
      link: "Account"
    },
    {
      id: 3,
      title: "Payment",
      link: "Payment"
    },
    {
      id: 4,
      title: "Help and Support",
      link: "HelpSupport"
    },
    {
      id: 5,
      title: "About Us",
      link: "About"
    },
    {
      id: 6,
      title: "Privacy and policy",
      link: "PrivacyPolicy"
    },
    {
      id: 7,
      title: "Terms and Condition",
      link: "TermCondition"
    },
    {
      id: 8,
      title: "Session and Cookeis Policy",
      link: "SessionCookie"
    },
    {
      id: 9,
      title: "Contact Us",
      link: "Contact"
    },
    {
      id: 10,
      title: "FAQ's",
      link: "FAQ"
    },
    {
      id: 11,
      title: "Payment",
      link: "Payment"
    },
    {
      id: 12,
      title: "Report a Bug",
      link: "ReportBug"
    },
    {
      id: 13,
      title: "Report a Scam",
      link: "ReportScam"
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
        renderItem={({item}) => <TouchableOpacity style={styles.itemWrapper} onPress={()=>{navigation.navigate(item.link)}} ><Text style={{color: "white", fontFamily: "Poppins-Bold", fontSize: 18}}>{item.title}</Text></TouchableOpacity> }
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
    backgroundColor: "#202020",
    width: "100%",
    padding: 13,
    marginBottom: 10,
    borderRadius: 10,
  }
})