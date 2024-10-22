import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { IP_ADDRESS, SERVER_PORT } from '@env';

import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const RegisterScreen = ({ navigation }) => {

    let navTitle = "REGISTER";

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    let [passHidden, setPassHidden] = useState(true);

    let uploadForm = async () => {

        let Data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
        }

        await fetch(`${IP_ADDRESS}/register-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
        })
            .then(res => res.json())
            .then(async (data) => {
                if (data.success) {
                    await navigation.navigate("RegisterVerification", {
                        Data
                    });
                } else {
                    setError("");
                    setError(data.error);
                }
            })
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
                            <TextInput style={styles.nameInput} placeholder="First Name" placeholderTextColor="white" onChangeText={(value) => { setFirstName(value); setError("") }} autoCorrect={false} />
                            <TextInput style={styles.nameInput} placeholder="Last Name" placeholderTextColor="white" onChangeText={(value) => { setLastName(value); setError("") }} autoCorrect={false} />
                        </View>
                        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="white" onChangeText={(value) => { setEmail(value); setError("") }} autoCorrect={false} />
                        <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="white" onChangeText={(value) => { setPhoneNumber(value); setError("") }} keyboardType='numeric' />
                        <View style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                            {
                                passHidden ?
                                    <TouchableOpacity onPress={() => { setPassHidden(false) }} style={{ position: "absolute", alignSelf: "flex-end", paddingRight: 15, zIndex: 4 }} >
                                        <FontAwesome6 name="eye-slash" style={{ fontSize: 15, color: "white" }} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => { setPassHidden(true) }} style={{ position: "absolute", alignSelf: "flex-end", paddingRight: 15, zIndex: 4 }} >
                                        <FontAwesome6 name="eye" style={{ fontSize: 15, color: "white" }} />
                                    </TouchableOpacity>
                            }
                            {
                                passHidden ?
                                    <TextInput style={styles.input} placeholder='Password' value={password} placeholderTextColor="white" secureTextEntry onChangeText={(value) => { setPassword(value); setError("") }} autoCorrect={false} />
                                    :
                                    <TextInput style={styles.input} placeholder='Password' value={password} placeholderTextColor="white" onChangeText={(value) => { setPassword(value); setError("") }} autoCorrect={false} />
                            }
                        </View>
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