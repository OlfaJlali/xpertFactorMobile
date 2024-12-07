import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Input } from '../components/TextInput';
import { Button } from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';

const ResetPasswordScreen = () => {
  const [oldPassword , setOldPassword] = useState('')
  const [newPassword , setNewPassword] = useState('')
  const [newPasswordRetype , SetnewPasswordRetype] = useState('')
  const { width  , height} = Dimensions.get('window');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'ResetPassword'>>();

  const handleSafe = () =>{ 
    // TO DO Conditions to check 
      // password valid  ??? 
          // backend

      // new pass = new pass retry
      // new pass = must have at least 6 chars and a number 
    navigation.navigate('Profile');

  } 
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
    <View style={styles.container}>
      <Image source={require('../assets/login.png')} style={{ height: '50%' , width: width }} />
      <Input placeholder="Enter old password" onChangeText={setOldPassword} secureTextEntry value={oldPassword}  />
      <Input placeholder="Enter new password" onChangeText={setNewPassword} secureTextEntry value={newPassword}  />
      <Input placeholder="Retype new password" onChangeText={SetnewPasswordRetype} secureTextEntry value={newPasswordRetype}  />
      <Button title={'Save'} onPress={handleSafe} disabled={false} />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    gap:20,
    paddingTop: 20,
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
