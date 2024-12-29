import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import BordoreauxFormScreen from "../screens/BordoreauxForm";
import BordoreauxScreen from "../screens/BordoreauxScreen";
import CongratulationsScreen from "../screens/CongratulationScreen";
import { RootStackParamList } from "../types/navigationTypes";
import BordoreauxStarter from "../screens/BordoreauxStarter";
import { useTab } from "../context/TabContext";
import { useShow } from "../context/ShowContext";
import { useRendering } from "../context/RenderingContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, View } from "react-native";
import { COLOR_MAIN } from "../styles/globalStyles";
import LoadingView from "../components/LoadingView";
import { useNavigation } from "@react-navigation/native";
import { useNavigationHook } from "../hooks/useNavigation";

const Stack = createStackNavigator<RootStackParamList>();

export const BordereauxStackNavigator = () => {
  // const navigation = useNavigation<LitigieNavigationProp>();

  // const handlePress = (buyer: BuyerDatatype) => {
  //   navigation.navigate("LitigeDocument", buyer);
  // };

  const { navigateToTarget} = useNavigationHook('Bordoreaux')


  const { setSelectedIndex } = useTab();
  const { setShow } = useShow();  
  // const {selectedIndexBis , setSelectedIndexBis} = useAdditionalTab()
  const { setRenderingCurrent} = useRendering()
  const goToDashboard = () => {
    //TO-CHANGE
    setRenderingCurrent(true)
    setSelectedIndex(0); 
    setShow(true);
    };
    const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

    useEffect(() => {

      const checkFirstInstall = async () => {
        try {
          const hasLaunched = await AsyncStorage.getItem('BordoreauxStarter');
          if (hasLaunched === null) {
            await AsyncStorage.setItem('BordoreauxStarter', 'true');
            setShowOnboarding(true);
          } else {
            setShowOnboarding(false);
          }
        } catch (error) {
          console.error('Failed to check AsyncStorage:', error);
        }
      };
  
      checkFirstInstall();
    }, []);
  
      if (showOnboarding === null) {
        return (
        <LoadingView />
        );
      }  
  

  return (
      <Stack.Navigator initialRouteName={/*showOnboarding ? "BordoreauxStarter" : "Bordoreaux" */ "BordoreauxStarter"} >
        <Stack.Screen name="BordoreauxStarter" options={{ headerShown: false }}>
      {() => <BordoreauxStarter buttonAction={navigateToTarget}  title="About bordoreaux documents" />}
    </Stack.Screen>
        
      <Stack.Screen name='Bordoreaux' component={BordoreauxScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="BordoreauxForm" component={BordoreauxFormScreen} options={{ headerShown: false }}/>
      {/* <Stack.Screen name="Congratulations" component={CongratulationsScreen} /> */}
          <Stack.Screen name="Congratulations" options={{ headerShown: false }}>
      {() => <CongratulationsScreen onPress={goToDashboard} text="your request is successfully sent" />}
    </Stack.Screen>
    </Stack.Navigator>
  );
};