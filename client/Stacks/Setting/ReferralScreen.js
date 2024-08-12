import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_ADDRESS } from '@env'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Share from 'react-native-share';
import { Image } from 'react-native-svg';
import { height, width } from '@fortawesome/free-solid-svg-icons/faCirclePlus';

const ReferralScreen = ({ navigation }) => {

    let navTitle = "REFERRAL CODE";

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
                navigation.navigate("Setting");
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
            message: `Hey, I just discovered this awesome app called DeraSewa and it's been a game changer for me! You should definitely check it out, It is super user-friendly and has a ton of great features.${"\n"}${"\n"}It allows you to host you room, flat and apartment totally on the internet and also you can find this kinds of property in no time with ease by simply using this app.${"\n"}${"\n"}If you sign up using my referral code, you'll get 50 DeraCoin on your account and I'll earn some coin too. Which can be used as a payment method in this app.${"\n"}${"\n"}My referral code is ${referralCode}.`,
            url: "https://derasewa.com",
            email: email,
            subject: "Referring about Derasewa",
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
                    <View style={{ display: "flex", gap: 10 }}>
                        <View style={{ display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-around" }}>
                            <View style={{ backgroundColor: "#202020", padding: 10, borderRadius: 10 }}>
                                <Text style={{ color: "white", fontFamily: "Poppins-Bold", }}>
                                    REFERRAL CODE : <Text style={{ fontFamily: "Poppins-Medium" }}>{referralCode}</Text>
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
                        <View style={{ backgroundColor: "#202020", padding: 10, borderRadius: 10 }}>
                            <Text style={{ color: "white", fontFamily: "Poppins-Bold", }}>
                                For each refer you will get 30 Deracoin, Which can be used as a payment method whether buying or hosting a room.
                            </Text>
                        </View>
                    </View>
                    :
                    <View style={{display: "flex", gap: 10}}>
                        <View style={{ backgroundColor: "#202020", padding: 10, borderRadius: 10 }}>
                            <Text style={{ color: "white", fontFamily: "Poppins-Bold", }}>
                                Seems like you did not have referral code.
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => { generateReferral() }}>
                            <View style={styles.generateButton}>
                                <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>GENERATE CODE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
        felx: 1,
    },
    nav: {
        width: "100%",
        paddingTop: 5,
        paddingBottom: 5
    },
    navTitle: {
        color: "white",
        fontFamily: "Poppins-Bold",
        fontSize: 25
    },
    generateButton: {
        backgroundColor: "white",
        padding: 12,
        display: "flex",
        alignItems: "center",
        borderRadius: 10
    },
    button: {
        fontSize: 20,
        color: "black",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5
    }
})