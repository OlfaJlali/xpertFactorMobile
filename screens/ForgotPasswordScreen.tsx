import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { RootStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/TextInput';
import { isValidEmail } from '../utils/validation';
const { width } = Dimensions.get('window');

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);

  // Animated values for the container
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity animation

  type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyScreen'>;
  const navigation = useNavigation<VerifyScreenNavigationProp>();

  useEffect(() => {
    setButtonEnabled(isValidEmail(email));
  }, [email]);

  useEffect(() => {
    // Animate the container when the screen loads
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  const handleRecoverPassword = () => {
    navigation.navigate('VerifyScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust behavior for iOS or Android
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Offset for iOS devices
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.innerContainer,
            { opacity: fadeAnim },
          ]}
        >
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Please enter your email to recover your password.
          </Text>
          <Text style={styles.label}>Email</Text>
          <Input
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </Animated.View>
        <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: buttonEnabled ? '#3E77BC' : '#A0B9D9' },
        ]}
        onPress={handleRecoverPassword}
        disabled={!buttonEnabled}
      >
        <Text style={styles.buttonText}>Recover Password</Text>
      </TouchableOpacity>
      </ScrollView>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Centers content vertically
    paddingHorizontal: 20,
  },
  innerContainer: {
    alignItems: 'center', // Centers content horizontally
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  button: {
    width: width * 0.9,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
