import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import RequestFinancement from "../screens/RequestFinancement";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { useTab } from "../context/TabContext";
import { useShow } from "../context/ShowContext";
import { useRendering } from "../context/RenderingContext";

const Stack = createStackNavigator<RootStackParamList>();

export const RequestFinancementStackNavigator = () => {
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
        <Stack.Screen name='RequestFinancement' component={RequestFinancement} />
        <Stack.Screen name="Congratulations">
  {() => <CongratulationsScreen onPress={goToDashboard} text="your request is successfully sent" />}
</Stack.Screen>


        
        
    </Stack.Navigator>
  );
};