import { ScrollView, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { useShow } from "../../context/ShowContext";

const PrivacyPolicy = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'PrivacyPolicy'>>();
    const {setShow} = useShow()
    return (

        <SafeAreaView style={{    flex: 1,
            backgroundColor: '#fff',
            paddingTop: 20
          }} >          
            <Header goBack={() => 
                navigation.pop() }
             title='Privacy Policy' />

               <ScrollView style={styles.container} >
            <Text style={styles.paragraph}>
                At Xpert Factor, we prioritize the privacy and security of our users. This Privacy Policy explains how we collect, use, and protect your personal information when you use our mobile application.
            </Text>

            <Text style={styles.subtitle}>1. Information We Collect</Text>
            <Text style={styles.paragraph}>
                We may collect the following types of information:
                {"\n"}- Personal information, such as your name, email address, phone number, and financial details.
                {"\n"}- Usage data, such as the pages you visit, features you use, and interactions within the app.
                {"\n"}- Device information, including your device type, operating system, and unique identifiers.
            </Text>

            <Text style={styles.subtitle}>2. How We Use Your Information</Text>
            <Text style={styles.paragraph}>
                We use your information to:
                {"\n"}- Provide and improve our services.
                {"\n"}- Communicate with you regarding your account and transactions.
                {"\n"}- Enhance app functionality and user experience.
                {"\n"}- Comply with legal obligations.
            </Text>

            <Text style={styles.subtitle}>3. Data Sharing</Text>
            <Text style={styles.paragraph}>
                We do not sell or rent your personal data to third parties. However, we may share your information with:
                {"\n"}- Service providers who assist us in delivering our services.
                {"\n"}- Legal authorities if required by law.
            </Text>

            <Text style={styles.subtitle}>4. Data Security</Text>
            <Text style={styles.paragraph}>
                We implement appropriate technical and organizational measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure.
            </Text>

            <Text style={styles.subtitle}>5. Your Rights</Text>
            <Text style={styles.paragraph}>
                You have the right to:
                {"\n"}- Access the personal data we hold about you.
                {"\n"}- Request corrections to your data.
                {"\n"}- Delete your data, subject to legal requirements.
            </Text>

            <Text style={styles.subtitle}>6. Changes to This Privacy Policy</Text>
            <Text style={styles.paragraph}>
                We may update this Privacy Policy from time to time. We encourage you to review this policy periodically for any changes.
            </Text>

            <Text style={styles.subtitle}>7. Contact Us</Text>
            <Text style={[styles.paragraph, {paddingBottom: 50}]}>
                If you have any questions about this Privacy Policy, please contact us at support@xpertfactor.com.
            </Text>
        </ScrollView>

        </SafeAreaView>
     
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 5,
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 10,
    },
});

export default PrivacyPolicy;
