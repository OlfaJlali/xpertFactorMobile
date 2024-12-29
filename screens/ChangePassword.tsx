import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Input } from '../components/TextInput'; // Assuming custom Input component
import { Button } from '../components/Button';   // Assuming custom Button component
import { signInScreenStyles } from '../styles/signInScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';

const ChangePasswordScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  type ChangePasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChangePasswordScreen'>;
  const navigation = useNavigation<ChangePasswordScreenNavigationProp>();

  // Helper function to validate password
  const isPasswordValid = (pwd: string) => {
    return pwd.length >= 6 && /\d/.test(pwd); // At least 6 characters and contains a number
  };

  // Generate validation messages
  const passwordErrorMessage = password.length < 6 
    ? 'Password must be at least 6 characters long.' 
    : !/\d/.test(password) 
      ? 'Password must contain at least one number.' 
      : '';

  const verifyPasswordErrorMessage = 
    password !== verifyPassword && verifyPassword 
      ? 'Passwords do not match.' 
      : '';

  // Check if the form is valid
  const isFormValid = 
    isPasswordValid(password) && 
    password === verifyPassword;

  const handleSave = () => {
    if (isFormValid) {
      console.log('Passwords match and are valid! Saving...');
      navigation.navigate('SignIn');
      // Add password save logic here
    } else {
      console.log('Password validation failed.');
    }
  };

  return (
    <SafeAreaView style={signInScreenStyles.safeAreaContainer}>
      <Text style={signInScreenStyles.title}>Create new password</Text>
      <View style={signInScreenStyles.centeredContainer}>
        {/* Input for new password */}
        <Input 
          placeholder="New Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
        {passwordErrorMessage ? (
          <Text style={signInScreenStyles.errorText}>{passwordErrorMessage}</Text>
        ) : null}
        {/* Input for verifying password */}
        <Input 
          placeholder="Verify New Password" 
          value={verifyPassword} 
          onChangeText={setVerifyPassword} 
          secureTextEntry 
        />
        {verifyPasswordErrorMessage ? (
          <Text style={signInScreenStyles.errorText}>{verifyPasswordErrorMessage}</Text>
        ) : null}
        {/* Save button with disabled condition */}
        <Button 
          title="Save" 
          onPress={handleSave} 
          disabled={!isFormValid} // Disable button if form is invalid
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
