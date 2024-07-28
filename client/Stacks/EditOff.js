import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { IP_ADDRESS } from '@env'

import AsyncStorage from '@react-native-async-storage/async-storage';

const EditOff = () => {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [password, setPassword] = useState("");
    let [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {

        let fetchData = async () => {
            let userID = await AsyncStorage.getItem('userID');
            let response = await fetch(`${IP_ADDRESS}/get-user/${userID}`);
            let data = await response.json();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setPhoneNumber(data.phoneNumber);
            setPassword(data.password);
            setProfilePicture(data.profilePicture);
        }

        fetchData();
    });


    return (
        <View style={styles.contentWrapper}>
            {profilePicture ? <Image style={{ width: 120, height: 120, borderRadius: 100, borderColor: "#202020", borderWidth: 1, alignSelf: "left" }} source={{ uri: profilePicture }} /> : <Text style={{ color: "white" }}>Loading profile picture...</Text>}
            <View style={{display: "flex", gap: 20}}>
            <View style={styles.nameFeild}>
                <View>
                    <Text style={styles.title}>Full Name</Text>
                    <Text style={styles.value}>{firstName + " " + lastName}</Text>
                </View>
            </View>
            <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.value}>{email}</Text>
            </View>
            <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
                <Text style={styles.title}>Phone Number</Text>
                <Text style={styles.value}>{phoneNumber}</Text>
            </View>
            <View style={{backgroundColor: "#202020", padding: 10, borderRadius: 10}}>
                <Text style={styles.title}>Password</Text>
                <Text style={styles.value}>{password}</Text>
            </View>
            </View>
        </View>
    )
}

export default EditOff;

let styles = StyleSheet.create({
    contentWrapper: {
        display: "flex",
        gap: 20,
        width: "100%"
    },
    input: {
        backgroundColor: "#191919",
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#161616",
        height: 60,
        color: "white",
        padding: 10,
        fontFamily: "Poppins-Bold"
    },
    nameFeild: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        width: "100%",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#202020",
        borderRadius: 10
    },
    button: {
        backgroundColor: "white",
        padding: 18,
        display: "flex",
        alignItems: "center",
        borderRadius: 10
    },
    title: {
        color: "white",
        fontFamily: "Poppins-Bold",
        fontSize: 18
    },
    value: {
        color: "white",
        fontFamily: "Poppins-Light",
        fontSize: 15
    }
})