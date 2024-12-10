import React, { useState, useEffect } from 'react';
import { Dimensions, Image, Keyboard, SafeAreaView, Text, View } from 'react-native';
import { useSignIn } from '../hooks/useSignIn';
import { Input } from '../components/TextInput';
import { Button } from '../components/Button';
import { TextLink } from '../components/TextLink';
import { signInScreenStyles } from '../styles/signInScreenStyles';
import { globalStyles } from '../styles/globalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function SignInScreen() {
  const { email, setEmail, password, setPassword, handleSignIn, handleForgotPassword } = useSignIn();
  const { width } = Dimensions.get('window');
  const [imageHeight, setImageHeight] = useState('50%');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setImageHeight('30%'); // Reduce image size when keyboard appears
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setImageHeight('50%'); // Restore image size when keyboard hides
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeAreaContainer}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="never" >
        <Text style={signInScreenStyles.title}>Sign into your account</Text>
        <Image source={require('../assets/login.png')} style={{ height: '50%' , width: width }} />
        <View style={signInScreenStyles.centeredContainer}>
          <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address"  />
          <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <Button title="Sign In" onPress={handleSignIn} disabled={false} />
          <Text>Have you forgotten your password?</Text>
          <TextLink text="Click here to recover it" onPress={handleForgotPassword} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SignInScreen;
