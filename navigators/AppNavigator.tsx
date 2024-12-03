import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnBoardingScreen';
import { SignInScreen } from '../screens/SignInScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyScreen from '../screens/VerifyScreen';
import ChangePasswordScreen from '../screens/ChangePassword';

const Stack = createStackNavigator();
interface AppNavigatorProps {
  setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>;
}
const AppNavigator: React.FC<AppNavigatorProps> = ({setIsAuthed }) => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" options={{ headerShown: false }}>
        {(props) => <SignInScreen {...props} setIsAuthed={setIsAuthed} />} 
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