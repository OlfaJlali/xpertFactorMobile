import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { RootStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/TextInput';
import { isValidEmail } from '../utils/validation';

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [buttonEnabled, setButtonEnabled] = useState(false);

  // Animated values for the container
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity animation
  const translateYAnim = useRef(new Animated.Value(20)).current; // Slide-up animation

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
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim]);

  const handleRecoverPassword = () => {
    navigation.navigate('VerifyScreen');
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }, // Apply animation
      ]}
    >
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Please enter your email to recover your password.</Text>
      <Text style={styles.label}>Email</Text>
      <Input
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
    marginBottom: 8,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
