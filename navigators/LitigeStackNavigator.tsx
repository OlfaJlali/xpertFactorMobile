import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import BuyerLitige from "../screens/BuyerLitige";
import LitigeDocument from "../screens/LitigeDocument";
import LitigeDate from "../screens/LitigeDate";
import CongratulationsScreen from "../screens/CongratulationScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const LitigeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Litige' component={BuyerLitige} />
        <Stack.Screen name='LitigeDocument' component={LitigeDocument} />
        <Stack.Screen name='LitigeDate' component={LitigeDate} />
        <Stack.Screen name='Congratulations' component={CongratulationsScreen} />
    </Stack.Navigator>
  );
};