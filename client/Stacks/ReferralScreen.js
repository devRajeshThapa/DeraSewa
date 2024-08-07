import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '@env'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Share from 'react-native-share';

const ReferralScreen = ({ navigation }) => {

    let navTitle = "REFERRAL";

    let [referralCode, setReferralCode] = useState("")
    let [userName, setUserName] = useState("");
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("")

    let generateReferral = async () => {

        let referralCreaterUserID = await AsyncStorage.getItem("userID")
        await fetch(`${IP_ADDRESS}/generate-referral/${referralCreaterUserID}`, "GET")
            .then(res => res.json())
            .then(async (data) => {
                setReferralCode(data.referralCode)
                navigation.navigate("Home");
            })
            .catch(() => { console.log("Something went wrong") })
    }

    const copyToClipboard = () => {
        Clipboard.setString('hello world');
    };

    useState(() => {
        let fetchCode = async () => {
            let userID = await AsyncStorage.getItem("userID")
            await fetch(`${IP_ADDRESS}/referral-info/${userID}`, "GET")
                .then(res => res.json())
                .then(async (data) => {
                    setReferralCode(data.referralCode)
                    setUserName(data.userName)
                    setEmail(data.email);
                    setPhoneNumber(data.phoneNumber)
                })
                .catch(() => { console.log("Something went wrong") })
        }

        fetchCode();
    })

    let share = () => {
        let options = {
            message: "heelocvc",
            url: "https://derasewa.com",
            email: email,
            subject: "Referral",
            recipient: `977${phoneNumber}`
        }
        Share.open(options)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }


    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.navTitle}>{navTitle}</Text>
            </View>
            {
                referralCode ?
                    <View>
                        <View style={{ backgroundColor: "#202020", padding: 10, borderRadius: 10, }}>
                            <Text style={{ color: "white", fontFamily: "Poppins-Bold" }}>
                                REFERRAL CODE : {referralCode}
                            </Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity onPress={() => { copyToClipboard() }}>
                                <FontAwesome6 name="copy" style={styles.button} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={share}>
                                <FontAwesome6 name="share-nodes" style={styles.button} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <TouchableOpacity onPress={() => { generateReferral() }}>
                        <View style={styles.generateButton}>
                            <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>GENERATE CODE</Text>
                        </View>
                    </TouchableOpacity>
            }
        </View>
    )
}

export default ReferralScreen;

let styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: "black",
        padding: 10,
        display: "flex",
        gap: 20,
        felx: 1,
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
    generateButton: {
        backgroundColor: "white",
        padding: 18,
        display: "flex",
        alignItems: "center",
        borderRadius: 10
    },
    button: {
        fontSize: 25,
        color: "white"
    }
})