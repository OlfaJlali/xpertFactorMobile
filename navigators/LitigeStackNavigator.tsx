import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import BuyerLitige from "../screens/BuyerLitige";
import LitigeDocument from "../screens/LitigeDocument";
import LitigeDate from "../screens/LitigeDate";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { useNavigation } from "@react-navigation/native";
import { BuyerDatatype } from "../types/buyersDataTypes";
import { useTab } from "../context/TabContext";
import { useShow } from "../context/ShowContext";
import { useAdditionalTab } from "../context/AdditionalTabContext";
import { useRendering } from "../context/RenderingContext";

const Stack = createStackNavigator<RootStackParamList>();
type LitigieNavigationProp = StackNavigationProp<RootStackParamList, "Litige">;

export const LitigeStackNavigator = () => {
  const navigation = useNavigation<LitigieNavigationProp>();

  const handlePress = (buyer: BuyerDatatype) => {
    navigation.navigate("LitigeDocument", buyer);
  };

  const { setSelectedIndex } = useTab();
  const { setShow } = useShow();  
  // const {selectedIndexBis , setSelectedIndexBis} = useAdditionalTab()
  const { setRenderingCurrent} = useRendering()
  const goToDashboard = () => {
    //TO-CHANGE
    setRenderingCurrent(true)
    setSelectedIndex(0); 
    setShow(true)
    };
    


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       
        <Stack.Screen
        name="Litige"
        component={() => <BuyerLitige handlePress={handlePress} pageTitle="Litige" />}
      />
        <Stack.Screen name='LitigeDocument' component={LitigeDocument} />
        <Stack.Screen name='LitigeDate' component={LitigeDate} />
        <Stack.Screen name="Congratulations">
  {() => <CongratulationsScreen onPress={goToDashboard} text="your request is successfully sent" />}
</Stack.Screen>

    </Stack.Navigator>
  );
};