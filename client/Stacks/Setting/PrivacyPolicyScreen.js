import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const PrivacyPolicyScreen = ({ navigation }) => {

    let navTitle = "PRIVACY POLICY"

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.navTitle}>{navTitle}</Text>
            </View>

            <ScrollView>
                <View style={{ display: "flex", gap: 10 }}>
                    <View>
                        <Text style={styles.paragraph}>
                            DeraSewa is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our app.
                        </Text>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Information Collection:</Text>
                            <Text style={styles.paragraph}>⫸ We collect personal information such as your name, phone number, email address, and other details as specified in the registration section.</Text>
                            <Text style={styles.paragraph}>⫸ Usage data is collected to improve app functionality and user experience.</Text>
                            <Text style={styles.paragraph}>⫸ We may use cookies and similar technologies to track app usage and preferences.
                            </Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Use of Information:</Text>
                            <Text style={styles.paragraph}>⫸ Personal information is used to connect room seekers with room owners and to provide personalized search results.</Text>
                            <Text style={styles.paragraph}>⫸ Your data is never used for any wrongful purposes. We ensure that all information is kept safe and secure.</Text>
                            <Text style={styles.paragraph}>⫸ Usage data helps us understand user behavior and improve our services.</Text>
                            <Text style={styles.paragraph}>Your information may be used for customer support and communication purposes.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Data Protection Measures:</Text>
                            <Text style={styles.paragraph}>⫸ We implement robust security measures, including information privacy, access control, regular backups, limited access to data, data breach prevention, and multi-factor authentication, to protect your information from unauthorized access, alteration, or disclosure.</Text>
                            <Text style={styles.paragraph}>⫸ Data is stored securely and access is restricted to authorized personnel only.</Text>
                            <Text style={styles.paragraph}>⫸ We may use cookies and similar technologies to track app usage and preferences.
                            </Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Third-Party Services:</Text>
                            <Text style={styles.paragraph}>⫸ We may share your information with third-party service providers to facilitate our services, such as the verification process, but confidentiality agreements and data protection regulations bind these parties.</Text>
                            <Text style={styles.paragraph}>⫸ We do not sell or rent your personal information to third parties.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>User Rights:</Text>
                            <Text style={styles.paragraph}>⫸ You have the right to access, update, or delete your personal information.</Text>
                            <Text style={styles.paragraph}>⫸ You can opt out of certain data collection practices by adjusting your app settings.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Contact Us</Text>
                            <Text style={styles.paragraph}>⫸ If you have any questions or concerns about our Privacy Policy, please contact us at derasewa.official@gmail.com.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>By using DeraSewa, you agree to this Privacy Policy.</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

        </View>
    )
}

export default PrivacyPolicyScreen;

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