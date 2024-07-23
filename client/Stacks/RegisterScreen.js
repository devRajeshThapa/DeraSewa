import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus'

const RegisterScreen = (props) => {

    let navTitle = "REGISTER";

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [password, setPassword] = useState("");
    let [profilePicture, setProfilePicture] = useState("");

    let openGallery = async ()=>{
        let result = await launchImageLibrary();
        setProfilePicture(result?.assets[0]?.uri)
        console.log(profilePicture)
    }


    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.navTitle}>{navTitle}</Text>
            </View>
            <View>
                <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 25 }}>Hi, Welcome to DeraSewa</Text>
                <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 15 }}>Please Register your Account to continue</Text>
            </View>

            <View style={styles.contentWrapper}>
                <View style={styles.nameInputFeild}>
                    <TextInput style={styles.nameInput} placeholder="First Name" placeholderTextColor="white" onChangeText={(value)=>{ setFirstName(value) }}/>
                    <TextInput style={styles.nameInput} placeholder="Last Name" placeholderTextColor="white" onChangeText={(value)=>{ setLastName(value) }}/>
                </View>
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="white" onChangeText={(value)=>{ setEmail(value) }}/>
                <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="white" onChangeText={(value)=>{ setPhoneNumber(value) }}/>
                <TextInput style={styles.input} placeholder='Password' placeholderTextColor="white" secureTextEntry onChangeText={(value)=>{ setPassword(value) }}/>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: 10}} onPress={openGallery}>
                    <FontAwesomeIcon icon={faCirclePlus} style={{ color: "white" }} />
                    <Text style={{ color: "white", fontFamily: "Poppins-SemiBold" }}>Add your profile picture</Text>
                </View>
                <View style={styles.loginButton}>
                    <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>LOGIN</Text>
                </View>
                <View style={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <Text style={{ color: "red", fontFamily: "Poppins-Light" }}>Forgot Password?</Text>
                    <Text style={{ color: "white", fontFamily: "Poppins-Light"}}>Already have Account? <Text style={{fontStyle: "italic", textDecorationLine: "underline" }} onPress={() => { props.navigation.navigate("Login") }}>Login</Text></Text>
                </View>
            </View>
        </View>
    )
}

export default RegisterScreen;

let styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        padding: 10,
        display: "flex",
        gap: 20
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
        height: 50,
        color: "white",
        padding: 10,
        fontFamily: "Poppins-Light"
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
        backgroundColor: "transparent",
        width: "48%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#5C5C5C",
        height: 50,
        color: "white",
        padding: 10,
        fontFamily: "Poppins-Light"
    },
    loginButton: {
        backgroundColor: "white",
        padding: 18,
        display: "flex",
        alignItems: "center",
        borderRadius: 10
    }
});