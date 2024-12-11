import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, Keyboard, SafeAreaView, Text, View } from 'react-native';
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

  // Animated values for the components
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current; // Start slightly below the screen

  useEffect(() => {
    // Animate components on initial render
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0, // Move to original position
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  return (
    <SafeAreaView style={globalStyles.safeAreaContainer}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="never">
        <Text style={signInScreenStyles.title}>Sign into your account</Text>
        <Animated.View
          style={[
            signInScreenStyles.centeredContainer,
            { opacity, transform: [{ translateY }] }, // Apply animation
          ]}
        >

        <Image source={require('../assets/login.png')} style={{ height: '50%', width: width }} />
       
          <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <Button title="Sign In" onPress={handleSignIn} disabled={false} />
          <Text>Have you forgotten your password?</Text>
          <TextLink text="Click here to recover it" onPress={handleForgotPassword} />
        </Animated.View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SignInScreen;
