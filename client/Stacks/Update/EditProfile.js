import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IP_ADDRESS, SERVER_PORT } from '@env'

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const EditProfile = ({ navigation }) => {

    let navTitle = "EDIT PROFILE";

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [password, setPassword] = useState("");
    let [profilePicture, setProfilePicture] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");
    let [passHidden, setPassHidden] = useState(true);

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
    }, []);

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

    let updateInfo = async () => {

        let data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            profilePicture: profilePicture
        }

        let userID = await AsyncStorage.getItem('userID');

        await fetch(`${IP_ADDRESS}/update-user-info/${userID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json();
            })
            .then(async (data) => {
                if (data.success) {
                    setError("");
                    setSuccess("");
                    setSuccess(data.success);
                } else {
                    setError("");
                    setSuccess("");
                    setError(data.error);
                }
            })
    }


    return (

        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.navTitle}>{navTitle}</Text>
            </View>
            <View style={styles.contentWrapper}>
                {error && <View style={styles.errorWrapper}><Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 15 }}>{error}</Text></View>}
                {success && <View style={styles.successWrapper}><Text style={{ color: "black", fontFamily: "Poppins-Light", fontSize: 15 }}>{success}</Text></View>}
                {profilePicture ? <Image style={{ width: 85, height: 85, borderWidth: 1, borderRadius: 100, }} source={{ uri: profilePicture }} /> : <Image style={{ width: 85, height: 85, borderRadius: 100 }} source={require("../../assets/images/default_profile.jpg")} />}
                <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 10 }} onPress={() => { openGallery(); setError("") }}>
                    <FontAwesome6 name="circle-plus" style={{ fontSize: 15, color: "white" }} />
                    <Text style={{ color: "white", fontFamily: "Poppins-SemiBold" }}>Change your Profile picture</Text>
                </TouchableOpacity>
                <View style={styles.nameInputFeild}>
                    <View>
                        <Text style={styles.title}>First Name</Text>
                        <TextInput style={styles.nameInput} placeholder="First Name" placeholderTextColor="white" value={`${firstName}`} onChangeText={(value) => { setFirstName(value); setError("") }} autoCorrect={false} />
                    </View>
                    <View>
                        <Text style={styles.title}>Last Name</Text>
                        <TextInput style={styles.nameInput} placeholder="Last Name" placeholderTextColor="white" value={`${lastName}`} onChangeText={(value) => { setLastName(value); setError("") }} autoCorrect={false} />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>Email</Text>
                    <TextInput style={styles.input} placeholder="Email" placeholderTextColor="white" value={`${email}`} onChangeText={(value) => { setEmail(value); setError("") }} autoCorrect={false} />
                </View>
                <View>
                    <Text style={styles.title}>Phone Number</Text>
                    <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="white" value={`${phoneNumber}`} onChangeText={(value) => { setPhoneNumber(value); setError("") }} />
                </View>
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
                <TouchableOpacity onPress={() => { updateInfo() }}>
                    <View style={styles.button}>
                        <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>UPDATE</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default EditProfile;

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
        paddingBottom: 10
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
    successWrapper: {
        width: "100%",
        backgroundColor: "#88ff00",
        padding: 10,
        maxHeight: 65,
        display: "flex",
        justifyContent: "center",
        borderRadius: 10,
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
        borderColor: "#303030",
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
        width: 140,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#303030",
        height: 52,
        color: "white",
        padding: 10,
        fontFamily: "Poppins-Light"
    },
    button: {
        backgroundColor: "white",
        padding: 12,
        display: "flex",
        alignItems: "center",
        borderRadius: 10
    },
    title: {
        marginBottom: 1,
        fontFamily: "Poppins-SemiBold",
        color: "white"
    }
})