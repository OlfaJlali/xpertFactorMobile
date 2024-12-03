import { createStackNavigator } from "@react-navigation/stack";
import BordoreauxFormScreen from "../screens/BordoreauxForm";
import BordoreauxScreen from "../screens/BordoreauxScreen";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { RootStackParamList } from "../types/navigationTypes";
import BordoreauxStarter from "../screens/BordoreauxStarter";

const Stack = createStackNavigator<RootStackParamList>();

export const BordereauxStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='BordoreauxStarter' component={BordoreauxStarter} />
      <Stack.Screen name='Bordoreaux' component={BordoreauxScreen} />
      <Stack.Screen name="BordoreauxForm" component={BordoreauxFormScreen} />
      <Stack.Screen name="Congratulations" component={CongratulationsScreen} />
    </Stack.Navigator>
  );
};