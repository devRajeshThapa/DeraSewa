import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const AboutUsScreen = ({ navigation }) => {

    let navTitle = "ABOUT US"

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.navTitle}>{navTitle}</Text>
            </View>

            <ScrollView>
                <View style={{ display: "flex", gap: 10 }}>
                    <View>
                        <Text style={styles.paragraph}>
                            Welcome to DeraSewa, your trusted partner in room finding in Kathmandu, Nepal. Our app is designed with one prime purpose in mind: to connect room seekers with owners seamlessly and affordably. We understand the challenges of finding the perfect room, and our mission is to simplify this process as much as possible.
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.paragraph}>
                            DeraSewa is for anyone searching for a room in Kathmandu. Whether you're a student, a professional, or anyone else looking for a place to stay, our app provides a comprehensive and user-friendly solution.
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.paragraph}>
                            What sets DeraSewa apart is our commitment to making the room search process easy, efficient, and transparent. Our app offers advanced filtration options that allow users to find rooms that match their specific needs and preferences. We prioritize low costs and ensure that our service remains accessible to everyone. Additionally, we guarantee that all listed rooms are legitimate, helping you avoid scams or fraud.
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.paragraph}>
                            Our mission at DeraSewa is to help users find rooms without the need to visit every corner of the city. We aim to bridge the communication gap between room owners and seekers, recognizing that busy lives shouldn't hinder the search for the perfect room. By leveraging mobile technology, we bring room listings to your fingertips, ensuring a smooth and hassle-free experience.
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.paragraph}>
                            Join us at DeraSewa and experience a new, efficient way to find your next room in Kathmandu. We are here to make your room search easier, faster, and more secure.
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default AboutUsScreen;

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
        paddingTop: 5,
        paddingBottom: 5
    },
    navTitle: {
        color: "white",
        fontFamily: "Poppins-Bold",
        fontSize: 25
    },
    paragraph: {
        color: "white",
        fontFamily: "Poppins-Regular",
        fontSize: 15
    }
})