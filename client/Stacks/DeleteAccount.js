import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '@env'

const DeleteAccount = ({ navigation }) => {

    let navTitle = "DELETE ACCOUNT"

    let [password, setPassword] = useState("");
    let [error, setError] = useState("");

    let deleteUser = async () => {

        let userID = await AsyncStorage.getItem('userID');

        let data = {
            password: password
        }

        await fetch(`${IP_ADDRESS}/delete-user/${userID}`, {
            method: 'DELETE',
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
                    navigation.navigate("Login")
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
            <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 15 }}>⫸ Please enter your password to delete your account</Text>
            {error && <View style={styles.errorWrapper}><Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 15 }}>{error}</Text></View>}
            <TextInput style={styles.input} placeholder='Password' placeholderTextColor={"white"} onChangeText={(value) => { setPassword(value); setError("") }} />
            <TouchableOpacity onPress={() => { deleteUser() }}>
                <View style={styles.registerButton}>
                    <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>DELETE</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default DeleteAccount;

let styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        padding: 10,
        display: "flex",
        felx: 1,
        gap: 10
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
        borderColor: "#5C5C5C",
        height: 52,
        color: "white",
        padding: 10,
        fontFamily: "Poppins-Light"
    },
    registerButton: {
        backgroundColor: "white",
        padding: 12,
        display: "flex",
        alignItems: "center",
        borderRadius: 10
    }
})