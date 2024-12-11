import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { useNavigation } from "@react-navigation/native";
import { BuyerDatatype } from "../types/buyersDataTypes";
import { useTab } from "../context/TabContext";
import { useShow } from "../context/ShowContext";
import { useAdditionalTab } from "../context/AdditionalTabContext";
import { useRendering } from "../context/RenderingContext";
import BuyerScreen from "../screens/BuyerScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const BuyerStackNavigator = () => {


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
        name="Buyer"
        component={BuyerScreen}
      />
    </Stack.Navigator>
  );
};