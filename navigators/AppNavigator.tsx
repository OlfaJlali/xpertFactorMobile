import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnBoardingScreen';
import { SignInScreen } from '../screens/SignInScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyScreen from '../screens/VerifyScreen';
import ChangePasswordScreen from '../screens/ChangePassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstInstall = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('alreadySeen');
        if (hasLaunched === null) {
          await AsyncStorage.setItem('alreadySeen', 'true');
          setShowOnboarding(true);
        } else {
          setShowOnboarding(false);
        }
      } catch (error) {
        console.error('Failed to check AsyncStorage:', error);
      }
    };

    checkFirstInstall();
  }, []);

  if (showOnboarding === null) {
    // Optional: Add a loading screen or return null to avoid rendering
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={showOnboarding ? "Onboarding" : "SignIn"}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" options={{ headerShown: false }}>
        {(props) => <SignInScreen />} 
      </Stack.Screen>
      <Stack.Screen name="ForgotPassword" options={{ headerShown: false }}>
        {(props) => <ForgotPasswordScreen />} 
      </Stack.Screen>
      <Stack.Screen name="VerifyScreen" options={{ headerShown: false }}>
        {(props) => <VerifyScreen />} 
      </Stack.Screen>
      <Stack.Screen name="ChangePasswordScreen" options={{ headerShown: false }}>
        {(props) => <ChangePasswordScreen />} 
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;
