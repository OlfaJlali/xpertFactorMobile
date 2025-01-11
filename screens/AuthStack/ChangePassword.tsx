import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Input } from '../../components/TextInput'; // Assuming custom Input component
import { Button } from '../../components/Button';   // Assuming custom Button component
import { signInScreenStyles } from '../../styles/signInScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigationTypes';
import { DIContainer } from '../../di/container';
import { isPasswordValid } from '../../utils/validation';
interface ChangePasswordScreenProps {
  route?: any;
}
type ChangePasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChangePasswordScreen'>;
const ChangePasswordScreen:React.FC<ChangePasswordScreenProps> = ({ route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [loading,setLoading]= useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<ChangePasswordScreenNavigationProp>();


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


  const handleSave = async () => {
    setLoading(true);
    try {
      await DIContainer.createNewPasswordUseCase.execute(email,password);
      navigation.navigate('SignIn');
    } catch (err: any) {
      setError('couldnt change password');
    } finally {
      setLoading(false);
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
        {error && <Text style={signInScreenStyles.errorText}>{error}</Text>} 
        <Button 
          title="Save" 
          onPress={handleSave} 
          disabled={!isFormValid}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
