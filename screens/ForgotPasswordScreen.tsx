import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/TextInput';

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  type VerifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyScreen'>;
  const navigation = useNavigation<VerifyScreenNavigationProp>();
  const handleRecoverPassword = () => {
    navigation.navigate('VerifyScreen'); 
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Please enter your email to recover your password.</Text>
      <Text style={styles.label}>Email</Text>
      <Input placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TouchableOpacity style={styles.button} onPress={handleRecoverPassword}>
        <Text style={styles.buttonText}>Recover Password</Text>
      </TouchableOpacity>
    </View>
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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    height: 50,
    backgroundColor: '#3E77BC',
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