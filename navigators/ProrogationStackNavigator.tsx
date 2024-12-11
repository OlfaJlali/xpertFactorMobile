import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { useNavigation } from "@react-navigation/native";
import { BuyerDatatype } from "../types/buyersDataTypes";
import { useTab } from "../context/TabContext";
import { useShow } from "../context/ShowContext";
import { useAdditionalTab } from "../context/AdditionalTabContext";
import { useRendering } from "../context/RenderingContext";
import ProrogationBuyerScreen from "../screens/ProrogationBuyerScreen";
import LitigeDocument from "../screens/LitigeDocument";
import ProrogationDate from "../screens/ProrogationDate";

const Stack = createStackNavigator<RootStackParamList>();

export const ProrogationStackNavigator = () => {


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
        name="Prorogation"
        component={ProrogationBuyerScreen}
      />
        <Stack.Screen name='ProrogationDocument' component={LitigeDocument} initialParams={{ title: "Prorogation" }} />
        <Stack.Screen name='ProrogationDate' component={ProrogationDate} />
        <Stack.Screen name="Congratulations">
  {() => <CongratulationsScreen onPress={goToDashboard} text="your request is successfully sent" />}
</Stack.Screen>

    </Stack.Navigator>
  );
};