import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import BuyerLitige from "../screens/BuyerLitige";
import LitigeDocument from "../screens/LitigeDocument";
import LitigeDate from "../screens/LitigeDate";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { useNavigation } from "@react-navigation/native";
import { BuyerDatatype } from "../types/buyersDataTypes";

const Stack = createStackNavigator<RootStackParamList>();
type LitigieNavigationProp = StackNavigationProp<RootStackParamList, "Litige">;

export const LitigeStackNavigator = () => {
  const navigation = useNavigation<LitigieNavigationProp>();

  const handlePress = (buyer: BuyerDatatype) => {
    navigation.navigate("LitigeDocument", buyer);
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       
        <Stack.Screen
        name="Litige"
        component={() => <BuyerLitige handlePress={handlePress} />}
      />
        <Stack.Screen name='LitigeDocument' component={LitigeDocument} />
        <Stack.Screen name='LitigeDate' component={LitigeDate} />
        <Stack.Screen name='Congratulations' component={CongratulationsScreen} />
    </Stack.Navigator>
  );
};