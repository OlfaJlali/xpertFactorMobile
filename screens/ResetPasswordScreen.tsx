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
import { globalStyles } from '../styles/globalStyles';
import Header from '../components/Header';

const ResetPasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRetype, setNewPasswordRetype] = useState('');
  const { width , height } = Dimensions.get('window');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ResetPassword'>>();

  const handleSafe = () => {
    // TODO: Add validation logic here
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
            <Header goBack={() => navigation.pop()} title='Reset Password' />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Add ScrollView */}
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container }>
            <View  style={{alignItems: 'center' , }}>
            <Image
              source={require('../assets/login2.png')}
              style={{ width: width /3 ,  height: width * 0.5  }} // Set height based on width
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
              secureTextEntry
              value={newPassword}
            />
            <Input
              placeholder="Retype new password"
              onChangeText={setNewPasswordRetype}
              secureTextEntry
              value={newPasswordRetype}
            />
            <Button title="Save" onPress={handleSafe} disabled={false} />
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f7f7f7',
    fontSize: 14,
    color: '#999',
  },
  saveButton: {
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ResetPasswordScreen;
