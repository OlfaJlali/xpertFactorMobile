import React from 'react';
import { Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
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
  return (
    <SafeAreaView style={globalStyles.safeAreaContainer}>
      <Text style={signInScreenStyles.title}>Sign into your account</Text>
      <Image source={require('../assets/login.png')} style={{ height: '50%', width: width }} />
      <KeyboardAwareScrollView>
      <View style={signInScreenStyles.centeredContainer}>
        <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
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
