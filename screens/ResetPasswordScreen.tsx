import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Input } from '../components/TextInput';
import { Button } from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import Header from '../components/Header';

const ResetPasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRetype, setNewPasswordRetype] = useState('');
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [newPasswordRetypeTouched, setNewPasswordRetypeTouched] = useState(false);

  const { width } = Dimensions.get('window');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ResetPassword'>>();

  // Helper function to validate password
  const isPasswordValid = (pwd: string) => {
    return pwd.length >= 6 && /\d/.test(pwd); // At least 6 characters and contains a number
  };

  // Generate validation messages
  const newPasswordErrorMessage = newPasswordTouched && !isPasswordValid(newPassword)
    ? newPassword.length < 6
      ? 'Password must be at least 6 characters long.'
      : 'Password must contain at least one number.'
    : '';

  const newPasswordRetypeErrorMessage =
    newPasswordRetypeTouched && newPassword !== newPasswordRetype
      ? 'Passwords do not match.'
      : '';

  // Check if the form is valid
  const isFormValid =
    isPasswordValid(newPassword) && newPassword === newPasswordRetype;

  const handleSave = () => {
    if (isFormValid) {
      console.log('Password reset successful!');
      navigation.navigate('Profile');
      // Add password reset logic here
    } else {
      console.log('Password validation failed.');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{ paddingTop: 20 }}>
        <Header goBack={() => navigation.pop()} title="Reset Password" />
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/login2.png')}
                style={{ width: width / 3, height: width * 0.5 }} // Set height based on width
              />
            </View>
            <Input
              placeholder="Enter old password"
              onChangeText={setOldPassword}
              secureTextEntry
              value={oldPassword}
            />
            <Input
              placeholder="Enter new password"
              onChangeText={setNewPassword}
              onFocus={() => setNewPasswordTouched(true)}
              secureTextEntry
              value={newPassword}
            />
            {newPasswordErrorMessage ? (
              <Text style={styles.errorText}>{newPasswordErrorMessage}</Text>
            ) : null}
            <Input
              placeholder="Retype new password"
              onChangeText={setNewPasswordRetype}
              onFocus={() => setNewPasswordRetypeTouched(true)}
              secureTextEntry
              value={newPasswordRetype}
            />
            {newPasswordRetypeErrorMessage ? (
              <Text style={styles.errorText}>{newPasswordRetypeErrorMessage}</Text>
            ) : null}
            <Button
              title="Save"
              onPress={handleSave}
              disabled={!isFormValid} // Disable button if form is invalid
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1, // Ensures ScrollView content takes up available space
  },
  container: {
    gap: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ResetPasswordScreen;
