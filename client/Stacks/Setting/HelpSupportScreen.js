import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const HelpSupportScreen = ({ navigation }) => {

    let navTitle = "HELP AND SUPPORT"

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text style={styles.navTitle}>{navTitle}</Text>
            </View>

            <ScrollView>
                <View style={{ display: "flex", gap: 10 }}>
                    <View>
                        <Text style={styles.paragraph}>
                        At DeraSewa, we are committed to providing excellent support to our users. If you need assistance, our support team is here to help.
                        </Text>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Contact Support:</Text>
                            <Text style={styles.paragraph}>⫸ Email: derasewa.official@gmail.com</Text>
                            <Text style={styles.paragraph}>⫸ Phone: 9767664483</Text>
                            <Text style={styles.paragraph}>⫸ Facebook: DeraSewa</Text>
                            <Text style={styles.paragraph}>⫸ Official Website:derasewa.com</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Support Services:</Text>
                            <Text style={styles.paragraph}>⫸ Troubleshooting app issues</Text>
                            <Text style={styles.paragraph}>⫸ Assistance with account management</Text>
                            <Text style={styles.paragraph}>⫸ Help with room listings and searches</Text>
                            <Text style={styles.paragraph}>⫸ Addressing complaints and transaction problems</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Self-Help Resources:</Text>
                            <Text style={styles.paragraph}>⫸ Knowledge Base: Access articles and tutorials on using DeraSewa</Text>
                            <Text style={styles.paragraph}>⫸ FAQ Section: Find answers to common questions</Text>
                        </View>
                    </View>

                    <View>
                        <View style={{display: "flex"}}>
                            <Text style={styles.topic}>Our goal is to ensure that your experience with DeraSewa is smooth and satisfactory. If you encounter any issues, don’t hesitate to reach out to us.</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>

        </View>
    )
}

export default HelpSupportScreen;

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