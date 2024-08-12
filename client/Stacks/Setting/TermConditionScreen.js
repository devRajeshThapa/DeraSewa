import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const TermConditionScreen = ({ navigation }) => {

    let navTitle = "TERMS AND CONDITIONS"

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.navTitle}>{navTitle}</Text>
            </View>

            <ScrollView>
                <View style={{ display: "flex", gap: 10 }}>
                    <View>
                        <Text style={styles.paragraph}>
                        Welcome to DeraSewa. By using our app, you agree to comply with the following terms and conditions. Please read them carefully.
                        </Text>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>User Agreement:</Text>
                            <Text style={styles.paragraph}>⫸ By creating an account and using DeraSewa, you agree to provide accurate information and to keep your account information up to date.</Text>
                            <Text style={styles.paragraph}>⫸ You are responsible for maintaining the confidentiality of your account and password.</Text>
                            <Text style={styles.paragraph}>⫸ We may use cookies and similar technologies to track app usage and preferences.
                            </Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Usage Rules:</Text>
                            <Text style={styles.paragraph}>⫸ DeraSewa is intended for personal use in finding and listing rooms in Kathmandu. Users must use the app wisely and for its intended purpose.</Text>
                            <Text style={styles.paragraph}>⫸ Any misconduct while posting room information, such as adding fake photos, nude content, or other unnecessary things, is strictly prohibited. Violations will result in permanent account bans and may lead to legal issues as mentioned in Section 47 of the Electronic Transactions Act 2063 (Nepal).</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Prohibited Activities:</Text>
                            <Text style={styles.paragraph}>⫸ Users are prohibited from posting false or misleading information.</Text>
                            <Text style={styles.paragraph}>⫸ Any attempt to hack, exploit, or misuse the app's features is strictly forbidden.</Text>
                            <Text style={styles.paragraph}>⫸ Harassment, abusive behavior, and spamming are not tolerated.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>User-Generated Content:</Text>
                            <Text style={styles.paragraph}>⫸ Users may post room listings and reviews. All content must be accurate and not violate any third-party rights.</Text>
                            <Text style={styles.paragraph}>⫸ DeraSewa reserves the right to remove any content deemed inappropriate or misleading.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Violation of Terms:</Text>
                            <Text style={styles.paragraph}>⫸ Violation of these terms may result in suspension or termination of your account.</Text>
                            <Text style={styles.paragraph}>⫸ DeraSewa reserves the right to take legal action against users violating these terms.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Payment and Transactions:</Text>
                            <Text style={styles.paragraph}>⫸ Users must pay a fee to contact room owners or to host rooms. Payments can be made through eSewa (an online mobile wallet) or using Deracoin, our in-app currency earned through the referral process.</Text>
                            <Text style={styles.paragraph}>⫸ We provide a feature for users with financial burdens to use Deracoin, which can be earned through our referral program.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Limitation of Liability:</Text>
                            <Text style={styles.paragraph}>⫸ DeraSewa is not liable for any damages resulting from the use or inability to use the app.</Text>
                            <Text style={styles.paragraph}>⫸ We do not guarantee the accuracy or reliability of listings and user-generated content.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Changes to Terms:</Text>
                            <Text style={styles.paragraph}>⫸ DeraSewa reserves the right to update these terms at any time. Users will be notified of significant changes.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Contact Us</Text>
                            <Text style={styles.paragraph}>⫸ For any questions or concerns regarding these Terms and Conditions, please contact us at derasewa.official@gmail.com.</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>By using DeraSewa, you agree to these Terms and Conditions.</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

        </View>
    )
}

export default TermConditionScreen;

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