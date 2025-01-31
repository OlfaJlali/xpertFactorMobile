import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import RequestFinancement from "../screens/FinancementStack/RequestFinancement";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { useTab } from "../context/TabContext";
import { useShow } from "../context/ShowContext";
import { useRendering } from "../context/RenderingContext";
import BordoreauxStarter from "../screens/BordoreauxStarter";
import { useNavigationHook } from "../hooks/useNavigation";

const Stack = createStackNavigator<RootStackParamList>();

export const RequestFinancementStackNavigator = () => {
  const { navigateToTarget} = useNavigationHook('RequestFinancement')

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
      

        <Stack.Screen name='RequestFinancement' component={RequestFinancement}  options={{ headerShown: false }}/>
        <Stack.Screen name="BordoreauxStarter" options={{ headerShown: false }}>
      {() => <BordoreauxStarter buttonAction={navigateToTarget}  title="About request financement" descriptions={["To request financement you need to fill the given form" , "After submit your request would be under review"]} />}
    </Stack.Screen>
        {/* <Stack.Screen name='FinancementStarter' component={BordoreauxStarter}  options={{ headerShown: false }}/> */}
        <Stack.Screen name="Congratulations" options={{ headerShown: false }}>
  {() => <CongratulationsScreen onPress={goToDashboard} text="your request is successfully sent" /> }
</Stack.Screen>


        
        
    </Stack.Navigator>
  );
};