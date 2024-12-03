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

  // Check if the passwords match and both fields are non-empty
  const isFormValid = password && verifyPassword && password === verifyPassword;

  const handleSave = () => {
    if (isFormValid) {
      console.log('Passwords match! Saving...');
      navigation.navigate('SignIn')
      // Add password save logic here
    }
  };

  return (
    <SafeAreaView style={signInScreenStyles.safeAreaContainer}>
      <Text style={signInScreenStyles.title}>Create new password</Text>
      <View style={signInScreenStyles.centeredContainer}>
        {/* Input for new password */}
        <Input 
          placeholder="Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
        {/* Input for verifying password */}
        <Input 
          placeholder="Verify Password" 
          value={verifyPassword} 
          onChangeText={setVerifyPassword} 
          secureTextEntry 
        />
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
