import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons/faCirclePlus';
import EditOff from './EditOff';

const EditOn = ({navigation}) => {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [password, setPassword] = useState("");
    let [profilePicture, setProfilePicture] = useState("");
    let [error, setError] = useState("");

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
    },[]);

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
        console.log(userID)

        await fetch(`http://192.168.1.66:8000/update-user-info/${userID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res)=>{ return res.json() })
        .then(async (data)=>{
            if(data.success){
                setError("");
                setError(data.success)
            }else{
                setError("")
                setError(data.error)
            }
        })
    }


    return (

        <View style={styles.contentWrapper}>
            {error && <View style={styles.errorWrapper}><Text style={{ color: "white", fontFamily: "Poppins-Light", fontSize: 15 }}>{error}</Text></View>}
            {profilePicture ? <Image style={{ width: 150, height: 150, borderWidth: 1, borderRadius: 100, borderColor: "#202020", borderWidth: 5 }} source={{ uri: profilePicture }} /> : <Text>Loading...</Text>}
            <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }} onPress={() => { openGallery(); setError("") }}>
                <FontAwesomeIcon icon={faCirclePlus} style={{ color: "white" }} />
                <Text style={{ color: "white", fontFamily: "Poppins-SemiBold" }}>Change your profile picture</Text>
            </TouchableOpacity>
            <View style={styles.nameInputFeild}>
                <TextInput style={styles.nameInput} placeholder="First Name" placeholderTextColor="white" onChangeText={(value) => { setFirstName(value); setError("") }} />
                <TextInput style={styles.nameInput} placeholder="Last Name" placeholderTextColor="white" onChangeText={(value) => { setLastName(value); setError("") }} />
            </View>
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="white" onChangeText={(value) => { setEmail(value); setError("") }} />
            <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="white" onChangeText={(value) => { setPhoneNumber(value); setError("") }} />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="white" onChangeText={(value) => { setPassword(value); setError("") }} />
            <TouchableOpacity onPress={() => { updateInfo() }}>
                <View style={styles.button}>
                    <Text style={{ color: "black", fontFamily: "Poppins-Bold", fontSize: 15 }}>UPDATE</Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}

export default EditOn;

let styles = StyleSheet.create({
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
        height: 60,
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
        height: 60,
        color: "white",
        padding: 10,
        fontFamily: "Poppins-Light"
    },
    button: {
        backgroundColor: "white",
        padding: 18,
        display: "flex",
        alignItems: "center",
        borderRadius: 10
    }
})