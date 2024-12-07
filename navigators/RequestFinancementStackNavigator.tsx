import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import RequestFinancement from "../screens/RequestFinancement";
import CongratulationsScreen from "../screens/CongratulationScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const RequestFinancementStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='RequestFinancement' component={RequestFinancement} />
        <Stack.Screen name='Congratulations' component={CongratulationsScreen} />

        
        
    </Stack.Navigator>
  );
};