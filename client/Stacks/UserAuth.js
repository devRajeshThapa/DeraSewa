import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '@env'

const UserAuth = ({ navigation }) => {

    let navTitle = "USER VARIFY"

    let [password, setPassword] = useState("");
    let [error, setError] = useState("");

    let verifUser = async () => {

        let userID = await AsyncStorage.getItem('userID');
        let phoneNumber = await AsyncStorage.getItem('phoneNumber')

        let data = {
            phoneNumber: phoneNumber
        }

        await fetch(`${IP_ADDRESS}/verify-user/${phoneNumber}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(async (data) => {
                if (data.success) {
                    await AsyncStorage.removeItem('userID');
                    await AsyncStorage.removeItem('validUser')
                    navigation.navigate("Tab")
                } else {
                    setError("");
                    setError(data.error)
                }
            })
            .catch(() => { console.log("Something went wrong") })
    }

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.navTitle}>{navTitle}</Text>
            </View>
            <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 18 }}>Please enter the verification code</Text>
            {error && <View style={styles.errorWrapper}><Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 15 }}>{error}</Text></View>}
            <TextInput style={styles.input} placeholder='Password' placeholderTextColor={"white"} onChangeText={(value) => { setPassword(value); setError("") }} />
            <TouchableOpacity onPress={() => { verifyUser() }}>
                <View style={styles.registerButton}>
                    <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>VERIFY</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default UserAuth;

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
        borderColor: "#5C5C5C",
        height: 60,
        color: "white",
        padding: 10,
        fontFamily: "Poppins-Light"
    },
    registerButton: {
        backgroundColor: "white",
        padding: 18,
        display: "flex",
        alignItems: "center",
        borderRadius: 10
    }
})