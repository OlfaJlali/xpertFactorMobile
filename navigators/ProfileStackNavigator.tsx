import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import ProfileScreen from "../screens/ProfileScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import SettingsScreen from "../screens/SettingsScreens";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='MyAccount' component={MyAccountScreen} />
        <Stack.Screen name='Settings' component={SettingsScreen} />
        <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
        <Stack.Screen name='Notifications' component={NotificationsScreen} />
        <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicyScreen} />




    </Stack.Navigator>
  );
};