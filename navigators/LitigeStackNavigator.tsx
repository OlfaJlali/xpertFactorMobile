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
import LitigeBuyerScreen from "../screens/LitigeBuyerScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const LitigeStackNavigator = () => {


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
        component={LitigeBuyerScreen}
      />
        <Stack.Screen name='LitigeDocument' component={LitigeDocument} initialParams={{title: "Litige"}}/>
        <Stack.Screen name='LitigeDate' component={LitigeDate} />
        <Stack.Screen name="Congratulations">
  {() => <CongratulationsScreen onPress={goToDashboard} text="your request is successfully sent" />}
</Stack.Screen>

    </Stack.Navigator>
  );
};