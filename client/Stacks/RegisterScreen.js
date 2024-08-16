import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { IP_ADDRESS, SERVER_PORT } from '@env';

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { faImage } from '@fortawesome/free-solid-svg-icons/faImage'

const RegisterScreen = ({ navigation }) => {

    let navTitle = "REGISTER";

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [password, setPassword] = useState("");
    let [profilePicture, setProfilePicture] = useState("");
    let [error, setError] = useState("");

    let openGallery = async () => {
        await ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true,
            mediaType: 'photo'
        }).then(image => {

            let data = `data:${image.mime};base64,${image.data}`;
            setProfilePicture(data);
        });
    }

    let uploadForm = async () => {

        let data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            profilePicture: profilePicture,
        }

        await fetch(`${IP_ADDRESS}:${SERVER_PORT}/register-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(async (data) => {
                if (data.userID) {
                    await AsyncStorage.removeItem('userID')
                    await AsyncStorage.removeItem('validUser')
                    await AsyncStorage.setItem('userID', data.userID);
                    await AsyncStorage.setItem('validUser', "true");
                    await AsyncStorage.setItem('phoneNumber', phoneNumber);
                } else {
                    setError("");
                    setError(data.error);
                }
            })
            .then(async () => {
                let validUser = await AsyncStorage.getItem('validUser');

                if (validUser === "true") {
                    navigation.navigate("Tab")
                }
            })
            .catch(() => { console.log("Something went wrong") })

    }

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.navTitle}>{navTitle}</Text>
            </View>
            <ScrollView>
                <View style={{ display: "flex", gap: 10 }}>
                    <View>
                        <Text style={{ color: "white", fontFamily: "Poppins-Bold", fontSize: 20 }}>Hi, Welcome to DeraSewa</Text>
                        <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 15 }}>Please register your account to continue</Text>
                    </View>

                    {error && <View style={styles.errorWrapper}><Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 15 }}>{error}</Text></View>}

                    <View style={styles.contentWrapper}>
                        <View style={styles.nameInputFeild}>
                            <TextInput style={styles.nameInput} placeholder="First Name" placeholderTextColor="white" onChangeText={(value) => { setFirstName(value); setError("") }} />
                            <TextInput style={styles.nameInput} placeholder="Last Name" placeholderTextColor="white" onChangeText={(value) => { setLastName(value); setError("") }} />
                        </View>
                        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="white" onChangeText={(value) => { setEmail(value); setError("") }} />
                        <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="white" onChangeText={(value) => { setPhoneNumber(value); setError("") }} />
                        <TextInput style={styles.input} placeholder='Password' placeholderTextColor="white" secureTextEntry onChangeText={(value) => { setPassword(value); setError("") }} />
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }} onPress={() => { openGallery(); setError("") }}>
                            <FontAwesomeIcon icon={faImage} style={{ color: "white" }} />
                            <Text style={{ color: "white", fontFamily: "Poppins-Medium" }}>Add your profile picture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { uploadForm() }}>
                            <View style={styles.registerButton}>
                                <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>REGISTER</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ display: "flex", alignItems: "center", width: "100%" }}>
                            <Text style={{ color: "white", fontFamily: "Poppins-Light" }}>Already have Account? <Text style={{ color: "#88ff00", textDecorationLine: "underline" }} onPress={() => { navigation.navigate("Login") }}>Login</Text></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        borderColor: "#262626",
        height: 52,
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
        borderColor: "#262626",
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
});