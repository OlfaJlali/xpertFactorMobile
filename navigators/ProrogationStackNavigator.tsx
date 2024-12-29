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
import BordoreauxStarter from "../screens/BordoreauxStarter";
import { useNavigationHook } from "../hooks/useNavigation";

const Stack = createStackNavigator<RootStackParamList>();

export const ProrogationStackNavigator = () => {
  const { navigateToTarget} = useNavigationHook('Prorogation')


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
    <Stack.Navigator initialRouteName={/*showOnboarding ? "BordoreauxStarter" : "Bordoreaux" */ "BordoreauxStarter"} >
       
        <Stack.Screen
        name="Prorogation"
        component={ProrogationBuyerScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen name='ProrogationDocument' component={LitigeDocument} initialParams={{ title: "Prorogation" }} options={{ headerShown: false }} />
        <Stack.Screen name="BordoreauxStarter" options={{ headerShown: false }}>
      {() => <BordoreauxStarter buttonAction={navigateToTarget}  title="About prorogation request " descriptions={["You need to select a buyer and  the desired document" , "Fill up the given form with valid data" , "After submit your request would be under review"]}/>}
    </Stack.Screen>
        <Stack.Screen name='ProrogationDate' component={ProrogationDate} options={{ headerShown: false }} />
        <Stack.Screen name="Congratulations" options={{ headerShown: false }}>
  {() => <CongratulationsScreen onPress={goToDashboard} text="your request is successfully sent" />}
</Stack.Screen>

    </Stack.Navigator>
  );
};