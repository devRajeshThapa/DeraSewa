import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const FAQScreen = ({ navigation }) => {

    let navTitle = "FAQ's"

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.navTitle}>{navTitle}</Text>
            </View>

            <ScrollView>
                <View style={{ display: "flex", gap: 10 }}>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: How do I create an account on DeraSewa?</Text>
                            <Text style={styles.paragraph}>⫸ To create an account, download our app, click on 'Sign Up,' and follow the prompts to enter your details.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: How can I search for rooms?</Text>
                            <Text style={styles.paragraph}>⫸ Use the search bar on the home screen to enter your preferred location and apply filters to refine your search.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: What types of filters are available for room searches?</Text>
                            <Text style={styles.paragraph}>⫸ You can filter rooms by price, location, room type, amenities, and more.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: Is there a fee to use DeraSewa?</Text>
                            <Text style={styles.paragraph}>⫸ Yes, there is a fee to contact room owners or to host rooms on our app. Payments can be made through eSewa (an online mobile wallet) or using Deracoin, our in-app currency earned through the referral process.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: How do I contact a room owner?</Text>
                            <Text style={styles.paragraph}>⫸ Click on the room listing and pay the allocated amount of money through eSewa or deracoin  to contact the owner.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: What should I do if I encounter a scam or fraud?</Text>
                            <Text style={styles.paragraph}>⫸ Report the listing immediately through the app, and our team will investigate and take appropriate action.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: How can I update my profile information?</Text>
                            <Text style={styles.paragraph}>⫸ Go to 'Profile' in the app menu, and you can update your personal information and preferences.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: What if I forget my password?</Text>
                            <Text style={styles.paragraph}>⫸ Use the 'Forgot Password' feature on the login screen to reset your password via email.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: How do I report inappropriate content?</Text>
                            <Text style={styles.paragraph}>⫸ Use the report feature on the listing or contact our support team directly.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: How can I delete my account?</Text>
                            <Text style={styles.paragraph}>⫸ Go to 'Account Settings' and select 'Delete Account.' Follow the prompts to confirm the deletion.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: What is Deracoin and how can I use it?</Text>
                            <Text style={styles.paragraph}>⫸ Deracoin is our in-app currency that can be earned through referrals. It can be used for transactions within the app, such as contacting room owners or hosting rooms.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Q: How can I earn Deracoin?</Text>
                            <Text style={styles.paragraph}>⫸ You can earn Deracoin by referring friends to use DeraSewa. For each successful referral, you will receive a certain amount of Deracoin.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>If you have any other questions, please visit our Help and Support section or contact our support team.</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

        </View>
    )
}

export default FAQScreen;

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
    },
    topic: {
        color: "white",
        fontFamily: "Poppins-Bold",
        fontSize: 15
    }
})