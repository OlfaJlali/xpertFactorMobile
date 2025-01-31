import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigationTypes";
import BuyerLitige from "../screens/ListStack/BuyerList";
import DocumentList from "../screens/ListStack/DocumentList";
import LitigeDate from "../screens/LitigeStack/LitigeDate";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { useNavigation } from "@react-navigation/native";
import { useTab } from "../context/TabContext";
import { useShow } from "../context/ShowContext";
import { useAdditionalTab } from "../context/AdditionalTabContext";
import { useRendering } from "../context/RenderingContext";
import LitigeBuyerScreen from "../screens/LitigeStack/LitigeBuyerScreen";
import BordoreauxStarter from "../screens/BordoreauxStarter";
import { useNavigationHook } from "../hooks/useNavigation";

const Stack = createStackNavigator<RootStackParamList>();

export const LitigeStackNavigator = () => {


  const { setSelectedIndex } = useTab();
  const { setShow } = useShow();  
  // const {selectedIndexBis , setSelectedIndexBis} = useAdditionalTab()
  const { setRenderingCurrent} = useRendering()
  const { navigateToTarget} = useNavigationHook('Litige')

  const goToDashboard = () => {
    //TO-CHANGE
    setRenderingCurrent(true)
    setSelectedIndex(0); 
    setShow(true)
    };
    


  return (
    <Stack.Navigator initialRouteName={/*showOnboarding ? "BordoreauxStarter" : "Bordoreaux" */ "BordoreauxStarter"} >
       
        <Stack.Screen
        name="Litige"
        component={LitigeBuyerScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen name="BordoreauxStarter" options={{ headerShown: false }}>
      {() => <BordoreauxStarter buttonAction={navigateToTarget}  title="About litige request" descriptions={["You need to select a buyer and  the desired document" , "Fill up the given form with valid data" , "After submit your request would be under review"]} />}
    </Stack.Screen>

              {/* <Stack.Screen name='BordoreauxStarter' component={BordoreauxStarter}  options={{ headerShown: false }}/> */}

        <Stack.Screen name='LitigeDocument' component={DocumentList} initialParams={{title: "Litige"}} options={{ headerShown: false }}/>
        <Stack.Screen name='LitigeDate' component={LitigeDate} options={{ headerShown: false }} />
        <Stack.Screen name="Congratulations" options={{ headerShown: false }}>
  {() => <CongratulationsScreen onPress={goToDashboard} text="your request is successfully sent" />}
</Stack.Screen>

    </Stack.Navigator>
  );
};