import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS, SERVER_PORT } from '@env'

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ForgotPass = ({ navigation }) => {

    let navTitle = "CHANGE PASSWORD"

    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    let [passHidden, setPassHidden] = useState(true);
    let [email, setEmail] = useState("")

    let changePass = async () => {

        let data = {
            password: password,
        }

        await fetch(`${IP_ADDRESS}:${SERVER_PORT}/forgot-pass/${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(async (data) => {
                if (data.success) {
                    navigation.navigate("ForgotPassVerification", {
                        email,
                        password
                    })
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
            {error && <View style={styles.errorWrapper}><Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 15 }}>{error}</Text></View>}
            <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 15 }}>※ Enter your email</Text>
            <TextInput style={styles.input} placeholder='Email' placeholderTextColor="white" onChangeText={(value) => { setEmail(value); setError("") }} autoCorrect={false} />
            <Text style={{ color: "white", fontFamily: "Poppins-SemiBold", fontSize: 15 }}>※ Enter your new password</Text>
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
            <TouchableOpacity onPress={() => { changePass() }}>
                <View style={styles.registerButton}>
                    <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>CHANGE PASSWORD</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPass;

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