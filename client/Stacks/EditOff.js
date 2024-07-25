import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react';

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
            let response = await fetch(`http://192.168.1.66:8000/get-user/${userID}`);
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
            {profilePicture ? <Image style={{ width: 150, height: 150, borderWidth: 1, borderRadius: 100, borderColor: "#202020", borderWidth: 5 }} source={{ uri: profilePicture }} /> : <Text style={{color: "white"}}>Loading...</Text>}
            <View style={styles.nameInputFeild}>
                <TextInput style={styles.nameInput} placeholder="First Name" placeholderTextColor="white" value={`First Name: ${firstName}`} readOnly />
                <TextInput style={styles.nameInput} placeholder="Last Name" placeholderTextColor="white" value={`Last Name: ${lastName}`} readOnly />
            </View>
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="white" value={`Email: ${email}`} readOnly/>
            <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="white" value={`Phone Number: ${phoneNumber}`} readOnly />
            <TextInput style={styles.input} placeholder='Password' placeholderTextColor="white" value={`Password: ${password}`} readOnly />
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
        backgroundColor: "#202020",
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#5C5C5C",
        height: 60,
        color: "white",
        padding: 10,
        fontFamily: "Poppins-Bold"
    },
    nameInputFeild: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        width: "100%",
        alignItems: "center"
    },
    nameInput: {
        backgroundColor: "#202020",
        width: "48%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#5C5C5C",
        height: 60,
        color: "white",
        padding: 10,
        fontFamily: "Poppins-Bold"
    },
    button: {
        backgroundColor: "white",
        padding: 18,
        display: "flex",
        alignItems: "center",
        borderRadius: 10
    }
})