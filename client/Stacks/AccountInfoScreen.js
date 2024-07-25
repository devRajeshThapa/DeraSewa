import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';

import EditOff from './EditOff';
import EditOn from './EditOn';

const AccountInfoScreen = ({navigation}) => {

  let navTitle = "ACCOUNT INFO";

  let [edit, setEdit] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.navTitle}>{navTitle}</Text>
      </View>
      {!edit ? <EditOff /> : <EditOn />}
      {!edit ?
        <View style={{ display: "flex", gap: 10 }}>
          <TouchableOpacity onPress={() => { edit ? setEdit("") : setEdit("true") }}>
            <View style={styles.button}>
              <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>UPDATE INFO</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("DeleteAccount")}}>
            <View style={styles.deleteButton}>
              <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 15 }}>DELETE ACCOUNT</Text>
            </View>
          </TouchableOpacity>
        </View>
        :
        null
      }
    </View>
  )
}

export default AccountInfoScreen;

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
  button: {
    backgroundColor: "white",
    padding: 18,
    display: "flex",
    alignItems: "center",
    borderRadius: 10
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 18,
    display: "flex",
    alignItems: "center",
    borderRadius: 10
  },
})